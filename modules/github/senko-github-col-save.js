// @ts-nocheck
/* ═══════════════════════════════════════════════════════════════════════
   senko-github-col-save.js — Salvar nova coleção no GitHub

   FLUXO:
     Campos preenchidos → verifica se arquivo já existe no GitHub
       → existe: exibe erro (não sobrescreve)
       → não existe: cria colecoes/data/[slug].js + registra no index.html

   ARQUIVO GERADO (colecoes/data/[slug].js):
     ColLib.registerCollection({ slug, name, tags, author, color });
     ColLib.registerLayout(slug, []);

   DEPENDÊNCIAS:
     senko-github-v2.js, col-core.js, col-script.js, col-modals.js
═══════════════════════════════════════════════════════════════════════ */

/* Ícone GitHub — fallback caso senko-github-v2 ainda não tenha definido GH_ICON */
var _GHC_SAVE_ICON = '<svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>';

function _ghcSaveIcon() {
  return (typeof GH_ICON !== 'undefined') ? GH_ICON : _GHC_SAVE_ICON;
}

/* ── Lê campos do modal ── */
function ghcSaveReadFields() {
  var name    = ((document.getElementById('colAddName')   || {}).value || '').trim();
  var slug    = ((document.getElementById('colAddSlug')   || {}).value || '').trim().toLowerCase();
  var tagsRaw = ((document.getElementById('colAddTags')   || {}).value || '').trim();
  var author  = ((document.getElementById('colAddAuthor') || {}).value || '').trim();
  var color   = (typeof colGetSelectedColor === 'function') ? colGetSelectedColor('add') : '';
  var tags    = tagsRaw.split(',').map(function(t){ return t.trim(); }).filter(Boolean);
  return { name: name, slug: slug, tags: tags, author: author, color: color };
}

