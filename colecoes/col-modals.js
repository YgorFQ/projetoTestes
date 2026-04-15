// @ts-nocheck
/* ═══════════════════════════════════════════════════════════════════════
   col-modals.js — Modais das Coleções

   RESPONSABILIDADE:
     Três modais completamente independentes da Biblioteca oficial:

     1. Modal de layouts da coleção (colOpenCollectionModal)
        Abre ao clicar num bloco. Exibe os layouts daquela coleção
        em grid igual ao de variants — com preview, HTML, CSS,
        favorito e editar. Sem botão de adicionar variant.

     2. Modal de adição de coleção (colOpenAddModal)
        Campos: Nome Exibido, Coleção (slug/arquivo), Tags,
        Autor (opcional), Cor (opcional — 32 cores pré-definidas).

     3. Modal de edição de coleção (colOpenEditModal)
        Mesmos campos do modal de adição, pré-preenchidos.
        Inclui botão de excluir (usado pelo módulo GitHub).

   DEPENDÊNCIAS:
     - col-core.js    (ColLib)
     - col-script.js  (colRenderGrid, colGetAuthorColor, colState)

   EXPÕE (funções globais):
     colOpenCollectionModal(col)
     colCloseCollectionModal()
     colOpenAddModal()
     colCloseAddModal()
     colOpenEditModal(col)
     colCloseEditModal()
     colState (adiciona currentCollection, currentEditCollection)

   ORDEM DE CARREGAMENTO no index.html:
     1. col-core.js
     2. col-script.js
     3. col-modals.js    ← este arquivo
═══════════════════════════════════════════════════════════════════════ */


/* ═══════════════════════════════════════════════════════════════════════
   EXTENSÃO DO colState
═══════════════════════════════════════════════════════════════════════ */
colState.currentCollection      = null; /* coleção aberta no modal de layouts */
colState.currentEditCollection  = null; /* coleção aberta no modal de edição  */


/* ═══════════════════════════════════════════════════════════════════════
   PALETA DE 32 CORES
   Definida aqui para que o seletor de cor do modal de adição/edição
   seja completamente autocontido.
═══════════════════════════════════════════════════════════════════════ */
var COL_PALETTE = [
  /* Roxos */  '#7F77DD','#534AB7','#AFA9EC','#CECBF6',
  /* Azuis */  '#378ADD','#185FA5','#85B7EB','#B5D4F4',
  /* Verdes */ '#1D9E75','#0F6E56','#5DCAA5','#9FE1CB',
  /* Teal */   '#639922','#3B6D11','#97C459','#C0DD97',
  /* Ambar */  '#EF9F27','#BA7517','#FAC775','#FAEEDA',
  /* Coral */  '#D85A30','#993C1D','#F0997B','#F5C4B3',
  /* Rosa */   '#D4537E','#993556','#ED93B1','#F4C0D1',
  /* Cinza */  '#888780','#5F5E5A','#444441','#2C2C2A',
];


/* ═══════════════════════════════════════════════════════════════════════
   UTILITÁRIOS INTERNOS
═══════════════════════════════════════════════════════════════════════ */

/* Fecha overlay ao clicar fora — mesmo padrão do script.js */
function _colOverlayClick(id, closeFn) {
  return function (e) {
    if (e.target !== this) return;
    closeFn();
  };
}

/* Valida slug: só letras minúsculas, números e hífen */
function _colValidateSlug(val) {
  return /^[a-z0-9-]+$/.test(val);
}

