// @ts-nocheck
/* ═══════════════════════════════════════════════════════════════════════
   senkolib-core.js — Motor central de registro do SenkoLib

   RESPONSABILIDADE:
     Mantém o registro global de layouts e variantes em memória.
     Todos os outros módulos dependem deste arquivo.

   EXPÕE (via objeto global SenkoLib):

     — Registro —
     SenkoLib.register(arr)                  → registra array de layouts (boot via .js)
     SenkoLib.registerVariant(name, arr)     → registra variantes de um layout (boot via .js)

     — Leitura —
     SenkoLib.getAll()                       → retorna todos os layouts registrados
     SenkoLib.getById(id)                    → retorna um layout pelo id
     SenkoLib.getVariants(name)              → retorna variantes de um layout

     — Escrita em memória (usados pelo Firebase e GitHub após salvar) —
     SenkoLib.set(id, data)                  → atualiza ou insere layout na memória
     SenkoLib.remove(id)                     → remove layout da memória
     SenkoLib.setVariant(parentId, name, data) → atualiza ou insere variante na memória
     SenkoLib.removeVariant(parentId, name)  → remove variante da memória
     SenkoLib.clearAll()                     → limpa tudo (usado pelo Firebase no boot)

     — Lock global de salvamento —
     SenkoLib.lock(caller)                   → trava operações simultâneas
     SenkoLib.unlock()                       → libera o lock
     SenkoLib.isLocked()                     → retorna true se há operação em andamento

     — Fonte de dados ativa —
     SenkoLib.setSource(source)              → 'firebase' | 'github'
     SenkoLib.getSource()                    → retorna a fonte ativa

   ORDEM DE CARREGAMENTO:
     Deve ser o primeiro <script> carregado no index.html,
     antes dos arquivos de layouts, variantes e do script.js.
═══════════════════════════════════════════════════════════════════════ */

var SenkoLib = (function () {

  /* ─── Estado interno ──────────────────────────────── */
  var _layouts  = [];
  var _variants = {};
  var _source   = 'github'; /* 'firebase' | 'github' */

  /* ─── Lock global ────────────────────────────────── */
  var _locked        = false;
  var _lockCaller    = '';
  var _lockTimeout   = null;
  var LOCK_TIMEOUT_MS = 30000; /* 30s — libera automaticamente se travar */

  /* ─── Utilitário interno ─────────────────────────── */
  function _findLayoutIndex(id) {
    for (var i = 0; i < _layouts.length; i++) {
      if (_layouts[i].id === id) return i;
    }
    return -1;
  }

  function _findVariantIndex(parentId, name) {
    var key  = parentId.toLowerCase();
    var arr  = _variants[key] || [];
    var low  = name.toLowerCase();
    for (var i = 0; i < arr.length; i++) {
      if ((arr[i].name || '').toLowerCase() === low) return i;
    }
    return -1;
  }

  /* ─── API pública ────────────────────────────────── */
  return {

    /* ── Registro em lote (boot via arquivos .js) ── */
    register: function (arr) {
      _layouts.push.apply(_layouts, arr);
    },

    registerVariant: function (layoutName, arr) {
      var key = layoutName.toLowerCase();
      if (!_variants[key]) _variants[key] = [];
      _variants[key].push.apply(_variants[key], arr);
    },

    /* ── Leitura ── */
    getAll: function () {
      return _layouts;
    },

    getById: function (id) {
      var idx = _findLayoutIndex(id);
      return idx !== -1 ? _layouts[idx] : null;
    },

    getVariants: function (layoutName) {
      return _variants[layoutName.toLowerCase()] || [];
    },

    /* ── Escrita individual em memória ── */

    /* Atualiza layout existente ou insere se não existir */
    set: function (id, data) {
      var idx = _findLayoutIndex(id);
      if (idx !== -1) {
        _layouts[idx] = data;
      } else {
        _layouts.push(data);
      }
    },

    /* Remove layout da memória */
    remove: function (id) {
      var idx = _findLayoutIndex(id);
      if (idx !== -1) _layouts.splice(idx, 1);
    },

    /* Atualiza variante existente ou insere se não existir */
    setVariant: function (parentId, name, data) {
      var key = parentId.toLowerCase();
      if (!_variants[key]) _variants[key] = [];
      var idx = _findVariantIndex(parentId, name);
      if (idx !== -1) {
        _variants[key][idx] = data;
      } else {
        _variants[key].push(data);
      }
    },

    /* Remove variante da memória */
    removeVariant: function (parentId, name) {
      var idx = _findVariantIndex(parentId, name);
      if (idx !== -1) {
        var key = parentId.toLowerCase();
        _variants[key].splice(idx, 1);
      }
    },

    /* Limpa tudo — usado pelo Firebase no boot antes de popular */
    clearAll: function () {
      _layouts  = [];
      _variants = {};
    },

    /* ── Lock global ── */

    lock: function (caller) {
      if (_locked) {
        console.warn('[SenkoLib] Lock já ativo por: ' + _lockCaller + '. Solicitado por: ' + (caller || '?'));
        return false;
      }
      _locked     = true;
      _lockCaller = caller || 'desconhecido';
      _lockTimeout = setTimeout(function () {
        console.warn('[SenkoLib] Lock liberado por timeout de segurança. Caller: ' + _lockCaller);
        _locked     = false;
        _lockCaller = '';
        _lockTimeout = null;
      }, LOCK_TIMEOUT_MS);
      return true;
    },

    unlock: function () {
      _locked     = false;
      _lockCaller = '';
      if (_lockTimeout) {
        clearTimeout(_lockTimeout);
        _lockTimeout = null;
      }
    },

    isLocked: function () {
      return _locked;
    },

    /* ── Fonte de dados ativa ── */

    setSource: function (source) {
      if (source !== 'firebase' && source !== 'github') {
        console.warn('[SenkoLib] Fonte inválida: ' + source + '. Use "firebase" ou "github".');
        return;
      }
      _source = source;
      /* Dispara evento global para a UI atualizar o indicador visual */
      try {
        window.dispatchEvent(new CustomEvent('senkolib:sourcechange', { detail: { source: source } }));
      } catch (e) {}
    },

    getSource: function () {
      return _source;
    },

  };

})();
