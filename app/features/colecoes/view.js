(function () {
  /*
   * View da feature Colecoes.
   *
   * Busca, filtros, grid e criacao pertencem a esta pasta. O shell recebe
   * apenas o elemento pronto e nao conhece detalhes internos da tela.
   */
  var api = window.SenkoColecoes = window.SenkoColecoes || {};

  api.createView = function createView() {
    var dashboard = document.createElement('div');
    dashboard.id = 'colDashboard';
    dashboard.className = 'col-dashboard';
    dashboard.innerHTML =
      '<div class="col-feature-toolbar">' +
        '<div class="search-wrap col-search-wrap">' +
          '<svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">' +
            '<circle cx="11" cy="11" r="8" />' +
            '<line x1="21" y1="21" x2="16.65" y2="16.65" />' +
          '</svg>' +
          '<input type="text" id="colSearchInput" class="search-input" placeholder="Buscar colecoes..." autocomplete="off" />' +
        '</div>' +
        '<button class="btn-add" id="colOpenCreateBtn" type="button">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="14" height="14">' +
            '<line x1="12" y1="5" x2="12" y2="19" />' +
            '<line x1="5" y1="12" x2="19" y2="12" />' +
          '</svg>' +
          'Adicionar' +
        '</button>' +
      '</div>' +
      '<div class="col-filter-bar" id="colFilterBar">' +
        '<span class="col-filter-label">Grupo</span>' +
      '</div>' +
      '<div class="col-stats-bar" id="colStatsBar"></div>' +
      '<div class="col-grid" id="colGrid"></div>';

    return dashboard;
  };
})();
