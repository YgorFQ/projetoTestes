// @ts-nocheck
/* ═══════════════════════════════════════════════════════════════════════
   senko-firebase.js — Módulo Firebase para o SenkoLib
   ───────────────────────────────────────────────────────────────────────
   VERSÃO: 2.0.0

   FLUXO PRINCIPAL:
     - Firebase é a única fonte de escrita (salvar/criar/editar/excluir)
     - GitHub é backup manual, acionado pelo botão "↑ GitHub" no header
     - Botões antigos "GitHub" e "Copiar objeto" foram removidos

   SINCRONIZAÇÃO COM GITHUB (manual):
     - Clique em "↑ GitHub" no header → painel de sincronização
     - Lê todos os layouts/variantes do Firestore e escreve nos .js do repo
     - Erro 409: avisa para aguardar e tentar novamente
     - Token expirado (401): pede novo token e tenta novamente

   CARREGAMENTO no index.html (após core/script.js, antes de </body>):
     <script src="https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js"></script>
     <script src="https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore-compat.js"></script>
     <script src="https://www.gstatic.com/firebasejs/10.12.2/firebase-auth-compat.js"></script>
     <script src="modules/firebase/senko-firebase.js"></script>

   SECURITY RULES (Firestore → Regras):
     rules_version = '2';
     service cloud.firestore {
       match /databases/{database}/documents {
         function isAuthed() { return request.auth != null; }
         function withinLimits() {
           return request.resource.data.html.size() <= 500000
               && request.resource.data.css.size()  <= 200000;
         }
         match /layouts/{layoutId} {
           allow read:           if isAuthed();
           allow create, update: if isAuthed() && withinLimits();
           allow delete:         if isAuthed();
         }
         match /variants/{variantId} {
           allow read:           if isAuthed();
           allow create, update: if isAuthed() && withinLimits();
           allow delete:         if isAuthed();
         }
       }
     }
═══════════════════════════════════════════════════════════════════════ */

