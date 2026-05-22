(function () {
  if (!window.SenkoShell) return;

  window.SenkoShell.registerFrameFeature({
    id: 'imagens',
    label: 'Imagens',
    order: 30,
    src: 'app/features/imagens/index.html',
    title: 'Ferramentas de imagens'
  });
})();
