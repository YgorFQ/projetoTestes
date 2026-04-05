// @ts-nocheck
/* ═══════════════════════════════════════════════════════════════════════
   senko-github-variants.js — Módulo GitHub para variantes

   RESPONSABILIDADE:
     Toda operação de variantes via GitHub API:
       — Criar variante nova              (githubCreateVariant)
       — Editar variante existente        (githubSaveVariant)
       — Deletar variante específica      (githubDeleteVariant)
     Injeta botões "GitHub" nos modais de nova variante e edição de variante.
     Modal de confirmação de exclusão.

   ESPELHA o padrão do senko-github-v2.js para layouts:
     — Usa o nome ORIGINAL da variante para localizar o marcador no arquivo
     — Atualiza a memória (SenkoLib) após salvar com sucesso
     — Usa ghLockSave / ghUnlockSave para evitar race conditions

   DEPENDÊNCIAS (devem ser carregadas antes):
     - senko-github-v2.js   (ghGetToken, ghEnsureToken, ghLockSave,
                             ghUnlockSave, ghSetStatus, ghUpdateLockButton,
                             githubGetFile, githubPutFile, GH_ICON,
                             GITHUB_CONFIG)
     - core/script.js       (state, SenkoLib, renderVariantBlocks,
                             updateVariantsCount, renderGrid,
                             closeNewVariantModal, closeEditVariantModal)

   ORDEM DE CARREGAMENTO no index.html (GitHub Pages only):
     <script src="modules/github/senko-github-v2.js"></script>
     <script src="modules/github/senko-github-variants.js"></script>
═══════════════════════════════════════════════════════════════════════ */


/* ═══════════════════════════════════════════════════════════════════════
   UTILITÁRIO: Localiza bounds de um objeto de variante no conteúdo do arquivo
   Retorna { start, end } | { duplicate: true } | null
═══════════════════════════════════════════════════════════════════════ */
function ghvFindVariantObjectBounds(content, variantName) {
  var marker    = '/*@@@@Senko - ' + variantName.toLowerCase() + ' */';
  var markerPos = content.indexOf(marker);
  if (markerPos === -1) return null;

  /* Detecta duplicata antes de tentar parsear */
  if (content.indexOf(marker, markerPos + marker.length) !== -1) {
    return { duplicate: true };
  }

  var objOpen = content.indexOf('{', markerPos + marker.length);
  if (objOpen === -1) return null;

  var i          = objOpen;
  var depth      = 0;
  var inTemplate = false;
  var len        = content.length;

  while (i < len) {
    var ch = content[i];

    if (ch === '`') {
      var backslashes = 0;
      var j = i - 1;
      while (j >= 0 && content[j] === '\\') { backslashes++; j--; }
      if (backslashes % 2 === 0) inTemplate = !inTemplate;
      i++; continue;
    }

    if (inTemplate) { i++; continue; }
    if (ch === '{')  { depth++; i++; continue; }

    if (ch === '}') {
      depth--;
      if (depth === 0) {
        var end = i + 1;
        if (content[end] === ',') end++;
        if (content[end] === '\n') end++;
        return { start: markerPos, end: end };
      }
      i++; continue;
    }

    i++;
  }

  return null;
}


/* ═══════════════════════════════════════════════════════════════════════
   UTILITÁRIO: Conta objetos de variante no arquivo (via marcadores)
═══════════════════════════════════════════════════════════════════════ */
function ghvCountVariants(content) {
  var re      = /\/\*@@@@Senko - /g;
  var matches = content.match(re);
  return matches ? matches.length : 0;
}


/* ═══════════════════════════════════════════════════════════════════════
   UTILITÁRIO: Monta conteúdo inicial de um arquivo de variantes novo
═══════════════════════════════════════════════════════════════════════ */
function ghvBuildNewVariantFile(parentId, objectCode) {
  return (
    '// @ts-nocheck\n' +
    "SenkoLib.registerVariant('" + parentId.toLowerCase() + "', [\n" +
    objectCode + ',\n' +
    ']);\n'
  );
}


