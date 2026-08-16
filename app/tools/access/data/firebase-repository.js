(function () {
  /*
   * Repository da ferramenta Acessos.
   *
   * Concentra consultas e mutacoes de membros, solicitacoes e auditoria. A
   * tela recebe objetos simples e nao conhece caminhos Firestore. As funcoes
   * assertManager/assertOwner existem tambem no cliente para feedback rapido;
   * a seguranca efetiva continua nas regras do Firebase.
   *
   * Invariante: admin pode administrar admin/editor, mas somente owner pode
   * criar, promover, rebaixar ou remover outro owner.
   */
  function context() {
    return window.SenkoFirebase.getClientContext();
  }

  function currentRole() {
    var member = context().member || {};
    return member.role || 'editor';
  }

  function isOwner() {
    return currentRole() === 'owner';
  }

  function isManager() {
    return ['owner', 'admin'].indexOf(currentRole()) !== -1;
  }

  function assertManager() {
    if (!isManager()) throw new Error('Somente administradores podem gerenciar acessos.');
  }

  function assertAssignable(role) {
    if (['owner', 'admin', 'editor'].indexOf(role) === -1) {
      throw new Error('Cargo invalido.');
    }
    if (!isOwner() && role !== 'editor') {
      throw new Error('Admins podem conceder somente o cargo de editor.');
    }
  }

  function workspacePath(relativePath) {
    return window.SenkoFirebase.getWorkspacePath(relativePath);
  }

  function actorName(client) {
    return (client.user && (client.user.displayName || client.user.email)) || 'Administrador';
  }

  // Eventos sao gravados na mesma transacao da mudanca administrativa. Assim
  // nunca existe um cargo alterado sem trilha correspondente no app.
  function eventData(client, eventRef, action, target, targetRole) {
    return {
      id: eventRef.id,
      action: action,
      targetUid: target.uid,
      targetEmail: target.email || '',
      targetRole: targetRole == null ? null : targetRole,
      actorUid: client.user.uid,
      actorName: actorName(client),
      createdAt: client.firestore.serverTimestamp()
    };
  }

  // Firestore e Realtime Database nao oferecem transacao cruzada. O Firestore
  // confirma o cargo primeiro; se o espelho de presenca falhar, a UI oferece
  // reparo explicito sem desfazer a autorizacao principal.
  function syncRealtime(uid, role) {
    return window.SenkoFirebase.syncMemberRealtimeAccess(uid, role).then(function () {
      return { realtimeSynced: true };
    }).catch(function (error) {
      console.warn('[SenkoAccess] Cargo salvo, mas acesso de presenca falhou:', error);
      return {
        realtimeSynced: false,
        warning: 'O cargo foi salvo, mas a presenca precisa ser sincronizada novamente.'
      };
    });
  }

  function watchRequests(callback, onError) {
    assertManager();
    return window.SenkoFirebase.listenCollection(
      workspacePath('accessRequests'),
      { orderBy: [['lastAttemptAt', 'desc']] },
      callback,
      onError
    );
  }

  function watchMembers(callback, onError) {
    assertManager();
    return window.SenkoFirebase.listenCollection(
      workspacePath('members'),
      { orderBy: [['displayName', 'asc']] },
      callback,
      onError
    );
  }

  function watchEvents(callback, onError) {
    assertManager();
    return window.SenkoFirebase.listenCollection(
      workspacePath('memberEvents'),
      { orderBy: [['createdAt', 'desc']], limit: 50 },
      callback,
      onError
    );
  }

  // Aprovar cria o membro, fecha a solicitacao e registra auditoria no mesmo
  // commit Firestore. A sincronizacao de presenca acontece somente depois.
  function approveRequest(request, role) {
    assertManager();
    assertAssignable(role);
    var client = context();
    var sdk = client.firestore;
    var requestRef = sdk.doc(client.db, workspacePath('accessRequests/' + request.uid));
    var memberRef = sdk.doc(client.db, workspacePath('members/' + request.uid));
    var eventRef = sdk.doc(sdk.collection(client.db, workspacePath('memberEvents')));

    return sdk.runTransaction(client.db, function (transaction) {
      return Promise.all([
        transaction.get(requestRef),
        transaction.get(memberRef)
      ]).then(function (snapshots) {
        var requestSnapshot = snapshots[0];
        var memberSnapshot = snapshots[1];
        if (!requestSnapshot.exists() || requestSnapshot.data().status !== 'pending') {
          throw new Error('Esta solicitacao nao esta mais pendente.');
        }
        if (memberSnapshot.exists()) throw new Error('Esta conta ja e membro.');

        var now = sdk.serverTimestamp();
        transaction.set(memberRef, {
          uid: request.uid,
          email: request.email || '',
          displayName: request.displayName || request.email || 'Pessoa',
          role: role,
          joinedAt: now,
          updatedAt: now,
          updatedBy: client.user.uid
        });
        transaction.update(requestRef, {
          status: 'approved',
          reviewedAt: now,
          reviewedBy: client.user.uid,
          reviewedRole: role
        });
        transaction.set(eventRef, eventData(client, eventRef, 'approve', request, role));
      });
    }).then(function () {
      return syncRealtime(request.uid, role);
    });
  }

  function rejectRequest(request) {
    assertManager();
    var client = context();
    var sdk = client.firestore;
    var requestRef = sdk.doc(client.db, workspacePath('accessRequests/' + request.uid));
    var eventRef = sdk.doc(sdk.collection(client.db, workspacePath('memberEvents')));

    return sdk.runTransaction(client.db, function (transaction) {
      return transaction.get(requestRef).then(function (snapshot) {
        if (!snapshot.exists() || snapshot.data().status !== 'pending') {
          throw new Error('Esta solicitacao nao esta mais pendente.');
        }
        transaction.update(requestRef, {
          status: 'rejected',
          reviewedAt: sdk.serverTimestamp(),
          reviewedBy: client.user.uid,
          reviewedRole: null
        });
        transaction.set(eventRef, eventData(client, eventRef, 'reject', request, null));
      });
    });
  }

  // A transacao relê o alvo para impedir que uma tela antiga rebaixe um owner
  // que foi promovido por outra pessoa alguns segundos antes.
  function changeRole(member, role) {
    assertManager();
    assertAssignable(role);
    if (!isOwner()) throw new Error('Somente proprietarios podem alterar cargos.');
    var client = context();
    if (member.uid === client.user.uid && role !== member.role) {
      throw new Error('Promova outro proprietario antes de transferir seu cargo.');
    }
    if (member.role === role) return syncRealtime(member.uid, role);

    var sdk = client.firestore;
    var memberRef = sdk.doc(client.db, workspacePath('members/' + member.uid));
    var eventRef = sdk.doc(sdk.collection(client.db, workspacePath('memberEvents')));
    return sdk.runTransaction(client.db, function (transaction) {
      return transaction.get(memberRef).then(function (snapshot) {
        if (!snapshot.exists()) throw new Error('Membro nao encontrado.');
        transaction.update(memberRef, {
          role: role,
          updatedAt: sdk.serverTimestamp(),
          updatedBy: client.user.uid
        });
        transaction.set(eventRef, eventData(client, eventRef, 'role-change', member, role));
      });
    }).then(function () {
      return syncRealtime(member.uid, role);
    });
  }

  function removeMember(member) {
    assertManager();
    var client = context();
    if (member.uid === client.user.uid) {
      return Promise.reject(new Error('Voce nao pode remover a propria conta.'));
    }
    if (!isOwner() && member.role !== 'editor') {
      return Promise.reject(new Error('Admins podem remover somente editores.'));
    }

    var sdk = client.firestore;
    var memberRef = sdk.doc(client.db, workspacePath('members/' + member.uid));
    var eventRef = sdk.doc(sdk.collection(client.db, workspacePath('memberEvents')));
    return sdk.runTransaction(client.db, function (transaction) {
      return transaction.get(memberRef).then(function (snapshot) {
        if (!snapshot.exists()) throw new Error('Membro nao encontrado.');
        transaction.delete(memberRef);
        transaction.set(eventRef, eventData(client, eventRef, 'remove', member, member.role || 'editor'));
      });
    }).then(function () {
      return syncRealtime(member.uid, null);
    });
  }

  window.SenkoAccessRepository = {
    getCurrentRole: currentRole,
    isOwner: isOwner,
    isManager: isManager,
    watchRequests: watchRequests,
    watchMembers: watchMembers,
    watchEvents: watchEvents,
    approveRequest: approveRequest,
    rejectRequest: rejectRequest,
    changeRole: changeRole,
    removeMember: removeMember,
    repairRealtimeAccess: function (member) {
      assertManager();
      if (!isOwner() && member.role !== 'editor') {
        return Promise.reject(new Error('Admins podem sincronizar somente editores.'));
      }
      return syncRealtime(member.uid, member.role || 'editor');
    }
  };
})();
