// @ts-nocheck
/* ═══════════════════════════════════════════════════════════════════════
   col-modals.js — Modais do sistema de Coleções

   MODAIS GERENCIADOS:
     1. colCollectionOverlay   — modal de layouts de uma coleção (visualização + ações)
     2. colCreateOverlay       — criar nova coleção
     3. colEditOverlay         — editar metadados de coleção
     4. colNewGroupOverlay     — criar novo grupo (disparado de dentro do criar/editar)
     5. colAddLayoutOverlay    — adicionar layout à coleção
     6. colEditLayoutOverlay   — editar layout dentro de coleção
     7. colConfirmOverlay      — confirmação de exclusão genérica

   EXPÕE (globais usados por col-script.js e senko-github-col.js):
     colOpenCollectionModal(col)
     colOpenCreateModal()
     colOpenEditModal(col)
     colOpenAddLayoutModal(col)
     colOpenEditLayoutModal(col, layout)
     colOpenConfirm(opts)           → { title, body, labelOk, onConfirm, danger }
     colCloseAllModals()

   DEPENDÊNCIAS:
     col-script.js (colRenderGrid, colUpdateStatsBar)
     col-core.js   (ColLib)
     col-groups.js (ColGroups)
═══════════════════════════════════════════════════════════════════════ */

/* ── Estado dos modais ─────────────────────────────────────────────── */
var _colCurrentCollection = null;   /* coleção aberta no modal de layouts */
var _colCurrentLayout     = null;   /* layout aberto no modal de edição   */

/* ── Paleta de cores para grupos ───────────────────────────────────── */
var COL_PRESET_COLORS = [
  '#ff6b00', '#f59e0b', '#10b981', '#06b6d4',
  '#6366f1', '#8b5cf6', '#ec4899', '#ef4444',
  '#64748b', '#1a9e52',
];


/* ═══════════════════════════════════════════════════════════════════════
   HELPERS
═══════════════════════════════════════════════════════════════════════ */

/* Cria overlay genérico */
function _colMakeOverlay(id) {
  var el = document.createElement('div');
  el.id        = id;
  el.className = 'modal-overlay hidden';
  document.body.appendChild(el);
  return el;
}

/* Fecha overlay ao clicar fora do modal */
function _colOverlayClick(overlayId, modalId, closeFn) {
  var overlay = document.getElementById(overlayId);
  if (!overlay) return;
  overlay.addEventListener('click', function (e) {
    var modal = document.getElementById(modalId);
    if (modal && !modal.contains(e.target)) closeFn();
  });
}

/* Mostra overlay */
function _colShowOverlay(id) {
  var el = document.getElementById(id);
  if (el) {
    el.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }
}

/* Esconde overlay */
function _colHideOverlay(id) {
  var el = document.getElementById(id);
  if (el) el.classList.add('hidden');
}

/* Esconde todos — e libera overflow se nenhum modal estiver aberto */
function colCloseAllModals() {
  [
    'colCollectionOverlay',
    'colCreateOverlay',
    'colEditOverlay',
    'colNewGroupOverlay',
    'colAddLayoutOverlay',
    'colEditLayoutOverlay',
    'colConfirmOverlay',
  ].forEach(_colHideOverlay);

  /* Verifica se ainda tem algum modal aberto antes de liberar scroll */
  var anyOpen = document.querySelectorAll('.modal-overlay:not(.hidden)').length > 0;
  if (!anyOpen) document.body.style.overflow = '';
}

/* Gera slug a partir do nome */
function _colSlugify(name) {
  if (typeof ColGroups !== 'undefined' && typeof ColGroups.slugify === 'function') {
    return ColGroups.slugify(name);
  }
  return (name || '')
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '').trim()
    .replace(/\s+/g, '-').replace(/-+/g, '-');
}

/* Valida slug: só letras minúsculas, números e hífen */
function _colValidSlug(slug) {
  return /^[a-z0-9-]+$/.test(slug) && slug.length >= 2;
}

/* Preview de iframe — limpa e recarrega */
function _colRefreshPreview(iframeId, htmlVal, cssVal) {
  var iframe = document.getElementById(iframeId);
  if (!iframe) return;
  iframe.srcdoc = '';
  setTimeout(function () {
    if (htmlVal || cssVal) {
      iframe.srcdoc = colBuildSrcDoc
        ? colBuildSrcDoc(htmlVal, cssVal)
        : ('<!DOCTYPE html><html><head><style>' + (cssVal||'') + '</style></head><body>' + (htmlVal||'') + '</body></html>');
    }
  }, 50);
}

/* Popula o <select> de grupos */
function _colPopulateGroupSelect(selectEl, selectedSlug) {
  selectEl.innerHTML = '<option value="">— Selecione um grupo —</option>';
  var groups = typeof ColGroups !== 'undefined' ? ColGroups.getAll() : [];
  groups.forEach(function (g) {
    var opt = document.createElement('option');
    opt.value       = g.slug;
    opt.textContent = g.name;
    if (g.slug === selectedSlug) opt.selected = true;
    selectEl.appendChild(opt);
  });
}


/* ═══════════════════════════════════════════════════════════════════════
   1. MODAL DE COLEÇÃO — layouts internos
═══════════════════════════════════════════════════════════════════════ */

