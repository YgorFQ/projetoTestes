(function () {
  /*
   * Adaptador Firebase exclusivo da Biblioteca. A feature usa este contrato
   * sem conhecer SDK, Auth, Functions ou caminhos globais do projeto.
   */
  function firebaseReady() {
    return Boolean(window.SenkoFirebase && window.SenkoFirebase.isReady());
  }

  function workspacePath(relativePath) {
    return window.SenkoFirebase.getWorkspacePath(relativePath);
  }

  function mapContent(document) {
    return {
      id: document.id,
      name: document.name || '',
      tags: Array.isArray(document.tags) ? document.tags : [],
      html: document.html || '',
      css: document.css || '',
      _firebaseRevisionId: document.currentRevisionId || null,
      _firebaseVersion: Number(document.version || 0),
      _firebaseUpdatedBy: document.updatedByName || ''
    };
  }

  function watchLayouts(callback, onError) {
    return window.SenkoFirebase.listenCollection(
      workspacePath('bibliotecaLayouts'),
      { orderBy: [['nameKey', 'asc']] },
      function (documents, changes) {
        callback(documents.filter(function (item) {
          return !item.deleting;
        }).map(mapContent), changes);
      },
      onError
    );
  }

  function watchVariants(callback, onError) {
    var workspaceId = window.SenkoFirebase.getWorkspaceId();
    return window.SenkoFirebase.listenCollectionGroup(
      'variants',
      {
        where: [['workspaceId', '==', workspaceId]],
        orderBy: [['nameKey', 'asc']]
      },
      function (documents, changes) {
        callback(documents.filter(function (item) {
          return !item.deleting && item.kind === 'libraryVariant';
        }).map(function (item) {
          return Object.assign(mapContent(item), {
            layoutId: item.parentId
          });
        }), changes);
      },
      onError
    );
  }

  function saveLayout(layout) {
    return window.SenkoFirebase.call('saveVersionedContent', {
      workspaceId: window.SenkoFirebase.getWorkspaceId(),
      kind: 'libraryLayout',
      resourceId: layout.id || null,
      legacyId: layout.legacyId || layout.id || null,
      name: layout.name,
      tags: layout.tags || [],
      html: layout.html || '',
      css: layout.css || '',
      baseRevisionId: layout.baseRevisionId === undefined
        ? null
        : layout.baseRevisionId
    });
  }

  function saveVariant(layoutId, variant) {
    return window.SenkoFirebase.call('saveVersionedContent', {
      workspaceId: window.SenkoFirebase.getWorkspaceId(),
      kind: 'libraryVariant',
      parentId: layoutId,
      resourceId: variant.id || null,
      legacyId: variant.legacyId || variant.id || null,
      name: variant.name,
      html: variant.html || '',
      css: variant.css || '',
      baseRevisionId: variant.baseRevisionId === undefined
        ? null
        : variant.baseRevisionId
    });
  }

  function deleteLayout(layout) {
    return window.SenkoFirebase.call('deleteContent', {
      workspaceId: window.SenkoFirebase.getWorkspaceId(),
      kind: 'libraryLayout',
      resourceId: layout.id,
      expectedRevisionId: layout._firebaseRevisionId || null
    });
  }

  function deleteVariant(layoutId, variant) {
    return window.SenkoFirebase.call('deleteContent', {
      workspaceId: window.SenkoFirebase.getWorkspaceId(),
      kind: 'libraryVariant',
      parentId: layoutId,
      resourceId: variant.id,
      expectedRevisionId: variant._firebaseRevisionId || null
    });
  }

  function enterEditor(layoutId, callback) {
    return window.SenkoFirebase.enterPresence(
      'biblioteca-layout',
      layoutId,
      callback
    );
  }

  window.SenkoBibliotecaFirebase = {
    isActive: firebaseReady,
    watchLayouts: watchLayouts,
    watchVariants: watchVariants,
    saveLayout: saveLayout,
    saveVariant: saveVariant,
    deleteLayout: deleteLayout,
    deleteVariant: deleteVariant,
    enterEditor: enterEditor
  };
})();

