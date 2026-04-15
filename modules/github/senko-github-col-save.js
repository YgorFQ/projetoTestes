// @ts-nocheck
/* ═══════════════════════════════════════════════════════════════════════
   senko-github-col-save.js — Salvar nova coleção no GitHub

   RESPONSABILIDADE:
     - Injeta botão "GitHub" no modal de adição de coleção (#colAddOverlay)
     - Se colecoes/data/[slug].js não existir → cria o arquivo
     - Se já existir com o mesmo slug → exibe erro (sem sobrescrever)
     - Registra o <script> no index.html automaticamente (primeiro save)
     - Registra a coleção em memória via ColLib após save bem-sucedido

   ESTRUTURA DO ARQUIVO GERADO (colecoes/data/[slug].js):
     // @ts-nocheck
     ColLib.registerCollection({
       slug: '[slug]',
       name: '[Nome Exibido]',
       tags: [...],
       author: '[Autor]',   // vazio se não informado
       color:  '[#hex]',    // vazio se não informado
     });
     ColLib.registerLayout('[slug]', []);

   DEPENDÊNCIAS:
     - senko-github-v2.js  (ghGetToken, ghEnsureToken, ghLockSave,
                            ghUnlockSave, ghSetStatus, githubGetFile,
                            githubPutFile, ghShowErrorModal, GH_ICON,
                            GITHUB_CONFIG, ghStartDeployWatch)
     - col-core.js         (ColLib)
     - col-script.js       (colRenderGrid, colState)
     - col-modals.js       (colCloseAddModal, colGetSelectedColor,
                            colValidateAddForm)

   SÓ ATIVO NO GITHUB PAGES.
═══════════════════════════════════════════════════════════════════════ */


/* ═══════════════════════════════════════════════════════════════════════
   UTILITÁRIOS
═══════════════════════════════════════════════════════════════════════ */

/* Lê e sanitiza os campos do modal de adição */
function ghcSaveReadFields() {
  var name   = ((document.getElementById('colAddName')   || {}).value || '').trim();
  var slug   = ((document.getElementById('colAddSlug')   || {}).value || '').trim().toLowerCase();
  var tagsRaw= ((document.getElementById('colAddTags')   || {}).value || '').trim();
  var author = ((document.getElementById('colAddAuthor') || {}).value || '').trim();
  var color  = (typeof colGetSelectedColor === 'function') ? colGetSelectedColor('add') : '';

  var tags = tagsRaw
    .split(',')
    .map(function (t) { return t.trim(); })
    .filter(Boolean);

  return { name: name, slug: slug, tags: tags, author: author, color: color };
}

