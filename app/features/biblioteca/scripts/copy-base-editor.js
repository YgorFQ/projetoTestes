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
  var saving = false;
  var previousBodyOverflow = '';

  function getCopyApi() {
    var copyApi = window.SenkoBibliotecaCopyBase;
    return copyApi && typeof copyApi.getHtml === 'function' && typeof copyApi.setHtml === 'function'
      ? copyApi
      : null;
  }

  function getGithubApi() {
    var githubApi = window.SenkoBibliotecaGithubV2;
    return githubApi && typeof githubApi.saveCopyBaseTemplate === 'function'
      ? githubApi
      : null;
  }

  function setStatus(message, type) {
    statusEl.textContent = message || '';
    statusEl.dataset.type = type || '';
  }

  function updateSaveState() {
    saveButton.disabled =
      saving ||
      !textarea.value.trim() ||
      textarea.value === originalHtml;
  }

  function openModal() {
    var copyApi = getCopyApi();
    if (!copyApi) return;

    originalHtml = copyApi.getHtml();
    textarea.value = originalHtml;
    saving = false;
    setStatus('', '');
    updateSaveState();
    previousBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    overlay.hidden = false;
    window.setTimeout(function () {
      textarea.focus();
    }, 0);
  }

  function closeModal() {
    if (overlay.hidden || saving) return;
    if (textarea.value !== originalHtml &&
        !window.confirm('Descartar as alterações no HTML básico?')) {
      return;
    }

    overlay.hidden = true;
    document.body.style.overflow = previousBodyOverflow;
  }

  function serializeTemplate(html) {
    return (
      '// @ts-nocheck\n' +
      '/* Template editavel do HTML Basico, pertencente somente a Biblioteca. */\n' +
      'window.SenkoCopyBaseDefaultHtml = ' + JSON.stringify(html) + ';\n'
    );
  }

  function saveTemplate() {
    var copyApi = getCopyApi();
    var githubApi = getGithubApi();
    var nextHtml = textarea.value;

    if (!copyApi || !nextHtml.trim() || saving) return;
    if (!githubApi) {
      setStatus('A integração GitHub ainda está carregando.', 'error');
      return;
    }

    saving = true;
    updateSaveState();
    setStatus('Salvando no GitHub...', 'info');

    githubApi.saveCopyBaseTemplate(serializeTemplate(nextHtml)).then(function (result) {
      if (!result) {
        setStatus('Conclua a configuração do GitHub e salve novamente.', 'error');
        return;
      }

      copyApi.setHtml(nextHtml);
      originalHtml = nextHtml;
      setStatus('HTML básico atualizado no repositório.', 'ok');
    }).catch(function (error) {
      setStatus(error.message || 'Não foi possível salvar no GitHub.', 'error');
    }).finally(function () {
      saving = false;
      updateSaveState();
    });
  }

  function handleKeydown(event) {
    if (event.key === 'Escape' && !overlay.hidden) closeModal();
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
        !openButton || !closeButton || !cancelButton) {
      return;
    }

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
  };

  api.open = openModal;
})();