function _colBuildCollectionModal() {
  if (document.getElementById('colCollectionOverlay')) return;

  var overlay = _colMakeOverlay('colCollectionOverlay');

  overlay.innerHTML =
    '<div class="col-modal" id="colCollectionModal">' +

      /* Header */
      '<div class="col-modal-header">' +
        '<div class="col-modal-header-left">' +
          '<span class="col-modal-category">Coleção</span>' +
          '<h2 class="col-modal-title" id="colColTitle"></h2>' +
          '<span class="col-modal-group-badge" id="colColGroupBadge"></span>' +
        '</div>' +
        '<div class="col-modal-header-right">' +
          /* Âncora GitHub — senko-github-col.js injeta botão de salvar aqui */
          '<span id="colColSaveAnchor" style="display:none;"></span>' +
          '<button class="btn btn-edit-icon" id="colColEditMetaBtn" title="Editar metadados">' +
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14">' +
              '<path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>' +
              '<path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>' +
            '</svg>' +
          '</button>' +
          '<button class="modal-close" id="colColClose" title="Fechar">✕</button>' +
        '</div>' +
      '</div>' +

      /* Grid de layouts */
      '<div class="col-modal-layouts-wrap">' +
        '<div class="col-modal-layouts-grid" id="colColLayoutsGrid"></div>' +
      '</div>' +

    '</div>';

  document.getElementById('colColClose').addEventListener('click', colCloseCollectionModal);
  document.getElementById('colColEditMetaBtn').addEventListener('click', function () {
    if (_colCurrentCollection) {
      _colHideOverlay('colCollectionOverlay');
      colOpenEditModal(_colCurrentCollection);
    }
  });
  _colOverlayClick('colCollectionOverlay', 'colCollectionModal', colCloseCollectionModal);
}

function colOpenCollectionModal(col) {
  _colBuildCollectionModal();
  _colCurrentCollection = col;

  /* Título */
  document.getElementById('colColTitle').textContent = col.name;

  /* Badge de grupo */
  var badge = document.getElementById('colColGroupBadge');
  var group = (typeof ColGroups !== 'undefined' && col.group)
    ? ColGroups.getBySlug(col.group) : null;
  if (group) {
    badge.textContent = group.name;
    badge.style.background = (group.cor || '#aaa') + '22';
    badge.style.color      = group.cor || '#aaa';
    badge.style.display    = 'inline-flex';

    /* Borda topo do modal com cor do grupo */
    var modal = document.getElementById('colCollectionModal');
    if (modal) modal.style.borderTopColor = group.cor || 'transparent';
  } else {
    badge.style.display = 'none';
    var modal2 = document.getElementById('colCollectionModal');
    if (modal2) modal2.style.borderTopColor = 'transparent';
  }

  _colRenderLayoutsGrid(col);
  _colShowOverlay('colCollectionOverlay');
}

function colCloseCollectionModal() {
  _colHideOverlay('colCollectionOverlay');
  if (document.querySelectorAll('.modal-overlay:not(.hidden)').length === 0) {
    document.body.style.overflow = '';
  }
  _colCurrentCollection = null;
}

function _colRenderLayoutsGrid(col) {
  var grid = document.getElementById('colColLayoutsGrid');
  if (!grid) return;
  grid.innerHTML = '';

  var layouts = col.layouts || [];

  layouts.forEach(function (layout, i) {
    var block = document.createElement('div');
    block.className = 'col-layout-block';
    block.style.animationDelay = (i * 30) + 'ms';

    /* Preview */
    var previewWrap = document.createElement('div');
    previewWrap.className = 'col-layout-preview';
    var iframe = document.createElement('iframe');
    iframe.className = 'card-iframe';
    iframe.sandbox   = 'allow-scripts';
    iframe.title     = layout.name || '';
    colLazyIframe(iframe, layout.html || '', layout.css || '');
    iframe.addEventListener('load', function () { colScaleIframe(iframe); });
    var overlay = document.createElement('div');
    overlay.className = 'col-layout-preview-overlay';
    previewWrap.appendChild(iframe);
    previewWrap.appendChild(overlay);

    /* Nome */
    var body = document.createElement('div');
    body.className = 'col-layout-body';
    var nameEl = document.createElement('div');
    nameEl.className = 'col-layout-name';
    nameEl.textContent = layout.name || '';
    body.appendChild(nameEl);

    /* Ações */
    var footer = document.createElement('div');
    footer.className = 'col-layout-footer';

    var COPY_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>';

    var bH = document.createElement('button');
    bH.className = 'btn btn-ghost';
    bH.innerHTML = COPY_ICON + ' HTML';
    bH.addEventListener('click', function (e) {
      e.stopPropagation();
      if (typeof copyToClipboard === 'function') copyToClipboard(layout.html || '', bH, COPY_ICON + ' HTML');
    });

    var bC = document.createElement('button');
    bC.className = 'btn btn-ghost';
    bC.innerHTML = COPY_ICON + ' CSS';
    bC.addEventListener('click', function (e) {
      e.stopPropagation();
      if (typeof copyToClipboard === 'function') copyToClipboard(layout.css || '', bC, COPY_ICON + ' CSS');
    });

    var bEdit = document.createElement('button');
    bEdit.className = 'btn btn-edit-icon';
    bEdit.title = 'Editar layout';
    bEdit.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>';
    bEdit.addEventListener('click', function (e) {
      e.stopPropagation();
      colOpenEditLayoutModal(_colCurrentCollection, layout);
    });

    /* Âncora de delete — senko-github-col.js injeta botão aqui */
    var delAnchor = document.createElement('span');
    delAnchor.className = 'col-layout-delete-anchor';
    delAnchor.dataset.layoutId = layout.id || '';

    footer.appendChild(bH);
    footer.appendChild(bC);
    footer.appendChild(bEdit);
    footer.appendChild(delAnchor);

    block.appendChild(previewWrap);
    block.appendChild(body);
    block.appendChild(footer);

    /* Clique no bloco abre preview ampliado (placeholder — futura implementação) */
    block.addEventListener('click', function () {
      /* Por ora, não faz nada ao clicar no bloco — ações ficam nos botões */
    });

    grid.appendChild(block);
  });

  /* Card de adicionar layout */
  var addCard = document.createElement('button');
  addCard.className = 'col-layout-add-card';
  addCard.innerHTML =
    '<div class="col-layout-add-icon">+</div>' +
    '<span>Adicionar Layout</span>';
  addCard.addEventListener('click', function () {
    colOpenAddLayoutModal(_colCurrentCollection);
  });
  grid.appendChild(addCard);
}