/* Monta o conteúdo completo do arquivo .js da coleção */
function ghcSaveBuildFileContent(fields) {
  var tagsStr = fields.tags.map(function (t) { return "'" + t + "'"; }).join(', ');

  return (
    '// @ts-nocheck\n' +
    '/* Cole\u00e7\u00e3o: ' + fields.slug + ' */\n' +
    'ColLib.registerCollection({\n' +
    "  slug:   '" + fields.slug   + "',\n" +
    "  name:   '" + fields.name.replace(/'/g, "\\'") + "',\n" +
    '  tags:   [' + tagsStr + '],\n' +
    "  author: '" + (fields.author || '').replace(/'/g, "\\'") + "',\n" +
    "  color:  '" + (fields.color  || '') + "',\n" +
    '});\n' +
    '\n' +
    '/* Layouts desta cole\u00e7\u00e3o — cada item \u00e9 adicionado via modal */\n' +
    "ColLib.registerLayout('" + fields.slug + "', [\n" +
    '\n' +
    ']);\n'
  );
}

/* Caminho do arquivo no repositório */
function ghcSaveFilePath(slug) {
  return 'colecoes/data/' + slug + '.js';
}

/* Verifica se o arquivo já existe no GitHub (GET retorna 404 → não existe) */
function ghcSaveFileExists(slug) {
  var token = ghGetToken();
  var url   = 'https://api.github.com/repos/'
    + GITHUB_CONFIG.OWNER + '/' + GITHUB_CONFIG.REPO
    + '/contents/' + ghcSaveFilePath(slug)
    + '?ref=' + GITHUB_CONFIG.BRANCH;

  return fetch(url, {
    headers: {
      'Authorization': 'token ' + token,
      'Accept': 'application/vnd.github+json',
    }
  }).then(function (res) {
    if (res.status === 404) return false;
    if (res.status === 401) {
      ghSetToken('');
      throw new Error('Token inválido ou expirado. Clique na engrenagem para configurar um novo.');
    }
    if (res.ok) return true;
    throw new Error('Erro ao verificar arquivo (' + res.status + ').');
  });
}

/* Registra o <script> no index.html do repositório (só na primeira vez) */
function ghcSaveRegisterScript(slug) {
  var scriptTag = 'colecoes/data/' + slug + '.js';

  return githubGetFile('index.html').then(function (data) {
    /* Já registrado → não faz nada */
    if (data.content.indexOf(scriptTag) !== -1) return;

    /* Âncora: comentário do bloco de dados de coleções */
    var anchor = '  <!-- <script src="colecoes/data/projetos-2025.js"></script> -->';
    var tag    = '  <script src="' + scriptTag + '"></script>\n';

    var newIndex = data.content.indexOf(anchor) !== -1
      ? data.content.replace(anchor, tag + anchor)
      : data.content; /* fallback silencioso — não quebra se âncora mudou */

    if (newIndex === data.content) return; /* nada a inserir */

    return githubPutFile(
      'index.html',
      newIndex,
      data.sha,
      '[SenkoLib] register collection: ' + slug
    );
  });
}


/* ═══════════════════════════════════════════════════════════════════════
   CORE: Fluxo principal de save
═══════════════════════════════════════════════════════════════════════ */

function ghcSaveNewCollection(fields) {
  if (!ghLockSave()) return Promise.resolve(false);
  if (!ghEnsureToken()) {
    ghUnlockSave();
    ghSetStatus('Token não configurado', 'error');
    return Promise.resolve(false);
  }

  var filePath = ghcSaveFilePath(fields.slug);
  ghSetStatus('Verificando coleção…', 'saving');

  /* 1. Verifica se já existe */
  return ghcSaveFileExists(fields.slug).then(function (exists) {

    if (exists) {
      ghUnlockSave();
      ghSetStatus('Coleção já existe', 'error');
      ghShowErrorModal(
        'Já existe uma coleção com o nome "' + fields.slug + '" no repositório.\n\n' +
        'Escolha outro nome no campo Coleção.'
      );
      return false;
    }

    /* 2. Cria o arquivo */
    ghSetStatus('Criando arquivo…', 'saving');
    var fileContent = ghcSaveBuildFileContent(fields);

    return githubPutFile(
      filePath,
      fileContent,
      null, /* sha null = arquivo novo */
      '[SenkoLib] create collection: ' + fields.slug
    ).then(function () {

      /* 3. Registra o <script> no index.html */
      ghSetStatus('Atualizando index.html…', 'saving');
      return ghcSaveRegisterScript(fields.slug);

    }).then(function () {

      /* 4. Registra em memória */
      ColLib.registerCollection({
        slug:   fields.slug,
        name:   fields.name,
        tags:   fields.tags,
        author: fields.author,
        color:  fields.color,
      });

      ghSetStatus('✓ Coleção criada: ' + filePath, 'ok');
      ghUnlockSave();
      ghStartDeployWatch(filePath);
      return true;

    });

  }).catch(function (e) {
    console.error('[senko-github-col-save] Erro:', e);
    ghSetStatus('Erro: ' + e.message, 'error');
    ghUnlockSave();
    ghShowErrorModal(e.message);
    return false;
  });
}


/* ═══════════════════════════════════════════════════════════════════════
   UI — Injeta botão GitHub no modal de adição de coleção
═══════════════════════════════════════════════════════════════════════ */

function ghcSaveInjectButton() {
  if (document.getElementById('ghcSaveNewColBtn')) return;

  var anchor = document.getElementById('colAddSaveBtn');
  if (!anchor) return;

  var btn       = document.createElement('button');
  btn.id        = 'ghcSaveNewColBtn';
  btn.className = 'btn-github';
  btn.innerHTML = GH_ICON + ' GitHub';
  btn.title     = 'Criar coleção diretamente no repositório GitHub';

  /* Substitui o span âncora pelo botão */
  anchor.parentNode.replaceChild(btn, anchor);

  btn.addEventListener('click', function () {
    /* Valida campos antes de enviar */
    var validation = (typeof colValidateAddForm === 'function')
      ? colValidateAddForm()
      : { allOk: false };

    if (!validation.allOk) {
      /* Dispara validação visual nos campos */
      if (typeof colValidateAddForm === 'function') colValidateAddForm();
      return;
    }

    var fields = ghcSaveReadFields();

    /* Validação extra de segurança (slug não pode estar vazio) */
    if (!fields.slug || fields.slug.length < 2) {
      ghShowErrorModal('Preencha o campo Coleção antes de salvar.');
      return;
    }
    if (!/^[a-z0-9-]+$/.test(fields.slug)) {
      ghShowErrorModal('O campo Coleção contém caracteres inválidos.\nUse apenas letras minúsculas, números e hífen.');
      return;
    }

    btn.textContent = 'Salvando…';
    btn.disabled    = true;

    ghcSaveNewCollection(fields).then(function (result) {
      if (result) {
        btn.innerHTML = GH_ICON + ' Criado!';
        setTimeout(function () {
          if (typeof colCloseAddModal === 'function') colCloseAddModal();
          if (typeof colRenderGrid    === 'function') colRenderGrid();
          /* Atualiza contador da aba */
          var colCount = document.getElementById('tabCountCollections');
          if (colCount) colCount.textContent = ColLib.getCollections().length || '';
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
   INICIALIZAÇÃO — só ativa no GitHub Pages
═══════════════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', function () {
  if (!window.location.hostname.match(/^[^.]+\.github\.io$/i)) return;

  ghcSaveInjectButton();
});
