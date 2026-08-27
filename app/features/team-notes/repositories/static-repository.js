(function () {
  function source() {
    return ((window.SenkoStaticBackup || {}).features || {})['team-notes'] || null;
  }

  function cloneSection(item) {
    return {
      id: item.id,
      name: item.name || '',
      order: Number(item.order || 0),
      version: Number(item.version || 0),
      createdAt: item.createdAt || null,
      updatedAt: item.updatedAt || null,
      _senkoStatic: true
    };
  }

  function clonePage(item) {
    return {
      id: item.id,
      sectionId: item.sectionId,
      title: item.name || '',
      content: item.content || '',
      version: Number(item.version || 0),
      createdAt: item.createdAt || null,
      updatedAt: item.updatedAt || null,
      _senkoStatic: true
    };
  }

  window.SenkoTeamNotesStatic = {
    isAvailable: function () {
      var data = source();
      var manifests = (window.SenkoStaticBackup || {}).featureManifests || {};
      return Boolean(manifests['team-notes'] && data &&
        Array.isArray(data.sections) && Array.isArray(data.pages));
    },
    getSections: function () {
      var data = source();
      return data ? data.sections.map(cloneSection) : [];
    },
    getPages: function () {
      var data = source();
      return data ? data.pages.map(clonePage) : [];
    }
  };
})();