/* ═══════════════════════════════════════════════════════════════════════
   2. MODAL DE CRIAR COLEÇÃO
═══════════════════════════════════════════════════════════════════════ */

function _colBuildCreateModal() {
  if (document.getElementById('colCreateOverlay')) return;

  var overlay = _colMakeOverlay('colCreateOverlay');

  overlay.innerHTML =
    '<div class="col-form-modal" id="colCreateModal">' +

      '<div class="col-form-header">' +
        '<div>' +
          '<div class="col-modal-category">Nova Coleção</div>' +
          '<h2 class="col-modal-title">Criar Coleção</h2>' +
        '</div>' +
        '<button class="modal-close" id="colCreateClose" title="Fechar">✕</button>' +
      '</div>' +

      '<div class="col-form-body">' +

        /* Nome */
        '<div class="col-field">' +
          '<label>Nome <span class="req">*</span></label>' +
          '<input type="text" id="colCreateName" placeholder="ex: Kit Lançamento 2026" />' +
          '<span class="col-field-hint">Nome de exibição na biblioteca de Coleções.</span>' +
          '<span class="col-field-error" id="colCreateNameErr">⚠ Nome obrigatório (mínimo 3 caracteres)</span>' +
        '</div>' +

        /* Slug */
        '<div class="col-field">' +
          '<label>Slug <span class="req">*</span></label>' +
          '<input type="text" id="colCreateSlug" placeholder="ex: kit-lancamento-2026" />' +
          '<span class="col-field-hint">Identificador único e imutável. Vira o nome do arquivo: <code>colecoes/data/<span id="colCreateSlugPreview">slug</span>.js</code></span>' +
          '<span class="col-field-error" id="colCreateSlugErr">⚠ Use apenas letras minúsculas, números e hífen</span>' +
        '</div>' +

        /* Grupo */
        '<div class="col-field">' +
          '<label>Grupo <span class="req">*</span></label>' +
          '<div style="display:flex;gap:.5rem;">' +
            '<select class="col-group-select" id="colCreateGroup"></select>' +
            '<button class="col-group-new-btn" id="colCreateNewGroupBtn">+ Novo grupo</button>' +
          '</div>' +
          '<span class="col-field-error" id="colCreateGroupErr">⚠ Selecione ou crie um grupo</span>' +
        '</div>' +

        /* Tags */
        '<div class="col-field">' +
          '<label>Tags <span class="col-field-hint" style="font-weight:600;">(separadas por vírgula)</span></label>' +
          '<input type="text" id="colCreateTags" placeholder="ex: hero, cta, banner" />' +
          '<span class="col-field-hint">Palavras-chave para busca.</span>' +
        '</div>' +

      '</div>' +

      '<div class="col-form-footer">' +
        /* Âncora para GitHub injetar botão de salvar */
        '<span id="colCreateGhAnchor" style="display:none;"></span>' +
        '<button class="col-btn-cancel" id="colCreateCancel">Cancelar</button>' +
      '</div>' +

    '</div>';

  var nameInput = document.getElementById('colCreateName');
  var slugInput = document.getElementById('colCreateSlug');

  /* Auto-gera slug a partir do nome */
  nameInput.addEventListener('input', function () {
    var slug = _colSlugify(this.value);
    slugInput.value = slug;
    document.getElementById('colCreateSlugPreview').textContent = slug || 'slug';
    _colValidateCreateForm();
  });

  slugInput.addEventListener('input', function () {
    document.getElementById('colCreateSlugPreview').textContent = this.value || 'slug';
    _colValidateCreateForm();
  });

  document.getElementById('colCreateGroup').addEventListener('change', _colValidateCreateForm);

  document.getElementById('colCreateNewGroupBtn').addEventListener('click', function () {
    colOpenNewGroupModal(function (grupo) {
      /* Callback: grupo criado → re-popula select e seleciona o novo */
      var sel = document.getElementById('colCreateGroup');
      _colPopulateGroupSelect(sel, grupo.slug);
      _colValidateCreateForm();
    });
  });

  document.getElementById('colCreateClose').addEventListener('click', colCloseCreateModal);
  document.getElementById('colCreateCancel').addEventListener('click', colCloseCreateModal);
  _colOverlayClick('colCreateOverlay', 'colCreateModal', colCloseCreateModal);
}

function colOpenCreateModal() {
  _colBuildCreateModal();

  /* Limpa campos */
  ['colCreateName', 'colCreateSlug', 'colCreateTags'].forEach(function (id) {
    document.getElementById(id).value = '';
  });
  document.getElementById('colCreateSlugPreview').textContent = 'slug';

  /* Popula grupos */
  _colPopulateGroupSelect(document.getElementById('colCreateGroup'), null);

  /* Esconde erros */
  ['colCreateNameErr', 'colCreateSlugErr', 'colCreateGroupErr'].forEach(function (id) {
    document.getElementById(id).style.display = 'none';
  });

  _colShowOverlay('colCreateOverlay');
}

