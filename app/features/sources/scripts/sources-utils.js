(function () {
  /*
   * Utilitarios locais da feature Sources.
   *
   * Esta feature nao importa helpers de Imagens. As duas podem seguir os
   * tokens visuais do SenkoLib, mas a logica de cada uma fica isolada.
   */
  var api = window.SenkoSources = window.SenkoSources || {};

  api.setRoot = function setRoot(root) {
    /*
     * Sources roda dentro do index principal, mas toda busca de DOM fica
     * confinada nesta raiz para nao tocar elementos de outras features.
     */
    api.root = root || document;
  };

  api.getRoot = function getRoot() {
    return api.root || document;
  };

  api.$ = function getById(id) {
    return api.getRoot().getElementById(id);
  };

  api.query = function query(selector) {
    return api.getRoot().querySelector(selector);
  };

  api.queryAll = function queryAll(selector) {
    return Array.from(api.getRoot().querySelectorAll(selector));
  };

  api.esc = function escapeHtml(value) {
    return String(value || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  };

  api.setStatus = function setStatus(state, text) {
    var dot = api.$('dot');
    var status = api.$('status-text');
    if (dot) dot.className = 'dot ' + (state || '');
    if (status) status.textContent = text;
  };
})();
