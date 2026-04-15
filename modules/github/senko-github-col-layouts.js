// @ts-nocheck
/* ═══════════════════════════════════════════════════════════════════════
   senko-github-col-layouts.js — Gerenciar layouts dentro de uma coleção

   RESPONSABILIDADE:
     Três operações sobre os layouts dentro de colecoes/data/[slug].js:

     A) ADICIONAR layout
        - Injeta botão "GitHub" no modal colCollectionOverlay (header)
        - Abre um mini-modal de adição com campos: id, nome, tags, html, css
        - Insere o novo objeto no array ColLib.registerLayout do arquivo

     B) EDITAR layout existente
        - Intercepta o clique no btn-edit-icon de cada card dentro do modal
        - Abre o modal de edição (colLayoutEditOverlay) com campos pré-preenchidos
        - Atualiza o objeto correspondente no array do arquivo

     C) EXCLUIR layout
        - Botão "Excluir" no modal de edição de layout
        - Remove o objeto do array no arquivo
        - Remove o layout da memória via ColLib.removeLayout

   ESTRUTURA DO ARRAY NO ARQUIVO:
     ColLib.registerLayout('slug', [
       {
         id:   'id-do-layout',
         name: 'Nome Exibido',
         tags: ['tag1', 'tag2'],
         html: '...',
         css:  '...',
       },
       ...
     ]);

   DEPENDÊNCIAS:
     - senko-github-v2.js  (ghGetToken, ghEnsureToken, ghLockSave,
                            ghUnlockSave, ghSetStatus, githubGetFile,
                            githubPutFile, ghShowErrorModal, GH_ICON,
                            GITHUB_CONFIG, ghStartDeployWatch)
     - col-core.js         (ColLib)
     - col-script.js       (colRenderGrid, colState)
     - col-modals.js       (colOpenCollectionModal, colState.currentCollection)

   SÓ ATIVO NO GITHUB PAGES.
═══════════════════════════════════════════════════════════════════════ */


/* ═══════════════════════════════════════════════════════════════════════
   SERIALIZAÇÃO DO ARRAY DE LAYOUTS
   Converte o array em memória de volta para código JS legível.
═══════════════════════════════════════════════════════════════════════ */