function colCloseCreateModal() {
  _colHideOverlay('colCreateOverlay');
  if (document.querySelectorAll('.modal-overlay:not(.hidden)').length === 0) {
    document.body.style.overflow = '';
  }
}

function _colValidateCreateForm() {
  var name  = (document.getElementById('colCreateName')  || {}).value || '';
  var slug  = (document.getElementById('colCreateSlug')  || {}).value || '';
  var group = (document.getElementById('colCreateGroup') || {}).value || '';

  var nameOk  = name.trim().length >= 3;
  var slugOk  = _colValidSlug(slug.trim());
  var groupOk = !!group;

  _colShowFieldError('colCreateNameErr',  !nameOk  && name.length > 0);
  _colShowFieldError('colCreateSlugErr',  !slugOk  && slug.length > 0);
  _colShowFieldError('colCreateGroupErr', false); /* só mostra no submit */

  return nameOk && slugOk && groupOk;
}

function _colShowFieldError(id, show) {
  var el = document.getElementById(id);
  if (el) el.style.display = show ? 'block' : 'none';
}

/* Lê os dados do formulário de criação — usado pelo módulo GitHub */
function colGetCreateFormData() {
  var name  = (document.getElementById('colCreateName')  || {}).value || '';
  var slug  = (document.getElementById('colCreateSlug')  || {}).value || '';
  var group = (document.getElementById('colCreateGroup') || {}).value || '';
  var tags  = ((document.getElementById('colCreateTags') || {}).value || '')
    .split(',').map(function (t) { return t.trim(); }).filter(Boolean);

  /* Validação final */
  var ok = name.trim().length >= 3 && _colValidSlug(slug.trim()) && !!group;
  if (!ok) {
    _colShowFieldError('colCreateNameErr',  name.trim().length < 3);
    _colShowFieldError('colCreateSlugErr',  !_colValidSlug(slug.trim()));
    _colShowFieldError('colCreateGroupErr', !group);
  }
  return ok ? { name: name.trim(), slug: slug.trim(), group: group, tags: tags } : null;
}


/* ═══════════════════════════════════════════════════════════════════════
   3. MODAL DE EDITAR COLEÇÃO (metadados)
═══════════════════════════════════════════════════════════════════════ */

function _colBuildEditModal() {
  if (document.getElementById('colEditOverlay')) return;

  var overlay = _colMakeOverlay('colEditOverlay');

  overlay.innerHTML =
    '<div class="col-form-modal" id="colEditModal">' +

      '<div class="col-form-header">' +
        '<div>' +
          '<div class="col-modal-category">Editar</div>' +
          '<h2 class="col-modal-title">Editar Coleção</h2>' +
        '</div>' +
        '<button class="modal-close" id="colEditClose" title="Fechar">✕</button>' +
      '</div>' +

      '<input type="hidden" id="colEditSlug" />' +

      '<div class="col-form-body">' +

        '<div class="col-field">' +
          '<label>Nome <span class="req">*</span></label>' +
          '<input type="text" id="colEditName" placeholder="Nome da coleção" />' +
          '<span class="col-field-error" id="colEditNameErr">⚠ Nome obrigatório (mínimo 3 caracteres)</span>' +
        '</div>' +

        '<div class="col-field">' +
          '<label>Grupo <span class="req">*</span></label>' +
          '<div style="display:flex;gap:.5rem;">' +
            '<select class="col-group-select" id="colEditGroup"></select>' +
            '<button class="col-group-new-btn" id="colEditNewGroupBtn">+ Novo grupo</button>' +
          '</div>' +
          '<span class="col-field-error" id="colEditGroupErr">⚠ Selecione um grupo</span>' +
        '</div>' +

        '<div class="col-field">' +
          '<label>Tags <span class="col-field-hint" style="font-weight:600;">(separadas por vírgula)</span></label>' +
          '<input type="text" id="colEditTags" placeholder="ex: hero, cta, banner" />' +
        '</div>' +

      '</div>' +

      '<div class="col-form-footer">' +
        '<span id="colEditGhAnchor" style="display:none;"></span>' +
        '<button class="col-btn-cancel" id="colEditCancel">Cancelar</button>' +
      '</div>' +

    '</div>';

  document.getElementById('colEditName').addEventListener('input', function () {
    _colShowFieldError('colEditNameErr', this.value.trim().length < 3 && this.value.length > 0);
  });

  document.getElementById('colEditNewGroupBtn').addEventListener('click', function () {
    colOpenNewGroupModal(function (grupo) {
      var sel = document.getElementById('colEditGroup');
      _colPopulateGroupSelect(sel, grupo.slug);
    });
  });

  document.getElementById('colEditClose').addEventListener('click', colCloseEditModal);
  document.getElementById('colEditCancel').addEventListener('click', colCloseEditModal);
  _colOverlayClick('colEditOverlay', 'colEditModal', colCloseEditModal);
}

function colOpenEditModal(col) {
  _colBuildEditModal();
  _colCurrentCollection = col;

  document.getElementById('colEditSlug').value = col.slug;
  document.getElementById('colEditName').value = col.name || '';
  document.getElementById('colEditTags').value = (col.tags || []).join(', ');

  _colPopulateGroupSelect(document.getElementById('colEditGroup'), col.group);

  ['colEditNameErr', 'colEditGroupErr'].forEach(function (id) {
    document.getElementById(id).style.display = 'none';
  });

  _colShowOverlay('colEditOverlay');
}

function colCloseEditModal() {
  _colHideOverlay('colEditOverlay');
  if (document.querySelectorAll('.modal-overlay:not(.hidden)').length === 0) {
    document.body.style.overflow = '';
  }
}

