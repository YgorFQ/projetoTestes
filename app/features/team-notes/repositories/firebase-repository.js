(function () {
  function workspacePath(relativePath) {
    return window.SenkoFirebase.getWorkspacePath(relativePath);
  }

  function toIso(value) {
    if (!value) return null;
    if (typeof value.toDate === 'function') return value.toDate().toISOString();
    return String(value);
  }

  function mapSection(document) {
    return {
      id: document.id,
      name: document.name || '',
      order: Number(document.order || 0),
      version: Number(document.version || 0),
      createdAt: toIso(document.createdAt),
      updatedAt: toIso(document.updatedAt)
    };
  }

  function mapPage(document, sectionId) {
    return {
      id: document.id,
      sectionId: sectionId,
      title: document.name || '',
      content: document.content || '',
      version: Number(document.version || 0),
      createdAt: toIso(document.createdAt),
      updatedAt: toIso(document.updatedAt)
    };
  }

  function watchSections(callback, onError) {
    return window.SenkoFirebase.listenCollection(
      workspacePath('teamNoteSections'),
      { orderBy: [['order', 'asc']], errorScope: 'feature' },
      function (documents) {
        callback(documents.filter(function (item) { return !item.deleting; }).map(mapSection));
      },
      onError
    );
  }

  function watchPages(sectionIds, callback, onError) {
    var ids = Array.from(new Set((sectionIds || []).filter(Boolean))).sort();
    var pagesBySection = {};
    var pending = ids.length;
    var unsubscribers = [];
    var stopped = false;

    function publish() {
      if (stopped || pending > 0) return;
      var pages = [];
      ids.forEach(function (sectionId) {
        pages = pages.concat(pagesBySection[sectionId] || []);
      });
      callback(pages);
    }

    if (!ids.length) {
      callback([]);
      return function () {};
    }

    ids.forEach(function (sectionId) {
      var received = false;
      pagesBySection[sectionId] = [];
      unsubscribers.push(window.SenkoFirebase.listenCollection(
        workspacePath('teamNoteSections/' + sectionId + '/pages'),
        { orderBy: [['updatedAt', 'desc']], errorScope: 'feature' },
        function (documents) {
          pagesBySection[sectionId] = documents.filter(function (item) {
            return !item.deleting;
          }).map(function (item) { return mapPage(item, sectionId); });
          if (!received) {
            received = true;
            pending -= 1;
          }
          publish();
        },
        function (error) {
          if (!received) {
            received = true;
            pending -= 1;
          }
          if (onError) onError(error);
          publish();
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

  window.SenkoTeamNotesFirebase = {
    watchSections: watchSections,
    watchPages: watchPages,
    saveSection: function (section) {
      return window.SenkoFirestoreWrites.saveTeamNoteSection({
        sectionId: section.id || null,
        name: section.name,
        order: Number(section.order || 0),
        expectedVersion: section.expectedVersion
      });
    },
    savePage: function (page) {
      return window.SenkoFirestoreWrites.saveTeamNotePage({
        sectionId: page.sectionId,
        pageId: page.id || null,
        name: page.title,
        content: page.content,
        expectedVersion: page.expectedVersion
      });
    },
    deleteSection: function (section) {
      return window.SenkoFirestoreWrites.deleteTeamNoteSection({
        sectionId: section.id,
        expectedVersion: section.version
      });
    },
    deletePage: function (page) {
      return window.SenkoFirestoreWrites.deleteTeamNotePage({
        sectionId: page.sectionId,
        pageId: page.id,
        expectedVersion: page.version
      });
    }
  };
})();
