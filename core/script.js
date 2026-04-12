// @ts-nocheck
/* ═══════════════════════════════════════════════════════
   SENKOLIB — script.js
═══════════════════════════════════════════════════════ */

var state = {
  search:             '',
  current:            null,
  currentEdit:        null,
  currentForVariant:  null,
  currentEditVariant: null,
  _fromVariant:       false,

};

/* ─── Utilitários ─────────────────────────────────── */
function escapeHtml(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function buildSrcDoc(html, css) {
  return '<!DOCTYPE html><html><head><meta charset="UTF-8">'
    + '<style>' + css + '</style></head><body>' + html + '</body></html>';
}

function showToast() {
  var t = document.getElementById('toast');
  t.classList.add('show');
  setTimeout(function () { t.classList.remove('show'); }, 2000);
}

function copyToClipboard(text, btn, label) {
  navigator.clipboard.writeText(text).then(function () {
    showToast();
    btn.classList.add('copied');
    btn.textContent = '✓ Copiado!';
    setTimeout(function () { btn.classList.remove('copied'); btn.innerHTML = label; }, 1800);
  });
}

var COPY_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>';
var HTML_ICON = COPY_ICON; /* unificado — mesmo ícone, tamanho 14x14 */



/* ─── Ordenação alfanumérica natural ────────────────── */
function naturalCompare(a, b) {
  // Normaliza: transforma separadores (ponto, hífen, espaço) em espaço
  // e compara segmento por segmento
  var re = /[\s\-\.]+|(\d+)/g;

  function tokenize(str) {
    var tokens = [];
    var lower = str.toLowerCase();
    var match;
    var last = 0;
    re.lastIndex = 0;
    while ((match = re.exec(lower)) !== null) {
      if (match.index > last) tokens.push(lower.slice(last, match.index));
      tokens.push(match[1] !== undefined ? parseInt(match[1], 10) : ' ');
      last = re.lastIndex;
    }
    if (last < lower.length) tokens.push(lower.slice(last));
    return tokens.filter(function(t) { return t !== '' && t !== ' '; });
  }

  var aParts = tokenize(a);
  var bParts = tokenize(b);
  var len = Math.max(aParts.length, bParts.length);

  for (var i = 0; i < len; i++) {
    var ap = aParts[i] !== undefined ? aParts[i] : '';
    var bp = bParts[i] !== undefined ? bParts[i] : '';

    var aIsNum = typeof ap === 'number';
    var bIsNum = typeof bp === 'number';

    if (aIsNum && bIsNum) {
      if (ap !== bp) return ap - bp;
    } else if (aIsNum) {
      return -1; // número vem antes de texto
    } else if (bIsNum) {
      return 1;
    } else {
      var cmp = ap.localeCompare(bp, 'pt-BR', { sensitivity: 'base' });
      if (cmp !== 0) return cmp;
    }
  }
  return 0;
}

/* ─── Favoritos ─────────────────────────────────────── */
function getFavs() {
  try { return JSON.parse(localStorage.getItem('senkolib_favs') || '[]'); }
  catch(e) { return []; }
}
function saveFavs(favs) {
  localStorage.setItem('senkolib_favs', JSON.stringify(favs));
}
function isFav(id) { return getFavs().indexOf(id) !== -1; }
function toggleFav(id) {
  var favs = getFavs();
  var idx  = favs.indexOf(id);
  if (idx === -1) favs.push(id); else favs.splice(idx, 1);
  saveFavs(favs);
}


/* ─── Favoritos de variantes (storage separado) ─────── */
function getVarFavs() {
  try { return JSON.parse(localStorage.getItem('senkolib_var_favs') || '{}'); }
  catch(e) { return {}; }
}
function saveVarFavs(favs) {
  localStorage.setItem('senkolib_var_favs', JSON.stringify(favs));
}
function isVarFav(parentId, variantName) {
  var favs = getVarFavs();
  return !!(favs[parentId] && favs[parentId].indexOf(variantName) !== -1);
}
function toggleVarFav(parentId, variantName) {
  var favs = getVarFavs();
  if (!favs[parentId]) favs[parentId] = [];
  var idx = favs[parentId].indexOf(variantName);
  if (idx === -1) favs[parentId].push(variantName);
  else favs[parentId].splice(idx, 1);
  saveVarFavs(favs);
}


/* ─── Scale iframe para preview desktop ─────────────── */
function scaleCardIframe(iframe) {
  var container = iframe.parentElement;
  var scale = container.offsetWidth / 1280;
  iframe.style.transform = 'scale(' + scale + ')';
  iframe.style.height = (container.offsetHeight / scale) + 'px';
}


/* ─── Lazy loading de iframes ───────────────────────── */
var _iframeObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      var iframe = entry.target;
      if (iframe.dataset.src) {
        iframe.srcdoc = iframe.dataset.src;
        delete iframe.dataset.src;
        _iframeObserver.unobserve(iframe);
      }
    }
  });
}, { rootMargin: '200px' });

function lazyIframe(iframe, html, css) {
  var src = buildSrcDoc(html, css);
  iframe.dataset.src = src;
  _iframeObserver.observe(iframe);
}


/* ═══════════════════════════════════════════════════════
   FILE SYSTEM ACCESS API — TESTE EXPERIMENTAL
   Só funciona no Chrome/Edge. Não funciona com file://
   Precisa de servidor local (ex: Live Server do VS Code)
═══════════════════════════════════════════════════════ */
var _projectDir = null;

