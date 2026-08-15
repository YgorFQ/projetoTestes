(function () {
  if (!window.SenkoShell || !window.SenkoFirebase) return;

  var currentScript = document.currentScript;
  var baseUrl = currentScript && currentScript.src
    ? new URL('./', currentScript.src).href
    : new URL('app/features/access/', document.baseURI).href;
  var panel;
  var loadPromise;

  function featureUrl(path) {
    var url = new URL(path, baseUrl).href;
    return window.SenkoFreshAssets ? window.SenkoFreshAssets.url(url) : url;
  }

  function loadStyle(path) {
    var href = featureUrl(path);
    if (document.querySelector('link[data-senko-access-style="' + href + '"]')) return;
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    link.dataset.senkoAccessStyle = href;
    document.head.appendChild(link);
  }

  function loadScript(path) {
    return new Promise(function (resolve, reject) {
      var src = featureUrl(path);
      var script = document.querySelector('script[data-senko-access-src="' + src + '"]');
      if (script && script.dataset.loaded === '1') return resolve();
      script = script || document.createElement('script');
      script.src = src;
      script.dataset.senkoAccessSrc = src;
      script.onload = function () { script.dataset.loaded = '1'; resolve(); };
      script.onerror = function () { reject(new Error('Falha ao carregar ' + path)); };
      if (!script.isConnected) document.head.appendChild(script);
    });
  }

  function role() {
    var state = window.SenkoFirebase.getState();
    return state.status === 'ready' && state.member ? state.member.role || 'editor' : '';
  }

  function isAvailable() {
    return ['owner', 'admin'].indexOf(role()) !== -1;
  }

  function createView() {
    var element = document.createElement('div');
    element.className = 'senko-access-feature';
    element.innerHTML =
      '<header class="senko-access-header">' +
      '  <div class="senko-access-title"><h1>Acessos</h1><span id="senkoAccessRoleLabel"></span></div>' +
      '  <div class="senko-access-tabs" role="tablist">' +
      '    <button type="button" data-access-tab="requests">Solicitacoes <b id="senkoAccessRequestCount">0</b></button>' +
      '    <button type="button" data-access-tab="members">Membros <b id="senkoAccessMemberCount">0</b></button>' +
      '    <button type="button" data-access-tab="events">Atividade</button>' +
      '  </div>' +
      '</header>' +
      '<main class="senko-access-content">' +
      '  <section data-access-panel="requests"><div id="senkoAccessRequests" class="senko-access-list"></div></section>' +
      '  <section data-access-panel="members" hidden><div id="senkoAccessMembers" class="senko-access-list"></div></section>' +
      '  <section data-access-panel="events" hidden><div id="senkoAccessEvents" class="senko-access-list"></div></section>' +
      '</main>' +
      '<div id="senkoAccessStatus" class="senko-access-status" role="status"></div>';
    return element;
  }

  function loadFeature() {
    if (loadPromise) return loadPromise;
    loadPromise = Promise.all([
      loadScript('data/firebase-repository.js?v=20260815-roles'),
      loadScript('scripts/access.js?v=20260815-roles')
    ]).then(function () {
      panel.replaceChildren(createView());
      var label = document.getElementById('senkoAccessRoleLabel');
      if (label) label.textContent = role() === 'owner' ? 'Proprietario do SenkoLib' : 'Administrador';
      window.SenkoAccess.init();
      return panel;
    }).catch(function (error) {
      console.error('[SenkoAccess] Falha ao carregar:', error);
      panel.innerHTML = '<div class="senko-feature-error">Nao foi possivel carregar Acessos.</div>';
      return panel;
    });
    return loadPromise;
  }

  function mount() {
    if (panel) return panel;
    loadStyle('styles/access.css?v=20260815-roles');
    panel = document.createElement('section');
    panel.id = 'senkoAccessFeature';
    panel.className = 'senko-dom-feature senko-dom-feature--access';
    panel.style.display = 'none';
    panel.innerHTML = '<div class="senko-feature-loading">Carregando acessos...</div>';
    window.SenkoShell.getFeatureRoot().appendChild(panel);
    loadFeature();
    return panel;
  }

  window.SenkoShell.registerFeature({
    id: 'access',
    label: 'Acessos',
    order: 90,
    isAvailable: isAvailable,
    mount: mount,
    activate: function () {
      loadFeature().then(function () {
        if (window.SenkoAccess) window.SenkoAccess.start();
      });
    },
    hide: function (element) {
      element.style.display = 'none';
      if (window.SenkoAccess) window.SenkoAccess.stop();
    },
    show: function (element) {
      element.style.display = '';
    }
  });

  window.SenkoFirebase.onStateChange(function () {
    window.SenkoShell.refreshFeatures();
  });
})();
