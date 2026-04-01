// @ts-nocheck
/* ═══════════════════════════════════════════════════════════════════════
   senko-github-delete.js — Módulo: excluir layout direto no GitHub
   ───────────────────────────────────────────────────────────────────────
   FUNCIONALIDADES:
     - Botão "Excluir" injetado no modal de edição
     - Modal de confirmação estilizado (não usa window.confirm)
     - Se o layout tiver variantes, avisa e pergunta se quer excluir junto
     - Remove o objeto do arquivo de layouts (layouts/layoutsXXX.js)
     - Remove o arquivo de variantes inteiro (variants/[id].js), se existir
     - Remove o layout da memória (SenkoLib) e atualiza o grid

   COMO USAR:
     Adicione no index.html APÓS o senko-github-v2.js:
       <script src="senko-github-delete.js"></script>

   REQUISITOS:
     - senko-github-v2.js carregado antes (usa ghGetToken, ghEnsureToken,
       githubGetFile, githubPutFile, ghFindObjectBounds, ghDeduplicateMarkers,
       githubListDir, GH_ICON, GITHUB_CONFIG)
═══════════════════════════════════════════════════════════════════════ */


/* ═══════════════════════════════════════════════════════════════════════
   CORE: Remove o bloco do layout de dentro do arquivo de layouts
   Retorna o conteúdo novo (string) sem o objeto, ou lança erro.
═══════════════════════════════════════════════════════════════════════ */
function ghDeleteLayoutFromContent(content, layoutId) {
  var cleaned = ghDeduplicateMarkers(content, layoutId);
  var bounds  = ghFindObjectBounds(cleaned, layoutId);

  if (!bounds || bounds.error === 'no_marker') {
    throw new Error('Marcador não encontrado para "' + layoutId + '".');
  }
  if (!bounds.start && bounds.start !== 0) {
    throw new Error('Não foi possível localizar o objeto "' + layoutId + '" para remoção.');
  }

  /* Remove também a linha do comentário de variantes que fica logo após o marcador,
     se existir (ex: "  /* variantes: variants/section-49.js *\/")             */
  var before = cleaned.slice(0, bounds.start);
  var after  = cleaned.slice(bounds.end);

  /* Limpa linha em branco dupla que possa sobrar */
  after = after.replace(/^\n\n/, '\n');

  return before + after;
}


/* ═══════════════════════════════════════════════════════════════════════
   CORE: Verifica se o arquivo de variantes existe no GitHub
   Retorna { exists: bool, sha: string|null }
═══════════════════════════════════════════════════════════════════════ */
function ghCheckVariantFile(layoutId) {
  var token = ghGetToken();
  var path  = 'variants/' + layoutId + '.js';
  var url   = 'https://api.github.com/repos/'
    + GITHUB_CONFIG.OWNER + '/'
    + GITHUB_CONFIG.REPO  + '/contents/'
    + path + '?ref=' + GITHUB_CONFIG.BRANCH;

  return fetch(url, {
    headers: {
      'Authorization': 'token ' + token,
      'Accept': 'application/vnd.github+json'
    }
  }).then(function (res) {
    if (res.status === 404) return { exists: false, sha: null };
    if (!res.ok) return { exists: false, sha: null };
    return res.json().then(function (data) {
      return { exists: true, sha: data.sha, path: data.path };
    });
  }).catch(function () {
    return { exists: false, sha: null };
  });
}


/* ═══════════════════════════════════════════════════════════════════════
   CORE: Deleta um arquivo no GitHub via DELETE
═══════════════════════════════════════════════════════════════════════ */
function ghDeleteFile(path, sha, commitMsg) {
  var token = ghGetToken();
  var url   = 'https://api.github.com/repos/'
    + GITHUB_CONFIG.OWNER + '/'
    + GITHUB_CONFIG.REPO  + '/contents/'
    + path;

  return fetch(url, {
    method: 'DELETE',
    headers: {
      'Authorization': 'token ' + token,
      'Accept':        'application/vnd.github+json',
      'Content-Type':  'application/json'
    },
    body: JSON.stringify({
      message: commitMsg,
      sha:     sha,
      branch:  GITHUB_CONFIG.BRANCH
    })
  }).then(function (res) {
    if (res.status === 401) {
      ghSetToken('');
      ghUpdateLockButton();
      throw new Error('Token inválido ou expirado. Clique no cadeado para configurar um novo.');
    }
    if (!res.ok) {
      return res.json().then(function (e) {
        throw new Error('GitHub DELETE falhou (' + res.status + '): ' + (e.message || path));
      });
    }
    return true;
  });
}


