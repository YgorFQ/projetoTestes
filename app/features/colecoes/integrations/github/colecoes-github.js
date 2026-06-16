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

/*
 * A configuracao GitHub e global porque owner/repo/token pertencem ao projeto.
 * A logica continua local: Colecoes nao importa nem chama a Biblioteca.
 */

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
  var saved = colGithubReadStoredConfig();
  if (saved) return saved;

  var host = window.location.hostname || '';
  var parts = window.location.pathname.split('/').filter(Boolean);
  if (/^[^.]+\.github\.io$/i.test(host) && parts.length > 0) {
    return { OWNER: host.split('.')[0], REPO: parts[0], BRANCH: 'main', _auto: true };
  }

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
  var saved = colGithubReadStoredConfig();
  if (!saved) return;
  COL_GITHUB_CONFIG.OWNER = saved.OWNER;
  COL_GITHUB_CONFIG.REPO = saved.REPO;
  COL_GITHUB_CONFIG.BRANCH = saved.BRANCH || 'main';
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
  return 'app/features/colecoes/data/' + slug.toLowerCase() + '.js';
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
  Monta o conteúdo completo de um arquivo de coleção a partir de um objeto.
  Usado na criação e também para reescrever após edições de metadados.
*/
function colGhBuildFileContent(col) {
  var tagsStr = (col.tags || [])
    .map(function (t) { return "'" + colGhEscapeJsString(t) + "'"; })
    .join(', ');

  var layoutsCode = (col.layouts || []).map(function (l) {
    var safeHtml = colGithubEscapeTemplateLiteral(l.html);
    var safeCss  = colGithubEscapeTemplateLiteral(l.css);
    return (
      '\n    /*@@@@Col - ' + l.id + ' */\n' +
      '    {\n' +
      "      id:   '" + colGhEscapeJsString(l.id)   + "',\n" +
      "      name: '" + colGhEscapeJsString(l.name) + "',\n" +
      '      html: `' + safeHtml + '`,\n' +
      '      css:  `' + safeCss  + '`,\n' +
      '    },'
    );
  }).join('\n');

  return (
    '// @ts-nocheck\n' +
    '/* ═══════════════════════════════════════════════════════════════════════\n' +
    '   app/features/colecoes/data/' + col.slug + '.js — Coleção: ' + col.name + '\n' +
    '\n' +
    '   ATENÇÃO: Arquivo gerado pelo modulo GitHub de Colecoes.\n' +
    '   NÃO edite manualmente em produção.\n' +
    '═══════════════════════════════════════════════════════════════════════ */\n' +
    'ColLib.register({\n' +
    "  slug:  '" + colGhEscapeJsString(col.slug)  + "',\n" +
    "  name:  '" + colGhEscapeJsString(col.name)  + "',\n" +
    "  group: '" + colGhEscapeJsString(col.group) + "',\n" +
    '  tags:  [' + tagsStr   + '],\n' +
    '  layouts: [' + layoutsCode + '\n' +
    '  ]\n' +
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

/*
  Parser de layout dentro de um arquivo de coleção.
  Localiza o bloco `/*@@@@Col - [id] * /` e retorna { start, end }.
  Seguro para template literals com backticks escapados.
*/
function colGhFindLayoutBounds(content, layoutId) {
  var marker    = '/*@@@@Col - ' + layoutId + ' */';
  var markerPos = content.indexOf(marker);
  if (markerPos === -1) return null;

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

/*
  Monta o bloco de código de um layout para inserção/substituição no arquivo.
*/
function colGhBuildLayoutBlock(layout) {
  var safeHtml = colGithubEscapeTemplateLiteral(layout.html);
  var safeCss  = colGithubEscapeTemplateLiteral(layout.css);
  return (
    '    /*@@@@Col - ' + layout.id + ' */\n' +
    '    {\n' +
    "      id:   '" + colGhEscapeJsString(layout.id)   + "',\n" +
    "      name: '" + colGhEscapeJsString(layout.name) + "',\n" +
    '      html: `' + safeHtml + '`,\n' +
    '      css:  `' + safeCss  + '`,\n' +
    '    },'
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

/*
 * Confere os nomes do arquivo remoto, alem do estado em memoria. Essa
 * segunda camada cobre abas antigas que ainda nao receberam uma edicao.
 */
function colGhContentHasLayoutName(content, name, exceptLayoutId) {
  var target = colGhNormalizeName(name);
  var re = /\/\*@@@@Col - ([^*]+) \*\/[\s\S]*?\bname:\s*'((?:\\.|[^'])*)'/g;
  var match;

  while ((match = re.exec(content)) !== null) {
    var layoutId = String(match[1] || '').trim();
    if (layoutId !== exceptLayoutId && colGhNormalizeName(match[2]) === target) {
      return true;
    }
  }
  return false;
}

function colGhGetFile(slug) {
  var path = colGhFilePath(slug);
  return colGithubGetFile(path).then(function (data) {
    return { exists: true, sha: data.sha, content: data.content, path: path };
  }).catch(function (err) {
    if (err.message && err.message.indexOf('404') !== -1) {
      return { exists: false, path: path };
    }
    throw err;
  });
}

/*
  Adiciona ou remove o arquivo no manifesto privado da feature.
*/
function colGhSetManifestEntry(slug, shouldInclude, metadata) {
  /*
   * O manifesto e o catalogo privado de Colecoes. Nenhuma operacao desta
   * feature precisa editar o index.html ou arquivos de outra janela.
   */
  var manifestPath = 'app/features/colecoes/data/manifest.js';
  var normalizedSlug = slug.toLowerCase();
  var fileName = normalizedSlug + '.js';

  return colGithubGetFile(manifestPath).then(function (data) {
    var manifest;
    try {
      /*
       * Le somente o objeto JSON atribuido ao namespace de Colecoes. Nao usa
       * eval e nao executa o conteudo recebido da API do GitHub.
       */
      var assignment = 'window.SenkoColecoesManifest';
      var assignmentIndex = data.content.indexOf(assignment);
      var equalsIndex = data.content.indexOf('=', assignmentIndex);
      var source = equalsIndex === -1
        ? ''
        : data.content.slice(equalsIndex + 1).trim().replace(/;\s*$/, '');

      if (assignmentIndex === -1 || !source) {
        throw new Error('Formato do catalogo nao reconhecido.');
      }
      manifest = JSON.parse(source);
    } catch (error) {
      throw new Error('Catalogo de Colecoes possui JavaScript invalido.');
    }

    if (!Array.isArray(manifest.collections)) manifest.collections = [];

    var index = -1;
    for (var i = 0; i < manifest.collections.length; i++) {
      var current = manifest.collections[i];
      if (
        current === fileName ||
        (current && typeof current === 'object' &&
          (current.file === fileName || current.slug === normalizedSlug))
      ) {
        index = i;
        break;
      }
    }

    if (shouldInclude) {
      var source = metadata || {};
      var nextEntry = {
        file: fileName,
        slug: normalizedSlug,
        name: source.name || normalizedSlug,
        group: source.group || '',
        tags: Array.isArray(source.tags) ? source.tags : [],
        layoutCount: Number(source.layoutCount) || 0
      };

      if (index === -1) manifest.collections.push(nextEntry);
      else manifest.collections[index] = nextEntry;
    } else if (index !== -1) {
      manifest.collections.splice(index, 1);
    }

    if (!shouldInclude && index === -1) {
      return manifestPath;
    }

    return colGithubPutFile(
      manifestPath,
      '/* Catalogo privado de Colecoes. Atualizado pela integracao GitHub. */\n' +
        'window.SenkoColecoesManifest = ' +
        JSON.stringify(manifest, null, 2) +
        ';\n',
      data.sha,
      shouldInclude
        ? '[Colecoes] register collection file: ' + slug
        : '[Colecoes] unregister collection file: ' + slug
    ).then(function () {
      return manifestPath;
    });
  });
}

function colGhSyncManifestFromMemory(slug) {
  var col = typeof ColLib !== 'undefined' ? ColLib.getBySlug(slug) : null;
  if (!col) return Promise.resolve();

  return colGhSetManifestEntry(slug, true, {
    name: col.name,
    group: col.group,
    tags: col.tags || [],
    layoutCount: (col.layouts || []).length
  });
}


/* ═══════════════════════════════════════════════════════════════════════
   FLUSH DE GRUPOS PENDENTES
   Deve ser chamado ANTES de qualquer commit de coleção.
   Se não houver grupos pendentes, resolve imediatamente sem fazer nada.
═══════════════════════════════════════════════════════════════════════ */

function colGhFlushGroups() {
  /* Sem pendentes — resolve imediatamente */
  if (typeof ColGroups === 'undefined') return Promise.resolve();
  var pending = ColGroups.getPending();
  if (pending.length === 0) return Promise.resolve();

  colGithubSetStatus('Salvando grupos…', 'saving');

  var newContent = colGhBuildGroupsFileContent();

  return colGithubGetFile('app/features/colecoes/data/col-groups-data.js').then(function (data) {
    return colGithubPutFile(
      'app/features/colecoes/data/col-groups-data.js',
      newContent,
      data.sha,
      '[Colecoes] update groups (' + pending.map(function (g) { return g.slug; }).join(', ') + ')'
    );
  }).then(function () {
    ColGroups.clearPending();
    colGithubSetStatus('✓ Grupos salvos', 'ok');
  }).catch(function (e) {
    /* Arquivo de grupos ainda não existe — cria */
    if (e.message && e.message.indexOf('404') !== -1) {
      return colGithubPutFile(
        'app/features/colecoes/data/col-groups-data.js',
        newContent,
        null,
        '[Colecoes] create groups file'
      ).then(function () {
        ColGroups.clearPending();
        colGithubSetStatus('✓ Grupos salvos', 'ok');
      });
    }
    throw e;
  });
}


/* ═══════════════════════════════════════════════════════════════════════
   CRIAR COLEÇÃO
═══════════════════════════════════════════════════════════════════════ */

function colGhCreateCollection(colData) {
  if (typeof ColLib !== 'undefined'
      && typeof ColLib.hasCollectionName === 'function'
      && ColLib.hasCollectionName(colData.name, null)) {
    colGithubShowErrorModal('Ja existe uma colecao com o nome "' + colData.name + '". Escolha outro nome.');
    return Promise.resolve(false);
  }

  if (!colGithubLockSave()) return Promise.resolve(false);
  if (!colGithubEnsureToken()) {
    colGithubUnlockSave();
    colGithubSetStatus('Token não configurado', 'error');
    return Promise.resolve(false);
  }

  colGithubSetStatus('Verificando duplicata…', 'saving');

  var slug = colData.slug;
  var path = colGhFilePath(slug);

  /* 1. Flush de grupos pendentes */
  return colGhFlushGroups()

  /* 2. Verifica se o arquivo já existe */
  .then(function () {
    return colGhGetFile(slug);
  })
  .then(function (fileInfo) {
    if (fileInfo.exists) {
      colGithubSetStatus('Coleção já existe', 'error');
      colGithubUnlockSave();
      colGithubShowErrorModal('Já existe uma coleção com esse nome no repositório.\nEscolha outro nome.');
      return false;
    }

    colGithubSetStatus('Criando arquivo…', 'saving');

    var newObj = {
      slug:    slug,
      name:    colData.name,
      group:   colData.group,
      tags:    colData.tags || [],
      layouts: [],
    };

    var content = colGhBuildFileContent(newObj);

    /* 3. Cria o arquivo da coleção */
    return colGithubPutFile(
      path,
      content,
      null,
      '[Colecoes] create collection: ' + slug
    );
  })

  /* 4. Registra o arquivo no manifesto de Colecoes */
  .then(function (result) {
    if (result === false) return false;
    colGithubSetStatus('Atualizando manifesto de Colecoes…', 'saving');
    return colGhSetManifestEntry(slug, true, {
      name: colData.name,
      group: colData.group,
      tags: colData.tags || [],
      layoutCount: 0
    }).then(function () { return true; });
  })

  /* 5. Atualiza memória e UI */
  .then(function (ok) {
    if (!ok) return false;
    ColLib.register({
      slug:    colData.slug,
      name:    colData.name,
      group:   colData.group,
      tags:    colData.tags || [],
      layouts: [],
    });
    colGithubSetStatus('✓ Coleção criada: ' + slug, 'ok');
    colGithubUnlockSave();
    if (typeof colGithubStartDeployWatch === 'function') colGithubStartDeployWatch(colGhFilePath(slug));
    if (typeof colRenderGrid === 'function') colRenderGrid();
    return true;
  })

  .catch(function (e) {
    console.error('[colecoes-github] Erro ao criar coleção:', e);
    colGithubSetStatus('Erro: ' + e.message, 'error');
    colGithubUnlockSave();
    colGithubShowErrorModal(e.message);
    return false;
  });
}


/* ═══════════════════════════════════════════════════════════════════════
   EDITAR METADADOS DE COLEÇÃO (name, group, tags)
   Não toca nos layouts — reescreve o arquivo preservando-os.
═══════════════════════════════════════════════════════════════════════ */

function colGhEditCollection(colData) {
  if (typeof ColLib !== 'undefined'
      && typeof ColLib.hasCollectionName === 'function'
      && ColLib.hasCollectionName(colData.name, colData.slug)) {
    colGithubShowErrorModal('Ja existe outra colecao com o nome "' + colData.name + '". Escolha outro nome.');
    return Promise.resolve(false);
  }

  if (!colGithubLockSave()) return Promise.resolve(false);
  if (!colGithubEnsureToken()) {
    colGithubUnlockSave();
    colGithubSetStatus('Token não configurado', 'error');
    return Promise.resolve(false);
  }

  var slug = colData.slug;
  colGithubSetStatus('Lendo coleção…', 'saving');

  /* Lê arquivo atual (flush de grupos é feito APÓS salvar a coleção,
     quando a memória já reflete o novo grupo — veja comentário abaixo) */
  return colGhGetFile(slug)
  .then(function (fileInfo) {
    if (!fileInfo.exists) {
      colGithubSetStatus('Arquivo não encontrado', 'error');
      colGithubUnlockSave();
      colGithubShowErrorModal('Arquivo da coleção "' + slug + '" não encontrado no repositório.');
      return false;
    }

    /* Preserva os layouts que já existem na memória */
    var existing = typeof ColLib !== 'undefined' ? ColLib.getBySlug(slug) : null;
    var newObj   = {
      slug:    slug,
      name:    colData.name,
      group:   colData.group,
      tags:    colData.tags || [],
      layouts: existing ? (existing.layouts || []) : [],
    };

    var newContent = colGhBuildFileContent(newObj);
    colGithubSetStatus('Salvando no GitHub…', 'saving');

    return colGithubPutFile(
      fileInfo.path,
      newContent,
      fileInfo.sha,
      '[Colecoes] edit collection: ' + slug
    ).then(function () {
      /* Atualiza a memoria antes de regravar os dados relacionados.
         colGhBuildGroupsFileContent preserva todos os grupos cadastrados,
         inclusive os que ficaram sem colecao apontando para eles. */
      ColLib.updateCollection(slug, {
        name:  colData.name,
        group: colData.group,
        tags:  colData.tags,
      });

      return colGhSyncManifestFromMemory(slug).then(function () {
        /* Flush pos-edicao: reescreve col-groups-data.js sem apagar grupos vazios. */
        colGithubSetStatus('Atualizando grupos…', 'saving');
        var groupsContent = colGhBuildGroupsFileContent();

        return colGithubGetFile('app/features/colecoes/data/col-groups-data.js').then(function (gData) {
          return colGithubPutFile(
            'app/features/colecoes/data/col-groups-data.js',
            groupsContent,
            gData.sha,
            '[Colecoes] sync groups after edit: ' + slug
          );
        }).catch(function (err) {
          if (err.message && err.message.indexOf('404') !== -1) {
            return colGithubPutFile(
              'app/features/colecoes/data/col-groups-data.js',
              groupsContent,
              null,
              '[Colecoes] create groups file'
            );
          }
          throw err;
        }).then(function () {
          if (typeof ColGroups !== 'undefined') ColGroups.clearPending();
          colGithubSetStatus('✓ Metadados salvos', 'ok');
          colGithubUnlockSave();
          if (typeof colGithubStartDeployWatch === 'function') colGithubStartDeployWatch(fileInfo.path);
          if (typeof colRenderGrid === 'function') colRenderGrid();
          return true;
        });
      });
    });
  })

  .catch(function (e) {
    console.error('[colecoes-github] Erro ao editar coleção:', e);
    colGithubSetStatus('Erro: ' + e.message, 'error');
    colGithubUnlockSave();
    colGithubShowErrorModal(e.message);
    return false;
  });
}


/* ═══════════════════════════════════════════════════════════════════════
   EXCLUIR COLEÇÃO
   Remove o arquivo da coleção e sua entrada no manifesto da feature.
═══════════════════════════════════════════════════════════════════════ */

function colGhDeleteCollection(slug) {
  if (!colGithubLockSave()) return Promise.resolve(false);
  if (!colGithubEnsureToken()) {
    colGithubUnlockSave();
    colGithubSetStatus('Token não configurado', 'error');
    return Promise.resolve(false);
  }

  colGithubSetStatus('Excluindo coleção…', 'saving');

  /* 1. Lê o arquivo para obter o SHA */
  return colGhGetFile(slug)
  .then(function (fileInfo) {
    if (!fileInfo.exists) {
      /* Arquivo ja nao existe: limpa memoria e manifesto mesmo assim. */
      return null;
    }
    return colGithubGetFile(fileInfo.path).then(function (data) {
      /* Exclui o arquivo via API (conteúdo vazio + sha) */
      var token = typeof colGithubGetToken === 'function' ? colGithubGetToken() : '';
      var url   = 'https://api.github.com/repos/'
        + COL_GITHUB_CONFIG.OWNER + '/'
        + COL_GITHUB_CONFIG.REPO  + '/contents/'
        + fileInfo.path;
      return fetch(url, {
        method:  'DELETE',
        headers: {
          'Authorization': 'token ' + token,
          'Accept':        'application/vnd.github+json',
          'Content-Type':  'application/json',
        },
        body: JSON.stringify({
          message: '[Colecoes] delete collection: ' + slug,
          sha:     data.sha,
          branch:  COL_GITHUB_CONFIG.BRANCH,
        }),
      }).then(function (res) {
        if (!res.ok) {
          return res.json().then(function (d) {
            throw new Error('GitHub DELETE falhou (' + res.status + '): ' + (d.message || fileInfo.path));
          });
        }
        return true;
      });
    });
  })

  /* 2. Remove o arquivo do manifesto de Colecoes */
  .then(function () {
    colGithubSetStatus('Atualizando manifesto de Colecoes…', 'saving');
    return colGhSetManifestEntry(slug, false);
  })

  /* 3. Atualiza memória e UI */
  .then(function () {
    ColLib.removeCollection(slug);
    colGithubSetStatus('✓ Coleção excluída', 'ok');
    colGithubUnlockSave();
    if (typeof colRenderGrid === 'function') colRenderGrid();
    return true;
  })

  .catch(function (e) {
    console.error('[colecoes-github] Erro ao excluir coleção:', e);
    colGithubSetStatus('Erro: ' + e.message, 'error');
    colGithubUnlockSave();
    colGithubShowErrorModal(e.message);
    return false;
  });
}


/* ═══════════════════════════════════════════════════════════════════════
   ADICIONAR LAYOUT À COLEÇÃO
   Insere o bloco do layout antes do fechamento `]` do array layouts.
═══════════════════════════════════════════════════════════════════════ */

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

  colGithubSetStatus('Lendo coleção…', 'saving');

  return colGhGetFile(slug)
  .then(function (fileInfo) {
    if (!fileInfo.exists) {
      colGithubSetStatus('Coleção não encontrada', 'error');
      colGithubUnlockSave();
      colGithubShowErrorModal('Arquivo da coleção "' + slug + '" não encontrado no repositório.');
      return false;
    }

    var content = fileInfo.content;
    var sha     = fileInfo.sha;

    /* Verifica o identificador interno gerado a partir do nome. */
    var idMarker = '/*@@@@Col - ' + layoutData.id + ' */';
    if (content.indexOf(idMarker) !== -1) {
      colGithubSetStatus('Nome de layout duplicado', 'error');
      colGithubUnlockSave();
      colGithubShowErrorModal('Já existe um layout com esse nome nesta coleção.\nEscolha outro nome.');
      return false;
    }
    if (colGhContentHasLayoutName(content, layoutData.name, null)) {
      colGithubSetStatus('Nome de layout duplicado', 'error');
      colGithubUnlockSave();
      colGithubShowErrorModal('Ja existe um layout com o nome "' + layoutData.name + '" nesta colecao.');
      return false;
    }

    /* Localiza o fechamento do array de layouts: `  ]` antes do `});` */
    var closePos = content.lastIndexOf('\n  ]');
    if (closePos === -1) {
      colGithubSetStatus('Estrutura do arquivo inválida', 'error');
      colGithubUnlockSave();
      colGithubShowErrorModal('Não foi possível localizar o fechamento do array de layouts em "' + fileInfo.path + '".');
      return false;
    }

    var block      = colGhBuildLayoutBlock(layoutData);
    var newContent =
      content.slice(0, closePos) +
      '\n' + block + '\n' +
      content.slice(closePos);

    colGithubSetStatus('Salvando no GitHub…', 'saving');

    return colGithubPutFile(
      fileInfo.path,
      newContent,
      sha,
      '[Colecoes] add layout "' + layoutData.id + '" to collection: ' + slug
    ).then(function () {
      ColLib.addLayout(slug, layoutData);
      return colGhSyncManifestFromMemory(slug).then(function () {
        colGithubSetStatus('✓ Layout adicionado', 'ok');
        colGithubUnlockSave();
        if (typeof colGithubStartDeployWatch === 'function') colGithubStartDeployWatch(fileInfo.path);
        /* Re-renderiza o grid de layouts dentro do modal de coleção */
        var col = typeof ColLib !== 'undefined' ? ColLib.getBySlug(slug) : null;
        if (col && typeof _colRenderLayoutsGrid === 'function') _colRenderLayoutsGrid(col);
        if (typeof colRenderGrid === 'function') colRenderGrid();
        return true;
      });
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
   Substitui o bloco existente usando o parser de marcadores.
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

  return colGhGetFile(slug)
  .then(function (fileInfo) {
    if (!fileInfo.exists) {
      colGithubSetStatus('Coleção não encontrada', 'error');
      colGithubUnlockSave();
      colGithubShowErrorModal('Arquivo da coleção "' + slug + '" não encontrado.');
      return false;
    }

    var content = fileInfo.content;
    var sha     = fileInfo.sha;
    if (colGhContentHasLayoutName(content, layoutData.name, layoutId)) {
      colGithubSetStatus('Nome de layout duplicado', 'error');
      colGithubUnlockSave();
      colGithubShowErrorModal('Ja existe outro layout com o nome "' + layoutData.name + '" nesta colecao.');
      return false;
    }
    var bounds  = colGhFindLayoutBounds(content, layoutId);

    if (!bounds) {
      colGithubSetStatus('Layout não encontrado', 'error');
      colGithubUnlockSave();
      colGithubShowErrorModal('Marcador do layout "' + layoutId + '" não encontrado em "' + fileInfo.path + '".');
      return false;
    }

    var block      = colGhBuildLayoutBlock(layoutData);
    var newContent =
      content.slice(0, bounds.start) +
      block + '\n' +
      content.slice(bounds.end);

    colGithubSetStatus('Salvando no GitHub…', 'saving');

    return colGithubPutFile(
      fileInfo.path,
      newContent,
      sha,
      '[Colecoes] edit layout "' + layoutId + '" in collection: ' + slug
    ).then(function () {
      ColLib.updateLayout(slug, layoutId, layoutData);
      colGithubSetStatus('✓ Layout salvo', 'ok');
      colGithubUnlockSave();
      if (typeof colGithubStartDeployWatch === 'function') colGithubStartDeployWatch(fileInfo.path);
      var col = typeof ColLib !== 'undefined' ? ColLib.getBySlug(slug) : null;
      if (col && typeof _colRenderLayoutsGrid === 'function') _colRenderLayoutsGrid(col);
      return true;
    });
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
   Remove o bloco do layout usando o parser de marcadores.
═══════════════════════════════════════════════════════════════════════ */

function colGhDeleteLayout(slug, layoutId) {
  if (!colGithubLockSave()) return Promise.resolve(false);
  if (!colGithubEnsureToken()) {
    colGithubUnlockSave();
    colGithubSetStatus('Token não configurado', 'error');
    return Promise.resolve(false);
  }

  colGithubSetStatus('Lendo coleção…', 'saving');

  return colGhGetFile(slug)
  .then(function (fileInfo) {
    if (!fileInfo.exists) {
      colGithubSetStatus('Coleção não encontrada', 'error');
      colGithubUnlockSave();
      colGithubShowErrorModal('Arquivo da coleção "' + slug + '" não encontrado.');
      return false;
    }

    var content = fileInfo.content;
    var sha     = fileInfo.sha;
    var bounds  = colGhFindLayoutBounds(content, layoutId);

    if (!bounds) {
      colGithubSetStatus('Layout não encontrado', 'error');
      colGithubUnlockSave();
      colGithubShowErrorModal('Marcador do layout "' + layoutId + '" não encontrado. Verifique o arquivo manualmente.');
      return false;
    }

    var newContent =
      content.slice(0, bounds.start) +
      content.slice(bounds.end);

    colGithubSetStatus('Salvando no GitHub…', 'saving');

    return colGithubPutFile(
      fileInfo.path,
      newContent,
      sha,
      '[Colecoes] delete layout "' + layoutId + '" from collection: ' + slug
    ).then(function () {
      ColLib.removeLayout(slug, layoutId);
      return colGhSyncManifestFromMemory(slug).then(function () {
        colGithubSetStatus('✓ Layout excluído', 'ok');
        colGithubUnlockSave();
        if (typeof colGithubStartDeployWatch === 'function') colGithubStartDeployWatch(fileInfo.path);
        var col = typeof ColLib !== 'undefined' ? ColLib.getBySlug(slug) : null;
        if (col && typeof _colRenderLayoutsGrid === 'function') _colRenderLayoutsGrid(col);
        if (typeof colRenderGrid === 'function') colRenderGrid();
        return true;
      });
    });
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