/* ═══════════════════════════════════════════════════════════════════════
   UTILITÁRIO: Lê o arquivo de variantes do GitHub
   Retorna { exists, sha, content, path } ou { exists: false, path }
═══════════════════════════════════════════════════════════════════════ */
function ghvGetVariantFile(parentId) {
  var filePath = 'variants/' + parentId.toLowerCase() + '.js';
  return githubGetFile(filePath).then(function (data) {
    return { exists: true, sha: data.sha, content: data.content, path: filePath };
  }).catch(function (err) {
    if (err.message && err.message.indexOf('404') !== -1) {
      return { exists: false, path: filePath };
    }
    throw err;
  });
}


/* ═══════════════════════════════════════════════════════════════════════
   UTILITÁRIO: Atualiza variante na memória do SenkoLib após edição
═══════════════════════════════════════════════════════════════════════ */
function ghvUpdateVariantInMemory(parentId, originalName, newName, html, css) {
  var variants  = SenkoLib.getVariants(parentId);
  var origLower = originalName.toLowerCase();
  for (var i = 0; i < variants.length; i++) {
    if ((variants[i].name || '').toLowerCase() === origLower) {
      variants[i].name = newName;
      variants[i].html = html;
      variants[i].css  = css;
      return;
    }
  }
}


/* ═══════════════════════════════════════════════════════════════════════
   UTILITÁRIO: Remove variante da memória do SenkoLib após exclusão
═══════════════════════════════════════════════════════════════════════ */
function ghvRemoveVariantFromMemory(parentId, variantName) {
  var variants  = SenkoLib.getVariants(parentId);
  var nameLower = variantName.toLowerCase();
  for (var i = 0; i < variants.length; i++) {
    if ((variants[i].name || '').toLowerCase() === nameLower) {
      variants.splice(i, 1);
      return;
    }
  }
}


/* ═══════════════════════════════════════════════════════════════════════
   CORE: Criar variante nova no GitHub
   Se o arquivo variants/[parentId].js não existir, cria do zero.
═══════════════════════════════════════════════════════════════════════ */
function githubCreateVariant(parentId, variantName, objectCode) {
  if (!ghLockSave()) return Promise.resolve(false);
  if (!ghEnsureToken()) {
    ghUnlockSave();
    ghSetStatus('Token não configurado', 'error');
    return Promise.resolve(false);
  }

  if (!/^[a-z0-9-]+$/.test(parentId.toLowerCase())) {
    ghUnlockSave();
    ghSetStatus('ID inválido', 'error');
    alert('O ID do layout pai ("' + parentId + '") contém caracteres inválidos.\nUse apenas letras minúsculas, números e hífen.');
    return Promise.resolve(false);
  }

  var nameLower = variantName.toLowerCase();
  ghSetStatus('Verificando arquivo de variantes…', 'saving');

  return ghvGetVariantFile(parentId).then(function (fileInfo) {

    /* ── Arquivo existe: verifica duplicata e insere ── */
    if (fileInfo.exists) {
      var content = fileInfo.content;
      var sha     = fileInfo.sha;

      /* Checa duplicata pelo marcador */
      var marker = '/*@@@@Senko - ' + nameLower + ' */';
      if (content.indexOf(marker) !== -1) {
        ghSetStatus('Nome duplicado', 'error');
        ghUnlockSave();
        alert('Já existe uma variante com o nome "' + variantName + '" em ' + fileInfo.path + '.\nEscolha outro nome.');
        return false;
      }

      var closePos = content.lastIndexOf(']);');
      if (closePos === -1) {
        ghSetStatus('Estrutura inválida', 'error');
        ghUnlockSave();
        alert('Não foi possível encontrar o fechamento do array em ' + fileInfo.path + '.');
        return false;
      }

      var newContent =
        content.slice(0, closePos) +
        objectCode + '\n' +
        content.slice(closePos);

      ghSetStatus('Salvando no GitHub…', 'saving');

      return githubPutFile(
        fileInfo.path,
        newContent,
        sha,
        '[SenkoLib] add variant: ' + nameLower + ' (' + parentId + ')'
      ).then(function () {
        var html = document.getElementById('newVarHtml') ? document.getElementById('newVarHtml').value : '';
        var css  = document.getElementById('newVarCss')  ? document.getElementById('newVarCss').value  : '';
        SenkoLib.registerVariant(parentId, [{ name: variantName, html: html, css: css }]);
        ghSetStatus('✓ Variante salva em ' + fileInfo.path, 'ok');
        ghUnlockSave();
        return fileInfo.path;
      }).catch(function (e) {
        ghSetStatus('Erro ao salvar: ' + e.message, 'error');
        ghUnlockSave();
        throw e;
      });
    }

    /* ── Arquivo não existe: cria do zero ── */
    var newFileContent = ghvBuildNewVariantFile(parentId, objectCode);

    ghSetStatus('Criando arquivo de variantes…', 'saving');

    return githubPutFile(
      fileInfo.path,
      newFileContent,
      null,
      '[SenkoLib] create variants file: ' + parentId
    ).then(function () {
      var html = document.getElementById('newVarHtml') ? document.getElementById('newVarHtml').value : '';
      var css  = document.getElementById('newVarCss')  ? document.getElementById('newVarCss').value  : '';
      SenkoLib.registerVariant(parentId, [{ name: variantName, html: html, css: css }]);
      ghSetStatus('✓ Arquivo criado: ' + fileInfo.path, 'ok');
      ghUnlockSave();
      return fileInfo.path;
    }).catch(function (e) {
      ghSetStatus('Erro ao criar arquivo: ' + e.message, 'error');
      ghUnlockSave();
      throw e;
    });

  }).catch(function (e) {
    console.error('[senko-github-variants] Erro ao criar variante:', e);
    ghSetStatus('Erro: ' + e.message, 'error');
    ghUnlockSave();
    alert('Erro ao salvar variante no GitHub:\n' + e.message);
    return false;
  });
}


