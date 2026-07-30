(function () {
  if (!window.SenkoShell) return;

  var currentScript = document.currentScript;
  var featureBaseUrl = currentScript && currentScript.src
    ? new URL('../', currentScript.src).href
    : new URL('app/features/imagens/', document.baseURI).href;
  var panel;
  var shadow;
  var loadPromise;

  function featureUrl(path) {
    var absoluteUrl = new URL(path, featureBaseUrl).href;
    return window.SenkoFreshAssets
      ? window.SenkoFreshAssets.url(absoluteUrl)
      : absoluteUrl;
  }

  function loadScript(src) {
    return new Promise(function (resolve, reject) {
      var absoluteSrc = featureUrl(src);
      var existing = document.querySelector('script[data-senko-imagens-src="' + absoluteSrc + '"]');
      if (existing && existing.dataset.loaded === '1') {
        resolve();
        return;
      }

      var script = existing || document.createElement('script');
      script.src = absoluteSrc;
      script.dataset.senkoImagensSrc = absoluteSrc;
      script.onload = function () {
        script.dataset.loaded = '1';
        resolve();
      };
      script.onerror = function () {
        reject(new Error('Falha ao carregar ' + src));
      };

      if (!existing) document.head.appendChild(script);
    });
  }

  function appendStyles(root) {
    /*
     * O CSS fica na pasta da feature, mas aplicado somente dentro desta raiz.
     * Assim Imagens respeita os tokens globais do SenkoLib sem vazar seletores
     * como .btn, .view ou .panel para outras janelas.
     */
    var baseStyle = document.createElement('style');
    baseStyle.textContent =
      ':host{display:block;height:calc(100vh - 70px);min-height:560px;min-width:0;color:var(--text);}' +
      '.senko-feature-content{height:100%;min-height:0;}';
    root.appendChild(baseStyle);

    var stylesheet = document.createElement('link');
    stylesheet.rel = 'stylesheet';
    stylesheet.href = featureUrl('styles/imagens.css');
    root.appendChild(stylesheet);
  }

  async function loadPanel() {
    if (loadPromise) return loadPromise;

    loadPromise = (async function () {
      /*
       * A view e carregada como codigo da propria feature. Isso evita uma
       * requisicao ao index standalone e deixa a montagem previsivel.
       */
      await loadScript('scripts/imagens-view.js?v=20260710-output-format');
      var content = window.SenkoImagens.createView();
      shadow.appendChild(content);

      await loadScript('vendor/jszip.min.js');
      await loadScript('vendor/UPNG.min.js');
      await loadScript('vendor/browser-image-compression.js');
      await loadScript('scripts/imagens-utils.js?v=20260607-dom-feature');
      await loadScript('scripts/compressor.js?v=20260710-output-format');
      await loadScript('scripts/resizer.js?v=20260607-dom-feature');
      await loadScript('scripts/imagens-app.js?v=20260607-dom-feature');

      if (typeof window.SenkoImagens.init !== 'function') {
        throw new Error('Inicializador de Imagens indisponivel');
      }
      window.SenkoImagens.init(shadow);
    })().catch(function (error) {
      console.error(error);
      shadow.innerHTML =
        '<div style="padding:2rem;color:var(--red);font-family:var(--font-code);">' +
        'Nao foi possivel carregar a feature Imagens.' +
        '</div>';
    });

    return loadPromise;
  }

  function mountImagensFeature() {
    if (panel) return panel;

    panel = document.createElement('section');
    panel.id = 'imagensDashboard';
    panel.className = 'senko-dom-feature senko-dom-feature--imagens';
    panel.style.display = 'none';

    shadow = panel.attachShadow({ mode: 'open' });
    appendStyles(shadow);

    window.SenkoShell.getFeatureRoot().appendChild(panel);
    loadPanel();
    return panel;
  }

  window.SenkoShell.registerFeature({
    id: 'imagens',
    label: 'Imagens',
    order: 30,
    mount: mountImagensFeature
  });
})();
