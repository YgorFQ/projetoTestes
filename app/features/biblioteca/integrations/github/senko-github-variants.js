// @ts-nocheck
/*
 * INDEPENDENCIA DE FEATURE:
 * Este modulo GitHub pertence somente a Biblioteca. Ele pode depender de
 * SenkoLib e dos scripts da Biblioteca, mas nenhuma outra feature deve
 * importar ou chamar estas funcoes globais.
 */
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
     - app/features/biblioteca/scripts/script.js (state, SenkoLib, renderVariantBlocks,
                             updateVariantsCount, renderGrid,
                             closeNewVariantModal, closeEditVariantModal)

   ORDEM DE CARREGAMENTO:
     O register.js da Biblioteca carrega primeiro senko-github-v2.js e depois
     este módulo. O index.html principal não conhece esta integração.
═══════════════════════════════════════════════════════════════════════ */














/* ═══════════════════════════════════════════════════════════════════════
   UTILITÁRIO: Atualiza variante na memória do SenkoLib após edição
═══════════════════════════════════════════════════════════════════════ */
/*
 * Mantem data/manifest.js sincronizado com os arquivos de variantes.
 *
 * Esse manifesto substitui as antigas tags inseridas no index.html. Assim, a
 * Biblioteca controla seus proprios dados e pode ser removida sem deixar
 * referencias no shell ou em outra feature.
 */
var GH_VARIANT_MANIFEST_PATH = 'app/features/biblioteca/data/manifest.js';

function ghvParseManifest(content) {
  /*
   * O catalogo possui somente uma atribuicao JSON a uma variavel da propria
   * Biblioteca. Extrair o lado direito evita executar codigo vindo da rede.
   */
  var assignment = 'window.SenkoBibliotecaManifest';
  var assignmentIndex = content.indexOf(assignment);
  var equalsIndex = content.indexOf('=', assignmentIndex);
  var source = equalsIndex === -1
    ? ''
    : content.slice(equalsIndex + 1).trim().replace(/;\s*$/, '');

  if (assignmentIndex === -1 || !source) {
    throw new Error('Catalogo da Biblioteca possui formato invalido.');
  }
  return JSON.parse(source);
}

function ghvSerializeManifest(manifest) {
  return (
    '/* Catalogo privado da Biblioteca. Atualizado pela integracao GitHub. */\n' +
    'window.SenkoBibliotecaManifest = ' +
    JSON.stringify(manifest, null, 2) +
    ';\n'
  );
}

function ghvSafeFileName(value, fallback) {
  var slug = String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-{2,}/g, '-');
  return slug || fallback || 'variant';
}

function ghvReadManifest() {
  return githubGetFile(GH_VARIANT_MANIFEST_PATH).then(function (data) {
    return {
      content: data.content,
      sha: data.sha,
      manifest: ghvParseManifest(data.content)
    };
  });
}

function ghvFindVariantManifestEntry(parentId, variantNameOrId) {
  var parentKey = String(parentId || '').toLowerCase();
  var variantKey = String(variantNameOrId || '').toLowerCase();

  return ghvReadManifest().then(function (info) {
    var variants = Array.isArray(info.manifest.variants) ? info.manifest.variants : [];
    for (var i = 0; i < variants.length; i++) {
      var entry = variants[i];
      if (!entry || typeof entry !== 'object' || !entry.file) continue;
      if (String(entry.layoutId || '').toLowerCase() !== parentKey) continue;
      if (
        String(entry.id || '').toLowerCase() === variantKey ||
        String(entry.name || '').toLowerCase() === variantKey
      ) {
        return {
          manifestInfo: info,
          entry: entry,
          path: 'app/features/biblioteca/data/' + entry.file
        };
      }
    }
    return null;
  });
}