/* Lê dados do formulário de edição — usado pelo módulo GitHub */
function colGetEditFormData() {
  var slug  = (document.getElementById('colEditSlug')  || {}).value || '';
  var name  = (document.getElementById('colEditName')  || {}).value || '';
  var group = (document.getElementById('colEditGroup') || {}).value || '';
  var tags  = ((document.getElementById('colEditTags') || {}).value || '')
    .split(',').map(function (t) { return t.trim(); }).filter(Boolean);

  var ok = name.trim().length >= 3 && !!group;
  if (!ok) {
    _colShowFieldError('colEditNameErr',  name.trim().length < 3);
    _colShowFieldError('colEditGroupErr', !group);
  }
  return ok ? { slug: slug, name: name.trim(), group: group, tags: tags } : null;
}


/* ═══════════════════════════════════════════════════════════════════════
   4. MODAL DE NOVO GRUPO
═══════════════════════════════════════════════════════════════════════ */

var _colNewGroupCallback = null; /* função chamada após criar grupo */

function _colBuildNewGroupModal() {
  if (document.getElementById('colNewGroupOverlay')) return;

  var overlay = _colMakeOverlay('colNewGroupOverlay');

  /* Swatches de cor */
  var swatchesHtml = COL_PRESET_COLORS.map(function (c) {
    return '<button class="col-color-swatch" style="background:' + c + ';" data-color="' + c + '" title="' + c + '"></button>';
  }).join('');

  overlay.innerHTML =
    '<div class="col-newgroup-modal col-form-modal" id="colNewGroupModal">' +

      '<div class="col-form-header">' +
        '<div>' +
          '<div class="col-modal-category">Novo Grupo</div>' +
          '<h2 class="col-modal-title">Criar Grupo</h2>' +
        '</div>' +
        '<button class="modal-close" id="colNewGroupClose" title="Fechar">✕</button>' +
      '</div>' +

      '<div class="col-form-body">' +

        '<div class="col-field">' +
          '<label>Nome <span class="req">*</span></label>' +
          '<input type="text" id="colNewGroupName" placeholder="ex: Projetos 2027" />' +
          '<span class="col-field-error" id="colNewGroupNameErr">⚠ Nome obrigatório</span>' +
        '</div>' +

        '<div class="col-field">' +
          '<label>Cor</label>' +
          '<div class="col-color-palette" id="colNewGroupPalette">' + swatchesHtml + '</div>' +
          '<div class="col-color-custom-wrap" style="margin-top:.5rem;">' +
            '<div class="col-color-preview" id="colNewGroupColorPreview" style="background:' + COL_PRESET_COLORS[4] + ';"></div>' +
            '<input type="text" class="col-color-hex-input" id="colNewGroupColorHex" value="' + COL_PRESET_COLORS[4] + '" maxlength="7" placeholder="#6366f1" />' +
          '</div>' +
        '</div>' +

      '</div>' +

      '<div class="col-form-footer">' +
        '<button class="col-btn-cancel" id="colNewGroupCancel">Cancelar</button>' +
        '<button class="col-btn-primary" id="colNewGroupConfirm">Criar Grupo</button>' +
      '</div>' +

    '</div>';

  /* Seleção de cor */
  document.getElementById('colNewGroupPalette').addEventListener('click', function (e) {
    var sw = e.target.closest('.col-color-swatch');
    if (!sw) return;
    var cor = sw.dataset.color;
    document.getElementById('colNewGroupColorHex').value = cor;
    document.getElementById('colNewGroupColorPreview').style.background = cor;
    document.querySelectorAll('.col-color-swatch').forEach(function (s) { s.classList.remove('active'); });
    sw.classList.add('active');
  });

  document.getElementById('colNewGroupColorHex').addEventListener('input', function () {
    var val = this.value;
    if (/^#[0-9a-fA-F]{6}$/.test(val)) {
      document.getElementById('colNewGroupColorPreview').style.background = val;
      document.querySelectorAll('.col-color-swatch').forEach(function (s) { s.classList.remove('active'); });
    }
  });

  document.getElementById('colNewGroupConfirm').addEventListener('click', function () {
    var name = (document.getElementById('colNewGroupName').value || '').trim();
    if (!name) {
      document.getElementById('colNewGroupNameErr').style.display = 'block';
      return;
    }
    var cor  = document.getElementById('colNewGroupColorHex').value || COL_PRESET_COLORS[4];
    var slug = _colSlugify(name);
    if (!slug) { slug = 'grupo-' + Date.now(); }

    var grupo = { slug: slug, name: name, cor: cor };

    /* Adiciona como pendente no ColGroups */
    if (typeof ColGroups !== 'undefined') {
      ColGroups.addPending(grupo);
    }

    _colHideOverlay('colNewGroupOverlay');

    /* Chama callback do modal pai */
    if (typeof _colNewGroupCallback === 'function') {
      _colNewGroupCallback(grupo);
      _colNewGroupCallback = null;
    }
  });

  document.getElementById('colNewGroupClose').addEventListener('click', function () {
    _colHideOverlay('colNewGroupOverlay');
    _colNewGroupCallback = null;
  });
  document.getElementById('colNewGroupCancel').addEventListener('click', function () {
    _colHideOverlay('colNewGroupOverlay');
    _colNewGroupCallback = null;
  });
  _colOverlayClick('colNewGroupOverlay', 'colNewGroupModal', function () {
    _colHideOverlay('colNewGroupOverlay');
    _colNewGroupCallback = null;
  });
}

