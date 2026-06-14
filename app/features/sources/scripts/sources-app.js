(function () {
  var api = window.SenkoSources = window.SenkoSources || {};

  api.init = function initSources(root) {
    api.setRoot(root);
    if (typeof api.initPictureTool === 'function') api.initPictureTool();
    api.setStatus('', 'aguardando');
  };

  document.addEventListener('DOMContentLoaded', function () {
    /*
     * Modo standalone para abrir app/features/sources/index.html direto.
     * No SenkoLib principal o register.js chama api.init(shadowRoot).
     */
    if (!window.SenkoShell && document.querySelector('#view-sources')) {
      api.init(document);
    }
  });
})();
