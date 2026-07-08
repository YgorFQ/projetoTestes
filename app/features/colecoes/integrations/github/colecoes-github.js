// @ts-nocheck
/*
 * colecoes-github.js - Integracao GitHub exclusiva da feature Colecoes.
 *
 * REGRA DE INDEPENDENCIA:
 * - Este arquivo nao importa nem chama o GitHub da Biblioteca.
 * - Todas as funcoes compartilhaveis do antigo senko-github-v2.js foram
 *   duplicadas aqui com prefixo colGithub*.
 * - Se app/features/biblioteca for removida, criar grupos, colecoes e
 *   layouts de Colecoes continua usando somente ColLib, ColGroups e este
 *   arquivo.
 */

/* =====================================================================
   CORE GITHUB LOCAL DE COLECOES
   Mantido dentro da propria feature para nao depender da Biblioteca.
===================================================================== */
var COL_GITHUB_CONFIG_KEY = 'senkolib_github_config';
var COL_GITHUB_TOKEN_KEY  = 'senkolib_github_token';
var COL_GITHUB_LEGACY_CONFIG_KEY = 'senkolib_colecoes_github_config';
var COL_GITHUB_LEGACY_TOKEN_KEY  = 'senkolib_colecoes_github_token';
var COL_GH_MANIFEST_PATH = 'app/features/colecoes/data/manifest.js';

/*
 * A configuracao GitHub e global porque owner/repo/token pertencem ao projeto.
 * A logica continua local: Colecoes nao importa nem chama a Biblioteca.
 */

function colGithubDetectPagesConfig() {
  var host = window.location.hostname || '';
  var parts = window.location.pathname.split('/').filter(Boolean);
  if (/^[^.]+\.github\.io$/i.test(host) && parts.length > 0) {
    return { OWNER: host.split('.')[0], REPO: parts[0], BRANCH: 'main', _auto: true };
  }
  return null;
}

function colGithubReadStoredConfig() {
  var saved = null;
  try { saved = JSON.parse(localStorage.getItem(COL_GITHUB_CONFIG_KEY) || 'null'); } catch (error) {}
  if (!saved) {
    try { saved = JSON.parse(localStorage.getItem(COL_GITHUB_LEGACY_CONFIG_KEY) || 'null'); } catch (error) {}
  }
  if (saved && (saved.owner || saved.OWNER) && (saved.repo || saved.REPO)) {
    return {
      OWNER: saved.owner || saved.OWNER,
      REPO: saved.repo || saved.REPO,
      BRANCH: saved.branch || saved.BRANCH || 'main',
      _auto: false
    };
  }
  return null;
}

var COL_GITHUB_CONFIG = (function () {
  var pagesConfig = colGithubDetectPagesConfig();
  if (pagesConfig) return pagesConfig;

  var saved = colGithubReadStoredConfig();
  if (saved) return saved;
  return { OWNER: '', REPO: '', BRANCH: 'main', _auto: false };
})();

var COL_GH_ICON = '<svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14" aria-hidden="true"><path d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.17c-3.34.73-4.04-1.42-4.04-1.42-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.74.08-.74 1.21.09 1.85 1.24 1.85 1.24 1.07 1.84 2.82 1.31 3.51 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.62-5.49 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12 12 0 0 0 12 .5Z"/></svg>';
var colGithubSaving = false;

function colGithubPersistConfig() {
  try {
    localStorage.setItem(COL_GITHUB_CONFIG_KEY, JSON.stringify({
      OWNER: COL_GITHUB_CONFIG.OWNER,
      REPO: COL_GITHUB_CONFIG.REPO,
      BRANCH: COL_GITHUB_CONFIG.BRANCH || 'main'
    }));
  } catch (error) {}
  if (window.SenkoShell && typeof window.SenkoShell.refreshGithubButton === 'function') {
    window.SenkoShell.refreshGithubButton();
  }
}

function colGithubSyncStoredConfig() {
  /*
   * Em GitHub Pages, a URL aberta e a fonte mais confiavel. Uma configuracao
   * antiga salva no navegador nao deve mandar Colecoes salvar em outro repo.
   */
  var pagesConfig = colGithubDetectPagesConfig();
  if (pagesConfig) {
    COL_GITHUB_CONFIG.OWNER = pagesConfig.OWNER;
    COL_GITHUB_CONFIG.REPO = pagesConfig.REPO;
    COL_GITHUB_CONFIG.BRANCH = pagesConfig.BRANCH;
    COL_GITHUB_CONFIG._auto = true;
    return;
  }

  var saved = colGithubReadStoredConfig();
  if (!saved) return;
  COL_GITHUB_CONFIG.OWNER = saved.OWNER;
  COL_GITHUB_CONFIG.REPO = saved.REPO;
  COL_GITHUB_CONFIG.BRANCH = saved.BRANCH || 'main';
  COL_GITHUB_CONFIG._auto = false;
}

function colGithubGetToken() {
  try {
    return localStorage.getItem(COL_GITHUB_TOKEN_KEY) || localStorage.getItem(COL_GITHUB_LEGACY_TOKEN_KEY) || '';
  } catch (error) {
    return '';
  }
}

function colGithubSetToken(token) {
  try {
    if (token) localStorage.setItem(COL_GITHUB_TOKEN_KEY, token);
    else localStorage.removeItem(COL_GITHUB_TOKEN_KEY);
  } catch (error) {}
  if (window.SenkoShell && typeof window.SenkoShell.refreshGithubButton === 'function') {
    window.SenkoShell.refreshGithubButton();
  }
}

function colGithubEnsureToken() {
  colGithubSyncStoredConfig();
  if (!COL_GITHUB_CONFIG.OWNER) {
    COL_GITHUB_CONFIG.OWNER = (window.prompt('Owner do repositorio GitHub para Colecoes:', '') || '').trim();
  }
  if (!COL_GITHUB_CONFIG.REPO) {
    COL_GITHUB_CONFIG.REPO = (window.prompt('Nome do repositorio GitHub para Colecoes:', '') || '').trim();
  }
  if (!COL_GITHUB_CONFIG.BRANCH) COL_GITHUB_CONFIG.BRANCH = 'main';
  if (!COL_GITHUB_CONFIG.OWNER || !COL_GITHUB_CONFIG.REPO) {
    colGithubShowErrorModal('Configure owner e repositorio para salvar Colecoes no GitHub.');
    return false;
  }
  colGithubPersistConfig();

  var token = colGithubGetToken();
  if (!token) {
    token = (window.prompt('Token GitHub para salvar Colecoes:', '') || '').trim();
    if (token) colGithubSetToken(token);
  }
  if (!token) {
    colGithubShowErrorModal('Token GitHub nao configurado para Colecoes.');
    return false;
  }
  return true;
}

