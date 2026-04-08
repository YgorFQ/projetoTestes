// @ts-nocheck
/* ═══════════════════════════════════════════════════════════════════════
   senko-firebase.js — Módulo Firebase para o SenkoLib
   ───────────────────────────────────────────────────────────────────────
   VERSÃO: 1.0.0
   SUBSTITUI: senko-github-v2.js, senko-github-variants.js,
              senko-github-delete.js (sem remover — ambos coexistem)

   FUNCIONALIDADES:
     - Leitura inicial de layouts do Firestore ao carregar a página
     - Leitura de variantes sob demanda (ao abrir modal de variantes)
     - CRUD completo: layouts e variantes
     - Autenticação anônima (Firebase Anonymous Auth)
     - Cache de sessão + debounce de recarga (respeita limite Spark)
     - Modal de configuração de credenciais
     - Botão de recarregar dados com contador regressivo
     - Botões "Firebase" injetados nos mesmos pontos que os botões "GitHub"
     - Indicador de última sincronização no header
     - Detecção leve de conflito ao abrir modal de edição
     - Exportar backup JSON
     - Migrar layouts da memória para o Firestore

   SETUP RÁPIDO (3 passos):
     1. Acesse https://console.firebase.google.com → crie um projeto
     2. Ative o Firestore (modo produção) e o Anonymous Authentication
     3. Em "Configurações do projeto > Seus apps", clique em "</>" (Web),
        registre o app e copie as credenciais para o modal de configuração

   CARREGAMENTO no index.html:
     (adicione APÓS core/script.js e ANTES de </body>)

     <!-- Firebase SDK (compat) -->
     <script src="https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js"></script>
     <script src="https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore-compat.js"></script>
     <script src="https://www.gstatic.com/firebasejs/10.12.2/firebase-auth-compat.js"></script>
     <!-- Módulo Firebase do SenkoLib -->
     <script src="modules/firebase/senko-firebase.js"></script>

   SECURITY RULES (copie no console do Firebase → Firestore → Regras):

     rules_version = '2';
     service cloud.firestore {
       match /databases/{database}/documents {

         function isAuthed() {
           return request.auth != null;
         }
         function hasRequiredFields(fields) {
           return request.resource.data.keys().hasAll(fields);
         }
         function withinLimits() {
           return request.resource.data.html.size() <= 500000
               && request.resource.data.css.size()  <= 200000;
         }

         match /layouts/{layoutId} {
           allow read:   if isAuthed();
           allow create,
                 update: if isAuthed()
                           && hasRequiredFields(['id','html','css','updatedAt'])
                           && withinLimits();
           allow delete: if isAuthed();
         }

         match /variants/{variantId} {
           allow read:   if isAuthed();
           allow create,
                 update: if isAuthed()
                           && hasRequiredFields(['name','html','css','updatedAt'])
                           && withinLimits();
           allow delete: if isAuthed();
         }
       }
     }

   LIMITES DO PLANO SPARK (gratuito):
     50.000 leituras/dia | 20.000 escritas/dia | 1 GB armazenamento
     Este módulo gasta ~1 leitura por layout no carregamento inicial,
     ~N leituras de variantes sob demanda (1x por sessão por layout),
     e 1 escrita por operação de salvar/excluir.
═══════════════════════════════════════════════════════════════════════ */