function ghcLayoutsSerialize(slug, layouts) {
  var items = layouts.map(function (l) {
    var tagsStr = (l.tags || []).map(function (t) { return "'" + t + "'"; }).join(', ');
    return (
      '  {\n' +
      "    id:   '" + (l.id   || '').replace(/'/g, "\\'") + "',\n" +
      "    name: '" + (l.name || '').replace(/'/g, "\\'") + "',\n" +
      '    tags: [' + tagsStr + '],\n' +
      '    html: ' + JSON.stringify(l.html || '') + ',\n' +
      '    css:  ' + JSON.stringify(l.css  || '') + ',\n' +
      '  }'
    );
  });

  return "ColLib.registerLayout('" + slug + "', [\n" + items.join(',\n') + '\n]);\n';
}

/*
 * Substitui o bloco registerLayout no conteúdo do arquivo.
 * Preserva integralmente o cabeçalho (registerCollection).
 */
function ghcLayoutsRebuildFile(oldContent, slug, layouts) {
  var marker    = 'ColLib.registerLayout(';
  var markerIdx = oldContent.indexOf(marker);

  var header = markerIdx !== -1
    ? oldContent.slice(0, markerIdx)
    : oldContent + '\n/* Layouts desta coleção — cada item é adicionado via modal */\n';

  /* Remove trailing whitespace do cabeçalho para não acumular linhas em branco */
  header = header.replace(/\s+$/, '\n\n');

  return header + ghcLayoutsSerialize(slug, layouts);
}


/* ═══════════════════════════════════════════════════════════════════════
   OPERAÇÃO CORE: grava a versão atualizada do arquivo no GitHub
═══════════════════════════════════════════════════════════════════════ */

function ghcLayoutsSaveFile(slug, layouts, commitMsg) {
  var filePath = 'colecoes/data/' + slug + '.js';

  return githubGetFile(filePath).then(function (data) {
    var newContent = ghcLayoutsRebuildFile(data.content, slug, layouts);
    return githubPutFile(filePath, newContent, data.sha, commitMsg);
  });
}


/* ═══════════════════════════════════════════════════════════════════════
   A) ADICIONAR LAYOUT — modal de adição
═══════════════════════════════════════════════════════════════════════ */

/* Garante que o overlay de adição de layout existe no DOM */
function ghcLayoutsEnsureAddModal() {
  if (document.getElementById('ghcLayoutAddOverlay')) return;

  var overlay = document.createElement('div');
  overlay.id        = 'ghcLayoutAddOverlay';
  overlay.className = 'modal-overlay hidden';
  overlay.innerHTML = [
    '<div class="modal add-modal" id="ghcLayoutAddModal">',
    '  <div class="modal-header">',
    '    <div class="modal-meta">',
    '      <span class="modal-category">Nova entrada</span>',
    '      <h2 class="modal-title" id="ghcLayoutAddTitle">Adicionar Layout</h2>',
    '    </div>',
    '    <button class="modal-close" id="ghcLayoutAddClose" title="Fechar">✕</button>',
    '  </div>',
    '  <div class="add-fields">',
    '    <div class="field-row">',
    '      <div class="field-group" style="flex:1;">',
    '        <label>ID <span class="req">*</span></label>',
    '        <input type="text" id="ghcLAddId" placeholder="ex: hero-v1" autocomplete="off" />',
    '        <span class="field-desc">Identificador único — apenas letras minúsculas, números e hífen.</span>',
    '        <span class="col-field-warn" id="ghcLAddIdWarn"></span>',
    '      </div>',
    '    </div>',
    '    <div class="field-row">',
    '      <div class="field-group" style="flex:1;">',
    '        <label>Nome Exibido <span class="req">*</span></label>',
    '        <input type="text" id="ghcLAddName" placeholder="ex: Hero com imagem" />',
    '        <span class="col-field-warn" id="ghcLAddNameWarn"></span>',
    '      </div>',
    '    </div>',
    '    <div class="field-row">',
    '      <div class="field-group">',
    '        <label>Tags <span class="hint">(separadas por vírgula)</span></label>',
    '        <input type="text" id="ghcLAddTags" placeholder="ex: hero, banner, full" />',
    '      </div>',
    '    </div>',
    '    <div class="field-row">',
    '      <div class="field-group">',
    '        <label>HTML <span class="req">*</span></label>',
    '        <textarea id="ghcLAddHtml" rows="6" placeholder="Cole o HTML aqui…" style="font-family:var(--font-mono,monospace);font-size:.8rem;resize:vertical;"></textarea>',
    '      </div>',
    '    </div>',
    '    <div class="field-row">',
    '      <div class="field-group">',
    '        <label>CSS</label>',
    '        <textarea id="ghcLAddCss" rows="4" placeholder="Cole o CSS aqui (opcional)…" style="font-family:var(--font-mono,monospace);font-size:.8rem;resize:vertical;"></textarea>',
    '      </div>',
    '    </div>',
    '  </div>',
    '  <div class="add-result-section">',
    '    <div class="code-toolbar">',
    '      <button id="ghcLayoutAddSaveBtn" class="btn-github">Salvar</button>',
    '    </div>',
    '  </div>',
    '</div>',
  ].join('\n');

  document.body.appendChild(overlay);

  /* Fecha ao clicar fora */
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) ghcLayoutsCloseAddModal();
  });

  /* Fecha com Escape (registra no listener global já existente) */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      var ov = document.getElementById('ghcLayoutAddOverlay');
      if (ov && !ov.classList.contains('hidden')) ghcLayoutsCloseAddModal();
    }
  });

  /* Botão fechar */
  document.getElementById('ghcLayoutAddClose').addEventListener('click', ghcLayoutsCloseAddModal);

  /* Normaliza ID em tempo real */
  var idEl = document.getElementById('ghcLAddId');
  if (idEl) {
    idEl.addEventListener('input', function () {
      this.value = this.value.toLowerCase().replace(/[^a-z0-9-]/g, '');
      _ghcLValidateAdd();
    });
  }

  ['ghcLAddName', 'ghcLAddHtml'].forEach(function (id) {
    var el = document.getElementById(id);
    if (el) el.addEventListener('input', _ghcLValidateAdd);
  });

  /* Botão salvar */
  document.getElementById('ghcLayoutAddSaveBtn').addEventListener('click', ghcLayoutsHandleSave);
}