/* ═══════════════════════════════════════════════════════════════════════
   CORE: Remove o layout da memória do SenkoLib
═══════════════════════════════════════════════════════════════════════ */
function ghRemoveLayoutFromMemory(layoutId) {
  var layouts = SenkoLib.getAll();
  var idx = -1;
  for (var i = 0; i < layouts.length; i++) {
    if (layouts[i].id === layoutId) { idx = i; break; }
  }
  if (idx !== -1) layouts.splice(idx, 1);
}


/* ═══════════════════════════════════════════════════════════════════════
   CORE: Fluxo principal de exclusão
   deleteVariants = true  → também apaga o arquivo variants/[id].js
═══════════════════════════════════════════════════════════════════════ */
function githubDeleteLayout(layoutId, deleteVariants) {
  if (!ghEnsureToken()) {
    ghSetStatus('Token não configurado', 'error');
    return Promise.resolve(false);
  }

  ghSetStatus('Buscando arquivo…', 'saving');

  /* 1. Procura o marcador em todos os arquivos de layouts */
  return githubListDir('layouts').then(function (entries) {
    var jsFiles = entries.filter(function (e) {
      return e.type === 'file' && e.name.endsWith('.js');
    });

    var marker   = '/*@@@@Senko - ' + layoutId.toLowerCase() + ' */';
    var promises = jsFiles.map(function (entry) {
      return githubGetFile(entry.path).then(function (data) {
        if (data.content.indexOf(marker) !== -1) {
          return { entry: entry, content: data.content, sha: data.sha };
        }
        return null;
      });
    });

    return Promise.all(promises).then(function (results) {
      var candidates = results.filter(Boolean);

      if (candidates.length === 0) {
        ghSetStatus('Marcador não encontrado', 'error');
        alert('Marcador não encontrado para "' + layoutId + '".\nO layout pode já ter sido removido manualmente do arquivo.');
        return false;
      }

      if (candidates.length > 1) {
        ghSetStatus('Duplicata detectada', 'error');
        var names = candidates.map(function (c) { return c.entry.name; }).join(', ');
        alert('O marcador de "' + layoutId + '" foi encontrado em mais de um arquivo:\n' + names + '\n\nCorrija a duplicata manualmente antes de excluir.');
        return false;
      }

      var target     = candidates[0];
      var newContent;

      try {
        newContent = ghDeleteLayoutFromContent(target.content, layoutId);
      } catch (e) {
        ghSetStatus('Erro ao remover objeto', 'error');
        alert('Erro ao remover o objeto do arquivo:\n' + e.message);
        return false;
      }

      ghSetStatus('Salvando no GitHub…', 'saving');

      /* 2. Salva o arquivo de layouts sem o objeto */
      return githubPutFile(
        target.entry.path,
        newContent,
        target.sha,
        '[SenkoLib] delete layout: ' + layoutId
      ).then(function () {

        /* 3. Se pediu para apagar variantes, deleta o arquivo */
        if (deleteVariants) {
          return ghCheckVariantFile(layoutId).then(function (info) {
            if (!info.exists) return true;
            ghSetStatus('Removendo variantes…', 'saving');
            return ghDeleteFile(
              'variants/' + layoutId + '.js',
              info.sha,
              '[SenkoLib] delete variants: ' + layoutId
            );
          });
        }
        return true;

      }).then(function () {
        /* 4. Remove da memória e atualiza o grid */
        ghRemoveLayoutFromMemory(layoutId);
        ghSetStatus('✓ Layout excluído: ' + layoutId, 'ok');
        renderGrid();
        return true;
      });

    });

  }).catch(function (e) {
    console.error('[senko-github-delete] Erro ao excluir layout:', e);
    ghSetStatus('Erro: ' + e.message, 'error');
    alert('Erro ao excluir no GitHub:\n' + e.message);
    return false;
  });
}


/* ═══════════════════════════════════════════════════════════════════════
   UI — Modal de confirmação de exclusão
   Estilo inline, sem dependência de CSS externo.
═══════════════════════════════════════════════════════════════════════ */

/* Cria o modal de confirmação e insere no body (apenas uma vez) */
function ghCreateDeleteModal() {
  if (document.getElementById('ghDeleteOverlay')) return;

  var overlay = document.createElement('div');
  overlay.id = 'ghDeleteOverlay';
  overlay.classList.add('gh-hidden');

  var modal = document.createElement('div');
  modal.id = 'ghDeleteModal';

  var icon = document.createElement('div');
  icon.id = 'ghDeleteIcon';
  icon.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="32" height="32"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/></svg>';

  var title = document.createElement('h3');
  title.id = 'ghDeleteTitle';
  title.textContent = 'Excluir layout?';

  var desc = document.createElement('p');
  desc.id = 'ghDeleteDesc';

  var actions = document.createElement('div');
  actions.id = 'ghDeleteActions';

  var cancelBtn = document.createElement('button');
  cancelBtn.id = 'ghDeleteCancelBtn';
  cancelBtn.textContent = 'Cancelar';

  var confirmBtn = document.createElement('button');
  confirmBtn.id = 'ghDeleteConfirmBtn';
  confirmBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/></svg> Excluir';

  actions.append(cancelBtn, confirmBtn);
  modal.append(icon, title, desc, actions);
  overlay.appendChild(modal);
  document.body.appendChild(overlay);

  /* Fechar ao clicar no overlay */
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) ghCloseDeleteModal();
  });

  cancelBtn.addEventListener('click', ghCloseDeleteModal);

  /* Escape fecha o modal */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !document.getElementById('ghDeleteOverlay').classList.contains('gh-hidden')) {
      ghCloseDeleteModal();
    }
  });
}

