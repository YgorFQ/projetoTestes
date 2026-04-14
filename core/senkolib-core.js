// @ts-nocheck
/* ═══════════════════════════════════════════════════════════════════════
   senkolib-core.js — Motor central de registro do SenkoLib

   RESPONSABILIDADE:
     Mantém o registro global de layouts, variantes, coleções e
     variantes de coleções em memória.
     Todos os outros módulos dependem deste arquivo.

   EXPÕE (via objeto global SenkoLib):
     SenkoLib.register(arr)                          → registra um array de layouts
     SenkoLib.getAll()                               → retorna todos os layouts registrados
     SenkoLib.registerVariant(name, arr)             → registra variantes de um layout
     SenkoLib.getVariants(name)                      → retorna variantes de um layout

     — Coleções (layouts pessoais por colaborador) —
     SenkoLib.registerCollection(arr)               → registra um array de layouts de coleção
     SenkoLib.getCollections()                       → retorna todos os layouts de coleção
     SenkoLib.registerCollectionVariant(id, arr)    → registra variantes de um layout de coleção
     SenkoLib.getCollectionVariants(id)             → retorna variantes de um layout de coleção

   SEPARAÇÃO DE NAMESPACES:
     Layouts oficiais  → _layouts  / _variants
     Layouts pessoais  → _collections / _collectionVariants
     Os dois grupos nunca se misturam em memória, o que garante que
     buscas, filtros e saves do módulo GitHub operem sobre o conjunto
     correto sem condicionais espalhadas pelo código.

   ORDEM DE CARREGAMENTO:
     Deve ser o primeiro <script> carregado no index.html,
     antes dos arquivos de layouts, variantes e do script.js.
═══════════════════════════════════════════════════════════════════════ */
var SenkoLib = (function () {
  /* ── Biblioteca oficial ── */
  var _layouts  = [];
  var _variants = {};

  /* ── Coleções pessoais ── */
  var _collections         = [];
  var _collectionVariants  = {};

  return {

    /* ─── Layouts oficiais ──────────────────────────── */
    register: function (arr) {
      _layouts.push.apply(_layouts, arr);
    },
    getAll: function () {
      return _layouts;
    },

    /* ─── Variantes de layouts oficiais ─────────────── */
    registerVariant: function (layoutName, arr) {
      var key = layoutName.toLowerCase();
      if (!_variants[key]) _variants[key] = [];
      _variants[key].push.apply(_variants[key], arr);
    },
    getVariants: function (layoutName) {
      return _variants[layoutName.toLowerCase()] || [];
    },

    /* ─── Coleções pessoais ──────────────────────────
       Cada item do array deve ter os campos:
         id          {string}  — identificador único (ex: 'hero-v2')
         name        {string}  — nome de exibição
         tags        {Array}   — tags de busca
         html        {string}
         css         {string}
         author      {string}  — nome do colaborador (ex: 'ygor')
         authorTag   {string}  — tag principal = nome do arquivo
                                 (ex: 'ygor' → colecoes/ygor.js)
    ─────────────────────────────────────────────────── */
    registerCollection: function (arr) {
      _collections.push.apply(_collections, arr);
    },
    getCollections: function () {
      return _collections;
    },

    /* ─── Variantes de coleções ──────────────────────
       Seguem o mesmo padrão das variantes oficiais,
       mas indexadas em _collectionVariants para não
       colidir com IDs homônimos da biblioteca oficial.
    ─────────────────────────────────────────────────── */
    registerCollectionVariant: function (layoutId, arr) {
      var key = layoutId.toLowerCase();
      if (!_collectionVariants[key]) _collectionVariants[key] = [];
      _collectionVariants[key].push.apply(_collectionVariants[key], arr);
    },
    getCollectionVariants: function (layoutId) {
      return _collectionVariants[layoutId.toLowerCase()] || [];
    },

  };
})();