function ghcLayoutsCloseAddModal() {
  var ov = document.getElementById('ghcLayoutAddOverlay');
  if (ov) ov.classList.add('hidden');
  document.body.style.overflow = '';
}

function ghcLayoutsOpenAddModal(col) {
  ghcLayoutsEnsureAddModal();

  /* Limpa campos */
  ['ghcLAddId','ghcLAddName','ghcLAddTags','ghcLAddHtml','ghcLAddCss'].forEach(function (id) {
    var el = document.getElementById(id);
    if (el) el.value = '';
  });

  /* Atualiza título */
  var title = document.getElementById('ghcLayoutAddTitle');
  if (title) title.textContent = 'Adicionar layout — ' + col.name;

  /* Reseta estado */
  _ghcLAddState.mode       = 'add';
  _ghcLAddState.collection = col;
  _ghcLAddState.layoutId   = null;

  /* Atualiza botão */
  var btn = document.getElementById('ghcLayoutAddSaveBtn');
  if (btn) {
    btn.innerHTML = GH_ICON + ' Salvar';
    btn.disabled  = false;
  }

  var ov = document.getElementById('ghcLayoutAddOverlay');
  if (!ov) return;
  ov.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  ov.scrollTop = 0;

  setTimeout(function () {
    var el = document.getElementById('ghcLAddId');
    if (el) el.focus();
  }, 50);
}

/* Validation inline do modal de adição */
function _ghcLValidateAdd() {
  var id   = (document.getElementById('ghcLAddId')   || {}).value || '';
  var name = (document.getElementById('ghcLAddName') || {}).value || '';
  var html = (document.getElementById('ghcLAddHtml') || {}).value || '';

  id   = id.trim();
  name = name.trim();
  html = html.trim();

  var idValid   = id.length >= 2   && /^[a-z0-9-]+$/.test(id);
  var nameValid = name.length >= 2;
  var htmlValid = html.length > 0;

  var idWarn   = document.getElementById('ghcLAddIdWarn');
  var nameWarn = document.getElementById('ghcLAddNameWarn');
  if (idWarn)   idWarn.style.display   = (id.length > 0 && !idValid)     ? 'block' : 'none';
  if (nameWarn) nameWarn.style.display = (name.length > 0 && !nameValid) ? 'block' : 'none';
  if (idWarn)   idWarn.textContent     = '⚠ Use apenas letras minúsculas, números e hífen';
  if (nameWarn) nameWarn.textContent   = '⚠ Nome deve ter pelo menos 2 caracteres';

  return { idValid: idValid, nameValid: nameValid, htmlValid: htmlValid,
           allOk: idValid && nameValid && htmlValid };
}

/* Estado compartilhado do modal de adição/edição de layout */
var _ghcLAddState = {
  mode:       'add',  /* 'add' | 'edit' */
  collection: null,
  layoutId:   null,   /* preenchido no modo edit */
};

