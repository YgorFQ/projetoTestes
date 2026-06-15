// @ts-nocheck
/* ═══════════════════════════════════════════════════════════════════════
   senkolib-core.js — Motor central de registro do SenkoLib

   RESPONSABILIDADE:
     Mantém o registro global de layouts e variantes em memória.
     Todos os outros módulos dependem deste arquivo.

   EXPÕE (via objeto global SenkoLib):
     SenkoLib.register(arr)               → registra um array de layouts
     SenkoLib.getAll()                    → retorna todos os layouts registrados
     SenkoLib.updateLayout(id, patch)      → edita um layout validando o nome
     SenkoLib.registerVariant(name, arr)  → registra variantes de um layout
     SenkoLib.getVariants(name)           → retorna variantes de um layout
     SenkoLib.updateVariant(name, v, patch) → edita variante validando o nome

   ORDEM DE CARREGAMENTO:
     Deve ser o primeiro <script> carregado no index.html,
     antes dos arquivos de layouts, variantes e do script.js.
═══════════════════════════════════════════════════════════════════════ */
var SenkoLib = (function () {
  var _layouts  = [];
  var _variants = {};

  /*
   * Nomes visivelmente equivalentes pertencem à mesma chave. Isso impede
   * duplicatas disfarçadas por caixa, acentos, pontuação ou espaços extras.
   */
  function _normalizeName(value) {
    return String(value || '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, ' ')
      .trim()
      .replace(/\s+/g, ' ');
  }

  function _hasLayoutName(name, exceptId) {
    var key = _normalizeName(name);
    if (!key) return false;

    return _layouts.some(function (layout) {
      return layout.id !== exceptId && _normalizeName(layout.name) === key;
    });
  }

  function _hasVariantName(layoutName, name, exceptVariant) {
    var key = _normalizeName(name);
    if (!key) return false;

    return (_variants[String(layoutName || '').toLowerCase()] || []).some(function (variant) {
      return variant !== exceptVariant && _normalizeName(variant.name) === key;
    });
  }

  return {
    register: function (arr) {
      var accepted = true;

      (Array.isArray(arr) ? arr : []).forEach(function (layout) {
        if (!layout || !layout.id || !layout.name) {
          console.error('[SenkoLib] Layout sem id ou nome foi ignorado.', layout);
          accepted = false;
          return;
        }

        var existingIndex = _layouts.findIndex(function (item) {
          return item.id === layout.id;
        });

        if (_hasLayoutName(layout.name, layout.id)) {
          console.error('[SenkoLib] Nome de layout duplicado foi recusado: ' + layout.name);
          accepted = false;
          return;
        }

        /* O mesmo id pode ser substituído durante recarga dos arquivos. */
        if (existingIndex !== -1) _layouts[existingIndex] = layout;
        else _layouts.push(layout);
      });

      return accepted;
    },
    getAll: function () {
      return _layouts;
    },
    updateLayout: function (layoutId, patch) {
      var layout = _layouts.find(function (item) { return item.id === layoutId; });
      if (!layout) return false;
      if (patch.name !== undefined && _hasLayoutName(patch.name, layoutId)) {
        console.error('[SenkoLib] Edicao recusada por nome de layout duplicado: ' + patch.name);
        return false;
      }
      if (patch.name !== undefined) layout.name = patch.name;
      if (patch.tags !== undefined) layout.tags = patch.tags;
      if (patch.html !== undefined) layout.html = patch.html;
      if (patch.css  !== undefined) layout.css  = patch.css;
      return true;
    },
    registerVariant: function (layoutName, arr) {
      var key = layoutName.toLowerCase();
      if (!_variants[key]) _variants[key] = [];

      var accepted = true;
      (Array.isArray(arr) ? arr : []).forEach(function (variant) {
        if (!variant || !variant.name) {
          console.error('[SenkoLib] Variante sem nome foi ignorada.', variant);
          accepted = false;
          return;
        }
        if (_hasVariantName(key, variant.name, null)) {
          console.error('[SenkoLib] Nome de variante duplicado foi recusado em "' + key + '": ' + variant.name);
          accepted = false;
          return;
        }
        _variants[key].push(variant);
      });
      return accepted;
    },
    getVariants: function (layoutName) {
      return _variants[layoutName.toLowerCase()] || [];
    },
    updateVariant: function (layoutName, variant, patch) {
      var variants = _variants[String(layoutName || '').toLowerCase()] || [];
      if (variants.indexOf(variant) === -1) return false;
      if (patch.name !== undefined && _hasVariantName(layoutName, patch.name, variant)) {
        console.error('[SenkoLib] Edicao recusada por nome de variante duplicado: ' + patch.name);
        return false;
      }
      if (patch.name !== undefined) variant.name = patch.name;
      if (patch.html !== undefined) variant.html = patch.html;
      if (patch.css  !== undefined) variant.css  = patch.css;
      return true;
    },
    normalizeName: _normalizeName,
    hasLayoutName: _hasLayoutName,
    hasVariantName: _hasVariantName,
  };
})();
