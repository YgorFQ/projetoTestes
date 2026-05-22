(function () {
  document.addEventListener('DOMContentLoaded', function () {
    if (typeof initPictureTool === 'function') initPictureTool();
    if (typeof setStatus === 'function') setStatus('', 'aguardando');
  });
})();
