// @ts-nocheck
/* ═══════════════════════════════════════════════════════════════════════
   senkolib-core.js — Motor central de registro do SenkoLib

   RESPONSABILIDADE:
     Mantém o registro global de layouts e variantes em memória.
     Todos os outros módulos dependem deste arquivo.

   EXPÕE (via objeto global SenkoLib):
     SenkoLib.register(arr)               → registra um array de layouts
     SenkoLib.getAll()                    → retorna todos os layouts registrados
     SenkoLib.registerVariant(name, arr)  → registra variantes de um layout
     SenkoLib.getVariants(name)           → retorna variantes de um layout

   ORDEM DE CARREGAMENTO:
     Deve ser o primeiro <script> carregado no index.html,
     antes dos arquivos de layouts, variantes e do script.js.
═══════════════════════════════════════════════════════════════════════ */
var SenkoLib = (function () {
  var _layouts  = [];
  var _variants = {};

  return {
    register: function (arr) {
      _layouts.push.apply(_layouts, arr);
    },
    getAll: function () {
      return _layouts;
    },
    registerVariant: function (layoutName, arr) {
      var key = layoutName.toLowerCase();
      if (!_variants[key]) _variants[key] = [];
      _variants[key].push.apply(_variants[key], arr);
    },
    getVariants: function (layoutName) {
      return _variants[layoutName.toLowerCase()] || [];
    },
  };
})();