function ghOpenDeleteModal(layoutId, layoutName, variantCount) {
  ghCreateDeleteModal();

  var overlay    = document.getElementById('ghDeleteOverlay');
  var desc       = document.getElementById('ghDeleteDesc');
  var confirmBtn = document.getElementById('ghDeleteConfirmBtn');

  desc.innerHTML =
    'Você está prestes a excluir <strong>' + layoutName + '</strong> do repositório GitHub.<br>' +
    (variantCount > 0
      ? 'O arquivo de variantes (' + variantCount + ' variante' + (variantCount > 1 ? 's' : '') + ') também será excluído.<br>'
      : '') +
    'Essa ação <strong>não pode ser desfeita</strong>.';

  /* Limpa listener anterior e define novo */
  var newConfirmBtn = confirmBtn.cloneNode(true);
  confirmBtn.parentNode.replaceChild(newConfirmBtn, confirmBtn);

  newConfirmBtn.addEventListener('click', function () {
    ghCloseDeleteModal();
    closeEditModal();

    /* Pequeno delay para o modal de edição fechar antes do status aparecer */
    setTimeout(function () {
      var deleteBtn = document.getElementById('ghDeleteLayoutBtn');
      if (deleteBtn) {
        deleteBtn.textContent = 'Excluindo…';
        deleteBtn.disabled = true;
      }

      githubDeleteLayout(layoutId, true).then(function (result) {
        if (deleteBtn) {
          deleteBtn.innerHTML = TRASH_ICON + ' Excluir';
          deleteBtn.disabled = false;
        }
      });
    }, 200);
  });

  overlay.classList.remove('gh-hidden');
  document.body.style.overflow = 'hidden';
}

function ghCloseDeleteModal() {
  var overlay = document.getElementById('ghDeleteOverlay');
  if (overlay) overlay.classList.add('gh-hidden');
  document.body.style.overflow = '';
}