async function selectProjectFolder() {
  try {
    _projectDir = await window.showDirectoryPicker({ mode: 'readwrite' });
    document.getElementById('fsaStatus').textContent = '📁 Pasta: ' + _projectDir.name;
    document.getElementById('fsaStatus').style.color = 'var(--green)';
  } catch (e) {
  }
}


/* ─── Grid ─────────────────────────────────────────── */
function getFilteredLayouts() {
  var q = state.search.toLowerCase();
  var favs = getFavs();
  return SenkoLib.getAll()
    .filter(function (l) {
      if (!q) return true;
      return [l.name].concat(l.tags).some(function (s) {
        return s && s.toLowerCase().indexOf(q) !== -1;
      });
    })
    .sort(function (a, b) {
      var aFav = favs.indexOf(a.id) !== -1 ? 0 : 1;
      var bFav = favs.indexOf(b.id) !== -1 ? 0 : 1;
      if (aFav !== bFav) return aFav - bFav;
      /* Ordenação alfanumérica natural: section-2 < section-9 < section-10 */
      return naturalCompare(a.name, b.name);
    });
}

function renderGrid() {
  var grid      = document.getElementById('layoutGrid');
  var noResults = document.getElementById('noResults');
  var noQ       = document.getElementById('noResultsQuery');
  var filtered  = getFilteredLayouts();

  grid.innerHTML = '';
  grid.className = 'grid';

  if (filtered.length === 0) {
    if (state.search) {
      noResults.classList.remove('hidden');
      noQ.textContent = '"' + state.search + '"';
    } else {
      noResults.classList.add('hidden');
    }
    updateStatsBar(0);
    return;
  }

  noResults.classList.add('hidden');
  filtered.forEach(function (layout, i) {
    grid.appendChild(createCard(layout, i));
  });
  updateStatsBar(filtered.length);
}


function updateStatsBar(count) {
  var bar = document.getElementById('statsBar');
  if (!bar) return;
  var total = SenkoLib.getAll().length;
  var favCount = getFavs().length;
  bar.innerHTML =
    '<span>' + count + '</span> de <span>' + total + '</span> layouts' +
    (favCount > 0 ? ' &nbsp;·&nbsp; <span>' + favCount + '</span> favorito' + (favCount > 1 ? 's' : '') : '');
}

function createCard(layout, index) {
  var card = document.createElement('div');
  card.className = 'card';
  card.style.animationDelay = (index * 40) + 'ms';

  var preview = document.createElement('div');
  preview.className = 'card-preview';
  var iframe = document.createElement('iframe');
  iframe.className = 'card-iframe';
  iframe.sandbox = 'allow-scripts';
  iframe.title = layout.name;
  lazyIframe(iframe, layout.html, layout.css);
  iframe.addEventListener('load', function () { scaleCardIframe(iframe); });
  var ov = document.createElement('div');
  ov.className = 'card-preview-overlay';
  preview.append(iframe, ov);

  var body = document.createElement('div'); body.className = 'card-body';
  var nameEl = document.createElement('div'); nameEl.className = 'card-name'; nameEl.textContent = layout.name;
  var tagsEl = document.createElement('div'); tagsEl.className = 'card-tags';
  var sortedTags = layout.tags.slice().filter(Boolean).sort(function(a,b){ return a.localeCompare(b,'pt-BR',{sensitivity:'base'}); });
  sortedTags.forEach(function (t) {
    if (!t) return;
    var tag = document.createElement('span'); tag.className = 'tag'; tag.textContent = t;
    tagsEl.appendChild(tag);
  });
  body.append(nameEl, tagsEl);

  var actions = document.createElement('div'); actions.className = 'card-actions';

  var btnH = document.createElement('button'); btnH.className = 'btn btn-ghost'; btnH.innerHTML = HTML_ICON + ' HTML';
  btnH.addEventListener('click', function (e) { e.stopPropagation(); copyToClipboard(layout.html, btnH, HTML_ICON + ' HTML'); });

  var btnC = document.createElement('button'); btnC.className = 'btn btn-ghost'; btnC.innerHTML = HTML_ICON + ' CSS';
  btnC.addEventListener('click', function (e) { e.stopPropagation(); copyToClipboard(layout.css, btnC, HTML_ICON + ' CSS'); });

  /* Favorito */
  var btnFav = document.createElement('button');
  btnFav.className = 'btn btn-fav' + (isFav(layout.id) ? ' active' : '');
  btnFav.title = 'Favorito';
  btnFav.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>';
  btnFav.addEventListener('click', function (e) {
    e.stopPropagation();
    toggleFav(layout.id);
    btnFav.classList.toggle('active');
    updateStatsBar(getFilteredLayouts().length);
  });

  /* Editar */
  var btnEdit = document.createElement('button');
  btnEdit.className = 'btn btn-edit-icon';
  btnEdit.title = 'Editar layout';
  btnEdit.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>';
  btnEdit.addEventListener('click', function (e) { e.stopPropagation(); openEditModal(layout); });

  /* Badge variantes */
  var variantCount = SenkoLib.getVariants(layout.id).length;
  var btnPlus = document.createElement('button');
  btnPlus.className = 'btn btn-variants';
  btnPlus.title = 'Variantes';
  btnPlus.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="14" height="14"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>';
  if (variantCount > 0) {
    var badge = document.createElement('span');
    badge.className = 'variant-badge';
    badge.textContent = variantCount;
    btnPlus.appendChild(badge);
  }
  btnPlus.addEventListener('click', function (e) { e.stopPropagation(); openVariantsModal(layout); });

  actions.append(btnH, btnC, btnFav, btnEdit, btnPlus);
  card.addEventListener('click', function () { openModal(layout); });
  card.append(preview, body, actions);
  return card;
}

