// @ts-nocheck
/* ═══════════════════════════════════════════════════════════════════════
   col-core.js — Motor central de registro do sistema de Coleções

   RESPONSABILIDADE:
     Mantém o registro global de coleções em memória.
     Não conhece DOM, GitHub, nem nenhum outro módulo.

   EXPÕE (via objeto global ColLib):
     ColLib.register(obj)                          → registra uma coleção
     ColLib.getAll()                               → todas as coleções
     ColLib.getBySlug(slug)                        → busca por slug
     ColLib.updateCollection(slug, patch)          → atualiza metadados em memória
     ColLib.removeCollection(slug)                 → remove da memória
     ColLib.addLayout(slug, layout)                → adiciona layout à coleção
     ColLib.updateLayout(slug, layoutId, patch)    → atualiza layout em memória
     ColLib.removeLayout(slug, layoutId)           → remove layout da coleção

   FORMATO DE UMA COLEÇÃO:
     {
       slug:    'kit-lancamento-2026',   ← identificador único, imutável
       name:    'Kit Lançamento 2026',   ← nome de exibição
       group:   'projetos-2026',         ← slug do grupo (ColGroups)
       tags:    ['hero', 'cta'],         ← palavras-chave para busca
       layouts: [                        ← layouts HTML/CSS dentro da coleção
         { id: 'hero', name: 'Hero', html: `...`, css: `...` },
       ]
     }

   ORDEM DE CARREGAMENTO:
     Deve ser carregado antes de col-script.js, col-modals.js
     e de qualquer arquivo colecoes/data/[slug].js.
     Deve ser carregado APÓS col-groups.js.
═══════════════════════════════════════════════════════════════════════ */

var ColLib = (function () {

  /* ── Registro interno ── */
  var _collections = [];   /* array de objetos de coleção */

  /* ── Helpers ── */
  function _findIndex(slug) {
    var s = (slug || '').toLowerCase();
    for (var i = 0; i < _collections.length; i++) {
      if (_collections[i].slug === s) return i;
    }
    return -1;
  }

  return {

    /* ─────────────────────────────────────────────────────────────────
       register(obj)
       Chamado por cada arquivo colecoes/data/[slug].js ao carregar.
       Se o slug já existir (ex: hot-reload), substitui sem duplicar.
    ───────────────────────────────────────────────────────────────── */
    register: function (obj) {
      if (!obj || !obj.slug) {
        console.warn('[ColLib] register: objeto sem slug ignorado', obj);
        return;
      }
      var slug = obj.slug.toLowerCase();
      obj.slug = slug;

      /* Garante que layouts seja sempre array */
      if (!Array.isArray(obj.layouts)) obj.layouts = [];

      var idx = _findIndex(slug);
      if (idx !== -1) {
        _collections[idx] = obj;  /* substitui — evita duplicata */
      } else {
        _collections.push(obj);
      }
    },

    /* ─────────────────────────────────────────────────────────────────
       getAll()
       Retorna cópia superficial do array para leitura.
       Não expõe a referência interna diretamente.
    ───────────────────────────────────────────────────────────────── */
    getAll: function () {
      return _collections.slice();
    },

    /* ─────────────────────────────────────────────────────────────────
       getBySlug(slug)
       Retorna a referência ao objeto (para leitura rápida nos modais).
    ───────────────────────────────────────────────────────────────── */
    getBySlug: function (slug) {
      var idx = _findIndex(slug);
      return idx !== -1 ? _collections[idx] : null;
    },

    /* ─────────────────────────────────────────────────────────────────
       updateCollection(slug, patch)
       Atualiza metadados (name, group, tags) em memória após save no GitHub.
       Não toca em layouts.
    ───────────────────────────────────────────────────────────────── */
    updateCollection: function (slug, patch) {
      var idx = _findIndex(slug);
      if (idx === -1) return;
      var col = _collections[idx];
      if (patch.name  !== undefined) col.name  = patch.name;
      if (patch.group !== undefined) col.group = patch.group;
      if (patch.tags  !== undefined) col.tags  = patch.tags;
    },

    /* ─────────────────────────────────────────────────────────────────
       removeCollection(slug)
       Remove da memória após exclusão no GitHub.
    ───────────────────────────────────────────────────────────────── */
    removeCollection: function (slug) {
      var idx = _findIndex(slug);
      if (idx !== -1) _collections.splice(idx, 1);
    },

    /* ─────────────────────────────────────────────────────────────────
       addLayout(slug, layout)
       Adiciona layout à coleção em memória após save no GitHub.
       layout deve ter: { id, name, html, css }
    ───────────────────────────────────────────────────────────────── */
    addLayout: function (slug, layout) {
      var idx = _findIndex(slug);
      if (idx === -1) return;
      var col = _collections[idx];
      if (!Array.isArray(col.layouts)) col.layouts = [];
      /* Evita duplicata por id */
      for (var i = 0; i < col.layouts.length; i++) {
        if (col.layouts[i].id === layout.id) {
          col.layouts[i] = layout;
          return;
        }
      }
      col.layouts.push(layout);
    },

    /* ─────────────────────────────────────────────────────────────────
       updateLayout(slug, layoutId, patch)
       Atualiza name/html/css de um layout em memória.
    ───────────────────────────────────────────────────────────────── */
    updateLayout: function (slug, layoutId, patch) {
      var idx = _findIndex(slug);
      if (idx === -1) return;
      var layouts = _collections[idx].layouts || [];
      for (var i = 0; i < layouts.length; i++) {
        if (layouts[i].id === layoutId) {
          if (patch.name !== undefined) layouts[i].name = patch.name;
          if (patch.html !== undefined) layouts[i].html = patch.html;
          if (patch.css  !== undefined) layouts[i].css  = patch.css;
          return;
        }
      }
    },

    /* ─────────────────────────────────────────────────────────────────
       removeLayout(slug, layoutId)
       Remove um layout da coleção em memória.
    ───────────────────────────────────────────────────────────────── */
    removeLayout: function (slug, layoutId) {
      var idx = _findIndex(slug);
      if (idx === -1) return;
      var layouts = _collections[idx].layouts || [];
      for (var i = 0; i < layouts.length; i++) {
        if (layouts[i].id === layoutId) {
          layouts.splice(i, 1);
          return;
        }
      }
    },

  };

})();
