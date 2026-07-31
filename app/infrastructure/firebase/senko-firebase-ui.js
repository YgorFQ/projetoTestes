(function () {
  var gate;
  var panelTitle;
  var panelMessage;
  var panelAction;
  var accountButton;
  var accountMenu;
  var exporterRegistered = false;
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
      accountMenu.hidden = !accountMenu.hidden;
      if (!accountMenu.hidden) positionAccountMenu();
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

  function registerGithubExporter() {
    if (exporterRegistered || !window.SenkoShell ||
        typeof window.SenkoShell.registerGlobalGithubExporter !== 'function') {
      return;
    }

    exporterRegistered = true;
    window.SenkoShell.registerGlobalGithubExporter({
      label: 'Backup no GitHub',
      isAvailable: function () {
        return window.SenkoFirebase.isReady();
      },
      run: function () {
        if (!window.confirm('Salvar agora um snapshot completo no GitHub?')) {
          return Promise.resolve({ cancelled: true });
        }

        showToast('Preparando backup no GitHub...');
        return window.SenkoFirebase.call('exportGithubSnapshot', {
          workspaceId: window.SenkoFirebase.getWorkspaceId(),
          force: true
        }).then(function (result) {
          if (result && result.skipped) {
            showToast('O GitHub ja esta atualizado.');
          } else {
            showToast('Backup salvo no GitHub.');
          }
          return result;
        }).catch(function (error) {
          showToast(error.message || String(error), true);
          throw error;
        });
      }
    });
  }

  function renderState(state) {
    ensureUi();

    if (!state.enabled || state.status === 'disabled') {
      gate.hidden = true;
      accountButton.hidden = true;
      return;
    }

    registerGithubExporter();
    panelAction.hidden = true;
    panelAction.disabled = false;
    accountButton.hidden = state.status !== 'ready';

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
        'Esta conta entrou corretamente, mas ainda nao foi adicionada como membro do SenkoLib.';
      panelAction.textContent = 'Entrar com outra conta';
      panelAction.hidden = false;
      return;
    }

    panelTitle.textContent = 'Firebase indisponivel';
    panelMessage.textContent = state.error && state.error.message
      ? state.error.message
      : 'Nao foi possivel conectar. Confira a configuracao e tente novamente.';
  }

  document.addEventListener('DOMContentLoaded', function () {
    if (!window.SenkoFirebase) return;
    window.SenkoFirebase.onStateChange(renderState);
  });
})();

