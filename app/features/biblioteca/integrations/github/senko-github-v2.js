// @ts-nocheck
/*
 * INDEPENDENCIA DE FEATURE:
 * Este modulo GitHub pertence somente a Biblioteca. Ele pode depender de
 * SenkoLib e dos scripts da Biblioteca, mas nenhuma outra feature deve
 * importar ou chamar estas funcoes globais.
 */
/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   senko-github-v2.js â€” MÃ³dulo: salvar direto no GitHub (v2 â€” token seguro)
   â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
   DIFERENÃ‡AS DA v1:
     - Token NÃƒO fica no cÃ³digo-fonte (evita revogaÃ§Ã£o automÃ¡tica do GitHub)
     - Token Ã© pedido via prompt e salvo no localStorage do navegador
     - BotÃ£o de cadeado no header indica estado do token

   CARREGAMENTO:
     O register.js da Biblioteca carrega este mÃ³dulo depois da UI. O
     index.html principal nÃ£o conhece nem inicializa a integraÃ§Ã£o.

   REQUISITOS:
     - Personal Access Token do GitHub com escopo "repo" (classic)
       ou permissÃ£o Contents read/write (fine-grained)
     - Chrome, Edge ou Firefox (qualquer navegador moderno)
     - Funciona direto do GitHub Pages â€” sem Live Server necessÃ¡rio
â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   CONFIG â€” detecÃ§Ã£o automÃ¡tica pelo GitHub Pages URL
   â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
   GitHub Pages usa o padrÃ£o: [owner].github.io/[repo]
   Ex: ygorMartins-webm.github.io/SenkoLib
     â†’ OWNER = 'ygorMartins-webm'
     â†’ REPO  = 'SenkoLib'

   Fallback: localhost / Live Server
     â†’ lÃª do localStorage via modal de configuraÃ§Ã£o estilizado
     â†’ botÃ£o de engrenagem ao lado do cadeado no header
â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */

var GH_CONFIG_KEY = 'senkolib_github_config';
var GH_LAYOUTS_DIR = 'app/features/biblioteca/data/layouts';
var GH_BIBLIOTECA_MANIFEST_PATH = 'app/features/biblioteca/data/manifest.js';