/* ── Monta conteúdo do arquivo .js ── */
function ghcSaveBuildFileContent(fields) {
  var tagsStr = fields.tags.map(function(t){ return "'" + t + "'"; }).join(', ');
  return (
    '// @ts-nocheck\n' +
    "ColLib.registerCollection({\n" +
    "  slug:   '" + fields.slug                          + "',\n" +
    "  name:   '" + (fields.name   ||'').replace(/'/g,"\\'") + "',\n" +
    '  tags:   [' + tagsStr                              + '],\n' +
    "  author: '" + (fields.author ||'').replace(/'/g,"\\'") + "',\n" +
    "  color:  '" + (fields.color  ||'')                 + "',\n" +
    '});\n\n' +
    "ColLib.registerLayout('" + fields.slug + "', [\n\n]);\n"
  );
}

/* ── Caminho do arquivo ── */
function ghcSaveFilePath(slug) {
  return 'colecoes/data/' + slug + '.js';
}

/* ── Verifica se arquivo já existe (GET → 404 = não existe) ── */
function ghcSaveFileExists(slug) {
  var token = ghGetToken();
  var url   = 'https://api.github.com/repos/'
    + GITHUB_CONFIG.OWNER + '/' + GITHUB_CONFIG.REPO
    + '/contents/' + ghcSaveFilePath(slug)
    + '?ref=' + GITHUB_CONFIG.BRANCH;

  return fetch(url, {
    headers: { 'Authorization': 'token ' + token, 'Accept': 'application/vnd.github+json' }
  }).then(function(res) {
    if (res.status === 404) return false;
    if (res.status === 401) { ghSetToken(''); throw new Error('Token inválido ou expirado.'); }
    if (res.ok) return true;
    throw new Error('Erro ao verificar arquivo (' + res.status + ').');
  });
}

/* ── Registra <script> no index.html do repositório ── */
function ghcSaveRegisterScript(slug) {
  var scriptTag = 'colecoes/data/' + slug + '.js';
  return githubGetFile('index.html').then(function(data) {
    if (data.content.indexOf(scriptTag) !== -1) return; /* já existe */
    var anchor  = '  <!-- <script src="colecoes/data/projetos-2025.js"></script> -->';
    var tag     = '  <script src="' + scriptTag + '"></script>\n';
    var newIdx  = data.content.indexOf(anchor) !== -1
      ? data.content.replace(anchor, tag + anchor)
      : data.content;
    if (newIdx === data.content) return;
    return githubPutFile('index.html', newIdx, data.sha,
      '[SenkoLib] register collection: ' + slug);
  });
}

/* ═══════════════════════════════════════════════════════════════════════
   CORE — fluxo principal
═══════════════════════════════════════════════════════════════════════ */
function ghcSaveNewCollection(fields) {
  if (!ghLockSave()) return Promise.resolve(false);
  if (!ghEnsureToken()) { ghUnlockSave(); ghSetStatus('Token não configurado','error'); return Promise.resolve(false); }

  var filePath = ghcSaveFilePath(fields.slug);
  ghSetStatus('Verificando coleção…','saving');

  return ghcSaveFileExists(fields.slug).then(function(exists) {

    if (exists) {
      ghUnlockSave();
      ghSetStatus('Coleção já existe','error');
      ghShowErrorModal(
        'Já existe uma coleção com o nome "' + fields.slug + '" no repositório.\n\n' +
        'Escolha outro nome no campo Coleção.'
      );
      return false;
    }

    ghSetStatus('Criando arquivo…','saving');

    return githubPutFile(filePath, ghcSaveBuildFileContent(fields), null,
      '[SenkoLib] create collection: ' + fields.slug

    ).then(function() {
      ghSetStatus('Atualizando index.html…','saving');
      return ghcSaveRegisterScript(fields.slug);

    }).then(function() {
      ColLib.registerCollection({
        slug: fields.slug, name: fields.name, tags: fields.tags,
        author: fields.author, color: fields.color,
      });
      ghSetStatus('✓ Coleção criada: ' + filePath,'ok');
      ghUnlockSave();
      ghStartDeployWatch(filePath);
      return true;
    });

  }).catch(function(e) {
    console.error('[col-save]', e);
    ghSetStatus('Erro: ' + e.message,'error');
    ghUnlockSave();
    ghShowErrorModal(e.message);
    return false;
  });
}

/* ═══════════════════════════════════════════════════════════════════════
   UI — injeta botão GitHub
═══════════════════════════════════════════════════════════════════════ */
function ghcSaveInjectButton() {
  if (document.getElementById('ghcSaveNewColBtn')) return;
  var anchor = document.getElementById('colAddSaveBtn');
  if (!anchor) return;

  var btn       = document.createElement('button');
  btn.id        = 'ghcSaveNewColBtn';
  btn.className = 'btn-github';
  btn.innerHTML = _ghcSaveIcon() + ' GitHub';
  btn.title     = 'Criar coleção diretamente no repositório GitHub';

  anchor.parentNode.replaceChild(btn, anchor);

  btn.addEventListener('click', function() {

    /* Valida campos */
    var validation = (typeof colValidateAddForm === 'function')
      ? colValidateAddForm() : { allOk: false };
    if (!validation.allOk) return;

    var fields = ghcSaveReadFields();

    /* Validações de segurança */
    if (!fields.slug || fields.slug.length < 2) {
      ghShowErrorModal('Preencha o campo Coleção antes de salvar.'); return;
    }
    if (!/^[a-z0-9-]+$/.test(fields.slug)) {
      ghShowErrorModal('O campo Coleção contém caracteres inválidos.\nUse apenas letras minúsculas, números e hífen.'); return;
    }
    if (!fields.name || fields.name.length < 2) {
      ghShowErrorModal('Preencha o Nome Exibido antes de salvar.'); return;
    }

    btn.textContent = 'Salvando…';
    btn.disabled    = true;

    ghcSaveNewCollection(fields).then(function(result) {
      if (result) {
        btn.innerHTML = _ghcSaveIcon() + ' Criado!';
        setTimeout(function() {
          if (typeof colCloseAddModal === 'function') colCloseAddModal();
          if (typeof colRenderGrid    === 'function') colRenderGrid();
          if (typeof colUpdateTabCounts === 'function') colUpdateTabCounts();
          btn.innerHTML = _ghcSaveIcon() + ' GitHub';
          btn.disabled  = false;
        }, 1200);
      } else {
        btn.innerHTML = _ghcSaveIcon() + ' GitHub';
        btn.disabled  = false;
      }
    }).catch(function() {
      btn.innerHTML = _ghcSaveIcon() + ' GitHub';
      btn.disabled  = false;
    });
  });
}

/* ═══════════════════════════════════════════════════════════════════════
   INICIALIZAÇÃO
   — Só injeta no GitHub Pages
   — setTimeout(350) garante que senko-github-v2 já injetou seus botões
═══════════════════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', function() {
  if (!window.location.hostname.match(/^[^.]+\.github\.io$/i)) return;
  setTimeout(ghcSaveInjectButton, 350);
});