function colOpenNewGroupModal(callback) {
  _colBuildNewGroupModal();

  /* Limpa campos */
  document.getElementById('colNewGroupName').value = '';
  document.getElementById('colNewGroupNameErr').style.display = 'none';
  document.getElementById('colNewGroupColorHex').value = COL_PRESET_COLORS[4];
  document.getElementById('colNewGroupColorPreview').style.background = COL_PRESET_COLORS[4];
  document.querySelectorAll('.col-color-swatch').forEach(function (s) { s.classList.remove('active'); });

  _colNewGroupCallback = callback || null;
  _colShowOverlay('colNewGroupOverlay');
}


/* ═══════════════════════════════════════════════════════════════════════
   5. MODAL DE ADICIONAR LAYOUT À COLEÇÃO
═══════════════════════════════════════════════════════════════════════ */

function _colBuildAddLayoutModal() {
  if (document.getElementById('colAddLayoutOverlay')) return;

  var overlay = _colMakeOverlay('colAddLayoutOverlay');

  overlay.innerHTML =
    '<div class="col-layout-form-modal" id="colAddLayoutModal">' +

      '<div class="col-form-header">' +
        '<div>' +
          '<div class="col-modal-category" id="colAddLayoutParentName"></div>' +
          '<h2 class="col-modal-title">Adicionar Layout</h2>' +
        '</div>' +
        '<button class="modal-close" id="colAddLayoutClose" title="Fechar">✕</button>' +
      '</div>' +

      /* Campo ID e Nome */
      '<div class="col-form-body" style="padding-bottom:0;flex-shrink:0;">' +
        '<div class="col-field-row">' +
          '<div class="col-field">' +
            '<label>ID <span class="req">*</span></label>' +
            '<input type="text" id="colAddLayoutId" placeholder="ex: hero-principal" />' +
            '<span class="col-field-error" id="colAddLayoutIdErr">⚠ Use apenas letras minúsculas, números e hífen</span>' +
          '</div>' +
          '<div class="col-field">' +
            '<label>Nome <span class="req">*</span></label>' +
            '<input type="text" id="colAddLayoutName" placeholder="ex: Hero Principal" />' +
            '<span class="col-field-error" id="colAddLayoutNameErr">⚠ Nome obrigatório</span>' +
          '</div>' +
        '</div>' +
      '</div>' +

      /* Editor HTML/CSS/Preview */
      '<div class="col-edit-mode-bar">' +
        '<button class="col-edit-mode-btn active" data-colmode="html">HTML</button>' +
        '<button class="col-edit-mode-btn" data-colmode="css">CSS</button>' +
        '<button class="col-edit-mode-btn" data-colmode="preview">Preview</button>' +
      '</div>' +

      '<div class="col-edit-main">' +
        '<div class="col-edit-panel active" id="colAddPanelHtml">' +
          '<textarea class="col-edit-textarea" id="colAddLayoutHtml" placeholder="Cole o HTML do layout aqui…"></textarea>' +
        '</div>' +
        '<div class="col-edit-panel" id="colAddPanelCss">' +
          '<textarea class="col-edit-textarea" id="colAddLayoutCss" placeholder="Cole o CSS do layout aqui…"></textarea>' +
        '</div>' +
        '<div class="col-edit-panel" id="colAddPanelPreview">' +
          '<iframe class="col-edit-iframe" id="colAddLayoutPreview" sandbox="allow-scripts"></iframe>' +
        '</div>' +
      '</div>' +

      '<div class="col-form-footer">' +
        '<span id="colAddLayoutGhAnchor" style="display:none;"></span>' +
        '<button class="col-btn-cancel" id="colAddLayoutCancel">Cancelar</button>' +
      '</div>' +

    '</div>';

  /* Troca de modo HTML/CSS/Preview */
  document.querySelectorAll('#colAddLayoutModal .col-edit-mode-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('#colAddLayoutModal .col-edit-mode-btn').forEach(function (b) { b.classList.remove('active'); });
      document.querySelectorAll('#colAddLayoutModal .col-edit-panel').forEach(function (p) { p.classList.remove('active'); });
      this.classList.add('active');
      var mode = this.dataset.colmode;
      var panels = { html: 'colAddPanelHtml', css: 'colAddPanelCss', preview: 'colAddPanelPreview' };
      document.getElementById(panels[mode]).classList.add('active');
      if (mode === 'preview') {
        _colRefreshPreview('colAddLayoutPreview',
          document.getElementById('colAddLayoutHtml').value,
          document.getElementById('colAddLayoutCss').value);
      }
    });
  });

  /* Validação inline de ID */
  document.getElementById('colAddLayoutId').addEventListener('input', function () {
    var id = this.value.trim();
    _colShowFieldError('colAddLayoutIdErr', id.length > 0 && !_colValidSlug(id));
  });

  document.getElementById('colAddLayoutClose').addEventListener('click', colCloseAddLayoutModal);
  document.getElementById('colAddLayoutCancel').addEventListener('click', colCloseAddLayoutModal);
  _colOverlayClick('colAddLayoutOverlay', 'colAddLayoutModal', colCloseAddLayoutModal);
}