var GITHUB_CONFIG = (function () {
  var hostname = window.location.hostname;
  var pathname = window.location.pathname;

  /* â”€â”€ GitHub Pages: [owner].github.io â”€â”€ */
  var pagesMatch = hostname.match(/^([^.]+)\.github\.io$/i);
  if (pagesMatch) {
    var owner = pagesMatch[1];
    var repo  = pathname.replace(/^\//, '').split('/')[0] || '';
    if (owner && repo) {
      return { OWNER: owner, REPO: repo, BRANCH: 'main', _auto: true };
    }
  }

  /* â”€â”€ Fallback: lÃª do localStorage â”€â”€ */
  try {
    var saved = JSON.parse(localStorage.getItem(GH_CONFIG_KEY) || 'null');
    if (saved && saved.OWNER && saved.REPO) return saved;
  } catch (e) {}

  /* Retorna vazio â€” modal de configuraÃ§Ã£o pedirÃ¡ os dados */
  return { OWNER: '', REPO: '', BRANCH: 'main', _auto: false };
})();

/* Atualiza GITHUB_CONFIG em runtime apÃ³s o usuÃ¡rio salvar pelo modal */
function ghApplyConfig(owner, repo, token) {
  GITHUB_CONFIG.OWNER  = owner;
  GITHUB_CONFIG.REPO   = repo;
  GITHUB_CONFIG.BRANCH = 'main';
  var cfg = { OWNER: owner, REPO: repo, BRANCH: 'main' };
  try { localStorage.setItem(GH_CONFIG_KEY, JSON.stringify(cfg)); } catch (e) {}
  if (token) ghSetToken(token);
  if (window.SenkoShell && typeof window.SenkoShell.refreshGithubButton === 'function') {
    window.SenkoShell.refreshGithubButton();
  }
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   TOKEN â€” gerenciamento via localStorage
   O token NUNCA fica no cÃ³digo-fonte. Fica salvo no navegador do usuÃ¡rio.
â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */

var GH_TOKEN_KEY = 'senkolib_github_token';
var ghOpenConfigModalHandler = null;
var ghUpdateConfigButtonHandler = null;

function ghGetToken() {
  return localStorage.getItem(GH_TOKEN_KEY) || '';
}

function ghSetToken(token) {
  if (token) {
    localStorage.setItem(GH_TOKEN_KEY, token.trim());
  } else {
    localStorage.removeItem(GH_TOKEN_KEY);
  }
  if (window.SenkoShell && typeof window.SenkoShell.refreshGithubButton === 'function') {
    window.SenkoShell.refreshGithubButton();
  }
}

function ghEnsureToken() {
  var token = ghGetToken();
  var hasRepository = Boolean(GITHUB_CONFIG.OWNER && GITHUB_CONFIG.REPO);
  if (token && hasRepository) return token;

  /*
   * Este ponto protege todas as operacoes de layouts e variantes. Nenhuma
   * chamada incompleta deve chegar a API sem explicar o que esta faltando.
   */
  setTimeout(function () {
    ghShowConfigurationRequired(token ? 'repository' : 'token');
  }, 0);
  return '';
}

/*
 * Nome legado mantido porque os modulos de variantes e exclusao usam este
 * contrato. O indicador atual e a engrenagem de configuracao.
 */
function ghUpdateLockButton() {
  if (ghUpdateConfigButtonHandler) ghUpdateConfigButtonHandler();
}





/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   UTILITÃRIOS DE ENCODING UTF-8 SEGURO
â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */

function ghEncodeBase64(str) {
  return btoa(unescape(encodeURIComponent(str)));
}

function ghDecodeBase64(b64) {
  return decodeURIComponent(escape(atob(b64)));
}


/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   STATUS â€” atualiza o span #ghStatus (agora sÃ³ no console, sem barra)
â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */

function ghSetStatus(msg, type) {
  var el = document.getElementById('ghStatus');
  if (el) {
    el.textContent = msg;
    el.className = 'gh-status-text' + (type ? ' gh-status-' + type : '');
  }
  if (type === 'error') console.warn('[senko-github]', msg);
  if (type === 'ok') console.log('[senko-github]', msg);
}


/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   API BASE â€” GitHub Contents API
â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */

function githubGetFile(path) {
  var token = ghGetToken();
  var url = 'https://api.github.com/repos/'
    + GITHUB_CONFIG.OWNER + '/'
    + GITHUB_CONFIG.REPO  + '/contents/'
    + path + '?ref=' + GITHUB_CONFIG.BRANCH;

  return fetch(url, {
    headers: {
      'Authorization': 'token ' + token,
      'Accept': 'application/vnd.github+json'
    }
  }).then(function (res) {
    if (res.status === 401) {
      ghSetToken('');
      ghUpdateLockButton();
      throw new Error('Token invÃ¡lido ou expirado. Clique no cadeado para inserir um novo.');
    }
    return res.json().then(function (data) {
      if (!res.ok) {
        throw new Error('GitHub GET falhou (' + res.status + '): ' + (data.message || path));
      }
      var raw = (data.content || '').replace(/\n/g, '');
      return {
        content: ghDecodeBase64(raw),
        sha:     data.sha
      };
    });
  });
}

function githubPutFile(path, content, sha, commitMsg) {
  var token = ghGetToken();
  var url = 'https://api.github.com/repos/'
    + GITHUB_CONFIG.OWNER + '/'
    + GITHUB_CONFIG.REPO  + '/contents/'
    + path;

  var body = {
    message: commitMsg,
    content: ghEncodeBase64(content),
    branch:  GITHUB_CONFIG.BRANCH
  };
  if (sha) body.sha = sha;

  return fetch(url, {
    method:  'PUT',
    headers: {
      'Authorization': 'token ' + token,
      'Accept':        'application/vnd.github+json',
      'Content-Type':  'application/json'
    },
    body: JSON.stringify(body)
  }).then(function (res) {
    if (res.status === 401) {
      ghSetToken('');
      ghUpdateLockButton();
      throw new Error('Token invÃ¡lido ou expirado. Clique no cadeado para configurar um novo.');
    }
    return res.json().then(function (data) {
      if (!res.ok) {
        throw new Error('GitHub PUT falhou (' + res.status + '): ' + (data.message || path));
      }
      return data;
    });
  });
}

function githubListDir(path) {
  var token = ghGetToken();
  var url = 'https://api.github.com/repos/'
    + GITHUB_CONFIG.OWNER + '/'
    + GITHUB_CONFIG.REPO  + '/contents/'
    + path + '?ref=' + GITHUB_CONFIG.BRANCH;

  return fetch(url, {
    headers: {
      'Authorization': 'token ' + token,
      'Accept': 'application/vnd.github+json'
    }
  }).then(function (res) {
    if (res.status === 401) {
      ghSetToken('');
      ghUpdateLockButton();
      throw new Error('Token invÃ¡lido ou expirado. Clique no cadeado para configurar um novo.');
    }
    return res.json().then(function (data) {
      if (!res.ok) {
        throw new Error('GitHub LIST falhou (' + res.status + '): ' + (data.message || path));
      }
      return data.map(function (item) {
        return { name: item.name, path: item.path, sha: item.sha, type: item.type };
      });
    });
  });
}


/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   PARSER â€” localiza e substitui objetos de layout
â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */






/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   RACE CONDITION GUARD
   Impede que duas operaÃ§Ãµes de escrita no GitHub ocorram simultaneamente.
   Cada operaÃ§Ã£o verifica e seta _ghSaving antes de prosseguir.
â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
var _ghSaving = false;
var _ghSavingTimeout = null;

function ghLockSave() {
  if (_ghSaving) {
    ghShowErrorModal('JÃ¡ existe uma operaÃ§Ã£o em andamento. Aguarde terminar antes de salvar novamente.');
    return false;
  }
  _ghSaving = true;
  _ghSavingTimeout = setTimeout(function () {
    console.warn('[senko-github] Lock liberado por timeout de seguranÃ§a.');
    _ghSaving = false;
  }, 30000);
  return true;
}

function ghUnlockSave() {
  _ghSaving = false;
  if (_ghSavingTimeout) {
    clearTimeout(_ghSavingTimeout);
    _ghSavingTimeout = null;
  }
}

function ghParseBibliotecaManifest(content) {
  var assignment = 'window.SenkoBibliotecaManifest';
  var assignmentIndex = content.indexOf(assignment);
  var equalsIndex = content.indexOf('=', assignmentIndex);
  var source = equalsIndex === -1
    ? ''
    : content.slice(equalsIndex + 1).trim().replace(/;\s*$/, '');

  if (assignmentIndex === -1 || !source) {
    throw new Error('Formato do catalogo da Biblioteca nao reconhecido.');
  }
  return JSON.parse(source);
}

function ghSerializeBibliotecaManifest(manifest) {
  return (
    '/* Catalogo privado da Biblioteca. Atualizado pela integracao GitHub. */\n' +
    'window.SenkoBibliotecaManifest = ' +
    JSON.stringify(manifest, null, 2) +
    ';\n'
  );
}

function ghReadBibliotecaManifest() {
  return githubGetFile(GH_BIBLIOTECA_MANIFEST_PATH).then(function (data) {
    return {
      content: data.content,
      sha: data.sha,
      manifest: ghParseBibliotecaManifest(data.content)
    };
  });
}

function ghFindLayoutManifestEntry(layoutId) {
  var normalizedId = String(layoutId || '').toLowerCase();
  return ghReadBibliotecaManifest().then(function (info) {
    var layouts = Array.isArray(info.manifest.layouts) ? info.manifest.layouts : [];
    for (var i = 0; i < layouts.length; i++) {
      var entry = layouts[i];
      if (entry && typeof entry === 'object' && entry.file && String(entry.id || '').toLowerCase() === normalizedId) {
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

function ghSetLayoutManifestEntry(layoutId, file, name, shouldInclude) {
  var normalizedId = String(layoutId || '').toLowerCase();
  return ghReadBibliotecaManifest().then(function (info) {
    var manifest = info.manifest;
    if (!Array.isArray(manifest.layouts)) manifest.layouts = [];

    var index = -1;
    for (var i = 0; i < manifest.layouts.length; i++) {
      var current = manifest.layouts[i];
      if (current && typeof current === 'object' && String(current.id || '').toLowerCase() === normalizedId) {
        index = i;
        break;
      }
    }

    if (shouldInclude) {
      var entry = {
        file: file,
        id: normalizedId,
        name: name || normalizedId
      };
      if (index === -1) manifest.layouts.push(entry);
      else manifest.layouts[index] = entry;
    } else if (index !== -1) {
      manifest.layouts.splice(index, 1);
    }

    if (!shouldInclude && index === -1) return GH_BIBLIOTECA_MANIFEST_PATH;

    return githubPutFile(
      GH_BIBLIOTECA_MANIFEST_PATH,
      ghSerializeBibliotecaManifest(manifest),
      info.sha,
      shouldInclude
        ? '[SenkoLib] register layout file: ' + normalizedId
        : '[SenkoLib] unregister layout file: ' + normalizedId
    ).then(function () {
      window.SenkoBibliotecaManifest = manifest;
      return GH_BIBLIOTECA_MANIFEST_PATH;
    });
  });
}

function ghSingleLayoutObjectCode(objectCode) {
  var code = String(objectCode || '').trim();
  var registerPrefix = 'SenkoLib.registerLayout(';
  if (code.indexOf(registerPrefix) === 0) {
    code = code.slice(registerPrefix.length).trim();
    code = code.replace(/\);\s*$/, '').trim();
  }
  code = code.replace(/^\/\*\s*variantes:[\s\S]*?\*\/\s*/, '');
  code = code.replace(/,\s*$/, '');
  return code;
}

function ghBuildSingleLayoutFileContent(objectCode) {
  return (
    '// @ts-nocheck\n' +
    'SenkoLib.registerLayout(\n' +
    ghSingleLayoutObjectCode(objectCode) +
    '\n);\n'
  );
}

function ghValidateSingleLayoutFileContent(content, expectedId) {
  var registered = null;
  var fakeSenkoLib = {
    registerLayout: function (layout) {
      registered = layout;
      return true;
    }
  };

  try {
    new Function('SenkoLib', content)(fakeSenkoLib);
  } catch (error) {
    throw new Error('O JS do layout foi gerado com erro de sintaxe: ' + error.message);
  }

  if (!registered || !registered.id || !registered.name) {
    throw new Error('O arquivo do layout nao chamou SenkoLib.registerLayout com id e name.');
  }

  if (expectedId && String(registered.id).toLowerCase() !== String(expectedId).toLowerCase()) {
    throw new Error('O id registrado no arquivo ("' + registered.id + '") nao bate com o id criado ("' + expectedId + '").');
  }

  return registered;
}

function ghUpdateLayoutMemory(layoutId, name) {
  var editorData = window.SenkoLayoutEditor
    && typeof window.SenkoLayoutEditor.getCurrentData === 'function'
    ? window.SenkoLayoutEditor.getCurrentData()
    : null;
  if (editorData && editorData.mode === 'layout'
      && String(editorData.id || '').toLowerCase() === String(layoutId || '').toLowerCase()) {
    SenkoLib.updateLayout(layoutId, {
      name: editorData.name,
      tags: editorData.tags || [],
      html: editorData.html || '',
      css: editorData.css || ''
    });
    return;
  }

  var editTags = document.getElementById('editTags');
  var editHtml = document.getElementById('editHtml');
  var editCss  = document.getElementById('editCss');
  SenkoLib.updateLayout(layoutId, {
    name: name,
    tags: editTags
      ? (typeof senkoParseMetadataTags === 'function'
        ? senkoParseMetadataTags(editTags.value)
        : editTags.value.split(',').map(function (t) { return t.trim(); }).filter(Boolean))
      : [],
    html: editHtml ? editHtml.value : '',
    css: editCss ? editCss.value : ''
  });
}


/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   CORE: Salvar layout existente
â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */

function githubSaveLayout(layoutId, objectCode) {
  var editorData = window.SenkoLayoutEditor
    && typeof window.SenkoLayoutEditor.getCurrentData === 'function'
    ? window.SenkoLayoutEditor.getCurrentData()
    : null;
  var editName = document.getElementById('editName');
  var nextName = editorData && editorData.mode === 'layout'
    && String(editorData.id || '').toLowerCase() === String(layoutId || '').toLowerCase()
    ? editorData.name
    : editName
    ? (typeof senkoGetMetadataInputValue === 'function'
      ? senkoGetMetadataInputValue('editName', false).trim()
      : editName.value.trim())
    : '';
  if (typeof senkoLayoutNameExists === 'function'
      && senkoLayoutNameExists(nextName, layoutId)) {
    ghShowErrorModal('Ja existe outro layout com o nome "' + nextName + '". Escolha outro nome.');
    return Promise.resolve(false);
  }

  if (!ghLockSave()) return Promise.resolve(false);
  if (!ghEnsureToken()) {
    ghUnlockSave();
    ghSetStatus('Token nao configurado', 'error');
    return Promise.resolve(false);
  }

  ghSetStatus('Buscando arquivo...', 'saving');

  return ghFindLayoutManifestEntry(layoutId).then(function (manifestEntry) {
    if (!manifestEntry) return null;

    ghSetStatus('Lendo arquivo individual...', 'saving');
    return githubGetFile(manifestEntry.path).then(function (data) {
      ghSetStatus('Salvando no GitHub...', 'saving');
      var nextContent = ghBuildSingleLayoutFileContent(objectCode);
      ghValidateSingleLayoutFileContent(nextContent, layoutId);

      return githubPutFile(
        manifestEntry.path,
        nextContent,
        data.sha,
        '[SenkoLib] edit layout file: ' + layoutId
      ).then(function () {
        ghUpdateLayoutMemory(layoutId, nextName);
        ghSetStatus('Salvo em ' + manifestEntry.entry.file, 'ok');
        ghUnlockSave();
        ghStartDeployWatch(manifestEntry.path);
        renderGrid();
        return manifestEntry.entry.file;
      });
    });
  }).then(function (directResult) {
    if (directResult) return directResult;

    ghSetStatus('Layout fora do manifesto', 'error');
    ghShowErrorModal('Layout "' + layoutId + '" nao possui arquivo individual no manifest da Biblioteca.');
    ghUnlockSave();
    return false;
  }).catch(function (e) {
    console.error('[senko-github] Erro ao salvar layout:', e);
    ghSetStatus('Erro: ' + e.message, 'error');
    ghUnlockSave();
    ghShowErrorModal(e.message);
    return false;
  });
}


/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   CORE: Salvar novo layout em arquivo existente
â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */

function githubSaveNewLayout(fileName, objectCode, layoutId) {
  var addName = document.getElementById('addName');
  var nextName = addName
    ? (typeof senkoGetMetadataInputValue === 'function'
      ? senkoGetMetadataInputValue('addName', false).trim()
      : addName.value.trim())
    : layoutId;
  if (typeof senkoLayoutNameExists === 'function'
      && senkoLayoutNameExists(nextName, null)) {
    ghShowErrorModal('Ja existe um layout com o nome "' + nextName + '". Escolha outro nome.');
    return Promise.resolve(false);
  }

  if (!ghLockSave()) return Promise.resolve(false);
  if (!ghEnsureToken()) {
    ghUnlockSave();
    ghSetStatus('Token nao configurado', 'error');
    return Promise.resolve(false);
  }

  var normalizedId = String(layoutId || '').toLowerCase();
  var individualFile = 'layouts/' + normalizedId + '.js';
  var individualPath = 'app/features/biblioteca/data/' + individualFile;
  var nextContent;

  try {
    nextContent = ghBuildSingleLayoutFileContent(objectCode);
    ghValidateSingleLayoutFileContent(nextContent, normalizedId);
  } catch (validationError) {
    ghSetStatus('JS invalido', 'error');
    ghShowErrorModal(validationError.message);
    return Promise.resolve(false);
  }

  ghSetStatus('Criando arquivo individual...', 'saving');

  return githubGetFile(individualPath).then(function () {
    ghSetStatus('Arquivo ja existe', 'error');
    ghUnlockSave();
    ghShowErrorModal('Ja existe um arquivo individual para "' + normalizedId + '". Use editar no card para modificar este layout.');
    return false;
  }).catch(function (error) {
    if (!error.message || error.message.indexOf('404') === -1) throw error;

    return githubPutFile(
      individualPath,
      nextContent,
      null,
      '[SenkoLib] add layout file: ' + normalizedId
    ).then(function () {
      var addHtml = document.getElementById('addHtml');
      var addCss  = document.getElementById('addCss');
      var addName = document.getElementById('addName');
      var addTags = document.getElementById('addTags');
      var html = addHtml ? addHtml.value : '';
      var css  = addCss  ? addCss.value  : '';
      var name = addName
        ? (typeof senkoGetMetadataInputValue === 'function'
          ? senkoGetMetadataInputValue('addName', false).trim()
          : addName.value.trim())
        : layoutId;
      var tags = addTags
        ? (typeof senkoParseMetadataTags === 'function'
          ? senkoParseMetadataTags(addTags.value)
          : addTags.value.split(',').map(function (t) { return t.trim(); }).filter(Boolean))
        : [];

      return ghSetLayoutManifestEntry(normalizedId, individualFile, name, true).then(function () {
        SenkoLib.registerLayout({ id: normalizedId, name: name, tags: tags, html: html, css: css });
        state.search = '';
        var searchInput = document.getElementById('searchInput');
        if (searchInput) searchInput.value = '';
        ghSetStatus('Salvo em ' + individualPath, 'ok');
        ghUnlockSave();
        ghStartDeployWatch(individualPath);
        renderGrid();
        return individualFile;
      });
    });
  }).catch(function (e) {
    console.error('[senko-github] Erro ao salvar novo layout:', e);
    ghSetStatus('Erro: ' + e.message, 'error');
    ghUnlockSave();
    ghShowErrorModal(e.message);
    return false;
  });
}





/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   DEPLOY WATCH â€” bolinha de status no header
   Aparece quando qualquer save Ã© feito com sucesso.
   Desaparece quando o GitHub Pages confirma o deploy como "success".
â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
var _ghDeployPollTimer = null;
var GH_DEPLOY_KEY      = 'senkolib_deploy_watching';
var GH_DEPLOY_INTERVAL = 5000;
var GH_DEPLOY_TIMEOUT  = 300000; /* 5 minutos mÃ¡ximo */

function ghShowDeployDot() {
  var dot = document.getElementById('ghDeployDot');
  if (dot) {
    dot.hidden = false;
    dot.style.display = 'flex';
  }
}

function ghHideDeployDot() {
  var dot = document.getElementById('ghDeployDot');
  if (dot) {
    dot.hidden = true;
    dot.style.display = 'none';
  }
}

function ghStopDeployWatch() {
  if (_ghDeployPollTimer) {
    clearInterval(_ghDeployPollTimer);
    _ghDeployPollTimer = null;
  }
  ghHideDeployDot();
  try { localStorage.removeItem(GH_DEPLOY_KEY); } catch(e) {}
}

/* Busca o arquivo raw no GitHub Pages sem cache e retorna o conteÃºdo */
function ghFetchRaw(filePath) {
  var base = window.location.origin + '/' + GITHUB_CONFIG.REPO + '/';
  var url  = base + filePath + '?_=' + Date.now();
  return fetch(url, { cache: 'no-store' })
    .then(function (res) { return res.ok ? res.text() : null; })
    .catch(function () { return null; });
}

function ghStartDeployWatch(filePath) {
  if (_ghDeployPollTimer) {
    clearInterval(_ghDeployPollTimer);
    _ghDeployPollTimer = null;
  }

  ghShowDeployDot();

  /* Captura o tamanho ATUAL do arquivo antes do GitHub Pages atualizar */
  ghFetchRaw(filePath).then(function (oldContent) {
    var oldSize  = oldContent ? oldContent.length : -1;
    var startTs  = Date.now();

    try {
      localStorage.setItem(GH_DEPLOY_KEY, JSON.stringify({
        ts:      startTs,
        file:    filePath,
        oldSize: oldSize
      }));
    } catch(e) {}

    _ghDeployPollTimer = setInterval(function () {
      if (Date.now() - startTs > GH_DEPLOY_TIMEOUT) {
        ghStopDeployWatch();
        return;
      }

      ghFetchRaw(filePath).then(function (newContent) {
        var newSize = newContent ? newContent.length : -1;
        if (newSize !== -1 && newSize !== oldSize) {
          ghStopDeployWatch();
        }
      });

    }, GH_DEPLOY_INTERVAL);
  });
}

function ghResumeDeployWatchIfNeeded() {
  var stored;
  try { stored = localStorage.getItem(GH_DEPLOY_KEY); } catch(e) { return; }
  if (!stored) return;

  var data;
  try { data = JSON.parse(stored); } catch(e) {
    try { localStorage.removeItem(GH_DEPLOY_KEY); } catch(e2) {}
    return;
  }

  if (!data.ts || !data.file) {
    try { localStorage.removeItem(GH_DEPLOY_KEY); } catch(e) {}
    return;
  }

  /* Expirado */
  if (Date.now() - data.ts > GH_DEPLOY_TIMEOUT) {
    try { localStorage.removeItem(GH_DEPLOY_KEY); } catch(e) {}
    return;
  }

  ghShowDeployDot();

  var startTs  = data.ts;
  var filePath = data.file;
  var oldSize  = data.oldSize !== undefined ? data.oldSize : -1;

  _ghDeployPollTimer = setInterval(function () {
    if (Date.now() - startTs > GH_DEPLOY_TIMEOUT) {
      ghStopDeployWatch();
      return;
    }

    ghFetchRaw(filePath).then(function (newContent) {
      var newSize = newContent ? newContent.length : -1;
      if (newSize !== -1 && newSize !== oldSize) {
        ghStopDeployWatch();
      }
    });

  }, GH_DEPLOY_INTERVAL);
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   UI â€” BotÃ£o cadeado + botÃµes GitHub nos modais
â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */

var GH_ICON = '<svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>';


/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   MODAL DE ERRO â€” substitui window.alert para erros do GitHub
   Mesmo estilo visual do modal de confirmaÃ§Ã£o de exclusÃ£o.
â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */

var _ghErrorModalReady = false;

function ghEnsureErrorModal() {
  if (_ghErrorModalReady) return;
  _ghErrorModalReady = true;

  /* â”€â”€ Estilos â”€â”€ */
  var style = document.createElement('style');
  style.textContent = [
    '#ghErrorOverlay {',
    '  position: fixed; inset: 0;',
    '  background: rgba(0,0,0,.55);',
    '  backdrop-filter: blur(3px);',
    '  display: flex; align-items: center; justify-content: center;',
    '  z-index: 10000; padding: 1rem;',
    '}',
    '#ghErrorOverlay.gh-hidden { display: none; }',
    '#ghErrorModal {',
    '  background: var(--card, #fff);',
    '  border: 1.5px solid var(--border, #e2e8f0);',
    '  border-radius: calc(var(--radius, 8px) * 1.5);',
    '  padding: 2rem;',
    '  width: 100%; max-width: 420px;',
    '  display: flex; flex-direction: column; align-items: center;',
    '  gap: 1rem; text-align: center;',
    '  box-shadow: 0 20px 60px rgba(0,0,0,.18);',
    '}',
    '#ghErrorIcon {',
    '  width: 60px; height: 60px; border-radius: 50%;',
    '  background: #fef3c7; color: #d97706;',
    '  display: flex; align-items: center; justify-content: center;',
    '  flex-shrink: 0;',
    '}',
    '#ghErrorTitle {',
    '  font-family: var(--font-body, sans-serif);',
    '  font-size: 1.1rem; font-weight: 800;',
    '  color: var(--text1, #0f172a); margin: 0;',
    '}',
    '#ghErrorDesc {',
    '  font-family: var(--font-body, sans-serif);',
    '  font-size: .875rem; color: var(--text2, #64748b);',
    '  line-height: 1.55; margin: 0;',
    '  word-break: break-word;',
    '}',
    '#ghErrorDesc strong { color: var(--text1, #0f172a); }',
    '#ghErrorHint {',
    '  font-family: var(--font-body, sans-serif);',
    '  font-size: .8rem; color: var(--text3, #94a3b8);',
    '  background: var(--bg, #f8fafc);',
    '  border: 1px solid var(--border, #e2e8f0);',
    '  border-radius: var(--radius, 6px);',
    '  padding: .6rem .85rem;',
    '  width: 100%; text-align: left; line-height: 1.5;',
    '  display: none;',
    '}',
    '#ghErrorHint.visible { display: block; }',
    '#ghErrorActions { display: flex; gap: .6rem; width: 100%; margin-top: .25rem; }',
    '#ghErrorReloadBtn {',
    '  flex: 1;',
    '  display: inline-flex; align-items: center; justify-content: center; gap: .4rem;',
    '  padding: .6rem 1rem;',
    '  background: var(--accent, #6366f1); color: #fff;',
    '  border: 1.5px solid var(--accent, #6366f1);',
    '  border-radius: var(--radius, 8px);',
    '  font-family: var(--font-body, sans-serif);',
    '  font-size: .85rem; font-weight: 700;',
    '  cursor: pointer; transition: background .15s, border-color .15s;',
    '  display: none;',
    '}',
    '#ghErrorReloadBtn.visible { display: inline-flex; }',
    '#ghErrorReloadBtn:hover { filter: brightness(1.1); }',
    '#ghErrorConfigBtn {',
    '  flex: 1;',
    '  display: none; align-items: center; justify-content: center;',
    '  padding: .6rem 1rem;',
    '  background: var(--accent, #ff6b00); color: #fff;',
    '  border: 1.5px solid var(--accent, #ff6b00);',
    '  border-radius: var(--radius, 8px);',
    '  font-family: var(--font-body, sans-serif);',
    '  font-size: .85rem; font-weight: 700;',
    '  cursor: pointer;',
    '}',
    '#ghErrorConfigBtn.visible { display: inline-flex; }',
    '#ghErrorConfigBtn:hover { filter: brightness(1.08); }',
    '#ghErrorOkBtn {',
    '  flex: 1;',
    '  padding: .6rem 1rem;',
    '  background: var(--bg, #f8fafc); color: var(--text2, #64748b);',
    '  border: 1.5px solid var(--border, #e2e8f0);',
    '  border-radius: var(--radius, 8px);',
    '  font-family: var(--font-body, sans-serif);',
    '  font-size: .85rem; font-weight: 700;',
    '  cursor: pointer; transition: background .15s, border-color .15s;',
    '}',
    '#ghErrorOkBtn:hover { background: var(--hover, #f1f5f9); border-color: var(--text3, #94a3b8); }',
  ].join('\n');
  document.head.appendChild(style);

  /* â”€â”€ HTML â”€â”€ */
  var overlay = document.createElement('div');
  overlay.id        = 'ghErrorOverlay';
  overlay.className = 'gh-hidden';
  overlay.innerHTML = [
    '<div id="ghErrorModal">',
    '  <div id="ghErrorIcon">',
    '    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="28" height="28">',
    '      <circle cx="12" cy="12" r="10"/>',
    '      <line x1="12" y1="8" x2="12" y2="12"/>',
    '      <line x1="12" y1="16" x2="12.01" y2="16"/>',
    '    </svg>',
    '  </div>',
    '  <h3 id="ghErrorTitle">NÃ£o foi possÃ­vel salvar</h3>',
    '  <p id="ghErrorDesc"></p>',
    '  <p id="ghErrorHint"></p>',
    '  <div id="ghErrorActions">',
    '    <button id="ghErrorReloadBtn">',
    '      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="13" height="13">',
    '        <polyline points="23 4 23 10 17 10"/>',
    '        <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>',
    '      </svg>',
    '      Recarregar pÃ¡gina',
    '    </button>',
    '    <button id="ghErrorConfigBtn">Configurar GitHub</button>',
    '    <button id="ghErrorOkBtn">Entendi</button>',
    '  </div>',
    '</div>',
  ].join('\n');
  document.body.appendChild(overlay);

  document.getElementById('ghErrorOkBtn').addEventListener('click', ghCloseErrorModal);
  document.getElementById('ghErrorReloadBtn').addEventListener('click', function () {
    window.location.reload();
  });
  document.getElementById('ghErrorConfigBtn').addEventListener('click', function () {
    ghCloseErrorModal();
    if (ghOpenConfigModalHandler) ghOpenConfigModalHandler();
  });
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) ghCloseErrorModal();
  });
}

function ghCloseErrorModal() {
  var overlay = document.getElementById('ghErrorOverlay');
  if (overlay) overlay.classList.add('gh-hidden');
  document.body.style.overflow = '';
}

function ghShowErrorModal(rawMessage) {
  ghEnsureErrorModal();

  var is409    = rawMessage && rawMessage.indexOf('409') !== -1;
  var titleEl  = document.getElementById('ghErrorTitle');
  var descEl   = document.getElementById('ghErrorDesc');
  var hintEl   = document.getElementById('ghErrorHint');
  var reloadBtn = document.getElementById('ghErrorReloadBtn');
  var configBtn = document.getElementById('ghErrorConfigBtn');
  var iconEl   = document.getElementById('ghErrorIcon');

  configBtn.classList.remove('visible');

  if (is409) {
    /* Conflito de SHA â€” outra pessoa salvou antes */
    titleEl.textContent  = 'Conflito de versÃ£o (409)';
    descEl.innerHTML     = 'O arquivo foi modificado por <strong>outra pessoa</strong> desde a Ãºltima vez que vocÃª o carregou.<br>Suas alteraÃ§Ãµes nÃ£o foram salvas para nÃ£o sobrescrever o trabalho dela.';
    hintEl.textContent   = 'ðŸ’¡ Recarregue a pÃ¡gina para buscar a versÃ£o mais recente e tente salvar novamente.';
    hintEl.classList.add('visible');
    reloadBtn.classList.add('visible');
    iconEl.style.background = '#fef3c7';
    iconEl.style.color      = '#d97706';
  } else {
    /* Erro genÃ©rico */
    titleEl.textContent  = 'Erro ao salvar no GitHub';
    descEl.textContent   = rawMessage || 'Ocorreu um erro inesperado.';
    hintEl.classList.remove('visible');
    reloadBtn.classList.remove('visible');
    iconEl.style.background = '#fee2e2';
    iconEl.style.color      = '#ef4444';
  }

  var overlay = document.getElementById('ghErrorOverlay');
  overlay.classList.remove('gh-hidden');
  document.body.style.overflow = 'hidden';
}

function ghShowConfigurationRequired(missingPart) {
  ghEnsureErrorModal();

  var titleEl   = document.getElementById('ghErrorTitle');
  var descEl    = document.getElementById('ghErrorDesc');
  var hintEl    = document.getElementById('ghErrorHint');
  var reloadBtn = document.getElementById('ghErrorReloadBtn');
  var configBtn = document.getElementById('ghErrorConfigBtn');
  var iconEl    = document.getElementById('ghErrorIcon');

  titleEl.textContent = 'GitHub nao configurado';
  descEl.textContent = missingPart === 'repository'
    ? 'Informe o usuario e o repositorio antes de salvar alteracoes da Biblioteca.'
    : 'Adicione um token do GitHub para criar, editar ou excluir layouts e variantes.';
  hintEl.textContent =
    'O token fica salvo somente neste navegador e precisa ter permissao de leitura e escrita no repositorio.';
  hintEl.classList.add('visible');
  reloadBtn.classList.remove('visible');
  configBtn.classList.add('visible');
  iconEl.style.background = '#fff3e8';
  iconEl.style.color = 'var(--accent, #ff6b00)';

  document.getElementById('ghErrorOverlay').classList.remove('gh-hidden');
  document.body.style.overflow = 'hidden';
}

function initSenkoBibliotecaGithubV2() {
  if (initSenkoBibliotecaGithubV2.initialized) return;
  initSenkoBibliotecaGithubV2.initialized = true;

  /* â”€â”€â”€ SÃ³ executa no GitHub Pages â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
     Em qualquer outro ambiente (localhost, Live Server,
     servidor externo, file://) este mÃ³dulo inteiro fica
     inativo â€” nenhum botÃ£o, engrenagem ou elemento GitHub
     Ã© criado na interface.
  â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
  if (!window.location.hostname.match(/^[^.]+\.github\.io$/i)) return;

  var style = document.createElement('style');
  style.textContent = [
    /* Status text (hidden, only used internally) */
    '.gh-status-text { display: none; }',
    /* GitHub buttons in modals */
    '.btn-github {',
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
    '.btn-github:hover { background: #30363d; border-color: #8b949e; }',
    '.btn-github:active { background: #161b22; }',
    '.gh-auto-group {',
    '  display: inline-flex;',
    '  align-items: center;',
    '  gap: .4rem;',
    '}',
    /* Bolinha de deploy */
    '#ghDeployDot {',
    '  display: none;',
    '  align-items: center;',
    '  justify-content: center;',
    '  width: 10px;',
    '  height: 10px;',
    '  border-radius: 50%;',
    '  background: #e3a008;',
    '  box-shadow: 0 0 0 0 rgba(227,160,8,.6);',
    '  animation: ghDeployPulse 1.4s ease-in-out infinite;',
    '  flex-shrink: 0;',
    '  margin-right: .25rem;',
    '}',
    '@keyframes ghDeployPulse {',
    '  0%   { box-shadow: 0 0 0 0 rgba(227,160,8,.6); }',
    '  70%  { box-shadow: 0 0 0 7px rgba(227,160,8,0); }',
    '  100% { box-shadow: 0 0 0 0 rgba(227,160,8,0); }',
    '}',
  ].join('\n');
  document.head.appendChild(style);

  /* â”€â”€â”€ Modal de configuraÃ§Ã£o (owner + repo + token) â”€â”€â”€ */
  (function () {
    var overlay = document.createElement('div');
    overlay.id        = 'ghConfigOverlay';
    overlay.className = 'gh-config-hidden';
    overlay.innerHTML = [
      '<div id="ghConfigModal">',
      '  <div id="ghConfigHeader">',
      '    <div>',
      '      <h3 id="ghConfigTitle">ConfiguraÃ§Ã£o do GitHub</h3>',
      '      <p id="ghConfigSubtitle">Preencha os dados do repositÃ³rio onde o SenkoLib estÃ¡ hospedado.</p>',
      '    </div>',
      '    <button id="ghConfigCloseBtn" title="Fechar">âœ•</button>',
      '  </div>',
      '  <div class="gh-config-fields">',
      '    <div class="gh-config-field">',
      '      <label for="ghConfigOwner">UsuÃ¡rio / OrganizaÃ§Ã£o <span class="gh-req">*</span></label>',
      '      <input type="text" id="ghConfigOwner" placeholder="ex: meu-usuario" autocomplete="off" />',
      '      <span class="gh-field-desc">Nome da conta GitHub dona do repositÃ³rio</span>',
      '    </div>',
      '    <div class="gh-config-field">',
      '      <label for="ghConfigRepo">RepositÃ³rio <span class="gh-req">*</span></label>',
      '      <input type="text" id="ghConfigRepo" placeholder="ex: SenkoLib" autocomplete="off" />',
      '      <span class="gh-field-desc">Nome exato do repositÃ³rio no GitHub</span>',
      '    </div>',
      '    <div class="gh-config-field">',
      '      <label for="ghConfigToken">Personal Access Token <span class="gh-req">*</span></label>',
      '      <input type="password" id="ghConfigToken" placeholder="ghp_â€¦" autocomplete="off" />',
      '      <span class="gh-field-desc">Token com permissÃ£o <code>repo</code> (classic) ou <code>Contents read/write</code> (fine-grained). <a href="https://github.com/settings/tokens" target="_blank" rel="noopener">Gerar token â†—</a></span>',
      '    </div>',
      '  </div>',
      '  <div id="ghConfigError" class="gh-config-error gh-config-hidden"></div>',
      '  <div id="ghConfigActions">',
      '    <button id="ghConfigResetBtn" class="gh-config-reset-btn" title="Limpar configuraÃ§Ã£o salva">Redefinir</button>',
      '    <button id="ghConfigSaveBtn" class="gh-config-save-btn">Verificar e salvar</button>',
      '  </div>',
      '</div>',
    ].join('\n');
    document.body.appendChild(overlay);

    /* Estilos do modal de configuraÃ§Ã£o */
    var cfgStyle = document.createElement('style');
    cfgStyle.textContent = [
      '#ghConfigOverlay {',
      '  position: fixed; inset: 0;',
      '  background: rgba(0,0,0,.55);',
      '  backdrop-filter: blur(3px);',
      '  display: flex; align-items: center; justify-content: center;',
      '  z-index: 9999; padding: 1rem;',
      '}',
      '#ghConfigOverlay.gh-config-hidden { display: none; }',
      '#ghConfigModal {',
      '  background: var(--bg, #fff);',
      '  border: 1.5px solid var(--border, #e2e8f0);',
      '  border-radius: calc(var(--radius, 8px) * 1.5);',
      '  padding: 2rem;',
      '  width: 100%; max-width: 460px;',
      '  display: flex; flex-direction: column; gap: 1.25rem;',
      '  box-shadow: 0 20px 60px rgba(0,0,0,.18);',
      '}',
      '#ghConfigHeader {',
      '  display: flex; align-items: flex-start;',
      '  justify-content: space-between; gap: 1rem;',
      '}',
      '#ghConfigTitle {',
      '  font-family: var(--font-body, sans-serif);',
      '  font-size: 1.1rem; font-weight: 800;',
      '  color: var(--text1, #0f172a); margin: 0 0 .25rem;',
      '}',
      '#ghConfigSubtitle {',
      '  font-family: var(--font-body, sans-serif);',
      '  font-size: .82rem; color: var(--text2, #64748b); margin: 0;',
      '}',
      '#ghConfigCloseBtn {',
      '  background: none; border: none;',
      '  font-size: 1rem; color: var(--text3, #94a3b8);',
      '  cursor: pointer; padding: .25rem; line-height: 1; flex-shrink: 0;',
      '}',
      '#ghConfigCloseBtn:hover { color: var(--text1, #0f172a); }',
      '.gh-config-fields { display: flex; flex-direction: column; gap: .9rem; }',
      '.gh-config-field { display: flex; flex-direction: column; gap: .3rem; }',
      '.gh-config-field label {',
      '  font-family: var(--font-body, sans-serif);',
      '  font-size: .82rem; font-weight: 700;',
      '  color: var(--text1, #0f172a);',
      '}',
      '.gh-req { color: #ef4444; }',
      '.gh-config-field input {',
      '  font-family: var(--font-mono, monospace);',
      '  font-size: .85rem;',
      '  padding: .5rem .75rem;',
      '  border: 1.5px solid var(--border, #e2e8f0);',
      '  border-radius: var(--radius, 6px);',
      '  background: var(--bg, #f8fafc);',
      '  color: var(--text1, #0f172a);',
      '  outline: none;',
      '  transition: border-color .15s;',
      '}',
      '.gh-config-field input:focus { border-color: #94a3b8; }',
      '[data-theme="dark"] #ghConfigModal {',
      '  background: #1f2223;',
      '  border-color: #363b3d;',
      '}',
      '[data-theme="dark"] .gh-config-field input {',
      '  background: #25282a;',
      '  color: #d8d4cf;',
      '  border-color: #363b3d;',
      '}',
      '[data-theme="dark"] .gh-config-field input::placeholder { color: #b2aca2; }',
      '[data-theme="dark"] .gh-config-field input:focus { border-color: #b34b00; background: #181a1b; }',
      '[data-theme="dark"] .gh-config-field label { color: #d8d4cf; }',
      '[data-theme="dark"] #ghConfigHeader h3 { color: #d8d4cf; }',
      '[data-theme="dark"] #ghConfigHeader p { color: #b2aca2; }',
      '[data-theme="dark"] .gh-field-desc { color: #b2aca2; }',
      '[data-theme="dark"] .gh-field-desc code { background: #25282a; color: #b2aca2; }',
      '[data-theme="dark"] #ghConfigCloseBtn { color: #b2aca2; }',
      '[data-theme="dark"] #ghConfigCloseBtn:hover { color: #d8d4cf; }',
      '.gh-field-desc {',
      '  font-family: var(--font-body, sans-serif);',
      '  font-size: .76rem; color: var(--text3, #94a3b8); line-height: 1.4;',
      '}',
      '.gh-field-desc code {',
      '  font-family: var(--font-mono, monospace);',
      '  background: var(--hover, #f1f5f9);',
      '  padding: .1rem .3rem; border-radius: 3px;',
      '}',
      '.gh-field-desc a { color: var(--text2, #64748b); }',
      '.gh-config-error {',
      '  font-family: var(--font-body, sans-serif);',
      '  font-size: .83rem; font-weight: 600;',
      '  color: #ef4444;',
      '  background: #fee2e2;',
      '  border: 1px solid #fca5a5;',
      '  border-radius: var(--radius, 6px);',
      '  padding: .6rem .85rem;',
      '}',
      '.gh-config-error.gh-config-hidden { display: none; }',
      '#ghConfigActions {',
      '  display: flex; align-items: center;',
      '  justify-content: space-between; gap: .6rem;',
      '}',
      '.gh-config-reset-btn {',
      '  font-family: var(--font-body, sans-serif);',
      '  font-size: .8rem; font-weight: 700;',
      '  color: var(--text3, #94a3b8);',
      '  background: none; border: none; cursor: pointer; padding: .35rem .5rem;',
      '  transition: color .15s;',
      '}',
      '.gh-config-reset-btn:hover { color: #ef4444; }',
      '.gh-config-save-btn {',
      '  font-family: var(--font-body, sans-serif);',
      '  font-size: .85rem; font-weight: 700;',
      '  padding: .55rem 1.25rem;',
      '  background: #21262d; color: #c9d1d9;',
      '  border: 1px solid #30363d;',
      '  border-radius: var(--radius, 6px);',
      '  cursor: pointer; transition: background .15s, border-color .15s;',
      '}',
      '.gh-config-save-btn:hover { background: #30363d; border-color: #8b949e; }',
      '.gh-config-save-btn:disabled { opacity: .6; cursor: not-allowed; }',
      /* BotÃ£o de engrenagem no header */
      '.gh-config-gear-btn {',
      '  display: inline-flex; align-items: center; justify-content: center;',
      '  width: 34px; height: 34px; padding: 0;',
      '  background: var(--card, #fff);',
      '  border: 1.5px solid var(--border, #e2e8f0);',
      '  border-radius: var(--radius, 8px);',
      '  color: var(--text3, #94a3b8);',
      '  cursor: pointer; transition: all .2s ease; flex-shrink: 0;',
      '}',
      '.gh-config-gear-btn:hover { border-color: var(--text3, #94a3b8); background: var(--hover, #f8fafc); }',
      '.gh-config-gear-btn.gh-config-active {',
      '  color: #22c55e; border-color: #22c55e40; background: #22c55e0a;',
      '}',
    ].join('\n');
    document.head.appendChild(cfgStyle);

    /* Fechar overlay clicando fora */
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) ghCloseConfigModal();
    });
    document.getElementById('ghConfigCloseBtn').addEventListener('click', ghCloseConfigModal);

    /* Redefinir */
    document.getElementById('ghConfigResetBtn').addEventListener('click', function () {
      try { localStorage.removeItem(GH_CONFIG_KEY); } catch (e) {}
      ghSetToken('');
      GITHUB_CONFIG.OWNER = '';
      GITHUB_CONFIG.REPO  = '';
      document.getElementById('ghConfigOwner').value = '';
      document.getElementById('ghConfigRepo').value  = '';
      document.getElementById('ghConfigToken').value = '';
      ghUpdateConfigButton();
      ghHideConfigError();
    });

    /* Salvar com validaÃ§Ã£o */
    document.getElementById('ghConfigSaveBtn').addEventListener('click', function () {
      var owner = document.getElementById('ghConfigOwner').value.trim();
      var repo  = document.getElementById('ghConfigRepo').value.trim();
      var token = document.getElementById('ghConfigToken').value.trim();

      if (!owner || !repo || !token) {
        ghShowConfigError('Preencha todos os campos obrigatÃ³rios.');
        return;
      }

      var saveBtn = this;
      saveBtn.textContent = 'Verificandoâ€¦';
      saveBtn.disabled    = true;
      ghHideConfigError();

      /* Valida owner + repo + token fazendo um GET no repositÃ³rio */
      fetch('https://api.github.com/repos/' + owner + '/' + repo, {
        headers: {
          'Authorization': 'token ' + token,
          'Accept': 'application/vnd.github+json'
        }
      }).then(function (res) {
        if (res.status === 401) {
          throw new Error('Token invÃ¡lido ou sem permissÃ£o suficiente. Verifique e tente novamente.');
        }
        if (res.status === 404) {
          throw new Error('RepositÃ³rio "' + owner + '/' + repo + '" nÃ£o encontrado. Verifique o usuÃ¡rio e o nome do repositÃ³rio.');
        }
        if (!res.ok) {
          throw new Error('Erro ao conectar com o GitHub (status ' + res.status + '). Tente novamente.');
        }
        return res.json();
      }).then(function () {
        /* Tudo certo â€” salva */
        ghApplyConfig(owner, repo, token);
        ghUpdateConfigButton();
        saveBtn.textContent = 'âœ“ Salvo!';
        setTimeout(function () {
          ghCloseConfigModal();
          saveBtn.textContent = 'Verificar e salvar';
          saveBtn.disabled    = false;
        }, 1000);
      }).catch(function (e) {
        ghShowConfigError(e.message);
        saveBtn.textContent = 'Verificar e salvar';
        saveBtn.disabled    = false;
      });
    });
  })();

  function ghOpenConfigModal() {
    var overlay = document.getElementById('ghConfigOverlay');
    if (!overlay) return;
    /* Preenche campos com valores atuais */
    var ownerEl = document.getElementById('ghConfigOwner');
    var repoEl  = document.getElementById('ghConfigRepo');
    var tokenEl = document.getElementById('ghConfigToken');
    if (ownerEl) ownerEl.value = GITHUB_CONFIG.OWNER || '';
    if (repoEl)  repoEl.value  = GITHUB_CONFIG.REPO  || '';
    if (tokenEl) tokenEl.value = ghGetToken() || '';
    ghHideConfigError();
    overlay.classList.remove('gh-config-hidden');
    document.body.style.overflow = 'hidden';
    if (ownerEl) ownerEl.focus();
  }

  function ghCloseConfigModal() {
    var overlay = document.getElementById('ghConfigOverlay');
    if (overlay) overlay.classList.add('gh-config-hidden');
    document.body.style.overflow = '';
  }

  function ghShowConfigError(msg) {
    var el = document.getElementById('ghConfigError');
    if (!el) return;
    el.textContent = msg;
    el.classList.remove('gh-config-hidden');
  }

  function ghHideConfigError() {
    var el = document.getElementById('ghConfigError');
    if (el) el.classList.add('gh-config-hidden');
  }

  function ghUpdateConfigButton() {
    if (window.SenkoShell && typeof window.SenkoShell.refreshGithubButton === 'function') {
      window.SenkoShell.refreshGithubButton();
      return;
    }

    var btn = document.getElementById('senkoGithubConfigBtn');
    if (!btn) return;
    var configured = !!(GITHUB_CONFIG.OWNER && GITHUB_CONFIG.REPO && ghGetToken());
    btn.classList.toggle('gh-config-active', configured);
    btn.hidden = false;
    btn.title = configured
      ? 'GitHub configurado: ' + GITHUB_CONFIG.OWNER + '/' + GITHUB_CONFIG.REPO
      : 'Configurar repositÃ³rio GitHub';
  }

  /*
   * Os demais modulos da Biblioteca usam ghEnsureToken, mas o modal pertence
   * somente a esta integracao. Os handlers preservam essa fronteira.
   */
  ghOpenConfigModalHandler = ghOpenConfigModal;
  ghUpdateConfigButtonHandler = ghUpdateConfigButton;

  /* â”€â”€â”€ BotÃµes no header â”€â”€â”€ */
  /* O botao GitHub pertence ao shell global; esta feature registra callbacks. */
  if (window.SenkoShell && typeof window.SenkoShell.registerGithubProvider === 'function') {
    window.SenkoShell.registerGithubProvider('biblioteca', {
      label: 'Biblioteca',
      openConfig: ghOpenConfigModal,
      hasCredentials: function () {
        return Boolean(GITHUB_CONFIG.OWNER && GITHUB_CONFIG.REPO && ghGetToken());
      }
    });
  } else {
    ghUpdateConfigButton();
  }

  /* Retoma o polling usando a bolinha global criada pelo shell. */
  ghResumeDeployWatchIfNeeded();

  /* â”€â”€â”€ Span de status oculto (para uso interno) â”€â”€â”€ */
  var hiddenStatus = document.createElement('span');
  hiddenStatus.id = 'ghStatus';
  hiddenStatus.className = 'gh-status-text';
  document.body.appendChild(hiddenStatus);

  /* â”€â”€â”€ Modal ediÃ§Ã£o â€” botÃ£o GitHub â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
  var saveToFileAnchor = document.getElementById('saveToFileBtn');
  if (saveToFileAnchor && !document.getElementById('ghSaveLayoutBtn')) {
    var ghEditBtn = document.createElement('button');
    ghEditBtn.id        = 'ghSaveLayoutBtn';
    ghEditBtn.className = 'btn-github';
    ghEditBtn.innerHTML = GH_ICON + ' GitHub';
    ghEditBtn.title     = 'Salvar diretamente no repositÃ³rio GitHub';
    saveToFileAnchor.parentNode.replaceChild(ghEditBtn, saveToFileAnchor);

    ghEditBtn.addEventListener('click', function () {
      var code = document.getElementById('editGeneratedCode').textContent;
      var id   = document.getElementById('editId').value.trim().toLowerCase();

      if (!id || code.indexOf('//') === 0) {
        alert('Preencha os campos primeiro.');
        return;
      }

      ghEditBtn.textContent = 'Salvandoâ€¦';
      ghEditBtn.disabled    = true;

      githubSaveLayout(id, code).then(function (result) {
        if (result) {
          ghEditBtn.innerHTML  = GH_ICON + ' Salvo!';
          setTimeout(function () {
            if (typeof closeEditModal === 'function') closeEditModal();
            ghEditBtn.innerHTML  = GH_ICON + ' GitHub';
            ghEditBtn.disabled   = false;
          }, 1200);
        } else {
          ghEditBtn.innerHTML = GH_ICON + ' GitHub';
          ghEditBtn.disabled  = false;
        }
      }).catch(function () {
        ghEditBtn.innerHTML = GH_ICON + ' GitHub';
        ghEditBtn.disabled  = false;
      });
    });
  }

  /* BotÃµes de variante (nova e editar) foram movidos para
     app/features/biblioteca/integrations/github/senko-github-variants.js */

  /* â”€â”€â”€ Modal criaÃ§Ã£o â€” botÃ£o GitHub â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
  var copyGeneratedAnchor = document.getElementById('copyGeneratedBtn');
  if (copyGeneratedAnchor && !document.getElementById('ghNewLayoutGroup')) {
    var ghNewLayoutTargetFile = '';

    var ghNewBtn = document.createElement('button');
    ghNewBtn.id        = 'ghSaveNewLayoutBtn';
    ghNewBtn.className = 'btn-github';
    ghNewBtn.innerHTML = GH_ICON + ' GitHub';
    ghNewBtn.title     = 'Salvar novo layout em arquivo individual no reposit?rio GitHub';

    var ghGroup = document.createElement('div');
    ghGroup.id        = 'ghNewLayoutGroup';
    ghGroup.className = 'gh-auto-group';
    ghGroup.appendChild(ghNewBtn);

    /* Substitui o span Ã¢ncora pelo botÃ£o com destino fixo. */
    copyGeneratedAnchor.parentNode.replaceChild(ghGroup, copyGeneratedAnchor);

    ghNewBtn.addEventListener('click', function () {
      var code     = document.getElementById('generatedCode').textContent;
      var id       = document.getElementById('addId').value.trim().toLowerCase();

      if (!id || code.indexOf('//') === 0) {
        alert('Preencha os campos primeiro.');
        return;
      }

      ghNewBtn.textContent = 'Salvandoâ€¦';
      ghNewBtn.disabled    = true;

      githubSaveNewLayout(ghNewLayoutTargetFile, code, id).then(function (result) {
        if (result) {
          ghNewBtn.innerHTML = GH_ICON + ' Salvo!';
          setTimeout(function () {
            if (typeof closeAddModal === 'function') closeAddModal();
            ghNewBtn.innerHTML = GH_ICON + ' GitHub';
            ghNewBtn.disabled  = false;
          }, 1200);
        } else {
          ghNewBtn.innerHTML = GH_ICON + ' GitHub';
          ghNewBtn.disabled  = false;
        }
      }).catch(function () {
        ghNewBtn.innerHTML = GH_ICON + ' GitHub';
        ghNewBtn.disabled  = false;
      });
    });
  }

}

window.SenkoBibliotecaGithubV2 = {
  init: initSenkoBibliotecaGithubV2,
  hasCredentials: function () {
    return Boolean(GITHUB_CONFIG.OWNER && GITHUB_CONFIG.REPO && ghGetToken());
  },
  openConfig: function () {
    if (ghOpenConfigModalHandler) ghOpenConfigModalHandler();
  }
};
