// @ts-nocheck
/* ═══════════════════════════════════════════════════════════════════════
   col-core.js — Motor de registro das Coleções

   RESPONSABILIDADE:
     Mantém em memória o registro de todas as coleções e seus layouts.
     Completamente isolado do SenkoLib (biblioteca oficial).
     Nenhum outro arquivo do sistema original é tocado por este módulo.

   EXPÕE (via objeto global ColLib):
     ColLib.registerCollection(obj)         → registra uma coleção
     ColLib.getCollections()                → retorna todas as coleções
     ColLib.getCollection(slug)             → retorna uma coleção pelo slug
     ColLib.removeCollection(slug)          → remove coleção da memória
     ColLib.updateCollection(slug, fields)  → atualiza campos de uma coleção em memória

     ColLib.registerLayout(slug, arr)       → registra layouts dentro de uma coleção
     ColLib.getLayouts(slug)                → retorna layouts de uma coleção
     ColLib.removeLayout(slug, layoutId)    → remove um layout da memória
     ColLib.updateLayout(slug, id, fields)  → atualiza campos de um layout em memória

   ESTRUTURA DE UMA COLEÇÃO:
     {
       slug:    {string}  — identificador único = nome do arquivo (ex: 'projetos-2025')
       name:    {string}  — nome de exibição
       tags:    {Array}   — tags de busca
       author:  {string}  — nome do autor (opcional)
       color:   {string}  — cor hex do autor (opcional, ex: '#7F77DD')
     }

   ESTRUTURA DE UM LAYOUT DENTRO DE UMA COLEÇÃO:
     {
       id:   {string}
       name: {string}
       tags: {Array}
       html: {string}
       css:  {string}
     }

   ORDEM DE CARREGAMENTO no index.html:
     Deve ser o primeiro script das coleções, antes de col-script.js,
     col-modals.js e dos arquivos de dados em colecoes/data/*.js
═══════════════════════════════════════════════════════════════════════ */

var ColLib = (function () {

  /* ── Registro interno ───────────────────────────────
     _collections: array de objetos de coleção
     _layouts: mapa slug → array de layouts
  ─────────────────────────────────────────────────── */
  var _collections = [];
  var _layouts     = {};

  /* ── Utilitário interno: normaliza slug ─────────── */
  function _key(slug) {
    return (slug || '').toLowerCase().trim();
  }

  return {

    /* ─── Coleções ──────────────────────────────────── */

    /*
     * registerCollection(obj)
     * Registra uma coleção. Se já existir coleção com o mesmo slug,
     * a nova substitui a anterior (evita duplicatas ao recarregar).
     */
    registerCollection: function (obj) {
      if (!obj || !obj.slug) {
        console.warn('[ColLib] registerCollection: obj.slug obrigatório');
        return;
      }
      var key = _key(obj.slug);
      /* Remove entrada anterior com mesmo slug, se existir */
      _collections = _collections.filter(function (c) {
        return _key(c.slug) !== key;
      });
      _collections.push({
        slug:   key,
        name:   obj.name   || obj.slug,
        tags:   obj.tags   || [],
        author: obj.author || '',
        color:  obj.color  || '',
      });
    },

    /*
     * getCollections()
     * Retorna todas as coleções registradas (cópia shallow do array).
     */
    getCollections: function () {
      return _collections.slice();
    },

    /*
     * getCollection(slug)
     * Retorna uma coleção pelo slug, ou null se não encontrada.
     */
    getCollection: function (slug) {
      var key = _key(slug);
      for (var i = 0; i < _collections.length; i++) {
        if (_key(_collections[i].slug) === key) return _collections[i];
      }
      return null;
    },

    /*
     * removeCollection(slug)
     * Remove uma coleção e todos os seus layouts da memória.
     */
    removeCollection: function (slug) {
      var key = _key(slug);
      _collections = _collections.filter(function (c) {
        return _key(c.slug) !== key;
      });
      delete _layouts[key];
    },

    /*
     * updateCollection(slug, fields)
     * Atualiza campos de uma coleção existente.
     * Não substitui campos ausentes em fields.
     */
    updateCollection: function (slug, fields) {
      var key = _key(slug);
      for (var i = 0; i < _collections.length; i++) {
        if (_key(_collections[i].slug) === key) {
          var c = _collections[i];
          if (fields.name   !== undefined) c.name   = fields.name;
          if (fields.tags   !== undefined) c.tags   = fields.tags;
          if (fields.author !== undefined) c.author = fields.author;
          if (fields.color  !== undefined) c.color  = fields.color;
          return;
        }
      }
    },


    /* ─── Layouts dentro de coleções ────────────────── */

    /*
     * registerLayout(slug, arr)
     * Registra um array de layouts dentro de uma coleção.
     * Layouts com ID duplicado dentro da mesma coleção são ignorados
     * (o primeiro registrado prevalece — comportamento seguro para reload).
     */
    registerLayout: function (slug, arr) {
      var key = _key(slug);
      if (!_layouts[key]) _layouts[key] = [];
      var existing = _layouts[key];

      arr.forEach(function (layout) {
        if (!layout || !layout.id) {
          console.warn('[ColLib] registerLayout: layout.id obrigatório');
          return;
        }
        var idLower = layout.id.toLowerCase();
        /* Ignora duplicata */
        var isDup = existing.some(function (l) {
          return l.id.toLowerCase() === idLower;
        });
        if (!isDup) {
          existing.push({
            id:   layout.id,
            name: layout.name || layout.id,
            tags: layout.tags || [],
            html: layout.html || '',
            css:  layout.css  || '',
          });
        }
      });
    },

    /*
     * getLayouts(slug)
     * Retorna os layouts de uma coleção (array vazio se não houver).
     */
    getLayouts: function (slug) {
      return (_layouts[_key(slug)] || []).slice();
    },

    /*
     * removeLayout(slug, layoutId)
     * Remove um layout específico de uma coleção da memória.
     */
    removeLayout: function (slug, layoutId) {
      var key     = _key(slug);
      var idLower = (layoutId || '').toLowerCase();
      if (!_layouts[key]) return;
      _layouts[key] = _layouts[key].filter(function (l) {
        return l.id.toLowerCase() !== idLower;
      });
    },

    /*
     * updateLayout(slug, layoutId, fields)
     * Atualiza campos de um layout existente dentro de uma coleção.
     */
    updateLayout: function (slug, layoutId, fields) {
      var key     = _key(slug);
      var idLower = (layoutId || '').toLowerCase();
      var arr     = _layouts[key];
      if (!arr) return;
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].id.toLowerCase() === idLower) {
          var l = arr[i];
          if (fields.name !== undefined) l.name = fields.name;
          if (fields.tags !== undefined) l.tags = fields.tags;
          if (fields.html !== undefined) l.html = fields.html;
          if (fields.css  !== undefined) l.css  = fields.css;
          return;
        }
      }
    },

  };

})();
