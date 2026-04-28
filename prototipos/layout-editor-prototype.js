/* Prototype editor for real SenkoLib layouts. Does not save changes. */
(function () {
  var protoState = {
    layout: null,
    html: '',
    css: '',
    activeTab: 'html',
    width: 1200,
    timer: null
  };

  function buildPreviewDoc(html, css) {
    if (typeof buildSrcDoc === 'function') {
      return buildSrcDoc(html, css);
    }
    return '<!DOCTYPE html><html><head><meta charset="UTF-8">'
      + '<meta name="viewport" content="width=device-width, initial-scale=1.0">'
      + '<style>' + css + '</style></head><body>' + html + '</body></html>';
  }

  function ensureModal() {
    var existing = document.getElementById('protoLayoutOverlay');
    if (existing) return existing;

    var overlay = document.createElement('div');
    overlay.id = 'protoLayoutOverlay';
    overlay.className = 'proto-layout-overlay hidden';
    overlay.innerHTML =
      '<div class="proto-layout-modal" id="protoLayoutModal">' +
        '<div class="proto-layout-topbar">' +
          '<div class="proto-title-area">' +
            '<div class="proto-kicker">Editor experimental</div>' +
            '<div class="proto-name-row">' +
              '<input class="proto-name-input" id="protoNameInput" aria-label="Nome do layout" />' +
              '<div class="proto-file-pill" id="protoFilePill"></div>' +
            '</div>' +
          '</div>' +
          '<div class="proto-actions">' +
            '<button class="proto-btn" id="protoOpenOfficialBtn">Abrir editor oficial</button>' +
            '<button class="proto-btn" id="protoCopyHtmlBtn">Copiar HTML</button>' +
            '<button class="proto-btn" id="protoCopyCssBtn">Copiar CSS</button>' +
            '<button class="proto-btn proto-icon-btn" id="protoCloseBtn" title="Fechar">x</button>' +
          '</div>' +
        '</div>' +
        '<div class="proto-body" id="protoBody">' +
          '<section class="proto-pane proto-editor-pane">' +
            '<div class="proto-meta-grid">' +
              '<div class="proto-field">' +
                '<label for="protoTagsInput">Tags</label>' +
                '<input id="protoTagsInput" />' +
              '</div>' +
              '<div class="proto-field">' +
                '<label for="protoIdInput">ID</label>' +
                '<input id="protoIdInput" readonly />' +
              '</div>' +
            '</div>' +
            '<div class="proto-tabs">' +
              '<div class="proto-tab-group">' +
                '<button class="proto-seg active" data-proto-tab="html">HTML</button>' +
                '<button class="proto-seg" data-proto-tab="css">CSS</button>' +
              '</div>' +
              '<div class="proto-live-label">Preview ao vivo</div>' +
            '</div>' +
            '<div class="proto-code-wrap">' +
              '<div class="proto-code-head">' +
                '<span id="protoCodeLabel">layout.html</span>' +
                '<span id="protoDirtyLabel">Prototipo, sem salvar</span>' +
              '</div>' +
              '<textarea class="proto-code-editor" id="protoCodeEditor" spellcheck="false"></textarea>' +
            '</div>' +
          '</section>' +
          '<section class="proto-pane proto-preview-pane">' +
            '<div class="proto-preview-toolbar">' +
              '<div class="proto-preview-title">' +
                '<span class="proto-dot"></span>' +
                '<span>Visualizacao</span>' +
              '</div>' +
              '<div class="proto-size-tools">' +
                '<button class="proto-seg" data-proto-width="390">390</button>' +
                '<button class="proto-seg" data-proto-width="760">760</button>' +
                '<button class="proto-seg active" data-proto-width="1200">1200</button>' +
                '<button class="proto-seg" data-proto-width="1500">1500</button>' +
                '<label class="proto-width-control" for="protoWidthRange">' +
                  '<input id="protoWidthRange" type="range" min="340" max="1500" value="1200" />' +
                  '<input class="proto-width-number" id="protoWidthNumber" type="number" min="340" max="1500" value="1200" />' +
                  '<span class="proto-zoom-label" id="protoZoomLabel">100%</span>' +
                '</label>' +
                '<button class="proto-btn proto-icon-btn" id="protoRefreshBtn" title="Recarregar preview">R</button>' +
              '</div>' +
            '</div>' +
            '<div class="proto-preview-stage" id="protoPreviewStage">' +
              '<div class="proto-device-shell" id="protoDeviceShell">' +
                '<div class="proto-device-scale" id="protoDeviceScale">' +
                  '<div class="proto-device-frame" id="protoDeviceFrame">' +
                    '<iframe class="proto-preview-iframe" id="protoPreviewIframe" sandbox="allow-scripts"></iframe>' +
                  '</div>' +
                '</div>' +
              '</div>' +
            '</div>' +
          '</section>' +
          '<nav class="proto-mobile-tabs" aria-label="Navegacao do prototipo">' +
            '<button class="active" data-proto-mobile="html">HTML</button>' +
            '<button data-proto-mobile="css">CSS</button>' +
            '<button data-proto-mobile="preview">Preview</button>' +
          '</nav>' +
        '</div>' +
      '</div>';

    document.body.appendChild(overlay);
    bindModalEvents();
    return overlay;
  }

  function clampWidth(value) {
    var num = Number(value);
    if (!Number.isFinite(num)) num = 1200;
    return Math.max(340, Math.min(1500, Math.round(num)));
  }

  function syncCurrentEditor() {
    var editor = document.getElementById('protoCodeEditor');
    if (!editor) return;
    if (protoState.activeTab === 'css') protoState.css = editor.value;
    else protoState.html = editor.value;
  }

  function refreshPreview() {
    var iframe = document.getElementById('protoPreviewIframe');
    if (!iframe) return;
    iframe.srcdoc = buildPreviewDoc(protoState.html, protoState.css);
  }

  function schedulePreview() {
    clearTimeout(protoState.timer);
    protoState.timer = setTimeout(refreshPreview, 150);
  }

  function resizeIframeHeight() {
    var iframe = document.getElementById('protoPreviewIframe');
    if (!iframe) return;
    try {
      var doc = iframe.contentDocument || iframe.contentWindow.document;
      var height = Math.max(
        540,
        doc.documentElement.scrollHeight,
        doc.body ? doc.body.scrollHeight : 0
      );
      iframe.style.height = height + 'px';
    } catch (err) {
      iframe.style.height = '540px';
    }
    fitPreview();
  }

  function fitPreview() {
    var stage = document.getElementById('protoPreviewStage');
    var shell = document.getElementById('protoDeviceShell');
    var scaleEl = document.getElementById('protoDeviceScale');
    var frame = document.getElementById('protoDeviceFrame');
    var iframe = document.getElementById('protoPreviewIframe');
    var label = document.getElementById('protoZoomLabel');
    if (!stage || !shell || !scaleEl || !frame || !iframe || !label) return;

    var available = stage.clientWidth - 2;
    if (available < 40) return;

    var scale = Math.min(1, available / protoState.width);
    var frameHeight = Math.max(540, iframe.offsetHeight || frame.offsetHeight || 540);
    frame.style.width = protoState.width + 'px';
    scaleEl.style.width = protoState.width + 'px';
    scaleEl.style.transform = 'translateX(-50%) scale(' + scale + ')';
    shell.style.width = Math.ceil(protoState.width * scale) + 'px';
    shell.style.height = Math.ceil(frameHeight * scale) + 'px';
    label.textContent = Math.round(scale * 100) + '%';
  }

  function setPreviewWidth(value) {
    protoState.width = clampWidth(value);
    document.getElementById('protoWidthRange').value = protoState.width;
    document.getElementById('protoWidthNumber').value = protoState.width;
    document.querySelectorAll('[data-proto-width]').forEach(function (btn) {
      btn.classList.toggle('active', Number(btn.dataset.protoWidth) === protoState.width);
    });
    fitPreview();
  }

  function setEditorTab(tab, skipSync) {
    if (!skipSync) syncCurrentEditor();
    protoState.activeTab = tab === 'css' ? 'css' : 'html';

    document.querySelectorAll('[data-proto-tab]').forEach(function (btn) {
      btn.classList.toggle('active', btn.dataset.protoTab === protoState.activeTab);
    });

    document.getElementById('protoCodeLabel').textContent =
      protoState.activeTab === 'css' ? 'layout.css' : 'layout.html';
    document.getElementById('protoCodeEditor').value =
      protoState.activeTab === 'css' ? protoState.css : protoState.html;
  }

  function setMobileView(view) {
    var body = document.getElementById('protoBody');
    document.querySelectorAll('[data-proto-mobile]').forEach(function (btn) {
      btn.classList.toggle('active', btn.dataset.protoMobile === view);
    });

    body.classList.toggle('show-preview', view === 'preview');
    if (view === 'preview') {
      setTimeout(fitPreview, 0);
      return;
    }
    setEditorTab(view === 'css' ? 'css' : 'html');
  }

  function copyFromPrototype(kind, btn) {
    syncCurrentEditor();
    var text = kind === 'css' ? protoState.css : protoState.html;
    if (typeof copyToClipboard === 'function') {
      copyToClipboard(text, btn, kind === 'css' ? 'Copiar CSS' : 'Copiar HTML');
      return;
    }
    navigator.clipboard.writeText(text);
  }

  function closePrototypeEditor() {
    var overlay = document.getElementById('protoLayoutOverlay');
    if (overlay) overlay.classList.add('hidden');
    document.body.style.overflow = '';
  }

  function bindModalEvents() {
    document.getElementById('protoCloseBtn').addEventListener('click', closePrototypeEditor);
    document.getElementById('protoLayoutOverlay').addEventListener('click', function (event) {
      if (event.target === this) closePrototypeEditor();
    });

    document.querySelectorAll('[data-proto-tab]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        setEditorTab(btn.dataset.protoTab);
      });
    });

    document.getElementById('protoCodeEditor').addEventListener('input', function () {
      syncCurrentEditor();
      schedulePreview();
    });

    document.querySelectorAll('[data-proto-width]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        setPreviewWidth(btn.dataset.protoWidth);
      });
    });

    document.getElementById('protoWidthRange').addEventListener('input', function () {
      setPreviewWidth(this.value);
    });

    document.getElementById('protoWidthNumber').addEventListener('input', function () {
      setPreviewWidth(this.value);
    });

    document.getElementById('protoRefreshBtn').addEventListener('click', function () {
      syncCurrentEditor();
      refreshPreview();
    });

    document.getElementById('protoCopyHtmlBtn').addEventListener('click', function () {
      copyFromPrototype('html', this);
    });

    document.getElementById('protoCopyCssBtn').addEventListener('click', function () {
      copyFromPrototype('css', this);
    });

    document.getElementById('protoOpenOfficialBtn').addEventListener('click', function () {
      if (!protoState.layout || typeof openEditModal !== 'function') return;
      closePrototypeEditor();
      openEditModal(protoState.layout);
    });

    document.querySelectorAll('[data-proto-mobile]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        setMobileView(btn.dataset.protoMobile);
      });
    });

    document.getElementById('protoPreviewIframe').addEventListener('load', resizeIframeHeight);
    window.addEventListener('resize', fitPreview);
  }

  window.openPrototypeLayoutEditor = function (layout) {
    if (!layout) return;
    ensureModal();

    protoState.layout = layout;
    protoState.html = layout.html || '';
    protoState.css = layout.css || '';
    protoState.activeTab = 'html';
    protoState.width = 1200;

    document.getElementById('protoNameInput').value = layout.name || '';
    document.getElementById('protoFilePill').textContent = 'variants/' + (layout.id || 'layout') + '.js';
    document.getElementById('protoTagsInput').value = (layout.tags || []).filter(Boolean).join(', ');
    document.getElementById('protoIdInput').value = layout.id || '';

    setEditorTab('html', true);
    setPreviewWidth(1200);
    setMobileView('html');
    refreshPreview();

    document.getElementById('protoLayoutOverlay').classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    setTimeout(fitPreview, 0);
  };

  if (typeof createCard === 'function') {
    var originalCreateCard = createCard;
    createCard = function (layout, index) {
      var card = originalCreateCard(layout, index);
      var actions = card.querySelector('.card-actions');
      if (actions && !card.querySelector('.btn-proto-editor')) {
        var btn = document.createElement('button');
        btn.className = 'btn btn-ghost btn-proto-editor';
        btn.title = 'Abrir editor experimental';
        btn.textContent = 'UX';
        btn.addEventListener('click', function (event) {
          event.stopPropagation();
          window.openPrototypeLayoutEditor(layout);
        });
        actions.appendChild(btn);
      }
      return card;
    };
  }
})();
