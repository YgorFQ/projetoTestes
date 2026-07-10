/* Editor oficial para layouts e variacoes da Biblioteca. */
(function () {
  var editorState = {
    mode: 'layout',
    layout: null,
    variant: null,
    html: '',
    css: '',
    activeTab: 'html',
    width: 1200,
    timer: null
  };

  function fallbackEscapeTemplate(value) {
    return String(value || '')
      .replace(/\\/g, '\\\\')
      .replace(/`/g, '\\`')
      .replace(/\$\{/g, '\\${');
  }

  function fallbackEscapeSingle(value) {
    return String(value == null ? '' : value)
      .replace(/\\/g, '\\\\')
      .replace(/'/g, "\\'")
      .replace(/\r/g, '\\r')
      .replace(/\n/g, '\\n');
  }

  function escTemplate(value) {
    return typeof escapeTemplateLiteral === 'function'
      ? escapeTemplateLiteral(value)
      : fallbackEscapeTemplate(value);
  }

  function escSingle(value) {
    return typeof escapeJsSingleQuotedString === 'function'
      ? escapeJsSingleQuotedString(value)
      : fallbackEscapeSingle(value);
  }

  function buildPreviewDoc(html, css) {
    if (typeof buildSrcDoc === 'function') return buildSrcDoc(html, css);
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
            '<div class="proto-kicker" id="protoKicker">Editor</div>' +
            '<div class="proto-name-row">' +
              '<div class="proto-editor-heading" id="protoEditorHeading">Editar layout</div>' +
              '<div class="proto-file-pill" id="protoFilePill"></div>' +
            '</div>' +
          '</div>' +
          '<div class="proto-actions">' +
            '<button class="proto-btn proto-danger-btn" id="protoDeleteBtn">Excluir</button>' +
            '<button class="proto-btn proto-primary-btn" id="protoSaveBtn">Salvar</button>' +
            '<button class="proto-btn" id="protoCopyHtmlBtn">Copiar HTML</button>' +
            '<button class="proto-btn" id="protoCopyCssBtn">Copiar CSS</button>' +
            '<button class="proto-btn proto-icon-btn" id="protoCloseBtn" title="Fechar">x</button>' +
          '</div>' +
        '</div>' +
        '<div class="proto-body" id="protoBody">' +
          '<section class="proto-pane proto-editor-pane">' +
            '<div class="proto-meta-grid">' +
              '<div class="proto-field proto-field--tags" id="protoTagsField">' +
                '<label for="protoTagsInput">Tags</label>' +
                '<input id="protoTagsInput" />' +
              '</div>' +
              '<div class="proto-field proto-field--name">' +
                '<label for="protoNameInput" id="protoNameLabel">Nome</label>' +
                '<input class="proto-name-input" id="protoNameInput" aria-label="Nome" />' +
              '</div>' +
            '</div>' +
            '<div class="proto-tabs">' +
              '<div class="proto-tab-group">' +
                '<button class="proto-seg active" data-proto-tab="html">HTML</button>' +
                '<button class="proto-seg" data-proto-tab="css">CSS</button>' +
              '</div>' +
              '<div class="proto-live-label" id="protoDirtyLabel">Pronto para editar</div>' +
            '</div>' +
            '<div class="proto-code-wrap">' +
              '<div class="proto-code-head">' +
                '<span id="protoCodeLabel">layout.html</span>' +
                '<span id="protoStatusLabel">Sem alteracoes salvas</span>' +
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
          '<nav class="proto-mobile-tabs" aria-label="Navegacao do editor">' +
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

  function setStatus(text) {
    var label = document.getElementById('protoStatusLabel');
    if (label) label.textContent = text || '';
  }

  function setBusy(isBusy) {
    ['protoSaveBtn', 'protoDeleteBtn', 'protoCopyHtmlBtn', 'protoCopyCssBtn'].forEach(function (id) {
      var el = document.getElementById(id);
      if (el) el.disabled = Boolean(isBusy);
    });
  }

  function clampWidth(value) {
    var num = Number(value);
    if (!Number.isFinite(num)) num = 1200;
    return Math.max(340, Math.min(1500, Math.round(num)));
  }

  function syncCurrentEditor() {
    var editor = document.getElementById('protoCodeEditor');
    if (!editor) return;
    if (editorState.activeTab === 'css') editorState.css = editor.value;
    else editorState.html = editor.value;
  }

  function refreshPreview() {
    var iframe = document.getElementById('protoPreviewIframe');
    if (!iframe) return;
    iframe.srcdoc = buildPreviewDoc(editorState.html, editorState.css);
  }

  function schedulePreview() {
    clearTimeout(editorState.timer);
    editorState.timer = setTimeout(refreshPreview, 150);
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

    var scale = Math.min(1, available / editorState.width);
    var frameHeight = Math.max(540, iframe.offsetHeight || frame.offsetHeight || 540);
    frame.style.width = editorState.width + 'px';
    scaleEl.style.width = editorState.width + 'px';
    scaleEl.style.transform = 'translateX(-50%) scale(' + scale + ')';
    shell.style.width = Math.ceil(editorState.width * scale) + 'px';
    shell.style.height = Math.ceil(frameHeight * scale) + 'px';
    label.textContent = Math.round(scale * 100) + '%';
  }

  function setPreviewWidth(value) {
    editorState.width = clampWidth(value);
    document.getElementById('protoWidthRange').value = editorState.width;
    document.getElementById('protoWidthNumber').value = editorState.width;
    document.querySelectorAll('[data-proto-width]').forEach(function (btn) {
      btn.classList.toggle('active', Number(btn.dataset.protoWidth) === editorState.width);
    });
    fitPreview();
  }

  function setEditorTab(tab, skipSync) {
    if (!skipSync) syncCurrentEditor();
    editorState.activeTab = tab === 'css' ? 'css' : 'html';

    document.querySelectorAll('[data-proto-tab]').forEach(function (btn) {
      btn.classList.toggle('active', btn.dataset.protoTab === editorState.activeTab);
    });

    var prefix = editorState.mode === 'variant' ? 'variant' : 'layout';
    document.getElementById('protoCodeLabel').textContent =
      prefix + (editorState.activeTab === 'css' ? '.css' : '.html');
    document.getElementById('protoCodeEditor').value =
      editorState.activeTab === 'css' ? editorState.css : editorState.html;
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

  function copyFromEditor(kind, btn) {
    syncCurrentEditor();
    var text = kind === 'css' ? editorState.css : editorState.html;
    if (typeof copyToClipboard === 'function') {
      copyToClipboard(text, btn, kind === 'css' ? 'Copiar CSS' : 'Copiar HTML');
      return;
    }
    navigator.clipboard.writeText(text);
  }

  function closeEditor() {
    var overlay = document.getElementById('protoLayoutOverlay');
    if (overlay) overlay.classList.add('hidden');
    document.body.style.overflow = '';

    if (editorState.mode === 'variant' && state.currentForVariant) {
      var parentId = state.currentForVariant.id;
      if (typeof renderVariantBlocks === 'function') renderVariantBlocks(SenkoLib.getVariants(parentId));
      if (typeof updateVariantsCount === 'function') updateVariantsCount(parentId);
      var variantsOverlay = document.getElementById('variantsOverlay');
      if (variantsOverlay) variantsOverlay.classList.remove('hidden');
    }
  }

  function isOpen() {
    var overlay = document.getElementById('protoLayoutOverlay');
    return Boolean(overlay && !overlay.classList.contains('hidden'));
  }

  function parseTags(raw) {
    if (typeof senkoParseMetadataTags === 'function') return senkoParseMetadataTags(raw);
    return String(raw || '').split(',').map(function (tag) { return tag.trim(); }).filter(Boolean);
  }

  function sanitizeLayoutName(value) {
    if (typeof senkoSanitizeMetadataValue === 'function') {
      return senkoSanitizeMetadataValue(value, false);
    }
    return String(value || '').replace(/[^\w .()_-]+/g, '');
  }

  function sanitizeTags(value) {
    if (typeof senkoSanitizeMetadataValue === 'function') {
      return senkoSanitizeMetadataValue(value, true);
    }
    return String(value || '').replace(/[^\w .,()_-]+/g, '');
  }

  function sanitizeVariantName(value) {
    if (typeof senkoSanitizeVariantInputValue === 'function') {
      return senkoSanitizeVariantInputValue(value);
    }
    return String(value || '').replace(/[^a-zA-Z0-9 -]+/g, '');
  }

  function normalizeVariantName(value) {
    if (typeof senkoNormalizeVariantName === 'function') return senkoNormalizeVariantName(value);
    return String(value || '').trim().toLowerCase().replace(/\s+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
  }

  function getCurrentData() {
    syncCurrentEditor();
    var nameInput = document.getElementById('protoNameInput');
    var tagsInput = document.getElementById('protoTagsInput');
    var rawName = nameInput ? nameInput.value : '';
    var name = editorState.mode === 'variant'
      ? normalizeVariantName(rawName)
      : sanitizeLayoutName(rawName).trim();

    return {
      mode: editorState.mode,
      layout: editorState.layout,
      variant: editorState.variant,
      id: editorState.layout ? editorState.layout.id : '',
      name: name,
      rawName: rawName,
      tags: editorState.mode === 'layout' && tagsInput ? parseTags(tagsInput.value) : [],
      html: editorState.html,
      css: editorState.css
    };
  }

  function buildLayoutObjectCode(data) {
    var tagsStr = data.tags.map(function (tag) {
      return "'" + escSingle(tag) + "'";
    }).join(', ');

    return 'SenkoLib.registerLayout(\n' +
      '{\n' +
      "    id: '" + escSingle(data.id) + "',\n" +
      "    name: '" + escSingle(data.name) + "',\n" +
      '    tags: [' + tagsStr + '],\n' +
      '    html: `' + escTemplate(data.html) + '`,\n' +
      '    css: `' + escTemplate(data.css) + '`\n' +
      '}\n' +
      ');';
  }

  function buildVariantObjectCode(data) {
    var variantId = data.variant && data.variant.id ? data.variant.id : data.name;
    return "SenkoLib.registerVariantFile('" + escSingle(data.id) + "',\n" +
      '{\n' +
      "    id: '" + escSingle(variantId) + "',\n" +
      "    name: '" + escSingle(data.name) + "',\n" +
      '    html: `' + escTemplate(data.html) + '`,\n' +
      '    css: `' + escTemplate(data.css) + '`\n' +
      '}\n' +
      ');';
  }

  function validateLayout(data) {
    if (!data.id) return 'Layout sem ID interno.';
    if (data.name.length < 3) return 'Preencha o nome do layout.';
    if (data.html.length < 1) return 'Preencha o HTML do layout.';
    if (typeof senkoLayoutNameExists === 'function' && senkoLayoutNameExists(data.name, data.id)) {
      return 'Ja existe outro layout com esse nome.';
    }
    return '';
  }

  function validateVariant(data) {
    var issue = typeof senkoVariantNameIssue === 'function'
      ? senkoVariantNameIssue(data.rawName)
      : '';
    if (issue) return issue;
    if (!data.name || data.name.length < 2) return 'Preencha o nome da variacao.';
    if (typeof senkoVariantNameExists === 'function'
        && senkoVariantNameExists(data.id, data.name, data.variant)) {
      return 'Ja existe uma variacao com esse nome neste layout.';
    }
    if (data.html.length < 1) return 'Preencha o HTML da variacao.';
    return '';
  }

  function saveLayout() {
    var data = getCurrentData();
    var issue = validateLayout(data);
    if (issue) {
      alert(issue);
      setStatus(issue);
      return;
    }

    var objectCode = buildLayoutObjectCode(data);
    setBusy(true);
    setStatus('Salvando layout...');

    if (typeof githubSaveLayout === 'function') {
      githubSaveLayout(data.id, objectCode).then(function (result) {
        setBusy(false);
        if (!result) {
          setStatus('Nao foi salvo.');
          return;
        }
        setStatus('Layout salvo.');
        setTimeout(closeEditor, 500);
      }).catch(function (error) {
        setBusy(false);
        setStatus('Erro ao salvar.');
        alert(error && error.message ? error.message : error);
      });
      return;
    }

    if (typeof SenkoLib !== 'undefined' && typeof SenkoLib.updateLayout === 'function') {
      SenkoLib.updateLayout(data.id, {
        name: data.name,
        tags: data.tags,
        html: data.html,
        css: data.css
      });
      if (typeof renderGrid === 'function') renderGrid();
      setBusy(false);
      setStatus('Salvo nesta sessao.');
      setTimeout(closeEditor, 500);
      return;
    }

    setBusy(false);
    alert('Integracao de salvamento indisponivel.');
  }

  function saveVariant() {
    var data = getCurrentData();
    var issue = validateVariant(data);
    if (issue) {
      alert(issue);
      setStatus(issue);
      return;
    }

    var originalName = data.variant && data.variant.name ? data.variant.name : '';
    var objectCode = buildVariantObjectCode(data);
    setBusy(true);
    setStatus('Salvando variacao...');

    if (typeof githubSaveVariant === 'function') {
      githubSaveVariant(data.id, originalName, data.name, objectCode).then(function (result) {
        setBusy(false);
        if (!result) {
          setStatus('Nao foi salva.');
          return;
        }

        if (typeof ghvUpdateVariantInMemory === 'function') {
          ghvUpdateVariantInMemory(data.id, originalName, data.name, data.html, data.css);
        }
        setStatus('Variacao salva.');
        setTimeout(closeEditor, 500);
      }).catch(function (error) {
        setBusy(false);
        setStatus('Erro ao salvar.');
        alert(error && error.message ? error.message : error);
      });
      return;
    }

    if (typeof SenkoLib !== 'undefined' && typeof SenkoLib.updateVariant === 'function') {
      SenkoLib.updateVariant(data.id, data.variant, {
        name: data.name,
        html: data.html,
        css: data.css
      });
      if (typeof renderGrid === 'function') renderGrid();
      setBusy(false);
      setStatus('Salvo nesta sessao.');
      setTimeout(closeEditor, 500);
      return;
    }

    setBusy(false);
    alert('Integracao de salvamento indisponivel.');
  }

  function saveCurrent() {
    syncCurrentEditor();
    if (editorState.mode === 'variant') saveVariant();
    else saveLayout();
  }

  function deleteCurrent() {
    var data = getCurrentData();
    if (editorState.mode === 'variant') {
      if (typeof ghEnsureToken === 'function' && !ghEnsureToken()) return;
      if (typeof ghvOpenDeleteModal === 'function') {
        ghvOpenDeleteModal(data.id, data.variant ? data.variant.name : data.name);
        return;
      }
      if (!confirm('Excluir esta variacao?')) return;
      var variants = SenkoLib.getVariants(data.id);
      var idx = variants.indexOf(data.variant);
      if (idx !== -1) variants.splice(idx, 1);
      closeEditor();
      return;
    }

    if (typeof ghEnsureToken === 'function' && !ghEnsureToken()) return;
    if (typeof ghOpenDeleteModal === 'function') {
      ghOpenDeleteModal(data.id, data.layout ? data.layout.name : data.name, SenkoLib.getVariants(data.id).length);
      return;
    }
    if (!confirm('Excluir este layout?')) return;
    if (typeof SenkoLib !== 'undefined' && typeof SenkoLib.deleteLayout === 'function') {
      SenkoLib.deleteLayout(data.id);
      if (typeof renderGrid === 'function') renderGrid();
    }
    closeEditor();
  }

  function bindModalEvents() {
    document.getElementById('protoCloseBtn').addEventListener('click', closeEditor);
    document.getElementById('protoLayoutOverlay').addEventListener('click', function (event) {
      if (event.target === this) closeEditor();
    });

    document.querySelectorAll('[data-proto-tab]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        setEditorTab(btn.dataset.protoTab);
      });
    });

    document.getElementById('protoCodeEditor').addEventListener('input', function () {
      syncCurrentEditor();
      setStatus('Alteracoes nao salvas');
      schedulePreview();
    });

    document.getElementById('protoNameInput').addEventListener('input', function () {
      this.value = editorState.mode === 'variant'
        ? sanitizeVariantName(this.value)
        : sanitizeLayoutName(this.value);
      setStatus('Alteracoes nao salvas');
    });

    document.getElementById('protoTagsInput').addEventListener('input', function () {
      this.value = sanitizeTags(this.value);
      setStatus('Alteracoes nao salvas');
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
      copyFromEditor('html', this);
    });

    document.getElementById('protoCopyCssBtn').addEventListener('click', function () {
      copyFromEditor('css', this);
    });

    document.getElementById('protoSaveBtn').addEventListener('click', saveCurrent);
    document.getElementById('protoDeleteBtn').addEventListener('click', deleteCurrent);

    document.querySelectorAll('[data-proto-mobile]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        setMobileView(btn.dataset.protoMobile);
      });
    });

    document.getElementById('protoPreviewIframe').addEventListener('load', resizeIframeHeight);
    window.addEventListener('resize', fitPreview);
  }

  function applyModeChrome() {
    var isVariant = editorState.mode === 'variant';
    var parentName = editorState.layout ? (editorState.layout.name || editorState.layout.id || '') : '';
    document.getElementById('protoKicker').textContent = isVariant ? 'Editor de variacao' : 'Editor de layout';
    document.getElementById('protoEditorHeading').textContent = isVariant
      ? 'Editar variacao de ' + parentName
      : 'Editar layout';
    document.getElementById('protoNameLabel').textContent = isVariant ? 'Nome da variacao' : 'Nome';
    document.getElementById('protoTagsField').classList.toggle('proto-field-hidden', isVariant);
    document.getElementById('protoFilePill').textContent = isVariant
      ? 'data/variants/' + (editorState.layout ? editorState.layout.id : 'layout') + '/' + ((editorState.variant && (editorState.variant.id || editorState.variant.name)) || 'variacao') + '.js'
      : 'data/layouts/' + (editorState.layout ? editorState.layout.id : 'layout') + '.js';
  }

  function openLayout(layout) {
    if (!layout) return;
    ensureModal();

    editorState.mode = 'layout';
    editorState.layout = layout;
    editorState.variant = null;
    editorState.html = layout.html || '';
    editorState.css = layout.css || '';
    editorState.activeTab = 'html';
    editorState.width = 1200;

    state.currentEdit = layout;
    state.currentEditVariant = null;

    applyModeChrome();
    document.getElementById('protoNameInput').value = layout.name || '';
    document.getElementById('protoTagsInput').value = (layout.tags || []).filter(Boolean).join(', ');

    setEditorTab('html', true);
    setPreviewWidth(1200);
    setMobileView('html');
    setStatus('Sem alteracoes salvas');
    refreshPreview();

    document.getElementById('protoLayoutOverlay').classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    setTimeout(fitPreview, 0);
  }

  function openVariant(parentLayout, variant) {
    if (!parentLayout || !variant) return;
    ensureModal();

    editorState.mode = 'variant';
    editorState.layout = parentLayout;
    editorState.variant = variant;
    editorState.html = variant.html || '';
    editorState.css = variant.css || '';
    editorState.activeTab = 'html';
    editorState.width = 1200;

    state.currentForVariant = parentLayout;
    state.currentEditVariant = variant;
    state.currentEdit = null;

    applyModeChrome();
    document.getElementById('protoNameInput').value = variant.name || '';
    document.getElementById('protoTagsInput').value = '';

    setEditorTab('html', true);
    setPreviewWidth(1200);
    setMobileView('html');
    setStatus('Sem alteracoes salvas');
    refreshPreview();

    document.getElementById('protoLayoutOverlay').classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    setTimeout(fitPreview, 0);
  }

  window.SenkoLayoutEditor = {
    openLayout: openLayout,
    openVariant: openVariant,
    close: closeEditor,
    isOpen: isOpen,
    getCurrentData: getCurrentData,
    buildLayoutObjectCode: function () { return buildLayoutObjectCode(getCurrentData()); },
    buildVariantObjectCode: function () { return buildVariantObjectCode(getCurrentData()); }
  };

  window.openPrototypeLayoutEditor = openLayout;
  window.openOfficialLayoutEditor = openLayout;
  window.openOfficialVariantEditor = openVariant;
})();
