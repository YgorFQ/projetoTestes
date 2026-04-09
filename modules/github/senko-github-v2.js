// @ts-nocheck
/* ═══════════════════════════════════════════════════════════════════════
   senko-github-v2.js — Módulo: salvar direto no GitHub (v2 — token seguro)
   ───────────────────────────────────────────────────────────────────────
   DIFERENÇAS DA v1:
     - Token NÃO fica no código-fonte (evita revogação automática do GitHub)
     - Token é pedido via prompt e salvo no localStorage do navegador
     - Botão de cadeado no header indica estado do token

   COMO USAR:
     Adicione no index.html APÓS o script.js:
       <script src="senko-github-v2.js"></script>

   REQUISITOS:
     - Personal Access Token do GitHub com escopo "repo" (classic)
       ou permissão Contents read/write (fine-grained)
     - Chrome, Edge ou Firefox (qualquer navegador moderno)
     - Funciona direto do GitHub Pages — sem Live Server necessário
═══════════════════════════════════════════════════════════════════════ */

/* ═══════════════════════════════════════════════════════════════════════
   CONFIG — detecção automática pelo GitHub Pages URL
   ───────────────────────────────────────────────────────────────────────
   GitHub Pages usa o padrão: [owner].github.io/[repo]
   Ex: ygorMartins-webm.github.io/SenkoLib
     → OWNER = 'ygorMartins-webm'
     → REPO  = 'SenkoLib'

   Fallback: localhost / Live Server
     → lê do localStorage via modal de configuração estilizado
     → botão de engrenagem ao lado do cadeado no header
═══════════════════════════════════════════════════════════════════════ */

var GH_CONFIG_KEY = 'senkolib_github_config';

