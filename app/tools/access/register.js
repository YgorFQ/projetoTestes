(function () {
  /*
   * Composition root do modal global Acessos.
   *
   * Cria trigger e overlay uma vez, carrega view/repository/controller sob
   * demanda e preserva o foco ao fechar. O shell so conhece o botao global;
   * regras de cargos permanecem dentro desta tool e no Firebase.
   */
  if (!window.SenkoFirebase) return;

  var currentScript = document.currentScript;
  var baseUrl = currentScript && currentScript.src
    ? new URL('./', currentScript.src).href
    : new URL('app/tools/access/', document.baseURI).href;
  var trigger;
  var overlay;
  var panel;
  var loadPromise;
  var previousFocus;

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

  function roleDescription() {
    return role() === 'owner' ? 'Proprietario do SenkoLib' : 'Administrador';
  }

  function createTrigger() {
    if (trigger) return trigger;
    trigger = document.createElement('button');
    trigger.id = 'senkoAccessBtn';
    trigger.className = 'theme-toggle senko-access-trigger';
    trigger.type = 'button';
    trigger.hidden = !isAvailable();
    trigger.title = 'Gerenciar acessos';
    trigger.setAttribute('aria-label', 'Gerenciar acessos');
    trigger.setAttribute('aria-haspopup', 'dialog');
    trigger.setAttribute('aria-expanded', 'false');
    trigger.setAttribute('aria-controls', 'senkoAccessOverlay');
    trigger.innerHTML =
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">' +
      '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>' +
      '<circle cx="9" cy="7" r="4"></circle>' +
      '<path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"></path></svg>';
    trigger.addEventListener('click', function () { open(trigger); });

    var headerActions = document.querySelector('.header-actions');
    var githubButton = document.getElementById('senkoGithubConfigBtn');
    if (headerActions) headerActions.insertBefore(trigger, githubButton || null);
    return trigger;
  }

  function viewMarkup() {
    return '<header class="senko-access-header">' +
      '  <div class="senko-access-title"><h1 id="senkoAccessTitle">Acessos</h1><span id="senkoAccessRoleLabel">' + roleDescription() + '</span></div>' +
      '  <button class="senko-access-close" id="senkoAccessCloseBtn" type="button" title="Fechar" aria-label="Fechar acessos">' +
      '    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"></path></svg>' +
      '  </button>' +
      '</header>' +
      '<div class="senko-access-tabs" role="tablist" aria-label="Areas de acesso">' +
      '  <button type="button" data-access-tab="requests">Solicitacoes <b id="senkoAccessRequestCount">0</b></button>' +
      '  <button type="button" data-access-tab="members">Membros <b id="senkoAccessMemberCount">0</b></button>' +
      '  <button type="button" data-access-tab="events">Atividade</button>' +
      '</div>' +
      '<main class="senko-access-content">' +
      '  <section data-access-panel="requests"><div id="senkoAccessRequests" class="senko-access-list"></div></section>' +
      '  <section data-access-panel="members" hidden><div id="senkoAccessMembers" class="senko-access-list"></div></section>' +
      '  <section data-access-panel="events" hidden><div id="senkoAccessEvents" class="senko-access-list"></div></section>' +
      '</main>' +
      '<div id="senkoAccessStatus" class="senko-access-status" role="status" aria-live="polite">Carregando acessos...</div>';
  }

  function ensureModal() {
    if (overlay) return overlay;
    loadStyle('styles/access.css?v=20260815-modal');
    overlay = document.createElement('div');
    overlay.id = 'senkoAccessOverlay';
    overlay.className = 'senko-access-overlay';
    overlay.hidden = true;
    overlay.innerHTML =
      '<section id="senkoAccessFeature" class="senko-access-feature" role="dialog" aria-modal="true" aria-labelledby="senkoAccessTitle">' +
      viewMarkup() + '</section>';
    document.body.appendChild(overlay);
    panel = document.getElementById('senkoAccessFeature');

    document.getElementById('senkoAccessCloseBtn').addEventListener('click', function () {
      close(true);
    });
    overlay.addEventListener('click', function (event) {
      if (event.target === overlay) close(true);
    });
    return overlay;
  }

  function loadFeature() {
    if (loadPromise) return loadPromise;
    ensureModal();
    loadPromise = Promise.all([
      loadScript('data/firebase-repository.js?v=20260815-roles'),
      loadScript('scripts/access.js?v=20260815-modal')
    ]).then(function () {
      window.SenkoAccess.init();
      return panel;
    }).catch(function (error) {
      console.error('[SenkoAccess] Falha ao carregar:', error);
      var status = document.getElementById('senkoAccessStatus');
      if (status) {
        status.dataset.type = 'error';
        status.textContent = 'Nao foi possivel carregar Acessos.';
      }
      throw error;
    });
    return loadPromise;
  }

  function open(origin) {
    if (!isAvailable()) return;
    ensureModal();
    previousFocus = document.getElementById('senkoUtilityMenuBtn') || origin || document.activeElement;
    overlay.hidden = false;
    requestAnimationFrame(function () { overlay.classList.add('is-open'); });
    if (trigger) trigger.setAttribute('aria-expanded', 'true');
    document.body.classList.add('senko-access-modal-open');
    document.getElementById('senkoAccessCloseBtn').focus();

    loadFeature().then(function () {
      if (!overlay.hidden && window.SenkoAccess) window.SenkoAccess.start();
    }).catch(function () {});
  }

  function close(restoreFocus) {
    if (!overlay || overlay.hidden) return;
    overlay.classList.remove('is-open');
    overlay.hidden = true;
    document.body.classList.remove('senko-access-modal-open');
    if (trigger) trigger.setAttribute('aria-expanded', 'false');
    if (window.SenkoAccess) window.SenkoAccess.stop();
    if (restoreFocus && previousFocus && typeof previousFocus.focus === 'function') {
      previousFocus.focus();
    }
  }

  function syncAvailability() {
    createTrigger();
    trigger.hidden = !isAvailable();
    if (!isAvailable()) close(false);
  }

  window.SenkoAccessModal = {
    open: open,
    close: close,
    isAvailable: isAvailable
  };

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && overlay && !overlay.hidden) close(true);
  });
  document.addEventListener('DOMContentLoaded', syncAvailability);
  window.SenkoFirebase.onStateChange(syncAvailability);
})();