function colGithubPromptValue(label, currentValue) {
  var value = window.prompt(label, currentValue || '');
  return value === null ? null : value.trim();
}

function colGithubOpenConfig() {
  /*
   * Configurador proprio de Colecoes. Ele usa as mesmas chaves globais de
   * owner/repo/token, mas nao chama modal nem funcao da Biblioteca.
   */
  colGithubSyncStoredConfig();

  var owner = colGithubPromptValue('Owner do repositorio GitHub:', COL_GITHUB_CONFIG.OWNER);
  if (owner === null) return false;

  var repo = colGithubPromptValue('Nome do repositorio GitHub:', COL_GITHUB_CONFIG.REPO);
  if (repo === null) return false;

  var token = colGithubPromptValue('Token GitHub:', colGithubGetToken());
  if (token === null) return false;

  COL_GITHUB_CONFIG.OWNER = owner;
  COL_GITHUB_CONFIG.REPO = repo;
  COL_GITHUB_CONFIG.BRANCH = COL_GITHUB_CONFIG.BRANCH || 'main';
  colGithubPersistConfig();
  colGithubSetToken(token);

  if (!owner || !repo || !token) {
    colGithubShowErrorModal('Configure owner, repositorio e token para usar o GitHub em Colecoes.');
    return false;
  }

  return true;
}

function colGithubHasCredentials() {
  colGithubSyncStoredConfig();
  return Boolean(COL_GITHUB_CONFIG.OWNER && COL_GITHUB_CONFIG.REPO && colGithubGetToken());
}

function colGithubRegisterShellProvider() {
  if (!window.SenkoShell || typeof window.SenkoShell.registerGithubProvider !== 'function') return;

  window.SenkoShell.registerGithubProvider('colecoes', {
    label: 'Colecoes',
    openConfig: colGithubOpenConfig,
    hasCredentials: colGithubHasCredentials
  });
}

