(function () {
  /*
   * Traduz o estado tecnico do Firebase para a experiencia de sessao.
   *
   * A tool possui quatro superficies: gate de login, menu da conta, badge da
   * fonte de dados e alerta de servico. Ela nao decide autorizacao; apenas
   * observa SenkoFirebase e SenkoDataMode e apresenta a proxima acao valida.
   */
  var gate;
  var panelTitle;
  var panelMessage;
  var panelAction;
  var accountButton;
  var accountMenu;
  var dataModeBadge;
  var serviceAlert;
  var currentState = null;
  var toastTimer;

  function ensureUi() {
    if (gate) return;

    gate = document.createElement('div');
    gate.className = 'senko-auth-gate';
    gate.hidden = true;
    gate.innerHTML =
      '<section class="senko-auth-panel" role="dialog" aria-modal="true" aria-labelledby="senkoAuthTitle">' +
      '  <img src="app/shared/assets/senko.png" alt="">' +
      '  <h1 id="senkoAuthTitle">Entrar no SenkoLib</h1>' +
      '  <p id="senkoAuthMessage">Conectando ao Firebase...</p>' +
      '  <button class="senko-auth-action" id="senkoAuthAction" type="button">Entrar com Google</button>' +
      '</section>';
    document.body.appendChild(gate);

    panelTitle = document.getElementById('senkoAuthTitle');
    panelMessage = document.getElementById('senkoAuthMessage');
    panelAction = document.getElementById('senkoAuthAction');
    panelAction.addEventListener('click', function () {
      panelAction.disabled = true;
      window.SenkoFirebase.signInWithGoogle().catch(function (error) {
        panelAction.disabled = false;
        showToast(error.message || String(error), true);
      });
    });

    accountButton = document.createElement('button');
    accountButton.className = 'theme-toggle senko-account-toggle';
    accountButton.type = 'button';
    accountButton.hidden = true;
    accountButton.title = 'Conta do SenkoLib';
    accountButton.setAttribute('aria-label', 'Abrir menu da conta');
    accountButton.innerHTML =
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">' +
      '<circle cx="12" cy="8" r="4"></circle><path d="M4 21a8 8 0 0 1 16 0"></path></svg>';

    var headerActions = document.querySelector('.header-actions');
    var themeButton = document.getElementById('themeToggleBtn');
    if (headerActions) headerActions.insertBefore(accountButton, themeButton || null);

    accountMenu = document.createElement('div');
    accountMenu.className = 'senko-account-menu';
    accountMenu.hidden = true;
    accountMenu.innerHTML =
      '<strong id="senkoAccountName"></strong>' +
      '<span id="senkoAccountEmail"></span>' +
      '<button class="senko-auth-action" id="senkoSignOutBtn" type="button">Sair</button>';
    document.body.appendChild(accountMenu);

    accountButton.addEventListener('click', function () {
      if (!currentState || currentState.status !== 'ready') {
        accountButton.disabled = true;
        window.SenkoFirebase.signInWithGoogle().catch(function (error) {
          showToast(error.message || String(error), true);
        }).finally(function () {
          accountButton.disabled = false;
        });
        return;
      }
      accountMenu.hidden = !accountMenu.hidden;
      if (!accountMenu.hidden) positionAccountMenu();
    });

    dataModeBadge = document.createElement('span');
    dataModeBadge.className = 'senko-data-mode-badge';
    dataModeBadge.hidden = true;
    dataModeBadge.innerHTML =
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">' +
      '<path d="M4 4h16v16H4z"></path><path d="M8 9h8M8 13h8M8 17h5"></path></svg>' +
      '<span>Somente leitura</span>';
    if (headerActions) headerActions.insertBefore(dataModeBadge, accountButton);

    serviceAlert = document.createElement('section');
    serviceAlert.className = 'senko-service-alert';
    serviceAlert.hidden = true;
    serviceAlert.setAttribute('role', 'alert');
    serviceAlert.setAttribute('aria-live', 'polite');
    serviceAlert.innerHTML =
      '<div class="senko-service-alert-inner">' +
      '  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">' +
      '    <path d="M12 3 2.5 20h19L12 3Z"></path><path d="M12 9v5"></path><path d="M12 17.5h.01"></path>' +
      '  </svg>' +
      '  <div><strong></strong><p></p></div>' +
      '  <button type="button" title="Recarregar e tentar conectar novamente">Tentar novamente</button>' +
      '</div>';
    var siteHeader = document.querySelector('.site-header');
    if (siteHeader) siteHeader.appendChild(serviceAlert);
    else document.body.insertBefore(serviceAlert, document.body.firstChild);

    serviceAlert.querySelector('button').addEventListener('click', function () {
      window.location.reload();
    });

    document.getElementById('senkoSignOutBtn').addEventListener('click', function () {
      accountMenu.hidden = true;
      window.SenkoFirebase.signOut();
    });

    window.addEventListener('resize', positionAccountMenu);
    document.addEventListener('click', function (event) {
      if (accountMenu.hidden) return;
      if (accountMenu.contains(event.target) || accountButton.contains(event.target)) return;
      accountMenu.hidden = true;
    });
  }

  function positionAccountMenu() {
    if (!accountButton || !accountMenu || accountMenu.hidden) return;
    var rect = accountButton.getBoundingClientRect();
    accountMenu.style.top = Math.round(rect.bottom + 8) + 'px';
    accountMenu.style.right = Math.max(16, Math.round(window.innerWidth - rect.right)) + 'px';
  }

  function showToast(message, isError) {
    var toast = document.querySelector('.senko-firebase-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'senko-firebase-toast';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.toggle('is-error', Boolean(isError));
    toast.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toast.hidden = true;
    }, 5000);
  }

  function formatBackupDate(manifest) {
    if (!manifest || !manifest.exportedAt) return 'data desconhecida';
    var exportedAt = new Date(manifest.exportedAt);
    return Number.isNaN(exportedAt.getTime())
      ? 'data desconhecida'
      : exportedAt.toLocaleString('pt-BR');
  }

  function renderServiceStatus(issue, usingStatic, manifest) {
    var badgeLabel = dataModeBadge.querySelector('span');
    var backupDate = formatBackupDate(manifest);

    dataModeBadge.classList.toggle('is-issue', Boolean(issue));
    if (issue) dataModeBadge.dataset.issueKind = issue.kind || 'error';
    else delete dataModeBadge.dataset.issueKind;

    if (!issue) {
      badgeLabel.textContent = 'Somente leitura';
      serviceAlert.hidden = true;
      return;
    }

    var labels = {
      quota: 'Limite atingido',
      offline: 'Sem conexao',
      unavailable: 'Firebase fora do ar',
      error: 'Falha no Firebase'
    };
    badgeLabel.textContent = labels[issue.kind] || labels.error;
    dataModeBadge.title = issue.title || labels.error;

    var detail = issue.message || 'Nao foi possivel acessar os dados ao vivo.';
    detail += usingStatic
      ? ' Exibindo o backup de ' + backupDate + ' em somente leitura.'
      : ' Nenhum backup publico esta disponivel neste navegador.';

    serviceAlert.className = 'senko-service-alert is-' + (issue.kind || 'error');
    serviceAlert.querySelector('strong').textContent = issue.title || labels.error;
    serviceAlert.querySelector('p').textContent = detail;
    serviceAlert.hidden = false;
  }

  function renderState(state) {
    ensureUi();
    currentState = state;

    var hasStaticSnapshot = window.SenkoDataMode &&
      window.SenkoDataMode.hasStaticSnapshot &&
      window.SenkoDataMode.hasStaticSnapshot();
    var usingStatic = state.status !== 'ready' && hasStaticSnapshot;
    var manifest = usingStatic && window.SenkoDataMode.getManifest
      ? window.SenkoDataMode.getManifest()
      : null;
    var serviceIssue = state.serviceIssue || null;

    dataModeBadge.hidden = !usingStatic;
    if (usingStatic) {
      dataModeBadge.title = 'Backup publico de ' + formatBackupDate(manifest);
    }
    renderServiceStatus(serviceIssue, usingStatic, manifest);

    if (!state.enabled || state.status === 'disabled') {
      gate.hidden = hasStaticSnapshot;
      accountButton.hidden = true;
      return;
    }

    panelAction.hidden = true;
    panelAction.disabled = false;
    accountButton.hidden = false;
    accountButton.disabled = state.status === 'loading' || state.status === 'checking-access';

    if (state.status === 'ready') {
      gate.hidden = true;
      var user = state.user || {};
      document.getElementById('senkoAccountName').textContent =
        user.displayName || 'Membro do SenkoLib';
      document.getElementById('senkoAccountEmail').textContent = user.email || '';
      if (user.photoURL) {
        accountButton.innerHTML = '<img src="' + user.photoURL.replace(/"/g, '&quot;') + '" alt="">';
      }
      if (window.SenkoShell && typeof window.SenkoShell.refreshGithubButton === 'function') {
        window.SenkoShell.refreshGithubButton();
      }
      return;
    }

    accountButton.innerHTML =
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">' +
      '<circle cx="12" cy="8" r="4"></circle><path d="M4 21a8 8 0 0 1 16 0"></path></svg>';
    accountButton.title = state.status === 'unauthorized'
      ? 'Entrar com outra conta para editar'
      : 'Entrar para editar';
    accountButton.setAttribute('aria-label', accountButton.title);

    if (usingStatic) {
      gate.hidden = true;
      accountMenu.hidden = true;
      if (window.SenkoShell && typeof window.SenkoShell.refreshGithubButton === 'function') {
        window.SenkoShell.refreshGithubButton();
      }
      return;
    }

    gate.hidden = false;
    panelTitle.textContent = 'Entrar no SenkoLib';

    if (state.status === 'loading' || state.status === 'checking-access') {
      panelMessage.textContent = state.status === 'loading'
        ? 'Conectando ao Firebase...'
        : 'Verificando se sua conta recebeu acesso...';
      return;
    }

    if (state.status === 'signed-out') {
      panelMessage.textContent =
        'Use uma conta Google convidada para acessar os dados compartilhados.';
      panelAction.textContent = 'Entrar com Google';
      panelAction.hidden = false;
      return;
    }

    if (state.status === 'unauthorized') {
      panelTitle.textContent = 'Conta sem acesso';
      panelMessage.textContent =
        'Esta conta entrou corretamente, mas ainda nao foi adicionada. O responsavel pode ver esta solicitacao no Firebase.';
      panelAction.textContent = 'Entrar com outra conta';
      panelAction.hidden = false;
      return;
    }

    panelTitle.textContent = 'Firebase indisponivel';
    panelMessage.textContent = state.error && state.error.message
      ? state.error.message
      : 'Nao foi possivel conectar. Confira a configuracao e tente novamente.';
  }

  window.SenkoSessionUi = {
    showToast: showToast
  };

  document.addEventListener('DOMContentLoaded', function () {
    if (!window.SenkoFirebase) return;
    window.SenkoFirebase.onStateChange(renderState);
  });
})();
