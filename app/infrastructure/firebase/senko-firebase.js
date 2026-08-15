(function () {
  var config = window.SenkoFirebaseConfig || {};
  var listeners = [];
  var initializedPromise;
  var memberUnsubscribe;
  var authorizedResolvers = [];
  var services = {};
  var modules = {};
  var state = {
    enabled: Boolean(config.enabled),
    status: config.enabled ? 'loading' : 'disabled',
    user: null,
    member: null,
    error: null,
    serviceIssue: null,
    usingEmulators: false
  };

  function snapshotState() {
    return {
      enabled: state.enabled,
      status: state.status,
      user: state.user,
      member: state.member,
      error: state.error,
      serviceIssue: state.serviceIssue,
      usingEmulators: state.usingEmulators
    };
  }

  function errorCode(error) {
    return String(error && error.code || '')
      .toLowerCase()
      .replace(/^firebase\//, '')
      .replace(/^firestore\//, '')
      .replace(/^functions\//, '')
      .replace(/^auth\//, '');
  }

  function describeServiceError(error) {
    var code = errorCode(error);
    var message = String(error && error.message || '');
    var normalizedMessage = message.toLowerCase();
    var browserOffline = typeof navigator !== 'undefined' && navigator.onLine === false;
    var isQuota = code === 'resource-exhausted' || code === 'quota-exceeded' ||
      normalizedMessage.indexOf('quota') !== -1 ||
      normalizedMessage.indexOf('50,000') !== -1 ||
      normalizedMessage.indexOf('50000') !== -1;

    if (isQuota) {
      return {
        kind: 'quota',
        code: code || 'resource-exhausted',
        title: 'Limite do Firebase atingido',
        message: 'As leituras do plano gratuito acabaram por enquanto.'
      };
    }

    if (browserOffline) {
      return {
        kind: 'offline',
        code: code || 'network-request-failed',
        title: 'Sem conexao com a internet',
        message: 'Este dispositivo nao consegue acessar o Firebase.'
      };
    }

    if (['unavailable', 'deadline-exceeded', 'network-request-failed'].indexOf(code) !== -1) {
      return {
        kind: 'unavailable',
        code: code,
        title: 'Firebase indisponivel',
        message: 'Nao foi possivel manter a conexao com os dados ao vivo.'
      };
    }

    return {
      kind: 'error',
      code: code || 'unknown',
      title: 'Falha no Firebase',
      message: message || 'Nao foi possivel acessar os dados ao vivo.'
    };
  }

  function reportServiceError(error, source, force) {
    var issue = describeServiceError(error);
    issue.source = String(source || 'firebase');
    issue.detectedAt = new Date().toISOString();

    if (!force && issue.kind === 'error') return issue;

    publish({
      status: 'error',
      error: error || new Error(issue.message),
      serviceIssue: issue
    });
    return issue;
  }

  function handleListenerError(error, callback, source) {
    reportServiceError(error, source, true);
    if (typeof callback === 'function') callback(error);
  }

  function normalizeMember(member) {
    if (!member) return null;
    return Object.assign({ role: 'editor' }, member);
  }

  function publish(patch) {
    Object.keys(patch || {}).forEach(function (key) {
      state[key] = patch[key];
    });

    var current = snapshotState();
    listeners.slice().forEach(function (listener) {
      try {
        listener(current);
      } catch (error) {
        console.error('[SenkoFirebase] Falha em listener de estado:', error);
      }
    });

    window.dispatchEvent(new CustomEvent('senko:firebase-state', {
      detail: current
    }));

    if (current.status === 'ready') {
      authorizedResolvers.splice(0).forEach(function (resolve) {
        resolve(current);
      });
    }
  }

  function onStateChange(listener) {
    if (typeof listener !== 'function') return function () {};
    listeners.push(listener);
    listener(snapshotState());
    return function () {
      var index = listeners.indexOf(listener);
      if (index !== -1) listeners.splice(index, 1);
    };
  }

  function validateConfig() {
    var firebase = config.firebase || {};
    var required = ['apiKey', 'authDomain', 'projectId', 'storageBucket', 'appId'];
    var missing = required.filter(function (key) {
      return !String(firebase[key] || '').trim();
    });

    if (missing.length) {
      throw new Error(
        'Configuracao Firebase incompleta: ' + missing.join(', ') +
        '. Consulte FIREBASE_SETUP.md.'
      );
    }
  }

  function importSdk() {
    var version = String(config.sdkVersion || '12.17.0');
    var base = 'https://www.gstatic.com/firebasejs/' + version + '/';

    return Promise.all([
      import(base + 'firebase-app.js'),
      import(base + 'firebase-auth.js'),
      import(base + 'firebase-firestore.js'),
      import(base + 'firebase-functions.js'),
      import(base + 'firebase-database.js'),
      import(base + 'firebase-storage.js')
    ]).then(function (loaded) {
      modules.app = loaded[0];
      modules.auth = loaded[1];
      modules.firestore = loaded[2];
      modules.functions = loaded[3];
      modules.database = loaded[4];
      modules.storage = loaded[5];
    });
  }

  function shouldUseEmulators() {
    if (!config.useEmulators) return false;
    var host = window.location.hostname;
    return host === '127.0.0.1' || host === 'localhost';
  }

  function connectEmulators() {
    if (!shouldUseEmulators()) return;

    modules.auth.connectAuthEmulator(services.auth, 'http://127.0.0.1:9099', {
      disableWarnings: true
    });
    modules.firestore.connectFirestoreEmulator(services.db, '127.0.0.1', 8080);
    modules.functions.connectFunctionsEmulator(services.functions, '127.0.0.1', 5001);
    modules.database.connectDatabaseEmulator(services.realtime, '127.0.0.1', 9000);
    modules.storage.connectStorageEmulator(services.storage, '127.0.0.1', 9199);
    state.usingEmulators = true;
  }

  function memberPath(uid) {
    return 'workspaces/' + getWorkspaceId() + '/members/' + uid;
  }

  function accessRequestPath(uid) {
    return 'workspaces/' + getWorkspaceId() + '/accessRequests/' + uid;
  }

  function getWorkspaceId() {
    return String(config.workspaceId || 'senkolib');
  }

  function getWorkspacePath(relativePath) {
    var suffix = String(relativePath || '').replace(/^\/+/, '');
    return 'workspaces/' + getWorkspaceId() + (suffix ? '/' + suffix : '');
  }

  function stopMemberListener() {
    if (typeof memberUnsubscribe === 'function') memberUnsubscribe();
    memberUnsubscribe = null;
  }

  function startMemberListener(user, reference) {
    stopMemberListener();
    memberUnsubscribe = modules.firestore.onSnapshot(reference, function (snapshot) {
      if (!state.user || state.user.uid !== user.uid) return;
      if (!snapshot.exists()) {
        publish({ status: 'unauthorized', user: user, member: null, error: null });
        return;
      }
      publish({
        status: 'ready',
        user: user,
        member: normalizeMember(Object.assign({ id: snapshot.id }, snapshot.data())),
        error: null,
        serviceIssue: null
      });
    }, function (error) {
      console.warn('[SenkoFirebase] Falha ao acompanhar o cargo do membro:', error);
      reportServiceError(error, 'member-listener', true);
    });
  }

  function recordAccessRequest(user) {
    var reference = modules.firestore.doc(services.db, accessRequestPath(user.uid));
    return modules.firestore.runTransaction(services.db, function (transaction) {
      return transaction.get(reference).then(function (requestSnapshot) {
        var current = requestSnapshot.exists() ? requestSnapshot.data() : null;
        var requestData = {
          uid: user.uid,
          workspaceId: getWorkspaceId(),
          email: user.email || '',
          displayName: user.displayName || '',
          status: 'pending',
          attemptCount: current ? Number(current.attemptCount || 0) + 1 : 1,
          firstAttemptAt: current && current.firstAttemptAt
            ? current.firstAttemptAt
            : modules.firestore.serverTimestamp(),
          lastAttemptAt: modules.firestore.serverTimestamp()
        };

        transaction.set(reference, requestData);
      });
    });
  }

  function checkMembership(user) {
    var reference = modules.firestore.doc(services.db, memberPath(user.uid));
    return modules.firestore.getDoc(reference).then(function (memberSnapshot) {
      if (!memberSnapshot.exists() && state.usingEmulators) {
        return callFunction('bootstrapEmulatorMember', {
          workspaceId: getWorkspaceId()
        }).then(function () {
          return modules.firestore.getDoc(reference);
        }).then(function (createdMemberSnapshot) {
          if (!createdMemberSnapshot.exists()) {
            throw new Error('O emulador nao conseguiu criar o membro local.');
          }
          publish({
            status: 'ready',
            user: user,
            member: normalizeMember(Object.assign({
              id: createdMemberSnapshot.id
            }, createdMemberSnapshot.data())),
            error: null,
            serviceIssue: null
          });
          startMemberListener(user, reference);
          return callFunction('ensurePresenceAccess', {
            workspaceId: getWorkspaceId()
          });
        });
      }

      if (!memberSnapshot.exists()) {
        publish({
          status: 'unauthorized',
          user: user,
          member: null,
          error: null,
          serviceIssue: null
        });
        startMemberListener(user, reference);
        return recordAccessRequest(user).catch(function (error) {
          console.warn(
            '[SenkoFirebase] Nao foi possivel registrar a solicitacao de acesso:',
            error.message || error
          );
        });
      }

      publish({
        status: 'ready',
        user: user,
        member: normalizeMember(Object.assign({ id: memberSnapshot.id }, memberSnapshot.data())),
        error: null,
        serviceIssue: null
      });
      startMemberListener(user, reference);

      /*
       * A Function replica a permissao no Realtime Database. Se as Functions
       * ainda nao tiverem sido implantadas, a autenticacao principal continua
       * funcionando e somente a presenca fica indisponivel.
       */
      callFunction('ensurePresenceAccess', {
        workspaceId: getWorkspaceId()
      }).catch(function (error) {
        console.warn('[SenkoFirebase] Presenca ainda nao configurada:', error.message || error);
      });
    });
  }

  function initialize() {
    if (initializedPromise) return initializedPromise;

    if (!config.enabled) {
      initializedPromise = Promise.resolve(snapshotState());
      return initializedPromise;
    }

    initializedPromise = Promise.resolve()
      .then(validateConfig)
      .then(importSdk)
      .then(function () {
        services.app = modules.app.initializeApp(config.firebase);
        services.auth = modules.auth.getAuth(services.app);
        services.db = modules.firestore.getFirestore(services.app);
        services.functions = modules.functions.getFunctions(
          services.app,
          config.region || 'southamerica-east1'
        );
        services.realtime = modules.database.getDatabase(services.app);
        services.storage = modules.storage.getStorage(services.app);

        connectEmulators();

        return modules.auth.setPersistence(
          services.auth,
          modules.auth.browserLocalPersistence
        );
      })
      .then(function () {
        modules.auth.onAuthStateChanged(services.auth, function (user) {
          stopMemberListener();
          if (!user) {
            publish({
              status: 'signed-out',
              user: null,
              member: null,
              error: null,
              serviceIssue: null
            });
            return;
          }

          publish({
            status: 'checking-access',
            user: user,
            member: null,
            error: null,
            serviceIssue: null
          });

          checkMembership(user).catch(function (error) {
            state.user = user;
            state.member = null;
            reportServiceError(error, 'membership-check', true);
          });
        });

        return snapshotState();
      })
      .catch(function (error) {
        console.error('[SenkoFirebase] Inicializacao falhou:', error);
        reportServiceError(error, 'initialization', true);
        throw error;
      });

    return initializedPromise;
  }

  function signInWithGoogle() {
    return initialize().then(function () {
      var provider = new modules.auth.GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
      return modules.auth.signInWithPopup(services.auth, provider);
    });
  }

  function signOut() {
    if (!services.auth) return Promise.resolve();
    return modules.auth.signOut(services.auth);
  }

  function whenAuthorized() {
    if (state.status === 'ready') return Promise.resolve(snapshotState());
    return new Promise(function (resolve) {
      authorizedResolvers.push(resolve);
    });
  }

  function assertReady() {
    if (state.status !== 'ready') {
      throw new Error('Entre com uma conta autorizada antes de acessar os dados.');
    }
  }

  function callFunction(name, data) {
    if (!services.functions) {
      return initialize().then(function () {
        return callFunction(name, data);
      });
    }
    var callable = modules.functions.httpsCallable(services.functions, name);
    return callable(data || {}).then(function (result) {
      return result.data;
    });
  }

  function getClientContext() {
    assertReady();
    return {
      db: services.db,
      firestore: modules.firestore,
      user: state.user,
      member: state.member,
      workspaceId: getWorkspaceId()
    };
  }

  function buildQuery(reference, options) {
    var constraints = [];
    var settings = options || {};

    (settings.where || []).forEach(function (filter) {
      constraints.push(modules.firestore.where(filter[0], filter[1], filter[2]));
    });

    (settings.orderBy || []).forEach(function (ordering) {
      constraints.push(modules.firestore.orderBy(ordering[0], ordering[1] || 'asc'));
    });

    if (settings.limit) {
      constraints.push(modules.firestore.limit(settings.limit));
    }

    return constraints.length
      ? modules.firestore.query.apply(null, [reference].concat(constraints))
      : reference;
  }

  function listenCollection(path, options, callback, onError) {
    assertReady();
    var reference = modules.firestore.collection(services.db, path);
    var queryReference = buildQuery(reference, options);

    return modules.firestore.onSnapshot(queryReference, function (snapshot) {
      var documents = snapshot.docs.map(function (documentSnapshot) {
        return Object.assign({ id: documentSnapshot.id }, documentSnapshot.data());
      });
      callback(documents, snapshot.docChanges());
    }, function (error) {
      handleListenerError(error, onError, 'collection-listener');
    });
  }

  function listenCollectionGroup(collectionId, options, callback, onError) {
    assertReady();
    var reference = modules.firestore.collectionGroup(services.db, collectionId);
    var queryReference = buildQuery(reference, options);

    return modules.firestore.onSnapshot(queryReference, function (snapshot) {
      var documents = snapshot.docs.map(function (documentSnapshot) {
        return Object.assign({
          id: documentSnapshot.id,
          path: documentSnapshot.ref.path
        }, documentSnapshot.data());
      });
      callback(documents, snapshot.docChanges());
    }, function (error) {
      handleListenerError(error, onError, 'collection-group-listener');
    });
  }

  function listenDocument(path, callback, onError) {
    assertReady();
    var reference = modules.firestore.doc(services.db, path);
    return modules.firestore.onSnapshot(reference, function (documentSnapshot) {
      callback(documentSnapshot.exists()
        ? Object.assign({ id: documentSnapshot.id }, documentSnapshot.data())
        : null);
    }, function (error) {
      handleListenerError(error, onError, 'document-listener');
    });
  }

  function safePresenceSegment(value) {
    return encodeURIComponent(String(value || '').trim()).replace(/\./g, '%2E');
  }

  function enterPresence(resourceType, resourceId, callback) {
    assertReady();
    if (!state.user) throw new Error('Usuario nao autenticado.');

    var basePath = [
      'presence',
      safePresenceSegment(getWorkspaceId()),
      safePresenceSegment(resourceType),
      safePresenceSegment(resourceId)
    ].join('/');
    var resourceReference = modules.database.ref(services.realtime, basePath);
    var userReference = modules.database.ref(
      services.realtime,
      basePath + '/' + safePresenceSegment(state.user.uid)
    );
    var sessionReference = modules.database.push(userReference);
    var disconnected = modules.database.onDisconnect(sessionReference);
    var stopped = false;

    var unsubscribe = modules.database.onValue(resourceReference, function (snapshot) {
      var sessionsByUser = snapshot.val() || {};
      var people = Object.keys(sessionsByUser).map(function (uid) {
        var sessions = sessionsByUser[uid] || {};
        var firstSessionId = Object.keys(sessions)[0];
        var session = firstSessionId ? sessions[firstSessionId] : {};
        return {
          uid: uid,
          displayName: session.displayName || 'Pessoa',
          photoURL: session.photoURL || '',
          sessionCount: Object.keys(sessions).length
        };
      });
      if (typeof callback === 'function') callback(people);
    });

    return disconnected.remove().then(function () {
      return modules.database.set(sessionReference, {
        displayName: state.user.displayName || state.user.email || 'Pessoa',
        photoURL: state.user.photoURL || '',
        joinedAt: modules.database.serverTimestamp()
      });
    }).then(function () {
      return function leavePresence() {
        if (stopped) return;
        stopped = true;
        unsubscribe();
        modules.database.remove(sessionReference).catch(function () {});
      };
    });
  }

  function syncMemberRealtimeAccess(uid, role) {
    assertReady();
    var normalizedRole = role == null ? null : String(role);
    if (normalizedRole !== null && ['owner', 'admin', 'editor'].indexOf(normalizedRole) === -1) {
      return Promise.reject(new Error('Cargo de membro invalido.'));
    }

    var workspaceSegment = safePresenceSegment(getWorkspaceId());
    var uidSegment = safePresenceSegment(uid);
    var updates = {};
    updates['presenceAccess/' + workspaceSegment + '/' + uidSegment] = normalizedRole ? true : null;
    if (state.member && state.member.role === 'owner') {
      updates['memberManagers/' + workspaceSegment + '/' + uidSegment] =
        normalizedRole === 'owner' || normalizedRole === 'admin' ? normalizedRole : null;
    }

    return modules.database.update(modules.database.ref(services.realtime), updates);
  }

  window.SenkoFirebase = {
    initialize: initialize,
    isEnabled: function () { return Boolean(config.enabled); },
    isReady: function () { return state.status === 'ready'; },
    getState: snapshotState,
    getWorkspaceId: getWorkspaceId,
    getWorkspacePath: getWorkspacePath,
    onStateChange: onStateChange,
    describeServiceError: describeServiceError,
    reportServiceError: reportServiceError,
    whenAuthorized: whenAuthorized,
    signInWithGoogle: signInWithGoogle,
    signOut: signOut,
    call: callFunction,
    getClientContext: getClientContext,
    listenCollection: listenCollection,
    listenCollectionGroup: listenCollectionGroup,
    listenDocument: listenDocument,
    enterPresence: enterPresence,
    syncMemberRealtimeAccess: syncMemberRealtimeAccess
  };

  window.addEventListener('offline', function () {
    if (state.status !== 'ready') return;
    var error = new Error('O navegador perdeu a conexao com a internet.');
    error.code = 'network-request-failed';
    reportServiceError(error, 'browser', true);
  });

  initialize().catch(function () {});
})();
