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
    var existing = document.getElementById('layoutEditorLayoutOverlay');
    if (existing) return existing;

    var overlay = document.createElement('div');
    overlay.id = 'layoutEditorLayoutOverlay';
    overlay.className = 'library-editor-layout-overlay hidden';
    overlay.innerHTML =
      '<div class="library-editor-layout-modal" id="layoutEditorLayoutModal">' +
        '<div class="library-editor-layout-topbar">' +
          '<div class="library-editor-title-area">' +
            '<div class="library-editor-kicker" id="layoutEditorKicker">Editor</div>' +
            '<div class="library-editor-name-row">' +
              '<div class="library-editor-editor-heading" id="layoutEditorEditorHeading">Editar layout</div>' +
              '<div class="library-editor-file-pill" id="layoutEditorFilePill"></div>' +
            '</div>' +
          '</div>' +
          '<div class="library-editor-actions">' +
            '<button class="library-editor-btn library-editor-danger-btn" id="layoutEditorDeleteBtn">Excluir</button>' +
            '<button class="library-editor-btn library-editor-primary-btn" id="layoutEditorSaveBtn">Salvar</button>' +
            '<button class="library-editor-btn" id="layoutEditorCopyHtmlBtn">Copiar HTML</button>' +
            '<button class="library-editor-btn" id="layoutEditorCopyCssBtn">Copiar CSS</button>' +
            '<button class="library-editor-btn library-editor-icon-btn" id="layoutEditorCloseBtn" title="Fechar">x</button>' +
          '</div>' +
        '</div>' +
        '<div class="library-editor-body" id="layoutEditorBody">' +
          '<section class="library-editor-pane library-editor-editor-pane">' +
            '<div class="library-editor-meta-grid">' +
              '<div class="library-editor-field library-editor-field--tags" id="layoutEditorTagsField">' +
                '<label for="layoutEditorTagsInput">Tags</label>' +
                '<input id="layoutEditorTagsInput" />' +
              '</div>' +
              '<div class="library-editor-field library-editor-field--name">' +
                '<label for="layoutEditorNameInput" id="layoutEditorNameLabel">Nome</label>' +
                '<input class="library-editor-name-input" id="layoutEditorNameInput" aria-label="Nome" />' +
              '</div>' +
            '</div>' +
            '<div class="library-editor-tabs">' +
              '<div class="library-editor-tab-group">' +
                '<button class="library-editor-seg active" data-editor-tab="html">HTML</button>' +
                '<button class="library-editor-seg" data-editor-tab="css">CSS</button>' +
              '</div>' +
              '<div class="library-editor-live-label" id="layoutEditorDirtyLabel">Pronto para editar</div>' +
            '</div>' +
            '<div class="library-editor-code-wrap">' +
              '<div class="library-editor-code-head">' +
                '<span id="layoutEditorCodeLabel">layout.html</span>' +
                '<span id="layoutEditorStatusLabel">Sem alteracoes salvas</span>' +
              '</div>' +
              '<textarea class="library-editor-code-editor" id="layoutEditorCodeEditor" spellcheck="false"></textarea>' +
            '</div>' +
          '</section>' +
          '<section class="library-editor-pane library-editor-preview-pane">' +
            '<div class="library-editor-preview-toolbar">' +
              '<div class="library-editor-preview-title">' +
                '<span class="library-editor-dot"></span>' +
                '<span>Visualizacao</span>' +
              '</div>' +
              '<div class="library-editor-size-tools">' +
                '<button class="library-editor-seg" data-editor-width="390">390</button>' +
                '<button class="library-editor-seg" data-editor-width="760">760</button>' +
                '<button class="library-editor-seg active" data-editor-width="1200">1200</button>' +
                '<button class="library-editor-seg" data-editor-width="1500">1500</button>' +
                '<label class="library-editor-width-control" for="editorWidthRange">' +
                  '<input id="editorWidthRange" type="range" min="340" max="1500" value="1200" />' +
                  '<input class="library-editor-width-number" id="editorWidthNumber" type="number" min="340" max="1500" value="1200" />' +
                  '<span class="library-editor-zoom-label" id="layoutEditorZoomLabel">100%</span>' +
                '</label>' +
                '<button class="library-editor-btn library-editor-icon-btn" id="layoutEditorRefreshBtn" title="Recarregar preview">R</button>' +
              '</div>' +
            '</div>' +
            '<div class="library-editor-preview-stage" id="layoutEditorPreviewStage">' +
              '<div class="library-editor-device-shell" id="layoutEditorDeviceShell">' +
                '<div class="library-editor-device-scale" id="layoutEditorDeviceScale">' +
                  '<div class="library-editor-device-frame" id="layoutEditorDeviceFrame">' +
                    '<iframe class="library-editor-preview-iframe" id="layoutEditorPreviewIframe" sandbox="allow-scripts"></iframe>' +
                  '</div>' +
                '</div>' +
              '</div>' +
            '</div>' +
          '</section>' +
          '<nav class="library-editor-mobile-tabs" aria-label="Navegacao do editor">' +
            '<button class="active" data-editor-mobile="html">HTML</button>' +
            '<button data-editor-mobile="css">CSS</button>' +
            '<button data-editor-mobile="preview">Preview</button>' +
          '</nav>' +
        '</div>' +
      '</div>';

    document.body.appendChild(overlay);
    bindModalEvents();
    return overlay;
  }

  function setStatus(text) {
    var label = document.getElementById('layoutEditorStatusLabel');
    if (label) label.textContent = text || '';
  }

  function setBusy(isBusy) {
    ['layoutEditorSaveBtn', 'layoutEditorDeleteBtn', 'layoutEditorCopyHtmlBtn', 'layoutEditorCopyCssBtn'].forEach(function (id) {
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
    var editor = document.getElementById('layoutEditorCodeEditor');
    if (!editor) return;
    if (editorState.activeTab === 'css') editorState.css = editor.value;
    else editorState.html = editor.value;
  }

  function refreshPreview() {
    var iframe = document.getElementById('layoutEditorPreviewIframe');
    if (!iframe) return;
    iframe.srcdoc = buildPreviewDoc(editorState.html, editorState.css);
  }

  function schedulePreview() {
    clearTimeout(editorState.timer);
    editorState.timer = setTimeout(refreshPreview, 150);
  }

  function resizeIframeHeight() {
    var iframe = document.getElementById('layoutEditorPreviewIframe');
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
    var stage = document.getElementById('layoutEditorPreviewStage');
    var shell = document.getElementById('layoutEditorDeviceShell');
    var scaleEl = document.getElementById('layoutEditorDeviceScale');
    var frame = document.getElementById('layoutEditorDeviceFrame');
    var iframe = document.getElementById('layoutEditorPreviewIframe');
    var label = document.getElementById('layoutEditorZoomLabel');
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
    document.getElementById('editorWidthRange').value = editorState.width;
    document.getElementById('editorWidthNumber').value = editorState.width;
    document.querySelectorAll('[data-editor-width]').forEach(function (btn) {
      btn.classList.toggle('active', Number(btn.dataset.editorWidth) === editorState.width);
    });
    fitPreview();
  }

  function setEditorTab(tab, skipSync) {
    if (!skipSync) syncCurrentEditor();
    editorState.activeTab = tab === 'css' ? 'css' : 'html';

    document.querySelectorAll('[data-editor-tab]').forEach(function (btn) {
      btn.classList.toggle('active', btn.dataset.editorTab === editorState.activeTab);
    });

    var prefix = editorState.mode === 'variant' ? 'variant' : 'layout';
    document.getElementById('layoutEditorCodeLabel').textContent =
      prefix + (editorState.activeTab === 'css' ? '.css' : '.html');
    document.getElementById('layoutEditorCodeEditor').value =
      editorState.activeTab === 'css' ? editorState.css : editorState.html;
  }

  function setMobileView(view) {
    var body = document.getElementById('layoutEditorBody');
    document.querySelectorAll('[data-editor-mobile]').forEach(function (btn) {
      btn.classList.toggle('active', btn.dataset.editorMobile === view);
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
    var overlay = document.getElementById('layoutEditorLayoutOverlay');
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
    var overlay = document.getElementById('layoutEditorLayoutOverlay');
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
    var nameInput = document.getElementById('layoutEditorNameInput');
    var tagsInput = document.getElementById('layoutEditorTagsInput');
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
    document.getElementById('layoutEditorCloseBtn').addEventListener('click', closeEditor);
    document.getElementById('layoutEditorLayoutOverlay').addEventListener('click', function (event) {
      if (event.target === this) closeEditor();
    });

    document.querySelectorAll('[data-editor-tab]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        setEditorTab(btn.dataset.editorTab);
      });
    });

    document.getElementById('layoutEditorCodeEditor').addEventListener('input', function () {
      syncCurrentEditor();
      setStatus('Alteracoes nao salvas');
      schedulePreview();
    });

    document.getElementById('layoutEditorNameInput').addEventListener('input', function () {
      this.value = editorState.mode === 'variant'
        ? sanitizeVariantName(this.value)
        : sanitizeLayoutName(this.value);
      setStatus('Alteracoes nao salvas');
    });

    document.getElementById('layoutEditorTagsInput').addEventListener('input', function () {
      this.value = sanitizeTags(this.value);
      setStatus('Alteracoes nao salvas');
    });

    document.querySelectorAll('[data-editor-width]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        setPreviewWidth(btn.dataset.editorWidth);
      });
    });

    document.getElementById('editorWidthRange').addEventListener('input', function () {
      setPreviewWidth(this.value);
    });

    document.getElementById('editorWidthNumber').addEventListener('input', function () {
      setPreviewWidth(this.value);
    });

    document.getElementById('layoutEditorRefreshBtn').addEventListener('click', function () {
      syncCurrentEditor();
      refreshPreview();
    });

    document.getElementById('layoutEditorCopyHtmlBtn').addEventListener('click', function () {
      copyFromEditor('html', this);
    });

    document.getElementById('layoutEditorCopyCssBtn').addEventListener('click', function () {
      copyFromEditor('css', this);
    });

    document.getElementById('layoutEditorSaveBtn').addEventListener('click', saveCurrent);
    document.getElementById('layoutEditorDeleteBtn').addEventListener('click', deleteCurrent);

    document.querySelectorAll('[data-editor-mobile]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        setMobileView(btn.dataset.editorMobile);
      });
    });

    document.getElementById('layoutEditorPreviewIframe').addEventListener('load', resizeIframeHeight);
    window.addEventListener('resize', fitPreview);
  }

  function applyModeChrome() {
    var isVariant = editorState.mode === 'variant';
    var parentName = editorState.layout ? (editorState.layout.name || editorState.layout.id || '') : '';
    document.getElementById('layoutEditorKicker').textContent = isVariant ? 'Editor de variacao' : 'Editor de layout';
    document.getElementById('layoutEditorEditorHeading').textContent = isVariant
      ? 'Editar variacao de ' + parentName
      : 'Editar layout';
    document.getElementById('layoutEditorNameLabel').textContent = isVariant ? 'Nome da variacao' : 'Nome';
    document.getElementById('layoutEditorTagsField').classList.toggle('library-editor-field-hidden', isVariant);
    document.getElementById('layoutEditorFilePill').textContent = isVariant
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
    document.getElementById('layoutEditorNameInput').value = layout.name || '';
    document.getElementById('layoutEditorTagsInput').value = (layout.tags || []).filter(Boolean).join(', ');

    setEditorTab('html', true);
    setPreviewWidth(1200);
    setMobileView('html');
    setStatus('Sem alteracoes salvas');
    refreshPreview();

    document.getElementById('layoutEditorLayoutOverlay').classList.remove('hidden');
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
    document.getElementById('layoutEditorNameInput').value = variant.name || '';
    document.getElementById('layoutEditorTagsInput').value = '';

    setEditorTab('html', true);
    setPreviewWidth(1200);
    setMobileView('html');
    setStatus('Sem alteracoes salvas');
    refreshPreview();

    document.getElementById('layoutEditorLayoutOverlay').classList.remove('hidden');
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

  window.openOfficialLayoutEditor = openLayout;
  window.openOfficialVariantEditor = openVariant;
})();