function colGithubEscapeTemplateLiteral(value) {
  return String(value == null ? '' : value)
    .replace(/\\/g, '\\\\')
    .replace(/`/g, '\\`')
    .replace(/\$\{/g, '\\${');
}

function colGithubEscapeJsString(value) {
  return String(value == null ? '' : value)
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/\r/g, '\\r')
    .replace(/\n/g, '\\n')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');
}

function colGithubEncodeBase64(content) {
  return btoa(unescape(encodeURIComponent(content)));
}

function colGithubDecodeBase64(content) {
  return decodeURIComponent(escape(atob(String(content || '').replace(/\s/g, ''))));
}

function colGithubApiUrl(filePath) {
  return 'https://api.github.com/repos/' + COL_GITHUB_CONFIG.OWNER + '/' + COL_GITHUB_CONFIG.REPO + '/contents/' + filePath;
}

function colGithubGetFile(filePath) {
  var url = colGithubApiUrl(filePath) + '?ref=' + encodeURIComponent(COL_GITHUB_CONFIG.BRANCH || 'main');
  return fetch(url, {
    headers: {
      'Authorization': 'token ' + colGithubGetToken(),
      'Accept': 'application/vnd.github+json'
    }
  }).then(function (res) {
    if (!res.ok) {
      return res.json().catch(function () { return {}; }).then(function (data) {
        throw new Error('GitHub GET falhou (' + res.status + '): ' + (data.message || filePath));
      });
    }
    return res.json();
  }).then(function (data) {
    return { sha: data.sha, content: colGithubDecodeBase64(data.content), path: filePath };
  });
}

function colGithubPutFile(filePath, content, sha, message) {
  var body = {
    message: message,
    content: colGithubEncodeBase64(content),
    branch: COL_GITHUB_CONFIG.BRANCH || 'main'
  };
  if (sha) body.sha = sha;

  return fetch(colGithubApiUrl(filePath), {
    method: 'PUT',
    headers: {
      'Authorization': 'token ' + colGithubGetToken(),
      'Accept': 'application/vnd.github+json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(function (res) {
    if (!res.ok) {
      return res.json().catch(function () { return {}; }).then(function (data) {
        throw new Error('GitHub PUT falhou (' + res.status + '): ' + (data.message || filePath));
      });
    }
    return res.json();
  });
}

function colGithubDeleteFile(filePath, sha, message) {
  var token = typeof colGithubGetToken === 'function' ? colGithubGetToken() : '';
  var url = 'https://api.github.com/repos/'
    + COL_GITHUB_CONFIG.OWNER + '/'
    + COL_GITHUB_CONFIG.REPO  + '/contents/'
    + filePath;

  return fetch(url, {
    method: 'DELETE',
    headers: {
      'Authorization': 'token ' + token,
      'Accept':        'application/vnd.github+json',
      'Content-Type':  'application/json',
    },
    body: JSON.stringify({
      message: message,
      sha: sha,
      branch: COL_GITHUB_CONFIG.BRANCH,
    }),
  }).then(function (res) {
    if (!res.ok) {
      return res.json().then(function (d) {
        throw new Error('GitHub DELETE falhou (' + res.status + '): ' + (d.message || filePath));
      });
    }
    return true;
  });
}

function colGithubLockSave() {
  if (colGithubSaving) return false;
  colGithubSaving = true;
  return true;
}

function colGithubUnlockSave() {
  colGithubSaving = false;
}

function colGithubSetStatus(message, type) {
  var label = '[colecoes-github:' + (type || 'info') + '] ' + message;
  if (type === 'error') console.error(label);
  else console.log(label);
}

function colGithubShowErrorModal(message) {
  if (typeof colOpenConfirm === 'function') {
    colOpenConfirm({
      title: 'Erro no GitHub',
      body: message,
      labelOk: 'OK',
      danger: false,
      onConfirm: function () {}
    });
    return;
  }
  window.alert(message);
}

function colGithubStartDeployWatch(filePath) {
  try {
    localStorage.setItem('senkolib_colecoes_last_deploy_watch', JSON.stringify({ path: filePath, at: Date.now() }));
  } catch (error) {}
}



/* ═══════════════════════════════════════════════════════════════════════
   UTILITÁRIOS DE ARQUIVO DE COLEÇÃO
═══════════════════════════════════════════════════════════════════════ */

/*
  Caminho do arquivo de uma coleção no repositório.
*/
function colGhFilePath(slug) {
  var normalizedSlug = String(slug || '').toLowerCase();
  return 'app/features/colecoes/data/collections/' + normalizedSlug + '/collection.js';
}

function colGhParseManifestContent(content) {
  var assignment = 'window.SenkoColecoesManifest';
  var assignmentIndex = content.indexOf(assignment);
  var equalsIndex = content.indexOf('=', assignmentIndex);
  var source = equalsIndex === -1
    ? ''
    : content.slice(equalsIndex + 1).trim().replace(/;\s*$/, '');

  if (assignmentIndex === -1 || !source) {
    throw new Error('Formato do catalogo de Colecoes nao reconhecido.');
  }
  return JSON.parse(source);
}

function colGhSerializeManifest(manifest) {
  return (
    '/* Catalogo privado de Colecoes. Atualizado pela integracao GitHub. */\n' +
    'window.SenkoColecoesManifest = ' +
    JSON.stringify(manifest, null, 2) +
    ';\n'
  );
}

function colGhReadManifest() {
  return colGithubGetFile(COL_GH_MANIFEST_PATH).then(function (data) {
    return {
      content: data.content,
      sha: data.sha,
      manifest: colGhParseManifestContent(data.content)
    };
  });
}

function colGhFindCollectionEntry(manifest, slug) {
  var normalizedSlug = String(slug || '').toLowerCase();
  var fileName = 'collections/' + normalizedSlug + '/collection.js';
  var collections = Array.isArray(manifest.collections) ? manifest.collections : [];

  for (var i = 0; i < collections.length; i++) {
    var entry = collections[i];
    if (
      entry === fileName ||
      (entry && typeof entry === 'object' &&
        (entry.file === fileName || entry.file === normalizedSlug + '.js' || String(entry.slug || '').toLowerCase() === normalizedSlug))
    ) {
      return { entry: entry, index: i };
    }
  }
  return { entry: null, index: -1 };
}

function colGhSetManifestEntry(slug, shouldInclude, meta) {
  var normalizedSlug = String(slug || '').toLowerCase();
  meta = meta || {};

  return colGhReadManifest().then(function (info) {
    var manifest = info.manifest;
    if (!Array.isArray(manifest.collections)) manifest.collections = [];

    var found = colGhFindCollectionEntry(manifest, normalizedSlug);
    var existing = found.entry && typeof found.entry === 'object' ? found.entry : {};

    if (shouldInclude) {
      var entry = {
        file: existing.file || ('collections/' + normalizedSlug + '/collection.js'),
        slug: normalizedSlug,
        name: meta.name || existing.name || normalizedSlug,
        group: meta.group || existing.group || '',
        tags: Array.isArray(meta.tags) ? meta.tags : (Array.isArray(existing.tags) ? existing.tags : []),
        layoutCount: typeof meta.layoutCount === 'number'
          ? meta.layoutCount
          : (Array.isArray(existing.layouts) ? existing.layouts.length : (Number(existing.layoutCount) || 0)),
        layouts: Array.isArray(existing.layouts) ? existing.layouts : []
      };
      if (found.index === -1) manifest.collections.push(entry);
      else manifest.collections[found.index] = entry;
    } else if (found.index !== -1) {
      manifest.collections.splice(found.index, 1);
    }

    return colGithubPutFile(
      COL_GH_MANIFEST_PATH,
      colGhSerializeManifest(manifest),
      info.sha,
      shouldInclude
        ? '[Colecoes] register collection file: ' + normalizedSlug
        : '[Colecoes] unregister collection file: ' + normalizedSlug
    ).then(function () { return COL_GH_MANIFEST_PATH; });
  });
}

function colGhSyncManifestFromMemory(slug) {
  var col = typeof ColLib !== 'undefined' ? ColLib.getBySlug(slug) : null;
  if (!col) return Promise.resolve(true);
  return colGhSetManifestEntry(slug, true, {
    name: col.name,
    group: col.group,
    tags: col.tags || [],
    layoutCount: Array.isArray(col.layouts) ? col.layouts.length : 0
  });
}

function colGhFindLayoutManifestEntry(slug, layoutId) {
  var normalizedLayoutId = String(layoutId || '').toLowerCase();

  return colGhReadManifest().then(function (info) {
    var found = colGhFindCollectionEntry(info.manifest, slug);
    var entry = found.entry;
    var layouts = entry && typeof entry === 'object' && Array.isArray(entry.layouts)
      ? entry.layouts
      : [];

    for (var i = 0; i < layouts.length; i++) {
      var layoutEntry = layouts[i];
      if (
        layoutEntry &&
        typeof layoutEntry === 'object' &&
        layoutEntry.file &&
        String(layoutEntry.id || '').toLowerCase() === normalizedLayoutId
      ) {
        return {
          manifestInfo: info,
          collectionEntry: entry,
          layoutEntry: layoutEntry,
          path: 'app/features/colecoes/data/' + layoutEntry.file
        };
      }
    }
    return null;
  });
}

function colGhSetLayoutManifestEntry(slug, layout, shouldInclude) {
  var normalizedSlug = String(slug || '').toLowerCase();
  var normalizedLayoutId = String(layout && layout.id || '').toLowerCase();

  return colGhReadManifest().then(function (info) {
    var manifest = info.manifest;
    if (!Array.isArray(manifest.collections)) manifest.collections = [];

    var found = colGhFindCollectionEntry(manifest, normalizedSlug);
    if (found.index === -1 || !found.entry || typeof found.entry !== 'object') {
      throw new Error('Colecao nao catalogada no manifest: ' + normalizedSlug);
    }

    var entry = found.entry;
    if (!Array.isArray(entry.layouts)) entry.layouts = [];

    var layoutIndex = -1;
    for (var i = 0; i < entry.layouts.length; i++) {
      var current = entry.layouts[i];
      if (current && typeof current === 'object' && String(current.id || '').toLowerCase() === normalizedLayoutId) {
        layoutIndex = i;
        break;
      }
    }

    if (shouldInclude) {
      var nextEntry = {
        file: 'collections/' + normalizedSlug + '/layouts/' + normalizedLayoutId + '.js',
        id: normalizedLayoutId,
        name: layout.name || normalizedLayoutId
      };
      if (layoutIndex === -1) entry.layouts.push(nextEntry);
      else entry.layouts[layoutIndex] = nextEntry;
      entry.layoutCount = Math.max(Number(entry.layoutCount) || 0, entry.layouts.length);
    } else if (layoutIndex !== -1) {
      entry.layouts.splice(layoutIndex, 1);
      entry.layoutCount = entry.layouts.length;
    }

    return colGithubPutFile(
      COL_GH_MANIFEST_PATH,
      colGhSerializeManifest(manifest),
      info.sha,
      shouldInclude
        ? '[Colecoes] register layout file: ' + normalizedSlug + '/' + normalizedLayoutId
        : '[Colecoes] unregister layout file: ' + normalizedSlug + '/' + normalizedLayoutId
    ).then(function () {
      return COL_GH_MANIFEST_PATH;
    });
  });
}

function colGhGetCollectionLayoutFiles(slug) {
  var normalizedSlug = String(slug || '').toLowerCase();
  return colGhReadManifest().then(function (info) {
    var found = colGhFindCollectionEntry(info.manifest, normalizedSlug);
    var entry = found.entry;
    if (!entry || typeof entry !== 'object' || !Array.isArray(entry.layouts)) return [];
    return entry.layouts
      .filter(function (layoutEntry) { return layoutEntry && layoutEntry.file; })
      .map(function (layoutEntry) { return 'app/features/colecoes/data/' + layoutEntry.file; });
  }).catch(function () {
    return [];
  });
}

function colGhEscapeJsString(value) {
  if (typeof colGithubEscapeJsString === 'function') {
    return colGithubEscapeJsString(value);
  }

  return String(value == null ? '' : value)
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/\r/g, '\\r')
    .replace(/\n/g, '\\n')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');
}

/*
  Monta o conteúdo do arquivo de metadados de uma coleção.
  Os layouts ficam em arquivos individuais dentro de collections/[slug]/layouts.
*/
function colGhBuildFileContent(col) {
  var tagsStr = (col.tags || [])
    .map(function (t) { return "'" + colGhEscapeJsString(t) + "'"; })
    .join(', ');

  return (
    '// @ts-nocheck\n' +
    'ColLib.registerCollection({\n' +
    "  slug:  '" + colGhEscapeJsString(col.slug)  + "',\n" +
    "  name:  '" + colGhEscapeJsString(col.name)  + "',\n" +
    "  group: '" + colGhEscapeJsString(col.group) + "',\n" +
    '  tags:  [' + tagsStr   + '],\n' +
    '  layouts: []\n' +
    '});\n'
  );
}

/*
  Monta o conteúdo do arquivo de grupos a partir do estado atual de ColGroups.
  Chamado sempre que grupos confirmados mudam (flush de pendentes).

  REGRA: grupos sao catalogo proprio da feature. Mesmo que nenhuma colecao
  aponte para um grupo hoje, ele continua existindo no arquivo ate existir
  uma acao explicita para remover grupos.
*/
function colGhBuildGroupsFileContent() {
  if (typeof ColGroups === 'undefined') return '';
  /* Grupos sao catalogo persistente: mesmo vazios, continuam no arquivo. */

  /* O mapeamento abaixo fica apenas para compatibilidade com fluxos antigos. */
  var usedSlugs = {};
  if (typeof ColLib !== 'undefined') {
    ColLib.getAll().forEach(function (col) {
      if (col.group) usedSlugs[col.group] = true;
    });
  }

  /* Pendentes tambem entram no catalogo para serem persistidos no commit atual. */
  ColGroups.getPending().forEach(function (g) {
    usedSlugs[g.slug] = true;
  });

  var all = ColGroups.getAll(); /* confirmados + pendentes */
  var seen = {};
  var used = all.filter(function (g) {
    if (!g || !g.slug || seen[g.slug]) return false;
    seen[g.slug] = true;
    return true;
  });

  var lines = used.map(function (g) {
    return (
      "  { slug: '" + colGhEscapeJsString(g.slug) + "', name: '" + colGhEscapeJsString(g.name) + "', cor: '" + colGhEscapeJsString(g.cor) + "' },"
    );
  });

  return (
    '// @ts-nocheck\n' +
    '/* ═══════════════════════════════════════════════════════════════════════\n' +
    '   col-groups-data.js — Dados dos grupos de coleções\n' +
    '\n' +
    '   ATENÇÃO: Arquivo gerado pelo modulo GitHub de Colecoes.\n' +
    '   NÃO edite manualmente em produção.\n' +
    '═══════════════════════════════════════════════════════════════════════ */\n' +
    'ColGroups.load([\n' +
    lines.join('\n') + '\n' +
    ']);\n'
  );
}

function colGhFlushGroups() {
  if (typeof ColGroups === 'undefined') return Promise.resolve(true);
  var content = colGhBuildGroupsFileContent();
  return colGithubGetFile('app/features/colecoes/data/col-groups-data.js').then(function (data) {
    return colGithubPutFile('app/features/colecoes/data/col-groups-data.js', content, data.sha, '[Colecoes] sync groups');
  }).catch(function (error) {
    if (error.message && error.message.indexOf('404') !== -1) {
      return colGithubPutFile('app/features/colecoes/data/col-groups-data.js', content, null, '[Colecoes] create groups file');
    }
    throw error;
  }).then(function () {
    if (typeof ColGroups !== 'undefined') ColGroups.clearPending();
    return true;
  });
}

function colGhBuildLayoutFileContent(slug, layout) {
  var safeHtml = colGithubEscapeTemplateLiteral(layout.html);
  var safeCss  = colGithubEscapeTemplateLiteral(layout.css);
  return (
    '// @ts-nocheck\n' +
    "ColLib.registerCollectionLayout('" + colGhEscapeJsString(slug.toLowerCase()) + "',\n" +
    '{\n' +
    "  id: '" + colGhEscapeJsString(layout.id) + "',\n" +
    "  name: '" + colGhEscapeJsString(layout.name) + "',\n" +
    '  html: `' + safeHtml + '`,\n' +
    '  css: `' + safeCss + '`\n' +
    '}\n' +
    ');\n'
  );
}

/*
  Lê o arquivo de uma coleção do GitHub.
  Retorna { exists, sha, content, path } ou { exists: false }.
*/
function colGhNormalizeName(value) {
  if (typeof ColLib !== 'undefined' && typeof ColLib.normalizeName === 'function') {
    return ColLib.normalizeName(value);
  }
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
    .replace(/\s+/g, ' ');
}

function colGhGetFile(slug) {
  var normalizedSlug = String(slug || '').toLowerCase();
  return colGhReadManifest().then(function (info) {
    var found = colGhFindCollectionEntry(info.manifest, normalizedSlug);
    if (found.entry && typeof found.entry === 'object' && found.entry.file) {
      return 'app/features/colecoes/data/' + found.entry.file;
    }
    return colGhFilePath(normalizedSlug);
  }).catch(function () {
    return colGhFilePath(normalizedSlug);
  }).then(function (path) {
    return colGithubGetFile(path).then(function (data) {
      return { exists: true, sha: data.sha, content: data.content, path: path };
    }).catch(function (err) {
      if (err.message && err.message.indexOf('404') !== -1) {
        return { exists: false, path: path };
      }
      throw err;
    });
  });
}

/* ═══════════════════════════════════════════════════════════════════════
   ADICIONAR LAYOUT À COLEÇÃO
   Cria um arquivo JS individual para o layout e registra no manifesto.
═══════════════════════════════════════════════════════════════════════ */

function colGhCreateCollection(colData) {
  if (typeof ColLib !== 'undefined' && typeof ColLib.hasCollectionName === 'function' && ColLib.hasCollectionName(colData.name, null)) {
    colGithubShowErrorModal('Ja existe uma colecao com o nome "' + colData.name + '". Escolha outro nome.');
    return Promise.resolve(false);
  }
  if (!colGithubLockSave()) return Promise.resolve(false);
  if (!colGithubEnsureToken()) { colGithubUnlockSave(); colGithubSetStatus('Token nao configurado', 'error'); return Promise.resolve(false); }

  var slug = String(colData.slug || '').toLowerCase();
  var path = colGhFilePath(slug);
  colGithubSetStatus('Verificando colecao...', 'saving');

  return colGhFlushGroups().then(function () { return colGhGetFile(slug); }).then(function (fileInfo) {
    if (fileInfo.exists) {
      colGithubSetStatus('Colecao ja existe', 'error');
      colGithubUnlockSave();
      colGithubShowErrorModal('Ja existe uma colecao com esse nome no repositorio.');
      return false;
    }
    return colGithubPutFile(path, colGhBuildFileContent({ slug: slug, name: colData.name, group: colData.group, tags: colData.tags || [], layouts: [] }), null, '[Colecoes] create collection: ' + slug);
  }).then(function (result) {
    if (result === false) return false;
    return colGhSetManifestEntry(slug, true, { name: colData.name, group: colData.group, tags: colData.tags || [], layoutCount: 0 });
  }).then(function (ok) {
    if (ok === false) return false;
    ColLib.registerCollection({ slug: slug, name: colData.name, group: colData.group, tags: colData.tags || [], layouts: [] });
    colGithubSetStatus('Colecao criada: ' + slug, 'ok');
    colGithubUnlockSave();
    if (typeof colGithubStartDeployWatch === 'function') colGithubStartDeployWatch(COL_GH_MANIFEST_PATH);
    if (typeof colRenderGrid === 'function') colRenderGrid();
    return true;
  }).catch(function (e) {
    console.error('[colecoes-github] Erro ao criar colecao:', e);
    colGithubSetStatus('Erro: ' + e.message, 'error');
    colGithubUnlockSave();
    colGithubShowErrorModal(e.message);
    return false;
  });
}

function colGhEditCollection(colData) {
  if (typeof ColLib !== 'undefined' && typeof ColLib.hasCollectionName === 'function' && ColLib.hasCollectionName(colData.name, colData.slug)) {
    colGithubShowErrorModal('Ja existe outra colecao com o nome "' + colData.name + '". Escolha outro nome.');
    return Promise.resolve(false);
  }
  if (!colGithubLockSave()) return Promise.resolve(false);
  if (!colGithubEnsureToken()) { colGithubUnlockSave(); colGithubSetStatus('Token nao configurado', 'error'); return Promise.resolve(false); }

  var slug = String(colData.slug || '').toLowerCase();
  colGithubSetStatus('Lendo colecao...', 'saving');

  return colGhGetFile(slug).then(function (fileInfo) {
    if (!fileInfo.exists) {
      colGithubSetStatus('Arquivo nao encontrado', 'error');
      colGithubUnlockSave();
      colGithubShowErrorModal('Arquivo da colecao "' + slug + '" nao encontrado no repositorio.');
      return false;
    }
    return colGithubPutFile(fileInfo.path, colGhBuildFileContent({ slug: slug, name: colData.name, group: colData.group, tags: colData.tags || [], layouts: [] }), fileInfo.sha, '[Colecoes] edit collection: ' + slug);
  }).then(function (ok) {
    if (ok === false) return false;
    ColLib.updateCollection(slug, { name: colData.name, group: colData.group, tags: colData.tags || [] });
    return colGhSetManifestEntry(slug, true, { name: colData.name, group: colData.group, tags: colData.tags || [] });
  }).then(function (ok) {
    if (ok === false) return false;
    return colGhFlushGroups();
  }).then(function () {
    colGithubSetStatus('Metadados salvos', 'ok');
    colGithubUnlockSave();
    if (typeof colGithubStartDeployWatch === 'function') colGithubStartDeployWatch(COL_GH_MANIFEST_PATH);
    if (typeof colRenderGrid === 'function') colRenderGrid();
    return true;
  }).catch(function (e) {
    console.error('[colecoes-github] Erro ao editar colecao:', e);
    colGithubSetStatus('Erro: ' + e.message, 'error');
    colGithubUnlockSave();
    colGithubShowErrorModal(e.message);
    return false;
  });
}

function colGhDeleteCollection(slug) {
  if (!colGithubLockSave()) return Promise.resolve(false);
  if (!colGithubEnsureToken()) { colGithubUnlockSave(); colGithubSetStatus('Token nao configurado', 'error'); return Promise.resolve(false); }

  var normalizedSlug = String(slug || '').toLowerCase();
  var layoutFilesToDelete = [];
  colGithubSetStatus('Excluindo colecao...', 'saving');

  return colGhGetCollectionLayoutFiles(normalizedSlug).then(function (files) {
    layoutFilesToDelete = files;
    return colGhGetFile(normalizedSlug);
  }).then(function (fileInfo) {
    var deleteLayouts = Promise.all(layoutFilesToDelete.map(function (layoutPath) {
      return colGithubGetFile(layoutPath).then(function (layoutData) {
        return colGithubDeleteFile(layoutPath, layoutData.sha, '[Colecoes] delete collection layout file: ' + normalizedSlug);
      }).catch(function (error) {
        if (error.message && error.message.indexOf('404') !== -1) return true;
        throw error;
      });
    }));

    return deleteLayouts.then(function () {
      if (!fileInfo.exists) return true;
      return colGithubGetFile(fileInfo.path).then(function (data) {
        return colGithubDeleteFile(fileInfo.path, data.sha, '[Colecoes] delete collection: ' + normalizedSlug);
      });
    });
  }).then(function () {
    return colGhSetManifestEntry(normalizedSlug, false);
  }).then(function () {
    ColLib.removeCollection(normalizedSlug);
    colGithubSetStatus('Colecao excluida', 'ok');
    colGithubUnlockSave();
    if (typeof colRenderGrid === 'function') colRenderGrid();
    return true;
  }).catch(function (e) {
    console.error('[colecoes-github] Erro ao excluir colecao:', e);
    colGithubSetStatus('Erro: ' + e.message, 'error');
    colGithubUnlockSave();
    colGithubShowErrorModal(e.message);
    return false;
  });
}

function colGhAddLayout(slug, layoutData) {
  if (typeof ColLib !== 'undefined'
      && typeof ColLib.hasLayoutName === 'function'
      && ColLib.hasLayoutName(slug, layoutData.name, null)) {
    colGithubShowErrorModal('Ja existe um layout com o nome "' + layoutData.name + '" nesta colecao.');
    return Promise.resolve(false);
  }

  if (!colGithubLockSave()) return Promise.resolve(false);
  if (!colGithubEnsureToken()) {
    colGithubUnlockSave();
    colGithubSetStatus('Token não configurado', 'error');
    return Promise.resolve(false);
  }

  var normalizedSlug = String(slug || '').toLowerCase();
  layoutData.id = String(layoutData.id || '').toLowerCase();
  var layoutPath = 'app/features/colecoes/data/collections/' + normalizedSlug + '/layouts/' + layoutData.id + '.js';

  colGithubSetStatus('Criando arquivo individual…', 'saving');

  return colGithubGetFile(layoutPath).then(function () {
    colGithubSetStatus('Layout já existe', 'error');
    colGithubUnlockSave();
    colGithubShowErrorModal('Já existe um arquivo individual para este layout.\nUse editar para modificar o layout existente.');
    return false;
  }).catch(function (error) {
    if (!error.message || error.message.indexOf('404') === -1) throw error;

    return colGithubPutFile(
      layoutPath,
      colGhBuildLayoutFileContent(normalizedSlug, layoutData),
      null,
      '[Colecoes] add layout file "' + layoutData.id + '" to collection: ' + normalizedSlug
    ).then(function () {
      return colGhSetLayoutManifestEntry(normalizedSlug, layoutData, true);
    }).then(function () {
      if (typeof ColLib.registerCollectionLayout === 'function') {
        ColLib.registerCollectionLayout(normalizedSlug, layoutData);
      } else {
        ColLib.addLayout(normalizedSlug, layoutData);
      }
      colGithubSetStatus('✓ Layout adicionado', 'ok');
      colGithubUnlockSave();
      if (typeof colGithubStartDeployWatch === 'function') colGithubStartDeployWatch(COL_GH_MANIFEST_PATH);
      var col = typeof ColLib !== 'undefined' ? ColLib.getBySlug(normalizedSlug) : null;
      if (col && typeof _colRenderLayoutsGrid === 'function') _colRenderLayoutsGrid(col);
      if (typeof colRenderGrid === 'function') colRenderGrid();
      return true;
    });
  })

  .catch(function (e) {
    console.error('[colecoes-github] Erro ao adicionar layout:', e);
    colGithubSetStatus('Erro: ' + e.message, 'error');
    colGithubUnlockSave();
    colGithubShowErrorModal(e.message);
    return false;
  });
}


/* ═══════════════════════════════════════════════════════════════════════
   EDITAR LAYOUT DE COLEÇÃO
   Regrava o arquivo JS individual indicado pelo manifesto.
═══════════════════════════════════════════════════════════════════════ */

function colGhEditLayout(slug, layoutId, layoutData) {
  if (typeof ColLib !== 'undefined'
      && typeof ColLib.hasLayoutName === 'function'
      && ColLib.hasLayoutName(slug, layoutData.name, layoutId)) {
    colGithubShowErrorModal('Ja existe outro layout com o nome "' + layoutData.name + '" nesta colecao.');
    return Promise.resolve(false);
  }

  if (!colGithubLockSave()) return Promise.resolve(false);
  if (!colGithubEnsureToken()) {
    colGithubUnlockSave();
    colGithubSetStatus('Token não configurado', 'error');
    return Promise.resolve(false);
  }

  colGithubSetStatus('Lendo coleção…', 'saving');

  return colGhFindLayoutManifestEntry(slug, layoutId).then(function (manifestEntry) {
    if (!manifestEntry) return null;

    colGithubSetStatus('Lendo arquivo individual…', 'saving');
    return colGithubGetFile(manifestEntry.path).then(function (data) {
      colGithubSetStatus('Salvando no GitHub…', 'saving');
      return colGithubPutFile(
        manifestEntry.path,
        colGhBuildLayoutFileContent(slug, layoutData),
        data.sha,
        '[Colecoes] edit layout file "' + layoutId + '" in collection: ' + slug
      ).then(function () {
        return colGhSetLayoutManifestEntry(slug, layoutData, true);
      }).then(function () {
        ColLib.updateLayout(slug, layoutId, layoutData);
        colGithubSetStatus('✓ Layout salvo', 'ok');
        colGithubUnlockSave();
        if (typeof colGithubStartDeployWatch === 'function') colGithubStartDeployWatch(manifestEntry.path);
        var col = typeof ColLib !== 'undefined' ? ColLib.getBySlug(slug) : null;
        if (col && typeof _colRenderLayoutsGrid === 'function') _colRenderLayoutsGrid(col);
        return true;
      });
    });
  }).then(function (directResult) {
    if (directResult) return directResult;

    colGithubSetStatus('Layout fora do manifesto', 'error');
    colGithubUnlockSave();
    colGithubShowErrorModal('Layout "' + layoutId + '" não possui arquivo individual no manifest de Colecoes.');
    return false;
  })

  .catch(function (e) {
    console.error('[colecoes-github] Erro ao editar layout:', e);
    colGithubSetStatus('Erro: ' + e.message, 'error');
    colGithubUnlockSave();
    colGithubShowErrorModal(e.message);
    return false;
  });
}


/* ═══════════════════════════════════════════════════════════════════════
   EXCLUIR LAYOUT DE COLEÇÃO
   Remove o arquivo JS individual e sua entrada no manifesto.
═══════════════════════════════════════════════════════════════════════ */

function colGhDeleteLayout(slug, layoutId) {
  if (!colGithubLockSave()) return Promise.resolve(false);
  if (!colGithubEnsureToken()) {
    colGithubUnlockSave();
    colGithubSetStatus('Token não configurado', 'error');
    return Promise.resolve(false);
  }

  colGithubSetStatus('Lendo coleção…', 'saving');

  return colGhFindLayoutManifestEntry(slug, layoutId).then(function (manifestEntry) {
    if (!manifestEntry) return null;

    colGithubSetStatus('Lendo arquivo individual…', 'saving');
    return colGithubGetFile(manifestEntry.path).then(function (data) {
      colGithubSetStatus('Excluindo arquivo individual…', 'saving');
      return colGithubDeleteFile(
        manifestEntry.path,
        data.sha,
        '[Colecoes] delete layout file "' + layoutId + '" from collection: ' + slug
      ).then(function () {
        return colGhSetLayoutManifestEntry(slug, { id: layoutId, name: layoutId }, false);
      }).then(function () {
        ColLib.removeLayout(slug, layoutId);
        colGithubSetStatus('✓ Layout excluído', 'ok');
        colGithubUnlockSave();
        if (typeof colGithubStartDeployWatch === 'function') colGithubStartDeployWatch(COL_GH_MANIFEST_PATH);
        var col = typeof ColLib !== 'undefined' ? ColLib.getBySlug(slug) : null;
        if (col && typeof _colRenderLayoutsGrid === 'function') _colRenderLayoutsGrid(col);
        if (typeof colRenderGrid === 'function') colRenderGrid();
        return true;
      });
    });
  }).then(function (directResult) {
    if (directResult) return directResult;

    colGithubSetStatus('Layout fora do manifesto', 'error');
    colGithubUnlockSave();
    colGithubShowErrorModal('Layout "' + layoutId + '" não possui arquivo individual no manifest de Colecoes.');
    return false;
  })

  .catch(function (e) {
    console.error('[colecoes-github] Erro ao excluir layout:', e);
    colGithubSetStatus('Erro: ' + e.message, 'error');
    colGithubUnlockSave();
    colGithubShowErrorModal(e.message);
    return false;
  });
}


/* ═══════════════════════════════════════════════════════════════════════
   INJEÇÃO DE BOTÕES NOS MODAIS
═══════════════════════════════════════════════════════════════════════ */

/* ── 1. Botão "GitHub" no modal de CRIAR COLEÇÃO ── */
function colGhInjectCreateButton() {
  if (document.getElementById('colGhCreateBtn')) return;
  var anchor = document.getElementById('colCreateGhAnchor');
  if (!anchor) return;

  var btn       = document.createElement('button');
  btn.id        = 'colGhCreateBtn';
  btn.className = 'btn-github';
  btn.innerHTML = COL_GH_ICON + ' GitHub';
  btn.title     = 'Criar coleção direto no repositório GitHub';
  anchor.parentNode.replaceChild(btn, anchor);

  btn.addEventListener('click', function () {
    if (!colGithubEnsureToken()) return;

    var data = typeof colGetCreateFormData === 'function' ? colGetCreateFormData() : null;
    if (!data) return;

    btn.textContent = 'Criando…';
    btn.disabled    = true;

    colGhCreateCollection(data).then(function (ok) {
      if (ok) {
        btn.innerHTML = COL_GH_ICON + ' Criado!';
        setTimeout(function () {
          if (typeof colCloseCreateModal === 'function') colCloseCreateModal();
          btn.innerHTML = COL_GH_ICON + ' GitHub';
          btn.disabled  = false;
        }, 1200);
      } else {
        btn.innerHTML = COL_GH_ICON + ' GitHub';
        btn.disabled  = false;
      }
    }).catch(function () {
      btn.innerHTML = COL_GH_ICON + ' GitHub';
      btn.disabled  = false;
    });
  });
}

/* ── 2. Botão "GitHub" no modal de EDITAR COLEÇÃO ── */
function colGhInjectEditButton() {
  if (document.getElementById('colGhEditBtn')) return;
  var anchor = document.getElementById('colEditGhAnchor');
  if (!anchor) return;

  var btn       = document.createElement('button');
  btn.id        = 'colGhEditBtn';
  btn.className = 'btn-github';
  btn.innerHTML = COL_GH_ICON + ' GitHub';
  btn.title     = 'Salvar metadados no repositório GitHub';
  anchor.parentNode.replaceChild(btn, anchor);

  btn.addEventListener('click', function () {
    if (!colGithubEnsureToken()) return;

    var data = typeof colGetEditFormData === 'function' ? colGetEditFormData() : null;
    if (!data) return;

    btn.textContent = 'Salvando…';
    btn.disabled    = true;

    colGhEditCollection(data).then(function (ok) {
      if (ok) {
        btn.innerHTML = COL_GH_ICON + ' Salvo!';
        setTimeout(function () {
          if (typeof colCloseEditModal === 'function') colCloseEditModal();
          btn.innerHTML = COL_GH_ICON + ' GitHub';
          btn.disabled  = false;
        }, 1200);
      } else {
        btn.innerHTML = COL_GH_ICON + ' GitHub';
        btn.disabled  = false;
      }
    }).catch(function () {
      btn.innerHTML = COL_GH_ICON + ' GitHub';
      btn.disabled  = false;
    });
  });
}

/* ── 3. Botão de EXCLUIR COLEÇÃO (dentro do modal de editar coleção) ── */
function colGhInjectDeleteButtons() {
  var anchor = document.getElementById('colEditDeleteAnchor');
  if (!anchor || document.getElementById('colGhDeleteCollectionBtn')) return;

  var btn       = document.createElement('button');
  btn.id        = 'colGhDeleteCollectionBtn';
  btn.className = 'col-btn-delete';
  btn.type      = 'button';
  btn.textContent = 'Excluir';
  btn.title     = 'Excluir coleção';

  btn.addEventListener('click', function (e) {
    e.stopPropagation();
    if (!colGithubEnsureToken()) return;

    var slug = (document.getElementById('colEditSlug') || {}).value || '';
    if (!slug) return;

    var col = typeof ColLib !== 'undefined' ? ColLib.getBySlug(slug) : null;
    var layoutCount = col ? (col.layouts || []).length : 0;
    var body = 'A coleção "' + (col ? col.name : slug) + '" será excluída permanentemente do repositório.';
    if (layoutCount > 0) {
      body += '\n\nATENÇÃO: ela contém ' + layoutCount + ' layout' + (layoutCount > 1 ? 's' : '') + ' que também serão perdidos.';
    }

    if (typeof colOpenConfirm === 'function') {
      colOpenConfirm({
        title:     'Excluir Coleção?',
        body:      body,
        labelOk:   'Excluir',
        danger:    true,
        onConfirm: function () {
          colGhDeleteCollection(slug).then(function (ok) {
            if (ok) {
              if (typeof colCloseEditModal === 'function') colCloseEditModal();
              if (typeof colCloseCollectionModal === 'function') colCloseCollectionModal();
            }
          });
        },
      });
    }
  });

  anchor.appendChild(btn);
}

/* ── 4. Botão "GitHub" no modal de ADICIONAR LAYOUT ── */
function colGhInjectAddLayoutButton() {
  if (document.getElementById('colGhAddLayoutBtn')) return;
  var anchor = document.getElementById('colAddLayoutGhAnchor');
  if (!anchor) return;

  var btn       = document.createElement('button');
  btn.id        = 'colGhAddLayoutBtn';
  btn.className = 'btn-github';
  btn.innerHTML = COL_GH_ICON + ' GitHub';
  btn.title     = 'Adicionar layout ao arquivo da coleção no GitHub';
  anchor.parentNode.replaceChild(btn, anchor);

  btn.addEventListener('click', function () {
    if (!colGithubEnsureToken()) return;

    var data = typeof colGetAddLayoutFormData === 'function' ? colGetAddLayoutFormData() : null;
    if (!data) return;

    /* Precisa saber em qual coleção está — lê do _colCurrentCollection */
    var col = (typeof _colCurrentCollection !== 'undefined') ? _colCurrentCollection : null;
    if (!col) {
      colGithubShowErrorModal('Nenhuma coleção selecionada.');
      return;
    }

    btn.textContent = 'Salvando…';
    btn.disabled    = true;

    colGhAddLayout(col.slug, data).then(function (ok) {
      if (ok) {
        btn.innerHTML = COL_GH_ICON + ' Salvo!';
        setTimeout(function () {
          if (typeof colCloseAddLayoutModal === 'function') colCloseAddLayoutModal();
          btn.innerHTML = COL_GH_ICON + ' GitHub';
          btn.disabled  = false;
        }, 1200);
      } else {
        btn.innerHTML = COL_GH_ICON + ' GitHub';
        btn.disabled  = false;
      }
    }).catch(function () {
      btn.innerHTML = COL_GH_ICON + ' GitHub';
      btn.disabled  = false;
    });
  });
}

/* ── 5. Botão "GitHub" no modal de EDITAR LAYOUT ── */
function colGhInjectEditLayoutButton() {
  if (document.getElementById('colGhEditLayoutBtn')) return;
  var anchor = document.getElementById('colEditLayoutGhAnchor');
  if (!anchor) return;

  var btn       = document.createElement('button');
  btn.id        = 'colGhEditLayoutBtn';
  btn.className = 'btn-github';
  btn.innerHTML = COL_GH_ICON + ' GitHub';
  btn.title     = 'Salvar layout editado no repositório GitHub';
  anchor.parentNode.replaceChild(btn, anchor);

  btn.addEventListener('click', function () {
    if (!colGithubEnsureToken()) return;

    var data = typeof colGetEditLayoutFormData === 'function' ? colGetEditLayoutFormData() : null;
    if (!data) return;

    var col = (typeof _colCurrentCollection !== 'undefined') ? _colCurrentCollection : null;
    if (!col) { colGithubShowErrorModal('Nenhuma coleção selecionada.'); return; }

    /* ID do layout vem do campo hidden colEditLayoutId */
    var layoutId = (document.getElementById('colEditLayoutId') || {}).value || data.id;

    btn.textContent = 'Salvando…';
    btn.disabled    = true;

    colGhEditLayout(col.slug, layoutId, data).then(function (ok) {
      if (ok) {
        btn.innerHTML = COL_GH_ICON + ' Salvo!';
        setTimeout(function () {
          if (typeof colCloseEditLayoutModal === 'function') colCloseEditLayoutModal();
          btn.innerHTML = COL_GH_ICON + ' GitHub';
          btn.disabled  = false;
        }, 1200);
      } else {
        btn.innerHTML = COL_GH_ICON + ' GitHub';
        btn.disabled  = false;
      }
    }).catch(function () {
      btn.innerHTML = COL_GH_ICON + ' GitHub';
      btn.disabled  = false;
    });
  });
}

/* ── 6. Botão de EXCLUIR LAYOUT (dentro do modal de editar layout) ── */
function colGhInjectDeleteLayoutButtons() {
  var anchor = document.getElementById('colEditLayoutDelAnchor');
  if (!anchor || document.getElementById('colGhDelLayoutBtn')) return;

  var btn       = document.createElement('button');
  btn.id        = 'colGhDelLayoutBtn';
  btn.className = 'col-btn-delete';
  btn.type      = 'button';
  btn.textContent = 'Excluir';
  btn.title     = 'Excluir layout';

  btn.addEventListener('click', function (e) {
    e.stopPropagation();
    if (!colGithubEnsureToken()) return;

    var col = (typeof _colCurrentCollection !== 'undefined') ? _colCurrentCollection : null;
    if (!col) return;

    var layoutId = (document.getElementById('colEditLayoutId') || {}).value || '';
    if (!layoutId) return;

    if (typeof colOpenConfirm === 'function') {
      colOpenConfirm({
        title:     'Excluir Layout?',
        body:      'O layout "' + layoutId + '" será removido permanentemente da coleção "' + col.name + '".',
        labelOk:   'Excluir',
        danger:    true,
        onConfirm: function () {
          colGhDeleteLayout(col.slug, layoutId).then(function (ok) {
            if (ok && typeof colCloseEditLayoutModal === 'function') colCloseEditLayoutModal();
          });
        },
      });
    }
  });

  anchor.appendChild(btn);
}


/* ═══════════════════════════════════════════════════════════════════════
   OBSERVER — re-injeta botões quando os modais são criados dinamicamente
   (col-modals.js cria os overlays sob demanda na primeira abertura)
═══════════════════════════════════════════════════════════════════════ */

function colGhObserveModals() {
  var observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (m) {
      m.addedNodes.forEach(function (node) {
        if (node.nodeType !== 1) return;
        var id = node.id || '';

        /* Injeções nos overlays recém-criados */
        if (id === 'colCreateOverlay')    setTimeout(colGhInjectCreateButton,       0);
        if (id === 'colEditOverlay') {
          setTimeout(colGhInjectEditButton,         0);
          setTimeout(colGhInjectDeleteButtons,      0);
        }
        if (id === 'colAddLayoutOverlay') setTimeout(colGhInjectAddLayoutButton,    0);
        if (id === 'colEditLayoutOverlay') {
          setTimeout(colGhInjectEditLayoutButton,   0);
          setTimeout(colGhInjectDeleteLayoutButtons,0);
        }
      });
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });
}

/* ═══════════════════════════════════════════════════════════════════════
   INICIALIZAÇÃO — só ativa no GitHub Pages
═══════════════════════════════════════════════════════════════════════ */

function initSenkoColecoesGithub() {
  if (initSenkoColecoesGithub.initialized) return;
  initSenkoColecoesGithub.initialized = true;
  if (!window.location.hostname.match(/^[^.]+\.github\.io$/i)) return;

  colGithubRegisterShellProvider();
  colGhObserveModals();

  /* Injeções iniciais para overlays já existentes no DOM
     (caso os modais tenham sido criados antes deste script) */
  colGhInjectCreateButton();
  colGhInjectEditButton();
  colGhInjectAddLayoutButton();
  colGhInjectEditLayoutButton();
  colGhInjectDeleteButtons();
  colGhInjectDeleteLayoutButtons();
}

window.SenkoColecoesGithub = {
  init: initSenkoColecoesGithub
};