/* ═══════════════════════════════════════════════════════════════════════
   CORE: Editar variante existente no GitHub
   ───────────────────────────────────────────────────────────────────────
   Recebe o nome ORIGINAL da variante para localizar o marcador correto.
   O objectCode já contém o nome novo dentro de si.
═══════════════════════════════════════════════════════════════════════ */
function githubSaveVariant(parentId, originalName, objectCode) {
  if (!ghLockSave()) return Promise.resolve(false);
  if (!ghEnsureToken()) {
    ghUnlockSave();
    ghSetStatus('Token não configurado', 'error');
    return Promise.resolve(false);
  }

  var filePath = 'variants/' + parentId.toLowerCase() + '.js';
  ghSetStatus('Lendo arquivo de variantes…', 'saving');

  return githubGetFile(filePath).then(function (data) {
    var content = data.content;
    var sha     = data.sha;

    var bounds = ghvFindVariantObjectBounds(content, originalName);

    if (!bounds) {
      ghSetStatus('Variante não encontrada', 'error');
      ghUnlockSave();
      alert('Variante "' + originalName + '" não encontrada em ' + filePath + '.\nVerifique se o arquivo está correto.');
      return false;
    }

    if (bounds.duplicate) {
      ghSetStatus('Variante duplicada no arquivo', 'error');
      ghUnlockSave();
      alert('A variante "' + originalName + '" aparece mais de uma vez em ' + filePath + '.\nCorrija manualmente antes de editar.');
      return false;
    }

    var newContent =
      content.slice(0, bounds.start) +
      objectCode + '\n' +
      content.slice(bounds.end);

    ghSetStatus('Salvando no GitHub…', 'saving');

    return githubPutFile(
      filePath,
      newContent,
      sha,
      '[SenkoLib] edit variant: ' + originalName.toLowerCase() + ' (' + parentId + ')'
    ).then(function () {
      ghSetStatus('✓ Salvo em ' + filePath, 'ok');
      ghUnlockSave();
      return filePath;
    });

  }).catch(function (e) {
    console.error('[senko-github-variants] Erro ao editar variante:', e);
    ghSetStatus('Erro: ' + e.message, 'error');
    ghUnlockSave();
    alert('Erro ao salvar variante no GitHub:\n' + e.message);
    return false;
  });
}


