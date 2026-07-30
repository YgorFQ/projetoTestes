// @ts-nocheck
/* ═══════════════════════════════════════════════════════
   SENKOLIB — script.js

   RESPONSABILIDADE:
     - Renderiza e filtra o grid principal da Biblioteca.
     - Controla modais de criar/editar layouts e variantes.
     - Gera blocos JS copiaveis no formato dos arquivos data/*.js.
     - Mantem favoritos e aba atual em localStorage.

   CONTRATOS IMPORTANTES:
     - data/layouts/*.js registra layouts via SenkoLib.registerLayout({...}).
     - data/variants/[layout]/*.js registra variantes via SenkoLib.registerVariantFile(id, {...}).
     - Cada layout e variante deve ter seu proprio arquivo JS.
     - Este arquivo atualiza a UI e a memoria do navegador; persistencia
       real fica nos modulos de integracao (GitHub/FSA, quando carregados).
═══════════════════════════════════════════════════════ */

var state = {
  search:             '',
  currentEdit:        null,
  currentForVariant:  null,
  currentEditVariant: null,
  _editFromVariant:   false,
};

var _gridRendered = false;
var _gridRenderTimer = null;
var _bibliotecaInitialized = false;
var _bibliotecaReady = false;
var bibliotecaApi = window.SenkoBiblioteca = window.SenkoBiblioteca || {};

