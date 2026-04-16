// @ts-nocheck
/* ═══════════════════════════════════════════════════════════════════════
   senko-github-col-delete.js — Excluir coleção inteira do GitHub

   FLUXO:
     Botão "Excluir" no modal de edição → modal de confirmação
     → usuário confirma → deleta colecoes/data/[slug].js no GitHub
     → remove da memória via ColLib.removeCollection
     → atualiza grid

   DEPENDÊNCIAS: senko-github-v2.js, col-core.js, col-script.js, col-modals.js
═══════════════════════════════════════════════════════════════════════ */

var _GHC_DEL_TRASH = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/></svg>';

/* ═══════════════════════════════════════════════════════════════════════
   MODAL DE CONFIRMAÇÃO
═══════════════════════════════════════════════════════════════════════ */
function ghcDelCreateModal() {
  if (document.getElementById('ghcDelOverlay')) return;

  var style = document.createElement('style');
  style.textContent = [
    '#ghcDelOverlay{position:fixed;inset:0;background:rgba(0,0,0,.55);backdrop-filter:blur(3px);display:flex;align-items:center;justify-content:center;z-index:9999;padding:1rem;}',
    '#ghcDelOverlay.gh-hidden{display:none;}',
    '#ghcDelModal{background:var(--card,#fff);border:1.5px solid var(--border,#e2e8f0);border-radius:calc(var(--radius,8px)*1.5);padding:2rem;width:100%;max-width:400px;display:flex;flex-direction:column;align-items:center;gap:1rem;text-align:center;box-shadow:0 20px 60px rgba(0,0,0,.18);}',
    '#ghcDelIcon{width:60px;height:60px;border-radius:50%;background:#fee2e2;color:#ef4444;display:flex;align-items:center;justify-content:center;flex-shrink:0;}',
    '#ghcDelTitle{font-family:var(--font-body,sans-serif);font-size:1.15rem;font-weight:800;color:var(--text1,#0f172a);margin:0;}',
    '#ghcDelDesc{font-family:var(--font-body,sans-serif);font-size:.88rem;color:var(--text2,#64748b);line-height:1.5;margin:0;}',
    '#ghcDelDesc strong{color:var(--text1,#0f172a);}',
    '#ghcDelActions{display:flex;gap:.6rem;width:100%;margin-top:.25rem;}',
    '#ghcDelCancelBtn{flex:1;padding:.6rem 1rem;background:var(--bg,#f8fafc);color:var(--text2,#64748b);border:1.5px solid var(--border,#e2e8f0);border-radius:var(--radius,8px);font-family:var(--font-body,sans-serif);font-size:.85rem;font-weight:700;cursor:pointer;}',
    '#ghcDelConfirmBtn{flex:1;display:inline-flex;align-items:center;justify-content:center;gap:.4rem;padding:.6rem 1rem;background:#ef4444;color:#fff;border:1.5px solid #ef4444;border-radius:var(--radius,8px);font-family:var(--font-body,sans-serif);font-size:.85rem;font-weight:700;cursor:pointer;}',
    '#ghcDelConfirmBtn:hover{background:#dc2626;border-color:#dc2626;}',
    '#ghcDelConfirmBtn:disabled{opacity:.6;cursor:not-allowed;}',
  ].join('');
  document.head.appendChild(style);

  var overlay = document.createElement('div');
  overlay.id        = 'ghcDelOverlay';
  overlay.className = 'gh-hidden';
  overlay.innerHTML =
    '<div id="ghcDelModal">' +
    '  <div id="ghcDelIcon">' + _GHC_DEL_TRASH.replace('width="14"','width="28"').replace('height="14"','height="28"') + '</div>' +
    '  <h3 id="ghcDelTitle">Excluir coleção?</h3>' +
    '  <p id="ghcDelDesc"></p>' +
    '  <div id="ghcDelActions">' +
    '    <button id="ghcDelCancelBtn">Cancelar</button>' +
    '    <button id="ghcDelConfirmBtn">' + _GHC_DEL_TRASH + ' Excluir</button>' +
    '  </div>' +
    '</div>';
  document.body.appendChild(overlay);

  overlay.addEventListener('click', function(e){ if(e.target===overlay) ghcDelCloseModal(); });
  document.getElementById('ghcDelCancelBtn').addEventListener('click', ghcDelCloseModal);
}