/* ═══════════════════════════════════════════════════════════════════════
   CORE: Deletar variante específica do GitHub
   Se era a única variante do arquivo, deleta o arquivo inteiro.
═══════════════════════════════════════════════════════════════════════ */
function githubDeleteVariant(parentId, variantNome) {
  if (!ghEnsureToken()) {
    ghSetStatus('Token não configurado', 'error');
    return Promise.resolve(false);
  }

  ghSetStatus('Buscando variante…', 'saving');

  return ghvGetVariantFile(parentId).then(function (fileInfo) {
    if (!fileInfo.exists) {
      ghSetStatus('Arquivo não encontrado', 'error');
      alert('O arquivo de variantes para "' + parentId + '" não foi encontrado no GitHub.');
      return false;
    }

    var content = fileInfo.content;
    var sha     = fileInfo.sha;
    var bounds  = ghvFindVariantObjectBounds(content, variantNome);

    if (!bounds) {
      ghSetStatus('Variante não encontrada', 'error');
      alert('Variante "' + variantNome + '" não encontrada em ' + fileInfo.path + '.');
      return false;
    }

    if (bounds.duplicate) {
      ghSetStatus('Variante duplicada', 'error');
      alert('A variante "' + variantNome + '" aparece mais de uma vez no arquivo.\nCorrija manualmente.');
      return false;
    }

    var remaining = ghvCountVariants(content);

    /* ── Era a única variante: deleta o arquivo inteiro ── */
    if (remaining <= 1) {
      ghSetStatus('Removendo arquivo de variantes…', 'saving');

      var token = ghGetToken();
      var url   = 'https://api.github.com/repos/'
        + GITHUB_CONFIG.OWNER + '/'
        + GITHUB_CONFIG.REPO  + '/contents/'
        + fileInfo.path;

      return fetch(url, {
        method:  'DELETE',
        headers: {
          'Authorization': 'token ' + token,
          'Accept':        'application/vnd.github+json',
          'Content-Type':  'application/json'
        },
        body: JSON.stringify({
          message: '[SenkoLib] delete variants file: ' + parentId,
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
            throw new Error('GitHub DELETE falhou (' + res.status + '): ' + (e.message || fileInfo.path));
          });
        }
        return true;
      }).then(function () {
        ghvRemoveVariantFromMemory(parentId, variantNome);
        ghSetStatus('✓ Arquivo de variantes removido: ' + fileInfo.path, 'ok');
        return true;
      });
    }

    /* ── Ainda há outras variantes: remove só o objeto ── */
    var newContent =
      content.slice(0, bounds.start) +
      content.slice(bounds.end);

    newContent = newContent.replace(/\n\n\n/g, '\n\n');

    ghSetStatus('Salvando no GitHub…', 'saving');

    return githubPutFile(
      fileInfo.path,
      newContent,
      sha,
      '[SenkoLib] delete variant: ' + variantNome.toLowerCase() + ' (' + parentId + ')'
    ).then(function () {
      ghvRemoveVariantFromMemory(parentId, variantNome);
      ghSetStatus('✓ Variante excluída: ' + variantNome, 'ok');
      return true;
    });

  }).catch(function (e) {
    console.error('[senko-github-variants] Erro ao deletar variante:', e);
    ghSetStatus('Erro: ' + e.message, 'error');
    alert('Erro ao deletar variante no GitHub:\n' + e.message);
    return false;
  });
}


/* ═══════════════════════════════════════════════════════════════════════
   UI — Modal de confirmação de exclusão de variante
═══════════════════════════════════════════════════════════════════════ */
var GHV_TRASH_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/></svg>';

function ghvCreateDeleteModal() {
  if (document.getElementById('ghvDeleteOverlay')) return;

  var overlay = document.createElement('div');
  overlay.id        = 'ghvDeleteOverlay';
  overlay.className = 'ghv-hidden';
  overlay.innerHTML = [
    '<div id="ghvDeleteModal">',
    '  <div id="ghvDeleteIcon">',
    '    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="28" height="28">',
    '      <polyline points="3 6 5 6 21 6"/>',
    '      <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/>',
    '      <path d="M10 11v6M14 11v6"/>',
    '      <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/>',
    '    </svg>',
    '  </div>',
    '  <h3 id="ghvDeleteTitle">Excluir Variante</h3>',
    '  <p id="ghvDeleteDesc"></p>',
    '  <div id="ghvDeleteActions">',
    '    <button id="ghvDeleteCancelBtn">Cancelar</button>',
    '    <button id="ghvDeleteConfirmBtn">' + GHV_TRASH_ICON + ' Excluir</button>',
    '  </div>',
    '</div>',
  ].join('\n');

  document.body.appendChild(overlay);

  document.getElementById('ghvDeleteCancelBtn').addEventListener('click', ghvCloseDeleteModal);
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) ghvCloseDeleteModal();
  });
}

