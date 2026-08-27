(function () {
  /*
   * Escritas oficiais do SenkoLib no Firestore.
   *
   * Este modulo concentra validacao, controle otimista de concorrencia,
   * reserva de nomes e incremento de dataVersion. Os controladores de tela
   * entregam dados simples; somente este arquivo conhece a forma atomica de
   * transforma-los em documentos e revisoes.
   *
   * CONTRATO DE SALVAMENTO:
   * 1. validar e normalizar a entrada;
   * 2. confirmar que o usuario ainda e membro;
   * 3. comparar baseRevisionId/version dentro da transacao;
   * 4. reservar o nome no mesmo commit;
   * 5. gravar documento, revisao e nova dataVersion juntos.
   *
   * Nao mova partes desse fluxo para modais ou repositories de leitura. Uma
   * escrita parcial pode criar nomes duplicados ou sobrescrever outra pessoa.
   */
  // -----------------------------------------------------------------------
  // Normalizacao de entrada
  // -----------------------------------------------------------------------
  // Esses helpers rejeitam cedo valores que excederiam as regras. A validacao
  // no cliente melhora a mensagem; as Security Rules continuam obrigatorias.
  function appError(code, message) {
    var error = new Error(message);
    error.code = 'functions/' + code;
    return error;
  }

  function cleanId(value, label) {
    var id = String(value || '').trim();
    if (!id || id.indexOf('/') !== -1 || id.length > 180) {
      throw appError('invalid-argument', label + ' invalido.');
    }
    return id;
  }

  function cleanName(value) {
    var name = String(value || '').trim();
    if (name.length < 2 || name.length > 160) {
      throw appError('invalid-argument', 'Informe um nome entre 2 e 160 caracteres.');
    }
    return name;
  }

  function normalizeName(value) {
    return String(value || '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, ' ')
      .trim()
      .replace(/\s+/g, ' ');
  }

  function cleanText(value, label, maxLength) {
    var text = String(value || '');
    if (text.length > maxLength) {
      throw appError(
        'invalid-argument',
        label + ' ultrapassa o limite de ' + maxLength + ' caracteres.'
      );
    }
    return text;
  }

  function cleanTags(value) {
    if (!Array.isArray(value)) return [];
    return value.map(function (tag) {
      return String(tag || '').trim();
    }).filter(Boolean).slice(0, 40).map(function (tag) {
      return tag.slice(0, 80);
    });
  }

  function cleanColor(value) {
    var color = String(value || '').trim();
    if (!/^#[0-9a-fA-F]{6}$/.test(color)) {
      throw appError('invalid-argument', 'Informe uma cor hexadecimal valida.');
    }
    return color.toLowerCase();
  }

  // Reservas usam hash porque nome normalizado pode conter caracteres que nao
  // sao adequados a um ID Firestore e pode ultrapassar o tamanho confortavel.
  function sha256(value) {
    if (!window.crypto || !window.crypto.subtle) {
      return Promise.reject(appError(
        'failed-precondition',
        'Este navegador nao oferece a criptografia necessaria.'
      ));
    }
    return window.crypto.subtle.digest(
      'SHA-256',
      new TextEncoder().encode(value)
    ).then(function (buffer) {
      return Array.from(new Uint8Array(buffer)).map(function (byte) {
        return byte.toString(16).padStart(2, '0');
      }).join('');
    });
  }

  function reservationId(scope, nameKey) {
    return sha256(scope + ':' + nameKey);
  }

  function actorName(context) {
    return context.user.displayName || context.user.email || 'Membro';
  }

  // -----------------------------------------------------------------------
  // Contexto e referencias
  // -----------------------------------------------------------------------
  function withContext(operation) {
    return window.SenkoFirebase.whenAuthorized().then(function () {
      return operation(window.SenkoFirebase.getClientContext());
    }).catch(function (error) {
      if (window.SenkoFirebase &&
          typeof window.SenkoFirebase.reportServiceError === 'function') {
        window.SenkoFirebase.reportServiceError(error, 'write');
      }
      throw error;
    });
  }

  function refs(context) {
    var sdk = context.firestore;
    var workspace = sdk.doc(context.db, 'workspaces/' + context.workspaceId);
    return {
      sdk: sdk,
      workspace: workspace,
      member: sdk.doc(workspace, 'members', context.user.uid)
    };
  }

  function resolveVersioned(context, data) {
    var sdk = context.firestore;
    var workspacePath = 'workspaces/' + context.workspaceId;
    var parentId = data.parentId ? cleanId(data.parentId, 'ID pai') : '';

    if (data.kind === 'libraryLayout') {
      return {
        kind: data.kind,
        parentId: '',
        parentRef: null,
        collection: sdk.collection(context.db, workspacePath + '/bibliotecaLayouts'),
        scope: 'biblioteca-layouts'
      };
    }
    if (data.kind === 'libraryVariant') {
      if (!parentId) throw appError('invalid-argument', 'Layout pai obrigatorio.');
      var layoutRef = sdk.doc(
        context.db,
        workspacePath + '/bibliotecaLayouts/' + parentId
      );
      return {
        kind: data.kind,
        parentId: parentId,
        parentRef: layoutRef,
        collection: sdk.collection(layoutRef, 'variants'),
        scope: 'biblioteca-variantes:' + parentId
      };
    }
    if (data.kind === 'collectionLayout') {
      if (!parentId) throw appError('invalid-argument', 'Colecao pai obrigatoria.');
      var collectionRef = sdk.doc(
        context.db,
        workspacePath + '/collections/' + parentId
      );
      return {
        kind: data.kind,
        parentId: parentId,
        parentRef: collectionRef,
        collection: sdk.collection(collectionRef, 'layouts'),
        scope: 'colecao-layouts:' + parentId
      };
    }
    throw appError('invalid-argument', 'Tipo de conteudo desconhecido.');
  }

  function requireMemberSnapshot(snapshot) {
    if (!snapshot.exists()) {
      throw appError('permission-denied', 'Sua permissao foi removida.');
    }
  }

  // -----------------------------------------------------------------------
  // Layouts, variacoes e layouts internos
  // -----------------------------------------------------------------------
  // Os tres tipos compartilham revisao e concorrencia. resolveVersioned muda
  // apenas colecao, pai e escopo da reserva, mantendo uma unica implementacao
  // do protocolo de salvamento.
  function saveVersionedContent(data) {
    return withContext(function (context) {
      var base = refs(context);
      var target = resolveVersioned(context, data);
      var resourceId = data.resourceId
        ? cleanId(data.resourceId, 'ID do conteudo')
        : base.sdk.doc(target.collection).id;
      var resourceRef = base.sdk.doc(target.collection, resourceId);
      var revisionRef = base.sdk.doc(base.sdk.collection(resourceRef, 'revisions'));
      var name = cleanName(data.name);
      var nameKey = normalizeName(name);
      var html = cleanText(data.html, 'HTML', 750000);
      var css = cleanText(data.css, 'CSS', 250000);
      var tags = cleanTags(data.tags);
      var baseRevisionId = data.baseRevisionId === null
        ? null
        : String(data.baseRevisionId || '').trim();

      return reservationId(target.scope, nameKey).then(function (reservationKey) {
        var reservationRef = base.sdk.doc(
          base.workspace,
          'nameReservations',
          reservationKey
        );

        return base.sdk.runTransaction(context.db, function (transaction) {
          var reads = [
            transaction.get(base.member),
            transaction.get(resourceRef),
            transaction.get(reservationRef)
          ];
          if (target.parentRef) reads.push(transaction.get(target.parentRef));

          return Promise.all(reads).then(function (snapshots) {
            requireMemberSnapshot(snapshots[0]);
            var resourceSnapshot = snapshots[1];
            var reservationSnapshot = snapshots[2];
            var parentSnapshot = target.parentRef ? snapshots[3] : null;
            if (parentSnapshot && !parentSnapshot.exists()) {
              throw appError('not-found', 'O item pai nao existe mais.');
            }

            var existing = resourceSnapshot.exists() ? resourceSnapshot.data() : null;
            if (existing && (!baseRevisionId ||
                baseRevisionId !== existing.currentRevisionId)) {
              throw appError(
                'aborted',
                'Outra pessoa salvou uma versao mais recente. Recarregue ou compare antes de salvar.'
              );
            }
            if (!existing && baseRevisionId) {
              throw appError('aborted', 'Este conteudo ainda nao existe no Firebase.');
            }
            if (reservationSnapshot.exists() &&
                reservationSnapshot.data().resourcePath !== resourceRef.path) {
              throw appError('already-exists', 'Ja existe outro item com esse nome.');
            }

            var now = base.sdk.serverTimestamp();
            var version = existing ? Number(existing.version || 0) + 1 : 1;
            var resourceData = {
              id: resourceId,
              kind: target.kind,
              workspaceId: context.workspaceId,
              parentId: target.parentId || null,
              collectionId: target.kind === 'collectionLayout' ? target.parentId : null,
              name: name,
              nameKey: nameKey,
              tags: tags,
              html: html,
              css: css,
              currentRevisionId: revisionRef.id,
              version: version,
              updatedAt: now,
              updatedBy: context.user.uid,
              updatedByName: actorName(context)
            };
            if (!existing) {
              resourceData.createdAt = now;
              resourceData.createdBy = context.user.uid;
            }

            transaction.set(resourceRef, resourceData, { merge: true });
            transaction.set(revisionRef, {
              revisionId: revisionRef.id,
              resourceId: resourceId,
              workspaceId: context.workspaceId,
              kind: target.kind,
              name: name,
              tags: tags,
              html: html,
              css: css,
              baseRevisionId: existing ? existing.currentRevisionId : null,
              createdAt: now,
              createdBy: context.user.uid,
              createdByName: actorName(context)
            });
            transaction.set(reservationRef, {
              scope: target.scope,
              name: name,
              nameKey: nameKey,
              resourcePath: resourceRef.path,
              updatedAt: now
            });
            transaction.set(base.workspace, {
              dataVersion: base.sdk.increment(1),
              updatedAt: now,
              updatedBy: context.user.uid
            }, { merge: true });

            if (existing && existing.nameKey && existing.nameKey !== nameKey) {
              return reservationId(target.scope, existing.nameKey).then(function (oldKey) {
                transaction.delete(base.sdk.doc(
                  base.workspace,
                  'nameReservations',
                  oldKey
                ));
                return { id: resourceId, revisionId: revisionRef.id, version: version };
              });
            }
            return { id: resourceId, revisionId: revisionRef.id, version: version };
          });
        });
      });
    });
  }

  // -----------------------------------------------------------------------
  // Template singleton do HTML Basico
  // -----------------------------------------------------------------------
  // O template nao precisa de reserva de nome ou revisoes filhas, mas usa a
  // mesma concorrencia otimista e incrementa dataVersion no mesmo commit.
  function saveCopyBaseTemplate(data) {
    return withContext(function (context) {
      var base = refs(context);
      var templateRef = base.sdk.doc(base.workspace, 'settings', 'copyBase');
      var html = cleanText(data.html, 'HTML basico', 750000);
      var expectedVersion = Number(data.expectedVersion || 0);

      if (!html.trim()) {
        throw appError('invalid-argument', 'O HTML basico nao pode ficar vazio.');
      }
      if (!Number.isSafeInteger(expectedVersion) || expectedVersion < 0) {
        throw appError('invalid-argument', 'Versao esperada do HTML basico invalida.');
      }

      return base.sdk.runTransaction(context.db, function (transaction) {
        return Promise.all([
          transaction.get(base.member),
          transaction.get(templateRef)
        ]).then(function (snapshots) {
          requireMemberSnapshot(snapshots[0]);
          var templateSnapshot = snapshots[1];
          var existing = templateSnapshot.exists() ? templateSnapshot.data() : null;
          var currentVersion = existing ? Number(existing.version || 0) : 0;

          if (currentVersion !== expectedVersion) {
            throw appError(
              'aborted',
              'Outra pessoa salvou uma versao mais recente do HTML basico.'
            );
          }

          var now = base.sdk.serverTimestamp();
          var nextVersion = currentVersion + 1;
          var templateData = {
            id: 'copyBase',
            workspaceId: context.workspaceId,
            kind: 'copyBaseTemplate',
            html: html,
            version: nextVersion,
            updatedAt: now,
            updatedBy: context.user.uid,
            updatedByName: actorName(context)
          };
          if (!existing) {
            templateData.createdAt = now;
            templateData.createdBy = context.user.uid;
          }

          transaction.set(templateRef, templateData, { merge: true });
          transaction.set(base.workspace, {
            dataVersion: base.sdk.increment(1),
            updatedAt: now,
            updatedBy: context.user.uid
          }, { merge: true });

          return {
            id: 'copyBase',
            html: html,
            version: nextVersion
          };
        });
      });
    });
  }

  // -----------------------------------------------------------------------
  // Colecoes
  // -----------------------------------------------------------------------
  // Colecao nao possui subdocumento de revisao, mas continua versionada e usa
  // a mesma reserva de nome para impedir duplicata entre clientes.
  function saveCollection(data) {
    return withContext(function (context) {
      var base = refs(context);
      var collections = base.sdk.collection(base.workspace, 'collections');
      var collectionId = data.collectionId
        ? cleanId(data.collectionId, 'ID da colecao')
        : base.sdk.doc(collections).id;
      var collectionRef = base.sdk.doc(collections, collectionId);
      var groupId = data.groupId ? cleanId(data.groupId, 'Grupo') : null;
      var groupRef = groupId ? base.sdk.doc(base.workspace, 'groups', groupId) : null;
      var name = cleanName(data.name);
      var nameKey = normalizeName(name);
      var tags = cleanTags(data.tags);
      var expectedVersion = data.expectedVersion === null
        ? null
        : Number(data.expectedVersion);

      return reservationId('colecoes', nameKey).then(function (reservationKey) {
        var reservationRef = base.sdk.doc(
          base.workspace,
          'nameReservations',
          reservationKey
        );
        return base.sdk.runTransaction(context.db, function (transaction) {
          var reads = [
            transaction.get(base.member),
            transaction.get(collectionRef),
            transaction.get(reservationRef)
          ];
          if (groupRef) reads.push(transaction.get(groupRef));

          return Promise.all(reads).then(function (snapshots) {
            requireMemberSnapshot(snapshots[0]);
            var collectionSnapshot = snapshots[1];
            var reservationSnapshot = snapshots[2];
            if (groupRef && !snapshots[3].exists()) {
              throw appError('not-found', 'O grupo selecionado nao existe mais.');
            }
            var existing = collectionSnapshot.exists() ? collectionSnapshot.data() : null;
            if (existing && expectedVersion !== Number(existing.version || 0)) {
              throw appError('aborted', 'Outra pessoa alterou esta colecao.');
            }
            if (!existing && expectedVersion !== null) {
              throw appError('aborted', 'Esta colecao ainda nao existe no Firebase.');
            }
            if (reservationSnapshot.exists() &&
                reservationSnapshot.data().resourcePath !== collectionRef.path) {
              throw appError('already-exists', 'Ja existe outra colecao com esse nome.');
            }

            var now = base.sdk.serverTimestamp();
            var version = existing ? Number(existing.version || 0) + 1 : 1;
            var collectionData = {
              id: collectionId,
              workspaceId: context.workspaceId,
              name: name,
              nameKey: nameKey,
              groupId: groupId,
              tags: tags,
              version: version,
              updatedAt: now,
              updatedBy: context.user.uid,
              updatedByName: actorName(context)
            };
            if (!existing) {
              collectionData.createdAt = now;
              collectionData.createdBy = context.user.uid;
            }

            transaction.set(collectionRef, collectionData, { merge: true });
            transaction.set(reservationRef, {
              scope: 'colecoes',
              name: name,
              nameKey: nameKey,
              resourcePath: collectionRef.path,
              updatedAt: now
            });
            transaction.set(base.workspace, {
              dataVersion: base.sdk.increment(1),
              updatedAt: now,
              updatedBy: context.user.uid
            }, { merge: true });

            if (existing && existing.nameKey && existing.nameKey !== nameKey) {
              return reservationId('colecoes', existing.nameKey).then(function (oldKey) {
                transaction.delete(base.sdk.doc(
                  base.workspace,
                  'nameReservations',
                  oldKey
                ));
                return { id: collectionId, version: version };
              });
            }
            return { id: collectionId, version: version };
          });
        });
      });
    });
  }

  // -----------------------------------------------------------------------
  // Grupos
  // -----------------------------------------------------------------------
  // Grupos sao entidades independentes. Excluir uma colecao nao deve remover
  // seu grupo; deleteGroup confirma separadamente se ainda existe uso.
  function saveGroup(data) {
    return withContext(function (context) {
      var base = refs(context);
      var groupId = cleanId(data.groupId, 'ID do grupo');
      var groupRef = base.sdk.doc(base.workspace, 'groups', groupId);
      var name = cleanName(data.name);
      var nameKey = normalizeName(name);
      var color = cleanColor(data.color);
      var expectedVersion = data.expectedVersion === null
        ? null
        : Number(data.expectedVersion);

      return reservationId('grupos', nameKey).then(function (reservationKey) {
        var reservationRef = base.sdk.doc(
          base.workspace,
          'nameReservations',
          reservationKey
        );
        return base.sdk.runTransaction(context.db, function (transaction) {
          return Promise.all([
            transaction.get(base.member),
            transaction.get(groupRef),
            transaction.get(reservationRef)
          ]).then(function (snapshots) {
            requireMemberSnapshot(snapshots[0]);
            var groupSnapshot = snapshots[1];
            var reservationSnapshot = snapshots[2];
            var existing = groupSnapshot.exists() ? groupSnapshot.data() : null;
            if (existing && expectedVersion === null) {
              throw appError('already-exists', 'Ja existe um grupo com esse nome.');
            }
            if (existing && expectedVersion !== Number(existing.version || 0)) {
              throw appError('aborted', 'Outra pessoa alterou este grupo.');
            }
            if (!existing && expectedVersion !== null) {
              throw appError('aborted', 'Este grupo ainda nao existe no Firebase.');
            }
            if (reservationSnapshot.exists() &&
                reservationSnapshot.data().resourcePath !== groupRef.path) {
              throw appError('already-exists', 'Ja existe outro grupo com esse nome.');
            }

            var now = base.sdk.serverTimestamp();
            var version = existing ? Number(existing.version || 0) + 1 : 1;
            var groupData = {
              id: groupId,
              workspaceId: context.workspaceId,
              name: name,
              nameKey: nameKey,
              color: color,
              version: version,
              updatedAt: now,
              updatedBy: context.user.uid,
              updatedByName: actorName(context)
            };
            if (!existing) {
              groupData.createdAt = now;
              groupData.createdBy = context.user.uid;
            }

            transaction.set(groupRef, groupData, { merge: true });
            transaction.set(reservationRef, {
              scope: 'grupos',
              name: name,
              nameKey: nameKey,
              resourcePath: groupRef.path,
              updatedAt: now
            });
            transaction.set(base.workspace, {
              dataVersion: base.sdk.increment(1),
              updatedAt: now,
              updatedBy: context.user.uid
            }, { merge: true });

            if (existing && existing.nameKey && existing.nameKey !== nameKey) {
              return reservationId('grupos', existing.nameKey).then(function (oldKey) {
                transaction.delete(base.sdk.doc(
                  base.workspace,
                  'nameReservations',
                  oldKey
                ));
                return { id: groupId, version: version };
              });
            }
            return { id: groupId, version: version };
          });
        });
      });
    });
  }

  // A consulta de colecoes acontece dentro do fluxo de exclusao para recusar
  // grupo em uso mesmo se a tela estiver com uma lista desatualizada.
  function deleteGroup(data) {
    return withContext(function (context) {
      var base = refs(context);
      var groupId = cleanId(data.groupId, 'ID do grupo');
      var groupRef = base.sdk.doc(base.workspace, 'groups', groupId);
      var usageQuery = base.sdk.query(
        base.sdk.collection(base.workspace, 'collections'),
        base.sdk.where('groupId', '==', groupId),
        base.sdk.limit(1)
      );

      return base.sdk.getDocs(usageQuery).then(function (usageSnapshot) {
        if (!usageSnapshot.empty) {
          throw appError(
            'failed-precondition',
            'Mova as colecoes deste grupo antes de exclui-lo.'
          );
        }
        return base.sdk.runTransaction(context.db, function (transaction) {
          return Promise.all([
            transaction.get(base.member),
            transaction.get(groupRef)
          ]).then(function (snapshots) {
            requireMemberSnapshot(snapshots[0]);
            if (!snapshots[1].exists()) return { deleted: false, reason: 'not-found' };
            var group = snapshots[1].data();
            if (Number(group.version || 0) !== Number(data.expectedVersion || 0)) {
              throw appError('aborted', 'Outra pessoa alterou este grupo.');
            }

            transaction.delete(groupRef);
            transaction.set(base.workspace, {
              dataVersion: base.sdk.increment(1),
              updatedAt: base.sdk.serverTimestamp(),
              updatedBy: context.user.uid
            }, { merge: true });
            if (!group.nameKey) {
              return { deleted: true, id: groupId, name: group.name || '' };
            }
            return reservationId('grupos', group.nameKey).then(function (oldKey) {
              transaction.delete(base.sdk.doc(
                base.workspace,
                'nameReservations',
                oldKey
              ));
              return { deleted: true, id: groupId, name: group.name || '' };
            });
          });
        });
      });
    });
  }

  // -----------------------------------------------------------------------
  // Exclusao em cascata
  // -----------------------------------------------------------------------
  function resolveDeleteTarget(context, data) {
    var base = refs(context);
    if (data.kind === 'collection') {
      var collectionId = cleanId(data.resourceId, 'ID da colecao');
      return {
        base: base,
        ref: base.sdk.doc(base.workspace, 'collections', collectionId),
        scope: 'colecoes',
        kind: data.kind
      };
    }
    var versioned = resolveVersioned(context, data);
    var resourceId = cleanId(data.resourceId, 'ID do conteudo');
    return {
      base: base,
      ref: base.sdk.doc(versioned.collection, resourceId),
      scope: versioned.scope,
      kind: data.kind
    };
  }

  // Firestore nao exclui subcolecoes automaticamente. Primeiro reunimos todos
  // os filhos e revisoes; depois os lotes removem folhas antes do documento pai.
  function collectDeleteReferences(target) {
    var sdk = target.base.sdk;
    var references = [];

    function collectRevisions(resourceRef) {
      return sdk.getDocs(sdk.collection(resourceRef, 'revisions')).then(function (snapshot) {
        snapshot.docs.forEach(function (item) { references.push(item.ref); });
      });
    }

    if (target.kind === 'libraryLayout') {
      return collectRevisions(target.ref).then(function () {
        return sdk.getDocs(sdk.collection(target.ref, 'variants'));
      }).then(function (variants) {
        return Promise.all(variants.docs.map(function (variant) {
          return collectRevisions(variant.ref).then(function () {
            references.push(variant.ref);
          });
        }));
      }).then(function () {
        references.push(target.ref);
        return references;
      });
    }

    if (target.kind !== 'collection') {
      return collectRevisions(target.ref).then(function () {
        references.push(target.ref);
        return references;
      });
    }

    return sdk.getDocs(sdk.collection(target.ref, 'layouts')).then(function (layouts) {
      return Promise.all(layouts.docs.map(function (layout) {
        return collectRevisions(layout.ref).then(function () {
          references.push(layout.ref);
        });
      }));
    }).then(function () {
      references.push(target.ref);
      return references;
    });
  }

  // Mantemos folga abaixo do limite de 500 operacoes por batch para que uma
  // futura operacao auxiliar possa ser adicionada sem estourar o commit.
  function deleteInBatches(context, references) {
    var sdk = context.firestore;
    var sequence = Promise.resolve();
    for (var index = 0; index < references.length; index += 400) {
      (function (chunk) {
        sequence = sequence.then(function () {
          var batch = sdk.writeBatch(context.db);
          chunk.forEach(function (reference) { batch.delete(reference); });
          return batch.commit();
        });
      })(references.slice(index, index + 400));
    }
    return sequence;
  }

  function deleteContent(data) {
    return withContext(function (context) {
      var target = resolveDeleteTarget(context, data);
      var base = target.base;
      return base.sdk.getDoc(target.ref).then(function (snapshot) {
        if (!snapshot.exists()) return { deleted: false, reason: 'not-found' };
        var existing = snapshot.data();

        return base.sdk.runTransaction(context.db, function (transaction) {
          return Promise.all([
            transaction.get(base.member),
            transaction.get(target.ref)
          ]).then(function (snapshots) {
            requireMemberSnapshot(snapshots[0]);
            if (!snapshots[1].exists()) return;
            var current = snapshots[1].data();
            if (data.expectedVersion !== undefined && data.expectedVersion !== null &&
                Number(current.version || 0) !== Number(data.expectedVersion)) {
              throw appError('aborted', 'Outra pessoa alterou este item.');
            }
            if (data.expectedRevisionId &&
                current.currentRevisionId !== data.expectedRevisionId) {
              throw appError('aborted', 'Outra pessoa salvou uma nova versao.');
            }
            transaction.set(target.ref, {
              deleting: true,
              updatedAt: base.sdk.serverTimestamp(),
              updatedBy: context.user.uid
            }, { merge: true });
            transaction.set(base.workspace, {
              dataVersion: base.sdk.increment(1),
              updatedAt: base.sdk.serverTimestamp(),
              updatedBy: context.user.uid
            }, { merge: true });
            if (current.nameKey) {
              return reservationId(target.scope, current.nameKey).then(function (oldKey) {
                transaction.delete(base.sdk.doc(
                  base.workspace,
                  'nameReservations',
                  oldKey
                ));
              });
            }
          });
        }).then(function () {
          return collectDeleteReferences(target);
        }).then(function (references) {
          return deleteInBatches(context, references);
        }).then(function () {
          return { deleted: true, id: target.ref.id, name: existing.name || '' };
        });
      });
    });
  }

  // -----------------------------------------------------------------------
  // Notas da equipe
  // -----------------------------------------------------------------------
  function saveTeamNoteSection(data) {
    return withContext(function (context) {
      var base = refs(context);
      var sections = base.sdk.collection(base.workspace, 'teamNoteSections');
      var sectionId = data.sectionId
        ? cleanId(data.sectionId, 'ID da secao')
        : base.sdk.doc(sections).id;
      var sectionRef = base.sdk.doc(sections, sectionId);
      var name = cleanName(data.name);
      var nameKey = normalizeName(name);
      var expectedVersion = data.expectedVersion === null || data.expectedVersion === undefined
        ? null
        : Number(data.expectedVersion);

      return reservationId('team-note-sections', nameKey).then(function (reservationKey) {
        var reservationRef = base.sdk.doc(base.workspace, 'nameReservations', reservationKey);
        return base.sdk.runTransaction(context.db, function (transaction) {
          return Promise.all([
            transaction.get(base.member),
            transaction.get(sectionRef),
            transaction.get(reservationRef)
          ]).then(function (snapshots) {
            requireMemberSnapshot(snapshots[0]);
            var existing = snapshots[1].exists() ? snapshots[1].data() : null;
            var reservation = snapshots[2].exists() ? snapshots[2].data() : null;
            if (existing && expectedVersion !== Number(existing.version || 0)) {
              throw appError('aborted', 'Outra pessoa alterou esta secao.');
            }
            if (!existing && expectedVersion !== null) {
              throw appError('aborted', 'Esta secao nao existe mais.');
            }
            if (reservation && reservation.resourcePath !== sectionRef.path) {
              throw appError('already-exists', 'Ja existe uma secao com esse nome.');
            }

            var now = base.sdk.serverTimestamp();
            var version = existing ? Number(existing.version || 0) + 1 : 1;
            var section = {
              id: sectionId,
              workspaceId: context.workspaceId,
              name: name,
              nameKey: nameKey,
              order: Number(data.order || (existing && existing.order) || 0),
              version: version,
              updatedAt: now,
              updatedBy: context.user.uid,
              updatedByName: actorName(context)
            };
            if (!existing) {
              section.createdAt = now;
              section.createdBy = context.user.uid;
            }
            transaction.set(sectionRef, section, { merge: true });
            transaction.set(reservationRef, {
              scope: 'team-note-sections',
              name: name,
              nameKey: nameKey,
              resourcePath: sectionRef.path,
              updatedAt: now
            });
            transaction.set(base.workspace, {
              dataVersion: base.sdk.increment(1),
              updatedAt: now,
              updatedBy: context.user.uid
            }, { merge: true });

            if (existing && existing.nameKey && existing.nameKey !== nameKey) {
              return reservationId('team-note-sections', existing.nameKey).then(function (oldKey) {
                transaction.delete(base.sdk.doc(base.workspace, 'nameReservations', oldKey));
                return { id: sectionId, version: version };
              });
            }
            return { id: sectionId, version: version };
          });
        });
      });
    });
  }

  function saveTeamNotePage(data) {
    return withContext(function (context) {
      var base = refs(context);
      var sectionId = cleanId(data.sectionId, 'ID da secao');
      var sectionRef = base.sdk.doc(base.workspace, 'teamNoteSections', sectionId);
      var pages = base.sdk.collection(sectionRef, 'pages');
      var pageId = data.pageId ? cleanId(data.pageId, 'ID da pagina') : base.sdk.doc(pages).id;
      var pageRef = base.sdk.doc(pages, pageId);
      var name = cleanName(data.name);
      var nameKey = normalizeName(name);
      var content = cleanText(data.content, 'Conteudo', 750000);
      if (!content.trim()) throw appError('invalid-argument', 'Escreva algum conteudo antes de salvar.');
      var expectedVersion = data.expectedVersion === null || data.expectedVersion === undefined
        ? null
        : Number(data.expectedVersion);
      var scope = 'team-note-pages:' + sectionId;

      return reservationId(scope, nameKey).then(function (reservationKey) {
        var reservationRef = base.sdk.doc(base.workspace, 'nameReservations', reservationKey);
        return base.sdk.runTransaction(context.db, function (transaction) {
          return Promise.all([
            transaction.get(base.member),
            transaction.get(sectionRef),
            transaction.get(pageRef),
            transaction.get(reservationRef)
          ]).then(function (snapshots) {
            requireMemberSnapshot(snapshots[0]);
            if (!snapshots[1].exists() || snapshots[1].data().deleting) {
              throw appError('failed-precondition', 'A secao nao existe mais.');
            }
            var existing = snapshots[2].exists() ? snapshots[2].data() : null;
            var reservation = snapshots[3].exists() ? snapshots[3].data() : null;
            if (existing && expectedVersion !== Number(existing.version || 0)) {
              throw appError('aborted', 'Outra pessoa alterou esta pagina.');
            }
            if (!existing && expectedVersion !== null) {
              throw appError('aborted', 'Esta pagina nao existe mais.');
            }
            if (reservation && reservation.resourcePath !== pageRef.path) {
              throw appError('already-exists', 'Ja existe uma pagina com esse titulo nesta secao.');
            }

            var now = base.sdk.serverTimestamp();
            var version = existing ? Number(existing.version || 0) + 1 : 1;
            var page = {
              id: pageId,
              workspaceId: context.workspaceId,
              sectionId: sectionId,
              name: name,
              nameKey: nameKey,
              content: content,
              version: version,
              updatedAt: now,
              updatedBy: context.user.uid,
              updatedByName: actorName(context)
            };
            if (!existing) {
              page.createdAt = now;
              page.createdBy = context.user.uid;
            }
            transaction.set(pageRef, page, { merge: true });
            transaction.set(reservationRef, {
              scope: scope,
              name: name,
              nameKey: nameKey,
              resourcePath: pageRef.path,
              updatedAt: now
            });
            transaction.set(base.workspace, {
              dataVersion: base.sdk.increment(1),
              updatedAt: now,
              updatedBy: context.user.uid
            }, { merge: true });

            if (existing && existing.nameKey && existing.nameKey !== nameKey) {
              return reservationId(scope, existing.nameKey).then(function (oldKey) {
                transaction.delete(base.sdk.doc(base.workspace, 'nameReservations', oldKey));
                return { id: pageId, version: version };
              });
            }
            return { id: pageId, version: version };
          });
        });
      });
    });
  }

  function deleteTeamNotePage(data) {
    return withContext(function (context) {
      var base = refs(context);
      var sectionId = cleanId(data.sectionId, 'ID da secao');
      var pageId = cleanId(data.pageId, 'ID da pagina');
      var pageRef = base.sdk.doc(base.workspace, 'teamNoteSections', sectionId, 'pages', pageId);
      return base.sdk.runTransaction(context.db, function (transaction) {
        return Promise.all([transaction.get(base.member), transaction.get(pageRef)]).then(function (snapshots) {
          requireMemberSnapshot(snapshots[0]);
          if (!snapshots[1].exists()) return null;
          var page = snapshots[1].data();
          if (Number(page.version || 0) !== Number(data.expectedVersion || 0)) {
            throw appError('aborted', 'Outra pessoa alterou esta pagina.');
          }
          transaction.set(pageRef, {
            deleting: true,
            updatedAt: base.sdk.serverTimestamp(),
            updatedBy: context.user.uid
          }, { merge: true });
          transaction.set(base.workspace, {
            dataVersion: base.sdk.increment(1),
            updatedAt: base.sdk.serverTimestamp(),
            updatedBy: context.user.uid
          }, { merge: true });
          if (!page.nameKey) return page;
          return reservationId('team-note-pages:' + sectionId, page.nameKey).then(function (key) {
            transaction.delete(base.sdk.doc(base.workspace, 'nameReservations', key));
            return page;
          });
        });
      }).then(function (page) {
        if (!page) return { deleted: false, reason: 'not-found' };
        return deleteInBatches(context, [pageRef]).then(function () {
          return { deleted: true, id: pageId, name: page.name || '' };
        });
      });
    });
  }

  function deleteTeamNoteSection(data) {
    return withContext(function (context) {
      var base = refs(context);
      var sectionId = cleanId(data.sectionId, 'ID da secao');
      var sectionRef = base.sdk.doc(base.workspace, 'teamNoteSections', sectionId);
      return base.sdk.runTransaction(context.db, function (transaction) {
        return Promise.all([transaction.get(base.member), transaction.get(sectionRef)]).then(function (snapshots) {
          requireMemberSnapshot(snapshots[0]);
          if (!snapshots[1].exists()) return null;
          var section = snapshots[1].data();
          if (Number(section.version || 0) !== Number(data.expectedVersion || 0)) {
            throw appError('aborted', 'Outra pessoa alterou esta secao.');
          }
          transaction.set(sectionRef, {
            deleting: true,
            updatedAt: base.sdk.serverTimestamp(),
            updatedBy: context.user.uid
          }, { merge: true });
          transaction.set(base.workspace, {
            dataVersion: base.sdk.increment(1),
            updatedAt: base.sdk.serverTimestamp(),
            updatedBy: context.user.uid
          }, { merge: true });
          if (!section.nameKey) return section;
          return reservationId('team-note-sections', section.nameKey).then(function (key) {
            transaction.delete(base.sdk.doc(base.workspace, 'nameReservations', key));
            return section;
          });
        });
      }).then(function (section) {
        if (!section) return { deleted: false, reason: 'not-found' };
        return base.sdk.getDocs(base.sdk.collection(sectionRef, 'pages')).then(function (snapshot) {
          return Promise.all(snapshot.docs.map(function (pageSnapshot) {
            var page = pageSnapshot.data();
            if (!page.nameKey) return null;
            return reservationId('team-note-pages:' + sectionId, page.nameKey).then(function (key) {
              return base.sdk.doc(base.workspace, 'nameReservations', key);
            });
          })).then(function (reservationRefs) {
            var references = snapshot.docs.map(function (item) { return item.ref; })
              .concat(reservationRefs.filter(Boolean), [sectionRef]);
            return deleteInBatches(context, references);
          });
        }).then(function () {
          return { deleted: true, id: sectionId, name: section.name || '' };
        });
      });
    });
  }

  window.SenkoFirestoreWrites = {
    saveVersionedContent: saveVersionedContent,
    saveCopyBaseTemplate: saveCopyBaseTemplate,
    saveCollection: saveCollection,
    saveGroup: saveGroup,
    deleteGroup: deleteGroup,
    deleteContent: deleteContent,
    saveTeamNoteSection: saveTeamNoteSection,
    saveTeamNotePage: saveTeamNotePage,
    deleteTeamNotePage: deleteTeamNotePage,
    deleteTeamNoteSection: deleteTeamNoteSection
  };
})();
