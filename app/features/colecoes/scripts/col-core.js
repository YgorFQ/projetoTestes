// @ts-nocheck
/* ═══════════════════════════════════════════════════════════════════════
   col-core.js — Motor central de registro do sistema de Coleções

   RESPONSABILIDADE:
     Mantém o registro global de coleções em memória.
     Não conhece DOM, GitHub, nem nenhum outro módulo.

   EXPÕE (via objeto global ColLib):
     ColLib.register(obj)                          → registra uma coleção
     ColLib.registerCollection(obj)                → registra uma coleção individual
     ColLib.getAll()                               → todas as coleções
     ColLib.getBySlug(slug)                        → busca por slug
     ColLib.hasCollectionName(name, exceptSlug)    → consulta unicidade
     ColLib.hasLayoutName(slug, name, exceptId)    → consulta unicidade
     ColLib.updateCollection(slug, patch)          → atualiza metadados em memória
     ColLib.removeCollection(slug)                 → remove da memória
     ColLib.addLayout(slug, layout)                → adiciona layout à coleção
     ColLib.registerCollectionLayout(slug, layout) → registra layout individual
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
     e de qualquer arquivo app/features/colecoes/data/[slug].js.
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

  /*
   * A comparacao ignora diferencas apenas visuais. Assim nomes que mudam
   * somente em caixa, acentos, pontuacao ou espacos continuam sendo iguais.
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

  function _hasCollectionName(name, exceptSlug) {
    var key = _normalizeName(name);
    if (!key) return false;

    return _collections.some(function (collection) {
      return collection.slug !== exceptSlug && _normalizeName(collection.name) === key;
    });
  }

  function _hasLayoutName(slug, name, exceptLayoutId) {
    var idx = _findIndex(slug);
    var key = _normalizeName(name);
    if (idx === -1 || !key) return false;

    return (_collections[idx].layouts || []).some(function (layout) {
      return layout.id !== exceptLayoutId && _normalizeName(layout.name) === key;
    });
  }

  function _hasDuplicateLayoutNames(layouts) {
    var names = {};
    for (var i = 0; i < layouts.length; i++) {
      var key = _normalizeName(layouts[i] && layouts[i].name);
      if (!key) continue;
      if (names[key]) return true;
      names[key] = true;
    }
    return false;
  }

  function _registerCollection(obj) {
    if (!obj || !obj.slug) {
      console.warn('[ColLib] register: objeto sem slug ignorado', obj);
      return false;
    }
    var slug = obj.slug.toLowerCase();
    obj.slug = slug;

    /* Garante que layouts seja sempre array */
    if (!Array.isArray(obj.layouts)) obj.layouts = [];

    var idx = _findIndex(slug);
    if (_hasCollectionName(obj.name, slug)) {
      console.error('[ColLib] Nome de colecao duplicado foi recusado: ' + obj.name);
      return false;
    }
    if (_hasDuplicateLayoutNames(obj.layouts)) {
      console.error('[ColLib] Colecao recusada porque contem layouts com nomes duplicados: ' + slug);
      return false;
    }
    if (idx !== -1) {
      _collections[idx] = obj;  /* substitui - evita duplicata */
    } else {
      _collections.push(obj);
    }
    return true;
  }

  function _registerCollectionLayout(slug, layout) {
    var idx = _findIndex(slug);
    if (idx === -1) return false;
    if (!layout || !layout.id || !layout.name) {
      console.error('[ColLib] Layout sem id ou nome foi ignorado.', layout);
      return false;
    }

    var col = _collections[idx];
    if (!Array.isArray(col.layouts)) col.layouts = [];

    var layoutIndex = -1;
    for (var i = 0; i < col.layouts.length; i++) {
      if (col.layouts[i].id === layout.id) {
        layoutIndex = i;
        break;
      }
    }

    if (_hasLayoutName(slug, layout.name, layout.id)) {
      console.error('[ColLib] Nome de layout duplicado foi recusado em "' + slug + '": ' + layout.name);
      return false;
    }

    if (layoutIndex !== -1) col.layouts[layoutIndex] = layout;
    else col.layouts.push(layout);

    return true;
  }

  return {

    /* ─────────────────────────────────────────────────────────────────
       register(obj)
       Chamado por cada arquivo app/features/colecoes/data/[slug].js ao carregar.
       Se o slug já existir (ex: hot-reload), substitui sem duplicar.
    ───────────────────────────────────────────────────────────────── */
    register: function (obj) {
      return _registerCollection(obj);
    },

    registerCollection: function (obj) {
      return _registerCollection(obj);
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

    normalizeName: _normalizeName,

    hasCollectionName: _hasCollectionName,

    hasLayoutName: _hasLayoutName,

    /* ─────────────────────────────────────────────────────────────────
       updateCollection(slug, patch)
       Atualiza metadados (name, group, tags) em memória após save no GitHub.
       Não toca em layouts.
    ───────────────────────────────────────────────────────────────── */
    updateCollection: function (slug, patch) {
      var idx = _findIndex(slug);
      if (idx === -1) return false;
      var col = _collections[idx];
      if (patch.name !== undefined && _hasCollectionName(patch.name, col.slug)) {
        console.error('[ColLib] Edicao recusada por nome de colecao duplicado: ' + patch.name);
        return false;
      }
      if (patch.name  !== undefined) col.name  = patch.name;
      if (patch.group !== undefined) col.group = patch.group;
      if (patch.tags  !== undefined) col.tags  = patch.tags;
      return true;
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
      if (idx === -1) return false;
      var col = _collections[idx];
      if (!Array.isArray(col.layouts)) col.layouts = [];
      for (var i = 0; i < col.layouts.length; i++) {
        if (col.layouts[i].id === layout.id) {
          console.error('[ColLib] ID de layout duplicado foi recusado: ' + layout.id);
          return false;
        }
      }
      if (_hasLayoutName(slug, layout.name, null)) {
        console.error('[ColLib] Nome de layout duplicado foi recusado em "' + slug + '": ' + layout.name);
        return false;
      }
      col.layouts.push(layout);
      return true;
    },

    registerCollectionLayout: function (slug, layout) {
      return _registerCollectionLayout(slug, layout);
    },

    /* ─────────────────────────────────────────────────────────────────
       updateLayout(slug, layoutId, patch)
       Atualiza name/html/css de um layout em memória.
    ───────────────────────────────────────────────────────────────── */
    updateLayout: function (slug, layoutId, patch) {
      var idx = _findIndex(slug);
      if (idx === -1) return false;
      var layouts = _collections[idx].layouts || [];
      if (patch.name !== undefined && _hasLayoutName(slug, patch.name, layoutId)) {
        console.error('[ColLib] Edicao recusada por nome de layout duplicado: ' + patch.name);
        return false;
      }
      for (var i = 0; i < layouts.length; i++) {
        if (layouts[i].id === layoutId) {
          if (patch.name !== undefined) layouts[i].name = patch.name;
          if (patch.html !== undefined) layouts[i].html = patch.html;
          if (patch.css  !== undefined) layouts[i].css  = patch.css;
          return true;
        }
      }
      return false;
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
