(function () {
  'use strict';

  /*
   * Criação rápida oficial do Senko.
   *
   * RESPONSABILIDADE DESTE MÓDULO:
   * - controlar o botão global e o modal de escolha;
   * - listar providers e ações registrados no SenkoShell;
   * - apresentar um picker neutro quando uma ação exige seleção.
   *
   * O QUE ESTE MÓDULO NÃO FAZ:
   * - não importa scripts de features;
   * - não conhece SenkoBiblioteca, SenkoColecoes ou seus dados internos;
   * - não valida nem salva layouts, variantes ou coleções.
   *
   * Cada feature continua dona de seu carregamento, modal, validação e
   * persistência. Esta ferramenta apenas coordena o ponto de entrada.
   */
  if (!window.SenkoShell) return;

  var api = window.SenkoQuickCreate = window.SenkoQuickCreate || {};
  var overlay;
  var modalBody;
  var modalTitle;
  var modalKicker;
  var backButton;
  var closeButton;
  var currentProvider = null;
  var currentAction = null;
  var currentContext = null;
  var currentView = 'home';
  var selectedTargetId = '';
  var cachedTargets = [];
  var previousBodyOverflow = '';
  var busy = false;

  function escapeHtml(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function normalizeSearchText(value) {
    return String(value || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim();
  }

  function getProviders() {
    if (typeof window.SenkoShell.listCreateProviders !== 'function') return [];
    return window.SenkoShell.listCreateProviders();
  }

  function getProvider(providerId) {
    if (typeof window.SenkoShell.getCreateProvider !== 'function') return null;
    return window.SenkoShell.getCreateProvider(providerId);
  }

  function getAction(provider, actionId) {
    if (!provider || !Array.isArray(provider.actions)) return null;
    return provider.actions.find(function (action) {
      return action.id === actionId;
    }) || null;
  }

  function iconMarkup(iconName) {
    /*
     * Os ícones pertencem à apresentação global. Providers informam somente
     * um nome semântico para não enviarem HTML ou SVG ao shell.
     */
    var icons = {
      library:
        '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.6" aria-hidden="true">' +
        '  <path d="M10 12h10a6 6 0 0 1 6 6v18H16a6 6 0 0 0-6 6V12Z" />' +
        '  <path d="M38 12H28a6 6 0 0 0-6 6v18h10a6 6 0 0 1 6 6V12Z" />' +
        '  <path d="M16 19h6M16 26h6M28 19h4M28 26h4" />' +
        '</svg>',
      collection:
        '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.6" aria-hidden="true">' +
        '  <path d="M8 15a4 4 0 0 1 4-4h10l4 5h10a4 4 0 0 1 4 4v17a4 4 0 0 1-4 4H12a4 4 0 0 1-4-4V15Z" />' +
        '  <path d="M16 26h6v6h-6zM26 26h6v6h-6z" />' +
        '</svg>',
      variant:
        '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.6" aria-hidden="true">' +
        '  <rect x="9" y="11" width="18" height="18" rx="3" />' +
        '  <rect x="21" y="19" width="18" height="18" rx="3" />' +
        '  <path d="M16 20h4M28 28h4" />' +
        '</svg>',
      layout:
        '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.6" aria-hidden="true">' +
        '  <rect x="9" y="10" width="30" height="28" rx="4" />' +
        '  <path d="M9 18h30M18 25h12M18 31h8" />' +
        '</svg>'
    };
    return icons[iconName] || icons.layout;
  }

  function setBusy(nextBusy) {
    busy = Boolean(nextBusy);
    if (backButton) backButton.disabled = busy;
    if (closeButton) closeButton.disabled = busy;
  }

  function setHead(kicker, title, canGoBack) {
    modalKicker.textContent = kicker;
    modalTitle.textContent = title;
    backButton.hidden = !canGoBack;
  }

  function createModal() {
    if (overlay) return;

    /*
     * O index é dono apenas do botão físico no header. O modal é criado aqui
     * porque toda sua estrutura e navegação pertencem à ferramenta oficial.
     */
    overlay = document.createElement('div');
    overlay.className = 'senko-global-create-overlay';
    overlay.setAttribute('aria-hidden', 'true');
    overlay.innerHTML =
      '<section class="senko-global-create-modal" role="dialog" aria-modal="true" aria-labelledby="senkoQuickCreateTitle">' +
      '  <div class="senko-global-create-head">' +
      '    <button class="senko-global-create-back" id="senkoQuickCreateBackBtn" type="button" title="Voltar" aria-label="Voltar" hidden>' +
      '      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" aria-hidden="true"><path d="M15 18l-6-6 6-6"/></svg>' +
      '    </button>' +
      '    <div class="senko-global-create-title">' +
      '      <span class="senko-global-create-kicker" id="senkoQuickCreateKicker">Criar</span>' +
      '      <h2 id="senkoQuickCreateTitle">Escolha onde criar</h2>' +
      '    </div>' +
      '    <button class="senko-global-create-close" id="senkoQuickCreateCloseBtn" type="button" title="Fechar" aria-label="Fechar">' +
      '      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg>' +
      '    </button>' +
      '  </div>' +
      '  <div class="senko-global-create-body" id="senkoQuickCreateBody"></div>' +
      '</section>';

    document.body.appendChild(overlay);
    modalBody = document.getElementById('senkoQuickCreateBody');
    modalTitle = document.getElementById('senkoQuickCreateTitle');
    modalKicker = document.getElementById('senkoQuickCreateKicker');
    backButton = document.getElementById('senkoQuickCreateBackBtn');
    closeButton = document.getElementById('senkoQuickCreateCloseBtn');

    closeButton.addEventListener('click', function () {
      closeModal(false);
    });
    backButton.addEventListener('click', goBack);
    overlay.addEventListener('click', function (event) {
      if (event.target === overlay) closeModal(false);
    });
    modalBody.addEventListener('click', handleModalClick);
    modalBody.addEventListener('input', handleModalInput);
  }

  function showOverlay() {
    createModal();
    /*
     * Em uma falha de preparação o modal ainda pode estar aberto. Nesse caso
     * não sobrescrevemos o valor original com "hidden", senão o body ficaria
     * bloqueado depois que o usuário fechasse a mensagem de erro.
     */
    if (!overlay.classList.contains('is-open')) {
      previousBodyOverflow = document.body.style.overflow;
    }
    overlay.classList.add('is-open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    var trigger = document.getElementById('senkoGlobalCreateBtn');
    if (trigger) trigger.classList.add('is-active');
  }

  function closeModal(force) {
    /*
     * Durante o carregamento, fechar o modal deixaria uma Promise concluindo
     * contra uma tela já desmontada. Operações internas usam `force` somente
     * depois que o provider está pronto para abrir seu modal oficial.
     */
    if (!overlay || (busy && !force)) return;
    overlay.classList.remove('is-open');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = previousBodyOverflow || '';

    var trigger = document.getElementById('senkoGlobalCreateBtn');
    if (trigger) trigger.classList.remove('is-active');
  }

  function focusFirstOption() {
    window.setTimeout(function () {
      var firstOption = overlay.querySelector('.senko-global-create-card, .senko-global-create-layout');
      if (firstOption) firstOption.focus();
    }, 0);
  }

  function renderHome() {
    var providers = getProviders();
    currentProvider = null;
    currentAction = null;
    currentContext = null;
    currentView = 'home';
    selectedTargetId = '';
    cachedTargets = [];
    setBusy(false);
    setHead('Criação rápida', 'Escolha onde criar', false);

    if (!providers.length) {
      modalBody.innerHTML =
        '<div class="senko-global-create-empty">Nenhuma área oferece criação rápida.</div>';
      return;
    }

    modalBody.innerHTML =
      '<div class="senko-global-create-grid" aria-label="Áreas disponíveis">' +
      providers.map(function (provider) {
        return (
          '<button class="senko-global-create-card" type="button" ' +
          'data-quick-create-command="provider" data-provider-id="' + escapeHtml(provider.id) + '">' +
          '  <span class="senko-global-create-icon">' + iconMarkup(provider.icon) + '</span>' +
          '  <span class="senko-global-create-label">' + escapeHtml(provider.label) + '</span>' +
          '</button>'
        );
      }).join('') +
      '</div>';
  }

  function renderProviderActions(provider) {
    currentProvider = provider;
    currentAction = null;
    currentContext = null;
    currentView = 'provider';
    selectedTargetId = '';
    cachedTargets = [];
    setBusy(false);
    setHead(provider.label, 'O que você quer criar?', true);

    modalBody.innerHTML =
      '<div class="senko-global-create-grid" aria-label="Opções de ' + escapeHtml(provider.label) + '">' +
      provider.actions.map(function (action) {
        return (
          '<button class="senko-global-create-card" type="button" ' +
          'data-quick-create-command="action" data-action-id="' + escapeHtml(action.id) + '">' +
          '  <span class="senko-global-create-icon">' + iconMarkup(action.icon) + '</span>' +
          '  <span class="senko-global-create-label">' + escapeHtml(action.label) + '</span>' +
          '</button>'
        );
      }).join('') +
      '</div>';
  }

  function renderLoading(kicker, title, message) {
    setBusy(true);
    setHead(kicker || 'Criação rápida', title || 'Carregando', true);
    modalBody.innerHTML =
      '<div class="senko-global-create-loading">' +
      '  <span class="senko-global-create-spinner" aria-hidden="true"></span>' +
      '  <p>' + escapeHtml(message || 'Preparando...') + '</p>' +
      '</div>';
  }

  function normalizeTargets(targets) {
    /*
     * Providers podem montar os campos a partir de dados diferentes. Depois
     * desta normalização, busca e seleção usam um único formato previsível.
     */
    return (Array.isArray(targets) ? targets : []).map(function (target) {
      return {
        id: String(target && target.id || ''),
        title: String(target && target.title || target && target.id || ''),
        meta: String(target && target.meta || ''),
        tags: Array.isArray(target && target.tags) ? target.tags : [],
        searchText: String(target && target.searchText || '')
      };
    }).filter(function (target) {
      return Boolean(target.id);
    });
  }

  function renderPicker(provider, action, targets) {
    var picker = action.picker;
    currentProvider = provider;
    currentAction = action;
    currentView = 'picker';
    selectedTargetId = '';
    cachedTargets = normalizeTargets(targets);
    setBusy(false);
    setHead(picker.kicker || provider.label, picker.title || 'Escolha uma opção', true);

    modalBody.innerHTML =
      '<div class="senko-global-create-picker">' +
      '  <label class="senko-global-create-search">' +
      '    <span>' + escapeHtml(picker.searchLabel || 'Buscar') + '</span>' +
      '    <input id="senkoQuickCreateSearch" type="search" autocomplete="off" placeholder="' +
             escapeHtml(picker.searchPlaceholder || 'Digite para buscar') + '">' +
      '  </label>' +
      '  <div class="senko-global-create-list" id="senkoQuickCreateList"></div>' +
      '  <button class="senko-global-create-primary" id="senkoQuickCreateConfirmBtn" type="button" ' +
             'data-quick-create-command="confirm" disabled>' +
             escapeHtml(picker.confirmLabel || 'Criar') +
      '  </button>' +
      '</div>';
    renderTargetList('');
  }

  function targetMatches(target, query) {
    var normalizedQuery = normalizeSearchText(query);
    if (!normalizedQuery) return true;

    var targetText = normalizeSearchText([
      target.id,
      target.title,
      target.meta,
      target.searchText,
      target.tags.join(' ')
    ].join(' '));
    return targetText.indexOf(normalizedQuery) !== -1;
  }

  function renderTargetList(query) {
    var list = document.getElementById('senkoQuickCreateList');
    var confirmButton = document.getElementById('senkoQuickCreateConfirmBtn');
    if (!list || !currentAction || !currentAction.picker) return;

    var filteredTargets = cachedTargets.filter(function (target) {
      return targetMatches(target, query);
    });

    if (!filteredTargets.length) {
      list.innerHTML =
        '<div class="senko-global-create-empty">' +
        escapeHtml(currentAction.picker.emptyMessage || 'Nenhuma opção encontrada.') +
        '</div>';
      confirmButton.disabled = true;
      return;
    }

    list.innerHTML = filteredTargets.map(function (target) {
      var tags = target.tags.map(function (tag) {
        return '<span>' + escapeHtml(tag) + '</span>';
      }).join('');

      return (
        '<button class="senko-global-create-layout' +
          (target.id === selectedTargetId ? ' is-selected' : '') +
          '" type="button" data-quick-create-command="select" data-target-id="' +
          escapeHtml(target.id) + '">' +
        '  <strong>' + escapeHtml(target.title) + '</strong>' +
        (target.meta ? '  <small>' + escapeHtml(target.meta) + '</small>' : '') +
        (tags ? '  <span class="senko-global-create-tags">' + tags + '</span>' : '') +
        '</button>'
      );
    }).join('');

    confirmButton.disabled = !selectedTargetId;
  }

  function showStatus(message) {
    var status = document.getElementById('senkoQuickCreateStatus');
    if (!status) {
      status = document.createElement('div');
      status.id = 'senkoQuickCreateStatus';
      status.className = 'senko-global-create-status';
      modalBody.appendChild(status);
    }
    status.textContent = message;
  }

  function prepareProvider(provider) {
    /*
     * Promise.resolve protege o shell contra providers síncronos e garante
     * que exceções lançadas por prepare() sigam pelo mesmo catch.
     */
    return Promise.resolve().then(function () {
      return provider.prepare();
    });
  }

  function restoreAfterError(provider, action, message) {
    showOverlay();
    if (action && action.picker && cachedTargets.length) {
      renderPicker(provider, action, cachedTargets);
    } else {
      renderProviderActions(provider);
    }
    showStatus(message || 'Não foi possível abrir esta criação.');
  }

  function executeDirectAction(provider, action) {
    renderLoading(
      provider.label,
      action.loadingTitle || 'Carregando ' + provider.label,
      action.loadingMessage || 'Preparando o editor...'
    );

    prepareProvider(provider).then(function (context) {
      /*
       * Fecha primeiro o modal global. A ação da feature abre seu próprio
       * modal depois, mantendo correto o controle de overflow do body.
       */
      currentContext = context;
      setBusy(false);
      closeModal(true);
      return Promise.resolve(action.run(context));
    }).then(function (opened) {
      if (opened === false) {
        throw new Error('A feature não conseguiu abrir o editor solicitado.');
      }
    }).catch(function (error) {
      setBusy(false);
      restoreAfterError(provider, action, error.message);
    });
  }

  function loadPicker(provider, action) {
    var picker = action.picker;
    renderLoading(
      picker.kicker || provider.label,
      picker.loadingTitle || 'Carregando opções',
      picker.loadingMessage || 'Preparando a lista...'
    );

    prepareProvider(provider).then(function (context) {
      currentContext = context;
      return Promise.resolve(picker.list(context));
    }).then(function (targets) {
      renderPicker(provider, action, targets);
      focusFirstOption();
    }).catch(function (error) {
      setBusy(false);
      renderProviderActions(provider);
      showStatus(error.message || 'Não foi possível carregar as opções.');
    });
  }

  function executePickerAction() {
    if (!currentProvider || !currentAction || !selectedTargetId) return;

    var provider = currentProvider;
    var action = currentAction;
    var selectedId = selectedTargetId;
    var picker = action.picker;

    renderLoading(
      picker.kicker || provider.label,
      'Abrindo ' + action.label,
      'Preparando o editor...'
    );

    var contextPromise = currentContext
      ? Promise.resolve(currentContext)
      : prepareProvider(provider);

    contextPromise.then(function (context) {
      currentContext = context;
      setBusy(false);
      closeModal(true);
      return Promise.resolve(picker.run(context, selectedId));
    }).then(function (opened) {
      if (opened === false) {
        throw new Error('A opção selecionada não está mais disponível.');
      }
    }).catch(function (error) {
      setBusy(false);
      restoreAfterError(provider, action, error.message);
    });
  }

  function goBack() {
    if (busy) return;
    if (currentView === 'picker' && currentProvider) {
      renderProviderActions(currentProvider);
      focusFirstOption();
      return;
    }
    renderHome();
    focusFirstOption();
  }

  function handleModalClick(event) {
    if (busy) return;
    var target = event.target.closest('[data-quick-create-command]');
    if (!target) return;

    var command = target.dataset.quickCreateCommand;
    if (command === 'provider') {
      var provider = getProvider(target.dataset.providerId || '');
      if (provider) {
        renderProviderActions(provider);
        focusFirstOption();
      }
      return;
    }

    if (command === 'action') {
      var action = getAction(currentProvider, target.dataset.actionId || '');
      if (!action) return;
      currentAction = action;
      if (action.picker) loadPicker(currentProvider, action);
      else executeDirectAction(currentProvider, action);
      return;
    }

    if (command === 'select') {
      selectedTargetId = target.dataset.targetId || '';
      var search = document.getElementById('senkoQuickCreateSearch');
      renderTargetList(search ? search.value : '');
      return;
    }

    if (command === 'confirm') executePickerAction();
  }

  function handleModalInput(event) {
    if (event.target && event.target.id === 'senkoQuickCreateSearch') {
      renderTargetList(event.target.value);
    }
  }

  function openModal() {
    createModal();
    renderHome();
    showOverlay();
    focusFirstOption();
  }

  function bindButton() {
    /*
     * O botão físico pertence ao header do index. Não há injeção de fallback:
     * se ele for removido do shell, a ferramenta deixa de existir de forma
     * explícita e previsível.
     */
    var button = document.getElementById('senkoGlobalCreateBtn');
    if (!button || button.dataset.senkoQuickCreateBound) return;
    button.dataset.senkoQuickCreateBound = '1';
    button.addEventListener('click', openModal);
  }

  function initQuickCreate() {
    bindButton();
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && overlay &&
          overlay.classList.contains('is-open')) {
        closeModal(false);
      }
    });
  }

  api.open = openModal;
  api.close = function () {
    closeModal(false);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initQuickCreate);
  } else {
    initQuickCreate();
  }
})();
