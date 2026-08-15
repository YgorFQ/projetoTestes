(function () {
  /*
   * Adaptador Firebase exclusivo de Colecoes. O shell e outras features nao
   * dependem deste arquivo.
   */
  function firebaseReady() {
    return Boolean(window.SenkoFirebase && window.SenkoFirebase.isReady());
  }

  function workspacePath(relativePath) {
    return window.SenkoFirebase.getWorkspacePath(relativePath);
  }

  function watchCollections(callback, onError) {
    return window.SenkoFirebase.listenCollection(
      workspacePath('collections'),
      { orderBy: [['nameKey', 'asc']] },
      function (documents, changes) {
        callback(documents.filter(function (item) {
          return !item.deleting;
        }).map(function (item) {
          return {
            slug: item.id,
            name: item.name || '',
            group: item.groupId || '',
            tags: Array.isArray(item.tags) ? item.tags : [],
            layouts: [],
            _firebaseVersion: Number(item.version || 0),
            _firebaseUpdatedBy: item.updatedByName || ''
          };
        }), changes);
      },
      onError
    );
  }

  function watchGroups(callback, onError) {
    return window.SenkoFirebase.listenCollection(
      workspacePath('groups'),
      {},
      function (documents, changes) {
        var groups = documents.map(function (item) {
          return {
            slug: item.id,
            name: item.name || '',
            cor: item.color || '#aaaaaa',
            _firebaseVersion: Number(item.version || 0)
          };
        }).sort(function (a, b) {
          return a.name.localeCompare(b.name, 'pt-BR', { sensitivity: 'base' });
        });
        callback(groups, changes);
      },
      onError
    );
  }

  function watchLayoutsForCollections(collectionIds, callback, onError) {
    var ids = Array.from(new Set((collectionIds || []).filter(Boolean))).sort();
    var layoutsByCollection = {};
    var pendingCollections = ids.length;
    var unsubscribers = [];
    var stopped = false;

    function publishWhenReady() {
      if (stopped || pendingCollections > 0) return;

      var layouts = [];
      ids.forEach(function (collectionId) {
        layouts = layouts.concat(layoutsByCollection[collectionId] || []);
      });
      callback(layouts, []);
    }

    if (!ids.length) {
      callback([], []);
      return function () {};
    }

    ids.forEach(function (collectionId) {
      var receivedInitialSnapshot = false;
      layoutsByCollection[collectionId] = [];

      unsubscribers.push(window.SenkoFirebase.listenCollection(
        workspacePath('collections/' + collectionId + '/layouts'),
        { orderBy: [['nameKey', 'asc']] },
        function (documents) {
          layoutsByCollection[collectionId] = documents.filter(function (item) {
            return !item.deleting && item.kind === 'collectionLayout';
          }).map(function (item) {
            return {
              id: item.id,
              collectionId: collectionId,
              name: item.name || '',
              html: item.html || '',
              css: item.css || '',
              _firebaseRevisionId: item.currentRevisionId || null,
              _firebaseVersion: Number(item.version || 0),
              _firebaseUpdatedBy: item.updatedByName || ''
            };
          });

          if (!receivedInitialSnapshot) {
            receivedInitialSnapshot = true;
            pendingCollections -= 1;
          }
          publishWhenReady();
        },
        function (error) {
          if (!receivedInitialSnapshot) {
            receivedInitialSnapshot = true;
            pendingCollections -= 1;
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

  function saveCollection(collection) {
    return window.SenkoFirestoreWrites.saveCollection({
      workspaceId: window.SenkoFirebase.getWorkspaceId(),
      collectionId: collection.slug || null,
      legacyId: collection.legacyId || collection.slug || null,
      name: collection.name,
      groupId: collection.group || null,
      tags: collection.tags || [],
      expectedVersion: collection.expectedVersion === undefined
        ? null
        : collection.expectedVersion
    });
  }

  function saveGroup(group) {
    return window.SenkoFirestoreWrites.saveGroup({
      workspaceId: window.SenkoFirebase.getWorkspaceId(),
      groupId: group.slug,
      name: group.name,
      color: group.cor,
      expectedVersion: group.expectedVersion === undefined
        ? null
        : group.expectedVersion
    });
  }

  function deleteGroup(group) {
    return window.SenkoFirestoreWrites.deleteGroup({
      workspaceId: window.SenkoFirebase.getWorkspaceId(),
      groupId: group.slug,
      expectedVersion: Number(group._firebaseVersion || 0)
    });
  }

  function saveLayout(collectionId, layout) {
    return window.SenkoFirestoreWrites.saveVersionedContent({
      workspaceId: window.SenkoFirebase.getWorkspaceId(),
      kind: 'collectionLayout',
      parentId: collectionId,
      resourceId: layout.id || null,
      legacyId: layout.legacyId || layout.id || null,
      name: layout.name,
      html: layout.html || '',
      css: layout.css || '',
      baseRevisionId: layout.baseRevisionId === undefined
        ? null
        : layout.baseRevisionId
    });
  }

  function deleteCollection(collection) {
    return window.SenkoFirestoreWrites.deleteContent({
      workspaceId: window.SenkoFirebase.getWorkspaceId(),
      kind: 'collection',
      resourceId: collection.slug,
      expectedVersion: Number(collection._firebaseVersion || 0)
    });
  }

  function deleteLayout(collectionId, layout) {
    return window.SenkoFirestoreWrites.deleteContent({
      workspaceId: window.SenkoFirebase.getWorkspaceId(),
      kind: 'collectionLayout',
      parentId: collectionId,
      resourceId: layout.id,
      expectedRevisionId: layout._firebaseRevisionId || null
    });
  }

  function enterEditor(collectionId, layoutId, callback) {
    return window.SenkoFirebase.enterPresence(
      'collection-layout',
      collectionId + ':' + layoutId,
      callback
    );
  }

  window.SenkoColecoesFirebase = {
    isActive: firebaseReady,
    watchCollections: watchCollections,
    watchGroups: watchGroups,
    watchLayoutsForCollections: watchLayoutsForCollections,
    saveCollection: saveCollection,
    saveGroup: saveGroup,
    deleteGroup: deleteGroup,
    saveLayout: saveLayout,
    deleteCollection: deleteCollection,
    deleteLayout: deleteLayout,
    enterEditor: enterEditor
  };
})();