/* ─── Utilitários ─────────────────────────────────── */
function escapeHtml(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function escapeTemplateLiteral(value) {
  return String(value || '')
    .replace(/\\/g, '\\\\')
    .replace(/`/g, '\\`')
    .replace(/\$\{/g, '\\${');
}

/* Escapa metadados gravados em strings JS delimitadas por aspas simples. */
function escapeJsSingleQuotedString(value) {
  return String(value == null ? '' : value)
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/\r/g, '\\r')
    .replace(/\n/g, '\\n')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');
}

/*
 * Metadados salvos como JavaScript aceitam texto legivel, mas nao simbolos
 * que possam virar sintaxe do arquivo. Tags mantem virgula como separador.
 */
function senkoSanitizeMetadataValue(value, allowTagSeparator) {
  var raw = String(value == null ? '' : value).normalize('NFC');
  var invalidChars = allowTagSeparator
    ? /[^\p{L}\p{N} .,()_-]+/gu
    : /[^\p{L}\p{N} .()_-]+/gu;
  return raw.replace(invalidChars, '');
}

function senkoSanitizeVariantInputValue(value) {
  return String(value == null ? '' : value).replace(/[^a-zA-Z0-9 -]+/g, '');
}

function senkoSyncSanitizedInput(input, sanitizer) {
  if (!input) return '';

  var raw = input.value || '';
  var sanitized = sanitizer(raw);
  if (sanitized === raw) return sanitized;

  var selectionStart = typeof input.selectionStart === 'number'
    ? input.selectionStart
    : raw.length;
  var cursor = sanitizer(raw.slice(0, selectionStart)).length;

  input.value = sanitized;
  if (typeof input.setSelectionRange === 'function') {
    input.setSelectionRange(cursor, cursor);
  }
  return sanitized;
}

function senkoGetMetadataInputValue(inputId, allowTagSeparator) {
  var input = document.getElementById(inputId);
  return senkoSyncSanitizedInput(input, function (value) {
    return senkoSanitizeMetadataValue(value, allowTagSeparator);
  });
}

function senkoBindMetadataInput(inputId, allowTagSeparator) {
  var input = document.getElementById(inputId);
  if (!input || input.dataset.senkoMetadataBound) return;

  input.dataset.senkoMetadataBound = 'true';
  input.addEventListener('input', function () {
    senkoGetMetadataInputValue(inputId, allowTagSeparator);
  });
}

function senkoBindVariantNameInput(inputId) {
  var input = document.getElementById(inputId);
  if (!input || input.dataset.senkoVariantBound) return;

  input.dataset.senkoVariantBound = 'true';
  input.addEventListener('input', function () {
    senkoSyncSanitizedInput(input, senkoSanitizeVariantInputValue);
  });
}

function senkoParseMetadataTags(value) {
  return senkoSanitizeMetadataValue(value, true)
    .split(',')
    .map(function (tag) { return tag.trim(); })
    .filter(Boolean);
}

function senkoSlugifyIdentifier(value) {
  return String(value || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function senkoNormalizeVariantName(value) {
  return String(value || '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

/*
 * A regra de unicidade pertence à Biblioteca e usa o motor da própria
 * feature. Os fallbacks mantêm a validação funcional em testes isolados.
 */
function senkoCanonicalName(value) {
  if (typeof SenkoLib !== 'undefined' && typeof SenkoLib.normalizeName === 'function') {
    return SenkoLib.normalizeName(value);
  }
  return senkoSlugifyIdentifier(value).replace(/-/g, ' ');
}

function senkoLayoutNameExists(name, exceptId) {
  if (typeof SenkoLib === 'undefined') return false;
  if (typeof SenkoLib.hasLayoutName === 'function') {
    return SenkoLib.hasLayoutName(name, exceptId || null);
  }

  var key = senkoCanonicalName(name);
  return SenkoLib.getAll().some(function (layout) {
    return layout.id !== exceptId && senkoCanonicalName(layout.name) === key;
  });
}

function senkoVariantNameExists(parentId, name, exceptVariant) {
  if (typeof SenkoLib === 'undefined' || !parentId) return false;
  if (typeof SenkoLib.hasVariantName === 'function') {
    return SenkoLib.hasVariantName(parentId, name, exceptVariant || null);
  }

  var key = senkoCanonicalName(name);
  return SenkoLib.getVariants(parentId).some(function (variant) {
    return variant !== exceptVariant && senkoCanonicalName(variant.name) === key;
  });
}

bibliotecaApi.isLayoutNameTaken = senkoLayoutNameExists;
bibliotecaApi.isVariantNameTaken = senkoVariantNameExists;

function senkoVariantNameIssue(value) {
  var raw = String(value || '');
  if (!raw.trim()) return 'Preencha o nome da variante primeiro.';
  if (!/^[a-zA-Z0-9 -]+$/.test(raw)) {
    return 'Use somente letras, numeros, espacos e hifen no nome da variante.';
  }

  var normalized = senkoNormalizeVariantName(raw);
  if (normalized.length < 2 || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(normalized)) {
    return 'O nome da variante precisa gerar pelo menos dois caracteres validos.';
  }
  return '';
}

function senkoSyncIdentifierInput(inputId, force) {
  var el = document.getElementById(inputId);
  if (!el) return '';
  var value = senkoNormalizeVariantName(el.value);
  if (force && !senkoVariantNameIssue(el.value)) el.value = value;
  return value;
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


/* ─── Preview imediato dos layouts ──────────────────── */
function mountPreview(container, html, css, title) {
  /*
   * A Biblioteca e uma ferramenta visual: ao abrir a aba, todos os previews
   * precisam estar prontos para comparacao, sem depender de hover ou foco.
   */
  var iframe = document.createElement('iframe');
  iframe.className = 'card-iframe';
  iframe.setAttribute('sandbox', '');
  iframe.title = title || '';
  iframe.addEventListener('load', function () { scaleCardIframe(iframe); });
  iframe.srcdoc = buildSrcDoc(html, css);
  container.insertBefore(iframe, container.firstChild);
}

function isBibliotecaActive() {
  if (window.SenkoShell && typeof window.SenkoShell.getActiveFeatureId === 'function') {
    return window.SenkoShell.getActiveFeatureId() === 'biblioteca';
  }

  var panel = document.getElementById('bibliotecaFeature');
  if (!panel) return true;
  return getComputedStyle(panel).display !== 'none';
}

function renderGridIfActive(force) {
  if (!isBibliotecaActive()) return;
  if (!force && _gridRendered) return;
  renderGrid();
}

function scheduleGridRender() {
  if (_gridRenderTimer) clearTimeout(_gridRenderTimer);

  _gridRenderTimer = setTimeout(function () {
    _gridRenderTimer = null;
    renderGridIfActive(true);
  }, 90);
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
      var tags = Array.isArray(l.tags) ? l.tags : [];
      return [l.name].concat(tags).some(function (s) {
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

  /*
   * Ao filtrar, a grade e recriada. Antes de remover os cards antigos,
   * soltamos os iframes pendentes do observer para evitar trabalho preso
   * em elementos que ja sairam da tela.
   */
  grid.replaceChildren();
  grid.className = 'grid';

  if (filtered.length === 0) {
    if (state.search) {
      noResults.classList.remove('hidden');
      noQ.textContent = '"' + state.search + '"';
    } else {
      noResults.classList.add('hidden');
    }
    updateStatsBar(0);
    _gridRendered = true;
    return;
  }

  noResults.classList.add('hidden');
  var fragment = document.createDocumentFragment();
  filtered.forEach(function (layout, i) {
    fragment.appendChild(createCard(layout, i));
  });
  grid.appendChild(fragment);
  updateStatsBar(filtered.length);
  _gridRendered = true;
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
  /* Evita que grades grandes parecam lentas por causa do efeito em cascata. */
  card.style.animationDelay = (Math.min(index, 4) * 25) + 'ms';

  var preview = document.createElement('div');
  preview.className = 'card-preview';
  var ov = document.createElement('div');
  ov.className = 'card-preview-overlay';
  preview.appendChild(ov);
  mountPreview(preview, layout.html, layout.css, layout.name);

  var body = document.createElement('div'); body.className = 'card-body';
  var nameEl = document.createElement('div'); nameEl.className = 'card-name'; nameEl.textContent = layout.name;
  var tagsEl = document.createElement('div'); tagsEl.className = 'card-tags';
  var sortedTags = (Array.isArray(layout.tags) ? layout.tags : []).slice().filter(Boolean).sort(function(a,b){ return a.localeCompare(b,'pt-BR',{sensitivity:'base'}); });
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

  actions.append(btnH, btnC, btnFav, btnPlus);
  card.addEventListener('click', function () { openLayoutEditor(layout); });
  card.append(preview, body, actions);
  return card;
}

/* ─── Modal adicionar layout ────────────────────────── */
function openAddModal() {
  ['addName','addTags','addHtml','addCss'].forEach(function (id) {
    document.getElementById(id).value = '';
  });
  document.getElementById('addId').value = '';
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

/*
 * Gera o objeto de layout exatamente no formato esperado por
 * app/features/biblioteca/data/layouts/*.js. O texto tambem serve como
 * payload para o botao GitHub quando a integracao esta ativa.
 */
function updateGeneratedCode() {
  var name    = senkoGetMetadataInputValue('addName', false).trim();
  var id      = senkoSlugifyIdentifier(name);
  document.getElementById('addId').value = id;
  var tagsRaw = senkoGetMetadataInputValue('addTags', true);
  var html    = document.getElementById('addHtml').value;
  var css     = document.getElementById('addCss').value;
  var tags    = senkoParseMetadataTags(tagsRaw);

  var duplicateName = senkoLayoutNameExists(name, null);
  var copyBtn = document.getElementById('copyGeneratedBtn')
    || document.getElementById('ghSaveNewLayoutBtn');
  var allFilled = id.length >= 3 && name.length >= 3 && html.length >= 3 && !duplicateName;
  if (copyBtn) {
    copyBtn.disabled = !allFilled;
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

  if (duplicateName) {
    document.getElementById('generatedCode').textContent =
      '// Já existe um layout com esse nome. Escolha outro nome.';
    return;
  }

  var tagsStr  = tags.map(function (t) { return "'" + escapeJsSingleQuotedString(t) + "'"; }).join(', ');
  var safeName = escapeJsSingleQuotedString(name);
  var safeHtml = escapeTemplateLiteral(html);
  var safeCss  = escapeTemplateLiteral(css);

  document.getElementById('generatedCode').textContent =
    'SenkoLib.registerLayout(\n' +
    '{\n' +
    "    id: '"   + id.toLowerCase() + "',\n" +
    "    name: '" + safeName         + "',\n" +
    '    tags: [' + tagsStr          + '],\n' +
    '    html: `' + safeHtml         + '`,\n' +
    '    css: `'  + safeCss          + '`\n' +
    '}\n' +
    ');'
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
  var oldEditVarOverlay = document.getElementById('editVarOverlay');
  if (!oldEditVarOverlay || oldEditVarOverlay.classList.contains('hidden')) {
    state.currentForVariant = null;
  }
}

/*
 * Renderiza as variantes do layout aberto. O card "Adicionar" fica sempre
 * por ultimo, e o botao de excluir permanece escondido ate o modulo GitHub
 * assumir a responsabilidade por operacoes destrutivas.
 */
function renderVariantBlocks(variants) {
  var grid = document.getElementById('variantsGrid');
  grid.innerHTML = '';

  var sortedVariants = (Array.isArray(variants) ? variants : []).slice().sort(function (a, b) {
    return naturalCompare((a && a.name) || '', (b && b.name) || '');
  });

  if (sortedVariants.length === 0) {
    /* Mesmo sem variantes, exibe o card de adicionar */
    grid.appendChild(_makeAddVariantCard());
    return;
  }

  sortedVariants.forEach(function (v, i) {
    var block = document.createElement('div');
    block.className = 'variant-block';
    block.dataset.variantName = v.name || '';
    block.style.animationDelay = (i * 40) + 'ms';

    /* Preview */
    var previewWrap = document.createElement('div');
    previewWrap.className = 'variant-preview';
    var ov = document.createElement('div');
    ov.className = 'variant-preview-overlay';
    previewWrap.appendChild(ov);
    mountPreview(previewWrap, v.html, v.css, v.name || '');

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

    actions.append(bH, bC, bFav, bDel);
    block.append(previewWrap, body, actions);

    block.addEventListener('click', function (e) {
      /* Ignora cliques nos botões de ação */
      if (e.target.closest('.variant-actions')) return;
      document.getElementById('variantsOverlay').classList.add('hidden');
      openVariantEditor(v);
    });

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
  document.body.style.overflow = 'hidden';
}

function closeNewVariantModal() {
  document.getElementById('newVarOverlay').classList.add('hidden');
  var variantsOverlay = document.getElementById('variantsOverlay');
  if (!variantsOverlay || variantsOverlay.classList.contains('hidden')) {
    document.body.style.overflow = '';
    state.currentForVariant = null;
  }
}

/*
 * Serializa uma nova variante no formato de data/variants/<layout-id>.js.
 * Nomes de variantes sao normalizados para ids estaveis, porque tambem
 * viram marcadores e chaves de favorito.
 */
function updateNewVarCode() {
  var nameInput = document.getElementById('newVarName').value;
  var nameIssue = senkoVariantNameIssue(nameInput);
  var name      = senkoSyncIdentifierInput('newVarName', false);
  var html      = document.getElementById('newVarHtml').value;
  var css       = document.getElementById('newVarCss').value;
  var parentId  = state.currentForVariant ? state.currentForVariant.id : '';
  var duplicateName = !nameIssue && senkoVariantNameExists(parentId, name, null);
  var copyBtn   = document.getElementById('newVarCopyBtn')
    || document.getElementById('ghvSaveVariantBtn');

  var allOk = !nameIssue && !duplicateName;
  if (copyBtn) {
    copyBtn.disabled = !allOk;
    if (!allOk) {
      copyBtn.classList.add('btn-blocked');
      copyBtn.classList.remove('copied');
    } else {
      copyBtn.classList.remove('btn-blocked');
    }
  }

  if (!name && !html && !css) {
    document.getElementById('newVarGeneratedCode').textContent = '// Preencha os campos acima para gerar o objeto…';
    return;
  }

  if (nameIssue) {
    document.getElementById('newVarGeneratedCode').textContent = '// ' + nameIssue;
    return;
  }

  if (duplicateName) {
    document.getElementById('newVarGeneratedCode').textContent =
      '// Já existe uma variante com esse nome neste layout.';
    return;
  }

  var safeHtml = escapeTemplateLiteral(html);
  var safeCss  = escapeTemplateLiteral(css);

  document.getElementById('newVarGeneratedCode').textContent =
    "SenkoLib.registerVariantFile('" + parentId + "',\n" +
    '{\n' +
    "    id: '" + name + "',\n" +
    "    name: '" + name + "',\n" +
    '    html: `' + safeHtml + '`,\n' +
    '    css: `'  + safeCss  + '`\n' +
    '}\n' +
    ');';
}


/* ─── Modal editar variante ─────────────────────────── */
function openEditVariantModal(v) {
  if (window.SenkoLayoutEditor && typeof window.SenkoLayoutEditor.openVariant === 'function') {
    window.SenkoLayoutEditor.openVariant(state.currentForVariant, v);
    return;
  }

  var legacyOverlay = document.getElementById('editVarOverlay');
  if (!legacyOverlay) {
    alert('Editor de variacoes indisponivel.');
    return;
  }

  /* Guarda referência ao objeto (é referência direta ao array em memória) */
  state.currentEditVariant = v;

  var parentId = state.currentForVariant ? state.currentForVariant.id   : '';
  var parentNm = state.currentForVariant ? state.currentForVariant.name : '';

  document.getElementById('editVarParentName').textContent  = parentNm;
  document.getElementById('editVarName').value              = v.name || '';
  senkoSyncIdentifierInput('editVarName', true);
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
  var legacyOverlay = document.getElementById('editVarOverlay');
  if (legacyOverlay) legacyOverlay.classList.add('hidden');
  if (!legacyOverlay && window.SenkoLayoutEditor && window.SenkoLayoutEditor.isOpen()) {
    window.SenkoLayoutEditor.close();
    return;
  }
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

/*
 * Atualiza apenas o codigo gerado e o estado do botao. A variante em memoria
 * so muda depois de uma confirmacao de salvamento, evitando perda acidental
 * quando o usuario fecha o modal sem salvar.
 */
function updateEditVarCode() {
  var nameInput = document.getElementById('editVarName').value;
  var nameIssue = senkoVariantNameIssue(nameInput);
  var name      = senkoSyncIdentifierInput('editVarName', false);
  var html      = document.getElementById('editVarHtml').value;
  var css       = document.getElementById('editVarCss').value;
  var parentId  = state.currentForVariant ? state.currentForVariant.id : '';
  var duplicateName = !nameIssue
    && senkoVariantNameExists(parentId, name, state.currentEditVariant);

  var copyBtn = document.getElementById('copyEditVarBtn')
    || document.getElementById('ghvSaveEditVarBtn');
  var ok = !nameIssue && !duplicateName && html.length >= 1;
  if (copyBtn) {
    copyBtn.disabled = !ok;
    if (ok) copyBtn.classList.remove('btn-blocked');
    else    copyBtn.classList.add('btn-blocked');
  }

  var safeHtml = escapeTemplateLiteral(html);
  var safeCss  = escapeTemplateLiteral(css);

  var genCode = document.getElementById('editVarGeneratedCode');
  if (genCode && nameIssue) {
    genCode.textContent = '// ' + nameIssue;
    return;
  }

  if (genCode && duplicateName) {
    genCode.textContent = '// Já existe uma variante com esse nome neste layout.';
    return;
  }

  if (genCode) genCode.textContent =
    "SenkoLib.registerVariantFile('" + parentId + "',\n" +
    '{\n' +
    "    id: '" + (state.currentEditVariant && state.currentEditVariant.id ? state.currentEditVariant.id : name) + "',\n" +
    "    name: '" + name + "',\n" +
    '    html: `' + safeHtml + '`,\n' +
    '    css: `'  + safeCss  + '`\n' +
    '}\n' +
    ');';

  /*
   * IMPORTANTE: não mutamos state.currentEditVariant aqui.
   * O objeto em memória só é atualizado APÓS o usuário confirmar o save
   * (via senko-fsa-variants.js ou senko-github-variants.js).
   * Isso evita corromper dados se o usuário fechar o modal sem salvar.
   */
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
function openLayoutEditor(layout) {
  if (window.SenkoLayoutEditor && typeof window.SenkoLayoutEditor.openLayout === 'function') {
    window.SenkoLayoutEditor.openLayout(layout);
    return;
  }
  if (typeof window.openOfficialLayoutEditor === 'function') {
    window.openOfficialLayoutEditor(layout);
    return;
  }
  alert('Editor de layouts ainda nao carregou. Tente novamente em instantes.');
}

function openVariantEditor(variant) {
  if (window.SenkoLayoutEditor && typeof window.SenkoLayoutEditor.openVariant === 'function') {
    window.SenkoLayoutEditor.openVariant(state.currentForVariant, variant);
    return;
  }
  if (typeof window.openOfficialVariantEditor === 'function') {
    window.openOfficialVariantEditor(state.currentForVariant, variant);
    return;
  }
  alert('Editor de variacoes ainda nao carregou. Tente novamente em instantes.');
}

function openEditModal(layout) {
  if (window.SenkoLayoutEditor && typeof window.SenkoLayoutEditor.openLayout === 'function') {
    window.SenkoLayoutEditor.openLayout(layout);
    return;
  }

  var legacyOverlay = document.getElementById('editModalOverlay');
  if (!legacyOverlay) {
    alert('Editor de layouts indisponivel.');
    return;
  }

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
  var legacyOverlay = document.getElementById('editModalOverlay');
  if (legacyOverlay) legacyOverlay.classList.add('hidden');
  if (!legacyOverlay && window.SenkoLayoutEditor && window.SenkoLayoutEditor.isOpen()) {
    window.SenkoLayoutEditor.close();
  }
  if (state._editFromVariant) {
    state._editFromVariant = false;
    document.getElementById('variantsOverlay').classList.remove('hidden');
  }
}

/*
 * Recria o bloco completo do layout editado. O id vem do campo oculto para
 * preservar o marcador original; nome e tags podem mudar sem quebrar a
 * localizacao do objeto nos arquivos de dados.
 */
function updateEditCode() {
  var id      = document.getElementById('editId').value.trim().toLowerCase();
  var name    = senkoGetMetadataInputValue('editName', false).trim();
  var tagsRaw = senkoGetMetadataInputValue('editTags', true);
  var html    = document.getElementById('editHtml').value;
  var css     = document.getElementById('editCss').value;
  var tags    = senkoParseMetadataTags(tagsRaw);
  var duplicateName = senkoLayoutNameExists(name, id);

  var copyBtn = document.getElementById('copyEditBtn')
    || document.getElementById('ghSaveLayoutBtn');
  var allFilled = id.length >= 3 && name.length >= 3 && html.length >= 3 && !duplicateName;
  if (copyBtn) {
    copyBtn.disabled = !allFilled;
    if (allFilled) copyBtn.classList.remove('btn-blocked');
    else copyBtn.classList.add('btn-blocked');
  }

  if (!id && !name && !html) {
    document.getElementById('editGeneratedCode').textContent = '// Preencha os campos acima para gerar o objeto…';
    return;
  }

  if (duplicateName) {
    document.getElementById('editGeneratedCode').textContent =
      '// Já existe outro layout com esse nome. Escolha outro nome.';
    return;
  }

  var tagsStr  = tags.map(function(t){ return "'" + escapeJsSingleQuotedString(t) + "'"; }).join(', ');
  var safeName = escapeJsSingleQuotedString(name);
  var safeHtml = escapeTemplateLiteral(html);
  var safeCss  = escapeTemplateLiteral(css);

  document.getElementById('editGeneratedCode').textContent =
    'SenkoLib.registerLayout(\n' +
    '{\n' +
    "    id: '"   + id   + "',\n" +
    "    name: '" + safeName + "',\n" +
    '    tags: [' + tagsStr + '],\n' +
    '    html: `' + safeHtml + '`,\n' +
    '    css: `'  + safeCss  + '`\n' +
    '}\n' +
    ');';
}

/*
 * Registro da feature Biblioteca.
 *
 * A Biblioteca deixou de ser a feature principal fixa do shell. Ela se
 * registra como qualquer outra aba; se esta pasta for removida, nenhuma outra
 * feature deve depender desta chamada.
 */
/* O registro no shell pertence exclusivamente a ../register.js. */

/* ─── Inicialização ─────────────────────────────────── */
bibliotecaApi.init = function initBiblioteca() {
  if (_bibliotecaInitialized) return;
  _bibliotecaInitialized = true;

  senkoBindMetadataInput('addName', false);
  senkoBindMetadataInput('addTags', true);
  senkoBindMetadataInput('editName', false);
  senkoBindMetadataInput('editTags', true);
  senkoBindVariantNameInput('newVarName');
  senkoBindVariantNameInput('editVarName');

  renderGridIfActive(false);

  document.getElementById('searchInput').addEventListener('input', function () {
    state.search = this.value.trim();
    scheduleGridRender();
  });

  /* Modal adicionar layout da Biblioteca. Colecoes tem seu proprio botao/modal. */
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
  ['addName','addTags','addHtml','addCss'].forEach(function (id) {
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


  /* Compatibilidade com o modal antigo, quando existir em builds legados. */
  var editVarClose = document.getElementById('editVarClose');
  var editVarOverlay = document.getElementById('editVarOverlay');
  if (editVarClose && editVarOverlay) {
    editVarClose.addEventListener('click', closeEditVariantModal);
    editVarOverlay.addEventListener('click', overlayClick('editVar', closeEditVariantModal));
    document.querySelectorAll('.edit-var-mode-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        switchEditVarMode(this.dataset.evmode);
        updateEditVarCode();
      });
    });
    ['editVarName','editVarHtml','editVarCss'].forEach(function (id) {
      var el = document.getElementById(id);
      if (el) el.addEventListener('input', updateEditVarCode);
    });
  }

  var editModalClose = document.getElementById('editModalClose');
  var editModalOverlay = document.getElementById('editModalOverlay');
  if (editModalClose && editModalOverlay) {
    editModalClose.addEventListener('click', closeEditModal);
    editModalOverlay.addEventListener('click', overlayClick('editModal', closeEditModal));
    document.querySelectorAll('#editModal .edit-mode-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        switchEditMode(this.dataset.editmode);
        updateEditCode();
      });
    });
    ['editName','editTags','editHtml','editCss'].forEach(function (id) {
      var el = document.getElementById(id);
      if (el) el.addEventListener('input', updateEditCode);
    });
  }

  /* Escape */
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    var oldEditVar = document.getElementById('editVarOverlay');
    var oldEditLayout = document.getElementById('editModalOverlay');
    if (window.SenkoLayoutEditor && window.SenkoLayoutEditor.isOpen())                  window.SenkoLayoutEditor.close();
    else if (oldEditVar && !oldEditVar.classList.contains('hidden'))                    closeEditVariantModal();
    else if (!document.getElementById('newVarOverlay').classList.contains('hidden'))    closeNewVariantModal();
    else if (!document.getElementById('variantsOverlay').classList.contains('hidden'))  closeVariantsModal();
    else if (oldEditLayout && !oldEditLayout.classList.contains('hidden'))              closeEditModal();
    else if (!document.getElementById('addModalOverlay').classList.contains('hidden'))  closeAddModal();
  });

  _bibliotecaReady = true;
};

bibliotecaApi.render = function renderBiblioteca(force) {
  renderGridIfActive(Boolean(force));
};

bibliotecaApi.isReady = function isBibliotecaReady() {
  return _bibliotecaReady;
};

/*
 * API pública de criação.
 *
 * O register.js da Biblioteca adapta estes métodos ao contrato neutro do
 * shell. A ferramenta de criação rápida nunca chama funções locais como
 * openAddModal() ou acessa o estado interno diretamente.
 */
bibliotecaApi.openCreateLayout = function openCreateLayoutFromProvider() {
  openAddModal();
  return true;
};

bibliotecaApi.listLayoutsForCreation = function listLayoutsForCreation() {
  return SenkoLib.getAll().slice().sort(function (left, right) {
    return String(left.name || left.id || '').localeCompare(String(right.name || right.id || ''), 'pt-BR', {
      numeric: true,
      sensitivity: 'base'
    });
  }).map(function (layout) {
    return {
      id: layout.id,
      name: layout.name || layout.id,
      tags: Array.isArray(layout.tags) ? layout.tags.slice(0, 4) : [],
      variantCount: SenkoLib.getVariants(layout.id).length
    };
  });
};

bibliotecaApi.openCreateVariantForLayout = function openCreateVariantForLayout(layoutId) {
  var layout = SenkoLib.getAll().find(function (item) {
    return item.id === layoutId;
  });
  if (!layout) return false;
  state.currentForVariant = layout;
  openNewVariantModal();
  return true;
};
