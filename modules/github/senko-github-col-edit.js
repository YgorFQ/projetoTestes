// @ts-nocheck
/* ═══════════════════════════════════════════════════════════════════════
   senko-github-col-edit.js — Editar coleção existente no GitHub

   RESPONSABILIDADE:
     - Injeta botão "GitHub" no modal de edição de coleção (#colEditOverlay)
     - Lê o arquivo colecoes/data/[slug].js existente
     - Atualiza os campos name, tags, author e color no arquivo
     - Preserva integralmente o bloco ColLib.registerLayout (layouts intocados)
     - Atualiza a coleção em memória via ColLib após save bem-sucedido

   DEPENDÊNCIAS:
     - senko-github-v2.js  (ghGetToken, ghEnsureToken, ghLockSave,
                            ghUnlockSave, ghSetStatus, githubGetFile,
                            githubPutFile, ghShowErrorModal, GH_ICON,
                            GITHUB_CONFIG, ghStartDeployWatch)
     - col-core.js         (ColLib)
     - col-script.js       (colRenderGrid, colState)
     - col-modals.js       (colCloseEditModal, colGetSelectedColor,
                            colValidateEditForm)

   SÓ ATIVO NO GITHUB PAGES.
═══════════════════════════════════════════════════════════════════════ */


/* ═══════════════════════════════════════════════════════════════════════
   UTILITÁRIOS
═══════════════════════════════════════════════════════════════════════ */

/* Lê os campos do modal de edição */
function ghcEditReadFields() {
  var name   = ((document.getElementById('colEditName')   || {}).value || '').trim();
  var slug   = ((document.getElementById('colEditSlug')   || {}).value || '').trim().toLowerCase();
  var tagsRaw= ((document.getElementById('colEditTags')   || {}).value || '').trim();
  var author = ((document.getElementById('colEditAuthor') || {}).value || '').trim();
  var color  = (typeof colGetSelectedColor === 'function') ? colGetSelectedColor('edit') : '';

  var tags = tagsRaw
    .split(',')
    .map(function (t) { return t.trim(); })
    .filter(Boolean);

  return { name: name, slug: slug, tags: tags, author: author, color: color };
}

/* Caminho do arquivo no repositório */
function ghcEditFilePath(slug) {
  return 'colecoes/data/' + slug + '.js';
}

/*
 * Reconstrói o cabeçalho do arquivo preservando o bloco registerLayout.
 * Estratégia: substitui apenas a chamada registerCollection, mantendo
 * tudo que vier depois da linha que fecha esse bloco (});
 */
