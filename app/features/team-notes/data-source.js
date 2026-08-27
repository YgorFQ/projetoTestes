(function () {
  var api = window.SenkoTeamNotesWorkspace = window.SenkoTeamNotesWorkspace || {};
  var stopSections = null;
  var stopPages = null;
  var currentSections = [];

  function stopFirebase() {
    if (stopSections) stopSections();
    if (stopPages) stopPages();
    stopSections = null;
    stopPages = null;
  }

  function report(error) {
    console.error('[Notas da equipe] Falha na sincronizacao:', error);
    useStatic();
    if (api.reportDataError) {
      api.reportDataError(new Error(
        'Não foi possível acessar as Notas no Firebase. Exibindo somente o backup desta feature.'
      ));
    }
  }

  function startFirebase() {
    stopFirebase();
    currentSections = [];
    stopSections = window.SenkoTeamNotesFirebase.watchSections(function (sections) {
      currentSections = sections;
      if (stopPages) stopPages();
      stopPages = window.SenkoTeamNotesFirebase.watchPages(
        sections.map(function (section) { return section.id; }),
        function (pages) {
          api.replaceData(currentSections, pages, false);
        },
        report
      );
    }, report);
  }

  function useStatic() {
    stopFirebase();
    var repository = window.SenkoTeamNotesStatic;
    api.replaceData(
      repository && repository.isAvailable() ? repository.getSections() : [],
      repository && repository.isAvailable() ? repository.getPages() : [],
      true
    );
  }

  api.connectDataSources = function () {
    return window.SenkoDataMode.onChange(function (state) {
      if (state.mode === 'firebase') startFirebase();
      else useStatic();
    });
  };
})();