(function () {

  /* ═══════════════════════════════════════════════════════════════════════
     CONSTANTES
  ═══════════════════════════════════════════════════════════════════════ */

  var FB_CONFIG_KEY = 'senkolib_firebase_config';
  var FB_NICK_KEY   = 'senkolib_firebase_nick';
  var GH_TOKEN_KEY  = 'senkolib_github_token';
  var GH_CONFIG_KEY = 'senkolib_github_config';

  var FB_ICON = '<svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14" aria-hidden="true">'
    + '<path d="M5.18 18.6C6.3 20.1 8.04 21 10 21c3.31 0 6-2.69 6-6 0-1.5-.56-2.87-1.47-3.92L10 5l-4.82 13.6z" opacity=".6"/>'
    + '<path d="M14.53 11.08C13.42 9.6 11.68 8.7 9.72 8.7c-.36 0-.71.04-1.05.1L10 5l4.53 6.08z" opacity=".8"/>'
    + '<path d="M10 5L5.18 18.6C6.3 20.1 8.04 21 10 21c3.31 0 6-2.69 6-6 0-1.5-.56-2.87-1.47-3.92L10 5z"/>'
    + '</svg>';

  var GH_ICON = '<svg viewBox="0 0 16 16" fill="currentColor" width="14" height="14" aria-hidden="true">'
    + '<path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>'
    + '</svg>';

  /* ═══════════════════════════════════════════════════════════════════════
     ESTADO INTERNO
  ═══════════════════════════════════════════════════════════════════════ */

  var _fbApp        = null;
  var _fbDb         = null;
  var _fbAuth       = null;
  var _fbUser       = null;
  var _fbReady      = false;
  var _fbLastSync   = null;
  var _fbReloadCd   = 0;
  var _fbVarLoaded  = {};
  var _fbConflictTs = {};
  var _fbSaving     = false;
  var _syncRunning  = false;

  /* ═══════════════════════════════════════════════════════════════════════
     UTILITÁRIOS — FIREBASE
  ═══════════════════════════════════════════════════════════════════════ */

  function _fbGetConfig() {
    try { return JSON.parse(localStorage.getItem(FB_CONFIG_KEY) || 'null'); } catch(e) { return null; }
  }
  function _fbSaveConfig(cfg) {
    try { localStorage.setItem(FB_CONFIG_KEY, JSON.stringify(cfg)); } catch(e) {}
  }
  function _fbGetNick() { return localStorage.getItem(FB_NICK_KEY) || 'anônimo'; }
  function _fbIsConfigured() { var c = _fbGetConfig(); return !!(c && c.apiKey && c.projectId); }
  function _fbTimestamp() { return _fbDb ? firebase.firestore.FieldValue.serverTimestamp() : new Date(); }
  function _fbUpdatedBy() {
    return _fbGetNick() + ' (' + (_fbUser ? _fbUser.uid.slice(0,8) : '?') + ')';
  }
  function _fbFmtDate(d) {
    if (!d) return '—';
    if (d.toDate) d = d.toDate();
    var diff = Math.floor((new Date() - d) / 1000);
    if (diff < 60)    return 'agora mesmo';
    if (diff < 3600)  return Math.floor(diff/60) + 'min atrás';
    if (diff < 86400) return Math.floor(diff/3600) + 'h atrás';
    return d.toLocaleDateString('pt-BR');
  }

  /* ═══════════════════════════════════════════════════════════════════════
     UTILITÁRIOS — GITHUB
  ═══════════════════════════════════════════════════════════════════════ */

  function _ghGetToken() { return localStorage.getItem(GH_TOKEN_KEY) || ''; }
  function _ghSetToken(t) {
    if (t) localStorage.setItem(GH_TOKEN_KEY, t.trim());
    else   localStorage.removeItem(GH_TOKEN_KEY);
  }
  function _ghGetConfig() {
    var h = window.location.hostname;
    var p = window.location.pathname;
    var m = h.match(/^([^.]+)\.github\.io$/i);
    if (m) {
      var owner = m[1];
      var repo  = p.replace(/^\//, '').split('/')[0] || '';
      if (owner && repo) return { OWNER: owner, REPO: repo, BRANCH: 'main' };
    }
    try {
      var s = JSON.parse(localStorage.getItem(GH_CONFIG_KEY) || 'null');
      if (s && s.OWNER && s.REPO) return s;
    } catch(e) {}
    return null;
  }
  function _ghEncode(str) { return btoa(unescape(encodeURIComponent(str))); }
  function _ghDecode(b64) { return decodeURIComponent(escape(atob(b64))); }

  function _ghFetch(method, path, body) {
    var cfg   = _ghGetConfig();
    var token = _ghGetToken();
    var url   = 'https://api.github.com/repos/' + cfg.OWNER + '/' + cfg.REPO + '/contents/' + path;
    var opts  = {
      method: method,
      headers: { 'Authorization': 'token ' + token, 'Accept': 'application/vnd.github+json', 'Content-Type': 'application/json' }
    };
    if (body) opts.body = JSON.stringify(body);
    return fetch(url, opts).then(function(res) {
      if (res.status === 401) { _ghSetToken(''); throw new Error('TOKEN_EXPIRED'); }
      if (res.status === 409) throw new Error('CONFLICT_409');
      return res.json().then(function(data) {
        if (!res.ok) throw new Error('GitHub ' + method + ' (' + res.status + '): ' + (data.message || path));
        return data;
      });
    });
  }

  function _ghGetFile(path) {
    var cfg   = _ghGetConfig();
    var token = _ghGetToken();
    var url   = 'https://api.github.com/repos/' + cfg.OWNER + '/' + cfg.REPO + '/contents/' + path
              + '?ref=' + (cfg.BRANCH || 'main');
    return fetch(url, {
      headers: { 'Authorization': 'token ' + token, 'Accept': 'application/vnd.github+json' }
    }).then(function(res) {
      if (res.status === 401) { _ghSetToken(''); throw new Error('TOKEN_EXPIRED'); }
      if (res.status === 404) throw new Error('NOT_FOUND');
      return res.json().then(function(data) {
        if (!res.ok) throw new Error('GitHub GET (' + res.status + '): ' + (data.message || path));
        return { content: _ghDecode((data.content||'').replace(/\n/g,'')), sha: data.sha };
      });
    });
  }

  function _ghPutFile(path, content, sha, msg) {
    var body = { message: msg, content: _ghEncode(content), branch: (_ghGetConfig()||{}).BRANCH||'main' };
    if (sha) body.sha = sha;
    return _ghFetch('PUT', path, body);
  }

  /* Parser de bounds — mesmo algoritmo do módulo GitHub original */
  function _ghFindObjectBounds(content, id) {
    var marker = '/*@@@@Senko - ' + id.toLowerCase() + ' */';
    var mPos   = content.indexOf(marker);
    if (mPos === -1) return { error: 'no_marker' };
    var open = content.indexOf('{', mPos + marker.length);
    if (open === -1) return null;
    var i = open, depth = 0, inTpl = false, len = content.length;
    while (i < len) {
      var ch = content[i];
      if (ch === '`') {
        var bs = 0, j = i-1;
        while (j >= 0 && content[j] === '\\') { bs++; j--; }
        if (bs % 2 === 0) inTpl = !inTpl;
        i++; continue;
      }
      if (inTpl) { i++; continue; }
      if (ch === '{') { depth++; i++; continue; }
      if (ch === '}') {
        depth--;
        if (depth === 0) {
          var end = i + 1;
          if (content[end] === ',') end++;
          if (content[end] === '\n') end++;
          return { start: mPos, end: end };
        }
        i++; continue;
      }
      i++;
    }
    return null;
  }

  /* Gera o bloco de código de um layout para escrever no .js */
  function _ghBuildLayoutCode(l) {
    var tags = (l.tags||[]).map(function(t){ return "'"+t+"'"; }).join(', ');
    var html = (l.html||'').replace(/`/g,'\\`');
    var css  = (l.css ||'').replace(/`/g,'\\`');
    return '/*@@@@Senko - ' + l.id + ' */\n'
      + '  /* variantes: variants/' + l.id + '.js */\n'
      + '  {\n'
      + "    id: '"   + l.id   + "',\n"
      + "    name: '" + l.name + "',\n"
      + '    tags: [' + tags   + '],\n'
      + '    html: `' + html   + '`,\n'
      + '    css: `'  + css    + '`\n'
      + '  },';
  }

  /* Gera o bloco de código de uma variante */
  function _ghBuildVariantCode(v) {
    var html = (v.html||'').replace(/`/g,'\\`');
    var css  = (v.css ||'').replace(/`/g,'\\`');
    return '/*@@@@Senko - ' + (v.name||'').toLowerCase() + ' */\n'
      + '  {\n'
      + "    name: '" + (v.name||'') + "',\n"
      + '    html: `' + html + '`,\n'
      + '    css: `'  + css  + '`\n'
      + '  },';
  }

  /* ═══════════════════════════════════════════════════════════════════════
     STATUS
  ═══════════════════════════════════════════════════════════════════════ */

  function _fbSetStatus(msg, type) {
    var el = document.getElementById('fbStatus');
    if (el) { el.textContent = msg; el.className = 'fb-status-text' + (type ? ' fb-status-'+type : ''); }
    if (type === 'error') console.warn('[senko-firebase]', msg);
    else console.log('[senko-firebase]', msg);
  }

  function _syncSetStatus(msg, type) {
    var el = document.getElementById('fbSyncStatus');
    if (el) { el.innerHTML = msg; el.className = 'fb-sync-status' + (type ? ' fb-sync-'+type : ''); }
  }

  /* ═══════════════════════════════════════════════════════════════════════
     INICIALIZAÇÃO DO FIREBASE
  ═══════════════════════════════════════════════════════════════════════ */

  function _fbInit() {
    var cfg = _fbGetConfig();
    if (!cfg || !cfg.apiKey || !cfg.projectId) {
      _fbSetStatus('Firebase não configurado — clique em 🔥 para configurar.', 'warn');
      _fbUpdateConfigBtn();
      return;
    }
    try {
      _fbApp = (firebase.apps && firebase.apps.length > 0)
        ? firebase.apps[0]
        : firebase.initializeApp({
            apiKey:        cfg.apiKey,
            authDomain:    cfg.authDomain    || cfg.projectId + '.firebaseapp.com',
            projectId:     cfg.projectId,
            storageBucket: cfg.storageBucket || cfg.projectId + '.appspot.com',
            appId:         cfg.appId         || ''
          });

      _fbDb   = firebase.firestore();
      _fbAuth = firebase.auth();

      _fbAuth.onAuthStateChanged(function(user) {
        if (user) {
          _fbUser = user; _fbReady = true;
          _fbSetStatus('Firebase conectado.', 'ok');
          _fbUpdateConfigBtn();
          _fbLoadAllLayouts();
        } else {
          _fbAuth.signInAnonymously().catch(function(err) {
            _fbSetStatus('Erro de autenticação: ' + err.message, 'error');
          });
        }
      });
    } catch(err) {
      _fbSetStatus('Erro ao inicializar Firebase: ' + err.message, 'error');
    }
  }

  /* ═══════════════════════════════════════════════════════════════════════
     CARREGAMENTO INICIAL
  ═══════════════════════════════════════════════════════════════════════ */

  function _fbLoadAllLayouts() {
    if (!_fbReady || !_fbDb) return;
    _fbSetStatus('Carregando layouts…', '');
    _fbDb.collection('layouts').get().then(function(snap) {
      var arr = [];
      snap.forEach(function(doc) {
        arr.push(doc.data());
        if (doc.data().updatedAt) _fbConflictTs[doc.id] = doc.data().updatedAt;
      });
      if (arr.length > 0) _fbMergeLayouts(arr);
      _fbLastSync = new Date();
      _fbUpdateSyncIndicator();
      _fbSetStatus('✓ ' + arr.length + ' layouts carregados.', 'ok');
      if (typeof renderGrid === 'function') renderGrid();
    }).catch(function(err) {
      _fbSetStatus('Erro ao carregar layouts: ' + err.message, 'error');
    });
  }

  function _fbMergeLayouts(fbLayouts) {
    var mem = SenkoLib.getAll();
    fbLayouts.forEach(function(fbL) {
      if (!fbL.id) return;
      var found = false;
      for (var i = 0; i < mem.length; i++) {
        if (mem[i].id === fbL.id) {
          mem[i].name = fbL.name || mem[i].name;
          mem[i].tags = fbL.tags || mem[i].tags;
          mem[i].html = fbL.html || mem[i].html;
          mem[i].css  = fbL.css  || mem[i].css;
          mem[i].updatedAt = fbL.updatedAt || mem[i].updatedAt;
          mem[i].updatedBy = fbL.updatedBy || mem[i].updatedBy;
          found = true; break;
        }
      }
      if (!found) SenkoLib.register([fbL]);
    });
  }

  function _fbLoadVariants(parentId) {
    if (!_fbReady || !_fbDb) return Promise.resolve([]);
    if (_fbVarLoaded[parentId]) return Promise.resolve(SenkoLib.getVariants(parentId));
    return _fbDb.collection('variants').where('parentId','==',parentId).get()
      .then(function(snap) {
        var arr = [];
        snap.forEach(function(doc) { arr.push(doc.data()); });
        if (arr.length > 0) SenkoLib.registerVariant(parentId, arr);
        _fbVarLoaded[parentId] = true;
        return arr;
      })
      .catch(function(err) {
        _fbSetStatus('Erro ao carregar variantes: ' + err.message, 'error');
        return [];
      });
  }

  /* ═══════════════════════════════════════════════════════════════════════
     CRUD — LAYOUTS
  ═══════════════════════════════════════════════════════════════════════ */

  function fbSaveLayout(id, obj) {
    if (!_fbReady || !_fbDb) return Promise.reject(new Error('Firebase não está pronto.'));
    if (_fbSaving) return Promise.reject(new Error('Operação em andamento.'));
    _fbSaving = true;
    var doc = { id: obj.id||id, name: obj.name||'', tags: obj.tags||[], html: obj.html||'', css: obj.css||'', updatedAt: _fbTimestamp(), updatedBy: _fbUpdatedBy() };
    return _fbDb.collection('layouts').doc(id).set(doc)
      .then(function() {
        var mem = SenkoLib.getAll();
        for (var i = 0; i < mem.length; i++) { if (mem[i].id === id) { Object.assign(mem[i], doc); break; } }
        _fbConflictTs[id] = doc.updatedAt;
        _fbSaving = false;
        _fbSetStatus('✓ Layout "' + id + '" salvo.', 'ok');
        return true;
      })
      .catch(function(err) { _fbSaving = false; _fbSetStatus('Erro: ' + err.message, 'error'); throw err; });
  }

  function fbCreateLayout(obj) {
    if (!_fbReady || !_fbDb) return Promise.reject(new Error('Firebase não está pronto.'));
    if (_fbSaving) return Promise.reject(new Error('Operação em andamento.'));

    var id = obj.id;

    /* 1. Verifica duplicata em memória (instantâneo) */
    var mem = SenkoLib.getAll();
    for (var mi = 0; mi < mem.length; mi++) {
      if (mem[mi].id === id) {
        return Promise.reject(new Error('Já existe um layout com o ID "' + id + '". Use o botão de editar no card.'));
      }
    }

    _fbSaving = true;
    var doc = { id: id, name: obj.name||'', tags: obj.tags||[], html: obj.html||'', css: obj.css||'', updatedAt: _fbTimestamp(), updatedBy: _fbUpdatedBy() };

    /* 2. Verifica também no Firestore (caso memória esteja desatualizada) */
    return _fbDb.collection('layouts').doc(id).get()
      .then(function(snap) {
        if (snap.exists) {
          _fbSaving = false;
          throw new Error('Já existe um layout com o ID "' + id + '" no Firebase. Clique em ↺ para recarregar e use o botão de editar.');
        }
        return _fbDb.collection('layouts').doc(id).set(doc);
      })
      .then(function() {
        SenkoLib.register([doc]);
        _fbConflictTs[id] = doc.updatedAt;
        _fbSaving = false;
        if (typeof renderGrid === 'function') renderGrid();
        _fbSetStatus('✓ Layout "' + id + '" criado.', 'ok');
        return true;
      })
      .catch(function(err) { _fbSaving = false; _fbSetStatus('Erro: ' + err.message, 'error'); throw err; });
  }

  function fbDeleteLayout(id) {
    if (!_fbReady || !_fbDb) return Promise.reject(new Error('Firebase não está pronto.'));
    var d1 = _fbDb.collection('layouts').doc(id).delete();
    var d2 = _fbDb.collection('variants').where('parentId','==',id).get()
      .then(function(snap) {
        var b = _fbDb.batch();
        snap.forEach(function(doc) { b.delete(doc.ref); });
        return b.commit();
      });
    return Promise.all([d1, d2]).then(function() {
      var arr = SenkoLib.getAll();
      for (var i = arr.length-1; i >= 0; i--) { if (arr[i].id === id) { arr.splice(i,1); break; } }
      delete _fbConflictTs[id]; delete _fbVarLoaded[id];
      if (typeof renderGrid === 'function') renderGrid();
      _fbSetStatus('✓ Layout "' + id + '" excluído.', 'ok');
      return true;
    }).catch(function(err) { _fbSetStatus('Erro: ' + err.message, 'error'); throw err; });
  }

  /* ═══════════════════════════════════════════════════════════════════════
     CRUD — VARIANTES
  ═══════════════════════════════════════════════════════════════════════ */

  function fbCreateVariant(parentId, obj) {
    if (!_fbReady || !_fbDb) return Promise.reject(new Error('Firebase não está pronto.'));

    var varName = obj.name || '';
    var docId   = parentId + '__' + varName.toLowerCase().replace(/\s+/g,'-');

    /* 1. Verifica duplicata em memória */
    var existingVars = SenkoLib.getVariants(parentId);
    for (var vi = 0; vi < existingVars.length; vi++) {
      if ((existingVars[vi].name || '').toLowerCase() === varName.toLowerCase()) {
        return Promise.reject(new Error('Já existe uma variante com o nome "' + varName + '" neste layout. Escolha outro nome.'));
      }
    }

    var doc = { name: varName, parentId: parentId, html: obj.html||'', css: obj.css||'', updatedAt: _fbTimestamp(), updatedBy: _fbUpdatedBy() };

    /* 2. Verifica também no Firestore */
    return _fbDb.collection('variants').doc(docId).get()
      .then(function(snap) {
        if (snap.exists) {
          throw new Error('Já existe uma variante com o nome "' + varName + '" no Firebase. Escolha outro nome.');
        }
        return _fbDb.collection('variants').doc(docId).set(doc);
      })
      .then(function() {
        SenkoLib.registerVariant(parentId, [doc]);
        _fbSetStatus('✓ Variante "' + doc.name + '" criada.', 'ok');
        return true;
      })
      .catch(function(err) { _fbSetStatus('Erro: ' + err.message, 'error'); throw err; });
  }

  function fbSaveVariant(parentId, origName, obj) {
    if (!_fbReady || !_fbDb) return Promise.reject(new Error('Firebase não está pronto.'));
    var docId    = parentId + '__' + origName.toLowerCase().replace(/\s+/g,'-');
    var newDocId = parentId + '__' + (obj.name||origName).toLowerCase().replace(/\s+/g,'-');
    var doc      = { name: obj.name||origName, parentId: parentId, html: obj.html||'', css: obj.css||'', updatedAt: _fbTimestamp(), updatedBy: _fbUpdatedBy() };
    var op = (docId !== newDocId)
      ? _fbDb.collection('variants').doc(docId).delete().then(function() { return _fbDb.collection('variants').doc(newDocId).set(doc); })
      : _fbDb.collection('variants').doc(docId).set(doc);
    return op.then(function() {
      var vars = SenkoLib.getVariants(parentId);
      var found = false;
      for (var i = 0; i < vars.length; i++) { if (vars[i].name === origName) { Object.assign(vars[i], doc); found = true; break; } }
      if (!found) SenkoLib.registerVariant(parentId, [doc]);
      _fbSetStatus('✓ Variante "' + doc.name + '" salva.', 'ok');
      return true;
    }).catch(function(err) { _fbSetStatus('Erro: ' + err.message, 'error'); throw err; });
  }

  function fbDeleteVariant(parentId, varName) {
    if (!_fbReady || !_fbDb) return Promise.reject(new Error('Firebase não está pronto.'));
    var docId = parentId + '__' + varName.toLowerCase().replace(/\s+/g,'-');
    return _fbDb.collection('variants').doc(docId).delete()
      .then(function() {
        var vars = SenkoLib.getVariants(parentId);
        for (var i = vars.length-1; i >= 0; i--) { if (vars[i].name === varName) { vars.splice(i,1); break; } }
        _fbSetStatus('✓ Variante "' + varName + '" excluída.', 'ok');
        return true;
      })
      .catch(function(err) { _fbSetStatus('Erro: ' + err.message, 'error'); throw err; });
  }

  /* ═══════════════════════════════════════════════════════════════════════
     SINCRONIZAÇÃO FIREBASE → GITHUB
  ═══════════════════════════════════════════════════════════════════════ */

  function _syncHandleError(err, context) {
    var msg = err.message || String(err);
    if (msg === 'TOKEN_EXPIRED') {
      _syncSetStatus('⚠️ Token do GitHub expirado ou inválido. Informe um novo token abaixo e tente novamente.', 'error');
      var tw = document.getElementById('fbSyncTokenWrap');
      if (tw) tw.style.display = 'block';
      _syncRunning = false; _syncResetBtn(); return;
    }
    if (msg === 'CONFLICT_409') {
      _syncSetStatus('⚠️ Conflito 409 em <strong>' + context + '</strong>: o arquivo foi modificado simultaneamente. Aguarde alguns segundos e clique em "Sincronizar" novamente.', 'error');
      _syncRunning = false; _syncResetBtn(); return;
    }
    _syncSetStatus('❌ Erro em ' + context + ': ' + msg, 'error');
    _syncRunning = false; _syncResetBtn();
  }

  function _syncResetBtn() {
    var btn = document.getElementById('fbSyncRunBtn');
    if (btn) { btn.disabled = false; btn.innerHTML = GH_ICON + ' Sincronizar'; }
  }

  function _syncStart() {
    if (_syncRunning) return;
    if (!_fbReady || !_fbDb) { _syncSetStatus('Firebase não está conectado.', 'error'); return; }

    var cfg = _ghGetConfig();
    if (!cfg || !cfg.OWNER || !cfg.REPO) {
      _syncSetStatus('⚠️ Repositório GitHub não identificado. Preencha os campos abaixo.', 'error');
      var gw = document.getElementById('fbSyncGhConfigWrap');
      if (gw) gw.style.display = 'block';
      return;
    }
    if (!_ghGetToken()) {
      _syncSetStatus('⚠️ Token do GitHub não encontrado. Informe abaixo para continuar.', 'error');
      var tw = document.getElementById('fbSyncTokenWrap');
      if (tw) tw.style.display = 'block';
      return;
    }

    _syncRunning = true;
    var btn = document.getElementById('fbSyncRunBtn');
    if (btn) { btn.disabled = true; btn.textContent = 'Sincronizando…'; }
    _syncSetStatus('Lendo dados do Firestore…', '');

    Promise.all([
      _fbDb.collection('layouts').get(),
      _fbDb.collection('variants').get()
    ]).then(function(results) {
      var layouts = [], variants = [];
      results[0].forEach(function(d) { layouts.push(d.data()); });
      results[1].forEach(function(d) { variants.push(d.data()); });
      _syncSetStatus(layouts.length + ' layouts e ' + variants.length + ' variantes encontrados. Escrevendo no GitHub…', '');
      return _syncLayouts(layouts).then(function() { return _syncVariants(variants); });
    }).then(function() {
      _syncSetStatus('✅ Sincronização concluída!', 'ok');
      _syncRunning = false; _syncResetBtn();
    }).catch(function(err) {
      _syncHandleError(err, 'sincronização');
    });
  }

  /* ─── Sincroniza layouts em todos os arquivos layoutsXXX.js ─── */
  function _syncLayouts(layouts) {
    if (layouts.length === 0) return Promise.resolve();

    /* Agrupa por targetFile (campo salvo junto com o layout), fallback: layouts001.js */
    var fileMap = {};
    layouts.forEach(function(l) {
      var f = l.targetFile || 'layouts001.js';
      if (!fileMap[f]) fileMap[f] = [];
      fileMap[f].push(l);
    });

    var files = Object.keys(fileMap);
    var i = 0;
    function next() {
      if (i >= files.length) return Promise.resolve();
      var file  = files[i++];
      var group = fileMap[file];
      return _syncLayoutFile('layouts/' + file, group).then(next);
    }
    return next();
  }

  function _syncLayoutFile(filePath, layouts) {
    _syncSetStatus('Atualizando ' + filePath + '…', '');
    return _ghGetFile(filePath).then(function(data) {
      var content = data.content;
      var sha     = data.sha;

      layouts.forEach(function(l) {
        var code   = _ghBuildLayoutCode(l);
        var bounds = _ghFindObjectBounds(content, l.id);
        if (bounds && !bounds.error) {
          /* Substitui objeto existente */
          content = content.slice(0, bounds.start) + code + '\n' + content.slice(bounds.end);
        } else {
          /* Insere antes do ]); */
          var cp = content.lastIndexOf(']);');
          if (cp !== -1) content = content.slice(0, cp) + '\n' + code + '\n\n' + content.slice(cp);
        }
      });

      return _ghPutFile(filePath, content, sha, '[SenkoLib] sync firebase → github');
    }).catch(function(err) {
      if (err.message === 'NOT_FOUND') {
        var lines = '// @ts-nocheck\nSenkoLib.register([\n\n';
        layouts.forEach(function(l) { lines += _ghBuildLayoutCode(l) + '\n\n'; });
        lines += ']);\n';
        return _ghPutFile(filePath, lines, null, '[SenkoLib] create ' + filePath + ' via sync');
      }
      throw err;
    });
  }

  /* ─── Sincroniza variantes em todos os arquivos variants/*.js ─── */
  function _syncVariants(variants) {
    if (variants.length === 0) return Promise.resolve();

    var groups = {};
    variants.forEach(function(v) {
      if (!v.parentId) return;
      if (!groups[v.parentId]) groups[v.parentId] = [];
      groups[v.parentId].push(v);
    });

    var keys = Object.keys(groups);
    var i = 0;
    function next() {
      if (i >= keys.length) return Promise.resolve();
      var pid   = keys[i++];
      var group = groups[pid];
      return _syncVariantFile(pid, group).then(next);
    }
    return next();
  }

  function _syncVariantFile(parentId, variants) {
    var filePath = 'variants/' + parentId + '.js';
    _syncSetStatus('Atualizando ' + filePath + '…', '');
    return _ghGetFile(filePath).then(function(data) {
      var content = data.content;
      var sha     = data.sha;

      variants.forEach(function(v) {
        var code   = _ghBuildVariantCode(v);
        var bounds = _ghFindObjectBounds(content, v.name);
        if (bounds && !bounds.error) {
          content = content.slice(0, bounds.start) + code + '\n' + content.slice(bounds.end);
        } else {
          var cp = content.lastIndexOf(']);');
          if (cp !== -1) content = content.slice(0, cp) + code + '\n' + content.slice(cp);
        }
      });

      return _ghPutFile(filePath, content, sha, '[SenkoLib] sync variants: ' + parentId);
    }).catch(function(err) {
      if (err.message === 'NOT_FOUND') {
        var lines = '// @ts-nocheck\nSenkoLib.registerVariant(\'' + parentId + '\', [\n\n';
        variants.forEach(function(v) { lines += _ghBuildVariantCode(v) + '\n\n'; });
        lines += ']);\n';
        return _ghPutFile(filePath, lines, null, '[SenkoLib] create ' + filePath + ' via sync');
      }
      throw err;
    });
  }

  /* ═══════════════════════════════════════════════════════════════════════
     PAINEL DE SINCRONIZAÇÃO
  ═══════════════════════════════════════════════════════════════════════ */

  function _syncBuildPanel() {
    if (document.getElementById('fbSyncPanel')) return;
    var cfg   = _ghGetConfig();
    var panel = document.createElement('div');
    panel.id        = 'fbSyncPanel';
    panel.className = 'fb-overlay fb-hidden';
    panel.innerHTML = [
      '<div class="fb-modal fb-sync-modal">',
      '  <h3>' + GH_ICON + ' Sincronizar Firebase → GitHub</h3>',
      '  <p class="fb-sync-desc">',
      '    Lê todos os layouts e variantes do Firebase e atualiza os arquivos <code>.js</code> do repositório.<br>',
      '    <strong>Não apaga</strong> layouts que só existam no GitHub — apenas atualiza ou insere novos.',
      '  </p>',
      '  <div id="fbSyncStatus" class="fb-sync-status"></div>',

      '  <div id="fbSyncGhConfigWrap" style="' + (cfg && cfg.OWNER ? 'display:none' : '') + '">',
      '    <label>Owner (usuário ou org do GitHub)</label>',
      '    <input type="text" id="fbSyncOwner" value="' + (cfg ? cfg.OWNER||'' : '') + '" placeholder="ex: ygorMartins-webm">',
      '    <label>Repositório</label>',
      '    <input type="text" id="fbSyncRepo"  value="' + (cfg ? cfg.REPO||''  : '') + '" placeholder="ex: SenkoLib">',
      '  </div>',

      '  <div id="fbSyncTokenWrap" style="' + (_ghGetToken() ? 'display:none' : '') + '">',
      '    <label>Token do GitHub <span style="opacity:.6">(classic, escopo "repo")</span></label>',
      '    <input type="password" id="fbSyncToken" placeholder="ghp_…" value="' + _ghGetToken() + '">',
      '    <span class="fb-help" style="margin-top:4px;display:block;">',
      '      Gere em <a href="https://github.com/settings/tokens" target="_blank">github.com/settings/tokens</a>.',
      '    </span>',
      '  </div>',

      '  <div class="fb-actions" style="margin-top:18px;">',
      '    <button class="btn-firebase" id="fbSyncRunBtn">' + GH_ICON + ' Sincronizar</button>',
      '    <button class="fb-btn-secondary" id="fbSyncCloseBtn">Fechar</button>',
      '  </div>',

      '  <hr class="fb-separator">',
      '  <p class="fb-help">',
      '    <strong>Erro 409?</strong> Aguarde alguns segundos e tente novamente — o GitHub rejeitou a escrita por conflito simultâneo.<br>',
      '    <strong>Token expirado?</strong> Insira um novo token no campo acima e clique em Sincronizar.',
      '  </p>',
      '</div>'
    ].join('');

    document.body.appendChild(panel);
    panel.addEventListener('click', function(e) { if (e.target === panel) _syncClosePanel(); });
    document.getElementById('fbSyncCloseBtn').addEventListener('click', _syncClosePanel);
    document.getElementById('fbSyncRunBtn').addEventListener('click', function() {
      /* Salva owner/repo/token se preenchidos */
      var ownerEl = document.getElementById('fbSyncOwner');
      var repoEl  = document.getElementById('fbSyncRepo');
      var tokenEl = document.getElementById('fbSyncToken');
      if (ownerEl && ownerEl.value.trim() && repoEl && repoEl.value.trim()) {
        try { localStorage.setItem(GH_CONFIG_KEY, JSON.stringify({ OWNER: ownerEl.value.trim(), REPO: repoEl.value.trim(), BRANCH: 'main' })); } catch(e) {}
      }
      if (tokenEl && tokenEl.value.trim()) _ghSetToken(tokenEl.value.trim());
      _syncStart();
    });
  }

  function _syncOpenPanel() {
    _syncBuildPanel();
    var cfg   = _ghGetConfig();
    var token = _ghGetToken();
    var ownerEl = document.getElementById('fbSyncOwner');
    var repoEl  = document.getElementById('fbSyncRepo');
    var tokenEl = document.getElementById('fbSyncToken');
    var ghWrap  = document.getElementById('fbSyncGhConfigWrap');
    var tkWrap  = document.getElementById('fbSyncTokenWrap');
    if (ownerEl && cfg) ownerEl.value = cfg.OWNER || '';
    if (repoEl  && cfg) repoEl.value  = cfg.REPO  || '';
    if (tokenEl) tokenEl.value = token || '';
    if (ghWrap) ghWrap.style.display = (cfg && cfg.OWNER) ? 'none' : 'block';
    if (tkWrap) tkWrap.style.display = token ? 'none' : 'block';
    var statusEl = document.getElementById('fbSyncStatus');
    if (statusEl) { statusEl.textContent = ''; statusEl.className = 'fb-sync-status'; }
    document.getElementById('fbSyncPanel').classList.remove('fb-hidden');
    document.body.style.overflow = 'hidden';
  }

  function _syncClosePanel() {
    var el = document.getElementById('fbSyncPanel');
    if (el) el.classList.add('fb-hidden');
    document.body.style.overflow = '';
  }

  /* ═══════════════════════════════════════════════════════════════════════
     DETECÇÃO DE CONFLITO
  ═══════════════════════════════════════════════════════════════════════ */

  function _fbCheckConflict(layoutId) {
    if (!_fbReady || !_fbDb || !_fbConflictTs[layoutId]) return;
    _fbDb.collection('layouts').doc(layoutId).get().then(function(doc) {
      if (!doc.exists) return;
      var remoteTs = doc.data().updatedAt;
      var localTs  = _fbConflictTs[layoutId];
      if (!remoteTs || !localTs) return;
      var rm = remoteTs.toMillis ? remoteTs.toMillis() : new Date(remoteTs).getTime();
      var lm = localTs.toMillis  ? localTs.toMillis()  : new Date(localTs).getTime();
      if (rm > lm + 5000) {
        _fbShowConflictWarning('Este layout foi editado por <strong>' + (doc.data().updatedBy||'alguém') + '</strong> ' + _fbFmtDate(remoteTs) + '. Considere recarregar antes de salvar.');
      }
    }).catch(function() {});
  }

  function _fbShowConflictWarning(html) {
    var el = document.getElementById('fbConflictWarning');
    if (el) { el.innerHTML = '⚠️ ' + html; el.style.display = 'block'; }
  }
  function _fbHideConflictWarning() {
    var el = document.getElementById('fbConflictWarning');
    if (el) el.style.display = 'none';
  }

  /* ═══════════════════════════════════════════════════════════════════════
     RECARREGAR
  ═══════════════════════════════════════════════════════════════════════ */

  function _fbReload() {
    var now = Date.now();
    if (now < _fbReloadCd) {
      _fbSetStatus('Aguarde ' + Math.ceil((_fbReloadCd-now)/1000) + 's para recarregar.', 'warn');
      return;
    }
    _fbReloadCd  = now + 30000;
    _fbVarLoaded = {};
    _fbLoadAllLayouts();
    var btn = document.getElementById('fbReloadBtn');
    if (!btn) return;
    btn.disabled = true;
    var end  = _fbReloadCd;
    var tick = setInterval(function() {
      var r = Math.ceil((end - Date.now()) / 1000);
      if (r <= 0) { clearInterval(tick); btn.disabled = false; btn.innerHTML = '↺'; return; }
      btn.innerHTML = '↺ ' + r + 's';
    }, 1000);
  }

  /* ═══════════════════════════════════════════════════════════════════════
     EXPORTAR BACKUP / MIGRAR
  ═══════════════════════════════════════════════════════════════════════ */

  function _fbExportBackup() {
    if (!_fbReady || !_fbDb) { alert('Firebase não conectado.'); return; }
    Promise.all([_fbDb.collection('layouts').get(), _fbDb.collection('variants').get()])
      .then(function(r) {
        var l = [], v = [];
        r[0].forEach(function(d) { l.push(d.data()); });
        r[1].forEach(function(d) { v.push(d.data()); });
        var blob = new Blob([JSON.stringify({ exportedAt: new Date().toISOString(), layouts: l, variants: v }, null, 2)], { type: 'application/json' });
        var a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'senkolib-backup-' + new Date().toISOString().slice(0,10) + '.json';
        a.click();
        URL.revokeObjectURL(a.href);
      })
      .catch(function(err) { _fbSetStatus('Erro ao exportar: ' + err.message, 'error'); });
  }

  function _fbMigrateFromMemory() {
    if (!_fbReady || !_fbDb) { alert('Firebase não conectado.'); return; }
    var layouts = SenkoLib.getAll();
    if (!layouts.length) { alert('Nenhum layout em memória.'); return; }
    if (!confirm('Migrar ' + layouts.length + ' layouts para o Firestore?')) return;
    var btn = document.getElementById('fbMigrateBtn');
    if (btn) { btn.textContent = 'Migrando…'; btn.disabled = true; }
    var batch = _fbDb.batch();
    layouts.forEach(function(l) {
      if (!l.id) return;
      batch.set(_fbDb.collection('layouts').doc(l.id), {
        id: l.id, name: l.name||'', tags: l.tags||[], html: l.html||'', css: l.css||'',
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(), updatedBy: _fbUpdatedBy() + ' [migração]'
      });
    });
    batch.commit()
      .then(function() {
        _fbSetStatus('✓ ' + layouts.length + ' layouts migrados!', 'ok');
        if (btn) { btn.textContent = '✓ Migrado!'; btn.disabled = false; }
      })
      .catch(function(err) {
        _fbSetStatus('Erro: ' + err.message, 'error');
        if (btn) { btn.textContent = 'Migrar do local'; btn.disabled = false; }
      });
  }

  /* ═══════════════════════════════════════════════════════════════════════
     INDICADOR DE SINCRONIZAÇÃO
  ═══════════════════════════════════════════════════════════════════════ */

  function _fbUpdateSyncIndicator() {
    var el = document.getElementById('fbLastSync');
    if (!el || !_fbLastSync) return;
    el.textContent = '🔥 ' + _fbFmtDate(_fbLastSync);
    el.title = 'Última sincronização: ' + _fbLastSync.toLocaleString('pt-BR');
  }

  function _fbUpdateConfigBtn() {
    var btn = document.getElementById('fbConfigBtn');
    if (!btn) return;
    var ok = _fbIsConfigured() && _fbReady;
    btn.classList.toggle('fb-config-active', ok);
    btn.title = ok ? '🔥 Firebase conectado' : '🔥 Configurar Firebase';
  }

  /* ═══════════════════════════════════════════════════════════════════════
     MODAL DE CONFIGURAÇÃO FIREBASE
  ═══════════════════════════════════════════════════════════════════════ */

  function _fbBuildConfigModal() {
    if (document.getElementById('fbConfigOverlay')) return;
    var cfg  = _fbGetConfig() || {};
    var overlay = document.createElement('div');
    overlay.id = 'fbConfigOverlay';
    overlay.className = 'fb-overlay fb-hidden';
    overlay.innerHTML = [
      '<div class="fb-modal">',
      '  <h3>' + FB_ICON + ' Configuração do Firebase</h3>',
      '  <div class="fb-help">',
      '    1. <a href="https://console.firebase.google.com" target="_blank">console.firebase.google.com</a> → crie um projeto<br>',
      '    2. Ative <strong>Firestore</strong> e <strong>Anonymous Auth</strong><br>',
      '    3. Configurações → Seus apps → Web → copie as credenciais abaixo',
      '  </div>',
      '  <label>API Key</label>',
      '  <input type="text" id="fbCfgApiKey" value="' + (cfg.apiKey||'') + '" placeholder="AIzaSy…">',
      '  <label>Auth Domain</label>',
      '  <input type="text" id="fbCfgAuthDomain" value="' + (cfg.authDomain||'') + '" placeholder="meu-projeto.firebaseapp.com">',
      '  <label>Project ID</label>',
      '  <input type="text" id="fbCfgProjectId" value="' + (cfg.projectId||'') + '" placeholder="meu-projeto">',
      '  <label>Storage Bucket <span style="opacity:.5">(opcional)</span></label>',
      '  <input type="text" id="fbCfgBucket" value="' + (cfg.storageBucket||'') + '" placeholder="meu-projeto.appspot.com">',
      '  <label>App ID <span style="opacity:.5">(opcional)</span></label>',
      '  <input type="text" id="fbCfgAppId" value="' + (cfg.appId||'') + '" placeholder="1:123…:web:abc…">',
      '  <hr class="fb-separator">',
      '  <label>Seu apelido (aparece no "editado por")</label>',
      '  <input type="text" id="fbCfgNick" value="' + _fbGetNick() + '" placeholder="Ex: Ygor">',
      '  <div id="fbConfigError" class="fb-error fb-hidden"></div>',
      '  <div class="fb-actions">',
      '    <button class="btn-firebase" id="fbConfigSaveBtn">' + FB_ICON + ' Salvar e conectar</button>',
      '    <button class="fb-btn-secondary" id="fbConfigTestBtn">Testar conexão</button>',
      '    <button class="fb-btn-secondary" id="fbConfigCancelBtn">Fechar</button>',
      '  </div>',
      '  <hr class="fb-separator">',
      '  <div class="fb-actions">',
      '    <button class="fb-btn-secondary" id="fbExportBtn">⬇ Exportar backup JSON</button>',
      '    <button class="fb-btn-secondary" id="fbMigrateBtn">⬆ Migrar layouts locais → Firebase</button>',
      '  </div>',
      '</div>'
    ].join('');
    document.body.appendChild(overlay);
    overlay.addEventListener('click', function(e) { if (e.target === overlay) _fbCloseConfigModal(); });
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
  }
  function _fbCloseConfigModal() {
    var el = document.getElementById('fbConfigOverlay');
    if (el) el.classList.add('fb-hidden');
    document.body.style.overflow = '';
  }

  function _fbSaveConfigAndReconnect() {
    var apiKey     = (document.getElementById('fbCfgApiKey')     ||{}).value||'';
    var authDomain = (document.getElementById('fbCfgAuthDomain') ||{}).value||'';
    var projectId  = (document.getElementById('fbCfgProjectId')  ||{}).value||'';
    var bucket     = (document.getElementById('fbCfgBucket')     ||{}).value||'';
    var appId      = (document.getElementById('fbCfgAppId')      ||{}).value||'';
    var nick       = (document.getElementById('fbCfgNick')       ||{}).value||'anônimo';
    var errEl      = document.getElementById('fbConfigError');
    if (!apiKey || !projectId) {
      if (errEl) { errEl.textContent = 'API Key e Project ID são obrigatórios.'; errEl.classList.remove('fb-hidden'); }
      return;
    }
    if (errEl) errEl.classList.add('fb-hidden');
    _fbSaveConfig({ apiKey: apiKey, authDomain: authDomain, projectId: projectId, storageBucket: bucket, appId: appId });
    try { localStorage.setItem(FB_NICK_KEY, nick.trim()); } catch(e) {}
    _fbCloseConfigModal();
    _fbReady = false; _fbApp = null; _fbDb = null; _fbAuth = null; _fbUser = null;
    _fbInit();
  }

  function _fbTestConnection() {
    var errEl   = document.getElementById('fbConfigError');
    var testBtn = document.getElementById('fbConfigTestBtn');
    if (errEl) errEl.classList.add('fb-hidden');
    if (!_fbReady || !_fbDb) {
      if (errEl) { errEl.textContent = 'Salve as configurações primeiro.'; errEl.classList.remove('fb-hidden'); }
      return;
    }
    if (testBtn) { testBtn.textContent = 'Testando…'; testBtn.disabled = true; }
    _fbDb.collection('layouts').limit(1).get()
      .then(function() {
        if (errEl) { errEl.textContent = '✓ Conexão OK!'; errEl.style.background = 'rgba(76,175,80,.15)'; errEl.style.color = '#A5D6A7'; errEl.classList.remove('fb-hidden'); }
        if (testBtn) { testBtn.textContent = 'Testar conexão'; testBtn.disabled = false; }
      })
      .catch(function(err) {
        if (errEl) { errEl.textContent = 'Erro: ' + err.message; errEl.classList.remove('fb-hidden'); }
        if (testBtn) { testBtn.textContent = 'Testar conexão'; testBtn.disabled = false; }
      });
  }

  /* ═══════════════════════════════════════════════════════════════════════
     MODAL DE CONFIRMAÇÃO DE EXCLUSÃO
  ═══════════════════════════════════════════════════════════════════════ */

  function _fbBuildDeleteModal() {
    if (document.getElementById('fbDeleteOverlay')) return;
    var overlay = document.createElement('div');
    overlay.id = 'fbDeleteOverlay';
    overlay.className = 'fb-overlay fb-hidden';
    overlay.innerHTML = [
      '<div class="fb-modal fb-confirm-modal">',
      '  <h3>Confirmar exclusão</h3>',
      '  <p id="fbDeleteMsg"></p>',
      '  <div class="fb-actions">',
      '    <button class="fb-btn-danger" id="fbDeleteConfirmBtn">Excluir</button>',
      '    <button class="fb-btn-secondary" id="fbDeleteCancelBtn">Cancelar</button>',
      '  </div>',
      '</div>'
    ].join('');
    document.body.appendChild(overlay);
    overlay.addEventListener('click', function(e) { if (e.target === overlay) _fbCloseDeleteModal(); });
    document.getElementById('fbDeleteCancelBtn').addEventListener('click', _fbCloseDeleteModal);
  }

  var _fbDeleteCb = null;

  function _fbOpenDeleteModal(msg, cb) {
    _fbBuildDeleteModal();
    var msgEl = document.getElementById('fbDeleteMsg');
    if (msgEl) msgEl.textContent = msg;
    _fbDeleteCb = cb;
    var old = document.getElementById('fbDeleteConfirmBtn');
    var btn = old.cloneNode(true);
    old.parentNode.replaceChild(btn, old);
    btn.addEventListener('click', function() { if (_fbDeleteCb) _fbDeleteCb(); _fbCloseDeleteModal(); });
    document.getElementById('fbDeleteOverlay').classList.remove('fb-hidden');
    document.body.style.overflow = 'hidden';
  }

  function _fbCloseDeleteModal() {
    var el = document.getElementById('fbDeleteOverlay');
    if (el) el.classList.add('fb-hidden');
    document.body.style.overflow = '';
    _fbDeleteCb = null;
  }

  /* ═══════════════════════════════════════════════════════════════════════
     ESTILOS
  ═══════════════════════════════════════════════════════════════════════ */

  function _fbInjectStyles() {
    if (document.getElementById('fbModuleStyles')) return;
    var s = document.createElement('style');
    s.id = 'fbModuleStyles';
    s.textContent = [
      '.btn-firebase{display:inline-flex;align-items:center;gap:5px;padding:7px 13px;border:none;border-radius:6px;cursor:pointer;font-size:13px;font-weight:600;background:#F57C00;color:#fff;transition:background .15s,opacity .15s;}',
      '.btn-firebase:hover:not(:disabled){background:#E65100;}',
      '.btn-firebase:disabled{opacity:.55;cursor:default;}',
      '.fb-config-btn{background:transparent;border:1.5px solid rgba(255,255,255,.2);border-radius:6px;padding:5px 9px;cursor:pointer;font-size:14px;color:var(--text-muted,#888);transition:border-color .15s,color .15s;}',
      '.fb-config-btn:hover{border-color:#F57C00;color:#F57C00;}',
      '.fb-config-btn.fb-config-active{border-color:#4CAF50;color:#4CAF50;}',
      '.fb-sync-btn{display:inline-flex;align-items:center;gap:6px;background:transparent;border:1.5px solid rgba(255,255,255,.2);border-radius:6px;padding:5px 10px;cursor:pointer;font-size:13px;font-weight:600;color:var(--text-muted,#888);transition:border-color .15s,color .15s;}',
      '.fb-sync-btn:hover{border-color:#aaa;color:#ddd;}',
      '.fb-reload-btn{background:transparent;border:none;cursor:pointer;font-size:16px;padding:4px 8px;border-radius:6px;color:var(--text-muted,#888);transition:color .15s;}',
      '.fb-reload-btn:hover:not(:disabled){color:#F57C00;}',
      '.fb-reload-btn:disabled{opacity:.4;cursor:default;}',
      '.fb-status-text{display:none;}',
      '#fbLastSync{font-size:11px;color:var(--text-muted,#888);margin-left:8px;white-space:nowrap;}',
      '.fb-overlay{position:fixed;inset:0;background:rgba(0,0,0,.55);display:flex;align-items:center;justify-content:center;z-index:9000;padding:16px;}',
      '.fb-overlay.fb-hidden{display:none;}',
      '.fb-modal{background:var(--surface,#1e1e1e);border-radius:12px;padding:28px 32px;width:100%;max-width:480px;box-shadow:0 8px 32px rgba(0,0,0,.45);color:var(--text,#eee);max-height:90vh;overflow-y:auto;}',
      '.fb-modal h3{margin:0 0 14px;font-size:18px;display:flex;align-items:center;gap:8px;}',
      '.fb-modal label{display:block;font-size:12px;color:var(--text-muted,#888);margin:12px 0 4px;}',
      '.fb-modal input[type=text],.fb-modal input[type=password]{width:100%;box-sizing:border-box;background:var(--input-bg,#2a2a2a);border:1px solid var(--border,#333);border-radius:6px;padding:8px 10px;color:var(--text,#eee);font-size:13px;}',
      '.fb-modal input:focus{outline:2px solid #F57C00;border-color:transparent;}',
      '.fb-modal .fb-actions{display:flex;gap:10px;margin-top:20px;flex-wrap:wrap;}',
      '.fb-btn-secondary{background:transparent;border:1px solid var(--border,#444);border-radius:6px;padding:8px 16px;cursor:pointer;color:var(--text-muted,#aaa);font-size:13px;}',
      '.fb-btn-secondary:hover{border-color:var(--text-muted,#888);}',
      '.fb-error{margin-top:10px;padding:8px 12px;border-radius:6px;background:rgba(229,57,53,.15);color:#ef9a9a;font-size:13px;}',
      '.fb-error.fb-hidden{display:none;}',
      '.fb-help{font-size:12px;color:var(--text-muted,#888);line-height:1.5;}',
      '.fb-help a{color:#F57C00;text-decoration:none;}',
      '.fb-help a:hover{text-decoration:underline;}',
      '.fb-separator{border:none;border-top:1px solid var(--border,#333);margin:18px 0;}',
      '.fb-sync-modal{max-width:520px;}',
      '.fb-sync-desc{font-size:13px;color:var(--text-muted,#aaa);margin-bottom:14px;line-height:1.6;}',
      '.fb-sync-status{min-height:36px;padding:8px 12px;border-radius:6px;font-size:13px;line-height:1.5;background:var(--input-bg,#2a2a2a);color:var(--text-muted,#aaa);margin-bottom:10px;}',
      '.fb-sync-ok{background:rgba(76,175,80,.12)!important;color:#A5D6A7!important;}',
      '.fb-sync-error{background:rgba(229,57,53,.12)!important;color:#ef9a9a!important;}',
      '#fbConflictWarning{display:none;background:rgba(255,152,0,.1);color:#FFB74D;border:1px solid rgba(255,152,0,.3);border-radius:6px;padding:8px 12px;font-size:12px;margin-bottom:10px;line-height:1.5;}',
      '.fb-confirm-modal{max-width:380px;}',
      '.fb-confirm-modal p{font-size:14px;color:var(--text-muted,#aaa);margin-bottom:18px;}',
      '.fb-btn-danger{background:#c62828;color:#fff;border:none;border-radius:6px;padding:8px 18px;cursor:pointer;font-size:13px;font-weight:600;}',
      '.fb-btn-danger:hover{background:#b71c1c;}',
    ].join('\n');
    document.head.appendChild(s);
  }

  /* ═══════════════════════════════════════════════════════════════════════
     INJEÇÃO DE BOTÕES
  ═══════════════════════════════════════════════════════════════════════ */

  function _fbInjectButtons() {

    /* Status span oculto */
    if (!document.getElementById('fbStatus')) {
      var sp = document.createElement('span');
      sp.id = 'fbStatus'; sp.className = 'fb-status-text';
      document.body.appendChild(sp);
    }

    /* Aviso de conflito */
    if (!document.getElementById('fbConflictWarning')) {
      var cw = document.createElement('div');
      cw.id = 'fbConflictWarning';
      var em = document.getElementById('editModal');
      if (em) em.insertBefore(cw, em.firstChild);
      else document.body.appendChild(cw);
    }

    /* ─── Header ─── */
    var searchWrap = document.querySelector('.search-wrap');
    if (searchWrap && !document.getElementById('fbConfigBtn')) {

      var syncInd = document.createElement('span');
      syncInd.id = 'fbLastSync';
      searchWrap.parentNode.insertBefore(syncInd, searchWrap);

      var reloadBtn = document.createElement('button');
      reloadBtn.id = 'fbReloadBtn'; reloadBtn.className = 'fb-reload-btn';
      reloadBtn.title = 'Recarregar layouts do Firebase'; reloadBtn.innerHTML = '↺';
      reloadBtn.addEventListener('click', _fbReload);
      searchWrap.parentNode.insertBefore(reloadBtn, searchWrap);

      var syncBtn = document.createElement('button');
      syncBtn.id = 'fbSyncOpenBtn'; syncBtn.className = 'fb-sync-btn';
      syncBtn.title = 'Sincronizar Firebase → GitHub';
      syncBtn.innerHTML = GH_ICON + ' GitHub';
      syncBtn.addEventListener('click', _syncOpenPanel);
      searchWrap.parentNode.insertBefore(syncBtn, searchWrap);

      var cfgBtn = document.createElement('button');
      cfgBtn.id = 'fbConfigBtn'; cfgBtn.className = 'fb-config-btn';
      cfgBtn.title = '🔥 Configurar Firebase'; cfgBtn.innerHTML = '🔥';
      cfgBtn.addEventListener('click', _fbOpenConfigModal);
      searchWrap.parentNode.insertBefore(cfgBtn, searchWrap);

      _fbUpdateConfigBtn();
    }

    /* ─── Modal edição layout: Salvar + Excluir ─── */
    var editModalClose = document.getElementById('editModalClose');
    if (editModalClose && !document.getElementById('fbSaveLayoutBtn')) {

      var fbDelBtn = document.createElement('button');
      fbDelBtn.id = 'fbDeleteLayoutBtn'; fbDelBtn.className = 'fb-btn-secondary';
      fbDelBtn.style.cssText = 'color:#ef9a9a;border-color:rgba(239,154,154,.35);';
      fbDelBtn.innerHTML = '🗑 Excluir'; fbDelBtn.title = 'Excluir este layout do Firebase';
      editModalClose.parentNode.insertBefore(fbDelBtn, editModalClose);
      fbDelBtn.addEventListener('click', function() {
        var id = (document.getElementById('editId')||{}).value||'';
        if (!id) return;
        _fbOpenDeleteModal('Excluir o layout "' + id + '" e todas as suas variantes? Esta ação não pode ser desfeita.', function() {
          fbDeleteLayout(id);
          if (typeof closeEditModal === 'function') closeEditModal();
        });
      });

      var fbSaveBtn = document.createElement('button');
      fbSaveBtn.id = 'fbSaveLayoutBtn'; fbSaveBtn.className = 'btn-firebase';
      fbSaveBtn.innerHTML = FB_ICON + ' Salvar'; fbSaveBtn.title = 'Salvar no Firebase';
      editModalClose.parentNode.insertBefore(fbSaveBtn, editModalClose);
      fbSaveBtn.addEventListener('click', function() {
        var id   = ((document.getElementById('editId')  ||{}).value||'').trim().toLowerCase();
        var name = ((document.getElementById('editName')||{}).value||'').trim();
        var tags = ((document.getElementById('editTags')||{}).value||'').split(',').map(function(t){return t.trim();}).filter(Boolean);
        var html = (document.getElementById('editHtml')||{}).value||'';
        var css  = (document.getElementById('editCss') ||{}).value||'';
        if (!id || !name) { alert('Preencha os campos ID e Nome.'); return; }
        fbSaveBtn.textContent = 'Salvando…'; fbSaveBtn.disabled = true;
        fbSaveLayout(id, { id:id, name:name, tags:tags, html:html, css:css })
          .then(function() {
            fbSaveBtn.innerHTML = FB_ICON + ' Salvo!';
            setTimeout(function() { if (typeof closeEditModal === 'function') closeEditModal(); fbSaveBtn.innerHTML = FB_ICON + ' Salvar'; fbSaveBtn.disabled = false; }, 1200);
          })
          .catch(function(err) { alert('Erro: ' + err.message); fbSaveBtn.innerHTML = FB_ICON + ' Salvar'; fbSaveBtn.disabled = false; });
      });
    }

    /* ─── Modal criação layout: Salvar ─── */
    var addModalClose = document.getElementById('addModalClose');
    if (addModalClose && !document.getElementById('fbSaveNewLayoutBtn')) {
      var fbNewBtn = document.createElement('button');
      fbNewBtn.id = 'fbSaveNewLayoutBtn'; fbNewBtn.className = 'btn-firebase';
      fbNewBtn.innerHTML = FB_ICON + ' Salvar'; fbNewBtn.title = 'Salvar novo layout no Firebase';
      addModalClose.parentNode.insertBefore(fbNewBtn, addModalClose);
      fbNewBtn.addEventListener('click', function() {
        var id   = ((document.getElementById('addId')  ||{}).value||'').trim().toLowerCase();
        var name = ((document.getElementById('addName')||{}).value||'').trim();
        var tags = ((document.getElementById('addTags')||{}).value||'').split(',').map(function(t){return t.trim();}).filter(Boolean);
        var html = (document.getElementById('addHtml') ||{}).value||'';
        var css  = (document.getElementById('addCss')  ||{}).value||'';
        if (!id || !name) { alert('Preencha ao menos ID e Nome.'); return; }
        fbNewBtn.textContent = 'Salvando…'; fbNewBtn.disabled = true;
        fbCreateLayout({ id:id, name:name, tags:tags, html:html, css:css })
          .then(function() {
            fbNewBtn.innerHTML = FB_ICON + ' Salvo!';
            setTimeout(function() { if (typeof closeAddModal === 'function') closeAddModal(); fbNewBtn.innerHTML = FB_ICON + ' Salvar'; fbNewBtn.disabled = false; }, 1200);
          })
          .catch(function(err) { alert('Erro: ' + err.message); fbNewBtn.innerHTML = FB_ICON + ' Salvar'; fbNewBtn.disabled = false; });
      });
    }

    /* ─── Modal nova variante: Salvar ─── */
    var newVarClose = document.getElementById('newVarClose');
    if (newVarClose && !document.getElementById('fbSaveNewVarBtn')) {
      var fbNVBtn = document.createElement('button');
      fbNVBtn.id = 'fbSaveNewVarBtn'; fbNVBtn.className = 'btn-firebase';
      fbNVBtn.innerHTML = FB_ICON + ' Salvar'; fbNVBtn.title = 'Salvar nova variante no Firebase';
      newVarClose.parentNode.insertBefore(fbNVBtn, newVarClose);
      fbNVBtn.addEventListener('click', function() {
        var name     = ((document.getElementById('newVarName')||{}).value||'').trim();
        var html     = (document.getElementById('newVarHtml') ||{}).value||'';
        var css      = (document.getElementById('newVarCss')  ||{}).value||'';
        var parentId = state && state.currentForVariant ? state.currentForVariant.id : '';
        if (!name || !parentId) { alert('Preencha o nome da variante.'); return; }
        fbNVBtn.textContent = 'Salvando…'; fbNVBtn.disabled = true;
        fbCreateVariant(parentId, { name:name, html:html, css:css })
          .then(function() {
            fbNVBtn.innerHTML = FB_ICON + ' Salvo!';
            if (typeof renderVariantBlocks === 'function') renderVariantBlocks(parentId);
            if (typeof updateVariantsCount  === 'function') updateVariantsCount(parentId);
            setTimeout(function() { if (typeof closeNewVariantModal === 'function') closeNewVariantModal(); fbNVBtn.innerHTML = FB_ICON + ' Salvar'; fbNVBtn.disabled = false; }, 1200);
          })
          .catch(function(err) { alert('Erro: ' + err.message); fbNVBtn.innerHTML = FB_ICON + ' Salvar'; fbNVBtn.disabled = false; });
      });
    }

    /* ─── Modal edição variante: Salvar + Excluir ─── */
    var editVarClose = document.getElementById('editVarClose');
    if (editVarClose && !document.getElementById('fbSaveVarBtn')) {

      var fbDelVarBtn = document.createElement('button');
      fbDelVarBtn.id = 'fbDeleteVarBtn'; fbDelVarBtn.className = 'fb-btn-secondary';
      fbDelVarBtn.style.cssText = 'color:#ef9a9a;border-color:rgba(239,154,154,.35);';
      fbDelVarBtn.innerHTML = '🗑 Excluir'; fbDelVarBtn.title = 'Excluir esta variante do Firebase';
      editVarClose.parentNode.insertBefore(fbDelVarBtn, editVarClose);
      fbDelVarBtn.addEventListener('click', function() {
        var parentId = state && state.currentForVariant  ? state.currentForVariant.id   : '';
        var varName  = state && state.currentEditVariant ? state.currentEditVariant.name : '';
        if (!parentId || !varName) return;
        _fbOpenDeleteModal('Excluir a variante "' + varName + '" do Firebase?', function() {
          fbDeleteVariant(parentId, varName).then(function() {
            if (typeof renderVariantBlocks  === 'function') renderVariantBlocks(parentId);
            if (typeof updateVariantsCount   === 'function') updateVariantsCount(parentId);
            if (typeof closeEditVariantModal === 'function') closeEditVariantModal();
          });
        });
      });

      var fbSVBtn = document.createElement('button');
      fbSVBtn.id = 'fbSaveVarBtn'; fbSVBtn.className = 'btn-firebase';
      fbSVBtn.innerHTML = FB_ICON + ' Salvar'; fbSVBtn.title = 'Salvar variante no Firebase';
      editVarClose.parentNode.insertBefore(fbSVBtn, editVarClose);
      fbSVBtn.addEventListener('click', function() {
        var name     = ((document.getElementById('editVarName')||{}).value||'').trim();
        var html     = (document.getElementById('editVarHtml') ||{}).value||'';
        var css      = (document.getElementById('editVarCss')  ||{}).value||'';
        var parentId = state && state.currentForVariant  ? state.currentForVariant.id   : '';
        var origName = state && state.currentEditVariant ? state.currentEditVariant.name : name;
        if (!name || !parentId) { alert('Dados insuficientes.'); return; }
        fbSVBtn.textContent = 'Salvando…'; fbSVBtn.disabled = true;
        fbSaveVariant(parentId, origName, { name:name, html:html, css:css })
          .then(function() {
            fbSVBtn.innerHTML = FB_ICON + ' Salvo!';
            if (typeof renderVariantBlocks === 'function') renderVariantBlocks(parentId);
            setTimeout(function() { if (typeof closeEditVariantModal === 'function') closeEditVariantModal(); fbSVBtn.innerHTML = FB_ICON + ' Salvar'; fbSVBtn.disabled = false; }, 1200);
          })
          .catch(function(err) { alert('Erro: ' + err.message); fbSVBtn.innerHTML = FB_ICON + ' Salvar'; fbSVBtn.disabled = false; });
      });
    }
  }

  /* ═══════════════════════════════════════════════════════════════════════
     PATCH — variantes sob demanda + detecção de conflito
  ═══════════════════════════════════════════════════════════════════════ */

  function _fbPatchVariantsModal() {
    if (typeof window.openVariantsModal === 'function') {
      var _orig = window.openVariantsModal;
      window.openVariantsModal = function(layout) {
        if (layout && layout.id && !_fbVarLoaded[layout.id]) {
          _fbLoadVariants(layout.id).then(function() { _orig(layout); });
          return;
        }
        _orig(layout);
      };
    }
    if (typeof window.openEditModal === 'function') {
      var _origEdit = window.openEditModal;
      window.openEditModal = function(layout) {
        _origEdit(layout);
        _fbHideConflictWarning();
        if (layout && layout.id) _fbCheckConflict(layout.id);
      };
    }
  }

  /* ═══════════════════════════════════════════════════════════════════════
     INICIALIZAÇÃO
  ═══════════════════════════════════════════════════════════════════════ */

  document.addEventListener('DOMContentLoaded', function() {
    _fbInjectStyles();
    _fbInjectButtons();
    _fbPatchVariantsModal();

    if (typeof firebase === 'undefined') {
      console.warn('[senko-firebase] SDK do Firebase não encontrado. Adicione os <script> do Firebase antes deste arquivo.');
      return;
    }
    _fbInit();
  });

  /* ═══════════════════════════════════════════════════════════════════════
     EXPOSIÇÃO GLOBAL
  ═══════════════════════════════════════════════════════════════════════ */

  window.fbSaveLayout    = fbSaveLayout;
  window.fbCreateLayout  = fbCreateLayout;
  window.fbDeleteLayout  = fbDeleteLayout;
  window.fbCreateVariant = fbCreateVariant;
  window.fbSaveVariant   = fbSaveVariant;
  window.fbDeleteVariant = fbDeleteVariant;
  window.fbOpenConfig    = _fbOpenConfigModal;
  window.fbReload        = _fbReload;
  window.fbSyncToGithub  = _syncStart;

})();