var GITHUB_CONFIG = (function () {
  var hostname = window.location.hostname;
  var pathname = window.location.pathname;

  /* ── GitHub Pages: [owner].github.io ── */
  var pagesMatch = hostname.match(/^([^.]+)\.github\.io$/i);
  if (pagesMatch) {
    var owner = pagesMatch[1];
    var repo  = pathname.replace(/^\//, '').split('/')[0] || '';
    if (owner && repo) {
      return { OWNER: owner, REPO: repo, BRANCH: 'main', _auto: true };
    }
  }

  /* ── Fallback: lê do localStorage ── */
  try {
    var saved = JSON.parse(localStorage.getItem(GH_CONFIG_KEY) || 'null');
    if (saved && saved.OWNER && saved.REPO) return saved;
  } catch (e) {}

  /* Retorna vazio — modal de configuração pedirá os dados */
  return { OWNER: '', REPO: '', BRANCH: 'main', _auto: false };
})();

/* Atualiza GITHUB_CONFIG em runtime após o usuário salvar pelo modal */
function ghApplyConfig(owner, repo, token) {
  GITHUB_CONFIG.OWNER  = owner;
  GITHUB_CONFIG.REPO   = repo;
  GITHUB_CONFIG.BRANCH = 'main';
  var cfg = { OWNER: owner, REPO: repo, BRANCH: 'main' };
  try { localStorage.setItem(GH_CONFIG_KEY, JSON.stringify(cfg)); } catch (e) {}
  if (token) ghSetToken(token);
}

/* ═══════════════════════════════════════════════════════════════════════
   TOKEN — gerenciamento via localStorage
   O token NUNCA fica no código-fonte. Fica salvo no navegador do usuário.
═══════════════════════════════════════════════════════════════════════ */

var GH_TOKEN_KEY = 'senkolib_github_token';

function ghGetToken() {
  return localStorage.getItem(GH_TOKEN_KEY) || '';
}

function ghSetToken(token) {
  if (token) {
    localStorage.setItem(GH_TOKEN_KEY, token.trim());
  } else {
    localStorage.removeItem(GH_TOKEN_KEY);
  }
}

function ghEnsureToken() {
  var token = ghGetToken();
  if (token) return token;
  /* Abre o modal de configuração estilizado em vez do prompt nativo */
  setTimeout(function () {
    if (typeof ghOpenConfigModal === 'function') ghOpenConfigModal();
  }, 0);
  return '';
}





/* ═══════════════════════════════════════════════════════════════════════
   UTILITÁRIOS DE ENCODING UTF-8 SEGURO
═══════════════════════════════════════════════════════════════════════ */

function ghEncodeBase64(str) {
  return btoa(unescape(encodeURIComponent(str)));
}

function ghDecodeBase64(b64) {
  return decodeURIComponent(escape(atob(b64)));
}


/* ═══════════════════════════════════════════════════════════════════════
   STATUS — atualiza o span #ghStatus (agora só no console, sem barra)
═══════════════════════════════════════════════════════════════════════ */

function ghSetStatus(msg, type) {
  var el = document.getElementById('ghStatus');
  if (el) {
    el.textContent = msg;
    el.className = 'gh-status-text' + (type ? ' gh-status-' + type : '');
  }
  if (type === 'error') console.warn('[senko-github]', msg);
  if (type === 'ok') console.log('[senko-github]', msg);
}


/* ═══════════════════════════════════════════════════════════════════════
   API BASE — GitHub Contents API
═══════════════════════════════════════════════════════════════════════ */

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
      throw new Error('Token inválido ou expirado. Clique no cadeado para inserir um novo.');
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
      throw new Error('Token inválido ou expirado. Clique no cadeado para configurar um novo.');
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
      throw new Error('Token inválido ou expirado. Clique no cadeado para configurar um novo.');
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


/* ═══════════════════════════════════════════════════════════════════════
   PARSER — localiza e substitui objetos de layout
═══════════════════════════════════════════════════════════════════════ */

function ghFindObjectBounds(content, layoutId) {
  var marker    = '/*@@@@Senko - ' + layoutId.toLowerCase() + ' */';
  var markerPos = content.indexOf(marker);

  if (markerPos === -1) return { error: 'no_marker' };

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

function ghDeduplicateMarkers(content, layoutId) {
  var marker    = '/*@@@@Senko - ' + layoutId.toLowerCase() + ' */';
  var positions = [];
  var search    = 0;

  while (true) {
    var pos = content.indexOf(marker, search);
    if (pos === -1) break;
    positions.push(pos);
    search = pos + marker.length;
  }

  if (positions.length <= 1) return content;

  for (var k = positions.length - 2; k >= 0; k--) {
    var start   = positions[k];
    var lineEnd = content.indexOf('\n', start);
    if (lineEnd === -1) lineEnd = content.length;
    else lineEnd += 1;
    content = content.slice(0, start) + content.slice(lineEnd);
  }

  return content;
}


/* ═══════════════════════════════════════════════════════════════════════
   RACE CONDITION GUARD
   Impede que duas operações de escrita no GitHub ocorram simultaneamente.
   Cada operação verifica e seta _ghSaving antes de prosseguir.
═══════════════════════════════════════════════════════════════════════ */
var _ghSaving = false;
var _ghSavingTimeout = null;

function ghLockSave() {
  if (_ghSaving) {
    alert('Já existe uma operação em andamento. Aguarde terminar antes de salvar novamente.');
    return false;
  }
  _ghSaving = true;
  _ghSavingTimeout = setTimeout(function () {
    console.warn('[senko-github] Lock liberado por timeout de segurança.');
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


/* ═══════════════════════════════════════════════════════════════════════
   CORE: Salvar layout existente
═══════════════════════════════════════════════════════════════════════ */

function githubSaveLayout(layoutId, objectCode) {
  if (!ghLockSave()) return Promise.resolve(false);
  if (!ghEnsureToken()) {
    ghUnlockSave();
    ghSetStatus('Token não configurado', 'error');
    return Promise.resolve(false);
  }

  ghSetStatus('Buscando arquivo…', 'saving');

  return githubListDir('layouts').then(function (entries) {
    var jsFiles = entries.filter(function (e) {
      return e.type === 'file' && e.name.endsWith('.js');
    });

    var marker = '/*@@@@Senko - ' + layoutId.toLowerCase() + ' */';

    var promises = jsFiles.map(function (entry) {
      return githubGetFile(entry.path).then(function (data) {
        if (data.content.indexOf(marker) !== -1) {
          return { entry: entry, content: data.content, sha: data.sha };
        }
        return null;
      });
    });

    return Promise.all(promises).then(function (results) {
      var candidates = results.filter(Boolean);

      if (candidates.length === 0) {
        ghSetStatus('Marcador não encontrado', 'error');
        alert(
          'Marcador não encontrado para "' + layoutId + '".\n\n' +
          'Se é um layout novo: use o botão "GitHub" no modal de criação.'
        );
        return false;
      }

      if (candidates.length > 1) {
        ghSetStatus('Duplicata detectada', 'error');
        var names = candidates.map(function (c) { return c.entry.name; }).join(', ');
        alert('O marcador de "' + layoutId + '" foi encontrado em mais de um arquivo:\n' + names + '\n\nCorrija a duplicata manualmente.');
        return false;
      }

      var target  = candidates[0];
      var content = ghDeduplicateMarkers(target.content, layoutId);
      var bounds  = ghFindObjectBounds(content, layoutId);

      if (!bounds || bounds.error) {
        ghSetStatus('Objeto não localizado', 'error');
        alert('Não foi possível localizar o objeto "' + layoutId + '" para substituição.\nSalve manualmente.');
        return false;
      }

      var newContent =
        content.slice(0, bounds.start) +
        objectCode + '\n' +
        content.slice(bounds.end);

      ghSetStatus('Salvando no GitHub…', 'saving');

      return githubPutFile(
        target.entry.path,
        newContent,
        target.sha,
        '[SenkoLib] edit layout: ' + layoutId
      ).then(function () {
        var layouts = SenkoLib.getAll();
        for (var i = 0; i < layouts.length; i++) {
          if (layouts[i].id === layoutId) {
            var editName = document.getElementById('editName');
            var editTags = document.getElementById('editTags');
            var editHtml = document.getElementById('editHtml');
            var editCss  = document.getElementById('editCss');
            if (editName) layouts[i].name = editName.value.trim();
            if (editTags) layouts[i].tags = editTags.value.split(',').map(function (t) { return t.trim(); }).filter(Boolean);
            if (editHtml) layouts[i].html = editHtml.value;
            if (editCss)  layouts[i].css  = editCss.value;
            break;
          }
        }
        ghSetStatus('✓ Salvo em ' + target.entry.name, 'ok');
        ghUnlockSave();
        renderGrid();
        return target.entry.name;
      });
    });
  }).catch(function (e) {
    console.error('[senko-github] Erro ao salvar layout:', e);
    ghSetStatus('Erro: ' + e.message, 'error');
    ghUnlockSave();
    alert('Erro ao salvar no GitHub:\n' + e.message);
    return false;
  });
}


/* ═══════════════════════════════════════════════════════════════════════
   CORE: Salvar novo layout em arquivo existente
═══════════════════════════════════════════════════════════════════════ */

function githubSaveNewLayout(fileName, objectCode, layoutId) {
  if (!ghLockSave()) return Promise.resolve(false);
  if (!ghEnsureToken()) {
    ghUnlockSave();
    ghSetStatus('Token não configurado', 'error');
    return Promise.resolve(false);
  }

  ghSetStatus('Lendo arquivo…', 'saving');

  return githubGetFile('layouts/' + fileName).then(function (data) {
    var content = data.content;
    var sha     = data.sha;

    var marker = '/*@@@@Senko - ' + layoutId.toLowerCase() + ' */';
    if (content.indexOf(marker) !== -1) {
      ghSetStatus('ID já existe', 'error');
      ghUnlockSave();
      alert('O ID "' + layoutId + '" já existe em ' + fileName + '.\nUse o botão de editar no card para modificar layouts existentes.');
      return false;
    }

    var closePos = content.lastIndexOf(']);');
    if (closePos === -1) {
      ghSetStatus('Estrutura inválida', 'error');
      ghUnlockSave();
      alert('Não foi possível encontrar o fechamento do array em ' + fileName + '.\nVerifique se o arquivo segue o padrão SenkoLib.register([...]);');
      return false;
    }

    var newContent =
      content.slice(0, closePos) +
      '\n' + objectCode + '\n\n' +
      content.slice(closePos);

    ghSetStatus('Salvando no GitHub…', 'saving');

    return githubPutFile(
      'layouts/' + fileName,
      newContent,
      sha,
      '[SenkoLib] add layout: ' + layoutId
    ).then(function () {
      var addHtml = document.getElementById('addHtml');
      var addCss  = document.getElementById('addCss');
      var addName = document.getElementById('addName');
      var addTags = document.getElementById('addTags');
      var html = addHtml ? addHtml.value : '';
      var css  = addCss  ? addCss.value  : '';
      var name = addName ? addName.value.trim() : layoutId;
      var tags = addTags
        ? addTags.value.split(',').map(function (t) { return t.trim(); }).filter(Boolean)
        : [];

      SenkoLib.register([{ id: layoutId, name: name, tags: tags, html: html, css: css }]);
      ghSetStatus('✓ Salvo em layouts/' + fileName, 'ok');
      ghUnlockSave();
      renderGrid();
      return fileName;
    });
  }).catch(function (e) {
    console.error('[senko-github] Erro ao salvar novo layout:', e);
    ghSetStatus('Erro: ' + e.message, 'error');
    ghUnlockSave();
    alert('Erro ao salvar no GitHub:\n' + e.message);
    return false;
  });
}


/* ═══════════════════════════════════════════════════════════════════════
   CORE: Salvar variante
═══════════════════════════════════════════════════════════════════════ */

function githubSaveVariant(parentId, variantNome, objectCode) {
  if (!ghLockSave()) return Promise.resolve(false);
  if (!ghEnsureToken()) {
    ghUnlockSave();
    ghSetStatus('Token não configurado', 'error');
    return Promise.resolve(false);
  }

  var filePath = 'variants/' + parentId + '.js';
  ghSetStatus('Lendo variantes…', 'saving');

  return githubGetFile(filePath).then(function (data) {
    var content = data.content;
    var sha     = data.sha;

    var marker = '/*@@@@Senko - ' + variantNome.toLowerCase() + ' */';
    var pos    = content.indexOf(marker);

    if (pos === -1) {
      ghSetStatus('Variante não encontrada', 'error');
      ghUnlockSave();
      alert('Variante "' + variantNome + '" não encontrada em ' + filePath);
      return false;
    }
    if (content.indexOf(marker, pos + marker.length) !== -1) {
      ghSetStatus('Variante duplicada', 'error');
      ghUnlockSave();
      alert('A variante "' + variantNome + '" aparece mais de uma vez no arquivo.\nCorrija manualmente.');
      return false;
    }

    var objOpen = content.indexOf('{', pos + marker.length);
    if (objOpen === -1) {
      ghSetStatus('Objeto da variante não encontrado', 'error');
      ghUnlockSave();
      alert('Início do objeto da variante não encontrado.');
      return false;
    }

    var i = objOpen, depth = 0, inTemplate = false, len = content.length, objEnd = -1;
    while (i < len) {
      var ch = content[i];
      if (ch === '`') {
        var backslashes = 0; var j = i - 1;
        while (j >= 0 && content[j] === '\\') { backslashes++; j--; }
        if (backslashes % 2 === 0) inTemplate = !inTemplate;
        i++; continue;
      }
      if (inTemplate) { i++; continue; }
      if (ch === '{') { depth++; i++; continue; }
      if (ch === '}') {
        depth--;
        if (depth === 0) {
          objEnd = i + 1;
          if (content[objEnd] === ',') objEnd++;
          if (content[objEnd] === '\n') objEnd++;
          break;
        }
        i++; continue;
      }
      i++;
    }

    if (objEnd === -1) {
      ghSetStatus('Fim da variante não encontrado', 'error');
      ghUnlockSave();
      alert('Fim do objeto da variante não encontrado.');
      return false;
    }

    var newContent =
      content.slice(0, pos) +
      objectCode + '\n' +
      content.slice(objEnd);

    ghSetStatus('Salvando no GitHub…', 'saving');

    return githubPutFile(
      filePath,
      newContent,
      sha,
      '[SenkoLib] edit variant: ' + variantNome + ' (' + parentId + ')'
    ).then(function () {
      var html = document.getElementById('newVarHtml') ? document.getElementById('newVarHtml').value : '';
      var css  = document.getElementById('newVarCss')  ? document.getElementById('newVarCss').value  : '';
      var variants    = SenkoLib.getVariants(parentId);
      var existingIdx = -1;
      for (var k = 0; k < variants.length; k++) {
        if ((variants[k].name || '').toLowerCase() === variantNome.toLowerCase()) { existingIdx = k; break; }
      }
      if (existingIdx !== -1) {
        variants[existingIdx].html = html;
        variants[existingIdx].css  = css;
      } else {
        SenkoLib.registerVariant(parentId, [{ name: variantNome, html: html, css: css }]);
      }

      ghSetStatus('✓ Salvo em ' + filePath, 'ok');
      ghUnlockSave();
      renderGrid();
      return filePath;
    });
  }).catch(function (e) {
    console.error('[senko-github] Erro ao salvar variante:', e);
    ghSetStatus('Erro: ' + e.message, 'error');
    ghUnlockSave();
    alert('Erro ao salvar variante no GitHub:\n' + e.message);
    return false;
  });
}


/* ═══════════════════════════════════════════════════════════════════════
   UI — Botão cadeado + botões GitHub nos modais
═══════════════════════════════════════════════════════════════════════ */

var GH_ICON = '<svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>';

document.addEventListener('DOMContentLoaded', function () {

  /* ─── Só executa no GitHub Pages ─────────────────────
     Em qualquer outro ambiente (localhost, Live Server,
     servidor externo, file://) este módulo inteiro fica
     inativo — nenhum botão, engrenagem ou elemento GitHub
     é criado na interface.
  ──────────────────────────────────────────────────── */
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
    '.gh-file-select {',
    '  font-family: var(--font-body, sans-serif);',
    '  font-size: .85rem;',
    '  font-weight: 700;',
    '  padding: .35rem .7rem;',
    '  border: 1.5px solid var(--border, #e2e8f0);',
    '  border-radius: var(--radius, 6px);',
    '  background: var(--bg, #fff);',
    '  color: var(--text2, #64748b);',
    '  cursor: pointer;',
    '  height: 34px;',
    '  width: 200px;',
    '}',
    '.gh-auto-group {',
    '  display: inline-flex;',
    '  align-items: center;',
    '  gap: .4rem;',
    '}',
  ].join('\n');
  document.head.appendChild(style);

  /* ─── Modal de configuração (owner + repo + token) ─── */
  (function () {
    var overlay = document.createElement('div');
    overlay.id        = 'ghConfigOverlay';
    overlay.className = 'gh-config-hidden';
    overlay.innerHTML = [
      '<div id="ghConfigModal">',
      '  <div id="ghConfigHeader">',
      '    <div>',
      '      <h3 id="ghConfigTitle">Configuração do GitHub</h3>',
      '      <p id="ghConfigSubtitle">Preencha os dados do repositório onde o SenkoLib está hospedado.</p>',
      '    </div>',
      '    <button id="ghConfigCloseBtn" title="Fechar">✕</button>',
      '  </div>',
      '  <div class="gh-config-fields">',
      '    <div class="gh-config-field">',
      '      <label for="ghConfigOwner">Usuário / Organização <span class="gh-req">*</span></label>',
      '      <input type="text" id="ghConfigOwner" placeholder="ex: meu-usuario" autocomplete="off" />',
      '      <span class="gh-field-desc">Nome da conta GitHub dona do repositório</span>',
      '    </div>',
      '    <div class="gh-config-field">',
      '      <label for="ghConfigRepo">Repositório <span class="gh-req">*</span></label>',
      '      <input type="text" id="ghConfigRepo" placeholder="ex: SenkoLib" autocomplete="off" />',
      '      <span class="gh-field-desc">Nome exato do repositório no GitHub</span>',
      '    </div>',
      '    <div class="gh-config-field">',
      '      <label for="ghConfigToken">Personal Access Token <span class="gh-req">*</span></label>',
      '      <input type="password" id="ghConfigToken" placeholder="ghp_…" autocomplete="off" />',
      '      <span class="gh-field-desc">Token com permissão <code>repo</code> (classic) ou <code>Contents read/write</code> (fine-grained). <a href="https://github.com/settings/tokens" target="_blank" rel="noopener">Gerar token ↗</a></span>',
      '    </div>',
      '  </div>',
      '  <div id="ghConfigError" class="gh-config-error gh-config-hidden"></div>',
      '  <div id="ghConfigActions">',
      '    <button id="ghConfigResetBtn" class="gh-config-reset-btn" title="Limpar configuração salva">Redefinir</button>',
      '    <button id="ghConfigSaveBtn" class="gh-config-save-btn">Verificar e salvar</button>',
      '  </div>',
      '</div>',
    ].join('\n');
    document.body.appendChild(overlay);

    /* Estilos do modal de configuração */
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
      /* Botão de engrenagem no header */
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

    /* Salvar com validação */
    document.getElementById('ghConfigSaveBtn').addEventListener('click', function () {
      var owner = document.getElementById('ghConfigOwner').value.trim();
      var repo  = document.getElementById('ghConfigRepo').value.trim();
      var token = document.getElementById('ghConfigToken').value.trim();

      if (!owner || !repo || !token) {
        ghShowConfigError('Preencha todos os campos obrigatórios.');
        return;
      }

      var saveBtn = this;
      saveBtn.textContent = 'Verificando…';
      saveBtn.disabled    = true;
      ghHideConfigError();

      /* Valida owner + repo + token fazendo um GET no repositório */
      fetch('https://api.github.com/repos/' + owner + '/' + repo, {
        headers: {
          'Authorization': 'token ' + token,
          'Accept': 'application/vnd.github+json'
        }
      }).then(function (res) {
        if (res.status === 401) {
          throw new Error('Token inválido ou sem permissão suficiente. Verifique e tente novamente.');
        }
        if (res.status === 404) {
          throw new Error('Repositório "' + owner + '/' + repo + '" não encontrado. Verifique o usuário e o nome do repositório.');
        }
        if (!res.ok) {
          throw new Error('Erro ao conectar com o GitHub (status ' + res.status + '). Tente novamente.');
        }
        return res.json();
      }).then(function () {
        /* Tudo certo — salva */
        ghApplyConfig(owner, repo, token);
        ghUpdateConfigButton();
        saveBtn.textContent = '✓ Salvo!';
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
    var btn = document.getElementById('ghConfigGearBtn');
    if (!btn) return;
    var configured = !!(GITHUB_CONFIG.OWNER && GITHUB_CONFIG.REPO && ghGetToken());
    btn.classList.toggle('gh-config-active', configured);
    btn.title = configured
      ? 'GitHub configurado: ' + GITHUB_CONFIG.OWNER + '/' + GITHUB_CONFIG.REPO
      : 'Configurar repositório GitHub';
  }

  /* ─── Botões no header ─── */
  var searchWrap = document.querySelector('.search-wrap');
  if (searchWrap) {
    var GEAR_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>';

    /* Botão engrenagem — configuração do repositório */
    var gearBtn = document.createElement('button');
    gearBtn.id        = 'ghConfigGearBtn';
    gearBtn.className = 'gh-config-gear-btn';
    gearBtn.innerHTML = GEAR_SVG;
    searchWrap.parentNode.insertBefore(gearBtn, searchWrap);
    gearBtn.addEventListener('click', ghOpenConfigModal);
    ghUpdateConfigButton();

    /* Se estiver no GitHub Pages (config automática), mostra engrenagem como
       info apenas — não precisa configurar owner/repo, só o token */
    if (GITHUB_CONFIG._auto) {
      gearBtn.title = 'GitHub Pages detectado: ' + GITHUB_CONFIG.OWNER + '/' + GITHUB_CONFIG.REPO + ' — clique para ver/editar';
    }
  }

  /* ─── Span de status oculto (para uso interno) ─── */
  var hiddenStatus = document.createElement('span');
  hiddenStatus.id = 'ghStatus';
  hiddenStatus.className = 'gh-status-text';
  document.body.appendChild(hiddenStatus);

  /* ─── Modal edição — botão GitHub ─────────────────── */
  var saveToFileBtn = document.getElementById('saveToFileBtn');
  if (saveToFileBtn && !document.getElementById('ghSaveLayoutBtn')) {
    var ghEditBtn = document.createElement('button');
    ghEditBtn.id        = 'ghSaveLayoutBtn';
    ghEditBtn.className = 'btn-github';
    ghEditBtn.innerHTML = GH_ICON + ' GitHub';
    ghEditBtn.title     = 'Salvar diretamente no repositório GitHub';
    saveToFileBtn.parentNode.insertBefore(ghEditBtn, saveToFileBtn);

    ghEditBtn.addEventListener('click', function () {
      var code = document.getElementById('editGeneratedCode').textContent;
      var id   = document.getElementById('editId').value.trim().toLowerCase();

      if (!id || code.indexOf('//') === 0) {
        alert('Preencha os campos primeiro.');
        return;
      }

      ghEditBtn.textContent = 'Salvando…';
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

  /* Botões de variante (nova e editar) foram movidos para
     modules/github/senko-github-variants.js              */

  /* ─── Modal criação — select + botão GitHub ────────── */
  var copyGeneratedBtn = document.getElementById('copyGeneratedBtn');
  if (copyGeneratedBtn && !document.getElementById('ghNewLayoutGroup')) {

    var ghSelect = document.createElement('select');
    ghSelect.id        = 'ghTargetFile';
    ghSelect.className = 'gh-file-select';
    ghSelect.disabled  = true;
    ghSelect.innerHTML = '<option value="">-- selecione o arquivo --</option>';

    var ghNewBtn = document.createElement('button');
    ghNewBtn.id        = 'ghSaveNewLayoutBtn';
    ghNewBtn.className = 'btn-github';
    ghNewBtn.innerHTML = GH_ICON + ' GitHub';
    ghNewBtn.title     = 'Salvar novo layout direto no repositório GitHub';

    var ghGroup = document.createElement('div');
    ghGroup.id        = 'ghNewLayoutGroup';
    ghGroup.className = 'gh-auto-group';
    ghGroup.appendChild(ghSelect);
    ghGroup.appendChild(ghNewBtn);
    copyGeneratedBtn.parentNode.insertBefore(ghGroup, copyGeneratedBtn.nextSibling);

    function ghPopulateFileSelect() {
      if (!ghGetToken()) return;

      ghSelect.innerHTML = '<option value="">Carregando…</option>';
      ghSelect.disabled  = true;

      githubListDir('layouts').then(function (entries) {
        var jsFiles = entries
          .filter(function (e) { return e.type === 'file' && e.name.endsWith('.js'); })
          .map(function (e) { return e.name; })
          .sort();

        ghSelect.innerHTML = '<option value="">-- selecione o arquivo --</option>';
        jsFiles.forEach(function (name) {
          var opt = document.createElement('option');
          opt.value       = name;
          opt.textContent = 'layouts/' + name;
          ghSelect.appendChild(opt);
        });
        ghSelect.disabled = false;
      }).catch(function () {
        ghSelect.innerHTML = '<option value="">Erro ao listar</option>';
        ghSelect.disabled  = true;
      });
    }

    var openAddBtn = document.getElementById('openAddModal');
    if (openAddBtn) {
      openAddBtn.addEventListener('click', function () {
        setTimeout(ghPopulateFileSelect, 60);
      });
    }

    if (ghGetToken()) {
      ghPopulateFileSelect();
    }

    ghNewBtn.addEventListener('click', function () {
      var code     = document.getElementById('generatedCode').textContent;
      var id       = document.getElementById('addId').value.trim().toLowerCase();
      var fileName = ghSelect.value;

      if (!id || code.indexOf('//') === 0) {
        alert('Preencha os campos primeiro.');
        return;
      }
      if (!fileName) {
        alert('Selecione o arquivo de destino no dropdown.');
        return;
      }

      ghNewBtn.textContent = 'Salvando…';
      ghNewBtn.disabled    = true;

      githubSaveNewLayout(fileName, code, id).then(function (result) {
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

});