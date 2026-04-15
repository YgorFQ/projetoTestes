// @ts-nocheck
/* ═══════════════════════════════════════════════════════════════════════
   col-groups.js — Motor de Grupos das Coleções

   RESPONSABILIDADE:
     Mantém em memória a lista de grupos globais.
     Grupos são compartilhados por todas as coleções.
     Cada grupo tem: slug, name, color.

   EXPÕE (via objeto global ColGroups):
     ColGroups.register(arr)         → registra array de grupos
     ColGroups.getAll()              → retorna todos os grupos
     ColGroups.getBySlug(slug)       → retorna um grupo pelo slug
     ColGroups.add(obj)              → adiciona grupo em memória
     ColGroups.remove(slug)          → remove grupo da memória

   ESTRUTURA DE UM GRUPO:
     { slug: 'efacil', name: 'eFácil', color: '#7F77DD' }

   ARQUIVO NO REPOSITÓRIO:
     colecoes/col-groups.js
     Formato:
       ColGroups.register([
         { slug: 'efacil', name: 'eFácil', color: '#7F77DD' },
       ]);

   ORDEM DE CARREGAMENTO no index.html:
     Antes de col-core.js, col-script.js e col-modals.js.
═══════════════════════════════════════════════════════════════════════ */

var ColGroups = (function () {

  var _groups = [];

  function _key(slug) {
    return (slug || '').toLowerCase().trim();
  }

  return {

    /*
     * register(arr)
     * Registra array de grupos. Duplicatas por slug são ignoradas
     * (primeiro registrado prevalece — seguro para reload).
     */
    register: function (arr) {
      arr.forEach(function (g) {
        if (!g || !g.slug) return;
        var key = _key(g.slug);
        var exists = _groups.some(function (x) { return _key(x.slug) === key; });
        if (!exists) {
          _groups.push({
            slug:  key,
            name:  g.name  || g.slug,
            color: g.color || '#888888',
          });
        }
      });
    },

    /*
     * getAll()
     * Retorna cópia do array de grupos.
     */
    getAll: function () {
      return _groups.slice();
    },

    /*
     * getBySlug(slug)
     * Retorna grupo pelo slug ou null.
     */
    getBySlug: function (slug) {
      var key = _key(slug);
      for (var i = 0; i < _groups.length; i++) {
        if (_key(_groups[i].slug) === key) return _groups[i];
      }
      return null;
    },

    /*
     * add(obj)
     * Adiciona um grupo em memória (usado após save no GitHub).
     * Se já existir com o mesmo slug, substitui.
     */
    add: function (obj) {
      if (!obj || !obj.slug) return;
      var key = _key(obj.slug);
      _groups = _groups.filter(function (g) { return _key(g.slug) !== key; });
      _groups.push({ slug: key, name: obj.name || obj.slug, color: obj.color || '#888888' });
    },

    /*
     * remove(slug)
     * Remove grupo da memória.
     */
    remove: function (slug) {
      var key = _key(slug);
      _groups = _groups.filter(function (g) { return _key(g.slug) !== key; });
    },

  };

})();
