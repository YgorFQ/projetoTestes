(function () {
  'use strict';

  var api = window.SenkoBibliotecaCopyBaseEditor =
    window.SenkoBibliotecaCopyBaseEditor || {};
  var initialized = false;
  var overlay;
  var textarea;
  var statusEl;
  var saveButton;
  var originalHtml = '';
  var originalVersion = 0;
  var saving = false;
  var previousBodyOverflow = '';
  var previousFocus = null;

  function getCopyApi() {
    var copyApi = window.SenkoBibliotecaCopyBase;
    return copyApi && typeof copyApi.getTemplate === 'function' &&
      typeof copyApi.setTemplate === 'function'
      ? copyApi
      : null;
  }

  function getRepository() {
    var repository = window.SenkoBibliotecaFirebase;
    return repository && typeof repository.saveCopyBaseTemplate === 'function'
      ? repository
      : null;
  }

  function canWrite() {
    return Boolean(
      getRepository() &&
      window.SenkoDataMode &&
      window.SenkoDataMode.isFirebase()
    );
  }

  function setStatus(message, type) {
    statusEl.textContent = message || '';
    statusEl.dataset.type = type || '';
  }

  function isDirty() {
    return textarea.value !== originalHtml;
  }

  function updateSaveState() {
    saveButton.disabled = saving || !canWrite() || !textarea.value.trim() || !isDirty();
  }

  function openModal() {
    var copyApi = getCopyApi();
    if (!copyApi) return;

    var current = copyApi.getTemplate();
    originalHtml = current.html;
    originalVersion = Number(current.version || 0);
    textarea.value = originalHtml;
    saving = false;
    setStatus(
      canWrite() ? '' : 'Entre com uma conta autorizada para editar no Firebase.',
      canWrite() ? '' : 'info'
    );
    updateSaveState();
    previousFocus = document.activeElement;
    previousBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    overlay.hidden = false;
    window.setTimeout(function () {
      textarea.focus();
    }, 0);
  }

  function closeModal() {
    if (overlay.hidden || saving) return;
    if (isDirty() && !window.confirm('Descartar as alterações no HTML básico?')) return;

    overlay.hidden = true;
    document.body.style.overflow = previousBodyOverflow;
    if (previousFocus && typeof previousFocus.focus === 'function') previousFocus.focus();
  }

  function saveTemplate() {
    var copyApi = getCopyApi();
    var repository = getRepository();
    var nextHtml = textarea.value;

    if (!copyApi || !repository || !nextHtml.trim() || saving || !canWrite()) return;

    saving = true;
    updateSaveState();
    setStatus('Salvando no Firebase...', 'info');

    repository.saveCopyBaseTemplate({
      html: nextHtml,
      expectedVersion: originalVersion
    }).then(function (result) {
      originalHtml = nextHtml;
      originalVersion = Number(result.version || originalVersion + 1);
      copyApi.setTemplate({
        html: nextHtml,
        version: originalVersion
      }, 'firebase');
      setStatus('HTML básico atualizado para toda a equipe.', 'ok');
    }).catch(function (error) {
      var conflict = error && String(error.code || '').indexOf('aborted') !== -1;
      setStatus(
        conflict
          ? 'Outra pessoa salvou uma versão mais recente. Seu rascunho foi preservado.'
          : (error.message || 'Não foi possível salvar no Firebase.'),
        'error'
      );
    }).finally(function () {
      saving = false;
      updateSaveState();
    });
  }

  function handleRemoteTemplate(event) {
    if (overlay.hidden || saving || !event.detail) return;
    var next = event.detail;
    if (Number(next.version || 0) === originalVersion && next.html === originalHtml) return;

    if (!isDirty()) {
      originalHtml = next.html;
      originalVersion = Number(next.version || 0);
      textarea.value = originalHtml;
      setStatus('A versão mais recente foi carregada.', 'info');
      updateSaveState();
      return;
    }

    setStatus(
      'Outra pessoa atualizou o HTML básico. Seu rascunho foi preservado; compare antes de salvar.',
      'error'
    );
  }

  function handleKeydown(event) {
    if (overlay.hidden) return;
    if (event.key === 'Escape') {
      closeModal();
      return;
    }
    if (event.key !== 'Tab') return;

    var focusable = Array.from(overlay.querySelectorAll(
      'button:not([disabled]), textarea:not([disabled])'
    ));
    if (!focusable.length) return;
    var first = focusable[0];
    var last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  api.init = function initCopyBaseEditor() {
    if (initialized) return;

    overlay = document.getElementById('copyBaseEditorOverlay');
    textarea = document.getElementById('copyBaseEditorTextarea');
    statusEl = document.getElementById('copyBaseEditorStatus');
    saveButton = document.getElementById('copyBaseEditorSave');

    var openButton = document.getElementById('copyBaseEditBtn');
    var closeButton = document.getElementById('copyBaseEditorClose');
    var cancelButton = document.getElementById('copyBaseEditorCancel');

    if (!overlay || !textarea || !statusEl || !saveButton ||
        !openButton || !closeButton || !cancelButton) return;

    initialized = true;
    openButton.addEventListener('click', openModal);
    closeButton.addEventListener('click', closeModal);
    cancelButton.addEventListener('click', closeModal);
    saveButton.addEventListener('click', saveTemplate);
    textarea.addEventListener('input', updateSaveState);
    overlay.addEventListener('click', function (event) {
      if (event.target === overlay) closeModal();
    });
    document.addEventListener('keydown', handleKeydown);
    window.addEventListener('senko:copy-base-change', handleRemoteTemplate);
    window.addEventListener('senko:data-mode', updateSaveState);
  };

  api.open = openModal;
})();
