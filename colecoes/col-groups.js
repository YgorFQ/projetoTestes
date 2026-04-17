// @ts-nocheck
/* ═══════════════════════════════════════════════════════════════════════
   col-groups.js — Motor de grupos de coleções

   RESPONSABILIDADE:
     Mantém o registro de grupos em memória e gerencia grupos pendentes
     (criados na UI mas ainda não commitados no GitHub).
     Não conhece DOM nem GitHub.

   EXPÕE (via objeto global ColGroups):
     ColGroups.load(arr)          → popula grupos (chamado por col-groups-data.js)
     ColGroups.getAll()           → todos os grupos registrados
     ColGroups.getBySlug(slug)    → busca grupo por slug
     ColGroups.addPending(grupo)  → adiciona grupo pendente (aguardando commit)
     ColGroups.getPending()       → retorna grupos pendentes para flush
     ColGroups.clearPending()     → limpa pendentes após flush com sucesso
     ColGroups.slugify(name)      → gera slug a partir de um nome

   FORMATO DE UM GRUPO:
     { slug: 'projetos-2026', name: 'Projetos 2026', cor: '#6366f1' }

   IMPORTANTE — separação motor/dados:
     Este arquivo define apenas o objeto ColGroups.
     Os dados reais ficam em col-groups-data.js, que chama ColGroups.load().
     O módulo GitHub nunca reescreve este arquivo — só reescreve col-groups-data.js.

   ORDEM DE CARREGAMENTO:
     1. col-groups.js       ← este arquivo (motor)
     2. col-groups-data.js  ← dados (chama ColGroups.load)
     3. col-core.js         ← motor de coleções
     4. demais arquivos
═══════════════════════════════════════════════════════════════════════ */

var ColGroups = (function () {

  var _groups   = [];   /* grupos confirmados (vindos do GitHub) */
  var _pending  = [];   /* grupos criados na UI, aguardando commit */

  /* ── Helpers ── */
  function _findIndex(slug) {
    var s = (slug || '').toLowerCase();
    for (var i = 0; i < _groups.length; i++) {
      if (_groups[i].slug === s) return i;
    }
    return -1;
  }

  return {

    /* ─────────────────────────────────────────────────────────────────
       load(arr)
       Chamado por col-groups-data.js ao carregar.
       Substitui completamente a lista (não acumula entre reloads).
    ───────────────────────────────────────────────────────────────── */
    load: function (arr) {
      if (!Array.isArray(arr)) return;
      _groups = arr.map(function (g) {
        return {
          slug: (g.slug || '').toLowerCase(),
          name: g.name || g.slug || '',
          cor:  g.cor  || '#aaaaaa',
        };
      });
    },

    /* ─────────────────────────────────────────────────────────────────
       getAll()
       Retorna grupos confirmados + pendentes juntos (para o dropdown).
    ───────────────────────────────────────────────────────────────── */
    getAll: function () {
      return _groups.concat(_pending);
    },

    /* ─────────────────────────────────────────────────────────────────
       getBySlug(slug)
    ───────────────────────────────────────────────────────────────── */
    getBySlug: function (slug) {
      var s = (slug || '').toLowerCase();
      /* Procura primeiro nos confirmados, depois nos pendentes */
      for (var i = 0; i < _groups.length; i++) {
        if (_groups[i].slug === s) return _groups[i];
      }
      for (var j = 0; j < _pending.length; j++) {
        if (_pending[j].slug === s) return _pending[j];
      }
      return null;
    },

    /* ─────────────────────────────────────────────────────────────────
       addPending(grupo)
       Adiciona grupo criado na UI que ainda não foi ao GitHub.
       Se o slug já existe (confirmado ou pendente), ignora.
    ───────────────────────────────────────────────────────────────── */
    addPending: function (grupo) {
      if (!grupo || !grupo.slug) return;
      var slug = grupo.slug.toLowerCase();
      if (this.getBySlug(slug)) return; /* já existe — não duplica */
      _pending.push({
        slug: slug,
        name: grupo.name || slug,
        cor:  grupo.cor  || '#aaaaaa',
      });
    },

    /* ─────────────────────────────────────────────────────────────────
       getPending()
       Retorna grupos que precisam ser commitados no próximo flush.
    ───────────────────────────────────────────────────────────────── */
    getPending: function () {
      return _pending.slice();
    },

    /* ─────────────────────────────────────────────────────────────────
       clearPending()
       Chamado após flush bem-sucedido. Move pendentes para confirmados.
    ───────────────────────────────────────────────────────────────── */
    clearPending: function () {
      _groups = _groups.concat(_pending);
      _pending = [];
    },

    /* ─────────────────────────────────────────────────────────────────
       slugify(name)
       Gera slug a partir de nome: lowercase, espaços → hífen,
       remove caracteres especiais, colapsa hífens múltiplos.
    ───────────────────────────────────────────────────────────────── */
    slugify: function (name) {
      return (name || '')
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')  /* remove acentos */
        .replace(/[^a-z0-9\s-]/g, '')     /* remove especiais */
        .trim()
        .replace(/\s+/g, '-')             /* espaço → hífen */
        .replace(/-+/g, '-');             /* colapsa hífens duplos */
    },

  };

})();
