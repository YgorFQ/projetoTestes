// @ts-nocheck
/* ═══════════════════════════════════════════════════════════════════════
   senko-github-colecoes.js — Módulo GitHub para Coleções Pessoais

   RESPONSABILIDADE:
     Toda operação de coleções via GitHub API:
       — Salvar novo layout de coleção      (ghcSaveNewLayout)
       — Editar layout de coleção existente (ghcSaveLayout)
       — Excluir layout de coleção          (ghcDeleteLayout)
       — Criar variante de coleção          (ghcCreateVariant)
       — Editar variante de coleção         (ghcSaveVariant)
       — Excluir variante de coleção        (ghcDeleteVariant)
     Injeta botões "GitHub" nos modais de coleção.
     Modal de confirmação de exclusão próprio.

   ESTRUTURA DE ARQUIVOS NO REPOSITÓRIO:
     colecoes/
       [authorTag].js              → SenkoLib.registerCollection([...])
       variants/
         [authorTag]-[id].js       → SenkoLib.registerCollectionVariant(id, [...])

   DEPENDÊNCIAS (devem ser carregadas antes):
     - senko-github-v2.js   (ghGetToken, ghEnsureToken, ghLockSave,
                             ghUnlockSave, ghSetStatus, githubGetFile,
                             githubPutFile, githubListDir, ghEncodeBase64,
                             ghDecodeBase64, ghShowErrorModal, GH_ICON,
                             GITHUB_CONFIG, ghStartDeployWatch)
     - core/script.js       (state, SenkoLib, colRenderGrid,
                             colCloseAddModal, renderGrid)

   ORDEM DE CARREGAMENTO no index.html:
     <script src="modules/github/senko-github-v2.js"></script>
     <script src="modules/github/senko-github-variants.js"></script>
     <script src="modules/github/senko-github-delete.js"></script>
     <script src="modules/github/senko-github-colecoes.js"></script>
═══════════════════════════════════════════════════════════════════════ */


/* ═══════════════════════════════════════════════════════════════════════
   CONSTANTES
═══════════════════════════════════════════════════════════════════════ */

var GHC_DIR          = 'colecoes';
var GHC_VARIANTS_DIR = 'colecoes/variants';


/* ═══════════════════════════════════════════════════════════════════════
   UTILITÁRIOS
═══════════════════════════════════════════════════════════════════════ */

