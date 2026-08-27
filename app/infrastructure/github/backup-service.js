(function () {
  var CONFIG_KEY = 'senkolib_github_config';
  var TOKEN_KEY = 'senkolib_github_token';
  var DATA_ROOT = 'backup/data/';
  var PUBLIC_ROOT = 'backup/latest/';
  var isRunning = false;

  function appError(message, code) {
    var error = new Error(message);
    error.code = code || 'github-backup/error';
    return error;
  }

  function cleanSegment(value, label) {
    var segment = String(value || '').trim();
    if (!segment || segment.indexOf('/') !== -1 || segment.length > 160) {
      throw appError(label + ' invalido.', 'github-backup/invalid-config');
    }
    return segment;
  }

  function cleanBranch(value) {
    var branch = String(value || 'main').trim();
    if (!branch || branch.length > 240 || /(^\/|\/$|\.\.|[~^:?*\[\\])/.test(branch)) {
      throw appError('Branch invalida.', 'github-backup/invalid-config');
    }
    return branch;
  }

  function readStoredConfig() {
    try {
      return JSON.parse(localStorage.getItem(CONFIG_KEY) || 'null') || {};
    } catch (error) {
      return {};
    }
  }

  function configuredDestination() {
    var configured = (window.SenkoFirebaseConfig || {}).githubBackup || {};
    return {
      owner: String(configured.owner || configured.OWNER || '').trim(),
      repo: String(configured.repo || configured.REPO || '').trim(),
      branch: String(configured.branch || configured.BRANCH || '').trim()
    };
  }

  function hasFixedDestination() {
    var configured = configuredDestination();
    return Boolean(configured.owner && configured.repo);
  }

  function configuredDefaults() {
    var configured = configuredDestination();
    var stored = readStoredConfig();

    /*
     * Em producao o destino do backup pertence ao projeto, nao ao navegador.
     * Configuracoes antigas no localStorage continuam servindo apenas como
     * fallback para ambientes sem githubBackup em firebase-config.js.
     */
    return {
      owner: configured.owner || stored.owner || stored.OWNER || '',
      repo: configured.repo || stored.repo || stored.REPO || '',
      branch: configured.branch || stored.branch || stored.BRANCH || 'main'
    };
  }

  function getToken() {
    try {
      return localStorage.getItem(TOKEN_KEY) || '';
    } catch (error) {
      return '';
    }
  }

  function saveCredentials(values) {
    var fixed = configuredDestination();
    var useFixedDestination = Boolean(fixed.owner && fixed.repo);
    var credentials = {
      owner: cleanSegment(useFixedDestination ? fixed.owner : values.owner, 'Owner'),
      repo: cleanSegment(useFixedDestination ? fixed.repo : values.repo, 'Repositorio'),
      branch: cleanBranch(useFixedDestination && fixed.branch ? fixed.branch : values.branch)
    };
    var token = String(values.token || '').trim();
    if (!token) {
      throw appError('Informe o token pessoal do GitHub.', 'github-backup/missing-token');
    }

    try {
      localStorage.setItem(CONFIG_KEY, JSON.stringify({
        OWNER: credentials.owner,
        REPO: credentials.repo,
        BRANCH: credentials.branch
      }));
      localStorage.setItem(TOKEN_KEY, token);
    } catch (error) {
      throw appError(
        'O navegador nao permitiu guardar a configuracao do GitHub.',
        'github-backup/storage-unavailable'
      );
    }
    return Object.assign({ token: token }, credentials);
  }

  function clearToken() {
    try {
      localStorage.removeItem(TOKEN_KEY);
    } catch (error) {}
  }

  function getCredentials() {
    var config = configuredDefaults();
    var token = getToken();
    if (!config.owner || !config.repo || !token) return null;
    return {
      owner: cleanSegment(config.owner, 'Owner'),
      repo: cleanSegment(config.repo, 'Repositorio'),
      branch: cleanBranch(config.branch),
      token: token
    };
  }

  function serializeValue(value) {
    if (value === null || value === undefined) return value == null ? null : value;
    if (value && typeof value.toDate === 'function') {
      return value.toDate().toISOString();
    }
    if (value && typeof value.path === 'string' && value.id) {
      return { documentPath: value.path };
    }
    if (value instanceof Uint8Array) {
      return Array.from(value);
    }
    if (Array.isArray(value)) return value.map(serializeValue);
    if (value && typeof value === 'object') {
      var output = {};
      Object.keys(value).forEach(function (key) {
        output[key] = serializeValue(value[key]);
      });
      return output;
    }
    return value;
  }

  function addDocumentFile(files, path, snapshot) {
    files[path + '.json'] = JSON.stringify(
      serializeValue(snapshot.data()),
      null,
      2
    ) + '\n';
  }

  function sortedDocuments(snapshot) {
    return snapshot.docs.slice().sort(function (left, right) {
      return left.id.localeCompare(right.id);
    });
  }

  function collectRevisions(context, resourceRef, relativePath, files) {
    var sdk = context.firestore;
    return sdk.getDocs(sdk.collection(resourceRef, 'revisions')).then(function (snapshot) {
      sortedDocuments(snapshot).forEach(function (revision) {
        addDocumentFile(
          files,
          relativePath + '/revisions/' + revision.id,
          revision
        );
      });
    });
  }

  function collectLibrary(context, workspaceRef, workspacePath, files) {
    var sdk = context.firestore;
    return sdk.getDocs(sdk.collection(workspaceRef, 'bibliotecaLayouts')).then(function (snapshot) {
      return Promise.all(sortedDocuments(snapshot).map(function (layout) {
        var layoutPath = workspacePath + '/bibliotecaLayouts/' + layout.id;
        addDocumentFile(files, layoutPath, layout);
        return Promise.all([
          collectRevisions(context, layout.ref, layoutPath, files),
          sdk.getDocs(sdk.collection(layout.ref, 'variants')).then(function (variants) {
            return Promise.all(sortedDocuments(variants).map(function (variant) {
              var variantPath = layoutPath + '/variants/' + variant.id;
              addDocumentFile(files, variantPath, variant);
              return collectRevisions(context, variant.ref, variantPath, files);
            }));
          })
        ]);
      }));
    });
  }

  function collectCollections(context, workspaceRef, workspacePath, files) {
    var sdk = context.firestore;
    return sdk.getDocs(sdk.collection(workspaceRef, 'collections')).then(function (snapshot) {
      return Promise.all(sortedDocuments(snapshot).map(function (collectionSnapshot) {
        var collectionPath = workspacePath + '/collections/' + collectionSnapshot.id;
        addDocumentFile(files, collectionPath, collectionSnapshot);
        return sdk.getDocs(sdk.collection(collectionSnapshot.ref, 'layouts')).then(function (layouts) {
          return Promise.all(sortedDocuments(layouts).map(function (layout) {
            var layoutPath = collectionPath + '/layouts/' + layout.id;
            addDocumentFile(files, layoutPath, layout);
            return collectRevisions(context, layout.ref, layoutPath, files);
          }));
        });
      }));
    });
  }

  function collectGroups(context, workspaceRef, workspacePath, files) {
    var sdk = context.firestore;
    return sdk.getDocs(sdk.collection(workspaceRef, 'groups')).then(function (snapshot) {
      sortedDocuments(snapshot).forEach(function (group) {
        addDocumentFile(files, workspacePath + '/groups/' + group.id, group);
      });
    });
  }

  function collectCopyBase(context, workspaceRef, workspacePath, files) {
    var sdk = context.firestore;
    var copyBaseRef = sdk.doc(workspaceRef, 'settings', 'copyBase');
    return sdk.getDoc(copyBaseRef).then(function (snapshot) {
      if (snapshot.exists()) {
        addDocumentFile(files, workspacePath + '/settings/copyBase', snapshot);
      }
    });
  }

  function collectTeamNotes(context, workspaceRef, workspacePath, files) {
    var sdk = context.firestore;
    return sdk.getDocs(sdk.collection(workspaceRef, 'teamNoteSections')).then(function (snapshot) {
      return Promise.all(sortedDocuments(snapshot).map(function (section) {
        if (section.data().deleting) return Promise.resolve();
        var sectionPath = workspacePath + '/teamNoteSections/' + section.id;
        addDocumentFile(files, sectionPath, section);
        return sdk.getDocs(sdk.collection(section.ref, 'pages')).then(function (pages) {
          sortedDocuments(pages).forEach(function (page) {
            if (page.data().deleting) return;
            addDocumentFile(files, sectionPath + '/pages/' + page.id, page);
          });
        });
      }));
    });
  }

  function buildWorkspaceFiles(context, workspaceData) {
    var sdk = context.firestore;
    var workspaceRef = sdk.doc(context.db, 'workspaces/' + context.workspaceId);
    var workspacePath = DATA_ROOT + 'workspaces/' + context.workspaceId;
    var files = {};

    return Promise.all([
      collectGroups(context, workspaceRef, workspacePath, files),
      collectLibrary(context, workspaceRef, workspacePath, files),
      collectCollections(context, workspaceRef, workspacePath, files),
      collectCopyBase(context, workspaceRef, workspacePath, files),
      collectTeamNotes(context, workspaceRef, workspacePath, files)
    ]).then(function () {
      var dataFiles = Object.keys(files).sort();
      files[DATA_ROOT + 'manifest.json'] = JSON.stringify({
        schemaVersion: 1,
        workspaceId: context.workspaceId,
        exportedAt: new Date().toISOString(),
        dataVersion: Number(workspaceData.dataVersion || 0),
        files: dataFiles
      }, null, 2) + '\n';
      if (!window.SenkoStaticBackupBuilder) {
        throw appError(
          'Gerador do backup publico nao foi carregado.',
          'github-backup/static-builder-missing'
        );
      }
      Object.assign(files, window.SenkoStaticBackupBuilder.buildPublicFiles(files));
      return files;
    });
  }

  function buildConsistentWorkspaceFiles(context, onProgress) {
    var sdk = context.firestore;
    var workspaceRef = sdk.doc(context.db, 'workspaces/' + context.workspaceId);

    function attempt(number, workspaceSnapshot) {
      if (!workspaceSnapshot.exists()) {
        throw appError('Workspace nao encontrado no Firebase.', 'github-backup/not-found');
      }
      var workspaceData = workspaceSnapshot.data();
      var expectedVersion = Number(workspaceData.dataVersion || 0);
      onProgress('Lendo os dados do Firebase...');
      return buildWorkspaceFiles(context, workspaceData).then(function (files) {
        return sdk.getDoc(workspaceRef).then(function (after) {
          if (!after.exists()) {
            throw appError('O workspace foi excluido durante o backup.');
          }
          if (Number(after.data().dataVersion || 0) === expectedVersion) {
            return { files: files, dataVersion: expectedVersion };
          }
          if (number >= 3) {
            throw appError(
              'Houve alteracoes durante tres leituras. Aguarde alguns segundos e tente novamente.',
              'github-backup/busy'
            );
          }
          onProgress('Novas mudancas chegaram. Refazendo a leitura...');
          return attempt(number + 1, after);
        });
      });
    }

    return sdk.getDoc(workspaceRef).then(function (workspaceSnapshot) {
      return attempt(1, workspaceSnapshot);
    });
  }

  function githubRequest(path, credentials, options) {
    var settings = options || {};
    var headers = Object.assign({
      'Accept': 'application/vnd.github+json',
      'Authorization': 'Bearer ' + credentials.token,
      'X-GitHub-Api-Version': '2022-11-28'
    }, settings.headers || {});

    return fetch('https://api.github.com' + path, Object.assign({}, settings, {
      headers: headers
    })).then(function (response) {
      return response.text().then(function (body) {
        var data = null;
        if (body) {
          try { data = JSON.parse(body); } catch (error) { data = body; }
        }
        if (!response.ok) {
          if (response.status === 401) clearToken();
          var detail = data && data.message ? data.message : String(data || 'sem detalhes');
          var normalizedDetail = detail.toLowerCase();
          var isRateLimit = response.status === 429 || (
            response.status === 403 && normalizedDetail.indexOf('rate limit') !== -1
          );
          if (isRateLimit) {
            var retryAfter = Number(response.headers.get('Retry-After'));
            var waitMessage = Number.isFinite(retryAfter) && retryAfter > 0
              ? ' Aguarde cerca de ' + Math.ceil(retryAfter / 60) + ' minuto(s).'
              : ' Aguarde alguns minutos antes de tentar novamente.';
            throw appError(
              'O GitHub limitou temporariamente os backups.' + waitMessage,
              'github-backup/rate-limited'
            );
          }
          if (response.status === 401) {
            throw appError(
              'O token do GitHub expirou ou foi revogado. Informe um token valido.',
              'github-backup/permission-denied'
            );
          }
          if (response.status === 403) {
            throw appError(
              'O token nao tem permissao para gravar nesse repositorio ou branch.',
              'github-backup/permission-denied'
            );
          }
          var shortDetail = detail.length > 280 ? detail.slice(0, 277) + '...' : detail;
          throw appError(
            'GitHub recusou o backup (' + response.status + '): ' + shortDetail,
            'github-backup/github-error'
          );
        }
        return data;
      });
    }).catch(function (error) {
      if (error && String(error.code || '').indexOf('github-backup/') === 0) throw error;
      throw appError(
        'Nao foi possivel conectar a API do GitHub. Confira a internet e tente novamente.',
        'github-backup/network'
      );
    });
  }

  function encodePathSegment(value) {
    return String(value).split('/').map(encodeURIComponent).join('/');
  }

  function gitBlobSha(content) {
    if (!window.crypto || !window.crypto.subtle) return Promise.resolve(null);
    var encoder = new TextEncoder();
    var contentBytes = encoder.encode(content);
    var prefixBytes = encoder.encode('blob ' + contentBytes.length + '\0');
    var input = new Uint8Array(prefixBytes.length + contentBytes.length);
    input.set(prefixBytes, 0);
    input.set(contentBytes, prefixBytes.length);
    return window.crypto.subtle.digest('SHA-1', input).then(function (buffer) {
      return Array.from(new Uint8Array(buffer)).map(function (byte) {
        return byte.toString(16).padStart(2, '0');
      }).join('');
    }).catch(function () {
      return null;
    });
  }

  function changedFileEntries(entries, currentTree) {
    var currentByPath = {};
    currentTree.forEach(function (entry) {
      if (entry.type === 'blob') currentByPath[entry.path] = entry.sha;
    });
    return Promise.all(entries.map(function (entry) {
      return gitBlobSha(entry[1]).then(function (sha) {
        return sha && currentByPath[entry[0]] === sha ? null : entry;
      });
    })).then(function (compared) {
      return compared.filter(Boolean);
    });
  }

  function commitFiles(files, credentials, message, onProgress) {
    var repoPath = '/repos/' + encodeURIComponent(credentials.owner) +
      '/' + encodeURIComponent(credentials.repo);
    var branchPath = encodePathSegment(credentials.branch);
    var authJson = { 'Content-Type': 'application/json' };
    var headSha;
    var baseTreeSha;
    var currentTree;

    onProgress('Conferindo o repositorio no GitHub...');
    return githubRequest(
      repoPath + '/git/ref/heads/' + branchPath,
      credentials
    ).then(function (reference) {
      headSha = reference.object.sha;
      return githubRequest(repoPath + '/git/commits/' + encodeURIComponent(headSha), credentials);
    }).then(function (commit) {
      baseTreeSha = commit.tree.sha;
      return githubRequest(
        repoPath + '/git/trees/' + encodeURIComponent(baseTreeSha) + '?recursive=1',
        credentials
      );
    }).then(function (tree) {
      if (tree.truncated) {
        throw appError('A arvore do repositorio e grande demais para um backup seguro.');
      }
      currentTree = tree.tree || [];
      var entries = Object.keys(files).sort().map(function (path) {
        return [path, files[path]];
      });
      return changedFileEntries(entries, currentTree).then(function (changedEntries) {
        onProgress('Preparando ' + changedEntries.length + ' arquivo(s) alterado(s)...');
        return changedEntries.map(function (entry) {
          return { path: entry[0], mode: '100644', type: 'blob', content: entry[1] };
        });
      });
    }).then(function (treeEntries) {
      var nextPaths = {};
      Object.keys(files).forEach(function (path) { nextPaths[path] = true; });
      var removals = currentTree.filter(function (entry) {
        return entry.type === 'blob' &&
          (entry.path.indexOf(DATA_ROOT) === 0 || entry.path.indexOf(PUBLIC_ROOT) === 0) &&
          !nextPaths[entry.path];
      }).map(function (entry) {
        return { path: entry.path, mode: '100644', type: 'blob', sha: null };
      });
      return githubRequest(repoPath + '/git/trees', credentials, {
        method: 'POST',
        headers: authJson,
        body: JSON.stringify({
          base_tree: baseTreeSha,
          tree: treeEntries.concat(removals)
        })
      });
    }).then(function (tree) {
      onProgress('Criando o commit do backup...');
      return githubRequest(repoPath + '/git/commits', credentials, {
        method: 'POST',
        headers: authJson,
        body: JSON.stringify({
          message: message,
          tree: tree.sha,
          parents: [headSha]
        })
      });
    }).then(function (commit) {
      return githubRequest(repoPath + '/git/refs/heads/' + branchPath, credentials, {
        method: 'PATCH',
        headers: authJson,
        body: JSON.stringify({ sha: commit.sha, force: false })
      }).then(function () {
        return {
          commitSha: commit.sha,
          url: 'https://github.com/' + credentials.owner + '/' +
            credentials.repo + '/commit/' + commit.sha
        };
      });
    });
  }

  function writeExportLog(context, jobRef, values) {
    return context.firestore.setDoc(jobRef, values, { merge: true }).catch(function (error) {
      console.warn('[SenkoGithubBackup] Nao foi possivel registrar o log:', error);
    });
  }

  function performBackup(credentials, onProgress) {
    var context;
    var workspaceRef;
    var jobRef;
    var snapshot;
    return window.SenkoFirebase.whenAuthorized().then(function () {
      context = window.SenkoFirebase.getClientContext();
      workspaceRef = context.firestore.doc(
        context.db,
        'workspaces/' + context.workspaceId
      );
      jobRef = context.firestore.doc(context.firestore.collection(workspaceRef, 'exports'));
      return writeExportLog(context, jobRef, {
        status: 'running',
        triggeredBy: context.user.uid,
        triggeredByName: context.user.displayName || context.user.email || 'Membro',
        startedAt: context.firestore.serverTimestamp()
      });
    }).then(function () {
      return buildConsistentWorkspaceFiles(context, onProgress);
    }).then(function (builtSnapshot) {
      snapshot = builtSnapshot;
      return commitFiles(
        snapshot.files,
        credentials,
        'SenkoLib backup v' + snapshot.dataVersion + ' (' +
          (context.user.displayName || context.user.email || context.user.uid) + ')',
        onProgress
      );
    }).then(function (commit) {
      var completedAt = context.firestore.serverTimestamp();
      return Promise.all([
        writeExportLog(context, jobRef, {
          status: 'completed',
          dataVersion: snapshot.dataVersion,
          completedAt: completedAt,
          commitSha: commit.commitSha,
          commitUrl: commit.url,
          fileCount: Object.keys(snapshot.files).length
        }),
        context.firestore.setDoc(workspaceRef, {
          lastGithubExportVersion: snapshot.dataVersion,
          lastGithubExportAt: completedAt,
          lastGithubCommitSha: commit.commitSha
        }, { merge: true }).then(function () {
          return true;
        }).catch(function (error) {
          console.warn('[SenkoGithubBackup] Commit criado, mas metadados falharam:', error);
          return false;
        })
      ]).then(function (results) {
        return Object.assign({
          dataVersion: snapshot.dataVersion,
          fileCount: Object.keys(snapshot.files).length,
          metadataRecorded: results[1]
        }, commit);
      });
    }).catch(function (error) {
      if (context && jobRef) {
        writeExportLog(context, jobRef, {
          status: 'failed',
          completedAt: context.firestore.serverTimestamp(),
          error: String(error.message || error).slice(0, 1000)
        });
      }
      throw error;
    });
  }

  function run(options) {
    if (isRunning) {
      return Promise.reject(appError(
        'Ja existe um backup em andamento.',
        'github-backup/already-running'
      ));
    }
    var settings = options || {};
    var onProgress = typeof settings.onProgress === 'function'
      ? settings.onProgress
      : function () {};
    var credentials = settings.credentials || getCredentials();
    if (!credentials) {
      return Promise.reject(appError(
        'Configure o repositorio e o token antes do backup.',
        'github-backup/not-configured'
      ));
    }

    isRunning = true;
    return performBackup(credentials, onProgress).finally(function () {
      isRunning = false;
    });
  }

  window.SenkoGithubBackup = {
    getDefaults: configuredDefaults,
    getToken: getToken,
    getCredentials: getCredentials,
    saveCredentials: saveCredentials,
    clearToken: clearToken,
    isConfigured: function () { return Boolean(getCredentials()); },
    isRunning: function () { return isRunning; },
    isDestinationFixed: hasFixedDestination,
    run: run
  };
})();