function ghcEditRebuildContent(oldContent, fields) {
  var tagsStr = fields.tags.map(function (t) { return "'" + t + "'"; }).join(', ');

  var newHeader =
    '// @ts-nocheck\n' +
    '/* Coleção: ' + fields.slug + ' */\n' +
    'ColLib.registerCollection({\n' +
    "  slug:   '" + fields.slug   + "',\n" +
    "  name:   '" + fields.name.replace(/'/g, "\\'") + "',\n" +
    '  tags:   [' + tagsStr + '],\n' +
    "  author: '" + (fields.author || '').replace(/'/g, "\\'") + "',\n" +
    "  color:  '" + (fields.color  || '') + "',\n" +
    '});\n';

  /*
   * Encontra o início do bloco registerLayout para preservar tudo a partir daí.
   * Marcador: linha que começa com "ColLib.registerLayout("
   */
  var layoutMarker = 'ColLib.registerLayout(';
  var markerIdx    = oldContent.indexOf(layoutMarker);

  if (markerIdx === -1) {
    /* Arquivo não tem registerLayout ainda — só atualiza o cabeçalho e acrescenta layout vazio */
    return newHeader +
      '\n/* Layouts desta coleção — cada item é adicionado via modal */\n' +
      "ColLib.registerLayout('" + fields.slug + "', [\n\n]);\n";
  }

  /* Preserva o bloco de layouts existente */
  var layoutBlock = oldContent.slice(markerIdx);

  /* Garante que o primeiro argumento (slug) do registerLayout esteja atualizado */
  layoutBlock = layoutBlock.replace(
    /^ColLib\.registerLayout\(\s*'[^']*'/,
    "ColLib.registerLayout('" + fields.slug + "'"
  );

  return newHeader + '\n/* Layouts desta coleção — cada item é adicionado via modal */\n' + layoutBlock;
}


/* ═══════════════════════════════════════════════════════════════════════
   CORE: Fluxo principal de edição
═══════════════════════════════════════════════════════════════════════ */

function ghcEditCollection(fields) {
  if (!ghLockSave()) return Promise.resolve(false);
  if (!ghEnsureToken()) {
    ghUnlockSave();
    ghSetStatus('Token não configurado', 'error');
    return Promise.resolve(false);
  }

  var filePath = ghcEditFilePath(fields.slug);
  ghSetStatus('Carregando coleção…', 'saving');

  return githubGetFile(filePath).then(function (data) {

    ghSetStatus('Atualizando arquivo…', 'saving');

    var newContent = ghcEditRebuildContent(data.content, fields);

    return githubPutFile(
      filePath,
      newContent,
      data.sha,
      '[SenkoLib] update collection: ' + fields.slug
    );

  }).then(function () {

    /* Atualiza em memória */
    ColLib.updateCollection(fields.slug, {
      name:   fields.name,
      tags:   fields.tags,
      author: fields.author,
      color:  fields.color,
    });

    ghSetStatus('✓ Coleção atualizada: ' + filePath, 'ok');
    ghUnlockSave();
    ghStartDeployWatch(filePath);
    return true;

  }).catch(function (e) {
    console.error('[senko-github-col-edit] Erro:', e);
    ghSetStatus('Erro: ' + e.message, 'error');
    ghUnlockSave();
    ghShowErrorModal(e.message);
    return false;
  });
}


/* ═══════════════════════════════════════════════════════════════════════
   UI — Injeta botão GitHub no modal de edição de coleção
═══════════════════════════════════════════════════════════════════════ */

function ghcEditInjectButton() {
  if (document.getElementById('ghcEditColBtn')) return;

  var anchor = document.getElementById('colEditSaveBtn');
  if (!anchor) return;

  var btn       = document.createElement('button');
  btn.id        = 'ghcEditColBtn';
  btn.className = 'btn-github';
  btn.innerHTML = GH_ICON + ' Salvar';
  btn.title     = 'Salvar alterações da coleção no GitHub';

  anchor.parentNode.replaceChild(btn, anchor);

  btn.addEventListener('click', function () {
    var validation = (typeof colValidateEditForm === 'function')
      ? colValidateEditForm()
      : { allOk: false };

    if (!validation.allOk) return;

    var fields = ghcEditReadFields();

    if (!fields.slug || fields.slug.length < 2) {
      ghShowErrorModal('Slug da coleção não encontrado.');
      return;
    }

    btn.textContent = 'Salvando…';
    btn.disabled    = true;

    ghcEditCollection(fields).then(function (result) {
      if (result) {
        btn.innerHTML = GH_ICON + ' Salvo!';
        setTimeout(function () {
          if (typeof colCloseEditModal === 'function') colCloseEditModal();
          if (typeof colRenderGrid    === 'function') colRenderGrid();
          btn.innerHTML = GH_ICON + ' Salvar';
          btn.disabled  = false;
        }, 1200);
      } else {
        btn.innerHTML = GH_ICON + ' Salvar';
        btn.disabled  = false;
      }
    }).catch(function () {
      btn.innerHTML = GH_ICON + ' Salvar';
      btn.disabled  = false;
    });
  });
}


/* ═══════════════════════════════════════════════════════════════════════
   INICIALIZAÇÃO — só ativa no GitHub Pages
═══════════════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', function () {
  if (!window.location.hostname.match(/^[^.]+\.github\.io$/i)) return;

  ghcEditInjectButton();
});
