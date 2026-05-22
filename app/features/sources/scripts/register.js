(function () {
  if (!window.SenkoShell) return;

  window.SenkoShell.registerFrameFeature({
    id: 'sources',
    label: 'Sources',
    order: 40,
    src: 'app/features/sources/index.html',
    title: 'Gerador de sources'
  });
})();
