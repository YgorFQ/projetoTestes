(function () {
  if (!window.SenkoShell) return;

  var currentScript = document.currentScript;
  var featureBaseUrl = currentScript && currentScript.src
    ? new URL('./', currentScript.src).href
    : new URL('app/prototype/faq-teste/', document.baseURI).href;
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
      var selector = 'script[data-senko-faq-test-src="' + absoluteSrc + '"]';
      var existing = document.querySelector(selector);
      if (existing && existing.dataset.loaded === '1') {
        resolve();
        return;
      }

      var script = existing || document.createElement('script');
      script.src = absoluteSrc;
      script.dataset.senkoFaqTestSrc = absoluteSrc;
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
      ':host{display:block;height:calc(100vh - 70px);min-height:0;min-width:0;overflow:hidden;color:var(--text);}' +
      '.senko-feature-content{height:100%;min-height:0;min-width:0;}';
    root.appendChild(baseStyle);

    var stylesheet = document.createElement('link');
    stylesheet.rel = 'stylesheet';
    stylesheet.href = featureUrl('styles.css?v=20260819-faq-test-10');
    root.appendChild(stylesheet);
  }

  function loadPanel() {
    if (loadPromise) return loadPromise;
    loadPromise = (async function () {
      await loadScript('core.js?v=20260819-faq-test-10');
      await loadScript('view.js?v=20260819-faq-test-10');
      var content = window.SenkoFaqTest.createView();
      shadow.appendChild(content);
      await loadScript('script.js?v=20260819-faq-test-10');
      if (typeof window.SenkoFaqTest.init !== 'function') {
        throw new Error('Inicializador do protótipo Teste indisponível.');
      }
      window.SenkoFaqTest.init(shadow);
    })().catch(function (error) {
      console.error('[Teste] Falha ao carregar o protótipo:', error);
      var message = document.createElement('div');
      message.className = 'faq-test-load-error';
      message.textContent = 'Não foi possível carregar o protótipo Teste.';
      shadow.appendChild(message);
    });
    return loadPromise;
  }

  function mountFaqTestFeature() {
    if (panel) return panel;
    panel = document.createElement('section');
    panel.id = 'faqTestDashboard';
    panel.className = 'senko-dom-feature senko-dom-feature--faq-test';
    panel.style.display = 'none';
    shadow = panel.attachShadow({ mode: 'open' });
    appendStyles(shadow);
    window.SenkoShell.getFeatureRoot().appendChild(panel);
    loadPanel();
    return panel;
  }

  window.SenkoShell.registerFeature({
    id: 'faq-teste',
    label: 'Teste',
    order: 60,
    mount: mountFaqTestFeature
  });
})();