function colOpenAddLayoutModal(col) {
  _colBuildAddLayoutModal();
  _colCurrentCollection = col;

  var catEl = document.getElementById('colAddLayoutParentName');
  if (catEl) catEl.textContent = 'em: ' + (col ? col.name : '');

  ['colAddLayoutId', 'colAddLayoutName', 'colAddLayoutHtml', 'colAddLayoutCss'].forEach(function (id) {
    document.getElementById(id).value = '';
  });
  ['colAddLayoutIdErr', 'colAddLayoutNameErr'].forEach(function (id) {
    document.getElementById(id).style.display = 'none';
  });

  /* Volta para aba HTML */
  document.querySelectorAll('#colAddLayoutModal .col-edit-mode-btn').forEach(function (b) { b.classList.remove('active'); });
  document.querySelectorAll('#colAddLayoutModal .col-edit-panel').forEach(function (p) { p.classList.remove('active'); });
  document.querySelector('[data-colmode="html"]').classList.add('active');
  document.getElementById('colAddPanelHtml').classList.add('active');
  document.getElementById('colAddLayoutPreview').srcdoc = '';

  _colShowOverlay('colAddLayoutOverlay');
}

function colCloseAddLayoutModal() {
  _colHideOverlay('colAddLayoutOverlay');
  if (document.querySelectorAll('.modal-overlay:not(.hidden)').length === 0) {
    document.body.style.overflow = '';
  }
}

/* Lê dados do formulário de novo layout — usado pelo módulo GitHub */
function colGetAddLayoutFormData() {
  var id   = (document.getElementById('colAddLayoutId')   || {}).value || '';
  var name = (document.getElementById('colAddLayoutName') || {}).value || '';
  var html = (document.getElementById('colAddLayoutHtml') || {}).value || '';
  var css  = (document.getElementById('colAddLayoutCss')  || {}).value || '';

  id = id.trim().toLowerCase();
  var ok = _colValidSlug(id) && name.trim().length >= 1;
  if (!ok) {
    _colShowFieldError('colAddLayoutIdErr',   !_colValidSlug(id));
    _colShowFieldError('colAddLayoutNameErr', name.trim().length < 1);
  }
  return ok ? { id: id, name: name.trim(), html: html, css: css } : null;
}


/* ═══════════════════════════════════════════════════════════════════════
   6. MODAL DE EDITAR LAYOUT DENTRO DE COLEÇÃO
═══════════════════════════════════════════════════════════════════════ */

function _colBuildEditLayoutModal() {
  if (document.getElementById('colEditLayoutOverlay')) return;

  var overlay = _colMakeOverlay('colEditLayoutOverlay');

  overlay.innerHTML =
    '<div class="col-layout-form-modal" id="colEditLayoutModal">' +

      '<div class="col-form-header">' +
        '<div>' +
          '<div class="col-modal-category">Editar Layout</div>' +
          '<h2 class="col-modal-title" id="colEditLayoutTitle"></h2>' +
        '</div>' +
        '<div style="display:flex;gap:.5rem;align-items:center;">' +
          '<span id="colEditLayoutGhAnchor" style="display:none;"></span>' +
          '<button class="modal-close" id="colEditLayoutClose" title="Fechar">✕</button>' +
        '</div>' +
      '</div>' +

      '<input type="hidden" id="colEditLayoutId" />' +

      '<div class="col-form-body" style="padding-bottom:0;flex-shrink:0;">' +
        '<div class="col-field">' +
          '<label>Nome <span class="req">*</span></label>' +
          '<input type="text" id="colEditLayoutName" placeholder="Nome do layout" />' +
          '<span class="col-field-error" id="colEditLayoutNameErr">⚠ Nome obrigatório</span>' +
        '</div>' +
      '</div>' +

      '<div class="col-edit-mode-bar">' +
        '<button class="col-edit-mode-btn" data-coleditmode="html">HTML</button>' +
        '<button class="col-edit-mode-btn" data-coleditmode="css">CSS</button>' +
        '<button class="col-edit-mode-btn active" data-coleditmode="preview">Visualizar</button>' +
      '</div>' +

      '<div class="col-edit-main">' +
        '<div class="col-edit-panel" id="colEditPanelHtml">' +
          '<textarea class="col-edit-textarea" id="colEditLayoutHtml" placeholder="HTML do layout…"></textarea>' +
        '</div>' +
        '<div class="col-edit-panel" id="colEditPanelCss">' +
          '<textarea class="col-edit-textarea" id="colEditLayoutCss" placeholder="CSS do layout…"></textarea>' +
        '</div>' +
        '<div class="col-edit-panel active" id="colEditPanelPreview">' +
          '<iframe class="col-edit-iframe" id="colEditLayoutPreview" sandbox="allow-scripts"></iframe>' +
        '</div>' +
      '</div>' +

      '<div class="col-form-footer">' +
        '<span id="colEditLayoutDelAnchor" style="display:none;"></span>' +
        '<button class="col-btn-cancel" id="colEditLayoutCancel">Cancelar</button>' +
      '</div>' +

    '</div>';

  /* Troca de modo */
  document.querySelectorAll('#colEditLayoutModal .col-edit-mode-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('#colEditLayoutModal .col-edit-mode-btn').forEach(function (b) { b.classList.remove('active'); });
      document.querySelectorAll('#colEditLayoutModal .col-edit-panel').forEach(function (p) { p.classList.remove('active'); });
      this.classList.add('active');
      var mode = this.dataset.coleditmode;
      var panels = { html: 'colEditPanelHtml', css: 'colEditPanelCss', preview: 'colEditPanelPreview' };
      document.getElementById(panels[mode]).classList.add('active');
      if (mode === 'preview') {
        _colRefreshPreview('colEditLayoutPreview',
          document.getElementById('colEditLayoutHtml').value,
          document.getElementById('colEditLayoutCss').value);
      }
    });
  });

  document.getElementById('colEditLayoutClose').addEventListener('click', colCloseEditLayoutModal);
  document.getElementById('colEditLayoutCancel').addEventListener('click', colCloseEditLayoutModal);
  _colOverlayClick('colEditLayoutOverlay', 'colEditLayoutModal', colCloseEditLayoutModal);
}

