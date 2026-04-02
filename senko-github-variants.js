// @ts-nocheck
/* ═══════════════════════════════════════════════════════════════════════
   senko-github-variants.js — Módulo: criar e deletar variantes no GitHub
   ───────────────────────────────────────────────────────────────────────
   FUNCIONALIDADES:
     - Criar nova variante: salva no arquivo variants/[parentId].js
       Se o arquivo não existir no GitHub, cria do zero.
     - Deletar variante específica: remove o objeto do array no arquivo.
       Se era a última variante, deleta o arquivo inteiro.
     - Validação de nome duplicado antes de salvar.
     - Sincronização com memória (SenkoLib) sem precisar recarregar.

   DEPENDÊNCIAS:
     - senko-github-v2.js carregado antes (usa ghGetToken, ghEnsureToken,
       githubGetFile, githubPutFile, ghSetStatus, GH_ICON, GITHUB_CONFIG,
       ghUpdateLockButton, state, SenkoLib, renderVariantBlocks, renderGrid,
       closeNewVariantModal)

   COMO USAR:
     Adicione no index.html APÓS o senko-github-v2.js:
       <script src="senko-github-variants.js"></script>
═══════════════════════════════════════════════════════════════════════ */


/* ═══════════════════════════════════════════════════════════════════════
   UTILITÁRIO: Parser de objeto de variante
   Encontra o objeto { nome: '...', html: `...`, css: `...` } no arquivo
   usando contagem de profundidade de chaves, ciente de template literals.
   Retorna { start, end } ou null.
═══════════════════════════════════════════════════════════════════════ */
function ghvFindVariantObjectBounds(content, variantNome) {
  var marker    = "nome: '" + variantNome.toLowerCase() + "'";
  var markerAlt = 'nome: "' + variantNome.toLowerCase() + '"';

  /* Busca case-insensitive pelo nome */
  var lowerContent = content.toLowerCase();
  var markerPos    = lowerContent.indexOf(marker);
  if (markerPos === -1) markerPos = lowerContent.indexOf(markerAlt);
  if (markerPos === -1) return null;

  /* Verifica duplicata */
  var secondOccurrence = lowerContent.indexOf(marker, markerPos + marker.length);
  if (secondOccurrence === -1) secondOccurrence = lowerContent.indexOf(markerAlt, markerPos + markerAlt.length);
  if (secondOccurrence !== -1) return { duplicate: true };

  /* Retrocede do marcador até o '{' que abre o objeto desta variante */
  var objOpen = content.lastIndexOf('{', markerPos);
  if (objOpen === -1) return null;

  /* Conta profundidade de chaves, ciente de template literals */
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

    if (ch === '{') { depth++; i++; continue; }

    if (ch === '}') {
      depth--;
      if (depth === 0) {
        var end = i + 1;
        /* Consome vírgula e quebra de linha que seguem o objeto */
        if (content[end] === ',') end++;
        if (content[end] === '\n') end++;
        return { start: objOpen, end: end };
      }
      i++; continue;
    }

    i++;
  }

  return null;
}


/* ═══════════════════════════════════════════════════════════════════════
   UTILITÁRIO: Conta quantos objetos de variante existem no conteúdo
   (conta ocorrências de "nome:" no escopo do array registerVariant)
═══════════════════════════════════════════════════════════════════════ */
function ghvCountVariants(content) {
  var re      = /nome\s*:/gi;
  var matches = content.match(re);
  return matches ? matches.length : 0;
}


/* ═══════════════════════════════════════════════════════════════════════
   UTILITÁRIO: Monta o conteúdo inicial de um arquivo de variantes novo
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
   CORE: Verificar se arquivo de variantes existe no GitHub
   Retorna { exists, sha, content } ou { exists: false }
═══════════════════════════════════════════════════════════════════════ */
function ghvGetVariantFile(parentId) {
  var filePath = 'variants/' + parentId.toLowerCase() + '.js';
  return githubGetFile(filePath).then(function (data) {
    return { exists: true, sha: data.sha, content: data.content, path: filePath };
  }).catch(function (err) {
    /* 404 = arquivo ainda não existe — tudo bem */
    if (err.message && err.message.indexOf('404') !== -1) {
      return { exists: false, path: filePath };
    }
    throw err;
  });
}


