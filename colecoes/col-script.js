// @ts-nocheck
/* ═══════════════════════════════════════════════════════════════════════
   col-script.js — UI da aba de Coleções

   RESPONSABILIDADE:
     - Injeta a barra de abas (Biblioteca / Coleções) no header
     - Controla a troca entre as duas abas
     - Renderiza o grid de cards de coleções
     - Gerencia filtros por grupo e pesquisa
     - Ações dos cards (abrir modal, editar, excluir)

   DEPENDÊNCIAS (devem estar carregadas antes):
     col-groups.js, col-groups-data.js, col-core.js, col-styles.css

   EXPÕE (globais para col-modals.js e senko-github-col.js):
     colRenderGrid()       → re-renderiza o grid de coleções
     colUpdateStatsBar()   → atualiza a barra de stats
     colOpenCollection(col) → abre o modal de uma coleção
═══════════════════════════════════════════════════════════════════════ */

/* ── Estado da aba de Coleções ─────────────────────────────────────── */
var colState = {
  activeGroup: null,   /* slug do grupo filtrado, null = todos */
  search:      '',     /* texto da busca (reutiliza o searchInput global) */
};

/* ── Helpers visuais (reutiliza buildSrcDoc e lazyIframe do script.js) ── */
function colBuildSrcDoc(html, css) {
  /* Reutiliza buildSrcDoc se disponível, senão reimplementa inline */
  if (typeof buildSrcDoc === 'function') return buildSrcDoc(html, css);
  return '<!DOCTYPE html><html><head><meta charset="UTF-8">'
    + '<style>' + (css || '') + '</style></head><body>' + (html || '') + '</body></html>';
}

function colLazyIframe(iframe, html, css) {
  if (typeof lazyIframe === 'function') {
    lazyIframe(iframe, html, css);
  } else {
    iframe.srcdoc = colBuildSrcDoc(html, css);
  }
}

function colScaleIframe(iframe) {
  if (typeof scaleCardIframe === 'function') {
    scaleCardIframe(iframe);
  }
}


/* ═══════════════════════════════════════════════════════════════════════
   BARRA DE ABAS — injetada dinamicamente no header
═══════════════════════════════════════════════════════════════════════ */

function colInjectTabBar() {
  /* Cria a barra de abas imediatamente abaixo do site-header */
  var tabBar = document.createElement('div');
  tabBar.id        = 'colTabBar';
  tabBar.className = 'col-tab-bar';

  var btnLib = document.createElement('button');
  btnLib.id        = 'colTabBiblioteca';
  btnLib.className = 'col-tab-btn active';
  btnLib.textContent = 'Biblioteca';

  var btnCol = document.createElement('button');
  btnCol.id        = 'colTabColecoes';
  btnCol.className = 'col-tab-btn';
  btnCol.textContent = 'Coleções';

  tabBar.appendChild(btnLib);
  tabBar.appendChild(btnCol);

  /* Insere a barra após o header */
  var header = document.querySelector('.site-header');
  if (header && header.nextSibling) {
    header.parentNode.insertBefore(tabBar, header.nextSibling);
  } else if (header) {
    header.parentNode.appendChild(tabBar);
  }

  btnLib.addEventListener('click', function () { colSwitchTab('biblioteca'); });
  btnCol.addEventListener('click', function () { colSwitchTab('colecoes'); });
}


/* ═══════════════════════════════════════════════════════════════════════
   TROCA DE ABA
═══════════════════════════════════════════════════════════════════════ */

function colSwitchTab(tab) {
  var dashboard    = document.getElementById('dashboard');
  var colDashboard = document.getElementById('colDashboard');
  var btnLib       = document.getElementById('colTabBiblioteca');
  var btnCol       = document.getElementById('colTabColecoes');

  if (tab === 'biblioteca') {
    if (dashboard)    dashboard.style.display    = '';
    if (colDashboard) colDashboard.style.display = 'none';
    if (btnLib) btnLib.classList.add('active');
    if (btnCol) btnCol.classList.remove('active');
  } else {
    if (dashboard)    dashboard.style.display    = 'none';
    if (colDashboard) colDashboard.style.display = '';
    if (btnLib) btnLib.classList.remove('active');
    if (btnCol) btnCol.classList.add('active');
    colRenderGrid();
  }
}


/* ═══════════════════════════════════════════════════════════════════════
   DASHBOARD DE COLEÇÕES — criado dinamicamente
═══════════════════════════════════════════════════════════════════════ */

function colCreateDashboard() {
  var el = document.createElement('div');
  el.id        = 'colDashboard';
  el.className = 'col-dashboard';
  el.style.display = 'none';

  el.innerHTML =
    '<div class="col-filter-bar" id="colFilterBar">' +
      '<span class="col-filter-label">Grupo</span>' +
    '</div>' +
    '<div class="col-stats-bar" id="colStatsBar"></div>' +
    '<div class="col-grid" id="colGrid"></div>';

  /* Insere depois do <main id="dashboard"> */
  var dashboard = document.getElementById('dashboard');
  if (dashboard && dashboard.parentNode) {
    dashboard.parentNode.insertBefore(el, dashboard.nextSibling);
  } else {
    document.body.appendChild(el);
  }
}