(function () {

  /* ═══════════════════════════════════════════════════════════════════════
     CONSTANTES E ÍCONE
  ═══════════════════════════════════════════════════════════════════════ */

  var FB_CONFIG_KEY = 'senkolib_firebase_config';
  var FB_NICK_KEY   = 'senkolib_firebase_nick';

  /* Ícone de chama (Firebase brand color) — inline SVG */
  var FB_ICON = '<svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14" aria-hidden="true">'
    + '<path d="M5.18 18.6C6.3 20.1 8.04 21 10 21c3.31 0 6-2.69 6-6 0-1.5-.56-2.87-1.47-3.92L10 5l-4.82 13.6z" opacity=".6"/>'
    + '<path d="M14.53 11.08C13.42 9.6 11.68 8.7 9.72 8.7c-.36 0-.71.04-1.05.1L10 5l4.53 6.08z" opacity=".8"/>'
    + '<path d="M10 5L5.18 18.6C6.3 20.1 8.04 21 10 21c3.31 0 6-2.69 6-6 0-1.5-.56-2.87-1.47-3.92L10 5z"/>'
    + '</svg>';

  /* ═══════════════════════════════════════════════════════════════════════
     ESTADO INTERNO DO MÓDULO
  ═══════════════════════════════════════════════════════════════════════ */

  var _fbApp        = null;
  var _fbDb         = null;
  var _fbAuth       = null;
  var _fbUser       = null;
  var _fbReady      = false;   /* true quando auth + Firestore ok */
  var _fbLastSync   = null;    /* Date da última leitura de layouts */
  var _fbReloadCd   = 0;       /* timestamp até quando debounce está ativo */
  var _fbVarLoaded  = {};      /* { [parentId]: true } — variantes já carregadas */
  var _fbConflictTs = {};      /* { [layoutId]: updatedAt } — para detecção de conflito */
  var _fbSaving     = false;   /* lock simples contra double-click */

  /* ═══════════════════════════════════════════════════════════════════════
     UTILITÁRIOS
  ═══════════════════════════════════════════════════════════════════════ */

  function _fbGetConfig() {
    try {
      return JSON.parse(localStorage.getItem(FB_CONFIG_KEY) || 'null');
    } catch (e) {
      return null;
    }
  }

  function _fbSaveConfig(cfg) {
    try { localStorage.setItem(FB_CONFIG_KEY, JSON.stringify(cfg)); } catch (e) {}
  }

  function _fbGetNick() {
    return localStorage.getItem(FB_NICK_KEY) || 'anônimo';
  }

  function _fbIsConfigured() {
    var cfg = _fbGetConfig();
    return !!(cfg && cfg.apiKey && cfg.projectId);
  }

  function _fbTimestamp() {
    return _fbDb ? firebase.firestore.FieldValue.serverTimestamp() : new Date();
  }

  function _fbUpdatedBy() {
    var nick = _fbGetNick();
    var uid  = _fbUser ? _fbUser.uid.slice(0, 8) : '?';
    return nick + ' (' + uid + ')';
  }

  /* Formata Date para exibição amigável */
  function _fbFmtDate(d) {
    if (!d) return '—';
    if (d.toDate) d = d.toDate();
    var now  = new Date();
    var diff = Math.floor((now - d) / 1000);
    if (diff < 60)   return 'agora mesmo';
    if (diff < 3600) return Math.floor(diff / 60) + 'min atrás';
    if (diff < 86400) return Math.floor(diff / 3600) + 'h atrás';
    return d.toLocaleDateString('pt-BR');
  }

  /* ═══════════════════════════════════════════════════════════════════════
     STATUS — console + elemento #fbStatus
  ═══════════════════════════════════════════════════════════════════════ */

  function _fbSetStatus(msg, type) {
    var el = document.getElementById('fbStatus');
    if (el) {
      el.textContent = msg;
      el.className = 'fb-status-text' + (type ? ' fb-status-' + type : '');
    }
    if (type === 'error') {
      console.warn('[senko-firebase]', msg);
    } else {
      console.log('[senko-firebase]', msg);
    }
  }

  /* ═══════════════════════════════════════════════════════════════════════
     INICIALIZAÇÃO DO FIREBASE
  ═══════════════════════════════════════════════════════════════════════ */

  function _fbInit() {
    var cfg = _fbGetConfig();
    if (!cfg || !cfg.apiKey || !cfg.projectId) {
      _fbSetStatus('Firebase não configurado — clique no ícone 🔥 para configurar.', 'warn');
      _fbUpdateConfigBtn();
      return;
    }

    try {
      /* Evita inicializar duas vezes */
      if (firebase.apps && firebase.apps.length > 0) {
        _fbApp = firebase.apps[0];
      } else {
        _fbApp = firebase.initializeApp({
          apiKey:        cfg.apiKey,
          authDomain:    cfg.authDomain    || cfg.projectId + '.firebaseapp.com',
          projectId:     cfg.projectId,
          storageBucket: cfg.storageBucket || cfg.projectId + '.appspot.com',
          appId:         cfg.appId         || ''
        });
      }

      _fbDb   = firebase.firestore();
      _fbAuth = firebase.auth();

      /* Auth anônima automática */
      _fbAuth.onAuthStateChanged(function (user) {
        if (user) {
          _fbUser  = user;
          _fbReady = true;
          _fbSetStatus('Firebase conectado (anônimo: ' + user.uid.slice(0, 8) + ')', 'ok');
          _fbUpdateConfigBtn();
          /* Carregamento inicial de layouts */
          _fbLoadAllLayouts();
        } else {
          _fbAuth.signInAnonymously().catch(function (err) {
            _fbSetStatus('Erro de autenticação: ' + err.message, 'error');
          });
        }
      });

    } catch (err) {
      _fbSetStatus('Erro ao inicializar Firebase: ' + err.message, 'error');
    }
  }

  /* ═══════════════════════════════════════════════════════════════════════
     CARREGAMENTO INICIAL — Layouts
     Regra: 1 leitura por documento, 1x por carregamento de página.
     Variantes: sob demanda, 1x por sessão por parentId.
  ═══════════════════════════════════════════════════════════════════════ */

  function _fbLoadAllLayouts() {
    if (!_fbReady || !_fbDb) return;

    _fbSetStatus('Carregando layouts do Firestore…', '');
    _fbDb.collection('layouts').get().then(function (snap) {
      var fbLayouts = [];
      snap.forEach(function (doc) {
        fbLayouts.push(doc.data());
        /* Guarda timestamp para detecção de conflito */
        if (doc.data().updatedAt) {
          _fbConflictTs[doc.id] = doc.data().updatedAt;
        }
      });

      if (fbLayouts.length > 0) {
        _fbMergeLayouts(fbLayouts);
      }

      _fbLastSync = new Date();
      _fbUpdateSyncIndicator();
      _fbSetStatus('✓ ' + fbLayouts.length + ' layouts carregados do Firebase.', 'ok');

      if (typeof renderGrid === 'function') renderGrid();

    }).catch(function (err) {
      _fbSetStatus('Erro ao carregar layouts: ' + err.message, 'error');
    });
  }

  /* Mescla layouts do Firestore com os já registrados em memória.
     Firebase prevalece sobre .js local em caso de ID duplicado. */
  function _fbMergeLayouts(fbLayouts) {
    var existing = SenkoLib.getAll();
    var existMap = {};
    existing.forEach(function (l) { existMap[l.id] = true; });

    /* Remove duplicatas do array interno do SenkoLib (acesso via closure não
       disponível, então apenas registramos novos — o getAll() retornará ambos.
       Para override correto, limpamos e re-registramos tudo.) */

    /* Estratégia: construímos mapa id→layout, FB sobrescreve local */
    var merged = {};
    existing.forEach(function (l) { merged[l.id] = l; });
    fbLayouts.forEach(function (l) {
      if (l.id) merged[l.id] = l;
    });

    /* Re-popula SenkoLib — como o array interno não é acessível diretamente,
       usamos um truque: registramos apenas os layouts do FB que não existem
       ainda, e atualizamos os existentes via mutação direta do objeto em _layouts.
       O SenkoLib.getAll() retorna a mesma referência de array. */
    var inMemory = SenkoLib.getAll();
    fbLayouts.forEach(function (fbL) {
      if (!fbL.id) return;
      var found = false;
      for (var i = 0; i < inMemory.length; i++) {
        if (inMemory[i].id === fbL.id) {
          /* Atualiza in-place */
          inMemory[i].name      = fbL.name      || inMemory[i].name;
          inMemory[i].tags      = fbL.tags      || inMemory[i].tags;
          inMemory[i].html      = fbL.html      || inMemory[i].html;
          inMemory[i].css       = fbL.css       || inMemory[i].css;
          inMemory[i].updatedAt = fbL.updatedAt || inMemory[i].updatedAt;
          inMemory[i].updatedBy = fbL.updatedBy || inMemory[i].updatedBy;
          found = true;
          break;
        }
      }
      if (!found) {
        SenkoLib.register([fbL]);
      }
    });
  }

  /* ═══════════════════════════════════════════════════════════════════════
     VARIANTES SOB DEMANDA
     Chamado quando o usuário abre o modal de variantes de um layout.
  ═══════════════════════════════════════════════════════════════════════ */

  function _fbLoadVariants(parentId) {
    if (!_fbReady || !_fbDb) return Promise.resolve([]);
    if (_fbVarLoaded[parentId]) return Promise.resolve(SenkoLib.getVariants(parentId));

    return _fbDb.collection('variants')
      .where('parentId', '==', parentId)
      .get()
      .then(function (snap) {
        var variants = [];
        snap.forEach(function (doc) { variants.push(doc.data()); });
        if (variants.length > 0) {
          SenkoLib.registerVariant(parentId, variants);
        }
        _fbVarLoaded[parentId] = true;
        _fbSetStatus('✓ ' + variants.length + ' variantes carregadas para "' + parentId + '".', 'ok');
        return variants;
      })
      .catch(function (err) {
        _fbSetStatus('Erro ao carregar variantes: ' + err.message, 'error');
        return [];
      });
  }

  /* ═══════════════════════════════════════════════════════════════════════
     CRUD — LAYOUTS
  ═══════════════════════════════════════════════════════════════════════ */

  /* Salvar layout editado */
  function fbSaveLayout(id, layoutObj) {
    if (!_fbReady || !_fbDb) return Promise.reject(new Error('Firebase não está pronto.'));
    if (_fbSaving) return Promise.reject(new Error('Operação em andamento.'));
    _fbSaving = true;

    var doc = {
      id:        layoutObj.id   || id,
      name:      layoutObj.name || '',
      tags:      layoutObj.tags || [],
      html:      layoutObj.html || '',
      css:       layoutObj.css  || '',
      updatedAt: _fbTimestamp(),
      updatedBy: _fbUpdatedBy()
    };

    return _fbDb.collection('layouts').doc(id).set(doc)
      .then(function () {
        /* Atualiza memória local */
        var inMemory = SenkoLib.getAll();
        for (var i = 0; i < inMemory.length; i++) {
          if (inMemory[i].id === id) {
            Object.assign(inMemory[i], doc);
            break;
          }
        }
        _fbConflictTs[id] = doc.updatedAt;
        _fbSaving = false;
        _fbSetStatus('✓ Layout "' + id + '" salvo no Firebase.', 'ok');
        return true;
      })
      .catch(function (err) {
        _fbSaving = false;
        _fbSetStatus('Erro ao salvar layout: ' + err.message, 'error');
        throw err;
      });
  }

  /* Criar layout novo */
  function fbCreateLayout(layoutObj) {
    if (!_fbReady || !_fbDb) return Promise.reject(new Error('Firebase não está pronto.'));
    if (_fbSaving) return Promise.reject(new Error('Operação em andamento.'));
    _fbSaving = true;

    var id = layoutObj.id;
    var doc = {
      id:        id,
      name:      layoutObj.name || '',
      tags:      layoutObj.tags || [],
      html:      layoutObj.html || '',
      css:       layoutObj.css  || '',
      updatedAt: _fbTimestamp(),
      updatedBy: _fbUpdatedBy()
    };

    return _fbDb.collection('layouts').doc(id).set(doc)
      .then(function () {
        SenkoLib.register([doc]);
        _fbConflictTs[id] = doc.updatedAt;
        _fbSaving = false;
        if (typeof renderGrid === 'function') renderGrid();
        _fbSetStatus('✓ Layout "' + id + '" criado no Firebase.', 'ok');
        return true;
      })
      .catch(function (err) {
        _fbSaving = false;
        _fbSetStatus('Erro ao criar layout: ' + err.message, 'error');
        throw err;
      });
  }

  /* Excluir layout (e todas as variantes dele) */
  function fbDeleteLayout(id) {
    if (!_fbReady || !_fbDb) return Promise.reject(new Error('Firebase não está pronto.'));

    /* Exclui documento do layout */
    var deleteLayout = _fbDb.collection('layouts').doc(id).delete();

    /* Exclui variantes associadas */
    var deleteVariants = _fbDb.collection('variants')
      .where('parentId', '==', id)
      .get()
      .then(function (snap) {
        var batch = _fbDb.batch();
        snap.forEach(function (doc) { batch.delete(doc.ref); });
        return batch.commit();
      });

    return Promise.all([deleteLayout, deleteVariants])
      .then(function () {
        /* Remove da memória */
        var arr = SenkoLib.getAll();
        for (var i = arr.length - 1; i >= 0; i--) {
          if (arr[i].id === id) { arr.splice(i, 1); break; }
        }
        delete _fbConflictTs[id];
        delete _fbVarLoaded[id];
        if (typeof renderGrid === 'function') renderGrid();
        _fbSetStatus('✓ Layout "' + id + '" excluído do Firebase.', 'ok');
        return true;
      })
      .catch(function (err) {
        _fbSetStatus('Erro ao excluir layout: ' + err.message, 'error');
        throw err;
      });
  }

  /* ═══════════════════════════════════════════════════════════════════════
     CRUD — VARIANTES
  ═══════════════════════════════════════════════════════════════════════ */

  /* Criar variante nova */
  function fbCreateVariant(parentId, variantObj) {
    if (!_fbReady || !_fbDb) return Promise.reject(new Error('Firebase não está pronto.'));

    var docId = parentId + '__' + (variantObj.name || '').toLowerCase().replace(/\s+/g, '-');
    var doc = {
      name:      variantObj.name || '',
      parentId:  parentId,
      html:      variantObj.html || '',
      css:       variantObj.css  || '',
      updatedAt: _fbTimestamp(),
      updatedBy: _fbUpdatedBy()
    };

    return _fbDb.collection('variants').doc(docId).set(doc)
      .then(function () {
        SenkoLib.registerVariant(parentId, [doc]);
        _fbSetStatus('✓ Variante "' + doc.name + '" criada.', 'ok');
        return true;
      })
      .catch(function (err) {
        _fbSetStatus('Erro ao criar variante: ' + err.message, 'error');
        throw err;
      });
  }

  /* Editar variante existente */
  function fbSaveVariant(parentId, originalName, variantObj) {
    if (!_fbReady || !_fbDb) return Promise.reject(new Error('Firebase não está pronto.'));

    var docId = parentId + '__' + originalName.toLowerCase().replace(/\s+/g, '-');
    var newDocId = parentId + '__' + (variantObj.name || originalName).toLowerCase().replace(/\s+/g, '-');

    var doc = {
      name:      variantObj.name || originalName,
      parentId:  parentId,
      html:      variantObj.html || '',
      css:       variantObj.css  || '',
      updatedAt: _fbTimestamp(),
      updatedBy: _fbUpdatedBy()
    };

    /* Se o nome mudou, deleta o antigo e cria novo */
    var operation;
    if (docId !== newDocId) {
      operation = _fbDb.collection('variants').doc(docId).delete()
        .then(function () {
          return _fbDb.collection('variants').doc(newDocId).set(doc);
        });
    } else {
      operation = _fbDb.collection('variants').doc(docId).set(doc);
    }

    return operation.then(function () {
      /* Atualiza memória */
      var variants = SenkoLib.getVariants(parentId);
      var found = false;
      for (var i = 0; i < variants.length; i++) {
        if (variants[i].name === originalName) {
          Object.assign(variants[i], doc);
          found = true;
          break;
        }
      }
      if (!found) SenkoLib.registerVariant(parentId, [doc]);
      _fbSetStatus('✓ Variante "' + doc.name + '" salva.', 'ok');
      return true;
    }).catch(function (err) {
      _fbSetStatus('Erro ao salvar variante: ' + err.message, 'error');
      throw err;
    });
  }

  /* Deletar variante */
  function fbDeleteVariant(parentId, variantName) {
    if (!_fbReady || !_fbDb) return Promise.reject(new Error('Firebase não está pronto.'));

    var docId = parentId + '__' + variantName.toLowerCase().replace(/\s+/g, '-');

    return _fbDb.collection('variants').doc(docId).delete()
      .then(function () {
        /* Remove da memória */
        var variants = SenkoLib.getVariants(parentId);
        for (var i = variants.length - 1; i >= 0; i--) {
          if (variants[i].name === variantName) { variants.splice(i, 1); break; }
        }
        _fbSetStatus('✓ Variante "' + variantName + '" excluída.', 'ok');
        return true;
      })
      .catch(function (err) {
        _fbSetStatus('Erro ao excluir variante: ' + err.message, 'error');
        throw err;
      });
  }

  /* ═══════════════════════════════════════════════════════════════════════
     DETECÇÃO LEVE DE CONFLITO
     Ao abrir o modal de edição, compara updatedAt em memória com Firestore.
  ═══════════════════════════════════════════════════════════════════════ */

  function _fbCheckConflict(layoutId) {
    if (!_fbReady || !_fbDb) return;
    var localTs = _fbConflictTs[layoutId];
    if (!localTs) return;

    _fbDb.collection('layouts').doc(layoutId).get().then(function (doc) {
      if (!doc.exists) return;
      var remoteTs = doc.data().updatedAt;
      if (!remoteTs || !localTs) return;
      /* Compara milliseconds */
      var remoteMs = remoteTs.toMillis ? remoteTs.toMillis() : new Date(remoteTs).getTime();
      var localMs  = localTs.toMillis  ? localTs.toMillis()  : new Date(localTs).getTime();
      if (remoteMs > localMs + 5000) {
        var by  = doc.data().updatedBy || 'alguém';
        var ago = _fbFmtDate(remoteTs);
        _fbShowConflictWarning(
          'Este layout foi editado por <strong>' + by + '</strong> ' + ago
          + '. Considere recarregar antes de salvar.'
        );
      }
    }).catch(function () {});
  }

  function _fbShowConflictWarning(html) {
    var el = document.getElementById('fbConflictWarning');
    if (!el) return;
    el.innerHTML = '⚠️ ' + html;
    el.style.display = 'block';
  }

  function _fbHideConflictWarning() {
    var el = document.getElementById('fbConflictWarning');
    if (el) el.style.display = 'none';
  }

  /* ═══════════════════════════════════════════════════════════════════════
     RECARREGAR DADOS — botão com debounce de 30s
  ═══════════════════════════════════════════════════════════════════════ */

  function _fbReload() {
    var now = Date.now();
    if (now < _fbReloadCd) {
      var secs = Math.ceil((_fbReloadCd - now) / 1000);
      _fbSetStatus('Aguarde ' + secs + 's para recarregar novamente.', 'warn');
      return;
    }
    _fbReloadCd = now + 30000;
    _fbVarLoaded = {};  /* reseta cache de variantes também */
    _fbLoadAllLayouts();
    _fbStartReloadCountdown();
  }

  function _fbStartReloadCountdown() {
    var btn = document.getElementById('fbReloadBtn');
    if (!btn) return;
    btn.disabled = true;
    var end = _fbReloadCd;
    var tick = setInterval(function () {
      var remaining = Math.ceil((end - Date.now()) / 1000);
      if (remaining <= 0) {
        clearInterval(tick);
        btn.disabled = false;
        btn.title = 'Recarregar dados do Firebase';
        btn.innerHTML = '↺';
        return;
      }
      btn.innerHTML = '↺ ' + remaining + 's';
      btn.title = 'Disponível em ' + remaining + 's';
    }, 1000);
  }

  /* ═══════════════════════════════════════════════════════════════════════
     EXPORTAR BACKUP JSON
  ═══════════════════════════════════════════════════════════════════════ */

  function _fbExportBackup() {
    if (!_fbReady || !_fbDb) {
      alert('Firebase não está conectado.');
      return;
    }
    _fbSetStatus('Exportando backup…', '');

    Promise.all([
      _fbDb.collection('layouts').get(),
      _fbDb.collection('variants').get()
    ]).then(function (results) {
      var layouts  = [];
      var variants = [];
      results[0].forEach(function (d) { layouts.push(d.data()); });
      results[1].forEach(function (d) { variants.push(d.data()); });

      var backup = {
        exportedAt: new Date().toISOString(),
        layouts:    layouts,
        variants:   variants
      };

      var blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
      var url  = URL.createObjectURL(blob);
      var a    = document.createElement('a');
      a.href     = url;
      a.download = 'senkolib-backup-' + new Date().toISOString().slice(0,10) + '.json';
      a.click();
      URL.revokeObjectURL(url);
      _fbSetStatus('✓ Backup exportado com ' + layouts.length + ' layouts e ' + variants.length + ' variantes.', 'ok');
    }).catch(function (err) {
      _fbSetStatus('Erro ao exportar: ' + err.message, 'error');
    });
  }

  /* ═══════════════════════════════════════════════════════════════════════
     MIGRAR DA MEMÓRIA → FIRESTORE
     Importa tudo que já está em SenkoLib.getAll() para o Firestore.
  ═══════════════════════════════════════════════════════════════════════ */

  function _fbMigrateFromMemory() {
    if (!_fbReady || !_fbDb) {
      alert('Firebase não está conectado.');
      return;
    }

    var layouts = SenkoLib.getAll();
    if (layouts.length === 0) {
      alert('Nenhum layout em memória para migrar.');
      return;
    }

    if (!confirm('Migrar ' + layouts.length + ' layouts da memória para o Firestore?\n'
      + 'Layouts com o mesmo ID serão sobrescritos no Firebase.')) return;

    var btn = document.getElementById('fbMigrateBtn');
    if (btn) { btn.textContent = 'Migrando…'; btn.disabled = true; }

    var batch = _fbDb.batch();
    layouts.forEach(function (l) {
      if (!l.id) return;
      var ref = _fbDb.collection('layouts').doc(l.id);
      batch.set(ref, {
        id:        l.id,
        name:      l.name  || '',
        tags:      l.tags  || [],
        html:      l.html  || '',
        css:       l.css   || '',
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedBy: _fbUpdatedBy() + ' [migração]'
      });
    });

    batch.commit().then(function () {
      _fbSetStatus('✓ ' + layouts.length + ' layouts migrados para o Firebase!', 'ok');
      if (btn) { btn.textContent = '✓ Migrado!'; btn.disabled = false; }
    }).catch(function (err) {
      _fbSetStatus('Erro na migração: ' + err.message, 'error');
      if (btn) { btn.textContent = 'Migrar do local'; btn.disabled = false; }
    });
  }

  /* ═══════════════════════════════════════════════════════════════════════
     INDICADOR DE SINCRONIZAÇÃO
  ═══════════════════════════════════════════════════════════════════════ */

  function _fbUpdateSyncIndicator() {
    var el = document.getElementById('fbLastSync');
    if (!el) return;
    if (_fbLastSync) {
      el.textContent = '🔥 sync ' + _fbFmtDate(_fbLastSync);
      el.title = 'Última sincronização com Firebase: ' + _fbLastSync.toLocaleString('pt-BR');
    }
  }

  /* ═══════════════════════════════════════════════════════════════════════
     BOTÃO DE CONFIGURAÇÃO — atualiza aparência
  ═══════════════════════════════════════════════════════════════════════ */

  function _fbUpdateConfigBtn() {
    var btn = document.getElementById('fbConfigBtn');
    if (!btn) return;
    var ok = _fbIsConfigured() && _fbReady;
    btn.classList.toggle('fb-config-active', ok);
    btn.title = ok
      ? '🔥 Firebase conectado — clique para configurar'
      : '🔥 Configurar Firebase';
  }

  /* ═══════════════════════════════════════════════════════════════════════
     PARSE DE OBJETO LAYOUT A PARTIR DO CÓDIGO GERADO (igual ao GitHub)
  ═══════════════════════════════════════════════════════════════════════ */

  function _fbParseLayoutCode(id, generatedCode) {
    /* O código gerado pelo script.js tem o formato:
         /@*@@@Senko - id *\/
           { id: '...', name: '...', tags: [...], html: `...`, css: `...` },
       Precisamos extrair os campos. Mais seguro: eval em sandbox mínimo. */
    try {
      var clean = generatedCode
        .replace(/^\/\*@@@@Senko[^*]*\*\/\n/, '')
        .replace(/^\s*\/\*[^*]*\*\/\n/, '')
        .replace(/,\s*$/, '');

      /* eslint-disable no-new-func */
      var obj = (new Function('return (' + clean + ')'))();
      return obj;
    } catch (e) {
      console.warn('[senko-firebase] Erro ao parsear código gerado:', e);
      return null;
    }
  }

  /* ═══════════════════════════════════════════════════════════════════════
     ESTILOS CSS INJETADOS DINAMICAMENTE
  ═══════════════════════════════════════════════════════════════════════ */

  function _fbInjectStyles() {
    if (document.getElementById('fbModuleStyles')) return;
    var style = document.createElement('style');
    style.id = 'fbModuleStyles';
    style.textContent = [
      /* Botão Firebase */
      '.btn-firebase {',
      '  display: inline-flex; align-items: center; gap: 5px;',
      '  padding: 7px 13px; border: none; border-radius: 6px; cursor: pointer;',
      '  font-size: 13px; font-weight: 600; transition: background .15s, opacity .15s;',
      '  background: #F57C00; color: #fff;',
      '}',
      '.btn-firebase:hover:not(:disabled) { background: #E65100; }',
      '.btn-firebase:disabled { opacity: .55; cursor: default; }',

      /* Botão config Firebase no header */
      '.fb-config-btn {',
      '  background: transparent; border: 1.5px solid rgba(255,255,255,.25);',
      '  border-radius: 6px; padding: 5px 9px; cursor: pointer; font-size: 14px;',
      '  color: var(--text-muted, #888); transition: border-color .15s, color .15s;',
      '}',
      '.fb-config-btn:hover { border-color: #F57C00; color: #F57C00; }',
      '.fb-config-btn.fb-config-active { border-color: #4CAF50; color: #4CAF50; }',

      /* Botão recarregar */
      '.fb-reload-btn {',
      '  background: transparent; border: none; cursor: pointer;',
      '  font-size: 16px; padding: 4px 8px; border-radius: 6px;',
      '  color: var(--text-muted, #888); transition: color .15s;',
      '}',
      '.fb-reload-btn:hover:not(:disabled) { color: #F57C00; }',
      '.fb-reload-btn:disabled { opacity: .4; cursor: default; }',

      /* Status hidden */
      '.fb-status-text { display: none; }',

      /* Indicador de sync */
      '#fbLastSync {',
      '  font-size: 11px; color: var(--text-muted, #888); margin-left: 8px;',
      '  white-space: nowrap;',
      '}',

      /* Modal overlay (base) */
      '.fb-overlay {',
      '  position: fixed; inset: 0; background: rgba(0,0,0,.55);',
      '  display: flex; align-items: center; justify-content: center;',
      '  z-index: 9000; padding: 16px;',
      '}',
      '.fb-overlay.fb-hidden { display: none; }',
      '.fb-modal {',
      '  background: var(--surface, #1e1e1e); border-radius: 12px;',
      '  padding: 28px 32px; width: 100%; max-width: 480px;',
      '  box-shadow: 0 8px 32px rgba(0,0,0,.45);',
      '  color: var(--text, #eee);',
      '}',
      '.fb-modal h3 { margin: 0 0 18px; font-size: 18px; }',
      '.fb-modal label { display: block; font-size: 12px; color: var(--text-muted, #888); margin-bottom: 4px; margin-top: 12px; }',
      '.fb-modal input[type=text], .fb-modal input[type=password] {',
      '  width: 100%; box-sizing: border-box;',
      '  background: var(--input-bg, #2a2a2a); border: 1px solid var(--border, #333);',
      '  border-radius: 6px; padding: 8px 10px; color: var(--text, #eee); font-size: 13px;',
      '}',
      '.fb-modal input:focus { outline: 2px solid #F57C00; border-color: transparent; }',
      '.fb-modal .fb-actions { display: flex; gap: 10px; margin-top: 20px; flex-wrap: wrap; }',
      '.fb-modal .fb-btn-secondary {',
      '  background: transparent; border: 1px solid var(--border, #444);',
      '  border-radius: 6px; padding: 8px 16px; cursor: pointer;',
      '  color: var(--text-muted, #aaa); font-size: 13px;',
      '}',
      '.fb-modal .fb-btn-secondary:hover { border-color: var(--text-muted, #888); }',
      '.fb-modal .fb-error {',
      '  margin-top: 10px; padding: 8px 12px; border-radius: 6px;',
      '  background: rgba(229,57,53,.15); color: #ef9a9a; font-size: 13px;',
      '}',
      '.fb-modal .fb-error.fb-hidden { display: none; }',
      '.fb-modal .fb-help {',
      '  font-size: 12px; color: var(--text-muted, #888); margin-top: 14px; line-height: 1.5;',
      '}',
      '.fb-modal .fb-help a { color: #F57C00; text-decoration: none; }',
      '.fb-modal .fb-help a:hover { text-decoration: underline; }',
      '.fb-modal .fb-separator { border: none; border-top: 1px solid var(--border, #333); margin: 18px 0; }',

      /* Aviso de conflito dentro do modal de edição */
      '#fbConflictWarning {',
      '  display: none; background: rgba(255,152,0,.12); color: #FFB74D;',
      '  border: 1px solid rgba(255,152,0,.3); border-radius: 6px;',
      '  padding: 8px 12px; font-size: 12px; margin-bottom: 10px; line-height: 1.5;',
      '}',

      /* Modal de confirmação de exclusão Firebase */
      '.fb-confirm-modal { max-width: 380px; }',
      '.fb-confirm-modal p { font-size: 14px; color: var(--text-muted, #aaa); margin-bottom: 18px; }',
      '.fb-confirm-modal .fb-btn-danger {',
      '  background: #c62828; color: #fff; border: none;',
      '  border-radius: 6px; padding: 8px 18px; cursor: pointer; font-size: 13px; font-weight: 600;',
      '}',
      '.fb-confirm-modal .fb-btn-danger:hover { background: #b71c1c; }',
    ].join('\n');
    document.head.appendChild(style);
  }

  /* ═══════════════════════════════════════════════════════════════════════
     MODAL DE CONFIGURAÇÃO DO FIREBASE
  ═══════════════════════════════════════════════════════════════════════ */

  function _fbBuildConfigModal() {
    if (document.getElementById('fbConfigOverlay')) return;

    var overlay = document.createElement('div');
    overlay.id        = 'fbConfigOverlay';
    overlay.className = 'fb-overlay fb-hidden';

    var cfg = _fbGetConfig() || {};
    var nick = _fbGetNick();

    overlay.innerHTML = [
      '<div class="fb-modal" role="dialog" aria-modal="true" aria-label="Configurar Firebase">',
      '  <h3>' + FB_ICON + ' Configuração do Firebase</h3>',

      '  <div class="fb-help">',
      '    1. Acesse <a href="https://console.firebase.google.com" target="_blank">console.firebase.google.com</a><br>',
      '    2. Crie um projeto → ative <strong>Firestore</strong> (modo produção) e <strong>Anonymous Auth</strong><br>',
      '    3. Em "Configurações > Seus apps > Web (&#60;/&#62;)", copie as credenciais abaixo',
      '  </div>',

      '  <label>API Key</label>',
      '  <input type="text" id="fbCfgApiKey" placeholder="AIzaSy…" value="' + (cfg.apiKey || '') + '">',
      '  <label>Auth Domain <span style="opacity:.5">(opcional)</span></label>',
      '  <input type="text" id="fbCfgAuthDomain" placeholder="meu-projeto.firebaseapp.com" value="' + (cfg.authDomain || '') + '">',
      '  <label>Project ID</label>',
      '  <input type="text" id="fbCfgProjectId" placeholder="meu-projeto" value="' + (cfg.projectId || '') + '">',
      '  <label>Storage Bucket <span style="opacity:.5">(opcional)</span></label>',
      '  <input type="text" id="fbCfgBucket" placeholder="meu-projeto.appspot.com" value="' + (cfg.storageBucket || '') + '">',
      '  <label>App ID <span style="opacity:.5">(opcional)</span></label>',
      '  <input type="text" id="fbCfgAppId" placeholder="1:123…:web:abc…" value="' + (cfg.appId || '') + '">',

      '  <hr class="fb-separator">',
      '  <label>Seu apelido (aparece no "editado por")</label>',
      '  <input type="text" id="fbCfgNick" placeholder="Ex: Ygor" value="' + nick + '">',

      '  <div id="fbConfigError" class="fb-error fb-hidden"></div>',

      '  <div class="fb-actions">',
      '    <button class="btn-firebase" id="fbConfigSaveBtn">' + FB_ICON + ' Salvar e conectar</button>',
      '    <button class="fb-btn-secondary" id="fbConfigTestBtn">Testar conexão</button>',
      '    <button class="fb-btn-secondary" id="fbConfigCancelBtn">Cancelar</button>',
      '  </div>',

      '  <hr class="fb-separator">',
      '  <div class="fb-actions">',
      '    <button class="fb-btn-secondary" id="fbExportBtn">⬇ Exportar backup JSON</button>',
      '    <button class="fb-btn-secondary" id="fbMigrateBtn">⬆ Migrar layouts locais → Firebase</button>',
      '  </div>',
      '</div>'
    ].join('');

    document.body.appendChild(overlay);

    /* Fechar ao clicar no backdrop */
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) _fbCloseConfigModal();
    });

    document.getElementById('fbConfigCancelBtn').addEventListener('click', _fbCloseConfigModal);
    document.getElementById('fbConfigSaveBtn').addEventListener('click', _fbSaveConfigAndReconnect);
    document.getElementById('fbConfigTestBtn').addEventListener('click', _fbTestConnection);
    document.getElementById('fbExportBtn').addEventListener('click', _fbExportBackup);
    document.getElementById('fbMigrateBtn').addEventListener('click', _fbMigrateFromMemory);
  }

  function _fbOpenConfigModal() {
    _fbBuildConfigModal();
    document.getElementById('fbConfigOverlay').classList.remove('fb-hidden');
    document.body.style.overflow = 'hidden';
    var firstField = document.getElementById('fbCfgApiKey');
    if (firstField) firstField.focus();
  }

  function _fbCloseConfigModal() {
    var overlay = document.getElementById('fbConfigOverlay');
    if (overlay) overlay.classList.add('fb-hidden');
    document.body.style.overflow = '';
  }

  function _fbShowConfigError(msg) {
    var el = document.getElementById('fbConfigError');
    if (!el) return;
    el.textContent = msg;
    el.classList.remove('fb-hidden');
  }

  function _fbHideConfigError() {
    var el = document.getElementById('fbConfigError');
    if (el) el.classList.add('fb-hidden');
  }

  function _fbSaveConfigAndReconnect() {
    _fbHideConfigError();
    var apiKey    = (document.getElementById('fbCfgApiKey')     || {}).value || '';
    var authDomain= (document.getElementById('fbCfgAuthDomain') || {}).value || '';
    var projectId = (document.getElementById('fbCfgProjectId')  || {}).value || '';
    var bucket    = (document.getElementById('fbCfgBucket')     || {}).value || '';
    var appId     = (document.getElementById('fbCfgAppId')      || {}).value || '';
    var nick      = (document.getElementById('fbCfgNick')       || {}).value || 'anônimo';

    if (!apiKey || !projectId) {
      _fbShowConfigError('API Key e Project ID são obrigatórios.');
      return;
    }

    _fbSaveConfig({ apiKey: apiKey, authDomain: authDomain, projectId: projectId, storageBucket: bucket, appId: appId });
    try { localStorage.setItem(FB_NICK_KEY, nick.trim()); } catch (e) {}

    _fbCloseConfigModal();

    /* Reinicializa o Firebase com as novas credenciais */
    _fbReady = false;
    _fbApp   = null;
    _fbDb    = null;
    _fbAuth  = null;
    _fbUser  = null;
    _fbInit();
  }

  function _fbTestConnection() {
    var apiKey    = (document.getElementById('fbCfgApiKey')    || {}).value || '';
    var projectId = (document.getElementById('fbCfgProjectId') || {}).value || '';
    _fbHideConfigError();

    if (!apiKey || !projectId) {
      _fbShowConfigError('Preencha API Key e Project ID antes de testar.');
      return;
    }

    if (!_fbReady || !_fbDb) {
      _fbShowConfigError('Salve as configurações primeiro para inicializar o Firebase.');
      return;
    }

    var testBtn = document.getElementById('fbConfigTestBtn');
    if (testBtn) { testBtn.textContent = 'Testando…'; testBtn.disabled = true; }

    _fbDb.collection('layouts').limit(1).get()
      .then(function () {
        _fbHideConfigError();
        var el = document.getElementById('fbConfigError');
        if (el) {
          el.textContent = '✓ Conexão OK! Firestore acessível.';
          el.style.background = 'rgba(76,175,80,.15)';
          el.style.color      = '#A5D6A7';
          el.classList.remove('fb-hidden');
        }
        if (testBtn) { testBtn.textContent = 'Testar conexão'; testBtn.disabled = false; }
      })
      .catch(function (err) {
        _fbShowConfigError('Erro: ' + err.message);
        if (testBtn) { testBtn.textContent = 'Testar conexão'; testBtn.disabled = false; }
      });
  }

  /* ═══════════════════════════════════════════════════════════════════════
     MODAL DE CONFIRMAÇÃO DE EXCLUSÃO (layouts e variantes)
  ═══════════════════════════════════════════════════════════════════════ */

  function _fbBuildDeleteModal() {
    if (document.getElementById('fbDeleteOverlay')) return;

    var overlay = document.createElement('div');
    overlay.id        = 'fbDeleteOverlay';
    overlay.className = 'fb-overlay fb-hidden';
    overlay.innerHTML = [
      '<div class="fb-modal fb-confirm-modal">',
      '  <h3>' + FB_ICON + ' Confirmar exclusão</h3>',
      '  <p id="fbDeleteMsg">Tem certeza que deseja excluir este item do Firebase?</p>',
      '  <div class="fb-actions">',
      '    <button class="fb-btn-danger" id="fbDeleteConfirmBtn">Excluir do Firebase</button>',
      '    <button class="fb-btn-secondary" id="fbDeleteCancelBtn">Cancelar</button>',
      '  </div>',
      '</div>'
    ].join('');

    document.body.appendChild(overlay);
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) _fbCloseDeleteModal();
    });
    document.getElementById('fbDeleteCancelBtn').addEventListener('click', _fbCloseDeleteModal);
  }

  var _fbDeleteCallback = null;

  function _fbOpenDeleteModal(msg, callback) {
    _fbBuildDeleteModal();
    var msgEl = document.getElementById('fbDeleteMsg');
    if (msgEl) msgEl.textContent = msg || 'Confirmar exclusão?';
    _fbDeleteCallback = callback;
    var confirmBtn = document.getElementById('fbDeleteConfirmBtn');
    /* Remove listener anterior */
    var newBtn = confirmBtn.cloneNode(true);
    confirmBtn.parentNode.replaceChild(newBtn, confirmBtn);
    newBtn.addEventListener('click', function () {
      if (_fbDeleteCallback) _fbDeleteCallback();
      _fbCloseDeleteModal();
    });
    document.getElementById('fbDeleteOverlay').classList.remove('fb-hidden');
    document.body.style.overflow = 'hidden';
  }

  function _fbCloseDeleteModal() {
    var overlay = document.getElementById('fbDeleteOverlay');
    if (overlay) overlay.classList.add('fb-hidden');
    document.body.style.overflow = '';
    _fbDeleteCallback = null;
  }

  /* ═══════════════════════════════════════════════════════════════════════
     INJEÇÃO DE BOTÕES NA UI
  ═══════════════════════════════════════════════════════════════════════ */

  function _fbInjectButtons() {

    /* ─── Status span oculto ─── */
    if (!document.getElementById('fbStatus')) {
      var statusSpan = document.createElement('span');
      statusSpan.id = 'fbStatus';
      statusSpan.className = 'fb-status-text';
      document.body.appendChild(statusSpan);
    }

    /* ─── Aviso de conflito dentro do modal de edição ─── */
    if (!document.getElementById('fbConflictWarning')) {
      var conflictEl = document.createElement('div');
      conflictEl.id = 'fbConflictWarning';
      var editModal = document.getElementById('editModal') || document.querySelector('[id*="editModal"]');
      if (editModal) {
        editModal.insertBefore(conflictEl, editModal.firstChild);
      } else {
        document.body.appendChild(conflictEl);
      }
    }

    /* ─── Header: botão config + reload + indicador sync ─── */
    var searchWrap = document.querySelector('.search-wrap');
    if (searchWrap && !document.getElementById('fbConfigBtn')) {

      /* Indicador de sincronização */
      var syncIndicator = document.createElement('span');
      syncIndicator.id = 'fbLastSync';
      searchWrap.parentNode.insertBefore(syncIndicator, searchWrap);

      /* Botão recarregar */
      var reloadBtn = document.createElement('button');
      reloadBtn.id        = 'fbReloadBtn';
      reloadBtn.className = 'fb-reload-btn';
      reloadBtn.title     = 'Recarregar layouts do Firebase';
      reloadBtn.innerHTML = '↺';
      reloadBtn.addEventListener('click', _fbReload);
      searchWrap.parentNode.insertBefore(reloadBtn, searchWrap);

      /* Botão configuração */
      var configBtn = document.createElement('button');
      configBtn.id        = 'fbConfigBtn';
      configBtn.className = 'fb-config-btn';
      configBtn.title     = '🔥 Configurar Firebase';
      configBtn.innerHTML = '🔥';
      configBtn.addEventListener('click', _fbOpenConfigModal);
      searchWrap.parentNode.insertBefore(configBtn, searchWrap);

      _fbUpdateConfigBtn();
    }

    /* ─── Modal edição layout — botão Firebase ─── */
    var saveToFileBtn = document.getElementById('saveToFileBtn');
    if (saveToFileBtn && !document.getElementById('fbSaveLayoutBtn')) {
      var fbEditBtn = document.createElement('button');
      fbEditBtn.id        = 'fbSaveLayoutBtn';
      fbEditBtn.className = 'btn-firebase';
      fbEditBtn.innerHTML = FB_ICON + ' Firebase';
      fbEditBtn.title     = 'Salvar no banco de dados Firebase';
      saveToFileBtn.parentNode.insertBefore(fbEditBtn, saveToFileBtn);

      fbEditBtn.addEventListener('click', function () {
        var code = document.getElementById('editGeneratedCode')
                     ? document.getElementById('editGeneratedCode').textContent : '';
        var id   = document.getElementById('editId')
                     ? document.getElementById('editId').value.trim().toLowerCase() : '';

        if (!id || !code || code.indexOf('//') === 0) {
          alert('Preencha os campos primeiro.');
          return;
        }

        var obj = _fbParseLayoutCode(id, code);
        if (!obj) { alert('Não foi possível parsear o layout. Verifique os campos.'); return; }

        fbEditBtn.textContent = 'Salvando…';
        fbEditBtn.disabled    = true;

        fbSaveLayout(id, obj).then(function () {
          fbEditBtn.innerHTML = FB_ICON + ' Salvo!';
          setTimeout(function () {
            if (typeof closeEditModal === 'function') closeEditModal();
            fbEditBtn.innerHTML = FB_ICON + ' Firebase';
            fbEditBtn.disabled  = false;
          }, 1200);
        }).catch(function (err) {
          alert('Erro: ' + err.message);
          fbEditBtn.innerHTML = FB_ICON + ' Firebase';
          fbEditBtn.disabled  = false;
        });
      });
    }

    /* ─── Modal edição layout — botão Excluir Firebase ─── */
    if (saveToFileBtn && !document.getElementById('fbDeleteLayoutBtn')) {
      var fbDelBtn = document.createElement('button');
      fbDelBtn.id        = 'fbDeleteLayoutBtn';
      fbDelBtn.className = 'fb-btn-secondary';
      fbDelBtn.style.cssText = 'margin-left:4px; color:#ef9a9a; border-color:rgba(239,154,154,.4);';
      fbDelBtn.innerHTML = '🗑 Firebase';
      fbDelBtn.title     = 'Excluir este layout do Firebase';
      saveToFileBtn.parentNode.appendChild(fbDelBtn);

      fbDelBtn.addEventListener('click', function () {
        var id = document.getElementById('editId')
                   ? document.getElementById('editId').value.trim().toLowerCase() : '';
        if (!id) return;
        _fbOpenDeleteModal(
          'Excluir o layout "' + id + '" e todas as suas variantes do Firebase? Esta ação não pode ser desfeita.',
          function () { fbDeleteLayout(id); if (typeof closeEditModal === 'function') closeEditModal(); }
        );
      });
    }

    /* ─── Modal criação layout — campo de grupo + botão Firebase ─── */
    var copyGeneratedBtn = document.getElementById('copyGeneratedBtn');
    if (copyGeneratedBtn && !document.getElementById('fbNewLayoutGroup')) {

      var fbGroupInput = document.createElement('input');
      fbGroupInput.type        = 'text';
      fbGroupInput.id          = 'fbGroupInput';
      fbGroupInput.placeholder = 'Grupo/pacote (opcional)';
      fbGroupInput.style.cssText = [
        'width: 140px; background: var(--input-bg,#2a2a2a);',
        'border: 1px solid var(--border,#333); border-radius: 6px;',
        'padding: 7px 10px; color: var(--text,#eee); font-size: 13px;'
      ].join('');

      var fbNewBtn = document.createElement('button');
      fbNewBtn.id        = 'fbSaveNewLayoutBtn';
      fbNewBtn.className = 'btn-firebase';
      fbNewBtn.innerHTML = FB_ICON + ' Firebase';
      fbNewBtn.title     = 'Salvar novo layout no Firebase';

      var fbGroup = document.createElement('div');
      fbGroup.id        = 'fbNewLayoutGroup';
      fbGroup.style.cssText = 'display: inline-flex; gap: 8px; align-items: center; margin-top: 8px;';
      fbGroup.appendChild(fbGroupInput);
      fbGroup.appendChild(fbNewBtn);
      copyGeneratedBtn.parentNode.insertBefore(fbGroup, copyGeneratedBtn.nextSibling);

      fbNewBtn.addEventListener('click', function () {
        var code = document.getElementById('generatedCode')
                     ? document.getElementById('generatedCode').textContent : '';
        var id   = document.getElementById('addId')
                     ? document.getElementById('addId').value.trim().toLowerCase() : '';

        if (!id || !code || code.indexOf('//') === 0) {
          alert('Preencha os campos primeiro.');
          return;
        }

        var obj = _fbParseLayoutCode(id, code);
        if (!obj) { alert('Não foi possível parsear o layout.'); return; }

        fbNewBtn.textContent = 'Salvando…';
        fbNewBtn.disabled    = true;

        fbCreateLayout(obj).then(function () {
          fbNewBtn.innerHTML = FB_ICON + ' Salvo!';
          setTimeout(function () {
            if (typeof closeAddModal === 'function') closeAddModal();
            fbNewBtn.innerHTML = FB_ICON + ' Firebase';
            fbNewBtn.disabled  = false;
          }, 1200);
        }).catch(function (err) {
          alert('Erro: ' + err.message);
          fbNewBtn.innerHTML = FB_ICON + ' Firebase';
          fbNewBtn.disabled  = false;
        });
      });
    }

    /* ─── Modal nova variante — botão Firebase ─── */
    var newVarCopyBtn = document.getElementById('newVarCopyBtn');
    if (newVarCopyBtn && !document.getElementById('fbSaveNewVarBtn')) {
      var fbNewVarBtn = document.createElement('button');
      fbNewVarBtn.id        = 'fbSaveNewVarBtn';
      fbNewVarBtn.className = 'btn-firebase';
      fbNewVarBtn.innerHTML = FB_ICON + ' Firebase';
      fbNewVarBtn.title     = 'Salvar nova variante no Firebase';
      newVarCopyBtn.parentNode.insertBefore(fbNewVarBtn, newVarCopyBtn.nextSibling);

      fbNewVarBtn.addEventListener('click', function () {
        var name = document.getElementById('newVarName')
                     ? document.getElementById('newVarName').value.trim() : '';
        var html = document.getElementById('newVarHtml')
                     ? document.getElementById('newVarHtml').value : '';
        var css  = document.getElementById('newVarCss')
                     ? document.getElementById('newVarCss').value : '';
        var parentId = state && state.currentForVariant ? state.currentForVariant.id : '';

        if (!name || !parentId) {
          alert('Preencha o nome da variante e verifique que um layout está selecionado.');
          return;
        }

        fbNewVarBtn.textContent = 'Salvando…';
        fbNewVarBtn.disabled    = true;

        fbCreateVariant(parentId, { name: name, html: html, css: css }).then(function () {
          fbNewVarBtn.innerHTML = FB_ICON + ' Salvo!';
          if (typeof renderVariantBlocks === 'function') renderVariantBlocks(parentId);
          if (typeof updateVariantsCount  === 'function') updateVariantsCount(parentId);
          setTimeout(function () {
            if (typeof closeNewVariantModal === 'function') closeNewVariantModal();
            fbNewVarBtn.innerHTML = FB_ICON + ' Firebase';
            fbNewVarBtn.disabled  = false;
          }, 1200);
        }).catch(function (err) {
          alert('Erro: ' + err.message);
          fbNewVarBtn.innerHTML = FB_ICON + ' Firebase';
          fbNewVarBtn.disabled  = false;
        });
      });
    }

    /* ─── Modal edição variante — botão Firebase ─── */
    var saveVarToFileBtn = document.getElementById('saveVarToFileBtn');
    if (saveVarToFileBtn && !document.getElementById('fbSaveVarBtn')) {
      var fbSaveVarBtn = document.createElement('button');
      fbSaveVarBtn.id        = 'fbSaveVarBtn';
      fbSaveVarBtn.className = 'btn-firebase';
      fbSaveVarBtn.innerHTML = FB_ICON + ' Firebase';
      fbSaveVarBtn.title     = 'Salvar variante editada no Firebase';
      saveVarToFileBtn.parentNode.insertBefore(fbSaveVarBtn, saveVarToFileBtn);

      fbSaveVarBtn.addEventListener('click', function () {
        var name     = document.getElementById('editVarName')
                         ? document.getElementById('editVarName').value.trim() : '';
        var html     = document.getElementById('editVarHtml')
                         ? document.getElementById('editVarHtml').value : '';
        var css      = document.getElementById('editVarCss')
                         ? document.getElementById('editVarCss').value : '';
        var parentId = state && state.currentForVariant ? state.currentForVariant.id : '';
        var origName = state && state.currentEditVariant ? state.currentEditVariant.name : name;

        if (!name || !parentId) {
          alert('Dados insuficientes para salvar.');
          return;
        }

        fbSaveVarBtn.textContent = 'Salvando…';
        fbSaveVarBtn.disabled    = true;

        fbSaveVariant(parentId, origName, { name: name, html: html, css: css }).then(function () {
          fbSaveVarBtn.innerHTML = FB_ICON + ' Salvo!';
          if (typeof renderVariantBlocks === 'function') renderVariantBlocks(parentId);
          setTimeout(function () {
            if (typeof closeEditVariantModal === 'function') closeEditVariantModal();
            fbSaveVarBtn.innerHTML = FB_ICON + ' Firebase';
            fbSaveVarBtn.disabled  = false;
          }, 1200);
        }).catch(function (err) {
          alert('Erro: ' + err.message);
          fbSaveVarBtn.innerHTML = FB_ICON + ' Firebase';
          fbSaveVarBtn.disabled  = false;
        });
      });
    }

    /* ─── Modal edição variante — botão Excluir variante Firebase ─── */
    if (saveVarToFileBtn && !document.getElementById('fbDeleteVarBtn')) {
      var fbDelVarBtn = document.createElement('button');
      fbDelVarBtn.id        = 'fbDeleteVarBtn';
      fbDelVarBtn.className = 'fb-btn-secondary';
      fbDelVarBtn.style.cssText = 'color:#ef9a9a; border-color:rgba(239,154,154,.4);';
      fbDelVarBtn.innerHTML = '🗑 Firebase';
      fbDelVarBtn.title     = 'Excluir esta variante do Firebase';
      saveVarToFileBtn.parentNode.appendChild(fbDelVarBtn);

      fbDelVarBtn.addEventListener('click', function () {
        var parentId = state && state.currentForVariant ? state.currentForVariant.id : '';
        var varName  = state && state.currentEditVariant ? state.currentEditVariant.name : '';
        if (!parentId || !varName) return;
        _fbOpenDeleteModal(
          'Excluir a variante "' + varName + '" do Firebase?',
          function () {
            fbDeleteVariant(parentId, varName).then(function () {
              if (typeof renderVariantBlocks === 'function') renderVariantBlocks(parentId);
              if (typeof updateVariantsCount  === 'function') updateVariantsCount(parentId);
              if (typeof closeEditVariantModal === 'function') closeEditVariantModal();
            });
          }
        );
      });
    }
  }

  /* ═══════════════════════════════════════════════════════════════════════
     PATCH: intercepta abertura de modal de variantes para carga sob demanda
  ═══════════════════════════════════════════════════════════════════════ */

  function _fbPatchVariantsModal() {
    /* Intercepta o botão de abrir variantes de cada card */
    document.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-open-variants]');
      if (!btn) return;
      var parentId = btn.dataset.openVariants;
      if (parentId && !_fbVarLoaded[parentId]) {
        _fbLoadVariants(parentId);
      }
    }, true);

    /* Patch na função openVariantsModal se existir */
    if (typeof window.openVariantsModal === 'function') {
      var _orig = window.openVariantsModal;
      window.openVariantsModal = function (layout) {
        if (layout && layout.id && !_fbVarLoaded[layout.id]) {
          _fbLoadVariants(layout.id).then(function () {
            _orig(layout);
          });
          return;
        }
        _orig(layout);
      };
    }

    /* Patch na função openEditModal para detecção de conflito */
    if (typeof window.openEditModal === 'function') {
      var _origEdit = window.openEditModal;
      window.openEditModal = function (layout) {
        _origEdit(layout);
        _fbHideConflictWarning();
        if (layout && layout.id) {
          _fbCheckConflict(layout.id);
        }
      };
    }
  }

  /* ═══════════════════════════════════════════════════════════════════════
     INICIALIZAÇÃO DO MÓDULO (DOMContentLoaded)
  ═══════════════════════════════════════════════════════════════════════ */

  document.addEventListener('DOMContentLoaded', function () {
    _fbInjectStyles();
    _fbInjectButtons();
    _fbPatchVariantsModal();

    /* Verifica se o SDK do Firebase foi carregado */
    if (typeof firebase === 'undefined') {
      console.warn('[senko-firebase] SDK do Firebase não encontrado. '
        + 'Adicione os <script> do Firebase antes deste arquivo. '
        + 'Veja as instruções no topo de senko-firebase.js.');
      _fbSetStatus('SDK Firebase não carregado — veja o console para instruções.', 'error');
      return;
    }

    _fbInit();
  });

  /* ═══════════════════════════════════════════════════════════════════════
     EXPOSIÇÃO GLOBAL — apenas funções que o script.js pode precisar chamar
  ═══════════════════════════════════════════════════════════════════════ */

  window.fbSaveLayout      = fbSaveLayout;
  window.fbCreateLayout    = fbCreateLayout;
  window.fbDeleteLayout    = fbDeleteLayout;
  window.fbCreateVariant   = fbCreateVariant;
  window.fbSaveVariant     = fbSaveVariant;
  window.fbDeleteVariant   = fbDeleteVariant;
  window.fbOpenConfig      = _fbOpenConfigModal;
  window.fbReload          = _fbReload;

})();
