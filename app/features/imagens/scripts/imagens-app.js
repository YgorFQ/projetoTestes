(function () {
  var api = window.SenkoImagens = window.SenkoImagens || {};

  function initTabs() {
    api.queryAll('.tab').forEach(function (tab) {
      tab.addEventListener('click', function () {
        var target = tab.dataset.tab;
        api.queryAll('.tab').forEach(function (item) {
          item.classList.toggle('is-active', item === tab);
        });
        api.queryAll('.view').forEach(function (view) {
          view.classList.toggle('is-active', view.id === 'view-' + target);
        });
        api.setStatus('', target === 'resizer' ? 'redimensionador' : 'compressor');
      });
    });
  }

  api.init = function initImagens(root) {
    api.setRoot(root);
    initTabs();
    if (typeof api.initCompressor === 'function') api.initCompressor();
    if (typeof api.initResizer === 'function') api.initResizer();
    api.setStatus('', 'compressor');
  };

  document.addEventListener('DOMContentLoaded', function () {
    /*
     * Modo standalone para abrir app/features/imagens/index.html direto.
     * No SenkoLib principal o register.js chama api.init(shadowRoot).
     */
    if (!window.SenkoShell && document.querySelector('.image-tool-app')) {
      api.init(document);
    }
  });
})();
