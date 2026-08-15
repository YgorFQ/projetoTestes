(function () {
  var gate;
  var panelTitle;
  var panelMessage;
  var panelAction;
  var accountButton;
  var accountMenu;
  var dataModeBadge;
  var currentState = null;
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

  function githubIcon() {
    return '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">' +
      '<path d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.17c-3.34.73-4.04-1.42-4.04-1.42-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.74.08-.74 1.21.09 1.85 1.24 1.85 1.24 1.07 1.84 2.82 1.31 3.51 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.62-5.49 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12 12 0 0 0 12 .5Z" />' +
      '</svg>';
  }

  function openGithubBackupDialog() {
    return new Promise(function (resolve) {
      var api = window.SenkoGithubBackup;
      var defaults = api.getDefaults();
      var overlay = document.createElement('div');
      overlay.className = 'senko-github-backup-overlay';
      overlay.innerHTML =
        '<section class="senko-github-backup-dialog" role="dialog" aria-modal="true" ' +
        'aria-labelledby="senkoGithubBackupTitle">' +
        '  <header><span class="senko-github-backup-icon">' + githubIcon() + '</span>' +
        '    <div><h2 id="senkoGithubBackupTitle">Backup no GitHub</h2>' +
        '    <p>Snapshot restauravel + copia publica</p></div></header>' +
        '  <form>' +
        '    <div class="senko-github-backup-grid">' +
        '      <label>Owner<input name="owner" autocomplete="off" required></label>' +
        '      <label>Repositorio<input name="repo" autocomplete="off" required></label>' +
        '    </div>' +
        '    <label>Branch<input name="branch" autocomplete="off" required></label>' +
        '    <p class="senko-github-backup-note" hidden>Destino fixo do projeto. O token continua sendo individual.</p>' +
        '    <label>Token pessoal<input name="token" type="password" autocomplete="off" required></label>' +
        '    <p class="senko-github-backup-status" aria-live="polite"></p>' +
        '    <footer>' +
        '      <button class="senko-github-backup-cancel" type="button">Cancelar</button>' +
        '      <button class="senko-auth-action" type="submit">' + githubIcon() + 'Fazer backup</button>' +
        '    </footer>' +
        '  </form>' +
        '</section>';
      document.body.appendChild(overlay);

      var form = overlay.querySelector('form');
      var cancelButton = overlay.querySelector('.senko-github-backup-cancel');
      var submitButton = form.querySelector('[type="submit"]');
      var status = overlay.querySelector('.senko-github-backup-status');
      var closed = false;

      form.elements.owner.value = defaults.owner || '';
      form.elements.repo.value = defaults.repo || '';
      form.elements.branch.value = defaults.branch || 'main';
      form.elements.token.value = api.getToken();

      if (typeof api.isDestinationFixed === 'function' && api.isDestinationFixed()) {
        form.elements.owner.readOnly = true;
        form.elements.repo.readOnly = true;
        form.elements.branch.readOnly = true;
        overlay.querySelector('.senko-github-backup-note').hidden = false;
      }

      function close(result) {
        if (closed) return;
        closed = true;
        document.removeEventListener('keydown', onKeydown);
        overlay.remove();
        resolve(result || { cancelled: true });
      }

      function onKeydown(event) {
        if (event.key === 'Escape' && !submitButton.disabled) close();
      }

      cancelButton.addEventListener('click', function () { close(); });
      overlay.addEventListener('click', function (event) {
        if (event.target === overlay && !submitButton.disabled) close();
      });
      document.addEventListener('keydown', onKeydown);

      form.addEventListener('submit', function (event) {
        event.preventDefault();
        status.classList.remove('is-error');

        var credentials;
        try {
          credentials = api.saveCredentials({
            owner: form.elements.owner.value,
            repo: form.elements.repo.value,
            branch: form.elements.branch.value,
            token: form.elements.token.value
          });
        } catch (error) {
          status.textContent = error.message || String(error);
          status.classList.add('is-error');
          return;
        }

        Array.prototype.forEach.call(form.elements, function (control) {
          control.disabled = true;
        });
        status.textContent = 'Iniciando backup...';
        showToast('Preparando backup no GitHub...');

        api.run({
          credentials: credentials,
          onProgress: function (message) {
            status.textContent = message;
          }
        }).then(function (result) {
          showToast(result && result.metadataRecorded === false
            ? 'Backup salvo no GitHub, mas o Firebase nao registrou o commit.'
            : 'Backup salvo no GitHub.');
          close(result);
        }).catch(function (error) {
          Array.prototype.forEach.call(form.elements, function (control) {
            control.disabled = false;
          });
          status.textContent = error.message || String(error);
          status.classList.add('is-error');
          showToast(status.textContent, true);
        });
      });

      form.elements.token.focus();
      form.elements.token.select();
    });
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
        return window.SenkoFirebase.isReady() && Boolean(window.SenkoGithubBackup);
      },
      run: function () {
        return openGithubBackupDialog();
      }
    });
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

    dataModeBadge.hidden = !usingStatic;
    if (usingStatic) {
      var exportedAt = manifest && manifest.exportedAt
        ? new Date(manifest.exportedAt).toLocaleString('pt-BR')
        : 'data desconhecida';
      dataModeBadge.title = 'Backup publico de ' + exportedAt;
    }

    if (!state.enabled || state.status === 'disabled') {
      gate.hidden = hasStaticSnapshot;
      accountButton.hidden = true;
      return;
    }

    registerGithubExporter();
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