/* ─── Modal visualizar ──────────────────────────────── */
function openModal(layout) {
  state.current = layout;
  document.getElementById('modalTitle').textContent = layout.name;

  var tagsEl = document.getElementById('modalTags');
  tagsEl.innerHTML = '';
  layout.tags.slice().filter(Boolean).sort(function(a,b){ return a.localeCompare(b,'pt-BR',{sensitivity:'base'}); }).forEach(function (t) {
    var s = document.createElement('span'); s.className = 'tag'; s.textContent = t; tagsEl.appendChild(s);
  });

  document.getElementById('codeHtml').innerHTML = escapeHtml(layout.html);
  document.getElementById('codeCss').innerHTML  = escapeHtml(layout.css);

  document.querySelectorAll('#modal .tab-btn').forEach(function (b) { b.classList.remove('active'); });
  document.querySelectorAll('#modal .code-panel').forEach(function (p) { p.classList.remove('active'); });
  document.querySelector('#modal [data-tab="html"]').classList.add('active');
  document.getElementById('panelHtml').classList.add('active');

  document.getElementById('copyHtmlBtn').innerHTML = COPY_ICON + ' Copiar HTML';
  document.getElementById('copyCssBtn').innerHTML  = COPY_ICON + ' Copiar CSS';
  document.getElementById('copyHtmlBtn').classList.remove('copied');
  document.getElementById('copyCssBtn').classList.remove('copied');

  var overlay = document.getElementById('modalOverlay');
  overlay.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  overlay.scrollTop = 0;

  var iframeEl = document.getElementById('modalIframe');
  iframeEl.srcdoc = '';
  requestAnimationFrame(function () { iframeEl.srcdoc = buildSrcDoc(layout.html, layout.css); });
}

function closeModal() {
  document.getElementById('modalOverlay').classList.add('hidden');
  document.body.style.overflow = '';
  state.current = null;
  if (state._fromVariant) {
    state._fromVariant = false;
    document.getElementById('variantsOverlay').classList.remove('hidden');
  }
}

/* ─── Modal adicionar layout ────────────────────────── */
function openAddModal() {
  ['addId','addName','addTags','addHtml','addCss'].forEach(function (id) {
    document.getElementById(id).value = '';
  });
  document.getElementById('generatedCode').textContent = '// Preencha os campos acima para gerar o objeto…';
  document.getElementById('addPreviewIframe').srcdoc = '';

  document.querySelectorAll('.add-tab').forEach(function (b) { b.classList.remove('active'); });
  document.querySelectorAll('.add-code-panel').forEach(function (p) { p.classList.remove('active'); });
  document.querySelector('[data-addtab="html"]').classList.add('active');
  document.getElementById('addPanelHtml').classList.add('active');

  var overlay = document.getElementById('addModalOverlay');
  overlay.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  overlay.scrollTop = 0;
}

function closeAddModal() {
  document.getElementById('addModalOverlay').classList.add('hidden');
  document.body.style.overflow = '';
}

