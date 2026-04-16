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
  tagFilter:   '',        /* tag selecionada nos pills de filtro */
  groupFilter: '',        /* slug do grupo selecionado nos pills */
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
      /* Filtro por grupo */
      if (colState.groupFilter) {
        if ((col.group || '') !== colState.groupFilter) return false;
      }
      /* Filtro por tag pill */
      if (colState.tagFilter) {
        var hasTag = (col.tags || []).some(function (t) {
          return t.toLowerCase() === colState.tagFilter;
        });
        if (!hasTag) return false;
      }
      /* Filtro por busca */
      if (!q) return true;
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

  /* Stats bar — "X coleções" */
  if (statsBar) {
    var total = ColLib.getCollections().length;
    var hasGroups = typeof ColGroups !== 'undefined' && ColGroups.getAll().length > 0;
    statsBar.innerHTML =
      '<strong>' + total + '</strong> ' + (total === 1 ? 'coleção' : 'coleções') +
      (hasGroups ? ' &nbsp;·&nbsp; <span style="color:var(--text3,#94a3b8);font-size:.8rem;">filtrar por grupo:</span>' : '');
  }

  /* Pills de filtro por tag */
  colRenderTagFilters();

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
   PILLS DE FILTRO POR TAG
   Renderiza abaixo do stats bar. Clicar filtra o grid pelo tag.
═══════════════════════════════════════════════════════════════════════ */

function colRenderTagFilters() {
  /* Delega para a nova função que renderiza grupos + tags */
  colRenderGroupFilters();
}

function colRenderGroupFilters() {
  var wrap = document.getElementById('colTagFilters');
  if (!wrap) return;
  wrap.innerHTML = '';

  var groups = (typeof ColGroups !== 'undefined') ? ColGroups.getAll() : [];
  var hasGroups = groups.length > 0;

  /* Coleta tags únicas */
  var seen = {}, tags = [];
  ColLib.getCollections().forEach(function (col) {
    (col.tags || []).forEach(function (t) {
      var tl = t.toLowerCase();
      if (tl && !seen[tl]) { seen[tl] = true; tags.push(tl); }
    });
  });
  tags.sort();

  if (!hasGroups && tags.length === 0) { wrap.style.display = 'none'; return; }
  wrap.style.display = '';

  /* Pill Todos */
  var isAllActive = !colState.groupFilter && !colState.tagFilter;
  var pillAll = document.createElement('button');
  pillAll.className = 'col-filter-pill' + (isAllActive ? ' active' : '');
  pillAll.textContent = 'Todos';
  pillAll.addEventListener('click', function () {
    colState.groupFilter = '';
    colState.tagFilter   = '';
    colRenderGrid();
  });
  wrap.appendChild(pillAll);

  /* Pills de grupos */
  groups.forEach(function (g) {
    var pill = document.createElement('button');
    var isActive = colState.groupFilter === g.slug;
    pill.className = 'col-filter-pill col-filter-pill--group' + (isActive ? ' active' : '');
    pill.innerHTML = '<span class="col-filter-dot" style="background:' + (isActive ? '#fff' : g.color) + ';"></span>' + g.name;
    if (isActive) {
      pill.style.background  = g.color;
      pill.style.borderColor = g.color;
      pill.style.color       = '#fff';
    }
    pill.addEventListener('click', function () {
      colState.groupFilter = g.slug;
      colState.tagFilter   = '';
      colRenderGrid();
    });
    wrap.appendChild(pill);
  });

  /* Pills de tags (separador visual se houver grupos e tags) */
  if (hasGroups && tags.length > 0) {
    var sep = document.createElement('span');
    sep.className   = 'col-filter-sep';
    sep.textContent = '·';
    wrap.appendChild(sep);
  }
  tags.forEach(function (tag) {
    var pill = document.createElement('button');
    pill.className = 'col-filter-pill' + (colState.tagFilter === tag ? ' active' : '');
    pill.textContent = tag;
    pill.addEventListener('click', function () {
      colState.tagFilter   = tag;
      colState.groupFilter = '';
      colRenderGrid();
    });
    wrap.appendChild(pill);
  });
}


/* ═══════════════════════════════════════════════════════════════════════
   CARD DE COLEÇÃO
═══════════════════════════════════════════════════════════════════════ */

function colCreateCard(col, index) {
  var layoutCount = ColLib.getLayouts(col.slug).length;

  /* Cor do grupo */
  var groupColor = '';
  var groupName  = '';
  if (col.group && typeof ColGroups !== 'undefined') {
    var grp = ColGroups.getBySlug(col.group);
    if (grp) { groupColor = grp.color; groupName = grp.name; }
  }

  /* ── Wrapper — borda colorida em volta toda ── */
  var card = document.createElement('div');
  card.className = 'card col-card';
  card.style.animationDelay = (index * 40) + 'ms';
  if (groupColor) {
    card.style.border       = '2px solid ' + groupColor;
    card.style.borderRadius = 'var(--radius, 12px)';
  }

  /* ── Área de tags no topo (substitui preview com iframe) ── */
  var preview = document.createElement('div');
  preview.className = 'col-card-tags-area';

  var sortedTags = (col.tags || []).slice().filter(Boolean).sort(function(a,b){
    return a.localeCompare(b,'pt-BR',{sensitivity:'base'});
  });

  if (sortedTags.length > 0) {
    sortedTags.forEach(function(t) {
      var chip = document.createElement('span');
      chip.className   = 'col-card-tag-chip';
      chip.textContent = t;
      preview.appendChild(chip);
    });
  } else {
    var noTag = document.createElement('span');
    noTag.className   = 'col-card-no-tags';
    noTag.textContent = 'sem tags';
    preview.appendChild(noTag);
  }

  /* Badge de contagem de layouts no canto inferior direito */
  var countBadge = document.createElement('span');
  countBadge.className   = 'col-preview-count';
  countBadge.textContent = layoutCount + (layoutCount === 1 ? ' layout' : ' layouts');
  preview.appendChild(countBadge);

  var overlay = document.createElement('div');
  overlay.className = 'card-preview-overlay';
  preview.appendChild(overlay);

  /* ── Body ── */
  var body = document.createElement('div');
  body.className = 'card-body';

  var nameEl = document.createElement('div');
  nameEl.className   = 'card-name';
  nameEl.textContent = col.name;

  /* Grupo com bolinha */
  var groupEl = document.createElement('div');
  groupEl.className = 'col-card-author';
  if (groupColor && groupName) {
    groupEl.innerHTML =
      '<span class="col-author-dot" style="background:' + groupColor + ';"></span>' +
      groupName;
  } else {
    groupEl.style.display = 'none';
  }

  body.append(nameEl, groupEl);

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
