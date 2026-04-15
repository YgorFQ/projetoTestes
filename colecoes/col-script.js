// @ts-nocheck
/* ═══════════════════════════════════════════════════════════════════════
   col-script.js — Lógica de UI da aba Coleções

   RESPONSABILIDADE:
     - Troca entre a view da Biblioteca e a view de Coleções
     - Renderiza o grid de coleções (cada bloco = um arquivo .js)
     - Filtragem e busca dentro da aba Coleções
     - Criação dos cards de coleção com preview, autor e ações
     - Não toca em nenhuma função da Biblioteca oficial

   DEPENDÊNCIAS:
     - col-core.js      (ColLib — motor de registro)
     - col-modals.js    (colOpenCollectionModal, colOpenEditModal,
                         colOpenAddModal — carregado após este arquivo)

   EXPÕE (funções globais usadas por col-modals.js e módulos GitHub):
     colSwitchView(view)
     colRenderGrid()
     colGetAuthorColor(color)

   ORDEM DE CARREGAMENTO no index.html:
     1. col-core.js
     2. col-script.js      ← este arquivo
     3. col-modals.js
     4. colecoes/data/*.js
     5. modules/github/senko-github-col-*.js
═══════════════════════════════════════════════════════════════════════ */


/* ═══════════════════════════════════════════════════════════════════════
   ESTADO LOCAL DAS COLEÇÕES
═══════════════════════════════════════════════════════════════════════ */
var colState = {
  search:      '',        /* termo de busca na aba Coleções */
  activeView:  'library', /* 'library' | 'collections'     */
};


/* ═══════════════════════════════════════════════════════════════════════
   UTILITÁRIOS
═══════════════════════════════════════════════════════════════════════ */

/*
 * colGetAuthorColor(color)
 * Retorna a cor do autor se for um hex válido, ou o fallback neutro.
 * Usado tanto nos cards quanto nos modais.
 */
