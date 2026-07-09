(function () {
  if (!window.SenkoShell) return;

  var currentScript = document.currentScript;
  var featureBaseUrl = currentScript && currentScript.src
    ? new URL('../', currentScript.src).href
    : new URL('app/features/sources/', document.baseURI).href;
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
      var existing = document.querySelector('script[data-senko-sources-src="' + absoluteSrc + '"]');
      if (existing && existing.dataset.loaded === '1') {
        resolve();
        return;
      }

      var script = existing || document.createElement('script');
      script.src = absoluteSrc;
      script.dataset.senkoSourcesSrc = absoluteSrc;
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
     * Sources tem estilos proprios, mas herda cores e fontes dos tokens do
     * SenkoLib. O Shadow DOM impede que classes genericas como .panel e .card
     * alterem Biblioteca, Colecoes ou Imagens.
     */
    var baseStyle = document.createElement('style');
    baseStyle.textContent =
      ':host{display:block;height:calc(100vh - 70px);min-height:560px;min-width:0;color:var(--text);}' +
      '.senko-feature-content{height:100%;min-height:0;}';
    root.appendChild(baseStyle);

    var stylesheet = document.createElement('link');
    stylesheet.rel = 'stylesheet';
    stylesheet.href = featureUrl('styles/sources.css?v=20260613-base-mode-visibility');
    root.appendChild(stylesheet);
  }

  async function loadPanel() {
    if (loadPromise) return loadPromise;

    loadPromise = (async function () {
      /*
       * Sources entrega sua propria view ao shell. Nenhum HTML de outra tela
       * e consultado durante a troca de feature.
       */
      await loadScript('scripts/sources-view.js?v=20260613-remove-legacy-header');
      var content = window.SenkoSources.createView();
      shadow.appendChild(content);

      await loadScript('scripts/sources-utils.js?v=20260607-dom-feature');
      await loadScript('scripts/picture.js?v=20260607-dom-feature');
      await loadScript('scripts/sources-app.js?v=20260607-dom-feature');

      if (typeof window.SenkoSources.init !== 'function') {
        throw new Error('Inicializador de Sources indisponivel');
      }
      window.SenkoSources.init(shadow);
    })().catch(function (error) {
      console.error(error);
      shadow.innerHTML =
        '<div style="padding:2rem;color:var(--red);font-family:var(--font-code);">' +
        'Nao foi possivel carregar a feature Sources.' +
        '</div>';
    });

    return loadPromise;
  }

  function mountSourcesFeature() {
    if (panel) return panel;

    panel = document.createElement('section');
    panel.id = 'sourcesDashboard';
    panel.className = 'senko-dom-feature senko-dom-feature--sources';
    panel.style.display = 'none';

    shadow = panel.attachShadow({ mode: 'open' });
    appendStyles(shadow);

    window.SenkoShell.getFeatureRoot().appendChild(panel);
    loadPanel();
    return panel;
  }

  window.SenkoShell.registerFeature({
    id: 'sources',
    label: 'Sources',
    order: 40,
    mount: mountSourcesFeature
  });
})();
