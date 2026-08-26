(function () {
  var api = window.SenkoTeamNotesWorkspace = window.SenkoTeamNotesWorkspace || {};
  var model = api.model;
  var root;
  var ui = {};
  var selectedSectionId = '';
  var selectedPageId = '';
  var dirty = false;
  var toastTimer = null;

  function escapeHtml(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function formatDate(value) {
    if (!value) return 'Ainda não salva';
    var date = new Date(value);
    if (Number.isNaN(date.getTime())) return '';
    return new Intl.DateTimeFormat('pt-BR', {
      dateStyle: 'long',
      timeStyle: 'short'
    }).format(date);
  }

  function sectionById(sectionId) {
    return model.listSections().find(function (section) {
      return section.id === sectionId;
    }) || null;
  }

  function setToast(message, type) {
    window.clearTimeout(toastTimer);
    ui.toast.textContent = message || '';
    ui.toast.className = 'team-notes-workspace-toast' + (type ? ' is-' + type : '');
    if (!message) return;
    toastTimer = window.setTimeout(function () {
      ui.toast.textContent = '';
      ui.toast.className = 'team-notes-workspace-toast';
    }, 3600);
  }

  function setDirty(nextDirty) {
    dirty = Boolean(nextDirty);
    ui.saveState.textContent = dirty ? 'Alterações não salvas' : (selectedPageId ? 'Salva' : 'Sem página');
    ui.saveState.classList.toggle('is-dirty', dirty);
    ui.save.disabled = !selectedPageId || !dirty;
  }

  function canLeavePage() {
    return !dirty || window.confirm('Descartar as alterações não salvas desta página?');
  }

  function selectedPage() {
    return selectedPageId ? model.getPage(selectedPageId) : null;
  }

  function renderSections() {
    var sections = model.listSections();
    var query = String(ui.sectionSearch.value || '').trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    var filtered = sections.filter(function (section) {
      return !query || section.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').indexOf(query) !== -1;
    });
    ui.sectionCount.textContent = filtered.length === sections.length ? String(sections.length) : filtered.length + '/' + sections.length;
    if (!filtered.length) {
      ui.sectionList.innerHTML = '<div class="team-notes-workspace-empty"><strong>Nenhuma seção encontrada</strong><span>Tente outro termo de busca.</span></div>';
      return;
    }
    ui.sectionList.innerHTML = filtered.map(function (section) {
      var count = model.listPages(section.id, '').length;
      return (
        '<button class="team-notes-workspace-section' + (section.id === selectedSectionId ? ' is-selected' : '') + '" type="button" data-section-id="' + escapeHtml(section.id) + '"' +
        (section.id === selectedSectionId ? ' aria-current="true"' : '') + '>' +
        '  <span class="team-notes-workspace-section__marker" aria-hidden="true"></span>' +
        '  <span><strong>' + escapeHtml(section.name) + '</strong><small>' + count + (count === 1 ? ' página' : ' páginas') + '</small></span>' +
        '</button>'
      );
    }).join('');
  }

  function renderPages() {
    var section = sectionById(selectedSectionId);
    var pages = section ? model.listPages(selectedSectionId, ui.search.value) : [];
    var total = section ? model.listPages(selectedSectionId, '').length : 0;
    ui.pagesTitle.textContent = section ? section.name : 'Selecione uma seção';
    ui.pagesCount.textContent = pages.length === total ? String(total) : pages.length + '/' + total;
    ui.addPage.disabled = !section;

    if (!pages.length) {
      ui.pageList.innerHTML = '<div class="team-notes-workspace-empty"><strong>' +
        (total ? 'Nenhuma página encontrada' : 'Esta seção está vazia') +
        '</strong><span>' + (total ? 'Tente outro termo ou remova o filtro.' : 'Crie a primeira página desta seção.') + '</span></div>';
      return;
    }

    ui.pageList.innerHTML = pages.map(function (page) {
      return (
        '<button class="team-notes-workspace-page-item' + (page.id === selectedPageId ? ' is-selected' : '') + '" type="button" data-page-id="' + escapeHtml(page.id) + '"' +
        (page.id === selectedPageId ? ' aria-current="page"' : '') + '>' +
        '  <strong class="team-notes-workspace-page-item__title">' + escapeHtml(page.title) + '</strong>' +
        '  <span class="team-notes-workspace-page-item__date">' + escapeHtml(formatDate(page.updatedAt)) + '</span>' +
        '</button>'
      );
    }).join('');
  }

  function setEditorEnabled(enabled) {
    [ui.title, ui.content, ui.delete, ui.copy, ui.save].forEach(function (control) {
      control.disabled = !enabled;
    });
  }

  function updateCharacterCount() {
    var length = ui.content.value.length;
    ui.characterCount.textContent = length.toLocaleString('pt-BR') + (length === 1 ? ' caractere' : ' caracteres');
  }

  function fillEditor(page) {
    var section = page ? sectionById(page.sectionId) : null;
    setEditorEnabled(Boolean(page));
    ui.title.value = page ? page.title : '';
    ui.content.value = page ? page.content : '';
    ui.editorSection.textContent = section ? section.name : 'Seção';
    ui.editorPage.textContent = page ? page.title : 'Página';
    ui.date.textContent = page ? 'Última alteração em ' + formatDate(page.updatedAt) : 'Selecione uma página para começar';
    ui.version.textContent = 'versão ' + (page ? Number(page.version || 0) : 0);
    updateCharacterCount();
    setDirty(false);
  }

  function selectPage(pageId, force) {
    if (pageId === selectedPageId && !force) return;
    if (!force && !canLeavePage()) return;
    var page = model.getPage(pageId);
    if (!page) return;
    selectedPageId = page.id;
    selectedSectionId = page.sectionId;
    renderSections();
    renderPages();
    fillEditor(page);
  }

  function selectSection(sectionId) {
    if (sectionId === selectedSectionId) return;
    if (!canLeavePage()) return;
    selectedSectionId = sectionId;
    selectedPageId = '';
    ui.search.value = '';
    renderSections();
    var pages = model.listPages(sectionId, '');
    renderPages();
    if (pages.length) selectPage(pages[0].id, true);
    else fillEditor(null);
  }

  function createPage() {
    if (!selectedSectionId || !canLeavePage()) return;
    try {
      var page = model.createPage(selectedSectionId);
      selectedPageId = page.id;
      ui.search.value = '';
      renderSections();
      renderPages();
      fillEditor(page);
      setDirty(true);
      ui.title.select();
      setToast('Nova página criada neste protótipo.', 'info');
    } catch (error) {
      setToast(error.message, 'error');
    }
  }

  function readEditorPage() {
    var page = selectedPage();
    if (!page) return null;
    return {
      id: page.id,
      sectionId: page.sectionId,
      title: ui.title.value,
      content: ui.content.value
    };
  }

  function savePage(event) {
    event.preventDefault();
    var draft = readEditorPage();
    if (!draft) return;
    try {
      var saved = model.savePage(draft);
      selectedPageId = saved.id;
      renderSections();
      renderPages();
      fillEditor(saved);
      setToast('Página salva na memória do protótipo. A integração real será pelo Firebase.', 'ok');
    } catch (error) {
      setToast(error.message, 'error');
    }
  }

  function deletePage() {
    var page = selectedPage();
    if (!page) return;
    if (!window.confirm('Excluir a página "' + page.title + '" deste protótipo?')) return;
    model.deletePage(page.id);
    selectedPageId = '';
    var pages = model.listPages(selectedSectionId, '');
    renderSections();
    renderPages();
    if (pages.length) selectPage(pages[0].id, true);
    else fillEditor(null);
    setToast('Página excluída do protótipo.', 'ok');
  }

  function copyContent() {
    var content = ui.content.value;
    if (!content.trim()) {
      setToast('Não há conteúdo para copiar.', 'error');
      return;
    }
    navigator.clipboard.writeText(content).then(function () {
      setToast('Conteúdo copiado.', 'ok');
    }).catch(function () {
      setToast('Não foi possível copiar automaticamente.', 'error');
    });
  }

  function openSectionForm() {
    ui.sectionForm.hidden = false;
    ui.addSection.hidden = true;
    ui.sectionName.value = '';
    ui.sectionName.focus();
  }

  function closeSectionForm() {
    ui.sectionForm.hidden = true;
    ui.addSection.hidden = false;
    ui.sectionName.value = '';
  }

  function createSection(event) {
    event.preventDefault();
    try {
      var section = model.createSection(ui.sectionName.value);
      closeSectionForm();
      ui.sectionSearch.value = '';
      renderSections();
      selectSection(section.id);
      setToast('Seção criada neste protótipo.', 'ok');
    } catch (error) {
      setToast(error.message, 'error');
      ui.sectionName.focus();
    }
  }

  function markEditorDirty() {
    if (!selectedPageId) return;
    ui.editorPage.textContent = ui.title.value.trim() || 'Sem título';
    updateCharacterCount();
    setDirty(true);
  }

  function collectUi() {
    ui.sectionCount = root.getElementById('team-notes-sections-count');
    ui.sectionList = root.getElementById('team-notes-section-list');
    ui.sectionSearch = root.getElementById('team-notes-section-search');
    ui.addSection = root.getElementById('team-notes-add-section');
    ui.sectionForm = root.getElementById('team-notes-section-form');
    ui.sectionName = root.getElementById('team-notes-section-name');
    ui.pagesTitle = root.getElementById('team-notes-pages-title');
    ui.pagesCount = root.getElementById('team-notes-pages-count');
    ui.addPage = root.getElementById('team-notes-add-page');
    ui.search = root.getElementById('team-notes-search');
    ui.pageList = root.getElementById('team-notes-page-list');
    ui.editor = root.getElementById('team-notes-editor');
    ui.editorSection = root.getElementById('team-notes-editor-section');
    ui.editorPage = root.getElementById('team-notes-editor-page');
    ui.saveState = root.getElementById('team-notes-save-state');
    ui.title = root.getElementById('team-notes-title');
    ui.date = root.getElementById('team-notes-date');
    ui.content = root.getElementById('team-notes-content');
    ui.characterCount = root.getElementById('team-notes-character-count');
    ui.version = root.getElementById('team-notes-version');
    ui.delete = root.getElementById('team-notes-delete');
    ui.copy = root.getElementById('team-notes-copy');
    ui.save = root.getElementById('team-notes-save');
    ui.toast = root.getElementById('team-notes-toast');
  }

  function bindEvents() {
    ui.sectionList.addEventListener('click', function (event) {
      var button = event.target.closest('[data-section-id]');
      if (button) selectSection(button.dataset.sectionId);
    });
    ui.pageList.addEventListener('click', function (event) {
      var button = event.target.closest('[data-page-id]');
      if (button) selectPage(button.dataset.pageId);
    });
    ui.addSection.addEventListener('click', openSectionForm);
    ui.sectionForm.addEventListener('submit', createSection);
    ui.sectionForm.querySelector('[data-cancel-section]').addEventListener('click', closeSectionForm);
    ui.sectionSearch.addEventListener('input', renderSections);
    ui.addPage.addEventListener('click', createPage);
    ui.search.addEventListener('input', renderPages);
    ui.editor.addEventListener('submit', savePage);
    ui.editor.addEventListener('input', markEditorDirty);
    ui.editor.addEventListener('change', markEditorDirty);
    ui.delete.addEventListener('click', deletePage);
    ui.copy.addEventListener('click', copyContent);
  }

  api.init = function init(shadowRoot) {
    root = shadowRoot;
    collectUi();
    bindEvents();
    var sections = model.listSections();
    selectedSectionId = sections[0] ? sections[0].id : '';
    renderSections();
    renderPages();
    var pages = selectedSectionId ? model.listPages(selectedSectionId, '') : [];
    if (pages.length) selectPage(pages[0].id, true);
    else fillEditor(null);
  };
})();
