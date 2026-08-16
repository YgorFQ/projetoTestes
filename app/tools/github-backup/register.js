(function () {
  /*
   * Interface do backup manual para GitHub.
   *
   * O dialogo coleta destino e token pessoal, chama a API publica de backup e
   * descarta a UI ao terminar. O token nunca entra nos arquivos gerados nem em
   * mensagens de erro. Backup e independente do salvamento Firestore: falha
   * no GitHub nao desfaz nem bloqueia uma alteracao ja salva.
   */
  var registered = false;

  function showToast(message, isError) {
    if (window.SenkoSessionUi && window.SenkoSessionUi.showToast) {
      window.SenkoSessionUi.showToast(message, isError);
    }
  }

  function githubIcon() {
    return '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">' +
      '<path d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.17c-3.34.73-4.04-1.42-4.04-1.42-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.74.08-.74 1.21.09 1.85 1.24 1.85 1.24 1.07 1.84 2.82 1.31 3.51 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.62-5.49 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12 12 0 0 0 12 .5Z" />' +
      '</svg>';
  }

  function openDialog() {
    return new Promise(function (resolve) {
      var api = window.SenkoGithubBackup;
      var defaults = api.getDefaults();
      var overlay = document.createElement('div');
      overlay.className = 'senko-github-backup-overlay';
      overlay.innerHTML =
        '<section class="senko-github-backup-dialog" role="dialog" aria-modal="true" aria-labelledby="senkoGithubBackupTitle">' +
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
        '    <footer><button class="senko-github-backup-cancel" type="button">Cancelar</button>' +
        '      <button class="senko-auth-action" type="submit">' + githubIcon() + 'Fazer backup</button></footer>' +
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

        Array.prototype.forEach.call(form.elements, function (control) { control.disabled = true; });
        status.textContent = 'Iniciando backup...';
        showToast('Preparando backup no GitHub...');
        api.run({
          credentials: credentials,
          onProgress: function (message) { status.textContent = message; }
        }).then(function (result) {
          showToast(result && result.metadataRecorded === false
            ? 'Backup salvo no GitHub, mas o Firebase nao registrou o commit.'
            : 'Backup salvo no GitHub.');
          close(result);
        }).catch(function (error) {
          Array.prototype.forEach.call(form.elements, function (control) { control.disabled = false; });
          status.textContent = error.message || String(error);
          status.classList.add('is-error');
          showToast(status.textContent, true);
        });
      });

      form.elements.token.focus();
      form.elements.token.select();
    });
  }

  function register() {
    if (registered || !window.SenkoShell ||
        typeof window.SenkoShell.registerGlobalGithubExporter !== 'function') return;
    registered = true;
    window.SenkoShell.registerGlobalGithubExporter({
      label: 'Backup no GitHub',
      isAvailable: function () {
        return window.SenkoFirebase.isReady() && Boolean(window.SenkoGithubBackup);
      },
      run: openDialog
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', register);
  else register();
})();
