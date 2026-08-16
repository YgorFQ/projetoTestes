(function () {
  /*
   * Adaptador somente leitura do snapshot publico para a Biblioteca.
   * Clones impedem que filtros, editores ou previews alterem o objeto global
   * que tambem pode ser consumido por outras montagens da feature.
   */
  function source() {
    return (window.SenkoStaticBackup || {}).biblioteca || null;
  }

  function cloneLayout(item) {
    return {
      id: item.id,
      name: item.name || '',
      tags: Array.isArray(item.tags) ? item.tags.slice() : [],
      html: item.html || '',
      css: item.css || '',
      _firebaseRevisionId: item.revisionId || null,
      _firebaseVersion: Number(item.version || 0),
      _senkoStatic: true
    };
  }

  function getLayouts() {
    var data = source();
    return data ? data.layouts.map(cloneLayout) : [];
  }

  function getVariants() {
    var data = source();
    return data ? data.variants.map(function (item) {
      return Object.assign(cloneLayout(item), { layoutId: item.layoutId });
    }) : [];
  }

  window.SenkoBibliotecaStatic = {
    isAvailable: function () {
      var data = source();
      return Boolean(data && Array.isArray(data.layouts) && Array.isArray(data.variants));
    },
    getLayouts: getLayouts,
    getVariants: getVariants
  };
})();