/* ═══════════════════════════════════════════════════════════════════════
   FILTROS POR GRUPO
═══════════════════════════════════════════════════════════════════════ */

function colRenderFilterBar() {
  var bar = document.getElementById('colFilterBar');
  if (!bar) return;

  /* Mantém apenas o label fixo */
  bar.innerHTML = '<span class="col-filter-label">Grupo</span>';

  /* Pill "Todos" */
  var pillAll = document.createElement('button');
  pillAll.className = 'col-pill' + (colState.activeGroup === null ? ' active' : '');
  pillAll.textContent = 'Todos';
  if (colState.activeGroup === null) {
    pillAll.style.background   = 'var(--accent)';
    pillAll.style.borderColor  = 'var(--accent)';
    pillAll.style.color        = '#fff';
  }
  pillAll.addEventListener('click', function () {
    colState.activeGroup = null;
    colRenderFilterBar();
    colRenderGrid();
  });
  bar.appendChild(pillAll);

  /* Pills dos grupos que têm pelo menos uma coleção */
  var groups = typeof ColGroups !== 'undefined' ? ColGroups.getAll() : [];
  var cols   = typeof ColLib    !== 'undefined' ? ColLib.getAll()    : [];

  /* Filtra grupos que de fato aparecem em alguma coleção */
  var usedGroupSlugs = {};
  cols.forEach(function (c) { if (c.group) usedGroupSlugs[c.group] = true; });

  groups.forEach(function (g) {
    if (!usedGroupSlugs[g.slug]) return; /* grupo vazio — não exibe pill */

    var pill = document.createElement('button');
    pill.className = 'col-pill' + (colState.activeGroup === g.slug ? ' active' : '');

    /* Dot colorido */
    var dot = document.createElement('span');
    dot.className = 'col-pill-dot';
    dot.style.background = g.cor || '#aaa';

    var label = document.createTextNode(g.name);
    pill.appendChild(dot);
    pill.appendChild(label);

    if (colState.activeGroup === g.slug) {
      pill.style.background  = g.cor || '#aaa';
      pill.style.borderColor = g.cor || '#aaa';
      pill.style.color       = '#fff';
    }

    pill.addEventListener('click', function () {
      colState.activeGroup = g.slug;
      colRenderFilterBar();
      colRenderGrid();
    });

    bar.appendChild(pill);
  });

  /* Botão "Nova Coleção" no final da barra */
  var btnNew = document.createElement('button');
  btnNew.id        = 'colBtnNewCollection';
  btnNew.className = 'btn-add';
  btnNew.style.marginLeft = 'auto';
  btnNew.innerHTML =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="14" height="14">' +
      '<line x1="12" y1="5" x2="12" y2="19"/>' +
      '<line x1="5" y1="12" x2="19" y2="12"/>' +
    '</svg> Nova Coleção';
  btnNew.addEventListener('click', function () {
    if (typeof colOpenCreateModal === 'function') colOpenCreateModal();
  });
  bar.appendChild(btnNew);
}


/* ═══════════════════════════════════════════════════════════════════════
   STATS BAR
═══════════════════════════════════════════════════════════════════════ */

function colUpdateStatsBar(visibleCount) {
  var bar   = document.getElementById('colStatsBar');
  if (!bar) return;
  var total = typeof ColLib !== 'undefined' ? ColLib.getAll().length : 0;
  bar.innerHTML =
    '<span>' + visibleCount + '</span> de <span>' + total + '</span> coleções';
}


/* ═══════════════════════════════════════════════════════════════════════
   GRID DE COLEÇÕES
═══════════════════════════════════════════════════════════════════════ */

function colGetFiltered() {
  if (typeof ColLib === 'undefined') return [];

  var q    = (colState.search || '').toLowerCase();
  var grp  = colState.activeGroup;

  return ColLib.getAll().filter(function (c) {
    /* Filtro por grupo */
    if (grp && c.group !== grp) return false;
    /* Filtro por busca: nome e tags */
    if (q) {
      var haystack = [c.name].concat(c.tags || []).join(' ').toLowerCase();
      if (haystack.indexOf(q) === -1) return false;
    }
    return true;
  }).sort(function (a, b) {
    /* Ordenação: por grupo primeiro, depois nome */
    if (a.group < b.group) return -1;
    if (a.group > b.group) return 1;
    return (a.name || '').localeCompare(b.name || '', 'pt-BR', { sensitivity: 'base' });
  });
}

