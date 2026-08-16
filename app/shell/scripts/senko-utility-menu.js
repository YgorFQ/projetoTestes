(function () {
  /*
   * Menu global de ferramentas do shell.
   *
   * Os botoes continuam pertencendo as respectivas tools. Este modulo move
   * os elementos existentes para o painel, preservando IDs, listeners,
   * atributos hidden/disabled e regras de cargo. MutationObserver sincroniza
   * mudancas de disponibilidade feitas depois da montagem.
   */
  var menu;
  var trigger;
  var items;
  var observer;

  var actionLabels = {
    senkoTeamNotesBtn: 'Notas da equipe',
    senkoForLayoutLab: 'Abrir LayoutLab',
    senkoGuideBtn: 'Guia do projeto',
    senkoAccessBtn: 'Acessos',
    senkoGithubConfigBtn: 'Backup no GitHub',
    themeToggleBtn: 'Alternar tema'
  };

  function closeMenu(restoreFocus) {
    if (!menu || menu.hidden) return;
    menu.hidden = true;
    trigger.setAttribute('aria-expanded', 'false');
    if (restoreFocus) trigger.focus();
  }

  function openMenu() {
    menu.hidden = false;
    trigger.setAttribute('aria-expanded', 'true');
    var firstAction = Array.prototype.slice.call(
      menu.querySelectorAll('button:not([hidden]):not(:disabled), a:not([hidden])')
    ).find(function (node) {
      return node.getClientRects().length > 0;
    });
    if (firstAction) firstAction.focus();
  }

  function toggleMenu() {
    if (menu.hidden) openMenu();
    else closeMenu(true);
  }

  function actionButton(node) {
    if (!node) return null;
    if (node.matches && node.matches('button')) return node;
    return node.querySelector ? node.querySelector('button') : null;
  }

  function labelFor(button) {
    if (!button) return '';
    if (button.classList.contains('senko-account-toggle')) return 'Conta e acesso';
    return actionLabels[button.id] || button.title || button.getAttribute('aria-label') || 'Acao';
  }

  function ensureActionLabel(node) {
    var button = actionButton(node);
    if (!button) return;

    var label = button.querySelector('.senko-utility-action-label');
    if (!label) {
      label = document.createElement('span');
      label.className = 'senko-utility-action-label';
      button.appendChild(label);
    }
    var nextLabel = labelFor(button);
    if (label.textContent !== nextLabel) label.textContent = nextLabel;

    if (node.matches && node.matches('a')) {
      if (node.hidden !== button.hidden) node.hidden = button.hidden;
    }
  }

  function moveActions(headerActions) {
    Array.prototype.slice.call(headerActions.children).forEach(function (node) {
      if (node === trigger || node === menu || node.id === 'senkoGlobalCreateBtn' ||
          node.id === 'ghDeployDot' ||
          node.classList.contains('senko-data-mode-badge')) return;
      items.appendChild(node);
      ensureActionLabel(node);
    });
  }

  function observeDynamicActions() {
    observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        var node = mutation.target.closest
          ? mutation.target.closest('.senko-utility-menu-items > button, .senko-utility-menu-items > a')
          : null;
        if (node) ensureActionLabel(node);
      });
    });
    observer.observe(items, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ['hidden', 'title', 'aria-label']
    });
  }

  function initUtilityMenu() {
    var headerActions = document.querySelector('.header-actions');
    if (!headerActions || document.getElementById('senkoUtilityMenuBtn')) return;

    trigger = document.createElement('button');
    trigger.id = 'senkoUtilityMenuBtn';
    trigger.className = 'theme-toggle senko-utility-menu-trigger';
    trigger.type = 'button';
    trigger.title = 'Abrir menu';
    trigger.setAttribute('aria-label', 'Abrir menu de ferramentas');
    trigger.setAttribute('aria-haspopup', 'dialog');
    trigger.setAttribute('aria-expanded', 'false');
    trigger.setAttribute('aria-controls', 'senkoUtilityMenu');
    trigger.innerHTML =
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true">' +
      '<path d="M4 6h16M4 12h16M4 18h16"></path></svg>';

    menu = document.createElement('section');
    menu.id = 'senkoUtilityMenu';
    menu.className = 'senko-utility-menu';
    menu.hidden = true;
    menu.setAttribute('role', 'dialog');
    menu.setAttribute('aria-modal', 'false');
    menu.setAttribute('aria-labelledby', 'senkoUtilityMenuTitle');
    menu.innerHTML =
      '<div class="senko-utility-menu-head"><strong id="senkoUtilityMenuTitle">Ferramentas</strong>' +
      '<span>Acoes globais do SenkoLib</span></div>' +
      '<div class="senko-utility-menu-items"></div>';
    items = menu.querySelector('.senko-utility-menu-items');

    headerActions.appendChild(trigger);
    headerActions.appendChild(menu);
    moveActions(headerActions);
    var quickCreate = document.getElementById('senkoGlobalCreateBtn');
    if (quickCreate) headerActions.insertBefore(quickCreate, trigger);
    observeDynamicActions();

    trigger.addEventListener('click', toggleMenu);
    items.addEventListener('click', function (event) {
      if (event.target.closest('button, a')) closeMenu(false);
    });
    document.addEventListener('click', function (event) {
      if (menu.hidden || menu.contains(event.target) || trigger.contains(event.target)) return;
      closeMenu(false);
    });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && !menu.hidden) closeMenu(true);
    });
  }

  document.addEventListener('DOMContentLoaded', initUtilityMenu);
})();