/* Gera ID do layout a partir do authorTag + nome */
function ghcBuildId(authorTag, name) {
  return (authorTag + '-' + name)
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

/* Caminho do arquivo de coleção de um autor */
function ghcFilePath(authorTag) {
  return GHC_DIR + '/' + authorTag.toLowerCase() + '.js';
}

/* Caminho do arquivo de variantes de uma coleção */
function ghcVariantFilePath(layoutId) {
  return GHC_VARIANTS_DIR + '/' + layoutId.toLowerCase() + '.js';
}

/* Lê o arquivo de coleção do GitHub. Retorna { exists, sha, content, path } */
function ghcGetCollectionFile(authorTag) {
  var filePath = ghcFilePath(authorTag);
  return githubGetFile(filePath).then(function (data) {
    return { exists: true, sha: data.sha, content: data.content, path: filePath };
  }).catch(function (err) {
    if (err.message && err.message.indexOf('404') !== -1) {
      return { exists: false, path: filePath };
    }
    throw err;
  });
}

/* Monta conteúdo inicial de um arquivo de coleção novo */
function ghcBuildNewCollectionFile(objectCode) {
  return (
    '// @ts-nocheck\n' +
    'SenkoLib.registerCollection([\n' +
    objectCode + '\n' +
    ']);\n'
  );
}

/* Monta conteúdo inicial de um arquivo de variantes de coleção novo */
function ghcBuildNewVariantFile(layoutId, objectCode) {
  return (
    '// @ts-nocheck\n' +
    "SenkoLib.registerCollectionVariant('" + layoutId.toLowerCase() + "', [\n" +
    objectCode + '\n' +
    ']);\n'
  );
}

/* Localiza bounds de um objeto pelo marcador @@@@Senko */
function ghcFindObjectBounds(content, id) {
  var marker    = '/*@@@@Senko - ' + id.toLowerCase() + ' */';
  var markerPos = content.indexOf(marker);
  if (markerPos === -1) return { error: 'no_marker' };

  var objOpen = content.indexOf('{', markerPos + marker.length);
  if (objOpen === -1) return null;

  var i = objOpen, depth = 0, inTemplate = false, len = content.length;

  while (i < len) {
    var ch = content[i];
    if (ch === '`') {
      var bs = 0, j = i - 1;
      while (j >= 0 && content[j] === '\\') { bs++; j--; }
      if (bs % 2 === 0) inTemplate = !inTemplate;
      i++; continue;
    }
    if (inTemplate) { i++; continue; }
    if (ch === '{') { depth++; i++; continue; }
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

/* Conta objetos no arquivo via marcadores */
function ghcCountObjects(content) {
  var re = /\/\*@@@@Senko - /g;
  var m  = content.match(re);
  return m ? m.length : 0;
}


/* ═══════════════════════════════════════════════════════════════════════
   CORE: Salvar novo layout de coleção
   Se o arquivo colecoes/[authorTag].js não existir, cria do zero.
   Também registra o <script> no index.html se for arquivo novo.
═══════════════════════════════════════════════════════════════════════ */
function ghcSaveNewLayout(authorTag, objectCode, layoutId) {
  if (!ghLockSave()) return Promise.resolve(false);
  if (!ghEnsureToken()) {
    ghUnlockSave();
    ghSetStatus('Token não configurado', 'error');
    return Promise.resolve(false);
  }

  ghSetStatus('Verificando arquivo de coleção…', 'saving');

  return ghcGetCollectionFile(authorTag).then(function (fileInfo) {

    /* ── Arquivo já existe ── */
    if (fileInfo.exists) {
      var marker = '/*@@@@Senko - ' + layoutId.toLowerCase() + ' */';
      if (fileInfo.content.indexOf(marker) !== -1) {
        ghSetStatus('ID já existe', 'error');
        ghUnlockSave();
        ghShowErrorModal('O ID "' + layoutId + '" já existe em ' + fileInfo.path + '.');
        return false;
      }

      var closePos = fileInfo.content.lastIndexOf(']);');
      if (closePos === -1) {
        ghSetStatus('Estrutura inválida', 'error');
        ghUnlockSave();
        ghShowErrorModal('Estrutura inválida em ' + fileInfo.path + '. Esperado SenkoLib.registerCollection([...]);');
        return false;
      }

      var newContent =
        fileInfo.content.slice(0, closePos) +
        '\n' + objectCode + '\n\n' +
        fileInfo.content.slice(closePos);

      ghSetStatus('Salvando no GitHub…', 'saving');

      return githubPutFile(
        fileInfo.path, newContent, fileInfo.sha,
        '[SenkoLib] add collection layout: ' + layoutId
      ).then(function () {
        ghcRegisterInMemory(objectCode, layoutId);
        ghSetStatus('✓ Salvo em ' + fileInfo.path, 'ok');
        ghUnlockSave();
        ghStartDeployWatch(fileInfo.path);
        return fileInfo.path;
      });
    }

    /* ── Arquivo não existe: cria do zero ── */
    var newFileContent = ghcBuildNewCollectionFile(objectCode);

    ghSetStatus('Criando arquivo de coleção…', 'saving');

    return githubPutFile(
      fileInfo.path, newFileContent, null,
      '[SenkoLib] create collection file: ' + authorTag
    ).then(function () {
      /* Registra o <script> no index.html */
      ghSetStatus('Atualizando index.html…', 'saving');
      return githubGetFile('index.html').then(function (indexData) {
        var scriptTag = fileInfo.path;
        if (indexData.content.indexOf(scriptTag) !== -1) return;
        /* Insere antes do fechamento do bloco de coleções */
        var anchor = '  <!-- <script src="colecoes/ygor.js"></script> -->';
        var tag    = '  <script src="' + scriptTag + '"></script>\n';
        var newIndex = indexData.content.indexOf(anchor) !== -1
          ? indexData.content.replace(anchor, tag + anchor)
          : indexData.content; /* fallback: não quebra se anchor mudou */
        if (newIndex === indexData.content) return; /* nada a fazer */
        return githubPutFile(
          'index.html', newIndex, indexData.sha,
          '[SenkoLib] register collection script: ' + authorTag
        );
      });
    }).then(function () {
      ghcRegisterInMemory(objectCode, layoutId);
      ghSetStatus('✓ Arquivo criado: ' + fileInfo.path, 'ok');
      ghUnlockSave();
      ghStartDeployWatch(fileInfo.path);
      return fileInfo.path;
    });

  }).catch(function (e) {
    console.error('[senko-github-colecoes] Erro ao salvar layout:', e);
    ghSetStatus('Erro: ' + e.message, 'error');
    ghUnlockSave();
    ghShowErrorModal(e.message);
    return false;
  });
}

/* Lê os campos do modal e registra em memória após save bem-sucedido */
function ghcRegisterInMemory(objectCode, layoutId) {
  var html      = (document.getElementById('colAddHtml')      || {}).value || '';
  var css       = (document.getElementById('colAddCss')       || {}).value || '';
  var name      = (document.getElementById('colAddName')      || {}).value || '';
  var tagsRaw   = (document.getElementById('colAddTags')      || {}).value || '';
  var author    = (document.getElementById('colAddAuthor')    || {}).value || '';
  var authorTag = (document.getElementById('colAddAuthorTag') || {}).value || '';
  var tags = tagsRaw.split(',').map(function (t) { return t.trim(); }).filter(Boolean);
  SenkoLib.registerCollection([{
    id: layoutId, name: name.trim(), tags: tags,
    html: html, css: css,
    author: author.trim(), authorTag: authorTag.trim().toLowerCase()
  }]);
}


/* ═══════════════════════════════════════════════════════════════════════
   CORE: Editar layout de coleção existente
═══════════════════════════════════════════════════════════════════════ */
function ghcSaveLayout(layoutId, authorTag, objectCode) {
  if (!ghLockSave()) return Promise.resolve(false);
  if (!ghEnsureToken()) {
    ghUnlockSave();
    ghSetStatus('Token não configurado', 'error');
    return Promise.resolve(false);
  }

  var filePath = ghcFilePath(authorTag);
  ghSetStatus('Lendo arquivo de coleção…', 'saving');

  return githubGetFile(filePath).then(function (data) {
    var bounds = ghcFindObjectBounds(data.content, layoutId);

    if (!bounds || bounds.error === 'no_marker') {
      ghSetStatus('Marcador não encontrado', 'error');
      ghUnlockSave();
      ghShowErrorModal('Marcador não encontrado para "' + layoutId + '" em ' + filePath + '.');
      return false;
    }

    var newContent =
      data.content.slice(0, bounds.start) +
      objectCode + '\n' +
      data.content.slice(bounds.end);

    ghSetStatus('Salvando no GitHub…', 'saving');

    return githubPutFile(
      filePath, newContent, data.sha,
      '[SenkoLib] edit collection layout: ' + layoutId
    ).then(function () {
      /* Atualiza em memória */
      var collections = SenkoLib.getCollections();
      for (var i = 0; i < collections.length; i++) {
        if (collections[i].id === layoutId) {
          var editName = document.getElementById('editName');
          var editTags = document.getElementById('editTags');
          var editHtml = document.getElementById('editHtml');
          var editCss  = document.getElementById('editCss');
          if (editName) collections[i].name = editName.value.trim();
          if (editTags) collections[i].tags = editTags.value.split(',').map(function (t) { return t.trim(); }).filter(Boolean);
          if (editHtml) collections[i].html = editHtml.value;
          if (editCss)  collections[i].css  = editCss.value;
          break;
        }
      }
      ghSetStatus('✓ Salvo em ' + filePath, 'ok');
      ghUnlockSave();
      ghStartDeployWatch(filePath);
      return filePath;
    });

  }).catch(function (e) {
    console.error('[senko-github-colecoes] Erro ao editar layout:', e);
    ghSetStatus('Erro: ' + e.message, 'error');
    ghUnlockSave();
    ghShowErrorModal(e.message);
    return false;
  });
}


/* ═══════════════════════════════════════════════════════════════════════
   CORE: Excluir layout de coleção
   Se era o único layout do arquivo, exclui o arquivo inteiro.
═══════════════════════════════════════════════════════════════════════ */
function ghcDeleteLayout(layoutId, authorTag) {
  if (!ghLockSave()) return Promise.resolve(false);
  if (!ghEnsureToken()) {
    ghUnlockSave();
    ghSetStatus('Token não configurado', 'error');
    return Promise.resolve(false);
  }

  var filePath = ghcFilePath(authorTag);
  ghSetStatus('Buscando layout…', 'saving');

  return githubGetFile(filePath).then(function (data) {
    var bounds = ghcFindObjectBounds(data.content, layoutId);

    if (!bounds || bounds.error === 'no_marker') {
      ghSetStatus('Marcador não encontrado', 'error');
      ghUnlockSave();
      ghShowErrorModal('Marcador "' + layoutId + '" não encontrado em ' + filePath + '.');
      return false;
    }

    var remaining = ghcCountObjects(data.content);

    /* ── Era o único layout: exclui o arquivo ── */
    if (remaining <= 1) {
      ghSetStatus('Removendo arquivo de coleção…', 'saving');
      var token = ghGetToken();
      var url   = 'https://api.github.com/repos/'
        + GITHUB_CONFIG.OWNER + '/' + GITHUB_CONFIG.REPO + '/contents/' + filePath;

      return fetch(url, {
        method: 'DELETE',
        headers: {
          'Authorization': 'token ' + token,
          'Accept': 'application/vnd.github+json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: '[SenkoLib] delete collection file: ' + authorTag,
          sha: data.sha,
          branch: GITHUB_CONFIG.BRANCH
        })
      }).then(function (res) {
        if (!res.ok) return res.json().then(function (e) {
          throw new Error('GitHub DELETE falhou (' + res.status + '): ' + (e.message || filePath));
        });
        return true;
      }).then(function () {
        ghcRemoveFromMemory(layoutId);
        ghSetStatus('✓ Arquivo de coleção removido: ' + filePath, 'ok');
        ghUnlockSave();
        ghStartDeployWatch('index.html');
        return true;
      });
    }

    /* ── Ainda há outros layouts: remove só o objeto ── */
    var newContent =
      data.content.slice(0, bounds.start) +
      data.content.slice(bounds.end);
    newContent = newContent.replace(/\n\n\n/g, '\n\n');

    ghSetStatus('Salvando no GitHub…', 'saving');

    return githubPutFile(
      filePath, newContent, data.sha,
      '[SenkoLib] delete collection layout: ' + layoutId
    ).then(function () {
      ghcRemoveFromMemory(layoutId);
      ghSetStatus('✓ Layout de coleção excluído: ' + layoutId, 'ok');
      ghUnlockSave();
      ghStartDeployWatch(filePath);
      return true;
    });

  }).catch(function (e) {
    console.error('[senko-github-colecoes] Erro ao excluir layout:', e);
    ghSetStatus('Erro: ' + e.message, 'error');
    ghUnlockSave();
    ghShowErrorModal(e.message);
    return false;
  });
}

function ghcRemoveFromMemory(layoutId) {
  var cols = SenkoLib.getCollections();
  for (var i = 0; i < cols.length; i++) {
    if (cols[i].id === layoutId) { cols.splice(i, 1); return; }
  }
}


/* ═══════════════════════════════════════════════════════════════════════
   CORE: Criar variante de coleção
═══════════════════════════════════════════════════════════════════════ */
function ghcCreateVariant(layoutId, variantName, objectCode) {
  if (!ghLockSave()) return Promise.resolve(false);
  if (!ghEnsureToken()) {
    ghUnlockSave();
    ghSetStatus('Token não configurado', 'error');
    return Promise.resolve(false);
  }

  var filePath  = ghcVariantFilePath(layoutId);
  var nameLower = variantName.toLowerCase();
  ghSetStatus('Verificando arquivo de variantes…', 'saving');

  return githubGetFile(filePath).then(function (data) {
    /* Arquivo existe */
    var marker = '/*@@@@Senko - ' + nameLower + ' */';
    if (data.content.indexOf(marker) !== -1) {
      ghSetStatus('Variante duplicada', 'error');
      ghUnlockSave();
      ghShowErrorModal('Já existe uma variante "' + variantName + '" em ' + filePath + '.');
      return false;
    }
    var closePos = data.content.lastIndexOf(']);');
    if (closePos === -1) {
      ghSetStatus('Estrutura inválida', 'error');
      ghUnlockSave();
      ghShowErrorModal('Estrutura inválida em ' + filePath + '.');
      return false;
    }
    var newContent =
      data.content.slice(0, closePos) +
      objectCode + '\n' +
      data.content.slice(closePos);

    return githubPutFile(
      filePath, newContent, data.sha,
      '[SenkoLib] add collection variant: ' + nameLower + ' (' + layoutId + ')'
    );
  }).catch(function (err) {
    /* Arquivo não existe: cria do zero */
    if (err.message && err.message.indexOf('404') !== -1) {
      var newFileContent = ghcBuildNewVariantFile(layoutId, objectCode);
      return githubPutFile(
        filePath, newFileContent, null,
        '[SenkoLib] create collection variants file: ' + layoutId
      );
    }
    throw err;
  }).then(function (result) {
    if (!result && result !== undefined) return false;
    var html = (document.getElementById('newVarHtml') || {}).value || '';
    var css  = (document.getElementById('newVarCss')  || {}).value || '';
    SenkoLib.registerCollectionVariant(layoutId, [{ name: variantName, html: html, css: css }]);
    ghSetStatus('✓ Variante de coleção salva: ' + filePath, 'ok');
    ghUnlockSave();
    ghStartDeployWatch(filePath);
    return filePath;
  }).catch(function (e) {
    console.error('[senko-github-colecoes] Erro ao criar variante:', e);
    ghSetStatus('Erro: ' + e.message, 'error');
    ghUnlockSave();
    ghShowErrorModal(e.message);
    return false;
  });
}


/* ═══════════════════════════════════════════════════════════════════════
   CORE: Editar variante de coleção
═══════════════════════════════════════════════════════════════════════ */
function ghcSaveVariant(layoutId, originalName, objectCode) {
  if (!ghLockSave()) return Promise.resolve(false);
  if (!ghEnsureToken()) {
    ghUnlockSave();
    ghSetStatus('Token não configurado', 'error');
    return Promise.resolve(false);
  }

  var filePath = ghcVariantFilePath(layoutId);
  ghSetStatus('Lendo variantes de coleção…', 'saving');

  return githubGetFile(filePath).then(function (data) {
    var bounds = ghcFindObjectBounds(data.content, originalName);

    if (!bounds || bounds.error === 'no_marker') {
      ghSetStatus('Variante não encontrada', 'error');
      ghUnlockSave();
      ghShowErrorModal('Variante "' + originalName + '" não encontrada em ' + filePath + '.');
      return false;
    }

    var newContent =
      data.content.slice(0, bounds.start) +
      objectCode + '\n' +
      data.content.slice(bounds.end);

    return githubPutFile(
      filePath, newContent, data.sha,
      '[SenkoLib] edit collection variant: ' + originalName + ' (' + layoutId + ')'
    ).then(function () {
      ghSetStatus('✓ Variante de coleção salva: ' + filePath, 'ok');
      ghUnlockSave();
      ghStartDeployWatch(filePath);
      return filePath;
    });

  }).catch(function (e) {
    console.error('[senko-github-colecoes] Erro ao editar variante:', e);
    ghSetStatus('Erro: ' + e.message, 'error');
    ghUnlockSave();
    ghShowErrorModal(e.message);
    return false;
  });
}


/* ═══════════════════════════════════════════════════════════════════════
   CORE: Excluir variante de coleção
═══════════════════════════════════════════════════════════════════════ */
function ghcDeleteVariant(layoutId, variantName) {
  if (!ghEnsureToken()) {
    ghSetStatus('Token não configurado', 'error');
    return Promise.resolve(false);
  }

  var filePath = ghcVariantFilePath(layoutId);
  ghSetStatus('Buscando variante de coleção…', 'saving');

  return githubGetFile(filePath).then(function (data) {
    var bounds    = ghcFindObjectBounds(data.content, variantName);
    var remaining = ghcCountObjects(data.content);

    if (!bounds || bounds.error === 'no_marker') {
      ghSetStatus('Variante não encontrada', 'error');
      ghShowErrorModal('Variante "' + variantName + '" não encontrada em ' + filePath + '.');
      return false;
    }

    /* Era a única: exclui o arquivo */
    if (remaining <= 1) {
      var token = ghGetToken();
      var url   = 'https://api.github.com/repos/'
        + GITHUB_CONFIG.OWNER + '/' + GITHUB_CONFIG.REPO + '/contents/' + filePath;
      return fetch(url, {
        method: 'DELETE',
        headers: {
          'Authorization': 'token ' + token,
          'Accept': 'application/vnd.github+json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: '[SenkoLib] delete collection variants file: ' + layoutId,
          sha: data.sha,
          branch: GITHUB_CONFIG.BRANCH
        })
      }).then(function (res) {
        if (!res.ok) return res.json().then(function (e) {
          throw new Error('GitHub DELETE falhou (' + res.status + ')');
        });
        return true;
      }).then(function () {
        ghcRemoveVariantFromMemory(layoutId, variantName);
        ghSetStatus('✓ Arquivo de variantes de coleção removido', 'ok');
        ghStartDeployWatch('index.html');
        return true;
      });
    }

    /* Remove só o objeto */
    var newContent =
      data.content.slice(0, bounds.start) +
      data.content.slice(bounds.end);
    newContent = newContent.replace(/\n\n\n/g, '\n\n');

    return githubPutFile(
      filePath, newContent, data.sha,
      '[SenkoLib] delete collection variant: ' + variantName + ' (' + layoutId + ')'
    ).then(function () {
      ghcRemoveVariantFromMemory(layoutId, variantName);
      ghSetStatus('✓ Variante de coleção excluída: ' + variantName, 'ok');
      ghStartDeployWatch(filePath);
      return true;
    });

  }).catch(function (e) {
    console.error('[senko-github-colecoes] Erro ao excluir variante:', e);
    ghSetStatus('Erro: ' + e.message, 'error');
    ghShowErrorModal(e.message);
    return false;
  });
}

function ghcRemoveVariantFromMemory(layoutId, variantName) {
  var variants  = SenkoLib.getCollectionVariants(layoutId);
  var nameLower = variantName.toLowerCase();
  for (var i = 0; i < variants.length; i++) {
    if ((variants[i].name || '').toLowerCase() === nameLower) {
      variants.splice(i, 1);
      return;
    }
  }
}


/* ═══════════════════════════════════════════════════════════════════════
   UI — Modal de confirmação de exclusão de layout de coleção
═══════════════════════════════════════════════════════════════════════ */
function ghcCreateDeleteModal() {
  if (document.getElementById('ghcDeleteOverlay')) return;

  var overlay = document.createElement('div');
  overlay.id        = 'ghcDeleteOverlay';
  overlay.className = 'gh-hidden';

  var modal = document.createElement('div');
  modal.id = 'ghcDeleteModal';

  var icon = document.createElement('div');
  icon.id = 'ghcDeleteIcon';
  icon.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="32" height="32"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/></svg>';

  var title = document.createElement('h3');
  title.id          = 'ghcDeleteTitle';
  title.textContent = 'Excluir layout da coleção?';

  var desc = document.createElement('p');
  desc.id = 'ghcDeleteDesc';

  var actions    = document.createElement('div');
  actions.id     = 'ghcDeleteActions';
  var cancelBtn  = document.createElement('button');
  cancelBtn.id   = 'ghcDeleteCancelBtn';
  cancelBtn.textContent = 'Cancelar';
  var confirmBtn = document.createElement('button');
  confirmBtn.id  = 'ghcDeleteConfirmBtn';
  confirmBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/></svg> Excluir';

  actions.append(cancelBtn, confirmBtn);
  modal.append(icon, title, desc, actions);
  overlay.appendChild(modal);
  document.body.appendChild(overlay);

  /* Injeta estilos — reutiliza as classes do senko-github-delete.js */
  var style = document.createElement('style');
  style.textContent = [
    '#ghcDeleteOverlay { position:fixed;inset:0;background:rgba(0,0,0,.55);backdrop-filter:blur(3px);display:flex;align-items:center;justify-content:center;z-index:9999;padding:1rem; }',
    '#ghcDeleteOverlay.gh-hidden { display:none; }',
    '#ghcDeleteModal { background:var(--card,#fff);border:1.5px solid var(--border,#e2e8f0);border-radius:calc(var(--radius,8px)*1.5);padding:2rem;width:100%;max-width:400px;display:flex;flex-direction:column;align-items:center;gap:1rem;text-align:center;box-shadow:0 20px 60px rgba(0,0,0,.18); }',
    '#ghcDeleteIcon { width:60px;height:60px;border-radius:50%;background:#fee2e2;color:#ef4444;display:flex;align-items:center;justify-content:center;flex-shrink:0; }',
    '#ghcDeleteTitle { font-family:var(--font-body,sans-serif);font-size:1.15rem;font-weight:800;color:var(--text1,#0f172a);margin:0; }',
    '#ghcDeleteDesc { font-family:var(--font-body,sans-serif);font-size:.88rem;color:var(--text2,#64748b);line-height:1.5;margin:0; }',
    '#ghcDeleteDesc strong { color:var(--text1,#0f172a); }',
    '#ghcDeleteActions { display:flex;gap:.6rem;width:100%;margin-top:.25rem; }',
    '#ghcDeleteCancelBtn { flex:1;padding:.6rem 1rem;background:var(--bg,#f8fafc);color:var(--text2,#64748b);border:1.5px solid var(--border,#e2e8f0);border-radius:var(--radius,8px);font-family:var(--font-body,sans-serif);font-size:.85rem;font-weight:700;cursor:pointer; }',
    '#ghcDeleteConfirmBtn { flex:1;display:inline-flex;align-items:center;justify-content:center;gap:.4rem;padding:.6rem 1rem;background:#ef4444;color:#fff;border:1.5px solid #ef4444;border-radius:var(--radius,8px);font-family:var(--font-body,sans-serif);font-size:.85rem;font-weight:700;cursor:pointer; }',
    '#ghcDeleteConfirmBtn:hover { background:#dc2626;border-color:#dc2626; }',
  ].join('\n');
  document.head.appendChild(style);

  overlay.addEventListener('click', function (e) { if (e.target === overlay) ghcCloseDeleteModal(); });
  cancelBtn.addEventListener('click', ghcCloseDeleteModal);
}

function ghcOpenDeleteModal(layoutId, layoutName, authorTag) {
  ghcCreateDeleteModal();
  var overlay    = document.getElementById('ghcDeleteOverlay');
  var desc       = document.getElementById('ghcDeleteDesc');
  var confirmBtn = document.getElementById('ghcDeleteConfirmBtn');
  if (!overlay) return;

  desc.innerHTML =
    'Você está prestes a excluir <strong>' + layoutName + '</strong> da coleção de <strong>' + authorTag + '</strong>.<br>' +
    'Essa ação <strong>não pode ser desfeita</strong>.';

  var newBtn = confirmBtn.cloneNode(true);
  confirmBtn.parentNode.replaceChild(newBtn, confirmBtn);
  newBtn.addEventListener('click', function () {
    ghcCloseDeleteModal();
    if (typeof closeEditModal === 'function') closeEditModal();
    setTimeout(function () {
      ghcDeleteLayout(layoutId, authorTag).then(function (result) {
        if (result) {
          if (typeof colRenderGrid === 'function') colRenderGrid();
          if (typeof renderGrid   === 'function') renderGrid();
        }
      });
    }, 200);
  });

  overlay.classList.remove('gh-hidden');
  document.body.style.overflow = 'hidden';
}

function ghcCloseDeleteModal() {
  var overlay = document.getElementById('ghcDeleteOverlay');
  if (overlay) overlay.classList.add('gh-hidden');
  document.body.style.overflow = '';
}


/* ═══════════════════════════════════════════════════════════════════════
   UI — Injeta botões GitHub nos modais de coleção
═══════════════════════════════════════════════════════════════════════ */

/* Botão no modal de adição de coleção */
function ghcInjectAddButton() {
  if (document.getElementById('ghcSaveNewBtn')) return;
  var anchor = document.getElementById('colSaveBtn');
  if (!anchor) return;

  /* Select de arquivo de destino (lista colecoes/*.js) */
  var select  = document.createElement('select');
  select.id        = 'ghcTargetFile';
  select.className = 'gh-file-select';
  select.disabled  = true;
  select.innerHTML = '<option value="">-- selecione --</option>';

  var btn       = document.createElement('button');
  btn.id        = 'ghcSaveNewBtn';
  btn.className = 'btn-github';
  btn.innerHTML = GH_ICON + ' GitHub';
  btn.title     = 'Salvar na coleção do repositório GitHub';

  var group = document.createElement('div');
  group.style.cssText = 'display:inline-flex;align-items:center;gap:.4rem;';
  group.appendChild(select);
  group.appendChild(btn);

  anchor.parentNode.replaceChild(group, anchor);

  /* Popula o select ao abrir o modal */
  function populateSelect() {
    if (!ghGetToken()) return;
    select.innerHTML = '<option value="">Carregando…</option>';
    select.disabled  = true;
    githubListDir(GHC_DIR).then(function (entries) {
      var jsFiles = entries
        .filter(function (e) { return e.type === 'file' && e.name.endsWith('.js'); })
        .map(function (e) { return e.name; })
        .sort();
      select.innerHTML = '<option value="__new__">+ Criar arquivo novo</option>';
      jsFiles.forEach(function (name) {
        var opt = document.createElement('option');
        opt.value = name.replace('.js', '');
        opt.textContent = 'colecoes/' + name;
        select.appendChild(opt);
      });
      select.disabled = false;
    }).catch(function () {
      /* pasta ainda não existe — só opção de criar */
      select.innerHTML = '<option value="__new__">+ Criar arquivo novo</option>';
      select.disabled  = false;
    });
  }

  var openBtn = document.getElementById('colOpenAddModal');
  if (openBtn) openBtn.addEventListener('click', function () { setTimeout(populateSelect, 60); });
  if (ghGetToken()) populateSelect();

  btn.addEventListener('click', function () {
    var authorTag = (document.getElementById('colAddAuthorTag') || {}).value || '';
    var name      = (document.getElementById('colAddName')      || {}).value || '';
    var html      = (document.getElementById('colAddHtml')      || {}).value || '';

    authorTag = authorTag.trim().toLowerCase();
    name      = name.trim();

    if (!authorTag || authorTag.length < 2) { alert('Preencha a tag do autor primeiro.'); return; }
    if (!name      || name.length      < 2) { alert('Preencha o nome do layout primeiro.'); return; }
    if (!html      || html.length      < 3) { alert('Preencha o HTML do layout primeiro.'); return; }

    var layoutId = ghcBuildId(authorTag, name);
    var genCode  = document.getElementById('colGeneratedCode');
    var code     = genCode ? genCode.textContent : '';
    if (!code || code.indexOf('//') === 0) { alert('Preencha todos os campos primeiro.'); return; }

    btn.textContent = 'Salvando…';
    btn.disabled    = true;

    ghcSaveNewLayout(authorTag, code, layoutId).then(function (result) {
      if (result) {
        btn.innerHTML = GH_ICON + ' Salvo!';
        setTimeout(function () {
          if (typeof colCloseAddModal === 'function') colCloseAddModal();
          if (typeof colRenderGrid    === 'function') colRenderGrid();
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

/* Botão GitHub no modal de edição quando editando uma coleção
   (detectado via state.currentEditIsCollection) */
function ghcInjectEditButton() {
  /* O modal de edição já tem o botão ghSaveLayoutBtn do senko-github-v2.
     Adicionamos um listener que o INTERCEPTA quando o contexto for coleção.
     Isso evita duplicar o botão e mantém a UI consistente. */
  var ghBtn = document.getElementById('ghSaveLayoutBtn');
  if (!ghBtn || ghBtn._ghcPatched) return;
  ghBtn._ghcPatched = true;

  ghBtn.addEventListener('click', function ghcEditInterceptor(e) {
    if (!state.currentEditIsCollection) return; /* deixa o handler original agir */
    e.stopImmediatePropagation();

    var code = document.getElementById('editGeneratedCode').textContent;
    var id   = (document.getElementById('editId') || {}).value || '';
    id = id.trim().toLowerCase();

    if (!id || code.indexOf('//') === 0) { alert('Preencha os campos primeiro.'); return; }

    var layout    = state.currentEdit;
    var authorTag = (layout && layout.authorTag) ? layout.authorTag : '';
    if (!authorTag) { alert('authorTag não encontrado no layout. Verifique o arquivo de coleção.'); return; }

    ghBtn.textContent = 'Salvando…';
    ghBtn.disabled    = true;

    ghcSaveLayout(id, authorTag, code).then(function (result) {
      if (result) {
        ghBtn.innerHTML = GH_ICON + ' Salvo!';
        setTimeout(function () {
          if (typeof closeEditModal === 'function') closeEditModal();
          state.currentEditIsCollection = false;
          if (typeof colRenderGrid === 'function') colRenderGrid();
          ghBtn.innerHTML = GH_ICON + ' GitHub';
          ghBtn.disabled  = false;
        }, 1200);
      } else {
        ghBtn.innerHTML  = GH_ICON + ' GitHub';
        ghBtn.disabled   = false;
      }
    }).catch(function () {
      ghBtn.innerHTML = GH_ICON + ' GitHub';
      ghBtn.disabled  = false;
    });
  }, true); /* useCapture: true — dispara antes do listener do senko-github-v2 */
}

/* Botão de exclusão no modal de edição quando contexto for coleção */
function ghcInjectDeleteButton() {
  var delBtn = document.getElementById('ghDeleteLayoutBtn');
  if (!delBtn || delBtn._ghcPatched) return;
  delBtn._ghcPatched = true;

  delBtn.addEventListener('click', function ghcDeleteInterceptor(e) {
    if (!state.currentEditIsCollection) return;
    e.stopImmediatePropagation();

    var layout    = state.currentEdit;
    if (!layout)  { alert('Nenhum layout selecionado.'); return; }
    if (!ghEnsureToken()) return;

    ghcOpenDeleteModal(layout.id, layout.name, layout.authorTag || '');
  }, true);
}


/* ═══════════════════════════════════════════════════════════════════════
   INICIALIZAÇÃO — só ativa no GitHub Pages
═══════════════════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', function () {
  if (!window.location.hostname.match(/^[^.]+\.github\.io$/i)) return;

  ghcCreateDeleteModal();

  /* Aguarda os outros módulos injetarem seus botões antes de patchear */
  setTimeout(function () {
    ghcInjectAddButton();
    ghcInjectEditButton();
    ghcInjectDeleteButton();
  }, 400);
});