function colOpenEditLayoutModal(col, layout) {
  _colBuildEditLayoutModal();
  _colCurrentCollection = col;
  _colCurrentLayout     = layout;

  document.getElementById('colEditLayoutTitle').textContent = layout.name || '';
  document.getElementById('colEditLayoutId').value    = layout.id   || '';
  document.getElementById('colEditLayoutName').value  = layout.name || '';
  document.getElementById('colEditLayoutHtml').value  = layout.html || '';
  document.getElementById('colEditLayoutCss').value   = layout.css  || '';
  document.getElementById('colEditLayoutNameErr').style.display = 'none';

  /* Começa no Preview */
  document.querySelectorAll('#colEditLayoutModal .col-edit-mode-btn').forEach(function (b) { b.classList.remove('active'); });
  document.querySelectorAll('#colEditLayoutModal .col-edit-panel').forEach(function (p) { p.classList.remove('active'); });
  document.querySelector('[data-coleditmode="preview"]').classList.add('active');
  document.getElementById('colEditPanelPreview').classList.add('active');

  _colRefreshPreview('colEditLayoutPreview', layout.html || '', layout.css || '');

  _colShowOverlay('colEditLayoutOverlay');
}

function colCloseEditLayoutModal() {
  _colHideOverlay('colEditLayoutOverlay');
  if (document.querySelectorAll('.modal-overlay:not(.hidden)').length === 0) {
    document.body.style.overflow = '';
  }
  _colCurrentLayout = null;
}

/* Lê dados do formulário de edição de layout — usado pelo módulo GitHub */
function colGetEditLayoutFormData() {
  var id   = (document.getElementById('colEditLayoutId')   || {}).value || '';
  var name = (document.getElementById('colEditLayoutName') || {}).value || '';
  var html = (document.getElementById('colEditLayoutHtml') || {}).value || '';
  var css  = (document.getElementById('colEditLayoutCss')  || {}).value || '';

  var ok = name.trim().length >= 1;
  if (!ok) _colShowFieldError('colEditLayoutNameErr', true);
  return ok ? { id: id, name: name.trim(), html: html, css: css } : null;
}


/* ═══════════════════════════════════════════════════════════════════════
   7. MODAL DE CONFIRMAÇÃO GENÉRICO
═══════════════════════════════════════════════════════════════════════ */

function _colBuildConfirmModal() {
  if (document.getElementById('colConfirmOverlay')) return;

  var overlay = _colMakeOverlay('colConfirmOverlay');

  overlay.innerHTML =
    '<div class="col-confirm-modal" id="colConfirmModal">' +
      '<div class="col-confirm-title" id="colConfirmTitle"></div>' +
      '<div class="col-confirm-body"  id="colConfirmBody"></div>' +
      '<div class="col-confirm-actions">' +
        '<button class="col-btn-cancel" id="colConfirmCancel">Cancelar</button>' +
        '<button class="col-btn-delete" id="colConfirmOk">Excluir</button>' +
      '</div>' +
    '</div>';

  document.getElementById('colConfirmCancel').addEventListener('click', function () {
    _colHideOverlay('colConfirmOverlay');
    if (document.querySelectorAll('.modal-overlay:not(.hidden)').length === 0) {
      document.body.style.overflow = '';
    }
  });
  _colOverlayClick('colConfirmOverlay', 'colConfirmModal', function () {
    _colHideOverlay('colConfirmOverlay');
    if (document.querySelectorAll('.modal-overlay:not(.hidden)').length === 0) {
      document.body.style.overflow = '';
    }
  });
}

/*
  opts = {
    title:     string,
    body:      string,
    labelOk:   string (default: 'Excluir'),
    danger:    bool   (default: true — botão vermelho),
    onConfirm: function,
  }
*/
function colOpenConfirm(opts) {
  _colBuildConfirmModal();

  document.getElementById('colConfirmTitle').textContent = opts.title || 'Confirmar';
  document.getElementById('colConfirmBody').textContent  = opts.body  || '';

  var btnOk = document.getElementById('colConfirmOk');
  btnOk.textContent = opts.labelOk || 'Excluir';
  btnOk.className   = opts.danger === false ? 'col-btn-primary' : 'col-btn-delete';

  /* Remove listener anterior */
  var newBtn = btnOk.cloneNode(true);
  btnOk.parentNode.replaceChild(newBtn, btnOk);
  newBtn.addEventListener('click', function () {
    _colHideOverlay('colConfirmOverlay');
    if (document.querySelectorAll('.modal-overlay:not(.hidden)').length === 0) {
      document.body.style.overflow = '';
    }
    if (typeof opts.onConfirm === 'function') opts.onConfirm();
  });

  _colShowOverlay('colConfirmOverlay');
}


/* ═══════════════════════════════════════════════════════════════════════
   ESC — fecha o modal de coleção mais externo aberto
═══════════════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', function () {
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;

    /* Ordem: do mais interno para o mais externo */
    var stack = [
      'colConfirmOverlay',
      'colEditLayoutOverlay',
      'colAddLayoutOverlay',
      'colNewGroupOverlay',
      'colEditOverlay',
      'colCreateOverlay',
      'colCollectionOverlay',
    ];

    for (var i = 0; i < stack.length; i++) {
      var el = document.getElementById(stack[i]);
      if (el && !el.classList.contains('hidden')) {
        el.classList.add('hidden');
        if (document.querySelectorAll('.modal-overlay:not(.hidden)').length === 0) {
          document.body.style.overflow = '';
        }
        return; /* fecha só o mais interno */
      }
    }
  });
});