function colGetAuthorColor(color) {
  if (color && /^#[0-9a-fA-F]{3,6}$/.test(color)) return color;
  return '#888888';
}

/*
 * colNaturalCompare(a, b)
 * Ordenação alfanumérica natural (section-2 < section-9 < section-10).
 * Reutiliza naturalCompare do script.js se disponível, senão usa localeCompare.
 */
function colNaturalCompare(a, b) {
  if (typeof naturalCompare === 'function') return naturalCompare(a, b);
  return a.localeCompare(b, 'pt-BR', { sensitivity: 'base' });
}


/* ═══════════════════════════════════════════════════════════════════════
   TROCA DE VIEW (Biblioteca ↔ Coleções)
═══════════════════════════════════════════════════════════════════════ */

function colSwitchView(view) {
  colState.activeView = view;

  /* Atualiza estado visual das abas */
  document.querySelectorAll('.senko-tab').forEach(function (tab) {
    tab.classList.toggle('senko-tab--active', tab.dataset.view === view);
  });

  /* Mostra/esconde seções */
  var libSection = document.getElementById('librarySection');
  var colSection = document.getElementById('collectionsSection');
  if (libSection) libSection.style.display = view === 'library'     ? '' : 'none';
  if (colSection) colSection.style.display = view === 'collections' ? '' : 'none';

  /* Atualiza contador das abas */
  colUpdateTabCounts();

  if (view === 'collections') colRenderGrid();
}


/* ═══════════════════════════════════════════════════════════════════════
   CONTADORES DAS ABAS
═══════════════════════════════════════════════════════════════════════ */

function colUpdateTabCounts() {
  var libCount = document.getElementById('tabCountLibrary');
  var colCount = document.getElementById('tabCountCollections');

  if (libCount) {
    var total = typeof SenkoLib !== 'undefined' ? SenkoLib.getAll().length : 0;
    libCount.textContent = total > 0 ? total : '';
  }
  if (colCount) {
    var total = ColLib.getCollections().length;
    colCount.textContent = total > 0 ? total : '';
  }
}


/* ═══════════════════════════════════════════════════════════════════════
   FILTRAGEM
═══════════════════════════════════════════════════════════════════════ */

function colGetFiltered() {
  var q = colState.search.toLowerCase();
  return ColLib.getCollections()
    .filter(function (col) {
      if (!q) return true;
      /* Busca em: slug, name, author, tags */
      return [col.slug, col.name, col.author]
        .concat(col.tags || [])
        .some(function (s) {
          return s && s.toLowerCase().indexOf(q) !== -1;
        });
    })
    .sort(function (a, b) {
      return colNaturalCompare(a.name, b.name);
    });
}


/* ═══════════════════════════════════════════════════════════════════════
   GRID DE COLEÇÕES
═══════════════════════════════════════════════════════════════════════ */

function colRenderGrid() {
  var grid     = document.getElementById('collectionsGrid');
  var noRes    = document.getElementById('colNoResults');
  var statsBar = document.getElementById('colStatsBar');
  var filtered = colGetFiltered();

  if (!grid) return;
  grid.innerHTML = '';

  /* Stats bar */
  if (statsBar) {
    var total = ColLib.getCollections().length;
    statsBar.innerHTML =
      '<span>' + filtered.length + '</span> de <span>' + total + '</span> coleções';
  }

  if (filtered.length === 0) {
    if (noRes) noRes.classList.remove('hidden');
    return;
  }
  if (noRes) noRes.classList.add('hidden');

  filtered.forEach(function (col, i) {
    grid.appendChild(colCreateCard(col, i));
  });
}


/* ═══════════════════════════════════════════════════════════════════════
   CARD DE COLEÇÃO
═══════════════════════════════════════════════════════════════════════ */

function colCreateCard(col, index) {
  var color        = colGetAuthorColor(col.color);
  var hasAuthor    = !!(col.author && col.author.trim());
  var layoutCount  = ColLib.getLayouts(col.slug).length;

  /* ── Wrapper ── */
  var card = document.createElement('div');
  card.className = 'card col-card';
  card.style.animationDelay  = (index * 40) + 'ms';

  /* Borda esquerda colorida só se tiver autor com cor */
  if (hasAuthor && col.color) {
    card.style.borderLeft             = '3px solid ' + color;
    card.style.borderTopLeftRadius    = '0';
    card.style.borderBottomLeftRadius = '0';
  }

  /* ── Preview ── */
  var preview = document.createElement('div');
  preview.className = 'card-preview col-card-preview';

  /* Ícone centralizado no preview */
  var iconWrap = document.createElement('div');
  iconWrap.className = 'col-preview-icon-wrap';
  iconWrap.innerHTML =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="28" height="28">' +
    '<path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>' +
    '<polyline points="9 22 9 12 15 12 15 22"/>' +
    '</svg>';

  /* Badge de contagem de layouts */
  var countBadge = document.createElement('span');
  countBadge.className   = 'col-preview-count';
  countBadge.textContent = layoutCount + (layoutCount === 1 ? ' layout' : ' layouts');

  preview.append(iconWrap, countBadge);

  /* Overlay clicável (abre modal da coleção) */
  var overlay = document.createElement('div');
  overlay.className = 'card-preview-overlay';
  preview.appendChild(overlay);

  /* ── Body ── */
  var body   = document.createElement('div');
  body.className = 'card-body';

  var nameEl = document.createElement('div');
  nameEl.className   = 'card-name';
  nameEl.textContent = col.name;

  /* Linha de autor (só renderiza se tiver) */
  var authorEl = document.createElement('div');
  authorEl.className = 'col-card-author';
  if (hasAuthor) {
    authorEl.innerHTML =
      '<span class="col-author-dot" style="background:' + color + ';"></span>' +
      col.author;
  } else {
    authorEl.innerHTML = '<span class="col-author-empty">sem autor</span>';
  }

  /* Tags */
  var tagsEl = document.createElement('div');
  tagsEl.className = 'card-tags';
  var sortedTags = (col.tags || []).slice().filter(Boolean).sort(function (a, b) {
    return a.localeCompare(b, 'pt-BR', { sensitivity: 'base' });
  });
  sortedTags.forEach(function (t) {
    var tag = document.createElement('span');
    tag.className   = 'tag';
    tag.textContent = t;
    tagsEl.appendChild(tag);
  });

  body.append(nameEl, authorEl, tagsEl);

  /* ── Ações ── */
  var actions = document.createElement('div');
  actions.className = 'card-actions';

  /* Favorito — usa prefixo 'col__' para não colidir com favoritos da biblioteca */
  var btnFav = document.createElement('button');
  var favKey = 'col__' + col.slug;
  btnFav.className = 'btn btn-fav' + (colIsFav(favKey) ? ' active' : '');
  btnFav.title     = 'Favorito';
  btnFav.innerHTML =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14">' +
    '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>' +
    '</svg>';
  btnFav.addEventListener('click', function (e) {
    e.stopPropagation();
    colToggleFav(favKey);
    btnFav.classList.toggle('active');
  });

  /* Editar */
  var btnEdit = document.createElement('button');
  btnEdit.className = 'btn btn-edit-icon';
  btnEdit.title     = 'Editar coleção';
  btnEdit.innerHTML =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14">' +
    '<path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>' +
    '<path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>' +
    '</svg>';
  btnEdit.addEventListener('click', function (e) {
    e.stopPropagation();
    if (typeof colOpenEditModal === 'function') colOpenEditModal(col);
  });

  /* Botão "+" — abre modal de layouts da coleção */
  var btnPlus = document.createElement('button');
  btnPlus.className = 'btn btn-variants';
  btnPlus.title     = 'Ver layouts desta coleção';
  btnPlus.innerHTML =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="14" height="14">' +
    '<line x1="12" y1="5" x2="12" y2="19"/>' +
    '<line x1="5" y1="12" x2="19" y2="12"/>' +
    '</svg>';
  if (layoutCount > 0) {
    var badge = document.createElement('span');
    badge.className   = 'variant-badge';
    badge.textContent = layoutCount;
    btnPlus.appendChild(badge);
  }
  btnPlus.addEventListener('click', function (e) {
    e.stopPropagation();
    if (typeof colOpenCollectionModal === 'function') colOpenCollectionModal(col);
  });

  actions.append(btnFav, btnEdit, btnPlus);

  /* Clique no card abre o modal de layouts */
  card.addEventListener('click', function () {
    if (typeof colOpenCollectionModal === 'function') colOpenCollectionModal(col);
  });

  card.append(preview, body, actions);
  return card;
}


/* ═══════════════════════════════════════════════════════════════════════
   FAVORITOS DAS COLEÇÕES
   Armazenados no localStorage com prefixo 'col__' para não colidir
   com os favoritos de layouts da biblioteca oficial.
═══════════════════════════════════════════════════════════════════════ */

var COL_FAVS_KEY = 'senkolib_col_favs';

function colGetFavs() {
  try { return JSON.parse(localStorage.getItem(COL_FAVS_KEY) || '[]'); }
  catch (e) { return []; }
}

function colSaveFavs(favs) {
  try { localStorage.setItem(COL_FAVS_KEY, JSON.stringify(favs)); }
  catch (e) {}
}

function colIsFav(key) {
  return colGetFavs().indexOf(key) !== -1;
}

function colToggleFav(key) {
  var favs = colGetFavs();
  var idx  = favs.indexOf(key);
  if (idx === -1) favs.push(key);
  else favs.splice(idx, 1);
  colSaveFavs(favs);
}


/* ═══════════════════════════════════════════════════════════════════════
   INICIALIZAÇÃO
═══════════════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', function () {

  /* Abas de navegação */
  document.querySelectorAll('.senko-tab').forEach(function (tab) {
    tab.addEventListener('click', function () {
      colSwitchView(this.dataset.view);
    });
  });

  /* Busca na aba de coleções */
  var searchInput = document.getElementById('colSearchInput');
  if (searchInput) {
    searchInput.addEventListener('input', function () {
      colState.search = this.value.trim();
      colRenderGrid();
    });
  }

  /* Botão Adicionar na aba de coleções */
  var addBtn = document.getElementById('colOpenAddModal');
  if (addBtn) {
    addBtn.addEventListener('click', function () {
      if (typeof colOpenAddModal === 'function') colOpenAddModal();
    });
  }

  /* Inicializa contadores das abas */
  colUpdateTabCounts();

});