function ghvOpenDeleteModal(parentId, variantNome) {
  var overlay    = document.getElementById('ghvDeleteOverlay');
  var desc       = document.getElementById('ghvDeleteDesc');
  var confirmBtn = document.getElementById('ghvDeleteConfirmBtn');
  if (!overlay) return;

  desc.innerHTML =
    'Você está prestes a excluir a variante <strong>' + variantNome + '</strong> de <strong>' + parentId + '</strong>.<br>' +
    'Essa ação <strong>não pode ser desfeita</strong>.';

  /* Clona o botão para limpar listeners anteriores */
  var newConfirmBtn = confirmBtn.cloneNode(true);
  confirmBtn.parentNode.replaceChild(newConfirmBtn, confirmBtn);

  newConfirmBtn.addEventListener('click', function () {
    ghvCloseDeleteModal();
    setTimeout(function () {
      githubDeleteVariant(parentId, variantNome).then(function (result) {
        if (result && state.currentForVariant) {
          var updated = SenkoLib.getVariants(parentId);
          if (typeof renderVariantBlocks === 'function') renderVariantBlocks(updated);
          if (typeof updateVariantsCount === 'function') updateVariantsCount(parentId);
          renderGrid();
        }
      });
    }, 200);
  });

  overlay.classList.remove('ghv-hidden');
  document.body.style.overflow = 'hidden';
}

function ghvCloseDeleteModal() {
  var overlay = document.getElementById('ghvDeleteOverlay');
  if (overlay) overlay.classList.add('ghv-hidden');
  document.body.style.overflow = '';
}


