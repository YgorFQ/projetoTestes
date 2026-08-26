(function () {
  if (!window.SenkoShell) return;

  var currentScript = document.currentScript;
  var featureBaseUrl = currentScript && currentScript.src
    ? new URL('./', currentScript.src).href
    : new URL('app/prototype/team-notes-workspace/', document.baseURI).href;
  var panel;
  var shadow;
  var loadPromise;

  function featureUrl(path) {
    var absoluteUrl = new URL(path, featureBaseUrl).href;
    return window.SenkoFreshAssets ? window.SenkoFreshAssets.url(absoluteUrl) : absoluteUrl;
  }

  function loadScript(path) {
    return new Promise(function (resolve, reject) {
      var src = featureUrl(path);
      var selector = 'script[data-senko-team-notes-workspace-src="' + src + '"]';
      var existing = document.querySelector(selector);
      if (existing && existing.dataset.loaded === '1') {
        resolve();
        return;
      }
      var script = existing || document.createElement('script');
      script.src = src;
      script.dataset.senkoTeamNotesWorkspaceSrc = src;
      script.onload = function () {
        script.dataset.loaded = '1';
        resolve();
      };
      script.onerror = function () { reject(new Error('Falha ao carregar ' + path)); };
      if (!existing) document.head.appendChild(script);
    });
  }

  function appendStyles(root) {
    var baseStyle = document.createElement('style');
    baseStyle.textContent = ':host{display:block;height:calc(100vh - 70px);min-height:0;min-width:0;overflow:hidden;color:var(--text);}.senko-feature-content{height:100%;min-height:0;min-width:0;}';
    root.appendChild(baseStyle);

    var stylesheet = document.createElement('link');
    stylesheet.rel = 'stylesheet';
    stylesheet.href = featureUrl('styles.css?v=20260826-team-notes-4');
    root.appendChild(stylesheet);
  }

  function loadPanel() {
    if (loadPromise) return loadPromise;
    loadPromise = (async function () {
      await loadScript('core.js?v=20260826-team-notes-4');
      await loadScript('view.js?v=20260826-team-notes-4');
      shadow.appendChild(window.SenkoTeamNotesWorkspace.createView());
      await loadScript('script.js?v=20260826-team-notes-4');
      window.SenkoTeamNotesWorkspace.init(shadow);
    })().catch(function (error) {
      console.error('[Notas beta] Falha ao carregar o protótipo:', error);
      var message = document.createElement('div');
      message.className = 'team-notes-workspace-load-error';
      message.textContent = 'Não foi possível carregar o protótipo de Notas da equipe.';
      shadow.appendChild(message);
    });
    return loadPromise;
  }

  function mountFeature() {
    if (panel) return panel;
    panel = document.createElement('section');
    panel.id = 'teamNotesWorkspaceDashboard';
    panel.className = 'senko-dom-feature senko-dom-feature--team-notes-workspace';
    panel.style.display = 'none';
    shadow = panel.attachShadow({ mode: 'open' });
    appendStyles(shadow);
    window.SenkoShell.getFeatureRoot().appendChild(panel);
    loadPanel();
    return panel;
  }

  window.SenkoShell.registerFeature({
    id: 'team-notes-workspace',
    label: 'Notas beta',
    order: 70,
    mount: mountFeature
  });
})();
