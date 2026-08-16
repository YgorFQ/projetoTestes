(function () {
  /*
   * Adaptador Firebase exclusivo da Biblioteca. A feature usa este contrato
   * sem conhecer SDK, Auth ou caminhos globais do projeto.
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

  function watchVariantsForLayouts(layoutIds, callback, onError) {
    var ids = Array.from(new Set((layoutIds || []).filter(Boolean))).sort();
    var variantsByLayout = {};
    var pendingLayouts = ids.length;
    var unsubscribers = [];
    var stopped = false;

    function publishWhenReady() {
      if (stopped || pendingLayouts > 0) return;

      var variants = [];
      ids.forEach(function (layoutId) {
        variants = variants.concat(variantsByLayout[layoutId] || []);
      });
      variants.sort(function (left, right) {
        return String(left.name || '').localeCompare(String(right.name || ''), 'pt-BR', {
          numeric: true,
          sensitivity: 'base'
        });
      });
      callback(variants, []);
    }

    if (!ids.length) {
      callback([], []);
      return function () {};
    }

    ids.forEach(function (layoutId) {
      var receivedInitialSnapshot = false;
      variantsByLayout[layoutId] = [];

      unsubscribers.push(window.SenkoFirebase.listenCollection(
        workspacePath('bibliotecaLayouts/' + layoutId + '/variants'),
        { orderBy: [['nameKey', 'asc']] },
        function (documents) {
          variantsByLayout[layoutId] = documents.filter(function (item) {
            return !item.deleting && item.kind === 'libraryVariant';
          }).map(function (item) {
            return Object.assign(mapContent(item), {
              layoutId: layoutId
            });
          });

          if (!receivedInitialSnapshot) {
            receivedInitialSnapshot = true;
            pendingLayouts -= 1;
          }
          publishWhenReady();
        },
        function (error) {
          if (!receivedInitialSnapshot) {
            receivedInitialSnapshot = true;
            pendingLayouts -= 1;
          }
          if (onError) onError(error);
          publishWhenReady();
        }
      ));
    });

    return function () {
      stopped = true;
      unsubscribers.forEach(function (unsubscribe) {
        if (typeof unsubscribe === 'function') unsubscribe();
      });
    };
  }

  function saveLayout(layout) {
    return window.SenkoFirestoreWrites.saveVersionedContent({
      workspaceId: window.SenkoFirebase.getWorkspaceId(),
      kind: 'libraryLayout',
      resourceId: layout.id || null,
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
    return window.SenkoFirestoreWrites.saveVersionedContent({
      workspaceId: window.SenkoFirebase.getWorkspaceId(),
      kind: 'libraryVariant',
      parentId: layoutId,
      resourceId: variant.id || null,
      name: variant.name,
      html: variant.html || '',
      css: variant.css || '',
      baseRevisionId: variant.baseRevisionId === undefined
        ? null
        : variant.baseRevisionId
    });
  }

  function deleteLayout(layout) {
    return window.SenkoFirestoreWrites.deleteContent({
      workspaceId: window.SenkoFirebase.getWorkspaceId(),
      kind: 'libraryLayout',
      resourceId: layout.id,
      expectedRevisionId: layout._firebaseRevisionId || null
    });
  }

  function deleteVariant(layoutId, variant) {
    return window.SenkoFirestoreWrites.deleteContent({
      workspaceId: window.SenkoFirebase.getWorkspaceId(),
      kind: 'libraryVariant',
      parentId: layoutId,
      resourceId: variant.id,
      expectedRevisionId: variant._firebaseRevisionId || null
    });
  }

  function enterEditor(layoutId, callback, variantId) {
    return window.SenkoFirebase.enterPresence(
      variantId ? 'biblioteca-variant' : 'biblioteca-layout',
      variantId ? layoutId + ':' + variantId : layoutId,
      callback
    );
  }

  window.SenkoBibliotecaFirebase = {
    isActive: firebaseReady,
    watchLayouts: watchLayouts,
    watchVariantsForLayouts: watchVariantsForLayouts,
    saveLayout: saveLayout,
    saveVariant: saveVariant,
    deleteLayout: deleteLayout,
    deleteVariant: deleteVariant,
    enterEditor: enterEditor
  };
})();