function ghvSetVariantManifestEntry(parentId, variant, shouldInclude) {
  var parentKey = String(parentId || '').toLowerCase();
  var variantId = ghvSafeFileName(variant && (variant.id || variant.name), 'variant');
  var parentFile = ghvSafeFileName(parentId, 'layout');
  var file = 'variants/' + parentFile + '/' + variantId + '.js';

  return ghvReadManifest().then(function (info) {
    var manifest = info.manifest;
    if (!Array.isArray(manifest.layouts)) manifest.layouts = [];
    if (!Array.isArray(manifest.variants)) manifest.variants = [];

    var index = -1;
    for (var i = 0; i < manifest.variants.length; i++) {
      var current = manifest.variants[i];
      if (
        current &&
        typeof current === 'object' &&
        String(current.layoutId || '').toLowerCase() === parentKey &&
        String(current.id || '').toLowerCase() === variantId
      ) {
        index = i;
        break;
      }
    }

    if (shouldInclude) {
      var existingFile = index !== -1 && manifest.variants[index].file
        ? manifest.variants[index].file
        : file;
      var entry = {
        file: existingFile,
        layoutId: parentId,
        id: variantId,
        name: variant.name || variantId
      };
      if (index === -1) manifest.variants.push(entry);
      else manifest.variants[index] = entry;
    } else if (index !== -1) {
      manifest.variants.splice(index, 1);
    }

    if (!shouldInclude && index === -1) return GH_VARIANT_MANIFEST_PATH;

    return githubPutFile(
      GH_VARIANT_MANIFEST_PATH,
      ghvSerializeManifest(manifest),
      info.sha,
      shouldInclude
        ? '[SenkoLib] register variant file: ' + parentKey + '/' + variantId
        : '[SenkoLib] unregister variant file: ' + parentKey + '/' + variantId
    ).then(function () {
      return GH_VARIANT_MANIFEST_PATH;
    });
  });
}