/* Handler do botão salvar (serve para add e edit) */
function ghcLayoutsHandleSave() {
  var v = _ghcLValidateAdd();
  if (!v.allOk) {
    if (!v.htmlValid) ghShowErrorModal('O campo HTML não pode estar vazio.');
    return;
  }

  var col = _ghcLAddState.collection;
  if (!col) return;

  var id   = (document.getElementById('ghcLAddId')   || {}).value.trim();
  var name = (document.getElementById('ghcLAddName') || {}).value.trim();
  var tags = ((document.getElementById('ghcLAddTags') || {}).value || '')
    .split(',').map(function (t) { return t.trim(); }).filter(Boolean);
  var html = (document.getElementById('ghcLAddHtml') || {}).value;
  var css  = (document.getElementById('ghcLAddCss')  || {}).value;

  var btn = document.getElementById('ghcLayoutAddSaveBtn');
  if (btn) { btn.textContent = 'Salvando…'; btn.disabled = true; }

  if (!ghLockSave()) { if (btn) { btn.innerHTML = GH_ICON + ' Salvar'; btn.disabled = false; } return; }
  if (!ghEnsureToken()) {
    ghUnlockSave();
    ghSetStatus('Token não configurado', 'error');
    if (btn) { btn.innerHTML = GH_ICON + ' Salvar'; btn.disabled = false; }
    return;
  }

  ghSetStatus('Salvando layout…', 'saving');

  var mode = _ghcLAddState.mode;

  if (mode === 'add') {
    /* Verifica duplicata de ID na mesma coleção */
    var existing = ColLib.getLayouts(col.slug);
    var isDup = existing.some(function (l) { return l.id.toLowerCase() === id.toLowerCase(); });
    if (isDup) {
      ghUnlockSave();
      ghSetStatus('ID já existe', 'error');
      ghShowErrorModal('Já existe um layout com o ID "' + id + '" nesta coleção.\nEscolha outro ID.');
      if (btn) { btn.innerHTML = GH_ICON + ' Salvar'; btn.disabled = false; }
      return;
    }

    /* Adiciona em memória */
    ColLib.registerLayout(col.slug, [{ id: id, name: name, tags: tags, html: html, css: css }]);

  } else {
    /* Modo edição: atualiza em memória */
    ColLib.updateLayout(col.slug, _ghcLAddState.layoutId, { id: id, name: name, tags: tags, html: html, css: css });
  }

  var allLayouts = ColLib.getLayouts(col.slug);

  ghcLayoutsSaveFile(col.slug, allLayouts, '[SenkoLib] ' + mode + ' layout ' + id + ' in ' + col.slug)
    .then(function () {
      ghSetStatus('✓ Layout salvo: ' + id, 'ok');
      ghUnlockSave();
      ghStartDeployWatch('colecoes/data/' + col.slug + '.js');

      if (btn) { btn.innerHTML = GH_ICON + ' Salvo!'; }
      setTimeout(function () {
        ghcLayoutsCloseAddModal();
        /* Reabre modal da coleção com grid atualizado */
        if (typeof colOpenCollectionModal === 'function') colOpenCollectionModal(col);
        if (btn) { btn.innerHTML = GH_ICON + ' Salvar'; btn.disabled = false; }
      }, 1000);
    })
    .catch(function (e) {
      console.error('[senko-github-col-layouts] Erro save:', e);
      /* Reverte operação em memória */
      if (mode === 'add') ColLib.removeLayout(col.slug, id);
      else ColLib.updateLayout(col.slug, id, { id: _ghcLAddState.layoutId, name: name, tags: tags, html: html, css: css });
      ghSetStatus('Erro: ' + e.message, 'error');
      ghUnlockSave();
      ghShowErrorModal(e.message);
      if (btn) { btn.innerHTML = GH_ICON + ' Salvar'; btn.disabled = false; }
    });
}


/* ═══════════════════════════════════════════════════════════════════════
   B) EDITAR LAYOUT — abre modal pré-preenchido
═══════════════════════════════════════════════════════════════════════ */

