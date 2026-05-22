(function () {
  function initTabs() {
    document.querySelectorAll('.tab').forEach(function (tab) {
      tab.addEventListener('click', function () {
        var target = tab.dataset.tab;
        document.querySelectorAll('.tab').forEach(function (item) {
          item.classList.toggle('is-active', item === tab);
        });
        document.querySelectorAll('.view').forEach(function (view) {
          view.classList.toggle('is-active', view.id === 'view-' + target);
        });
        if (typeof setStatus === 'function') {
          setStatus('', target === 'resizer' ? 'redimensionador' : 'compressor');
        }
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initTabs();
    if (typeof initCompressor === 'function') initCompressor();
    if (typeof initResizer === 'function') initResizer();
    if (typeof setStatus === 'function') setStatus('', 'compressor');
  });
})();
