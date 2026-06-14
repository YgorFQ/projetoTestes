// @ts-nocheck
/* ═══════════════════════════════════════════════════════════════════════
   col-script.js — UI da aba de Coleções

   RESPONSABILIDADE:
     - Inicializa e renderiza a view criada por view.js
     - Renderiza o grid de cards de coleções
     - Gerencia filtros por grupo e pesquisa
     - Ações dos cards (abrir modal, editar, excluir)

   DEPENDÊNCIAS (devem estar carregadas antes):
     col-groups.js, col-groups-data.js, col-core.js, col-styles.css

   EXPÕE (globais para col-modals.js e colecoes-github.js):
     colRenderGrid()       → re-renderiza o grid de coleções
     colUpdateStatsBar()   → atualiza a barra de stats
     colOpenCollection(col) → abre o modal de uma coleção
═══════════════════════════════════════════════════════════════════════ */

/* ── Estado da aba de Colecoes ─────────────────────────────────── */
var colState = {
  activeGroup: null,   /* slug do grupo filtrado, null = todos */
  search:      '',     /* texto da busca interna da propria feature */
};
var colFeatureInitialized = false;
var colFeatureApi = window.SenkoColecoes = window.SenkoColecoes || {};

/*
 * Helpers visuais exclusivos de Colecoes.
 *
 * REGRA DE INDEPENDENCIA:
 * Colecoes nao chama buildSrcDoc/lazyIframe/scaleCardIframe da Biblioteca.
 * A duplicacao aqui e proposital: remover Biblioteca nao pode alterar
 * preview, escala ou carregamento dos cards de Colecoes.
 */
function colBuildSrcDoc(html, css) {
  return '<!DOCTYPE html><html><head><meta charset="UTF-8">' +
    '<style>html,body{margin:0;padding:0;} ' + (css || '') + '</style>' +
    '</head><body>' + (html || '') + '</body></html>';
}

function colLazyIframe(iframe, html, css) {
  var src = colBuildSrcDoc(html, css);
  iframe.dataset.srcdoc = src;

  if (!('IntersectionObserver' in window)) {
    iframe.srcdoc = src;
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      if (!iframe.srcdoc) iframe.srcdoc = iframe.dataset.srcdoc || '';
      observer.unobserve(iframe);
    });
  }, { rootMargin: '220px' });

  observer.observe(iframe);
}

function colScaleIframe(iframe) {
  var container = iframe.parentElement;
  if (!container) return;
  var scale = container.offsetWidth / 1280;
  iframe.style.transform = 'scale(' + scale + ')';
  iframe.style.height = (container.offsetHeight / scale) + 'px';
}


/* ═══════════════════════════════════════════════════════════════════════
   BARRA DE ABAS — injetada dinamicamente no header
═══════════════════════════════════════════════════════════════════════ */

/* ═══════════════════════════════════════════════════════════════════════
   TROCA DE ABA
═══════════════════════════════════════════════════════════════════════ */

function colSwitchTab(tab) {
  if (window.SenkoShell) window.SenkoShell.switchFeature(tab);
}


/* ═══════════════════════════════════════════════════════════════════════
   DASHBOARD DE COLEÇÕES — criado dinamicamente
═══════════════════════════════════════════════════════════════════════ */

function colCreateDashboard() {
  var current = document.getElementById('colDashboard');
  if (current) return current;

  /*
   * Fallback para testes isolados. No app principal register.js cria a view
   * antes de carregar este arquivo.
   */
  if (!colFeatureApi.createView) return null;
  var dashboard = colFeatureApi.createView();
  (document.getElementById('colecoesFeature') || document.body).appendChild(dashboard);
  return dashboard;
}


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
      '<p class="col-empty-hint">Clique em "+ Adicionar" para criar sua primeira coleção.</p>';
    grid.appendChild(empty);
    colUpdateStatsBar(0);
    return;
  }

  filtered.forEach(function (col, i) {
    grid.appendChild(colCreateCard(col, i));
  });

  colUpdateStatsBar(filtered.length);
}

function colWithLoadedData(col, card, callback) {
  var loader = window.SenkoColecoesData;
  if (!col || !col._senkoLazy || !loader || typeof loader.ensureLoaded !== 'function') {
    callback(col);
    return;
  }

  if (card) {
    card.classList.add('is-loading');
    card.setAttribute('aria-busy', 'true');
  }

  loader.ensureLoaded(col.slug).then(function (loadedCollection) {
    if (card) {
      card.classList.remove('is-loading');
      card.removeAttribute('aria-busy');
    }
    callback(loadedCollection);
  }).catch(function (error) {
    if (card) {
      card.classList.remove('is-loading');
      card.removeAttribute('aria-busy');
    }
    console.error('[Colecoes] Falha ao carregar dados de ' + col.slug + ':', error);
    window.alert('Nao foi possivel carregar esta colecao.');
  });
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

  var count = col._senkoLazy
    ? (Number(col.layoutCount) || 0)
    : (col.layouts || []).length;
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
    colWithLoadedData(col, card, function (loadedCollection) {
      if (typeof colOpenEditModal === 'function') colOpenEditModal(loadedCollection);
    });
  });

  actions.appendChild(btnEdit);

  card.appendChild(tagsArea);
  card.appendChild(body);
  card.appendChild(actions);

  /* Clique abre o modal de layouts */
  card.addEventListener('click', function () {
    colOpenCollection(col, card);
  });

  return card;
}


/* ═══════════════════════════════════════════════════════════════════════
   ABERTURA DO MODAL DE COLEÇÃO
   (implementação está em col-modals.js)
═══════════════════════════════════════════════════════════════════════ */

function colOpenCollection(col, card) {
  colWithLoadedData(col, card, function (loadedCollection) {
    if (typeof colOpenCollectionModal === 'function') {
      colOpenCollectionModal(loadedCollection);
    }
  });
}


/* ═══════════════════════════════════════════════════════════════════════
   BUSCA E CRIACAO LOCAIS DA FEATURE
   Colecoes nao usa o campo de busca nem o botao Adicionar da Biblioteca.
═══════════════════════════════════════════════════════════════════════ */

function colHookSearch() {
  /* Busca e criacao sao controles locais da feature Colecoes. */
  var searchInput = document.getElementById('colSearchInput');
  if (searchInput && !searchInput.dataset.colSearchBound) {
    searchInput.dataset.colSearchBound = '1';
    searchInput.addEventListener('input', function () {
      colState.search = this.value.trim();
      colRenderGrid();
    });
  }

  var addButton = document.getElementById('colOpenCreateBtn');
  if (addButton && !addButton.dataset.colCreateBound) {
    addButton.dataset.colCreateBound = '1';
    addButton.addEventListener('click', function () {
      if (typeof colOpenCreateModal === 'function') colOpenCreateModal();
    });
  }
}


/* ═══════════════════════════════════════════════════════════════════════
   INICIALIZAÇÃO
═══════════════════════════════════════════════════════════════════════ */

function colMountFeature() {
  colCreateDashboard();
  colHookSearch();
  return document.getElementById('colDashboard');
}

colFeatureApi.init = function initColecoes() {
  if (colFeatureInitialized) return;
  colFeatureInitialized = true;
  colMountFeature();
  colRenderGrid();
};

colFeatureApi.render = function renderColecoes() {
  colRenderGrid();
};
