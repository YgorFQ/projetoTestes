(function () {
  /* Controller visual do protótipo Teste. */
  var api = window.SenkoFaqTest = window.SenkoFaqTest || {};
  var core = window.SenkoFaqTestCore;
  var STORAGE_KEY = 'senkolib_faq_test_draft_v1';
  var state = {
    activeSite: 'efacil',
    workspace: 'import',
    previewSite: 'efacil',
    previewCanonical: 'https://www.efacil.com.br/produto-exemplo',
    data: core ? core.createEmptyData() : { efacil: [], martins: [], generic: [] }
  };
  var els = {};
  var previewTimer = 0;
  var toastTimer = 0;
  var initialized = false;

  api.setRoot = function setRoot(root) {
    api.root = root || document;
  };

  api.getRoot = function getRoot() {
    return api.root || document;
  };

  api.$ = function getById(id) {
    return api.getRoot().getElementById(id);
  };

  api.queryAll = function queryAll(selector) {
    return Array.from(api.getRoot().querySelectorAll(selector));
  };

  function bindElements() {
    Object.assign(els, {
      summary: api.$('faq-test-summary'),
      importInput: api.$('faq-test-import-input'),
      importStatus: api.$('faq-test-import-status'),
      importMeta: api.queryAll('.faq-test-import__meta')[0],
      importButton: api.$('faq-test-import-btn'),
      importClear: api.$('faq-test-import-clear'),
      editorTitle: api.$('faq-test-editor-title'),
      addPair: api.$('faq-test-add-pair'),
      clearSite: api.$('faq-test-clear-site'),
      pairs: api.$('faq-test-pairs'),
      previewSiteName: api.$('faq-test-preview-site-name'),
      canonicalInput: api.$('faq-test-canonical-input'),
      canonicalResult: api.$('faq-test-canonical-result'),
      route: api.$('faq-test-route'),
      preview: api.$('faq-test-preview-frame'),
      output: api.$('faq-test-output'),
      copyOutput: api.$('faq-test-copy-output'),
      toast: api.$('faq-test-toast')
    });
  }

  function safePair(pair) {
    return {
      question: String(pair && pair.question || ''),
      answer: String(pair && pair.answer || '')
    };
  }

  function loadDraft() {
    try {
      var saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
      if (!saved || !saved.data) return;
      Object.keys(core.SITE_CONFIG).forEach(function (site) {
        state.data[site] = Array.isArray(saved.data[site])
          ? saved.data[site].map(safePair)
          : [];
      });
      if (core.SITE_CONFIG[saved.activeSite]) state.activeSite = saved.activeSite;
      if (core.SITE_CONFIG[saved.previewSite]) state.previewSite = saved.previewSite;
      if (typeof saved.previewCanonical === 'string') {
        state.previewCanonical = saved.previewCanonical;
        state.previewSite = core.detectSiteFromCanonical(saved.previewCanonical);
      } else {
        state.previewCanonical = core.SITE_CONFIG[state.previewSite].canonical;
      }
    } catch (error) {
      console.warn('[Teste] Rascunho local inválido; iniciando vazio.', error);
    }
  }

  function persistDraft() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        activeSite: state.activeSite,
        previewSite: state.previewSite,
        previewCanonical: state.previewCanonical,
        data: state.data
      }));
    } catch (error) {
      console.warn('[Teste] Não foi possível salvar o rascunho local.', error);
    }
  }

  function siteLabel(site) {
    return core.SITE_CONFIG[site].label;
  }

  function currentPairs() {
    return state.data[state.activeSite];
  }

  function bindEvents() {
    els.importInput.addEventListener('input', renderImportStatus);
    els.importButton.addEventListener('click', importPairs);
    els.importClear.addEventListener('click', clearImport);
    els.addPair.addEventListener('click', addPair);
    els.clearSite.addEventListener('click', clearActiveSite);
    els.copyOutput.addEventListener('click', copyOutput);
    els.canonicalInput.addEventListener('input', updatePreviewFromCanonical);

    api.queryAll('[data-workspace-tab]').forEach(function (button, index, tabs) {
      button.addEventListener('click', function () {
        switchWorkspace(button.dataset.workspaceTab);
      });
      button.addEventListener('keydown', function (event) {
        if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
        event.preventDefault();
        var direction = event.key === 'ArrowRight' ? 1 : -1;
        var next = (index + direction + tabs.length) % tabs.length;
        tabs[next].focus();
        switchWorkspace(tabs[next].dataset.workspaceTab);
      });
    });

    api.queryAll('[data-edit-site]').forEach(function (button) {
      button.addEventListener('click', function () {
        switchEditSite(button.dataset.editSite);
      });
    });

    api.queryAll('[data-preview-site]').forEach(function (button) {
      button.addEventListener('click', function () {
        selectPreviewSite(button.dataset.previewSite);
      });
    });
  }

  function selectPreviewSite(site) {
    if (!core.SITE_CONFIG[site]) return;
    state.previewSite = site;
    state.previewCanonical = core.SITE_CONFIG[site].canonical;
    persistDraft();
    renderPreviewControls();
    renderPreviewNow();
  }

  function updatePreviewFromCanonical() {
    state.previewCanonical = els.canonicalInput.value;
    state.previewSite = core.detectSiteFromCanonical(state.previewCanonical);
    persistDraft();
    renderPreviewControls();
    renderPreviewNow();
  }

  function renderImportStatus() {
    var result = core.parsePairs(els.importInput.value);
    var count = result.pairs.length;
    var warningCount = result.diagnostics.filter(function (item) {
      return item.type === 'warning';
    }).length;
    var errorCount = result.diagnostics.filter(function (item) {
      return item.type === 'error';
    }).length;

    els.importStatus.textContent = count
      ? count + (count === 1 ? ' par detectado' : ' pares detectados') +
        (warningCount ? ' · ' + warningCount + (warningCount === 1 ? ' aviso' : ' avisos') : '')
      : (result.diagnostics[0] ? result.diagnostics[0].message : 'Nenhum par detectado.');
    els.importButton.disabled = count === 0;
    els.importMeta.classList.toggle('is-warning', warningCount > 0 && errorCount === 0);
    els.importMeta.classList.toggle('is-error', errorCount > 0);
  }

  function importPairs() {
    var result = core.parsePairs(els.importInput.value);
    if (!result.pairs.length) return;
    state.data[state.activeSite] = currentPairs().concat(result.pairs.map(safePair));
    els.importInput.value = '';
    renderImportStatus();
    renderAll();
    switchWorkspace('editor');
    showToast(result.pairs.length + (result.pairs.length === 1 ? ' pergunta adicionada ao ' : ' perguntas adicionadas ao ') + siteLabel(state.activeSite) + '.');
  }

  function switchWorkspace(workspace) {
    var panel = api.getRoot().querySelector('[data-workspace-panel="' + workspace + '"]');
    if (!panel) return;
    state.workspace = workspace;
    api.queryAll('[data-workspace-tab]').forEach(function (button) {
      var selected = button.dataset.workspaceTab === workspace;
      button.classList.toggle('is-active', selected);
      button.setAttribute('aria-selected', selected ? 'true' : 'false');
      button.tabIndex = selected ? 0 : -1;
    });
    api.queryAll('[data-workspace-panel]').forEach(function (candidate) {
      candidate.hidden = candidate.dataset.workspacePanel !== workspace;
    });
    if (workspace === 'preview') renderPreviewNow();
    if (workspace === 'output') renderOutput();
  }

  function clearImport() {
    els.importInput.value = '';
    renderImportStatus();
    els.importInput.focus();
  }

  function switchEditSite(site) {
    if (!core.SITE_CONFIG[site]) return;
    if (site === state.activeSite && site === state.previewSite) return;
    state.activeSite = site;
    state.previewSite = site;
    state.previewCanonical = core.SITE_CONFIG[site].canonical;
    persistDraft();
    renderAll();
  }

  function addPair() {
    currentPairs().push({ question: '', answer: '' });
    renderAll();
    requestAnimationFrame(function () {
      var inputs = api.queryAll('[data-pair-question]');
      var last = inputs[inputs.length - 1];
      if (last) last.focus();
    });
  }

  function clearActiveSite() {
    if (!currentPairs().length) {
      showToast('O FAQ ' + siteLabel(state.activeSite) + ' já está vazio.');
      return;
    }
    if (!window.confirm('Remover todas as perguntas do FAQ ' + siteLabel(state.activeSite) + '?')) return;
    state.data[state.activeSite] = [];
    renderAll();
    showToast('FAQ ' + siteLabel(state.activeSite) + ' limpo.');
  }

  function deletePair(index) {
    if (!window.confirm('Excluir a pergunta ' + (index + 1) + '?')) return;
    currentPairs().splice(index, 1);
    renderAll();
    showToast('Pergunta excluída.');
  }

  function createPairCard(pair, index) {
    var doc = api.getRoot().ownerDocument || document;
    var card = doc.createElement('article');
    card.className = 'faq-test-pair';

    var head = doc.createElement('div');
    head.className = 'faq-test-pair__head';
    var number = doc.createElement('span');
    number.className = 'faq-test-pair__number';
    number.textContent = 'Pergunta ' + String(index + 1).padStart(2, '0');
    var deleteButton = doc.createElement('button');
    deleteButton.type = 'button';
    deleteButton.className = 'faq-test-pair__delete';
    deleteButton.textContent = 'Excluir';
    deleteButton.setAttribute('aria-label', 'Excluir pergunta ' + (index + 1));
    deleteButton.addEventListener('click', function () { deletePair(index); });
    head.appendChild(number);
    head.appendChild(deleteButton);

    var body = doc.createElement('div');
    body.className = 'faq-test-pair__body';
    body.appendChild(createField(pair, index, 'question', 'Pergunta', 'HTML inline permitido'));
    body.appendChild(createField(pair, index, 'answer', 'Resposta', 'links e destaques permitidos'));
    card.appendChild(head);
    card.appendChild(body);
    return card;
  }

  function createField(pair, index, field, labelText, hint) {
    var doc = api.getRoot().ownerDocument || document;
    var wrapper = doc.createElement('div');
    wrapper.className = 'faq-test-field';
    var id = 'faq-test-' + state.activeSite + '-' + field + '-' + index;
    var label = doc.createElement('label');
    label.htmlFor = id;
    label.appendChild(doc.createTextNode(labelText));
    var small = doc.createElement('span');
    small.textContent = hint;
    label.appendChild(small);

    var input = field === 'question'
      ? doc.createElement('input')
      : doc.createElement('textarea');
    input.id = id;
    input.className = field === 'question' ? 'faq-test-pair__input' : 'faq-test-pair__textarea';
    input.value = pair[field];
    input.placeholder = field === 'question'
      ? 'Ex: Como acompanho meu pedido?'
      : 'Ex: Acesse <a href="/meus-pedidos">Meus pedidos</a>.';
    input.dataset[field === 'question' ? 'pairQuestion' : 'pairAnswer'] = String(index);
    input.spellcheck = true;
    input.addEventListener('input', function () {
      pair[field] = input.value;
      persistDraft();
      renderDerived();
    });

    wrapper.appendChild(label);
    wrapper.appendChild(input);
    return wrapper;
  }

  function renderEditor() {
    els.editorTitle.textContent = 'FAQ ' + siteLabel(state.activeSite);
    els.importButton.textContent = 'Adicionar ao ' + siteLabel(state.activeSite);
    api.queryAll('[data-edit-site]').forEach(function (button) {
      var selected = button.dataset.editSite === state.activeSite;
      button.classList.toggle('is-active', selected);
      button.setAttribute('aria-pressed', selected ? 'true' : 'false');
    });

    els.pairs.replaceChildren();
    if (!currentPairs().length) {
      var empty = document.createElement('div');
      empty.className = 'faq-test-empty';
      var title = document.createElement('strong');
      title.textContent = 'Este FAQ ainda está vazio';
      var description = document.createElement('span');
      description.textContent = 'Importe uma lista acima ou adicione a primeira pergunta manualmente.';
      empty.appendChild(title);
      empty.appendChild(description);
      els.pairs.appendChild(empty);
      return;
    }

    currentPairs().forEach(function (pair, index) {
      els.pairs.appendChild(createPairCard(pair, index));
    });
  }

  function renderCounts() {
    var total = 0;
    Object.keys(core.SITE_CONFIG).forEach(function (site) {
      var count = state.data[site].length;
      total += count;
      var element = api.getRoot().querySelector('[data-site-count="' + site + '"]');
      if (element) element.textContent = count;
    });
    els.summary.textContent = total + (total === 1 ? ' pergunta' : ' perguntas');
  }

  function renderPreviewControls() {
    api.queryAll('[data-preview-site]').forEach(function (button) {
      var selected = button.dataset.previewSite === state.previewSite;
      button.classList.toggle('is-active', selected);
      button.setAttribute('aria-pressed', selected ? 'true' : 'false');
    });

    var config = core.SITE_CONFIG[state.previewSite];
    var pairCount = state.data[state.previewSite].length;
    els.previewSiteName.textContent = config.label;
    els.canonicalInput.value = state.previewCanonical;
    els.canonicalResult.textContent = 'FAQ ' + config.label;
    els.route.replaceChildren();
    var site = document.createElement('strong');
    site.className = 'faq-test-route__site faq-test-route__site--' + state.previewSite;
    site.textContent = 'FAQ ' + config.label;
    var status = document.createElement('span');
    status.className = 'faq-test-route__status';
    status.textContent = state.previewSite === 'generic' ? 'fallback aplicado' : 'canonical detectado';
    var canonical = document.createElement('code');
    canonical.textContent = state.previewCanonical.trim() || 'canonical vazio';
    var count = document.createElement('span');
    count.className = 'faq-test-route__count';
    count.textContent = pairCount + (pairCount === 1 ? ' pergunta' : ' perguntas');
    els.route.appendChild(site);
    els.route.appendChild(status);
    els.route.appendChild(canonical);
    els.route.appendChild(count);
  }

  function renderPreviewNow() {
    window.clearTimeout(previewTimer);
    els.preview.srcdoc = core.buildPreviewDocument(
      state.data,
      state.previewSite,
      state.previewCanonical
    );
  }

  function schedulePreview() {
    window.clearTimeout(previewTimer);
    previewTimer = window.setTimeout(renderPreviewNow, 160);
  }

  function renderOutput() {
    els.output.value = core.buildOutput(state.data);
  }

  function renderDerived() {
    renderCounts();
    renderOutput();
    schedulePreview();
  }

  function renderAll() {
    persistDraft();
    renderEditor();
    renderPreviewControls();
    renderDerived();
  }

  async function copyOutput() {
    var text = els.output.value;
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
    } catch (error) {
      els.output.focus();
      els.output.select();
      document.execCommand('copy');
    }
    showToast('HTML + CSS copiado.');
  }

  function showToast(message) {
    window.clearTimeout(toastTimer);
    els.toast.textContent = message;
    els.toast.classList.add('is-visible');
    toastTimer = window.setTimeout(function () {
      els.toast.classList.remove('is-visible');
    }, 2200);
  }

  api.init = function init(root) {
    if (initialized) return;
    if (!core) throw new Error('Regras do protótipo Teste indisponíveis.');
    initialized = true;
    api.setRoot(root);
    bindElements();
    loadDraft();
    bindEvents();
    renderImportStatus();
    renderAll();
    switchWorkspace(state.workspace);
  };
})();