/* ═══════════════════════════════════════════════════════════════════════
   ESTILOS — injetados no <head>
═══════════════════════════════════════════════════════════════════════ */
function ghInjectDeleteStyles() {
  var style = document.createElement('style');
  style.textContent = [
    /* Overlay */
    '#ghDeleteOverlay {',
    '  position: fixed;',
    '  inset: 0;',
    '  background: rgba(0,0,0,.55);',
    '  backdrop-filter: blur(3px);',
    '  display: flex;',
    '  align-items: center;',
    '  justify-content: center;',
    '  z-index: 9999;',
    '  padding: 1rem;',
    '}',
    '#ghDeleteOverlay.gh-hidden { display: none; }',

    /* Modal box */
    '#ghDeleteModal {',
    '  background: var(--card, #fff);',
    '  border: 1.5px solid var(--border, #e2e8f0);',
    '  border-radius: calc(var(--radius, 8px) * 1.5);',
    '  padding: 2rem;',
    '  width: 100%;',
    '  max-width: 400px;',
    '  display: flex;',
    '  flex-direction: column;',
    '  align-items: center;',
    '  gap: 1rem;',
    '  text-align: center;',
    '  box-shadow: 0 20px 60px rgba(0,0,0,.18);',
    '}',

    /* Ícone */
    '#ghDeleteIcon {',
    '  width: 60px;',
    '  height: 60px;',
    '  border-radius: 50%;',
    '  background: #fee2e2;',
    '  color: #ef4444;',
    '  display: flex;',
    '  align-items: center;',
    '  justify-content: center;',
    '  flex-shrink: 0;',
    '}',

    /* Título */
    '#ghDeleteTitle {',
    '  font-family: var(--font-body, sans-serif);',
    '  font-size: 1.15rem;',
    '  font-weight: 800;',
    '  color: var(--text1, #0f172a);',
    '  margin: 0;',
    '}',

    /* Descrição */
    '#ghDeleteDesc {',
    '  font-family: var(--font-body, sans-serif);',
    '  font-size: .88rem;',
    '  color: var(--text2, #64748b);',
    '  line-height: 1.5;',
    '  margin: 0;',
    '}',
    '#ghDeleteDesc strong { color: var(--text1, #0f172a); }',

    /* Botões */
    '#ghDeleteActions {',
    '  display: flex;',
    '  gap: .6rem;',
    '  width: 100%;',
    '  margin-top: .25rem;',
    '}',
    '#ghDeleteCancelBtn {',
    '  flex: 1;',
    '  padding: .6rem 1rem;',
    '  background: var(--bg, #f8fafc);',
    '  color: var(--text2, #64748b);',
    '  border: 1.5px solid var(--border, #e2e8f0);',
    '  border-radius: var(--radius, 8px);',
    '  font-family: var(--font-body, sans-serif);',
    '  font-size: .85rem;',
    '  font-weight: 700;',
    '  cursor: pointer;',
    '  transition: background .15s, border-color .15s;',
    '}',
    '#ghDeleteCancelBtn:hover { background: var(--hover, #f1f5f9); border-color: var(--text3, #94a3b8); }',
    '#ghDeleteConfirmBtn {',
    '  flex: 1;',
    '  display: inline-flex;',
    '  align-items: center;',
    '  justify-content: center;',
    '  gap: .4rem;',
    '  padding: .6rem 1rem;',
    '  background: #ef4444;',
    '  color: #fff;',
    '  border: 1.5px solid #ef4444;',
    '  border-radius: var(--radius, 8px);',
    '  font-family: var(--font-body, sans-serif);',
    '  font-size: .85rem;',
    '  font-weight: 700;',
    '  cursor: pointer;',
    '  transition: background .15s, border-color .15s;',
    '}',
    '#ghDeleteConfirmBtn:hover { background: #dc2626; border-color: #dc2626; }',
    '#ghDeleteConfirmBtn:disabled { opacity: .6; cursor: not-allowed; }',

    /* Botão excluir no modal de edição — mesmo tamanho do .btn-github */
    '.btn-delete-layout {',
    '  display: inline-flex;',
    '  align-items: center;',
    '  gap: .4rem;',
    '  padding: .45rem .85rem;',
    '  background: transparent;',
    '  color: #ef4444;',
    '  border: 1px solid #fca5a5;',
    '  border-radius: var(--radius, 6px);',
    '  font-size: .8rem;',
    '  font-weight: 700;',
    '  font-family: var(--font-body, sans-serif);',
    '  cursor: pointer;',
    '  height: 34px;',
    '  white-space: nowrap;',
    '  transition: background .15s, border-color .15s, color .15s;',
    '  box-sizing: border-box;',
    '}',
    '.btn-delete-layout:hover { background: #fee2e2; border-color: #ef4444; }',
    '.btn-delete-layout:disabled { opacity: .5; cursor: not-allowed; }',
  ].join('\n');
  document.head.appendChild(style);
}


/* ═══════════════════════════════════════════════════════════════════════
   INICIALIZAÇÃO — injeta botão no modal de edição
═══════════════════════════════════════════════════════════════════════ */

var TRASH_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/></svg>';

document.addEventListener('DOMContentLoaded', function () {
  ghInjectDeleteStyles();
  ghCreateDeleteModal();

  /* Injeta o botão "Excluir" no modal de edição, ao lado do botão GitHub */
  var ghSaveLayoutBtn = document.getElementById('ghSaveLayoutBtn');
  if (!ghSaveLayoutBtn) {
    /* senko-github-v2 ainda não criou o botão — tenta novamente depois */
    setTimeout(injectDeleteButton, 300);
  } else {
    injectDeleteButton();
  }

  function injectDeleteButton() {
    if (document.getElementById('ghDeleteLayoutBtn')) return;

    var anchor = document.getElementById('ghSaveLayoutBtn')
               || document.getElementById('saveToFileBtn')
               || document.getElementById('copyEditBtn');
    if (!anchor) return;

    var deleteBtn = document.createElement('button');
    deleteBtn.id        = 'ghDeleteLayoutBtn';
    deleteBtn.className = 'btn-delete-layout';
    deleteBtn.innerHTML = TRASH_ICON + ' Excluir';
    deleteBtn.title     = 'Excluir este layout do repositório GitHub';

    /* Insere ANTES do botão âncora (fica à esquerda) */
    anchor.parentNode.insertBefore(deleteBtn, anchor);

    deleteBtn.addEventListener('click', function () {
      if (!state.currentEdit) {
        alert('Nenhum layout selecionado para exclusão.');
        return;
      }

      var layoutId    = state.currentEdit.id;
      var layoutName  = state.currentEdit.name;
      var variantCount = SenkoLib.getVariants(layoutId).length;

      /* Se não tem token ainda, pede antes de abrir o modal */
      if (!ghEnsureToken()) return;

      ghOpenDeleteModal(layoutId, layoutName, variantCount);
    });
  }
});