function colOpenLayoutEditModal(layout, col) {
  ghcLayoutsEnsureAddModal();

  /* Preenche campos */
  var idEl   = document.getElementById('ghcLAddId');
  var nameEl = document.getElementById('ghcLAddName');
  var tagsEl = document.getElementById('ghcLAddTags');
  var htmlEl = document.getElementById('ghcLAddHtml');
  var cssEl  = document.getElementById('ghcLAddCss');

  if (idEl)   idEl.value   = layout.id   || '';
  if (nameEl) nameEl.value = layout.name || '';
  if (tagsEl) tagsEl.value = (layout.tags || []).join(', ');
  if (htmlEl) htmlEl.value = layout.html || '';
  if (cssEl)  cssEl.value  = layout.css  || '';

  /* ID não editável no modo edit (mudaria a chave no array) */
  if (idEl) {
    idEl.readOnly = true;
    idEl.title    = 'O ID não pode ser alterado após a criação';
  }

  /* Atualiza título e estado */
  var title = document.getElementById('ghcLayoutAddTitle');
  if (title) title.textContent = 'Editar layout — ' + layout.name;

  _ghcLAddState.mode       = 'edit';
  _ghcLAddState.collection = col;
  _ghcLAddState.layoutId   = layout.id;

  /* Atualiza botão */
  var btn = document.getElementById('ghcLayoutAddSaveBtn');
  if (btn) {
    btn.innerHTML = GH_ICON + ' Salvar alterações';
    btn.disabled  = false;
  }

  var ov = document.getElementById('ghcLayoutAddOverlay');
  if (!ov) return;
  ov.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  ov.scrollTop = 0;

  setTimeout(function () {
    if (nameEl) nameEl.focus();
  }, 50);
}


/* ═══════════════════════════════════════════════════════════════════════
   C) EXCLUIR LAYOUT
═══════════════════════════════════════════════════════════════════════ */

function ghcLayoutsDelete(layout, col) {
  var ok = window.confirm(
    'Excluir o layout "' + layout.name + '" da coleção "' + col.name + '"?\n\nEsta ação é irreversível.'
  );
  if (!ok) return;

  if (!ghLockSave()) return;
  if (!ghEnsureToken()) {
    ghUnlockSave();
    ghSetStatus('Token não configurado', 'error');
    return;
  }

  ghSetStatus('Excluindo layout…', 'saving');

  /* Remove em memória primeiro */
  ColLib.removeLayout(col.slug, layout.id);
  var allLayouts = ColLib.getLayouts(col.slug);

  ghcLayoutsSaveFile(col.slug, allLayouts, '[SenkoLib] delete layout ' + layout.id + ' from ' + col.slug)
    .then(function () {
      ghSetStatus('✓ Layout excluído: ' + layout.id, 'ok');
      ghUnlockSave();
      ghStartDeployWatch('colecoes/data/' + col.slug + '.js');

      /* Fecha modal de edição e reabre modal da coleção atualizado */
      ghcLayoutsCloseAddModal();
      if (typeof colOpenCollectionModal === 'function') colOpenCollectionModal(col);
    })
    .catch(function (e) {
      console.error('[senko-github-col-layouts] Erro delete:', e);
      /* Reverte — readiciona o layout em memória */
      ColLib.registerLayout(col.slug, [layout]);
      ghSetStatus('Erro: ' + e.message, 'error');
      ghUnlockSave();
      ghShowErrorModal(e.message);
    });
}


/* ═══════════════════════════════════════════════════════════════════════
   UI — Injeta botão "Adicionar Layout" no modal de coleção
   e botão "Excluir" no modal de edição de layout
═══════════════════════════════════════════════════════════════════════ */

function ghcLayoutsInjectAddButton() {
  if (document.getElementById('ghcLayoutsAddBtn')) return;

  var header = document.querySelector('#colCollectionOverlay .col-collection-header-right');
  if (!header) return;

  var btn       = document.createElement('button');
  btn.id        = 'ghcLayoutsAddBtn';
  btn.className = 'btn-github';
  btn.innerHTML =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="14" height="14">' +
    '<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>' +
    '</svg> Layout';
  btn.title = 'Adicionar novo layout a esta coleção';

  btn.addEventListener('click', function () {
    var col = colState.currentCollection;
    if (!col) return;
    ghcLayoutsOpenAddModal(col);
  });

  /* Insere antes do botão de fechar */
  var closeBtn = header.querySelector('.modal-close');
  if (closeBtn) header.insertBefore(btn, closeBtn);
  else header.appendChild(btn);
}

