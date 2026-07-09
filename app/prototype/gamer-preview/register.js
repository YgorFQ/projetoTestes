(function () {
  if (!window.SenkoShell) return;

  var currentScript = document.currentScript;
  var featureBaseUrl = currentScript && currentScript.src
    ? new URL('./', currentScript.src).href
    : new URL('app/prototype/gamer-preview/', document.baseURI).href;
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
      var existing = document.querySelector('script[data-senko-gamer-preview-src="' + absoluteSrc + '"]');
      if (existing && existing.dataset.loaded === '1') {
        resolve();
        return;
      }

      var script = existing || document.createElement('script');
      script.src = absoluteSrc;
      script.dataset.senkoGamerPreviewSrc = absoluteSrc;
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
    var baseStyle = document.createElement('style');
    baseStyle.textContent =
      ':host{display:block;height:calc(100vh - 70px);min-height:560px;min-width:0;color:var(--text);}' +
      '.senko-feature-content{height:100%;min-height:0;}';
    root.appendChild(baseStyle);

    var stylesheet = document.createElement('link');
    stylesheet.rel = 'stylesheet';
    stylesheet.href = featureUrl('styles.css');
    root.appendChild(stylesheet);
  }

  async function loadPanel() {
    if (loadPromise) return loadPromise;

    loadPromise = (async function () {
      /*
       * A interface do Preview pertence ao proprio prototipo. O shell apenas
       * recebe o elemento e nao precisa buscar o index standalone.
       */
      await loadScript('view.js?v=20260613-direct-view');
      var content = window.SenkoGamerPreview.createView();
      shadow.appendChild(content);

      await loadScript('script.js?v=20260607-dom-feature');
      if (typeof window.SenkoGamerPreview.init !== 'function') {
        throw new Error('Inicializador do Preview indisponivel');
      }
      window.SenkoGamerPreview.init(shadow);
    })().catch(function (error) {
      console.error(error);
      shadow.innerHTML =
        '<div style="padding:2rem;color:var(--red);font-family:var(--font-code);">' +
        'Nao foi possivel carregar o Preview beta.' +
        '</div>';
    });

    return loadPromise;
  }

  function mountGamerPreviewFeature() {
    if (panel) return panel;

    panel = document.createElement('section');
    panel.id = 'gamerPreviewDashboard';
    panel.className = 'senko-dom-feature senko-dom-feature--gamer-preview';
    panel.style.display = 'none';

    shadow = panel.attachShadow({ mode: 'open' });
    appendStyles(shadow);

    window.SenkoShell.getFeatureRoot().appendChild(panel);
    loadPanel();
    return panel;
  }

  window.SenkoShell.registerFeature({
    id: 'gamer-preview',
    label: 'Preview (beta)',
    order: 50,
    mount: mountGamerPreviewFeature
  });
})();
