// @ts-nocheck
/* ═══════════════════════════════════════════════════════════════════════
   senko-github-col-delete.js — Excluir coleção do GitHub

   RESPONSABILIDADE:
     - Injeta botão "Excluir" no modal de edição de coleção (#colEditOverlay)
     - Exibe modal de confirmação antes de qualquer operação destrutiva
     - Remove o arquivo colecoes/data/[slug].js do repositório
     - Remove o <script> correspondente do index.html
     - Remove a coleção da memória via ColLib

   DEPENDÊNCIAS:
     - senko-github-v2.js  (ghGetToken, ghEnsureToken, ghLockSave,
                            ghUnlockSave, ghSetStatus, githubGetFile,
                            githubPutFile, ghShowErrorModal, GH_ICON,
                            GITHUB_CONFIG, ghStartDeployWatch)
     - col-core.js         (ColLib)
     - col-script.js       (colRenderGrid, colState)
     - col-modals.js       (colCloseEditModal)

   SÓ ATIVO NO GITHUB PAGES.
═══════════════════════════════════════════════════════════════════════ */


/* ═══════════════════════════════════════════════════════════════════════
   MODAL DE CONFIRMAÇÃO DE EXCLUSÃO
═══════════════════════════════════════════════════════════════════════ */

/*
 * ghcDeleteShowConfirm(slug, name, onConfirm)
 * Exibe um modal de confirmação simples antes de excluir.
 * Reutiliza ghShowErrorModal se disponível, ou cria inline.
 */
function ghcDeleteShowConfirm(slug, name, onConfirm) {
  /* Tenta reutilizar infraestrutura existente do senko-github-v2.js */
  if (typeof ghShowConfirmModal === 'function') {
    ghShowConfirmModal(
      'Excluir "' + name + '"?\n\nEsta ação remove o arquivo colecoes/data/' + slug + '.js ' +
      'do repositório e é irreversível.',
      onConfirm
    );
    return;
  }

  /* Fallback: confirm nativo */
  var ok = window.confirm(
    'Excluir a coleção "' + name + '"?\n\n' +
    'O arquivo colecoes/data/' + slug + '.js será removido do repositório.\n' +
    'Esta ação é irreversível.'
  );
  if (ok) onConfirm();
}


/* ═══════════════════════════════════════════════════════════════════════
   UTILITÁRIOS
═══════════════════════════════════════════════════════════════════════ */

function ghcDeleteFilePath(slug) {
  return 'colecoes/data/' + slug + '.js';
}

/* Obtém o SHA do arquivo para poder deletá-lo via API */
function ghcDeleteGetSha(slug) {
  var token = ghGetToken();
  var url   = 'https://api.github.com/repos/'
    + GITHUB_CONFIG.OWNER + '/' + GITHUB_CONFIG.REPO
    + '/contents/' + ghcDeleteFilePath(slug)
    + '?ref=' + GITHUB_CONFIG.BRANCH;

  return fetch(url, {
    headers: {
      'Authorization': 'token ' + token,
      'Accept': 'application/vnd.github+json',
    }
  }).then(function (res) {
    if (res.status === 404) throw new Error('Arquivo não encontrado no repositório.');
    if (res.status === 401) {
      throw new Error('Token inválido ou expirado. Configure um novo token.');
    }
    if (!res.ok) throw new Error('Erro ao acessar arquivo (' + res.status + ').');
    return res.json();
  }).then(function (data) {
    return data.sha;
  });
}

/* Deleta o arquivo via API do GitHub */
function ghcDeleteFile(slug, sha) {
  var token = ghGetToken();
  var url   = 'https://api.github.com/repos/'
    + GITHUB_CONFIG.OWNER + '/' + GITHUB_CONFIG.REPO
    + '/contents/' + ghcDeleteFilePath(slug);

  return fetch(url, {
    method: 'DELETE',
    headers: {
      'Authorization': 'token ' + token,
      'Accept': 'application/vnd.github+json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: '[SenkoLib] delete collection: ' + slug,
      sha:     sha,
      branch:  GITHUB_CONFIG.BRANCH,
    }),
  }).then(function (res) {
    if (!res.ok) return res.json().then(function (d) {
      throw new Error(d.message || 'Erro ao excluir arquivo (' + res.status + ').');
    });
    return true;
  });
}