/* ═══════════════════════════════════════════════════════════════════════
   CORE: Criar ou adicionar variante no GitHub
═══════════════════════════════════════════════════════════════════════ */
function githubCreateVariant(parentId, variantNome, objectCode) {
  if (!ghLockSave()) return Promise.resolve(false);
  if (!ghEnsureToken()) {
    ghUnlockSave();
    ghSetStatus('Token não configurado', 'error');
    return Promise.resolve(false);
  }

  /* Valida parentId — não pode ter espaços ou caracteres inválidos para nome de arquivo */
  if (!/^[a-z0-9-]+$/.test(parentId.toLowerCase())) {
    ghUnlockSave();
    ghSetStatus('ID inválido', 'error');
    alert(
      'O ID do layout pai ("' + parentId + '") contém caracteres inválidos.\n\n' +
      'IDs devem usar apenas letras minúsculas, números e hífen.\n' +
      'Ex: "section-58" é válido, "section 58" não é.'
    );
    return Promise.resolve(false);
  }

  var nomeLower = variantNome.toLowerCase();
  ghSetStatus('Verificando arquivo de variantes…', 'saving');

  return ghvGetVariantFile(parentId).then(function (fileInfo) {

    /* ── Arquivo já existe: verifica duplicata e insere ── */
    if (fileInfo.exists) {
      var content    = fileInfo.content;
      var sha        = fileInfo.sha;
      var markerCheck = "nome: '" + nomeLower + "'";

      if (content.toLowerCase().indexOf(markerCheck) !== -1) {
        ghSetStatus('Nome duplicado', 'error');
        ghUnlockSave();
        alert('Já existe uma variante com o nome "' + variantNome + '" em ' + fileInfo.path + '.\nEscolha outro nome.');
        return false;
      }

      /* Insere antes do ]); final */
      var closePos = content.lastIndexOf(']);');
      if (closePos === -1) {
        ghSetStatus('Estrutura inválida', 'error');
        ghUnlockSave();
        alert('Não foi possível encontrar o fechamento do array em ' + fileInfo.path + '.\nVerifique se o arquivo segue o padrão SenkoLib.registerVariant([...]);');
        return false;
      }

      var newContent =
        content.slice(0, closePos) +
        objectCode + ',\n' +
        content.slice(closePos);

      ghSetStatus('Salvando no GitHub…', 'saving');

      return githubPutFile(
        fileInfo.path,
        newContent,
        sha,
        '[SenkoLib] add variant: ' + nomeLower + ' (' + parentId + ')'
      ).then(function () {
        /* Atualiza memória */
        var html = document.getElementById('newVarHtml') ? document.getElementById('newVarHtml').value : '';
        var css  = document.getElementById('newVarCss')  ? document.getElementById('newVarCss').value  : '';
        SenkoLib.registerVariant(parentId, [{ nome: variantNome, html: html, css: css }]);
        ghSetStatus('✓ Variante salva em ' + fileInfo.path, 'ok');
        ghUnlockSave();
        return fileInfo.path;
      }).catch(function (e) {
        ghSetStatus('Erro ao salvar: ' + e.message, 'error');
        ghUnlockSave();
        throw e; /* repassa para o .catch externo mostrar o alert */
      });
    }

    /* ── Arquivo não existe: cria do zero ── */
    var newFileContent = ghvBuildNewVariantFile(parentId, objectCode);
    var newFilePath    = 'variants/' + parentId.toLowerCase() + '.js';

    ghSetStatus('Criando arquivo de variantes…', 'saving');

    return githubPutFile(
      newFilePath,
      newFileContent,
      null,
      '[SenkoLib] create variants file: ' + parentId
    ).then(function () {
      var html = document.getElementById('newVarHtml') ? document.getElementById('newVarHtml').value : '';
      var css  = document.getElementById('newVarCss')  ? document.getElementById('newVarCss').value  : '';
      SenkoLib.registerVariant(parentId, [{ nome: variantNome, html: html, css: css }]);
      ghSetStatus('✓ Arquivo criado: ' + newFilePath, 'ok');
      ghUnlockSave();
      return newFilePath;
    }).catch(function (e) {
      ghSetStatus('Erro ao criar arquivo: ' + e.message, 'error');
      ghUnlockSave();
      throw e; /* repassa para o .catch externo mostrar o alert */
    });

  }).catch(function (e) {
    console.error('[senko-github-variants] Erro ao criar variante:', e);
    ghSetStatus('Erro: ' + e.message, 'error');
    /* ghUnlockSave() já foi chamado nos .catch internos,
       mas chamamos de novo por segurança (é idempotente) */
    ghUnlockSave();
    alert('Erro ao salvar variante no GitHub:\n' + e.message);
    return false;
  });
}


/* ═══════════════════════════════════════════════════════════════════════
   CORE: Deletar variante específica do GitHub
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
        method: 'DELETE',
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

    /* Limpa linha em branco dupla que possa sobrar */
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
   UTILITÁRIO: Remove variante da memória do SenkoLib