function ghcDelOpenModal(slug, name) {
  ghcDelCreateModal();
  var overlay    = document.getElementById('ghcDelOverlay');
  var desc       = document.getElementById('ghcDelDesc');
  var confirmBtn = document.getElementById('ghcDelConfirmBtn');

  desc.innerHTML =
    'Você está prestes a excluir a coleção <strong>' + name + '</strong>.<br>' +
    'O arquivo <code>colecoes/data/' + slug + '.js</code> será removido do repositório.<br>' +
    'Essa ação <strong>não pode ser desfeita</strong>.';

  /* Clona botão para limpar listeners anteriores */
  var newBtn = confirmBtn.cloneNode(true);
  confirmBtn.parentNode.replaceChild(newBtn, confirmBtn);
  newBtn.innerHTML = _GHC_DEL_TRASH + ' Excluir';

  newBtn.addEventListener('click', function() {
    ghcDelCloseModal();
    if (typeof colCloseEditModal === 'function') colCloseEditModal();
    setTimeout(function() {
      ghcDeleteCollection(slug).then(function(result) {
        if (result) {
          if (typeof colRenderGrid      === 'function') colRenderGrid();
          if (typeof colUpdateTabCounts === 'function') colUpdateTabCounts();
        }
      });
    }, 200);
  });

  overlay.classList.remove('gh-hidden');
  document.body.style.overflow = 'hidden';
}

function ghcDelCloseModal() {
  var overlay = document.getElementById('ghcDelOverlay');
  if (overlay) overlay.classList.add('gh-hidden');
  document.body.style.overflow = '';
}

/* ═══════════════════════════════════════════════════════════════════════
   CORE — exclui o arquivo da coleção no GitHub
═══════════════════════════════════════════════════════════════════════ */
function ghcDeleteCollection(slug) {
  if (!ghEnsureToken()) { ghSetStatus('Token não configurado','error'); return Promise.resolve(false); }

  var filePath = 'colecoes/data/' + slug + '.js';
  var token    = ghGetToken();
  ghSetStatus('Excluindo coleção…','saving');

  /* Busca o SHA atual do arquivo para o DELETE */
  return githubGetFile(filePath).then(function(data) {

    var url = 'https://api.github.com/repos/'
      + GITHUB_CONFIG.OWNER + '/' + GITHUB_CONFIG.REPO
      + '/contents/' + filePath;

    return fetch(url, {
      method:  'DELETE',
      headers: {
        'Authorization': 'token ' + token,
        'Accept':        'application/vnd.github+json',
        'Content-Type':  'application/json',
      },
      body: JSON.stringify({
        message: '[SenkoLib] delete collection: ' + slug,
        sha:     data.sha,
        branch:  GITHUB_CONFIG.BRANCH,
      }),
    }).then(function(res) {
      if (res.status === 401) { ghSetToken(''); throw new Error('Token inválido ou expirado.'); }
      if (!res.ok) return res.json().then(function(e){
        throw new Error('GitHub DELETE falhou (' + res.status + '): ' + (e.message || filePath));
      });
      return true;
    });

  }).then(function() {
    ColLib.removeCollection(slug);
    ghSetStatus('✓ Coleção excluída: ' + filePath,'ok');
    ghStartDeployWatch('index.html');
    return true;

  }).catch(function(e) {
    console.error('[col-delete]', e);
    ghSetStatus('Erro: ' + e.message,'error');
    ghShowErrorModal(e.message);
    return false;
  });
}

/* ═══════════════════════════════════════════════════════════════════════
   UI — injeta botão Excluir no modal de edição
═══════════════════════════════════════════════════════════════════════ */
function ghcDelInjectButton() {
  if (document.getElementById('ghcDelColBtn')) return;
  var anchor = document.getElementById('colEditDeleteBtn');
  if (!anchor) return;

  var btn       = document.createElement('button');
  btn.id        = 'ghcDelColBtn';
  btn.className = 'btn-delete-layout'; /* reutiliza estilo do senko-github-delete.js */
  btn.innerHTML = _GHC_DEL_TRASH + ' Excluir';
  btn.title     = 'Excluir esta coleção do repositório GitHub';

  anchor.parentNode.replaceChild(btn, anchor);

  btn.addEventListener('click', function() {
    var col = colState && colState.currentEditCollection;
    if (!col || !col.slug) { ghShowErrorModal('Nenhuma coleção selecionada.'); return; }
    if (!ghEnsureToken()) return;
    ghcDelOpenModal(col.slug, col.name);
  });
}

document.addEventListener('DOMContentLoaded', function() {
  if (!window.location.hostname.match(/^[^.]+\.github\.io$/i)) return;
  ghcDelCreateModal();
  setTimeout(ghcDelInjectButton, 350);
});