/* Remove o <script> da coleção do index.html */
function ghcDeleteUnregisterScript(slug) {
  var scriptTag = 'colecoes/data/' + slug + '.js';

  return githubGetFile('index.html').then(function (data) {
    /* Tenta remover a linha exata do script */
    var lines    = data.content.split('\n');
    var filtered = lines.filter(function (line) {
      return line.indexOf(scriptTag) === -1;
    });

    /* Nada mudou — script já não estava registrado */
    if (filtered.length === lines.length) return;

    var newContent = filtered.join('\n');

    return githubPutFile(
      'index.html',
      newContent,
      data.sha,
      '[SenkoLib] unregister collection: ' + slug
    );
  });
}


/* ═══════════════════════════════════════════════════════════════════════
   CORE: Fluxo principal de exclusão
═══════════════════════════════════════════════════════════════════════ */

function ghcDeleteCollection(slug, name) {
  if (!ghLockSave()) return Promise.resolve(false);
  if (!ghEnsureToken()) {
    ghUnlockSave();
    ghSetStatus('Token não configurado', 'error');
    return Promise.resolve(false);
  }

  ghSetStatus('Verificando arquivo…', 'saving');

  return ghcDeleteGetSha(slug).then(function (sha) {

    ghSetStatus('Excluindo arquivo…', 'saving');
    return ghcDeleteFile(slug, sha);

  }).then(function () {

    ghSetStatus('Atualizando index.html…', 'saving');
    return ghcDeleteUnregisterScript(slug);

  }).then(function () {

    /* Remove da memória */
    ColLib.removeCollection(slug);

    ghSetStatus('✓ Coleção excluída: ' + slug, 'ok');
    ghUnlockSave();
    return true;

  }).catch(function (e) {
    console.error('[senko-github-col-delete] Erro:', e);
    ghSetStatus('Erro: ' + e.message, 'error');
    ghUnlockSave();
    ghShowErrorModal(e.message);
    return false;
  });
}


/* ═══════════════════════════════════════════════════════════════════════
   UI — Injeta botão de exclusão no modal de edição de coleção
═══════════════════════════════════════════════════════════════════════ */

function ghcDeleteInjectButton() {
  if (document.getElementById('ghcDeleteColBtn')) return;

  var anchor = document.getElementById('colEditDeleteBtn');
  if (!anchor) return;

  var btn       = document.createElement('button');
  btn.id        = 'ghcDeleteColBtn';
  btn.className = 'btn-delete';
  btn.innerHTML =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14">' +
    '<polyline points="3 6 5 6 21 6"/>' +
    '<path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/>' +
    '<path d="M10 11v6M14 11v6"/>' +
    '<path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/>' +
    '</svg> Excluir';
  btn.title = 'Excluir esta coleção do repositório';

  anchor.parentNode.replaceChild(btn, anchor);

  btn.addEventListener('click', function () {
    var col = colState.currentEditCollection;
    if (!col) return;

    ghcDeleteShowConfirm(col.slug, col.name, function () {
      btn.textContent = 'Excluindo…';
      btn.disabled    = true;

      ghcDeleteCollection(col.slug, col.name).then(function (result) {
        if (result) {
          if (typeof colCloseEditModal === 'function') colCloseEditModal();
          if (typeof colRenderGrid    === 'function') colRenderGrid();
          /* Atualiza contador da aba */
          var colCount = document.getElementById('tabCountCollections');
          if (colCount) colCount.textContent = ColLib.getCollections().length || '';
        } else {
          btn.innerHTML =
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14">' +
            '<polyline points="3 6 5 6 21 6"/>' +
            '<path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/>' +
            '</svg> Excluir';
          btn.disabled = false;
        }
      }).catch(function () {
        btn.innerHTML =
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14">' +
          '<polyline points="3 6 5 6 21 6"/>' +
          '<path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/>' +
          '</svg> Excluir';
        btn.disabled = false;
      });
    });
  });
}


/* ═══════════════════════════════════════════════════════════════════════
   INICIALIZAÇÃO — só ativa no GitHub Pages
═══════════════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', function () {
  if (!window.location.hostname.match(/^[^.]+\.github\.io$/i)) return;

  ghcDeleteInjectButton();
});