═══════════════════════════════════════════════════════════════════════ */
function ghvRemoveVariantFromMemory(parentId, variantNome) {
  var variants = SenkoLib.getVariants(parentId);
  var nomeLower = variantNome.toLowerCase();
  for (var i = 0; i < variants.length; i++) {
    var n = (variants[i].nome || variants[i].name || '').toLowerCase();
    if (n === nomeLower) {
      variants.splice(i, 1);
      break;
    }
  }
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

  /* Substitui o botão para limpar listeners anteriores */
  var newConfirmBtn = confirmBtn.cloneNode(true);
  confirmBtn.parentNode.replaceChild(newConfirmBtn, confirmBtn);

  newConfirmBtn.addEventListener('click', function () {
    ghvCloseDeleteModal();

    setTimeout(function () {
      githubDeleteVariant(parentId, variantNome).then(function (result) {
        if (result && state.currentForVariant) {
          var updated = SenkoLib.getVariants(parentId);
          if (typeof renderVariantBlocks === 'function') renderVariantBlocks(updated);
          var countEl = document.getElementById('variantsCount');
          if (countEl) countEl.textContent = updated.length + (updated.length === 1 ? ' variação' : ' variações');
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
   ESTILOS — injetados no <head>
═══════════════════════════════════════════════════════════════════════ */
function ghvInjectStyles() {
  var style = document.createElement('style');
  style.textContent = [
    /* Overlay do modal de exclusão */
    '#ghvDeleteOverlay {',
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
    '#ghvDeleteOverlay.ghv-hidden { display: none; }',

    /* Modal box */
    '#ghvDeleteModal {',
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
    '#ghvDeleteIcon {',
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
    '#ghvDeleteTitle {',
    '  font-family: var(--font-body, sans-serif);',
    '  font-size: 1.15rem;',
    '  font-weight: 800;',
    '  color: var(--text1, #0f172a);',
    '  margin: 0;',
    '}',

    /* Descrição */
    '#ghvDeleteDesc {',
    '  font-family: var(--font-body, sans-serif);',
    '  font-size: .88rem;',
    '  color: var(--text2, #64748b);',
    '  line-height: 1.5;',
    '  margin: 0;',
    '}',
    '#ghvDeleteDesc strong { color: var(--text1, #0f172a); }',

    /* Botões */
    '#ghvDeleteActions {',
    '  display: flex;',
    '  gap: .6rem;',
    '  width: 100%;',
    '  margin-top: .25rem;',
    '}',
    '#ghvDeleteCancelBtn {',
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
    '#ghvDeleteCancelBtn:hover { background: var(--hover, #f1f5f9); border-color: var(--text3, #94a3b8); }',
    '#ghvDeleteConfirmBtn {',
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
    '#ghvDeleteConfirmBtn:hover { background: #dc2626; border-color: #dc2626; }',
    '#ghvDeleteConfirmBtn:disabled { opacity: .6; cursor: not-allowed; }',

    /* Botão excluir variante — nos cards de variante */
    '.btn-delete-variant {',
    '  display: inline-flex;',
    '  align-items: center;',
    '  gap: .35rem;',
    '  padding: .35rem .7rem;',
    '  background: transparent;',
    '  color: #ef4444;',
    '  border: 1px solid #fca5a5;',
    '  border-radius: var(--radius, 6px);',
    '  font-size: .78rem;',
    '  font-weight: 700;',
    '  font-family: var(--font-body, sans-serif);',
    '  cursor: pointer;',
    '  height: 30px;',
    '  white-space: nowrap;',
    '  transition: background .15s, border-color .15s;',
    '}',
    '.btn-delete-variant:hover { background: #fee2e2; border-color: #ef4444; }',
    '.btn-delete-variant:disabled { opacity: .5; cursor: not-allowed; }',

    /* Botão salvar variante no GitHub — no modal nova variante */
    '#ghvSaveVariantBtn {',
    '  display: inline-flex;',
    '  align-items: center;',
    '  gap: .4rem;',
    '  padding: .45rem .85rem;',
    '  background: #21262d;',
    '  color: #c9d1d9;',
    '  border: 1px solid #30363d;',
    '  border-radius: var(--radius, 6px);',
    '  font-size: .8rem;',
    '  font-weight: 700;',
    '  font-family: var(--font-body, sans-serif);',
    '  cursor: pointer;',
    '  height: 34px;',
    '  transition: background .15s, border-color .15s;',
    '}',
    '#ghvSaveVariantBtn:hover { background: #30363d; border-color: #8b949e; }',
    '#ghvSaveVariantBtn:disabled { opacity: .6; cursor: not-allowed; }',
  ].join('\n');

  document.head.appendChild(style);
}


/* ═══════════════════════════════════════════════════════════════════════
   UI — Injeta botão "GitHub" no modal de Nova Variante
   Substitui / complementa o botão que o senko-github-v2 já injeta,
   usando a nova lógica de criação (com suporte a arquivo inexistente).
═══════════════════════════════════════════════════════════════════════ */
function ghvInjectNewVariantButton() {
  /* Evita duplicata — tanto deste módulo quanto do senko-github-v2 */
  if (document.getElementById('ghvSaveVariantBtn')) return;
  if (document.getElementById('ghSaveVariantBtn')) return;

  var anchor = document.getElementById('newVarCopyBtn');
  if (!anchor) return;

  var btn       = document.createElement('button');
  btn.id        = 'ghvSaveVariantBtn';
  btn.innerHTML = GH_ICON + ' GitHub';
  btn.title     = 'Criar variante diretamente no repositório GitHub';

  /* Insere após o botão "Copiar objeto" */
  anchor.parentNode.insertBefore(btn, anchor.nextSibling);

  btn.addEventListener('click', function () {
    var nomeRaw  = document.getElementById('newVarName')  ? document.getElementById('newVarName').value.trim()  : '';
    var html     = document.getElementById('newVarHtml')  ? document.getElementById('newVarHtml').value          : '';
    var css      = document.getElementById('newVarCss')   ? document.getElementById('newVarCss').value           : '';

    if (nomeRaw.length < 2) {
      alert('Preencha o nome da variante primeiro.');
      return;
    }
    if (!state.currentForVariant) {
      alert('Nenhum layout pai selecionado.');
      return;
    }

    var nomeLower = nomeRaw.toLowerCase();
    var parentId  = state.currentForVariant.id;
    var safeHtml  = html.replace(/`/g, '\\`');
    var safeCss   = css.replace(/`/g, '\\`');

    var objectCode =
      "  { nome: '" + nomeLower + "',\n" +
      '    html: `' + safeHtml + '`,\n' +
      '    css: `'  + safeCss  + '` }';

    btn.textContent = 'Salvando…';
    btn.disabled    = true;

    githubCreateVariant(parentId, nomeLower, objectCode).then(function (result) {
      if (result) {
        btn.innerHTML = GH_ICON + ' Salvo!';

        /* Atualiza UI do modal de variantes */
        setTimeout(function () {
          if (typeof closeNewVariantModal === 'function') closeNewVariantModal();

          if (state.currentForVariant) {
            var updated = SenkoLib.getVariants(state.currentForVariant.id);
            if (typeof renderVariantBlocks === 'function') renderVariantBlocks(updated);
            var countEl = document.getElementById('variantsCount');
            if (countEl) countEl.textContent = updated.length + (updated.length === 1 ? ' variação' : ' variações');
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
   UI — Injeta botão "Excluir" em cada card de variante renderizado
   Chamado sempre que renderVariantBlocks() é executado.

   ESTRATÉGIA: sobrescreve renderVariantBlocks com uma versão que,
   após renderizar os cards, injeta os botões de deletar.
═══════════════════════════════════════════════════════════════════════ */
function ghvPatchRenderVariantBlocks() {
  if (typeof renderVariantBlocks !== 'function') return;
  if (renderVariantBlocks._ghvPatched) return;

  var _original = renderVariantBlocks;

  renderVariantBlocks = function (variants) {
    _original(variants);
    ghvInjectDeleteButtonsInVariantCards();
  };

  renderVariantBlocks._ghvPatched = true;
}

function ghvInjectDeleteButtonsInVariantCards() {
  /* Cada card de variante tem um elemento com data-variant-nome */
  var cards = document.querySelectorAll('.variant-block, .variant-card, [data-variant-nome]');

  cards.forEach(function (card) {
    if (card.querySelector('.btn-delete-variant')) return; /* já tem botão */

    var nome     = card.dataset.variantNome || card.dataset.nome;
    var parentId = state.currentForVariant ? state.currentForVariant.id : null;

    if (!nome || !parentId) return;

    var deleteBtn       = document.createElement('button');
    deleteBtn.className = 'btn-delete-variant';
    deleteBtn.innerHTML = GHV_TRASH_ICON + ' Excluir';
    deleteBtn.title     = 'Excluir esta variante do GitHub';

    deleteBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      if (!ghEnsureToken()) return;
      ghvOpenDeleteModal(parentId, nome);
    });

    /* Insere no final do card */
    card.appendChild(deleteBtn);
  });
}


/* ═══════════════════════════════════════════════════════════════════════
   INICIALIZAÇÃO
═══════════════════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', function () {
  if (!window.location.hostname.match(/^[^.]+\.github\.io$/i)) return;
  ghvInjectStyles();
  ghvCreateDeleteModal();
  ghvInjectNewVariantButton();

  /* Patch no renderVariantBlocks após um tick para garantir que
     o script.js já definiu a função */
  setTimeout(ghvPatchRenderVariantBlocks, 0);
});
