(function () {
  var api = window.SenkoTeamNotesWorkspace = window.SenkoTeamNotesWorkspace || {};
  var model = api.model;
  var root;
  var ui = {};
  var selectedSectionId = '';
  var selectedPageId = '';
  var dirty = false;
  var readOnly = true;
  var busy = false;
  var toastTimer = null;
  var confirmAction = null;
  var confirmTrigger = null;

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
    ui.save.disabled = readOnly || busy || !selectedPageId || !dirty;
  }

  function setBusy(nextBusy) {
    busy = Boolean(nextBusy);
    ui.addSection.disabled = readOnly || busy;
    ui.addPage.disabled = readOnly || busy || !sectionById(selectedSectionId);
    setEditorEnabled(Boolean(selectedPage()));
    setDirty(dirty);
  }

  function canLeavePage() {
    return !dirty || window.confirm('Descartar as alterações não salvas desta página?');
  }

  function closeDeleteConfirm(restoreFocus) {
    ui.confirmOverlay.hidden = true;
    ui.shell.inert = false;
    confirmAction = null;
    if (restoreFocus !== false && confirmTrigger && confirmTrigger.isConnected) confirmTrigger.focus();
    confirmTrigger = null;
  }

  function openDeleteConfirm(options) {
    var safe = options || {};
    confirmTrigger = root.activeElement;
    confirmAction = typeof safe.onConfirm === 'function' ? safe.onConfirm : null;
    ui.confirmTitle.textContent = safe.title || 'Confirmar exclusão';
    ui.confirmDescription.textContent = safe.description || 'Confirme para excluir o item selecionado.';
    ui.confirmTargetLabel.textContent = safe.targetLabel || 'Item selecionado';
    ui.confirmTargetName.textContent = safe.targetName || '';
    ui.confirmTargetDetail.textContent = safe.targetDetail || '';
    ui.confirmTargetDetail.hidden = !safe.targetDetail;
    ui.confirmDelete.textContent = safe.confirmLabel || 'Excluir';
    ui.confirmOverlay.hidden = false;
    ui.shell.inert = true;
    ui.confirmDelete.focus();
  }

  function confirmDelete() {
    var action = confirmAction;
    closeDeleteConfirm(false);
    if (action) action();
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
        '<div class="team-notes-workspace-section-row' + (section.id === selectedSectionId ? ' is-selected' : '') + '">' +
        '  <button class="team-notes-workspace-section" type="button" data-section-id="' + escapeHtml(section.id) + '"' +
        (section.id === selectedSectionId ? ' aria-current="true"' : '') + '>' +
        '    <span class="team-notes-workspace-section__marker" aria-hidden="true"></span>' +
        '    <span><strong>' + escapeHtml(section.name) + '</strong><small>' + count + (count === 1 ? ' página' : ' páginas') + '</small></span>' +
        '  </button>' +
        '  <button class="team-notes-workspace-section-delete" type="button" data-delete-section-id="' + escapeHtml(section.id) + '" title="Excluir seção" aria-label="Excluir seção ' + escapeHtml(section.name) + '">' +
        '    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M3 6h18"/><path d="M8 6V4h8v2"/><path d="m19 6-1 14H6L5 6"/><path d="M10 11v5M14 11v5"/></svg>' +
        '  </button>' +
        '</div>'
      );
    }).join('');
  }

  function renderPages() {
    var section = sectionById(selectedSectionId);
    var pages = section ? model.listPages(selectedSectionId, ui.search.value) : [];
    var total = section ? model.listPages(selectedSectionId, '').length : 0;
    ui.pagesTitle.textContent = section ? section.name : 'Selecione uma seção';
    ui.pagesCount.textContent = pages.length === total ? String(total) : pages.length + '/' + total;
    ui.addPage.disabled = readOnly || busy || !section;

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
    ui.title.disabled = !enabled || readOnly || busy;
    ui.content.disabled = !enabled || readOnly || busy;
    ui.delete.disabled = !enabled || readOnly || busy;
    ui.save.disabled = !enabled || readOnly || busy || !dirty;
    ui.copy.disabled = !enabled;
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
    if (readOnly || busy || !selectedSectionId || !canLeavePage()) return;
    try {
      var page = model.createPage(selectedSectionId);
      selectedPageId = page.id;
      ui.search.value = '';
      renderSections();
      renderPages();
      fillEditor(page);
      setDirty(true);
      ui.title.select();
      setToast('Nova página local. Salve para enviar ao Firebase.', 'info');
    } catch (error) {
      setToast(error.message, 'error');
    }
  }

  function deleteSection(sectionId) {
    var section = sectionById(sectionId);
    if (!section) return;
    var deletingSelected = sectionId === selectedSectionId;
    var sectionPages = model.listPages(sectionId, '');
    var sectionsBeforeDelete = model.listSections();
    var deletedIndex = sectionsBeforeDelete.findIndex(function (item) { return item.id === sectionId; });
    openDeleteConfirm({
      title: 'Excluir esta seção?',
      description: sectionPages.length
        ? 'A seção e todo o conteúdo organizado dentro dela serão removidos.'
        : 'A seção será removida da organização das notas.',
      targetLabel: 'Seção',
      targetName: section.name,
      targetDetail: sectionPages.length + (sectionPages.length === 1 ? ' página vinculada' : ' páginas vinculadas'),
      confirmLabel: 'Excluir seção',
      onConfirm: function () {
        if (readOnly || busy) return;
        setBusy(true);
        window.SenkoTeamNotesFirebase.deleteSection(section).then(function () {
          if (!model.deleteSection(sectionId)) return;

          if (deletingSelected) {
            var remainingSections = model.listSections();
            var fallbackSection = remainingSections[Math.min(deletedIndex, remainingSections.length - 1)] || null;
            selectedSectionId = fallbackSection ? fallbackSection.id : '';
            selectedPageId = '';
            ui.search.value = '';
          }

          renderSections();
          renderPages();
          if (deletingSelected) {
            var pages = selectedSectionId ? model.listPages(selectedSectionId, '') : [];
            if (pages.length) selectPage(pages[0].id, true);
            else fillEditor(null);
          }
          setToast('Seção excluída do Firebase.', 'ok');
        }).catch(function (error) {
          setToast(error.message || 'Não foi possível excluir a seção.', 'error');
        }).finally(function () { setBusy(false); });
      }
    });
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
    var current = selectedPage();
    if (!draft || !current || readOnly || busy) return;
    if (!draft.title.trim()) return setToast('Informe o título da página.', 'error');
    if (!draft.content.trim()) return setToast('Escreva algum conteúdo antes de salvar.', 'error');
    setBusy(true);
    window.SenkoTeamNotesFirebase.savePage(Object.assign({}, draft, {
      expectedVersion: current.isDraft ? null : Number(current.version || 0)
    })).then(function (result) {
      var latest = model.getPage(draft.id);
      if (latest && Number(latest.version || 0) < Number(result.version || 0)) {
        latest = model.savePage(draft);
      }
      selectedPageId = result.id;
      renderSections();
      renderPages();
      fillEditor(model.getPage(result.id) || latest);
      setToast('Página salva no Firebase. Ela entrará no próximo backup global.', 'ok');
    }).catch(function (error) {
      setToast(error.message || 'Não foi possível salvar a página.', 'error');
    }).finally(function () { setBusy(false); });
  }

  function deletePage() {
    var page = selectedPage();
    if (!page) return;
    var section = sectionById(page.sectionId);
    openDeleteConfirm({
      title: 'Excluir esta página?',
      description: 'A página deixará de fazer parte das notas desta seção.',
      targetLabel: 'Página',
      targetName: page.title,
      targetDetail: section ? 'Seção: ' + section.name : '',
      confirmLabel: 'Excluir página',
      onConfirm: function () {
        if (readOnly || busy) return;
        if (page.isDraft) {
          model.deletePage(page.id);
          selectedPageId = '';
          renderSections();
          renderPages();
          fillEditor(null);
          setToast('Rascunho descartado.', 'ok');
          return;
        }
        setBusy(true);
        window.SenkoTeamNotesFirebase.deletePage(page).then(function () {
          model.deletePage(page.id);
          selectedPageId = '';
          var pages = model.listPages(selectedSectionId, '');
          renderSections();
          renderPages();
          if (pages.length) selectPage(pages[0].id, true);
          else fillEditor(null);
          setToast('Página excluída do Firebase.', 'ok');
        }).catch(function (error) {
          setToast(error.message || 'Não foi possível excluir a página.', 'error');
        }).finally(function () { setBusy(false); });
      }
    });
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
    if (readOnly || busy) return;
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
    if (readOnly || busy) return;
    var section;
    try {
      section = model.createSection(ui.sectionName.value);
    } catch (error) {
      setToast(error.message, 'error');
      ui.sectionName.focus();
      return;
    }
    setBusy(true);
    window.SenkoTeamNotesFirebase.saveSection({
      id: section.id,
      name: section.name,
      order: section.order,
      expectedVersion: null
    }).then(function () {
      closeSectionForm();
      ui.sectionSearch.value = '';
      renderSections();
      selectSection(section.id);
      setToast('Seção criada no Firebase.', 'ok');
    }).catch(function (error) {
      model.deleteSection(section.id);
      renderSections();
      setToast(error.message || 'Não foi possível criar a seção.', 'error');
    }).finally(function () { setBusy(false); });
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
    ui.title = root.getElementById('team-notes-title');
    ui.date = root.getElementById('team-notes-date');
    ui.content = root.getElementById('team-notes-content');
    ui.characterCount = root.getElementById('team-notes-character-count');
    ui.version = root.getElementById('team-notes-version');
    ui.delete = root.getElementById('team-notes-delete');
    ui.copy = root.getElementById('team-notes-copy');
    ui.save = root.getElementById('team-notes-save');
    ui.shell = root.querySelector('.team-notes-workspace-shell');
    ui.confirmOverlay = root.getElementById('team-notes-confirm-overlay');
    ui.confirmTitle = root.getElementById('team-notes-confirm-title');
    ui.confirmDescription = root.getElementById('team-notes-confirm-description');
    ui.confirmTargetLabel = root.getElementById('team-notes-confirm-target-label');
    ui.confirmTargetName = root.getElementById('team-notes-confirm-target-name');
    ui.confirmTargetDetail = root.getElementById('team-notes-confirm-target-detail');
    ui.confirmClose = root.getElementById('team-notes-confirm-close');
    ui.confirmCancel = root.getElementById('team-notes-confirm-cancel');
    ui.confirmDelete = root.getElementById('team-notes-confirm-delete');
    ui.toast = root.getElementById('team-notes-toast');
  }

  function bindEvents() {
    ui.sectionList.addEventListener('click', function (event) {
      var deleteButton = event.target.closest('[data-delete-section-id]');
      if (deleteButton) {
        deleteSection(deleteButton.dataset.deleteSectionId);
        return;
      }
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
    ui.confirmClose.addEventListener('click', closeDeleteConfirm);
    ui.confirmCancel.addEventListener('click', closeDeleteConfirm);
    ui.confirmDelete.addEventListener('click', confirmDelete);
    ui.confirmOverlay.addEventListener('click', function (event) {
      if (event.target === ui.confirmOverlay) closeDeleteConfirm();
    });
    root.addEventListener('keydown', function (event) {
      if (ui.confirmOverlay.hidden) return;
      if (event.key === 'Escape') {
        event.preventDefault();
        closeDeleteConfirm();
        return;
      }
      if (event.key !== 'Tab') return;
      var focusable = [ui.confirmClose, ui.confirmCancel, ui.confirmDelete];
      var currentIndex = focusable.indexOf(root.activeElement);
      if (event.shiftKey && currentIndex <= 0) {
        event.preventDefault();
        focusable[focusable.length - 1].focus();
      } else if (!event.shiftKey && currentIndex === focusable.length - 1) {
        event.preventDefault();
        focusable[0].focus();
      }
    });
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

  api.replaceData = function replaceData(sections, pages, nextReadOnly) {
    var previousSectionId = selectedSectionId;
    var previousPageId = selectedPageId;
    readOnly = Boolean(nextReadOnly);
    model.replaceData(sections, pages);
    selectedSectionId = sectionById(previousSectionId)
      ? previousSectionId
      : ((model.listSections()[0] || {}).id || '');
    selectedPageId = model.getPage(previousPageId) ? previousPageId : '';
    if (!selectedPageId && selectedSectionId) {
      selectedPageId = ((model.listPages(selectedSectionId, '')[0] || {}).id || '');
    }
    renderSections();
    renderPages();
    fillEditor(selectedPage());
    setBusy(false);
    if (readOnly) setToast('Backup público em modo somente leitura.', 'info');
  };

  api.reportDataError = function reportDataError(error) {
    setToast((error && error.message) || 'Não foi possível sincronizar as notas.', 'error');
  };
})();