/* Injeta botão excluir no modal de edição de layout (chamado por colOpenLayoutEditModal) */
function ghcLayoutsInjectDeleteButton() {
  /* O modal de adição/edição de layout é criado dinamicamente.
     Este botão é adicionado cada vez que o modal abre no modo 'edit'. */
  var existing = document.getElementById('ghcLayoutDeleteBtn');

  if (_ghcLAddState.mode !== 'edit') {
    if (existing) existing.remove();
    return;
  }

  if (existing) {
    existing.style.display = '';
    return;
  }

  var footer = document.querySelector('#ghcLayoutAddModal .code-toolbar');
  if (!footer) return;

  var btn       = document.createElement('button');
  btn.id        = 'ghcLayoutDeleteBtn';
  btn.className = 'btn-delete';
  btn.innerHTML =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14">' +
    '<polyline points="3 6 5 6 21 6"/>' +
    '<path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/>' +
    '<path d="M10 11v6M14 11v6"/>' +
    '<path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/>' +
    '</svg> Excluir';
  btn.title = 'Excluir este layout da coleção';
  btn.style.marginRight = 'auto'; /* empurra o salvar para a direita */

  btn.addEventListener('click', function () {
    var layout = { id: _ghcLAddState.layoutId };
    var col    = _ghcLAddState.collection;
    /* Busca objeto completo da memória para passar o name ao confirm */
    var layouts = ColLib.getLayouts(col.slug);
    var full    = null;
    for (var i = 0; i < layouts.length; i++) {
      if (layouts[i].id === layout.id) { full = layouts[i]; break; }
    }
    if (full) ghcLayoutsDelete(full, col);
  });

  footer.insertBefore(btn, footer.firstChild);
}

/* Patch: ao abrir modal de edição, ajusta o botão de excluir */
var _ghcLayoutsOrigOpenEdit = window.colOpenLayoutEditModal;
window.colOpenLayoutEditModal = function (layout, col) {
  if (typeof _ghcLayoutsOrigOpenEdit === 'function') _ghcLayoutsOrigOpenEdit(layout, col);
  setTimeout(ghcLayoutsInjectDeleteButton, 0);
  /* Torna o ID readonly visualmente */
  var idEl = document.getElementById('ghcLAddId');
  if (idEl) { idEl.readOnly = true; }
};


/* ═══════════════════════════════════════════════════════════════════════
   INICIALIZAÇÃO — só ativa no GitHub Pages
═══════════════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', function () {
  if (!window.location.hostname.match(/^[^.]+\.github\.io$/i)) return;

  /* Injeta botão "Adicionar Layout" no modal de coleção após um tick
     para garantir que col-modals.js já inicializou o DOM do modal. */
  /* O modal é criado no HTML estático, então podemos injetar direto: */
  ghcLayoutsEnsureAddModal();

  /* O botão de adicionar layout só pode ser injetado depois que
     o modal de coleção foi aberto (o header existe no HTML estático).
     Injetamos no DOMContentLoaded e também no evento de abertura. */
  ghcLayoutsInjectAddButton();

  /* Garante injeção após abertura dinâmica do modal de coleção */
  var colColOverlay = document.getElementById('colCollectionOverlay');
  if (colColOverlay) {
    var observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (m) {
        if (m.type === 'attributes' && m.attributeName === 'class') {
          if (!colColOverlay.classList.contains('hidden')) {
            ghcLayoutsInjectAddButton();
          }
        }
      });
    });
    observer.observe(colColOverlay, { attributes: true });
  }
});