/* Escapa HTML para exibição em <pre> */
function _colEscapeHtml(str) {
  return (str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/* buildSrcDoc — reutiliza do script.js se disponível */
function _colBuildSrcDoc(html, css) {
  if (typeof buildSrcDoc === 'function') return buildSrcDoc(html, css);
  return '<!DOCTYPE html><html><head><meta charset="UTF-8"><style>'
    + (css || '') + '</style></head><body>' + (html || '') + '</body></html>';
}

/* copyToClipboard — reutiliza do script.js se disponível */
function _colCopy(text, btn, label) {
  if (typeof copyToClipboard === 'function') {
    copyToClipboard(text, btn, label);
    return;
  }
  navigator.clipboard.writeText(text).then(function () {
    btn.textContent = '✓ Copiado!';
    setTimeout(function () { btn.innerHTML = label; }, 1800);
  });
}

var _COL_COPY_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>';


/* ═══════════════════════════════════════════════════════════════════════
   1. MODAL DE LAYOUTS DA COLEÇÃO
   Abre ao clicar num bloco do grid.
   Exibe os layouts daquela coleção sem botão de adicionar.
═══════════════════════════════════════════════════════════════════════ */

function colOpenCollectionModal(col) {
  colState.currentCollection = col;

  var overlay = document.getElementById('colCollectionOverlay');
  if (!overlay) return;

  /* Cabeçalho */
  var titleEl = document.getElementById('colCollectionTitle');
  if (titleEl) titleEl.textContent = col.name;

  var slugEl = document.getElementById('colCollectionSlug');
  if (slugEl) slugEl.textContent = col.slug;

  /* Autor */
  var authorWrap = document.getElementById('colCollectionAuthor');
  if (authorWrap) {
    var hasAuthor = !!(col.author && col.author.trim());
    if (hasAuthor) {
      var color = colGetAuthorColor(col.color);
      authorWrap.innerHTML =
        '<span class="col-author-dot" style="background:' + color + ';"></span>' +
        col.author;
      authorWrap.style.display = 'flex';
    } else {
      authorWrap.style.display = 'none';
    }
  }

  /* Renderiza layouts */
  _colRenderLayoutsGrid(col);

  overlay.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  overlay.scrollTop = 0;
}

function colCloseCollectionModal() {
  var overlay = document.getElementById('colCollectionOverlay');
  if (overlay) overlay.classList.add('hidden');
  document.body.style.overflow = '';
  colState.currentCollection = null;
}

/* Grid de layouts dentro do modal de coleção */
function _colRenderLayoutsGrid(col) {
  var grid    = document.getElementById('colLayoutsGrid');
  var countEl = document.getElementById('colCollectionCount');
  if (!grid) return;

  var layouts = ColLib.getLayouts(col.slug);
  grid.innerHTML = '';

  if (countEl) {
    countEl.textContent = layouts.length + (layouts.length === 1 ? ' layout' : ' layouts');
  }

  if (layouts.length === 0) {
    grid.innerHTML =
      '<p class="col-empty-msg">Nenhum layout nesta coleção ainda.</p>';
    return;
  }

  layouts.forEach(function (layout, i) {
    grid.appendChild(_colCreateLayoutCard(layout, col, i));
  });
}

/* Card de layout dentro do modal de coleção */
function _colCreateLayoutCard(layout, col, index) {
  var card = document.createElement('div');
  card.className = 'variant-block';
  card.style.animationDelay = (index * 40) + 'ms';

  /* Preview com lazy loading */
  var previewWrap = document.createElement('div');
  previewWrap.className = 'variant-preview';

  var iframe = document.createElement('iframe');
  iframe.className = 'card-iframe';
  iframe.sandbox   = 'allow-scripts';
  iframe.title     = layout.name;

  /* Lazy loading — reutiliza mecanismo do script.js se disponível */
  if (typeof lazyIframe === 'function') {
    lazyIframe(iframe, layout.html, layout.css);
  } else {
    iframe.srcdoc = _colBuildSrcDoc(layout.html, layout.css);
  }
  if (typeof scaleCardIframe === 'function') {
    iframe.addEventListener('load', function () { scaleCardIframe(iframe); });
  }

  var ov = document.createElement('div');
  ov.className = 'variant-preview-overlay';
  previewWrap.append(iframe, ov);

  /* Nome */
  var body   = document.createElement('div');
  body.className = 'variant-body';
  var nameEl = document.createElement('div');
  nameEl.className   = 'variant-name';
  nameEl.textContent = layout.name;
  body.appendChild(nameEl);

  /* Ações */
  var actions = document.createElement('div');
  actions.className = 'variant-footer';

  var bH = document.createElement('button');
  bH.className = 'btn btn-ghost';
  bH.innerHTML = _COL_COPY_ICON + ' HTML';
  bH.addEventListener('click', function (e) {
    e.stopPropagation();
    _colCopy(layout.html, bH, _COL_COPY_ICON + ' HTML');
  });

  var bC = document.createElement('button');
  bC.className = 'btn btn-ghost';
  bC.innerHTML = _COL_COPY_ICON + ' CSS';
  bC.addEventListener('click', function (e) {
    e.stopPropagation();
    _colCopy(layout.css, bC, _COL_COPY_ICON + ' CSS');
  });

  /* Favorito — usa prefixo 'col-layout__' */
  var favKey = 'col-layout__' + col.slug + '__' + layout.id;
  var bFav   = document.createElement('button');
  bFav.className = 'btn btn-fav' + (colIsFav(favKey) ? ' active' : '');
  bFav.title     = 'Favorito';
  bFav.innerHTML =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14">' +
    '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>' +
    '</svg>';
  bFav.addEventListener('click', function (e) {
    e.stopPropagation();
    colToggleFav(favKey);
    bFav.classList.toggle('active');
  });

  /* Editar layout */
  var bEdit = document.createElement('button');
  bEdit.className = 'btn btn-edit-icon';
  bEdit.title     = 'Editar layout';
  bEdit.innerHTML =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14">' +
    '<path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>' +
    '<path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>' +
    '</svg>';
  bEdit.addEventListener('click', function (e) {
    e.stopPropagation();
    /* Módulo GitHub interceptará este clique para salvar */
    colState.currentEditLayout = layout;
    colState.currentEditLayoutCollection = col;
    if (typeof colOpenLayoutEditModal === 'function') colOpenLayoutEditModal(layout, col);
  });

  actions.append(bH, bC, bFav, bEdit);
  card.append(previewWrap, body, actions);

  /* Clique no card abre visualização completa (reutiliza openModal da biblioteca) */
  card.addEventListener('click', function () {
    if (typeof openModal === 'function') openModal(layout);
  });

  return card;
}


/* ═══════════════════════════════════════════════════════════════════════
   2. MODAL DE ADIÇÃO DE COLEÇÃO
═══════════════════════════════════════════════════════════════════════ */

function colOpenAddModal() {
  /* Limpa campos */
  ['colAddName','colAddSlug','colAddTags','colAddAuthor'].forEach(function (id) {
    var el = document.getElementById(id);
    if (el) el.value = '';
  });

  /* Reseta cor selecionada */
  _colClearColorSelection();

  /* Limpa warnings */
  _colHideWarn('colAddSlugWarn');
  _colHideWarn('colAddNameWarn');

  /* Reseta botão de salvar */
  var saveBtn = document.getElementById('colAddSaveBtn');
  if (saveBtn) saveBtn.classList.add('btn-blocked');

  var overlay = document.getElementById('colAddOverlay');
  if (!overlay) return;
  overlay.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  overlay.scrollTop = 0;

  /* Foca no primeiro campo */
  setTimeout(function () {
    var el = document.getElementById('colAddName');
    if (el) el.focus();
  }, 50);
}

function colCloseAddModal() {
  var overlay = document.getElementById('colAddOverlay');
  if (overlay) overlay.classList.add('hidden');
  document.body.style.overflow = '';
}

/* Live validation do modal de adição */
function colValidateAddForm() {
  var name      = (document.getElementById('colAddName')   || {}).value || '';
  var slug      = (document.getElementById('colAddSlug')   || {}).value || '';
  var author    = (document.getElementById('colAddAuthor') || {}).value || '';

  name   = name.trim();
  slug   = slug.trim().toLowerCase();
  author = author.trim();

  /* Validação de nome */
  var nameValid = name.length >= 2;
  _colToggleWarn('colAddNameWarn', name.length > 0 && !nameValid,
    '\u26a0 Nome deve ter pelo menos 2 caracteres');

  /* Validação de slug */
  var slugValid = slug.length >= 2 && _colValidateSlug(slug);
  _colToggleWarn('colAddSlugWarn', slug.length > 0 && !slugValid,
    '\u26a0 Use apenas letras minúsculas, números e hífen (sem espaço)');

  /* Validação de autor (opcional — mas se preenchido deve ser válido) */
  var authorValid = author.length === 0 || author.length >= 2;

  var allOk = nameValid && slugValid && authorValid;
  var saveBtn = document.getElementById('colAddSaveBtn');
  if (saveBtn) {
    if (allOk) saveBtn.classList.remove('btn-blocked');
    else       saveBtn.classList.add('btn-blocked');
  }

  return { name, slug, author, allOk };
}


/* ═══════════════════════════════════════════════════════════════════════
   3. MODAL DE EDIÇÃO DE COLEÇÃO
═══════════════════════════════════════════════════════════════════════ */

function colOpenEditModal(col) {
  colState.currentEditCollection = col;

  /* Preenche campos */
  var nameEl   = document.getElementById('colEditName');
  var slugEl   = document.getElementById('colEditSlug');
  var tagsEl   = document.getElementById('colEditTags');
  var authorEl = document.getElementById('colEditAuthor');

  if (nameEl)   nameEl.value   = col.name   || '';
  if (slugEl)   slugEl.value   = col.slug   || '';
  if (tagsEl)   tagsEl.value   = (col.tags  || []).join(', ');
  if (authorEl) authorEl.value = col.author || '';

  /* Marca a cor atual no seletor */
  _colSetColorSelection(col.color || '');

  /* Slug não editável (é o nome do arquivo — mudá-lo exigiria rename no GitHub) */
  if (slugEl) {
    slugEl.readOnly = true;
    slugEl.title    = 'O slug não pode ser alterado após a criação (nome do arquivo)';
  }

  _colHideWarn('colEditNameWarn');

  var saveBtn = document.getElementById('colEditSaveBtn');
  if (saveBtn) saveBtn.classList.remove('btn-blocked');

  var overlay = document.getElementById('colEditOverlay');
  if (!overlay) return;
  overlay.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  overlay.scrollTop = 0;
}

function colCloseEditModal() {
  var overlay = document.getElementById('colEditOverlay');
  if (overlay) overlay.classList.add('hidden');
  document.body.style.overflow = '';

  /* Reabilita slug para próxima abertura */
  var slugEl = document.getElementById('colEditSlug');
  if (slugEl) slugEl.readOnly = false;

  colState.currentEditCollection = null;
}

/* Live validation do modal de edição */
function colValidateEditForm() {
  var name   = (document.getElementById('colEditName')   || {}).value || '';
  var author = (document.getElementById('colEditAuthor') || {}).value || '';

  name   = name.trim();
  author = author.trim();

  var nameValid   = name.length >= 2;
  var authorValid = author.length === 0 || author.length >= 2;

  _colToggleWarn('colEditNameWarn', name.length > 0 && !nameValid,
    '\u26a0 Nome deve ter pelo menos 2 caracteres');

  var allOk = nameValid && authorValid;
  var saveBtn = document.getElementById('colEditSaveBtn');
  if (saveBtn) {
    if (allOk) saveBtn.classList.remove('btn-blocked');
    else       saveBtn.classList.add('btn-blocked');
  }

  return { name, author, allOk };
}


/* ═══════════════════════════════════════════════════════════════════════
   SELETOR DE COR (32 cores)
   Renderizado como grid de bolinhas clicáveis nos dois modais.
═══════════════════════════════════════════════════════════════════════ */

/* Cor atualmente selecionada (estado local dos modais) */
var _colSelectedColor = { add: '', edit: '' };

function _colBuildColorPicker(containerId, mode) {
  var container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = '';

  COL_PALETTE.forEach(function (hex) {
    var dot = document.createElement('button');
    dot.type      = 'button';
    dot.className = 'col-color-dot';
    dot.title     = hex;
    dot.dataset.hex = hex;
    dot.style.cssText =
      'width:18px;height:18px;border-radius:50%;background:' + hex + ';' +
      'border:2px solid transparent;cursor:pointer;flex-shrink:0;' +
      'transition:transform .1s,border-color .1s;';

    dot.addEventListener('click', function () {
      _colSelectedColor[mode] = hex;
      /* Atualiza visual — remove seleção anterior */
      container.querySelectorAll('.col-color-dot').forEach(function (d) {
        d.style.borderColor = 'transparent';
        d.style.transform   = 'scale(1)';
      });
      dot.style.borderColor = '#0f172a';
      dot.style.transform   = 'scale(1.25)';
    });

    container.appendChild(dot);
  });
}

function _colSetColorSelection(hex) {
  /* Para o modal de edição */
  _colSelectedColor.edit = hex;
  var container = document.getElementById('colEditColorPicker');
  if (!container) return;
  container.querySelectorAll('.col-color-dot').forEach(function (d) {
    var isSelected = d.dataset.hex === hex;
    d.style.borderColor = isSelected ? '#0f172a' : 'transparent';
    d.style.transform   = isSelected ? 'scale(1.25)' : 'scale(1)';
  });
}

function _colClearColorSelection() {
  _colSelectedColor.add  = '';
  _colSelectedColor.edit = '';
  ['colAddColorPicker','colEditColorPicker'].forEach(function (id) {
    var container = document.getElementById(id);
    if (!container) return;
    container.querySelectorAll('.col-color-dot').forEach(function (d) {
      d.style.borderColor = 'transparent';
      d.style.transform   = 'scale(1)';
    });
  });
}

/* Retorna a cor selecionada para o modo informado ('add' | 'edit') */
function colGetSelectedColor(mode) {
  return _colSelectedColor[mode] || '';
}


/* ═══════════════════════════════════════════════════════════════════════
   UTILITÁRIOS DE VALIDAÇÃO VISUAL
═══════════════════════════════════════════════════════════════════════ */

function _colToggleWarn(warnId, show, msg) {
  var el = document.getElementById(warnId);
  if (!el) return;
  el.textContent    = msg || '';
  el.style.display  = show ? 'block' : 'none';
}

function _colHideWarn(warnId) {
  _colToggleWarn(warnId, false, '');
}


/* ═══════════════════════════════════════════════════════════════════════
   INICIALIZAÇÃO
═══════════════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', function () {

  /* ── Modal de layouts da coleção ── */
  var colClose = document.getElementById('colCollectionClose');
  if (colClose) colClose.addEventListener('click', colCloseCollectionModal);

  var colOverlay = document.getElementById('colCollectionOverlay');
  if (colOverlay) colOverlay.addEventListener('click', _colOverlayClick('colCollection', colCloseCollectionModal));

  /* ── Modal de adição ── */
  var addClose = document.getElementById('colAddClose');
  if (addClose) addClose.addEventListener('click', colCloseAddModal);

  var addOverlay = document.getElementById('colAddOverlay');
  if (addOverlay) addOverlay.addEventListener('click', _colOverlayClick('colAdd', colCloseAddModal));

  /* Live validation nos campos de adição */
  ['colAddName','colAddSlug','colAddTags','colAddAuthor'].forEach(function (id) {
    var el = document.getElementById(id);
    if (el) el.addEventListener('input', colValidateAddForm);
  });

  /* Normaliza slug em tempo real (força lowercase sem espaço) */
  var slugAddEl = document.getElementById('colAddSlug');
  if (slugAddEl) {
    slugAddEl.addEventListener('input', function () {
      this.value = this.value.toLowerCase().replace(/[^a-z0-9-]/g, '');
      colValidateAddForm();
    });
  }

  /* Constrói seletor de cores do modal de adição */
  _colBuildColorPicker('colAddColorPicker', 'add');

  /* ── Modal de edição ── */
  var editClose = document.getElementById('colEditClose');
  if (editClose) editClose.addEventListener('click', colCloseEditModal);

  var editOverlay = document.getElementById('colEditOverlay');
  if (editOverlay) editOverlay.addEventListener('click', _colOverlayClick('colEdit', colCloseEditModal));

  /* Live validation nos campos de edição */
  ['colEditName','colEditTags','colEditAuthor'].forEach(function (id) {
    var el = document.getElementById(id);
    if (el) el.addEventListener('input', colValidateEditForm);
  });

  /* Constrói seletor de cores do modal de edição */
  _colBuildColorPicker('colEditColorPicker', 'edit');

  /* ── Escape fecha qualquer modal de coleção ── */
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    var colEditOv = document.getElementById('colEditOverlay');
    var colAddOv  = document.getElementById('colAddOverlay');
    var colColOv  = document.getElementById('colCollectionOverlay');
    if (colEditOv && !colEditOv.classList.contains('hidden')) { colCloseEditModal();       return; }
    if (colAddOv  && !colAddOv.classList.contains('hidden'))  { colCloseAddModal();        return; }
    if (colColOv  && !colColOv.classList.contains('hidden'))  { colCloseCollectionModal(); return; }
  });

});