/* ═══════════════════════════════════════════════════════════════════════
   UI — Injeta botão "GitHub" no modal de Nova Variante
═══════════════════════════════════════════════════════════════════════ */
function ghvInjectNewVariantButton() {
  if (document.getElementById('ghvSaveVariantBtn')) return;

  var anchor = document.getElementById('newVarCopyBtn');
  if (!anchor) return;

  var btn       = document.createElement('button');
  btn.id        = 'ghvSaveVariantBtn';
  btn.className = 'btn-github';
  btn.innerHTML = GH_ICON + ' GitHub';
  btn.title     = 'Criar variante diretamente no repositório GitHub';

  anchor.parentNode.insertBefore(btn, anchor.nextSibling);

  btn.addEventListener('click', function () {
    var nomeRaw = document.getElementById('newVarName') ? document.getElementById('newVarName').value.trim() : '';
    var html    = document.getElementById('newVarHtml') ? document.getElementById('newVarHtml').value : '';
    var css     = document.getElementById('newVarCss')  ? document.getElementById('newVarCss').value  : '';

    if (nomeRaw.length < 2) { alert('Preencha o nome da variante primeiro.'); return; }
    if (!state.currentForVariant) { alert('Nenhum layout pai selecionado.'); return; }

    var nomeLower = nomeRaw.toLowerCase();
    var parentId  = state.currentForVariant.id;
    var safeHtml  = html.replace(/`/g, '\\`');
    var safeCss   = css.replace(/`/g, '\\`');

    var objectCode =
      '/*@@@@Senko - ' + nomeLower + ' */\n' +
      '  {\n' +
      "    name: '" + nomeLower + "',\n" +
      '    html: `' + safeHtml + '`,\n' +
      '    css: `'  + safeCss  + '`,\n' +
      '  },';

    btn.textContent = 'Salvando…';
    btn.disabled    = true;

    githubCreateVariant(parentId, nomeLower, objectCode).then(function (result) {
      if (result) {
        btn.innerHTML = GH_ICON + ' Salvo!';
        setTimeout(function () {
          if (typeof closeNewVariantModal === 'function') closeNewVariantModal();
          if (state.currentForVariant) {
            var updated = SenkoLib.getVariants(state.currentForVariant.id);
            if (typeof renderVariantBlocks === 'function') renderVariantBlocks(updated);
            if (typeof updateVariantsCount === 'function') updateVariantsCount(state.currentForVariant.id);
          }
          renderGrid();
          btn.innerHTML = GH_ICON + ' GitHub';
          btn.disabled  = false;
        }, 1200);
      } else {
        btn.innerHTML = GH_ICON + ' GitHub';
        btn.disabled  = false;
      }
    }).catch(function () {
      btn.innerHTML = GH_ICON + ' GitHub';
      btn.disabled  = false;
    });
  });
}


/* ═══════════════════════════════════════════════════════════════════════
   UI — Injeta botão "GitHub" no modal de Edição de Variante
   ───────────────────────────────────────────────────────────────────────
   ⚠ Usa githubSaveVariant (edição), NÃO githubCreateVariant (criação).
   O nome original é lido de state.currentEditVariant.name no momento
   do clique — nunca do campo de texto, que pode ter sido alterado.
═══════════════════════════════════════════════════════════════════════ */
function ghvInjectEditVariantButton() {
  if (document.getElementById('ghvSaveEditVarBtn')) return;

  var anchor = document.getElementById('saveVarToFileBtn');
  if (!anchor) return;

  var btn       = document.createElement('button');
  btn.id        = 'ghvSaveEditVarBtn';
  btn.className = 'btn-github';
  btn.innerHTML = GH_ICON + ' GitHub';
  btn.title     = 'Salvar variante editada no repositório GitHub';

  /* Insere antes do botão FSA (saveVarToFileBtn) */
  anchor.parentNode.insertBefore(btn, anchor);

  btn.addEventListener('click', function () {
    if (!state.currentForVariant)  { alert('Nenhum layout pai selecionado.'); return; }
    if (!state.currentEditVariant) { alert('Nenhuma variante selecionada.');  return; }

    /* ⚠ Nome ORIGINAL: lido do state, não do campo editável */
    var originalName = state.currentEditVariant.name || '';
    var newName      = document.getElementById('editVarName').value.trim().toLowerCase();
    var html         = document.getElementById('editVarHtml').value;
    var css          = document.getElementById('editVarCss').value;
    var parentId     = state.currentForVariant.id;

    if (newName.length < 2) { alert('Preencha o nome da variante primeiro.'); return; }

    var safeHtml   = html.replace(/`/g, '\\`');
    var safeCss    = css.replace(/`/g, '\\`');
    var objectCode =
      '/*@@@@Senko - ' + newName + ' */\n' +
      '  {\n' +
      "    name: '" + newName + "',\n" +
      '    html: `' + safeHtml + '`,\n' +
      '    css: `'  + safeCss  + '`,\n' +
      '  },';

    btn.textContent = 'Salvando…';
    btn.disabled    = true;

    githubSaveVariant(parentId, originalName, objectCode).then(function (result) {
      if (result) {
        /* Atualiza memória com os valores novos */
        ghvUpdateVariantInMemory(parentId, originalName, newName, html, css);

        btn.innerHTML = GH_ICON + ' Salvo!';
        setTimeout(function () {
          if (typeof closeEditVariantModal === 'function') closeEditVariantModal();
          btn.innerHTML = GH_ICON + ' GitHub';
          btn.disabled  = false;
        }, 1200);
      } else {
        btn.innerHTML = GH_ICON + ' GitHub';
        btn.disabled  = false;
      }
    }).catch(function () {
      btn.innerHTML = GH_ICON + ' GitHub';
      btn.disabled  = false;
    });
  });
}


/* ═══════════════════════════════════════════════════════════════════════
   ESTILOS — injetados no <head>
═══════════════════════════════════════════════════════════════════════ */
function ghvInjectStyles() {
  var style = document.createElement('style');
  style.textContent = [
    '#ghvDeleteOverlay {',
    '  position: fixed; inset: 0;',
    '  background: rgba(0,0,0,.55);',
    '  backdrop-filter: blur(3px);',
    '  display: flex; align-items: center; justify-content: center;',
    '  z-index: 9999; padding: 1rem;',
    '}',
    '#ghvDeleteOverlay.ghv-hidden { display: none; }',
    '#ghvDeleteModal {',
    '  background: var(--card, #fff);',
    '  border: 1.5px solid var(--border, #e2e8f0);',
    '  border-radius: calc(var(--radius, 8px) * 1.5);',
    '  padding: 2rem; width: 100%; max-width: 400px;',
    '  display: flex; flex-direction: column; align-items: center;',
    '  gap: 1rem; text-align: center;',
    '  box-shadow: 0 20px 60px rgba(0,0,0,.18);',
    '}',
    '#ghvDeleteIcon {',
    '  width: 60px; height: 60px; border-radius: 50%;',
    '  background: #fee2e2; color: #ef4444;',
    '  display: flex; align-items: center; justify-content: center; flex-shrink: 0;',
    '}',
    '#ghvDeleteTitle {',
    '  font-family: var(--font-body, sans-serif);',
    '  font-size: 1.15rem; font-weight: 800;',
    '  color: var(--text1, #0f172a); margin: 0;',
    '}',
    '#ghvDeleteDesc {',
    '  font-family: var(--font-body, sans-serif);',
    '  font-size: .88rem; color: var(--text2, #64748b);',
    '  line-height: 1.5; margin: 0;',
    '}',
    '#ghvDeleteDesc strong { color: var(--text1, #0f172a); }',
    '#ghvDeleteActions {',
    '  display: flex; gap: .6rem; width: 100%; margin-top: .25rem;',
    '}',
    '#ghvDeleteCancelBtn {',
    '  flex: 1; padding: .6rem 1rem;',
    '  background: var(--bg, #f8fafc); color: var(--text2, #64748b);',
    '  border: 1.5px solid var(--border, #e2e8f0);',
    '  border-radius: var(--radius, 8px);',
    '  font-family: var(--font-body, sans-serif); font-size: .85rem; font-weight: 700;',
    '  cursor: pointer; transition: background .15s, border-color .15s;',
    '}',
    '#ghvDeleteCancelBtn:hover { background: var(--hover, #f1f5f9); border-color: var(--text3, #94a3b8); }',
    '#ghvDeleteConfirmBtn {',
    '  flex: 1; display: inline-flex; align-items: center; justify-content: center; gap: .4rem;',
    '  padding: .6rem 1rem; background: #ef4444; color: #fff;',
    '  border: 1.5px solid #ef4444; border-radius: var(--radius, 8px);',
    '  font-family: var(--font-body, sans-serif); font-size: .85rem; font-weight: 700;',
    '  cursor: pointer; transition: background .15s, border-color .15s;',
    '}',
    '#ghvDeleteConfirmBtn:hover { background: #dc2626; border-color: #dc2626; }',
    '#ghvDeleteConfirmBtn:disabled { opacity: .6; cursor: not-allowed; }',
    '.btn-delete-variant {',
    '  display: inline-flex; align-items: center; gap: .35rem;',
    '  padding: .35rem .7rem;',
    '  background: transparent; color: #ef4444;',
    '  border: 1px solid #fca5a5; border-radius: var(--radius, 6px);',
    '  font-size: .78rem; font-weight: 700;',
    '  font-family: var(--font-body, sans-serif);',
    '  cursor: pointer; height: 30px; white-space: nowrap;',
    '  transition: background .15s, border-color .15s;',
    '}',
    '.btn-delete-variant:hover { background: #fee2e2; border-color: #ef4444; }',
    '.btn-delete-variant:disabled { opacity: .5; cursor: not-allowed; }',
  ].join('\n');

  document.head.appendChild(style);
}


/* ═══════════════════════════════════════════════════════════════════════
   INICIALIZAÇÃO — só ativa no GitHub Pages
═══════════════════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', function () {
  if (!window.location.hostname.match(/^[^.]+\.github\.io$/i)) return;

  ghvInjectStyles();
  ghvCreateDeleteModal();
  ghvInjectNewVariantButton();
  ghvInjectEditVariantButton();
});
