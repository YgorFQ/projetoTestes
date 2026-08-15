// @ts-nocheck
/*
 * Editor amplo para layouts completos de Colecoes.
 *
 * A experiencia acompanha o editor oficial da Biblioteca, mas toda a
 * implementacao permanece dentro de Colecoes. Nenhuma funcao, classe ou
 * folha de estilos da Biblioteca e importada aqui.
 */
(function () {
  var state = {
    collection: null,
    layout: null,
    html: '',
    originalName: '',
    originalHtml: '',
    width: 1200,
    timer: null,
    presenceLeave: null,
    presenceToken: 0
  };

  function buildPreviewDoc(html) {
    if (typeof colBuildSrcDoc === 'function') return colBuildSrcDoc(html, '');
    return '<!DOCTYPE html><html><head><meta charset="UTF-8">'
      + '<meta name="viewport" content="width=device-width, initial-scale=1.0">'
      + '<style>html,body{margin:0;padding:0;}</style>'
      + '</head><body>' + (html || '') + '</body></html>';
  }

  function mergeLegacyCssIntoHtml(html, css) {
    var nextHtml = html || '';
    var legacyCss = (css || '').trim();
    if (!legacyCss) return nextHtml;

    var styleBlock = /<style(?:\s|>)/i.test(legacyCss)
      ? legacyCss
      : '<style data-senko-legacy-css>\n' + legacyCss + '\n</style>';
    if (/<\/head\s*>/i.test(nextHtml)) {
      return nextHtml.replace(/<\/head\s*>/i, styleBlock + '\n</head>');
    }
    return styleBlock + '\n' + nextHtml;
  }

  function isReadOnlyMode() {
    return Boolean(window.SenkoDataMode && window.SenkoDataMode.isReadOnly());
  }

  function applyReadOnlyMode() {
    var readOnly = isReadOnlyMode();
    var nameInput = document.getElementById('colEditLayoutName');
    var codeEditor = document.getElementById('colEditLayoutCode');
    if (nameInput) nameInput.readOnly = readOnly;
    if (codeEditor) codeEditor.readOnly = readOnly;
    var heading = document.getElementById('colEditLayoutHeading');
    if (heading) heading.textContent = readOnly ? 'Visualizar layout completo' : 'Editar layout completo';
    var dirtyLabel = document.getElementById('colEditLayoutDirtyLabel');
    if (dirtyLabel && readOnly) dirtyLabel.textContent = 'Somente leitura';
  }

  function ensure() {
    var existing = document.getElementById('colEditLayoutOverlay');
    if (existing) return existing;

    var overlay = document.createElement('div');
    overlay.id = 'colEditLayoutOverlay';
    overlay.className = 'modal-overlay collection-layout-editor-overlay hidden';
    overlay.innerHTML =
      '<div class="collection-layout-editor-modal" id="colEditLayoutModal" role="dialog" aria-modal="true" aria-labelledby="colEditLayoutHeading">' +
        '<div class="collection-layout-editor-topbar">' +
          '<div class="collection-layout-editor-title-area">' +
            '<div class="collection-layout-editor-kicker">Colecoes · Editor</div>' +
            '<div class="collection-layout-editor-name-row">' +
              '<div class="collection-layout-editor-heading" id="colEditLayoutHeading">Editar layout completo</div>' +
              '<div class="collection-layout-editor-file-pill" id="colEditLayoutFilePill"></div>' +
            '</div>' +
            '<div class="collection-layout-editor-presence" id="colEditLayoutPresence">Conectando pessoas...</div>' +
          '</div>' +
          '<div class="collection-layout-editor-actions">' +
            '<span class="collection-layout-editor-action-anchor" id="colEditLayoutDelAnchor"></span>' +
            '<span class="collection-layout-editor-action-anchor" id="colEditLayoutGhAnchor"></span>' +
            '<button class="collection-layout-editor-btn" id="colEditLayoutCopyHtml" type="button">Copiar HTML</button>' +
            '<button class="collection-layout-editor-btn collection-layout-editor-icon-btn" id="colEditLayoutClose" type="button" title="Fechar" aria-label="Fechar editor">×</button>' +
          '</div>' +
        '</div>' +
        '<div class="collection-layout-editor-body" id="colEditLayoutBody">' +
          '<section class="collection-layout-editor-pane collection-layout-editor-code-pane" aria-label="Codigo do layout">' +
            '<input id="colEditLayoutId" type="hidden" />' +
            '<div class="collection-layout-editor-meta-grid">' +
              '<div class="collection-layout-editor-field">' +
                '<label for="colEditLayoutCollection">Colecao</label>' +
                '<input id="colEditLayoutCollection" type="text" readonly />' +
              '</div>' +
              '<div class="collection-layout-editor-field">' +
                '<label for="colEditLayoutName">Nome</label>' +
                '<input class="collection-layout-editor-name-input" id="colEditLayoutName" type="text" autocomplete="off" />' +
                '<span class="collection-layout-editor-field-error" id="colEditLayoutNameErr"></span>' +
              '</div>' +
            '</div>' +
            '<div class="collection-layout-editor-tabs">' +
              '<div class="collection-layout-editor-code-type">HTML completo</div>' +
              '<div class="collection-layout-editor-live-label" id="colEditLayoutDirtyLabel">Pronto para editar</div>' +
            '</div>' +
            '<div class="collection-layout-editor-code-wrap">' +
              '<div class="collection-layout-editor-code-head">' +
                '<span id="colEditLayoutCodeLabel">layout.html</span>' +
                '<span id="colEditLayoutStatusLabel" role="status" aria-live="polite">Sem alteracoes</span>' +
              '</div>' +
              '<textarea class="collection-layout-editor-code" id="colEditLayoutCode" spellcheck="false" aria-label="Codigo HTML do layout"></textarea>' +
            '</div>' +
          '</section>' +
          '<section class="collection-layout-editor-pane collection-layout-editor-preview-pane" aria-label="Preview do layout">' +
            '<div class="collection-layout-editor-preview-toolbar">' +
              '<div class="collection-layout-editor-preview-title">' +
                '<span class="collection-layout-editor-dot" aria-hidden="true"></span>' +
                '<span>Visualizacao</span>' +
              '</div>' +
              '<div class="collection-layout-editor-size-tools">' +
                '<button class="collection-layout-editor-seg" type="button" data-col-editor-width="390">390</button>' +
                '<button class="collection-layout-editor-seg" type="button" data-col-editor-width="760">760</button>' +
                '<button class="collection-layout-editor-seg active" type="button" data-col-editor-width="1200">1200</button>' +
                '<button class="collection-layout-editor-seg" type="button" data-col-editor-width="1500">1500</button>' +
                '<label class="collection-layout-editor-width-control" for="colEditLayoutWidthRange">' +
                  '<input id="colEditLayoutWidthRange" type="range" min="340" max="1500" value="1200" />' +
                  '<input class="collection-layout-editor-width-number" id="colEditLayoutWidthNumber" type="number" min="340" max="1500" value="1200" aria-label="Largura do preview em pixels" />' +
                  '<span class="collection-layout-editor-zoom-label" id="colEditLayoutZoomLabel">100%</span>' +
                '</label>' +
                '<button class="collection-layout-editor-btn collection-layout-editor-icon-btn" id="colEditLayoutRefresh" type="button" title="Recarregar preview" aria-label="Recarregar preview">↻</button>' +
              '</div>' +
            '</div>' +
            '<div class="collection-layout-editor-preview-stage" id="colEditLayoutPreviewStage">' +
              '<div class="collection-layout-editor-device-shell" id="colEditLayoutDeviceShell">' +
                '<div class="collection-layout-editor-device-scale" id="colEditLayoutDeviceScale">' +
                  '<div class="collection-layout-editor-device-frame" id="colEditLayoutDeviceFrame">' +
                    '<iframe class="collection-layout-editor-preview-iframe" id="colEditLayoutPreview" title="Preview do layout da colecao" sandbox="allow-scripts"></iframe>' +
                  '</div>' +
                '</div>' +
              '</div>' +
            '</div>' +
          '</section>' +
          '<nav class="collection-layout-editor-mobile-tabs" aria-label="Navegacao do editor">' +
            '<button class="active" type="button" data-col-editor-mobile="html">HTML</button>' +
            '<button type="button" data-col-editor-mobile="preview">Preview</button>' +
          '</nav>' +
        '</div>' +
      '</div>';

    document.body.appendChild(overlay);
    bindEvents();
    if (window.SenkoColecoesFirebaseControls) window.SenkoColecoesFirebaseControls.refresh();
    return overlay;
  }

  function clampWidth(value) {
    var width = Number(value);
    if (!Number.isFinite(width)) width = 1200;
    return Math.max(340, Math.min(1500, Math.round(width)));
  }

  function syncCode() {
    var editor = document.getElementById('colEditLayoutCode');
    if (!editor) return;
    state.html = editor.value;
  }

  function currentName() {
    var input = document.getElementById('colEditLayoutName');
    return input ? input.value.replace(/\r?\n/g, ' ').trim() : '';
  }

  function isDirty() {
    syncCode();
    return currentName() !== state.originalName
      || state.html !== state.originalHtml;
  }

  function updateDirtyState() {
    if (isReadOnlyMode()) {
      var readOnlyDirtyLabel = document.getElementById('colEditLayoutDirtyLabel');
      if (readOnlyDirtyLabel) readOnlyDirtyLabel.textContent = 'Somente leitura';
      return;
    }
    var dirty = isDirty();
    var dirtyLabel = document.getElementById('colEditLayoutDirtyLabel');
    var statusLabel = document.getElementById('colEditLayoutStatusLabel');
    if (dirtyLabel) dirtyLabel.textContent = dirty ? 'Alteracoes pendentes' : 'Pronto para editar';
    if (statusLabel) statusLabel.textContent = dirty ? 'Ainda nao salvo' : 'Sem alteracoes';
  }

  function refreshPreview() {
    syncCode();
    var iframe = document.getElementById('colEditLayoutPreview');
    if (iframe) iframe.srcdoc = buildPreviewDoc(state.html);
  }

  function schedulePreview() {
    clearTimeout(state.timer);
    state.timer = setTimeout(refreshPreview, 150);
  }

  function resizePreviewHeight() {
    var iframe = document.getElementById('colEditLayoutPreview');
    if (!iframe) return;
    try {
      var previewDocument = iframe.contentDocument || iframe.contentWindow.document;
      iframe.style.height = Math.max(
        540,
        previewDocument.documentElement.scrollHeight,
        previewDocument.body ? previewDocument.body.scrollHeight : 0
      ) + 'px';
    } catch (error) {
      iframe.style.height = '540px';
    }
    fitPreview();
  }

  function fitPreview() {
    var stage = document.getElementById('colEditLayoutPreviewStage');
    var shell = document.getElementById('colEditLayoutDeviceShell');
    var scaleElement = document.getElementById('colEditLayoutDeviceScale');
    var frame = document.getElementById('colEditLayoutDeviceFrame');
    var iframe = document.getElementById('colEditLayoutPreview');
    var zoomLabel = document.getElementById('colEditLayoutZoomLabel');
    if (!stage || !shell || !scaleElement || !frame || !iframe || !zoomLabel) return;

    var availableWidth = stage.clientWidth - 2;
    if (availableWidth < 40) return;

    var scale = Math.min(1, availableWidth / state.width);
    var frameHeight = Math.max(540, iframe.offsetHeight || frame.offsetHeight || 540);
    frame.style.width = state.width + 'px';
    scaleElement.style.width = state.width + 'px';
    scaleElement.style.transform = 'translateX(-50%) scale(' + scale + ')';
    shell.style.width = Math.ceil(state.width * scale) + 'px';
    shell.style.height = Math.ceil(frameHeight * scale) + 'px';
    zoomLabel.textContent = Math.round(scale * 100) + '%';
  }

  function setPreviewWidth(value) {
    state.width = clampWidth(value);
    document.getElementById('colEditLayoutWidthRange').value = state.width;
    document.getElementById('colEditLayoutWidthNumber').value = state.width;
    document.querySelectorAll('#colEditLayoutModal [data-col-editor-width]').forEach(function (button) {
      button.classList.toggle('active', Number(button.dataset.colEditorWidth) === state.width);
    });
    fitPreview();
  }

  function setMobileView(view) {
    var body = document.getElementById('colEditLayoutBody');
    document.querySelectorAll('#colEditLayoutModal [data-col-editor-mobile]').forEach(function (button) {
      button.classList.toggle('active', button.dataset.colEditorMobile === view);
    });
    body.classList.toggle('show-preview', view === 'preview');
    if (view === 'preview') {
      refreshPreview();
      setTimeout(fitPreview, 0);
      return;
    }
    body.classList.remove('show-preview');
  }

  function copyHtml(button) {
    syncCode();
    if (typeof _colCopyToClipboard === 'function') {
      _colCopyToClipboard(state.html, button, 'Copiar HTML');
      return;
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(state.html);
    }
  }

  function validateName(showIssue) {
    var id = state.layout ? state.layout.id : '';
    var slug = state.collection ? state.collection.slug : '';
    var name = currentName();
    var message = '';
    if (!name) message = 'Nome obrigatorio';
    else if (typeof _colLayoutNameExists === 'function' && _colLayoutNameExists(slug, name, id)) {
      message = 'Ja existe outro layout com esse nome nesta colecao';
    }
    if (showIssue && typeof _colSetFieldIssue === 'function') {
      _colSetFieldIssue('colEditLayoutNameErr', message);
    }
    return message;
  }

  function getData() {
    syncCode();
    var issue = validateName(true);
    if (!issue && !state.html.trim()) {
      issue = 'O HTML do layout nao pode ficar vazio.';
      setStatus(issue);
    }
    if (issue) return null;
    return {
      id: state.layout ? state.layout.id : '',
      name: currentName(),
      html: state.html,
      css: ''
    };
  }

  function setStatus(message) {
    var label = document.getElementById('colEditLayoutStatusLabel');
    if (label) label.textContent = message || '';
  }

  function stopPresence() {
    state.presenceToken += 1;
    if (typeof state.presenceLeave === 'function') state.presenceLeave();
    state.presenceLeave = null;
  }

  function renderPresence(people) {
    var element = document.getElementById('colEditLayoutPresence');
    if (!element) return;
    var firebaseState = window.SenkoFirebase && window.SenkoFirebase.getState
      ? window.SenkoFirebase.getState()
      : null;
    var currentUid = firebaseState && firebaseState.user ? firebaseState.user.uid : '';
    var currentPerson = (people || []).find(function (person) { return person.uid === currentUid; });
    var ownExtraSessions = currentPerson ? Math.max((currentPerson.sessionCount || 1) - 1, 0) : 0;
    var others = (people || []).filter(function (person) { return person.uid !== currentUid; });
    var otherEditorCount = others.length + ownExtraSessions;
    if (!otherEditorCount) {
      element.textContent = 'So voce neste editor';
      element.classList.remove('has-others');
      element.title = '';
      return;
    }
    var names = others.map(function (person) { return person.displayName; });
    if (ownExtraSessions) {
      names.push(ownExtraSessions === 1 ? 'outra sessao sua' : ownExtraSessions + ' outras sessoes suas');
    }
    if (otherEditorCount === 1) {
      element.textContent = ownExtraSessions
        ? 'Outra sessao sua tambem esta editando'
        : names[0] + ' tambem esta editando';
    } else {
      element.textContent = otherEditorCount + ' outras sessoes tambem estao editando';
    }
    element.classList.add('has-others');
    element.title = names.join(', ');
  }

  function startPresence() {
    stopPresence();
    if (isReadOnlyMode()) {
      var readOnlyPresence = document.getElementById('colEditLayoutPresence');
      if (readOnlyPresence) {
        readOnlyPresence.hidden = false;
        readOnlyPresence.textContent = 'Backup publico';
      }
      return;
    }
    var repository = window.SenkoColecoesFirebase;
    var presenceElement = document.getElementById('colEditLayoutPresence');
    if (!repository || !state.collection || !state.layout ||
        typeof repository.enterEditor !== 'function') {
      if (presenceElement) presenceElement.hidden = true;
      return;
    }
    var token = state.presenceToken;
    if (presenceElement) presenceElement.hidden = false;
    renderPresence([]);
    repository.enterEditor(state.collection.slug, state.layout.id, renderPresence).then(function (leave) {
      if (token !== state.presenceToken || !isOpen()) {
        if (typeof leave === 'function') leave();
        return;
      }
      state.presenceLeave = leave;
    }).catch(function (error) {
      console.error('[Colecoes] Presenca indisponivel:', error);
      if (presenceElement) presenceElement.textContent = 'Presenca indisponivel';
    });
  }

  function isOpen() {
    var overlay = document.getElementById('colEditLayoutOverlay');
    return Boolean(overlay && !overlay.classList.contains('hidden'));
  }

  function close() {
    stopPresence();
    clearTimeout(state.timer);
    var overlay = document.getElementById('colEditLayoutOverlay');
    if (overlay) overlay.classList.add('hidden');
    if (document.querySelectorAll('.modal-overlay:not(.hidden)').length === 0) {
      document.body.style.overflow = '';
    }
  }

  function open(collection, layout) {
    ensure();
    state.collection = collection;
    state.layout = layout;
    state.html = mergeLegacyCssIntoHtml(
      layout && layout.html ? layout.html : '',
      layout && layout.css ? layout.css : ''
    );
    state.originalName = layout && layout.name ? layout.name : '';
    state.originalHtml = state.html;
    state.width = 1200;

    document.getElementById('colEditLayoutId').value = layout && layout.id ? layout.id : '';
    document.getElementById('colEditLayoutName').value = state.originalName;
    document.getElementById('colEditLayoutCollection').value =
      collection && collection.name ? collection.name : '';
    document.getElementById('colEditLayoutFilePill').textContent =
      (collection && collection.slug ? collection.slug : 'colecao') + '/'
      + (layout && layout.id ? layout.id : 'layout') + '.js';
    if (typeof _colSetFieldIssue === 'function') _colSetFieldIssue('colEditLayoutNameErr', '');

    document.getElementById('colEditLayoutCode').value = state.html;
    applyReadOnlyMode();
    setMobileView('html');
    setPreviewWidth(1200);
    refreshPreview();
    updateDirtyState();
    if (isReadOnlyMode()) setStatus('Backup publico: somente leitura');

    document.getElementById('colEditLayoutOverlay').classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    startPresence();
    setTimeout(function () {
      fitPreview();
      document.getElementById('colEditLayoutCode').focus();
    }, 0);
  }

  function bindEvents() {
    document.getElementById('colEditLayoutClose').addEventListener('click', function () {
      if (typeof colCloseEditLayoutModal === 'function') colCloseEditLayoutModal();
      else close();
    });
    document.getElementById('colEditLayoutOverlay').addEventListener('click', function (event) {
      if (event.target !== this) return;
      if (typeof colCloseEditLayoutModal === 'function') colCloseEditLayoutModal();
      else close();
    });
    document.querySelectorAll('#colEditLayoutModal [data-col-editor-width]').forEach(function (button) {
      button.addEventListener('click', function () {
        setPreviewWidth(this.dataset.colEditorWidth);
      });
    });
    document.querySelectorAll('#colEditLayoutModal [data-col-editor-mobile]').forEach(function (button) {
      button.addEventListener('click', function () {
        setMobileView(this.dataset.colEditorMobile);
      });
    });
    document.getElementById('colEditLayoutCode').addEventListener('input', function () {
      syncCode();
      updateDirtyState();
      schedulePreview();
    });
    document.getElementById('colEditLayoutName').addEventListener('input', function () {
      validateName(true);
      updateDirtyState();
    });
    document.getElementById('colEditLayoutWidthRange').addEventListener('input', function () {
      setPreviewWidth(this.value);
    });
    document.getElementById('colEditLayoutWidthNumber').addEventListener('input', function () {
      setPreviewWidth(this.value);
    });
    document.getElementById('colEditLayoutRefresh').addEventListener('click', refreshPreview);
    document.getElementById('colEditLayoutCopyHtml').addEventListener('click', function () {
      copyHtml(this);
    });
    document.getElementById('colEditLayoutPreview').addEventListener('load', resizePreviewHeight);
    window.addEventListener('resize', fitPreview);
  }

  window.SenkoColecoesLayoutEditor = {
    ensure: ensure,
    open: open,
    close: close,
    getData: getData,
    setStatus: setStatus,
    isOpen: isOpen,
    applyRemoteChange: function (remote) {
      if (!remote || !state.layout || remote.id !== state.layout.id) return false;
      if (isDirty()) {
        setStatus('Outra pessoa salvou uma versao mais recente. Seu rascunho foi preservado.');
        return false;
      }
      state.layout.name = remote.name || '';
      state.layout.html = remote.html || '';
      state.layout.css = remote.css || '';
      state.layout._firebaseRevisionId = remote._firebaseRevisionId || null;
      state.layout._firebaseVersion = Number(remote._firebaseVersion || 0);
      state.html = mergeLegacyCssIntoHtml(state.layout.html, state.layout.css);
      state.originalName = state.layout.name;
      state.originalHtml = state.html;
      document.getElementById('colEditLayoutName').value = state.originalName;
      document.getElementById('colEditLayoutCode').value = state.html;
      refreshPreview();
      updateDirtyState();
      setStatus('Atualizado ao vivo por ' + (remote._firebaseUpdatedBy || 'outra pessoa') + '.');
      return true;
    },
    fitPreview: fitPreview
  };
})();