function ghvEscapeTemplateLiteral(value) {
  return String(value == null ? '' : value)
    .replace(/\\/g, '\\\\')
    .replace(/`/g, '\\`')
    .replace(/\$\{/g, '\\${');
}

function ghvBuildVariantFileContent(parentId, variant) {
  var variantId = ghvSafeFileName(variant.id || variant.name, 'variant');
  return (
    '// @ts-nocheck\n' +
    'SenkoLib.registerVariantFile(' + JSON.stringify(String(parentId)) + ',\n' +
    '{\n' +
    '  id: ' + JSON.stringify(variantId) + ',\n' +
    '  name: ' + JSON.stringify(String(variant.name || variantId)) + ',\n' +
    '  html: `' + ghvEscapeTemplateLiteral(variant.html) + '`,\n' +
    '  css: `' + ghvEscapeTemplateLiteral(variant.css) + '`\n' +
    '}\n' +
    ');\n'
  );
}

function ghvDeleteFile(filePath, sha, message) {
  var token = ghGetToken();
  var url   = 'https://api.github.com/repos/'
    + GITHUB_CONFIG.OWNER + '/'
    + GITHUB_CONFIG.REPO  + '/contents/'
    + filePath;

  return fetch(url, {
    method:  'DELETE',
    headers: {
      'Authorization': 'token ' + token,
      'Accept':        'application/vnd.github+json',
      'Content-Type':  'application/json'
    },
    body: JSON.stringify({
      message: message,
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
        throw new Error('GitHub DELETE falhou (' + res.status + '): ' + (e.message || filePath));
      });
    }
    return true;
  });
}

function ghvSetManifestEntry(parentId, shouldInclude) {
  var entry = 'variants/' + parentId.toLowerCase() + '.js';

  return ghvReadManifest().then(function (data) {
    var manifest = data.manifest;
    try {
      if (!manifest || typeof manifest !== 'object') throw new Error('Manifest invalido.');
    } catch (error) {
      throw new Error('Catalogo da Biblioteca possui JavaScript invalido.');
    }

    if (!Array.isArray(manifest.layouts)) manifest.layouts = [];
    if (!Array.isArray(manifest.variants)) manifest.variants = [];

    var originalLength = manifest.variants.length;
    var index = manifest.variants.indexOf(entry);
    if (!shouldInclude) {
      manifest.variants = manifest.variants.filter(function (variantEntry) {
        return !(
          variantEntry &&
          typeof variantEntry === 'object' &&
          String(variantEntry.layoutId || '').toLowerCase() === String(parentId || '').toLowerCase()
        );
      });
    }
    if (shouldInclude && index === -1) manifest.variants.push(entry);
    if (!shouldInclude && index !== -1) manifest.variants.splice(index, 1);
    if ((shouldInclude && index !== -1) || (!shouldInclude && index === -1 && manifest.variants.length === originalLength)) {
      return GH_VARIANT_MANIFEST_PATH;
    }

    return githubPutFile(
      GH_VARIANT_MANIFEST_PATH,
      ghvSerializeManifest(manifest),
      data.sha,
      shouldInclude
        ? '[SenkoLib] register variant file: ' + parentId
        : '[SenkoLib] unregister variant file: ' + parentId
    ).then(function () {
      return GH_VARIANT_MANIFEST_PATH;
    });
  });
}

function ghvDeleteVariantFilesForLayout(parentId) {
  var parentKey = String(parentId || '').toLowerCase();

  return ghvReadManifest().then(function (info) {
    var manifest = info.manifest;
    if (!Array.isArray(manifest.variants)) manifest.variants = [];

    var toDelete = manifest.variants.filter(function (entry) {
      return entry &&
        typeof entry === 'object' &&
        entry.file &&
        String(entry.layoutId || '').toLowerCase() === parentKey;
    });

    var remaining = manifest.variants.filter(function (entry) {
      return !(
        entry &&
        typeof entry === 'object' &&
        String(entry.layoutId || '').toLowerCase() === parentKey
      ) && entry !== 'variants/' + parentKey + '.js';
    });

    var deletes = toDelete.map(function (entry) {
      var path = 'app/features/biblioteca/data/' + entry.file;
      return githubGetFile(path).then(function (data) {
        return ghvDeleteFile(
          path,
          data.sha,
          '[SenkoLib] delete variant file: ' + parentKey + '/' + (entry.id || entry.name || 'variant')
        );
      }).catch(function (error) {
        if (error.message && error.message.indexOf('404') !== -1) return true;
        throw error;
      });
    });

    return Promise.all(deletes).then(function () {
      manifest.variants = remaining;
      return githubPutFile(
        GH_VARIANT_MANIFEST_PATH,
        ghvSerializeManifest(manifest),
        info.sha,
        '[SenkoLib] unregister variant files: ' + parentKey
      );
    }).then(function () {
      return true;
    });
  });
}

window.SenkoBibliotecaGithubManifest = {
  setVariantEntry: ghvSetManifestEntry,
  setVariantFileEntry: ghvSetVariantManifestEntry,
  deleteVariantFilesForLayout: ghvDeleteVariantFilesForLayout
};

function ghvUpdateVariantInMemory(parentId, originalName, newName, html, css) {
  var variants  = SenkoLib.getVariants(parentId);
  var origLower = originalName.toLowerCase();
  for (var i = 0; i < variants.length; i++) {
    if ((variants[i].name || '').toLowerCase() === origLower) {
      if (typeof SenkoLib.updateVariant === 'function') {
        return SenkoLib.updateVariant(parentId, variants[i], {
          name: newName,
          html: html,
          css: css
        });
      }
      variants[i].name = newName;
      variants[i].html = html;
      variants[i].css  = css;
      return true;
    }
  }
  return false;
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
   Se o arquivo de variantes da Biblioteca não existir, cria do zero.
═══════════════════════════════════════════════════════════════════════ */
function githubCreateVariant(parentId, variantName, objectCode) {
  if (typeof senkoVariantNameExists === 'function'
      && senkoVariantNameExists(parentId, variantName, null)) {
    alert('Já existe uma variante com o nome "' + variantName + '" neste layout.');
    return Promise.resolve(false);
  }

  if (!ghLockSave()) return Promise.resolve(false);
  if (!ghEnsureToken()) {
    ghUnlockSave();
    ghSetStatus('Token não configurado', 'error');
    return Promise.resolve(false);
  }

  if (!String(parentId || '').trim()) {
    ghUnlockSave();
    ghSetStatus('ID inválido', 'error');
    alert('O layout pai da variante não foi identificado.');
    return Promise.resolve(false);
  }

  var nameLower = variantName.toLowerCase();
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(nameLower)) {
    ghUnlockSave();
    ghSetStatus('Nome de variante inválido', 'error');
    alert('O nome da variante precisa usar apenas letras minúsculas, números e hífen depois da normalização.');
    return Promise.resolve(false);
  }

  ghSetStatus('Criando arquivo de variante…', 'saving');

  var variantId = ghvSafeFileName(nameLower, 'variant');
  var variantFile = 'variants/' + ghvSafeFileName(parentId, 'layout') + '/' + variantId + '.js';
  var variantPath = 'app/features/biblioteca/data/' + variantFile;
  var htmlValue = document.getElementById('newVarHtml') ? document.getElementById('newVarHtml').value : '';
  var cssValue  = document.getElementById('newVarCss')  ? document.getElementById('newVarCss').value  : '';
  var variantData = { id: variantId, name: variantName, html: htmlValue, css: cssValue };

  return githubGetFile(variantPath).then(function () {
    ghSetStatus('Variante duplicada', 'error');
    ghUnlockSave();
    alert('Já existe um arquivo individual para a variante "' + variantName + '".');
    return false;
  }).catch(function (error) {
    if (!error.message || error.message.indexOf('404') === -1) throw error;

    return githubPutFile(
      variantPath,
      ghvBuildVariantFileContent(parentId, variantData),
      null,
      '[SenkoLib] create variant file: ' + parentId + '/' + variantId
    ).then(function () {
      ghSetStatus('Atualizando manifesto da Biblioteca…', 'saving');
      return ghvSetVariantManifestEntry(parentId, variantData, true);
    }).then(function () {
      SenkoLib.registerVariantFile(parentId, variantData);
      ghSetStatus('✓ Variante criada: ' + variantFile, 'ok');
      ghUnlockSave();
      if (typeof ghStartDeployWatch === 'function') ghStartDeployWatch(GH_VARIANT_MANIFEST_PATH);
      return variantPath;
    }).catch(function (e) {
      ghSetStatus('Erro ao criar variante: ' + e.message, 'error');
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
   Recebe o nome ORIGINAL para localizar a entrada no manifesto e o nome NOVO para
   validar duplicidade antes de regravar o arquivo individual.
═══════════════════════════════════════════════════════════════════════ */
function githubSaveVariant(parentId, originalName, newName, objectCode) {
  if (typeof senkoVariantNameExists === 'function'
      && senkoVariantNameExists(parentId, newName, state.currentEditVariant)) {
    alert('Já existe uma variante com o nome "' + newName + '" neste layout.');
    return Promise.resolve(false);
  }

  if (!ghLockSave()) return Promise.resolve(false);
  if (!ghEnsureToken()) {
    ghUnlockSave();
    ghSetStatus('Token não configurado', 'error');
    return Promise.resolve(false);
  }

  ghSetStatus('Lendo arquivo de variantes…', 'saving');

  return ghvFindVariantManifestEntry(parentId, originalName).then(function (manifestEntry) {
    if (!manifestEntry) return null;

    var editorData = window.SenkoLayoutEditor
      && typeof window.SenkoLayoutEditor.getCurrentData === 'function'
      ? window.SenkoLayoutEditor.getCurrentData()
      : null;
    var htmlValue = editorData && editorData.mode === 'variant'
      && String(editorData.id || '').toLowerCase() === String(parentId || '').toLowerCase()
      ? editorData.html
      : document.getElementById('editVarHtml') ? document.getElementById('editVarHtml').value : '';
    var cssValue  = editorData && editorData.mode === 'variant'
      && String(editorData.id || '').toLowerCase() === String(parentId || '').toLowerCase()
      ? editorData.css
      : document.getElementById('editVarCss')  ? document.getElementById('editVarCss').value  : '';
    var variantData = {
      id: manifestEntry.entry.id || ghvSafeFileName(originalName, 'variant'),
      name: newName,
      html: htmlValue,
      css: cssValue
    };

    return githubGetFile(manifestEntry.path).then(function (data) {
      ghSetStatus('Salvando no GitHub…', 'saving');
      return githubPutFile(
        manifestEntry.path,
        ghvBuildVariantFileContent(parentId, variantData),
        data.sha,
        '[SenkoLib] edit variant file: ' + parentId + '/' + variantData.id
      ).then(function () {
        return ghvSetVariantManifestEntry(parentId, variantData, true);
      }).then(function () {
        ghSetStatus('✓ Salvo em ' + manifestEntry.entry.file, 'ok');
        ghUnlockSave();
        if (typeof ghStartDeployWatch === 'function') ghStartDeployWatch(manifestEntry.path);
        return manifestEntry.path;
      });
    });
  }).then(function (directResult) {
    if (directResult) return directResult;

    ghSetStatus('Variante fora do manifesto', 'error');
    ghUnlockSave();
    alert('Variante "' + originalName + '" não possui arquivo individual no manifest da Biblioteca.');
    return false;

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

  return ghvFindVariantManifestEntry(parentId, variantNome).then(function (manifestEntry) {
    if (!manifestEntry) return null;

    return githubGetFile(manifestEntry.path).then(function (data) {
      ghSetStatus('Removendo variante…', 'saving');
      return ghvDeleteFile(
        manifestEntry.path,
        data.sha,
        '[SenkoLib] delete variant file: ' + parentId + '/' + (manifestEntry.entry.id || variantNome)
      ).then(function () {
        return ghvSetVariantManifestEntry(parentId, {
          id: manifestEntry.entry.id || ghvSafeFileName(variantNome, 'variant'),
          name: manifestEntry.entry.name || variantNome
        }, false);
      }).then(function () {
        ghvRemoveVariantFromMemory(parentId, variantNome);
        ghSetStatus('✓ Variante excluída: ' + variantNome, 'ok');
        if (typeof ghStartDeployWatch === 'function') ghStartDeployWatch(GH_VARIANT_MANIFEST_PATH);
        return true;
      });
    });
  }).then(function (directResult) {
    if (directResult) return directResult;

    ghSetStatus('Variante fora do manifesto', 'error');
    alert('Variante "' + variantNome + '" não possui arquivo individual no manifest da Biblioteca.');
    return false;

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
          if (window.SenkoLayoutEditor && window.SenkoLayoutEditor.isOpen()) {
            window.SenkoLayoutEditor.close();
          }
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

  /* Substitui o span âncora pelo botão */
  anchor.parentNode.replaceChild(btn, anchor);

  btn.addEventListener('click', function () {
    var nameInput = document.getElementById('newVarName');
    var nameIssue = typeof senkoVariantNameIssue === 'function' && nameInput
      ? senkoVariantNameIssue(nameInput.value)
      : '';
    if (nameIssue) { alert(nameIssue); return; }

    var nomeRaw = typeof senkoSyncIdentifierInput === 'function'
      ? senkoSyncIdentifierInput('newVarName', true)
      : (document.getElementById('newVarName') ? document.getElementById('newVarName').value.trim().toLowerCase() : '');
    var html    = document.getElementById('newVarHtml') ? document.getElementById('newVarHtml').value : '';
    var css     = document.getElementById('newVarCss')  ? document.getElementById('newVarCss').value  : '';

    if (nomeRaw.length < 2) { alert('Preencha o nome da variante primeiro.'); return; }
    if (!state.currentForVariant) { alert('Nenhum layout pai selecionado.'); return; }

    var nomeLower = typeof senkoSlugifyIdentifier === 'function' ? senkoSlugifyIdentifier(nomeRaw) : nomeRaw.toLowerCase();
    if (!/^[a-z0-9-]+$/.test(nomeLower)) { return; }
    var parentId  = state.currentForVariant.id;
    var safeHtml  = escapeTemplateLiteral(html);
    var safeCss   = escapeTemplateLiteral(css);

    var objectCode =
      "SenkoLib.registerVariantFile('" + parentId + "',\n" +
      '{\n' +
      "    id: '" + nomeLower + "',\n" +
      "    name: '" + nomeLower + "',\n" +
      '    html: `' + safeHtml + '`,\n' +
      '    css: `'  + safeCss  + '`\n' +
      '}\n' +
      ');';

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

  /* Substitui o span âncora pelo botão */
  anchor.parentNode.replaceChild(btn, anchor);

  btn.addEventListener('click', function () {
    if (!state.currentForVariant)  { alert('Nenhum layout pai selecionado.'); return; }
    if (!state.currentEditVariant) { alert('Nenhuma variante selecionada.');  return; }

    /* ⚠ Nome ORIGINAL: lido do state, não do campo editável */
    var originalName = state.currentEditVariant.name || '';
    var editNameInput = document.getElementById('editVarName');
    var nameIssue = typeof senkoVariantNameIssue === 'function' && editNameInput
      ? senkoVariantNameIssue(editNameInput.value)
      : '';
    if (nameIssue) { alert(nameIssue); return; }

    var newName      = typeof senkoSyncIdentifierInput === 'function'
      ? senkoSyncIdentifierInput('editVarName', true)
      : document.getElementById('editVarName').value.trim().toLowerCase();
    var html         = document.getElementById('editVarHtml').value;
    var css          = document.getElementById('editVarCss').value;
    var parentId     = state.currentForVariant.id;

    if (newName.length < 2) { alert('Preencha o nome da variante primeiro.'); return; }
    if (!/^[a-z0-9-]+$/.test(newName)) { return; }

    var safeHtml   = escapeTemplateLiteral(html);
    var safeCss    = escapeTemplateLiteral(css);
    var objectCode =
      "SenkoLib.registerVariantFile('" + parentId + "',\n" +
      '{\n' +
      "    id: '" + (state.currentEditVariant.id || newName) + "',\n" +
      "    name: '" + newName + "',\n" +
      '    html: `' + safeHtml + '`,\n' +
      '    css: `'  + safeCss  + '`\n' +
      '}\n' +
      ');';

    btn.textContent = 'Salvando…';
    btn.disabled    = true;

    githubSaveVariant(parentId, originalName, newName, objectCode).then(function (result) {
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
function initSenkoBibliotecaGithubVariants() {
  if (initSenkoBibliotecaGithubVariants.initialized) return;
  initSenkoBibliotecaGithubVariants.initialized = true;
  if (!window.location.hostname.match(/^[^.]+\.github\.io$/i)) return;

  ghvInjectStyles();
  ghvCreateDeleteModal();
  ghvInjectNewVariantButton();
  ghvInjectEditVariantButton();
}

window.SenkoBibliotecaGithubVariants = {
  init: initSenkoBibliotecaGithubVariants
};