function colRenderGrid() {
  colRenderFilterBar();

  var grid = document.getElementById('colGrid');
  if (!grid) return;

  var filtered = colGetFiltered();
  grid.innerHTML = '';

  if (filtered.length === 0) {
    /* Estado vazio */
    var empty = document.createElement('div');
    empty.className = 'col-empty';
    empty.innerHTML =
      '<svg class="col-empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">' +
        '<rect x="3" y="3" width="7" height="7" rx="1"/>' +
        '<rect x="14" y="3" width="7" height="7" rx="1"/>' +
        '<rect x="3" y="14" width="7" height="7" rx="1"/>' +
        '<rect x="14" y="14" width="7" height="7" rx="1"/>' +
      '</svg>' +
      '<p>Nenhuma coleção' + (colState.activeGroup ? ' neste grupo' : '') + ' ainda.</p>' +
      '<p class="col-empty-hint">Clique em "Nova Coleção" para começar.</p>';
    grid.appendChild(empty);
    colUpdateStatsBar(0);
    return;
  }

  filtered.forEach(function (col, i) {
    grid.appendChild(colCreateCard(col, i));
  });

  colUpdateStatsBar(filtered.length);
}

function colCreateCard(col, index) {
  var group = (typeof ColGroups !== 'undefined' && col.group)
    ? ColGroups.getBySlug(col.group)
    : null;
  var cor = group ? (group.cor || '#aaa') : 'var(--border)';

  var card = document.createElement('div');
  card.className = 'col-card';
  card.style.animationDelay = (index * 40) + 'ms';
  card.style.borderTopColor = cor;

  /* Área de tags + pill de grupo */
  var tagsArea = document.createElement('div');
  tagsArea.className = 'col-card-tags';

  if (group) {
    var groupPill = document.createElement('span');
    groupPill.className = 'col-card-group-pill';
    groupPill.textContent = group.name;
    groupPill.style.background = cor + '22'; /* cor com 13% opacidade */
    groupPill.style.color = cor;
    tagsArea.appendChild(groupPill);
  }

  (col.tags || []).forEach(function (t) {
    if (!t) return;
    var tag = document.createElement('span');
    tag.className = 'tag';
    tag.textContent = t;
    tagsArea.appendChild(tag);
  });

  /* Corpo */
  var body = document.createElement('div');
  body.className = 'col-card-body';

  var nameEl = document.createElement('div');
  nameEl.className = 'col-card-name';
  nameEl.textContent = col.name;

  var count = (col.layouts || []).length;
  var meta = document.createElement('div');
  meta.className = 'col-card-meta';
  meta.innerHTML = '<strong>' + count + '</strong> ' + (count === 1 ? 'layout' : 'layouts');

  body.appendChild(nameEl);
  body.appendChild(meta);

  /* Ações */
  var actions = document.createElement('div');
  actions.className = 'col-card-actions';

  /* Botão editar metadados */
  var btnEdit = document.createElement('button');
  btnEdit.className = 'btn btn-edit-icon';
  btnEdit.title = 'Editar coleção';
  btnEdit.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>';
  btnEdit.addEventListener('click', function (e) {
    e.stopPropagation();
    if (typeof colOpenEditModal === 'function') colOpenEditModal(col);
  });

  /* Âncora para o módulo GitHub injetar botão de excluir */
  var deleteAnchor = document.createElement('span');
  deleteAnchor.className = 'col-delete-anchor';
  deleteAnchor.dataset.colSlug = col.slug;

  actions.appendChild(btnEdit);
  actions.appendChild(deleteAnchor);

  card.appendChild(tagsArea);
  card.appendChild(body);
  card.appendChild(actions);

  /* Clique abre o modal de layouts */
  card.addEventListener('click', function () {
    colOpenCollection(col);
  });

  return card;
}


/* ═══════════════════════════════════════════════════════════════════════
   ABERTURA DO MODAL DE COLEÇÃO
   (implementação está em col-modals.js)
═══════════════════════════════════════════════════════════════════════ */

function colOpenCollection(col) {
  if (typeof colOpenCollectionModal === 'function') {
    colOpenCollectionModal(col);
  }
}


/* ═══════════════════════════════════════════════════════════════════════
   INTEGRAÇÃO COM O CAMPO DE BUSCA GLOBAL
   Quando a aba de Coleções está ativa, a busca filtra coleções.
═══════════════════════════════════════════════════════════════════════ */

function colHookSearch() {
  var searchInput = document.getElementById('searchInput');
  if (!searchInput) return;

  searchInput.addEventListener('input', function () {
    /* Só age se a aba de Coleções estiver visível */
    var colDash = document.getElementById('colDashboard');
    if (!colDash || colDash.style.display === 'none') return;
    colState.search = this.value.trim();
    colRenderGrid();
  });
}


/* ═══════════════════════════════════════════════════════════════════════
   INICIALIZAÇÃO
═══════════════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', function () {
  colInjectTabBar();
  colCreateDashboard();
  colHookSearch();
  /* Grid não é renderizado aqui — só quando a aba é aberta pela primeira vez */
});