function updateGeneratedCode() {
  var id      = document.getElementById('addId').value.trim().toLowerCase();
  var name    = document.getElementById('addName').value.trim();
  var tagsRaw = document.getElementById('addTags').value;
  var html    = document.getElementById('addHtml').value;
  var css     = document.getElementById('addCss').value;
  var tags    = tagsRaw.split(',').map(function (t) { return t.trim(); }).filter(Boolean);

  var hintEl = document.getElementById('hintVariantPath');
  if (hintEl) hintEl.textContent = id || 'id';

  /* Valida id: só letras, números e hífen — sem espaços ou caracteres especiais */
  var idEl    = document.getElementById('addId');
  var idValid = /^[a-z0-9-]+$/.test(id);
  var idWarn  = document.getElementById('addIdWarn');
  if (!idWarn && idEl) {
    idWarn = document.createElement('span');
    idWarn.id = 'addIdWarn';
    idWarn.style.cssText = 'color:#ef4444;font-size:.75rem;font-weight:700;display:none;';
    idWarn.textContent = '\u26a0 Use apenas letras minúsculas, números e hífen (sem espaços)';
    idEl.parentNode.insertBefore(idWarn, idEl.nextSibling);
  }
  if (idWarn) idWarn.style.display = (id.length > 0 && !idValid) ? 'block' : 'none';

  var copyBtn = document.getElementById('copyGeneratedBtn');
  var allFilled = id.length >= 3 && idValid && name.length >= 3 && html.length >= 3;
  if (copyBtn) {
    if (allFilled) {
      copyBtn.classList.remove('btn-blocked');
    } else {
      copyBtn.classList.add('btn-blocked');
    }
  }

  if (!id && !name && !html) {
    document.getElementById('generatedCode').textContent = '// Preencha os campos acima para gerar o objeto…';
    return;
  }

  var tagsStr  = tags.map(function (t) { return "'" + t + "'"; }).join(', ');
  var safeHtml = html.replace(/`/g, '\\`');
  var safeCss  = css.replace(/`/g, '\\`');

  document.getElementById('generatedCode').textContent =
    '/*@@@@Senko - ' + id.toLowerCase() + ' */\n' +
    '  /* variantes: variants/' + id.toLowerCase() + '.js */\n' +
    '  {\n' +
    "    id: '"   + id.toLowerCase() + "',\n" +
    "    name: '" + name             + "',\n" +
    '    tags: [' + tagsStr          + '],\n' +
    '    html: `' + safeHtml         + '`,\n' +
    '    css: `'  + safeCss          + '`\n' +
    '  },'
}

/* ─── Modal variantes ───────────────────────────────── */
function updateVariantsCount(parentId) {
  var countEl  = document.getElementById('variantsCount');
  var favSep   = document.getElementById('variantsFavSep');
  var favBlock = document.getElementById('variantsFavCount');
  var favNum   = document.getElementById('variantsFavNum');
  if (!countEl) return;

  var total    = SenkoLib.getVariants(parentId).length;
  countEl.textContent = 'TOTAL: ' + total + (total === 1 ? ' VARIAÇÃO' : ' VARIAÇÕES');

  /* Favoritos — só mostra se pelo menos 1 for favoritado */
  var varFavs  = getVarFavs();
  var favCount = (varFavs[parentId] && varFavs[parentId].length) || 0;
  if (favCount > 0 && favBlock && favSep && favNum) {
    favNum.textContent = favCount;
    favBlock.classList.remove('hidden');
    favSep.style.display = '';
  } else if (favBlock && favSep) {
    favBlock.classList.add('hidden');
    favSep.style.display = 'none';
  }
}

function openVariantsModal(layout) {
  state.currentForVariant = layout;
  var key = layout.id;

  document.getElementById('variantsTitle').textContent    = layout.name;
  document.getElementById('variantsLayoutId').textContent = key;

  var vlist = SenkoLib.getVariants(key);
  updateVariantsCount(key);
  renderVariantBlocks(vlist);

  var overlay = document.getElementById('variantsOverlay');
  overlay.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  overlay.scrollTop = 0;
}

function closeVariantsModal() {
  document.getElementById('variantsOverlay').classList.add('hidden');
  document.body.style.overflow = '';
  /* Só zera currentForVariant se o modal de edição de variante também estiver fechado */
  if (document.getElementById('editVarOverlay').classList.contains('hidden')) {
    state.currentForVariant = null;
  }
}

function renderVariantBlocks(variants) {
  var grid = document.getElementById('variantsGrid');
  grid.innerHTML = '';

  if (variants.length === 0) {
    /* Mesmo sem variantes, exibe o card de adicionar */
    grid.appendChild(_makeAddVariantCard());
    return;
  }

  variants.forEach(function (v, i) {
    var block = document.createElement('div');
    block.className = 'variant-block';
    block.dataset.variantName = v.name || '';
    block.style.animationDelay = (i * 40) + 'ms';

    /* Preview */
    var previewWrap = document.createElement('div');
    previewWrap.className = 'variant-preview';
    var vIframe = document.createElement('iframe');
    vIframe.className = 'card-iframe';
    vIframe.sandbox = 'allow-scripts';
    vIframe.title = v.name || '';
    lazyIframe(vIframe, v.html, v.css);
    vIframe.addEventListener('load', function () { scaleCardIframe(vIframe); });
    var ov = document.createElement('div');
    ov.className = 'variant-preview-overlay';
    previewWrap.append(vIframe, ov);

    /* Body — nome */
    var body = document.createElement('div');
    body.className = 'variant-body';
    var nameEl = document.createElement('div');
    nameEl.className = 'variant-name';
    nameEl.textContent = v.name || '';
    body.appendChild(nameEl);

    /* Ações */
    var actions = document.createElement('div');
    actions.className = 'variant-footer';

    var bH = document.createElement('button');
    bH.className = 'btn btn-ghost';
    bH.innerHTML = HTML_ICON + ' HTML';
    bH.addEventListener('click', function (e) { e.stopPropagation(); copyToClipboard(v.html, bH, HTML_ICON + ' HTML'); });

    var bC = document.createElement('button');
    bC.className = 'btn btn-ghost';
    bC.innerHTML = HTML_ICON + ' CSS';
    bC.addEventListener('click', function (e) { e.stopPropagation(); copyToClipboard(v.css, bC, HTML_ICON + ' CSS'); });

    /* Favorito */
    var varParentId  = state.currentForVariant ? state.currentForVariant.id : '';
    var variantName  = v.name || '';
    var bFav = document.createElement('button');
    bFav.className = 'btn btn-fav' + (isVarFav(varParentId, variantName) ? ' active' : '');
    bFav.title = 'Favorito';
    bFav.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>';
    bFav.addEventListener('click', function (e) {
      e.stopPropagation();
      toggleVarFav(varParentId, variantName);
      bFav.classList.toggle('active');
      updateVariantsCount(varParentId);
    });

    /* Editar */
    var bEdit = document.createElement('button');
    bEdit.className = 'btn btn-edit-icon';
    bEdit.title = 'Editar variante';
    bEdit.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>';
    bEdit.addEventListener('click', function (e) { e.stopPropagation(); openEditVariantModal(v); });

    /* Botão de excluir — mantido no DOM para os módulos GitHub, mas escondido visualmente */
    var bDel = document.createElement('button');
    bDel.className = 'btn btn-fav btn-delete-variant-card';
    bDel.dataset.variantName = v.name || '';
    bDel.title = 'Excluir variante';
    bDel.style.cssText = 'display:none;'; /* oculto — gerenciado pelo senko-github-variants.js */
    bDel.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/></svg>';
    bDel.addEventListener('click', function (e) {
      e.stopPropagation();
      var parentId = state.currentForVariant ? state.currentForVariant.id : null;
      if (!parentId) return;
      if (typeof ghvOpenDeleteModal === 'function') {
        if (typeof ghEnsureToken === 'function' && !ghEnsureToken()) return;
        ghvOpenDeleteModal(parentId, v.name || '');
      }
    });

    actions.append(bH, bC, bFav, bEdit, bDel);
    block.append(previewWrap, body, actions);

    block.addEventListener('click', function () { openVariantPreview(v); });

    grid.appendChild(block);
  });

  /* Card de adicionar sempre na última posição */
  grid.appendChild(_makeAddVariantCard());
}

function _makeAddVariantCard() {
  var card = document.createElement('button');
  card.className = 'variant-add-card';
  card.id = 'openNewVariantBtn';
  card.innerHTML =
    '<div class="variant-add-icon">+</div>' +
    '<span>Adicionar Nova Variante</span>';
  card.addEventListener('click', function (e) {
    e.stopPropagation();
    openNewVariantModal();
  });
  return card;
}

/* ─── Modal nova variante ───────────────────────────── */
function openNewVariantModal() {
  ['newVarName','newVarHtml','newVarCss'].forEach(function (id) {
    document.getElementById(id).value = '';
  });
  document.getElementById('newVarGeneratedCode').textContent = '// Preencha os campos acima para gerar o objeto…';
  document.getElementById('newVarPreviewIframe').srcdoc = '';

  document.querySelectorAll('.newvar-tab').forEach(function (b) { b.classList.remove('active'); });
  document.querySelectorAll('.newvar-panel').forEach(function (p) { p.classList.remove('active'); });
  document.querySelector('[data-nvtab="html"]').classList.add('active');
  document.getElementById('newVarPanelHtml').classList.add('active');

  var parentEl = document.getElementById('newVarParentName');
  if (parentEl && state.currentForVariant) parentEl.textContent = state.currentForVariant.name;
  document.getElementById('newVarOverlay').classList.remove('hidden');
}

function closeNewVariantModal() {
  document.getElementById('newVarOverlay').classList.add('hidden');
}

function updateNewVarCode() {
  var name      = document.getElementById('newVarName').value.trim().toLowerCase();
  var html      = document.getElementById('newVarHtml').value;
  var css       = document.getElementById('newVarCss').value;
  var copyBtn   = document.getElementById('newVarCopyBtn');

  /* Validação ao vivo do nome */
  var nameEl      = document.getElementById('newVarName');
  var nameValid   = name.length === 0 || /^[a-z0-9\-.]+$/.test(name);
  var nameWarn    = document.getElementById('newVarNameWarn');
  if (!nameWarn && nameEl) {
    nameWarn = document.createElement('span');
    nameWarn.id = 'newVarNameWarn';
    nameWarn.style.cssText = 'color:#ef4444;font-size:.75rem;font-weight:700;display:none;margin-top:.2rem;';
    nameWarn.textContent = '\u26a0 Use apenas letras, números, hífen (-) e ponto (.)';
    nameEl.parentNode.insertBefore(nameWarn, nameEl.nextSibling);
  }
  if (nameWarn) nameWarn.style.display = (name.length > 0 && !nameValid) ? 'block' : 'none';

  var allOk = name.length >= 2 && nameValid;
  if (copyBtn) {
    if (!allOk) {
      copyBtn.classList.add('btn-blocked');
      copyBtn.classList.remove('copied');
    } else {
      copyBtn.classList.remove('btn-blocked');
    }
  }

  if (!name && !html) {
    document.getElementById('newVarGeneratedCode').textContent = '// Preencha os campos acima para gerar o objeto…';
    return;
  }

  var safeHtml = html.replace(/`/g, '\\`');
  var safeCss  = css.replace(/`/g, '\\`');

  document.getElementById('newVarGeneratedCode').textContent =
    '/*@@@@Senko - ' + name + ' */\n' +
    '  {\n' +
    "    name: '" + name + "',\n" +
    '    html: `' + safeHtml + '`,\n' +
    '    css: `'  + safeCss  + '`,\n' +
    '  },';
}


/* ─── Modal editar variante ─────────────────────────── */
function openEditVariantModal(v) {
  /* Guarda referência ao objeto (é referência direta ao array em memória) */
  state.currentEditVariant = v;

  var parentId = state.currentForVariant ? state.currentForVariant.id   : '';
  var parentNm = state.currentForVariant ? state.currentForVariant.name : '';

  document.getElementById('editVarParentName').textContent  = parentNm;
  document.getElementById('editVarName').value              = v.name || '';
  document.getElementById('editVarHtml').value              = v.html || '';
  document.getElementById('editVarCss').value               = v.css  || '';

  /* Configura o botão de excluir — mantém data-variant-name atualizado para o módulo GitHub */
  var delBtn = document.getElementById('editVarDeleteBtn');
  if (delBtn) {
    delBtn.dataset.variantName = v.name || '';
    delBtn.style.display = '';   /* sempre visível no modal de edição */
    delBtn.onclick = function (e) {
      e.stopPropagation();
      if (typeof ghvOpenDeleteModal === 'function') {
        if (typeof ghEnsureToken === 'function' && !ghEnsureToken()) return;
        ghvOpenDeleteModal(parentId, v.name || '');
      } else {
        /* Exclusão local: remove da memória e re-renderiza */
        var arr = SenkoLib.getVariants(parentId);
        var idx = arr.indexOf(v);
        if (idx !== -1) arr.splice(idx, 1);
        closeEditVariantModal();
        renderVariantBlocks(SenkoLib.getVariants(parentId));
        updateVariantsCount(parentId);
      }
    };
  }

  var overlay = document.getElementById('editVarOverlay');
  overlay.classList.remove('hidden');
  overlay.scrollTop = 0;

  /* Abre em preview por padrão */
  setTimeout(function () { switchEditVarMode('preview'); updateEditVarCode(); }, 10);
}

function closeEditVariantModal() {
  document.getElementById('editVarOverlay').classList.add('hidden');
  /* Re-renderiza e reabre o modal de variantes (pode ter sido escondido por baixo) */
  if (state.currentForVariant) {
    var parentId = state.currentForVariant.id;
    renderVariantBlocks(SenkoLib.getVariants(parentId));
    updateVariantsCount(parentId);
    document.getElementById('variantsOverlay').classList.remove('hidden');
  }
  state.currentEditVariant = null;
}

function switchEditVarMode(mode) {
  document.querySelectorAll('.edit-var-mode-btn').forEach(function (b) { b.classList.remove('active'); });
  document.querySelectorAll('#editVarModal .edit-mode-panel').forEach(function (p) { p.classList.remove('active'); });
  document.querySelector('[data-evmode="' + mode + '"]').classList.add('active');
  document.getElementById('editVarMode' + mode.charAt(0).toUpperCase() + mode.slice(1)).classList.add('active');

  if (mode === 'preview') {
    var h = document.getElementById('editVarHtml').value;
    var c = document.getElementById('editVarCss').value;
    var f = document.getElementById('editVarPreviewIframe');
    f.srcdoc = '';
    setTimeout(function () { if (h || c) f.srcdoc = buildSrcDoc(h, c); }, 50);
  }
}

function updateEditVarCode() {
  var name = document.getElementById('editVarName').value.trim().toLowerCase();
  var html = document.getElementById('editVarHtml').value;
  var css  = document.getElementById('editVarCss').value;

  /* Validação ao vivo do nome */
  var nameEl    = document.getElementById('editVarName');
  var nameValid = name.length === 0 || /^[a-z0-9\-.]+$/.test(name);
  var nameWarn  = document.getElementById('editVarNameWarn');
  if (!nameWarn && nameEl) {
    nameWarn = document.createElement('span');
    nameWarn.id = 'editVarNameWarn';
    nameWarn.style.cssText = 'color:#ef4444;font-size:.75rem;font-weight:700;display:none;margin-top:.2rem;';
    nameWarn.textContent = '\u26a0 Use apenas letras, números, hífen (-) e ponto (.)';
    nameEl.parentNode.insertBefore(nameWarn, nameEl.nextSibling);
  }
  if (nameWarn) nameWarn.style.display = (name.length > 0 && !nameValid) ? 'block' : 'none';

  var copyBtn = document.getElementById('copyEditVarBtn');
  var ok = name.length >= 2 && nameValid && html.length >= 1;
  if (copyBtn) {
    if (ok) copyBtn.classList.remove('btn-blocked');
    else    copyBtn.classList.add('btn-blocked');
  }

  var safeHtml = html.replace(/`/g, '\\`');
  var safeCss  = css.replace(/`/g, '\\`');

  var genCode = document.getElementById('editVarGeneratedCode');
  if (genCode) genCode.textContent =
    '/*@@@@Senko - ' + name + ' */\n' +
    '  {\n' +
    "    name: '" + name + "',\n" +
    '    html: `' + safeHtml + '`,\n' +
    '    css: `'  + safeCss  + '`,\n' +
    '  },';

  /*
   * IMPORTANTE: não mutamos state.currentEditVariant aqui.
   * O objeto em memória só é atualizado APÓS o usuário confirmar o save
   * (via senko-fsa-variants.js ou senko-github-variants.js).
   * Isso evita corromper dados se o usuário fechar o modal sem salvar.
   */
}


/* ─── Preview de variante (reutiliza modal visualizar) ── */
function openVariantPreview(v) {
  /* Fecha o modal de variantes temporariamente e abre o de visualização */
  document.getElementById('variantsOverlay').classList.add('hidden');

  document.getElementById('modalTitle').textContent = v.name || '';

  var tagsEl = document.getElementById('modalTags');
  tagsEl.innerHTML = '';

  document.getElementById('codeHtml').innerHTML = escapeHtml(v.html);
  document.getElementById('codeCss').innerHTML  = escapeHtml(v.css);

  document.querySelectorAll('#modal .tab-btn').forEach(function (b) { b.classList.remove('active'); });
  document.querySelectorAll('#modal .code-panel').forEach(function (p) { p.classList.remove('active'); });
  document.querySelector('#modal [data-tab="html"]').classList.add('active');
  document.getElementById('panelHtml').classList.add('active');

  document.getElementById('copyHtmlBtn').innerHTML = COPY_ICON + ' Copiar HTML';
  document.getElementById('copyCssBtn').innerHTML  = COPY_ICON + ' Copiar CSS';
  document.getElementById('copyHtmlBtn').classList.remove('copied');
  document.getElementById('copyCssBtn').classList.remove('copied');

  /* ao fechar o modal de visualização, reabre o de variantes */
  state._fromVariant = true;
  state.current = { html: v.html, css: v.css };

  var overlay = document.getElementById('modalOverlay');
  overlay.classList.remove('hidden');
  overlay.scrollTop = 0;

  var iframeEl = document.getElementById('modalIframe');
  iframeEl.srcdoc = '';
  requestAnimationFrame(function () { iframeEl.srcdoc = buildSrcDoc(v.html, v.css); });
}


/* ─── Fechar overlay com confirmação (2 cliques) ─────── */
var _overlayConfirm = {};
function overlayClick(id, closeFn) {
  return function (e) {
    if (e.target !== this) return;
    if (_overlayConfirm[id]) {
      clearTimeout(_overlayConfirm[id]);
      delete _overlayConfirm[id];
      closeFn();
    } else {
      _overlayConfirm[id] = setTimeout(function () {
        delete _overlayConfirm[id];
      }, 400);
    }
  };
}


/* ─── Modal editar layout ───────────────────────────── */
function openEditModal(layout) {
  state.currentEdit = layout;

  document.getElementById('editId').value   = layout.id   || '';
  document.getElementById('editName').value = layout.name || '';
  document.getElementById('editTags').value = (layout.tags || []).filter(Boolean).join(', ');
  document.getElementById('editHtml').value = layout.html || '';
  document.getElementById('editCss').value  = layout.css  || '';

  var overlay = document.getElementById('editModalOverlay');
  overlay.classList.remove('hidden');
  overlay.scrollTop = 0;

  /* Default: preview ativo — após overlay visível */
  setTimeout(function () { switchEditMode('preview'); updateEditCode(); }, 10);
}

function switchEditMode(mode) {
  document.querySelectorAll('#editModal .edit-mode-btn').forEach(function(b){ b.classList.remove('active'); });
  document.querySelectorAll('#editModal .edit-mode-panel').forEach(function(p){ p.classList.remove('active'); });
  document.querySelector('#editModal [data-editmode="' + mode + '"]').classList.add('active');
  document.getElementById('editMode' + mode.charAt(0).toUpperCase() + mode.slice(1)).classList.add('active');

  if (mode === 'preview') {
    var h = document.getElementById('editHtml').value;
    var c = document.getElementById('editCss').value;
    var f = document.getElementById('editPreviewIframe');
    f.srcdoc = '';
    setTimeout(function () { if (h || c) f.srcdoc = buildSrcDoc(h, c); }, 50);
  }
}

function closeEditModal() {
  document.getElementById('editModalOverlay').classList.add('hidden');
}

function updateEditCode() {
  var id      = document.getElementById('editId').value.trim().toLowerCase();
  var name    = document.getElementById('editName').value.trim();
  var tagsRaw = document.getElementById('editTags').value;
  var html    = document.getElementById('editHtml').value;
  var css     = document.getElementById('editCss').value;
  var tags    = tagsRaw.split(',').map(function(t){ return t.trim(); }).filter(Boolean);

  var copyBtn = document.getElementById('copyEditBtn');
  var allFilled = id.length >= 3 && name.length >= 3 && html.length >= 3;
  if (copyBtn) {
    if (allFilled) copyBtn.classList.remove('btn-blocked');
    else copyBtn.classList.add('btn-blocked');
  }

  if (!id && !name && !html) {
    document.getElementById('editGeneratedCode').textContent = '// Preencha os campos acima para gerar o objeto…';
    return;
  }

  var tagsStr  = tags.map(function(t){ return "'" + t + "'"; }).join(', ');
  var safeHtml = html.replace(/`/g, '\\`');
  var safeCss  = css.replace(/`/g, '\\`');

  document.getElementById('editGeneratedCode').textContent =
    '/*@@@@Senko - ' + id + ' */\n' +
    '  /* variantes: variants/' + id + '.js */\n' +
    '  {\n' +
    "    id: '"   + id   + "',\n" +
    "    name: '" + name + "',\n" +
    '    tags: [' + tagsStr + '],\n' +
    '    html: `' + safeHtml + '`,\n' +
    '    css: `'  + safeCss  + '`\n' +
    '  },';
}

/* ─── Inicialização ─────────────────────────────────── */
document.addEventListener('DOMContentLoaded', function () {

  renderGrid();

  document.getElementById('searchInput').addEventListener('input', function () {
    state.search = this.value.trim();
    renderGrid();
  });

  document.getElementById('logoHome').addEventListener('click', function () {
    state.search = '';
    document.getElementById('searchInput').value = '';
    renderGrid();
  });

  /* Modal visualizar */
  document.getElementById('modalClose').addEventListener('click', closeModal);
  document.getElementById('modalOverlay').addEventListener('click', overlayClick('modal', closeModal));
  document.getElementById('copyHtmlBtn').addEventListener('click', function () {
    if (state.current) copyToClipboard(state.current.html, this, COPY_ICON + ' Copiar HTML');
  });
  document.getElementById('copyCssBtn').addEventListener('click', function () {
    if (state.current) copyToClipboard(state.current.css, this, COPY_ICON + ' Copiar CSS');
  });
  document.querySelectorAll('#modal .tab-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var tab = this.dataset.tab;
      document.querySelectorAll('#modal .tab-btn').forEach(function (b) { b.classList.remove('active'); });
      document.querySelectorAll('#modal .code-panel').forEach(function (p) { p.classList.remove('active'); });
      this.classList.add('active');
      document.getElementById('panel' + tab.charAt(0).toUpperCase() + tab.slice(1)).classList.add('active');
    });
  });

  /* Modal adicionar */
  document.getElementById('openAddModal').addEventListener('click', openAddModal);
  document.getElementById('addModalClose').addEventListener('click', closeAddModal);
  document.getElementById('addModalOverlay').addEventListener('click', overlayClick('addModal', closeAddModal));
  document.querySelectorAll('.add-tab').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var tab = this.dataset.addtab;
      document.querySelectorAll('.add-tab').forEach(function (b) { b.classList.remove('active'); });
      document.querySelectorAll('.add-code-panel').forEach(function (p) { p.classList.remove('active'); });
      this.classList.add('active');
      document.getElementById('addPanel' + tab.charAt(0).toUpperCase() + tab.slice(1)).classList.add('active');
      if (tab === 'preview') {
        var h = document.getElementById('addHtml').value;
        var c = document.getElementById('addCss').value;
        var f = document.getElementById('addPreviewIframe');
        f.srcdoc = '';
        setTimeout(function () { if (h || c) f.srcdoc = buildSrcDoc(h, c); }, 50);
        updateGeneratedCode();
      }
    });
  });
  ['addId','addName','addTags','addHtml','addCss'].forEach(function (id) {
    document.getElementById(id).addEventListener('input', updateGeneratedCode);
  });

  /* Modal variantes */
  document.getElementById('variantsClose').addEventListener('click', closeVariantsModal);
  document.getElementById('variantsOverlay').addEventListener('click', overlayClick('variants', closeVariantsModal));
  /* openNewVariantBtn — criado dinamicamente em _makeAddVariantCard(), listener atribuído lá */

  /* Modal nova variante */
  document.getElementById('newVarClose').addEventListener('click', closeNewVariantModal);
  document.getElementById('newVarOverlay').addEventListener('click', overlayClick('newVar', closeNewVariantModal));
  document.querySelectorAll('.newvar-tab').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var tab = this.dataset.nvtab;
      document.querySelectorAll('.newvar-tab').forEach(function (b) { b.classList.remove('active'); });
      document.querySelectorAll('.newvar-panel').forEach(function (p) { p.classList.remove('active'); });
      this.classList.add('active');
      document.getElementById('newVarPanel' + tab.charAt(0).toUpperCase() + tab.slice(1)).classList.add('active');
      if (tab === 'preview') {
        var h = document.getElementById('newVarHtml').value;
        var c = document.getElementById('newVarCss').value;
        var f = document.getElementById('newVarPreviewIframe');
        f.srcdoc = '';
        setTimeout(function () { if (h || c) f.srcdoc = buildSrcDoc(h, c); }, 50);
        updateNewVarCode();
      }
    });
  });
  ['newVarName','newVarHtml','newVarCss'].forEach(function (id) {
    document.getElementById(id).addEventListener('input', updateNewVarCode);
  });


  /* Modal editar variante */
  document.getElementById('editVarClose').addEventListener('click', closeEditVariantModal);
  document.getElementById('editVarOverlay').addEventListener('click', overlayClick('editVar', closeEditVariantModal));
  document.querySelectorAll('.edit-var-mode-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      switchEditVarMode(this.dataset.evmode);
      updateEditVarCode();
    });
  });
  ['editVarName','editVarHtml','editVarCss'].forEach(function (id) {
    document.getElementById(id).addEventListener('input', updateEditVarCode);
  });

  /* Modal editar layout */
  document.getElementById('editModalClose').addEventListener('click', closeEditModal);
  document.getElementById('editModalOverlay').addEventListener('click', overlayClick('editModal', closeEditModal));
  document.querySelectorAll('#editModal .edit-mode-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      switchEditMode(this.dataset.editmode);
      updateEditCode();
    });
  });
  ['editId','editName','editTags','editHtml','editCss'].forEach(function (id) {
    document.getElementById(id).addEventListener('input', updateEditCode);
  });

  /* Escape */
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    if (!document.getElementById('editVarOverlay').classList.contains('hidden'))         closeEditVariantModal();
    else if (!document.getElementById('newVarOverlay').classList.contains('hidden'))     closeNewVariantModal();
    else if (!document.getElementById('variantsOverlay').classList.contains('hidden'))   closeVariantsModal();
    else if (!document.getElementById('editModalOverlay').classList.contains('hidden'))  closeEditModal();
    else if (!document.getElementById('addModalOverlay').classList.contains('hidden'))   closeAddModal();
    else closeModal();
  });

});

/* Copy Base */

function copiarBasics() {

  const htmlBasico = `<div class="lp-container">
  <meta charset="UTF-8">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Pixelify+Sans:wght@400..700&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,100..900;1,100..900&family=Varela+Round&display=swap');

    * {
      padding: 0;
      margin: 0;
    }

    .pdp {
      display: flex;
      flex-direction: column;
      font-family: Roboto, sans-serif
    }

    .pdp * {
      box-sizing: border-box;
      margin: 0;
    }

    .pdp-text-gradient {
      background: linear-gradient(90deg, #c29869, #ddbc88, #e6c588);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      color: transparent;
      background-clip: text;
     }
  </style>
  <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,700;1,400;1,700&display=swap"
    rel="stylesheet">
  <title>PDP - eFácil</title>
  <!-- ---------------------------------------- ÁREA PARA COLOCAR STYLES ----------------------------------------------------------- -->

  

  <!-- ----------------------------------------------------------------------------------------------------------------------------- -->
  <div class="pdp" id="pdp"> <!-- HTML fica dentro dessa div PDP -->

  

  </div>
</div>`

  navigator.clipboard.writeText(htmlBasico);  
}
