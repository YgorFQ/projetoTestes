(function () {
  /*
   * Adaptador somente leitura do snapshot publico para Colecoes.
   * Converte o bundle gerado para o mesmo formato entregue pelo repository
   * Firebase; por isso controllers nao precisam de ramificacoes por fonte.
   */
  function source() {
    return (window.SenkoStaticBackup || {}).colecoes || null;
  }

  function cloneLayout(item) {
    return {
      id: item.id,
      collectionId: item.collectionId,
      name: item.name || '',
      html: item.html || '',
      css: item.css || '',
      _firebaseRevisionId: item.revisionId || null,
      _firebaseVersion: Number(item.version || 0),
      _senkoStatic: true
    };
  }

  function getCollections() {
    var data = source();
    if (!data) return [];
    var layoutsByCollection = {};
    data.layouts.forEach(function (item) {
      var key = String(item.collectionId || '').toLowerCase();
      if (!layoutsByCollection[key]) layoutsByCollection[key] = [];
      layoutsByCollection[key].push(cloneLayout(item));
    });

    return data.collections.map(function (item) {
      var key = String(item.slug || '').toLowerCase();
      var layouts = layoutsByCollection[key] || [];
      return {
        slug: item.slug,
        name: item.name || '',
        group: item.group || '',
        tags: Array.isArray(item.tags) ? item.tags.slice() : [],
        layouts: layouts,
        layoutCount: layouts.length,
        _firebaseVersion: Number(item.version || 0),
        _senkoLazy: false,
        _senkoStatic: true
      };
    });
  }

  function getGroups() {
    var data = source();
    return data ? data.groups.map(function (item) {
      return {
        slug: item.slug,
        name: item.name || '',
        cor: item.cor || '#aaaaaa',
        _firebaseVersion: Number(item.version || 0),
        _senkoStatic: true
      };
    }) : [];
  }

  window.SenkoColecoesStatic = {
    isAvailable: function () {
      var data = source();
      return Boolean(
        data && Array.isArray(data.collections) &&
        Array.isArray(data.layouts) && Array.isArray(data.groups)
      );
    },
    getCollections: getCollections,
    getGroups: getGroups
  };
})();
