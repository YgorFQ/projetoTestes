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

var GITHUB_CONFIG = {
  OWNER:  'YgorMartins-webm',
  REPO:   'SenkoLib',
  BRANCH: 'main'
};

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

  token = prompt(
    '🔑 Token do GitHub necessário\n\n' +
    'Para salvar direto no repositório, informe seu Personal Access Token do GitHub.\n' +
    'O token precisa ter permissão "repo" (classic) ou "Contents read/write" (fine-grained).\n\n' +
    'Gere um token em: https://github.com/settings/tokens\n\n' +
    'O token será salvo APENAS no seu navegador (localStorage) — só precisa colar 1 vez.'
  );

  if (token && token.trim().length > 10) {
    ghSetToken(token);
    ghUpdateLockButton();
    return token.trim();
  }

  return '';
}


/* ═══════════════════════════════════════════════════════════════════════
   BOTÃO CADEADO — indica estado do token
═══════════════════════════════════════════════════════════════════════ */

var LOCK_CLOSED_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>';
var LOCK_OPEN_SVG   = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/></svg>';

function ghUpdateLockButton() {
  var btn = document.getElementById('ghLockBtn');
  if (!btn) return;

  var hasToken = !!ghGetToken();
  btn.innerHTML = hasToken ? LOCK_OPEN_SVG : LOCK_CLOSED_SVG;
  btn.classList.toggle('gh-lock-active', hasToken);
  btn.title = hasToken ? 'Token GitHub configurado' : 'Configurar token GitHub';
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
    if (!res.ok) {
      return res.json().then(function (e) {
        throw new Error('GitHub GET falhou (' + res.status + '): ' + (e.message || path));
      });
    }
    return res.json();
  }).then(function (data) {
    var raw = (data.content || '').replace(/\n/g, '');
    return {
      content: ghDecodeBase64(raw),
      sha:     data.sha
    };
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
    if (!res.ok) {
      return res.json().then(function (e) {
        throw new Error('GitHub PUT falhou (' + res.status + '): ' + (e.message || path));
      });
    }
    return res.json();
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
    if (!res.ok) {
      return res.json().then(function (e) {
        throw new Error('GitHub LIST falhou (' + res.status + '): ' + (e.message || path));
      });
    }
    return res.json();
  }).then(function (data) {
    return data.map(function (item) {
      return { name: item.name, path: item.path, sha: item.sha, type: item.type };
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
   CORE: Salvar layout existente
═══════════════════════════════════════════════════════════════════════ */

function githubSaveLayout(layoutId, objectCode) {
  if (!ghEnsureToken()) {
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
        renderGrid();
        return target.entry.name;
      });
    });
  }).catch(function (e) {
    console.error('[senko-github] Erro ao salvar layout:', e);
    ghSetStatus('Erro: ' + e.message, 'error');
    alert('Erro ao salvar no GitHub:\n' + e.message);
    return false;
  });
}


/* ═══════════════════════════════════════════════════════════════════════
   CORE: Salvar novo layout em arquivo existente
═══════════════════════════════════════════════════════════════════════ */

function githubSaveNewLayout(fileName, objectCode, layoutId) {
  if (!ghEnsureToken()) {
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
      alert('O ID "' + layoutId + '" já existe em ' + fileName + '.\nUse o botão de editar no card para modificar layouts existentes.');
      return false;
    }

    var closePos = content.lastIndexOf(']);');
    if (closePos === -1) {
      ghSetStatus('Estrutura inválida', 'error');
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
      renderGrid();
      return fileName;
    });
  }).catch(function (e) {
    console.error('[senko-github] Erro ao salvar novo layout:', e);
    ghSetStatus('Erro: ' + e.message, 'error');
    alert('Erro ao salvar no GitHub:\n' + e.message);
    return false;
  });
}


/* ═══════════════════════════════════════════════════════════════════════
   CORE: Salvar variante
═══════════════════════════════════════════════════════════════════════ */

function githubSaveVariant(parentId, variantNome, objectCode) {
  if (!ghEnsureToken()) {
    ghSetStatus('Token não configurado', 'error');
    return Promise.resolve(false);
  }

  var filePath = 'variants/' + parentId + '.js';
  ghSetStatus('Lendo variantes…', 'saving');

  return githubGetFile(filePath).then(function (data) {
    var content = data.content;
    var sha     = data.sha;

    var marker = "nome: '" + variantNome + "'";
    var pos    = content.indexOf(marker);

    if (pos === -1) {
      ghSetStatus('Variante não encontrada', 'error');
      alert('Variante "' + variantNome + '" não encontrada em ' + filePath);
      return false;
    }
    if (content.indexOf(marker, pos + 1) !== -1) {
      ghSetStatus('Variante duplicada', 'error');
      alert('A variante "' + variantNome + '" aparece mais de uma vez no arquivo.\nCorrija manualmente.');
      return false;
    }

    var objOpen = -1;
    var tmpScan = content.lastIndexOf('{', pos);
    while (tmpScan !== -1) {
      var between = content.slice(tmpScan + 1, pos).trim();
      if (/^[\s]*$/.test(between)) {
        objOpen = tmpScan;
        break;
      }
      tmpScan = content.lastIndexOf('{', tmpScan - 1);
    }

    if (objOpen === -1) {
      ghSetStatus('Objeto da variante não encontrado', 'error');
      alert('Início do objeto da variante não encontrado.');
      return false;
    }

    var i          = objOpen;
    var depth      = 0;
    var inTemplate = false;
    var len        = content.length;
    var objEnd     = -1;

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
      alert('Fim do objeto da variante não encontrado.');
      return false;
    }

    var newContent =
      content.slice(0, objOpen) +
      objectCode + ',\n' +
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
        if ((variants[k].nome || variants[k].name) === variantNome) { existingIdx = k; break; }
      }
      if (existingIdx !== -1) {
        variants[existingIdx].html = html;
        variants[existingIdx].css  = css;
      } else {
        SenkoLib.registerVariant(parentId, [{ nome: variantNome, html: html, css: css }]);
      }

      ghSetStatus('✓ Salvo em ' + filePath, 'ok');
      renderGrid();
      return filePath;
    });
  }).catch(function (e) {
    console.error('[senko-github] Erro ao salvar variante:', e);
    ghSetStatus('Erro: ' + e.message, 'error');
    alert('Erro ao salvar variante no GitHub:\n' + e.message);
    return false;
  });
}


/* ═══════════════════════════════════════════════════════════════════════
   UI — Botão cadeado + botões GitHub nos modais
═══════════════════════════════════════════════════════════════════════ */

var GH_ICON = '<svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>';

document.addEventListener('DOMContentLoaded', function () {

  /* ─── Injetar estilos ─────────────────────────────── */
  var style = document.createElement('style');
  style.textContent = [
    '.gh-lock-btn {',
    '  display: inline-flex;',
    '  align-items: center;',
    '  justify-content: center;',
    '  width: 34px;',
    '  height: 34px;',
    '  padding: 0;',
    '  background: var(--card, #fff);',
    '  border: 1.5px solid var(--border, #e2e8f0);',
    '  border-radius: var(--radius, 8px);',
    '  color: var(--text3, #94a3b8);',
    '  cursor: pointer;',
    '  transition: all .2s ease;',
    '  flex-shrink: 0;',
    '}',
    '.gh-lock-btn:hover {',
    '  border-color: var(--text3, #94a3b8);',
    '  background: var(--hover, #f8fafc);',
    '}',
    '.gh-lock-btn.gh-lock-active {',
    '  color: #22c55e;',
    '  border-color: #22c55e40;',
    '  background: #22c55e0a;',
    '  cursor: default;',
    '}',
    '.gh-lock-btn.gh-lock-active:hover {',
    '  border-color: #22c55e40;',
    '  background: #22c55e0a;',
    '}',
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

  /* ─── Botão cadeado — à esquerda da barra de pesquisa ─── */
  var searchWrap = document.querySelector('.search-wrap');
  if (searchWrap) {
    var lockBtn = document.createElement('button');
    lockBtn.id        = 'ghLockBtn';
    lockBtn.className = 'gh-lock-btn';
    lockBtn.innerHTML = LOCK_CLOSED_SVG;
    lockBtn.title     = 'Configurar token GitHub';

    /* Insere antes do search-wrap */
    searchWrap.parentNode.insertBefore(lockBtn, searchWrap);

    lockBtn.addEventListener('click', function () {
      /* Se já tem token, não faz nada */
      if (ghGetToken()) return;

      /* Se não tem, pede o token */
      var token = prompt(
        '🔑 Token do GitHub\n\n' +
        'Cole seu Personal Access Token do GitHub aqui.\n' +
        'Permissão necessária: "repo" (classic) ou "Contents read/write" (fine-grained).\n\n' +
        'Gere em: https://github.com/settings/tokens\n\n' +
        'Você só precisa colar 1 vez — fica salvo no navegador.'
      );

      if (token && token.trim().length > 10) {
        ghSetToken(token);
        ghUpdateLockButton();
      }
    });

    /* Estado inicial */
    ghUpdateLockButton();
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
      });
    });
  }

  /* ─── Modal nova variante — botão GitHub ──────────── */
  var newVarCopyBtn = document.getElementById('newVarCopyBtn');
  if (newVarCopyBtn && !document.getElementById('ghSaveVariantBtn')) {
    var ghVarBtn = document.createElement('button');
    ghVarBtn.id        = 'ghSaveVariantBtn';
    ghVarBtn.className = 'btn-github';
    ghVarBtn.innerHTML = GH_ICON + ' GitHub';
    ghVarBtn.title     = 'Salvar variante diretamente no repositório GitHub';
    newVarCopyBtn.parentNode.insertBefore(ghVarBtn, newVarCopyBtn.nextSibling);

    ghVarBtn.addEventListener('click', function () {
      var nome = document.getElementById('newVarName').value.trim().toLowerCase();
      if (nome.length < 3) {
        alert('Preencha o nome da variante primeiro.');
        return;
      }
      if (!state.currentForVariant) {
        alert('Nenhum layout pai selecionado.');
        return;
      }

      var html     = document.getElementById('newVarHtml').value;
      var css      = document.getElementById('newVarCss').value;
      var safeHtml = html.replace(/`/g, '\\`');
      var safeCss  = css.replace(/`/g, '\\`');
      var parentId = state.currentForVariant.id;

      var objectCode =
        "  { nome: '" + nome + "',\n" +
        '    html: `' + safeHtml + '`,\n' +
        '    css: `'  + safeCss  + '` }';

      ghVarBtn.textContent = 'Salvando…';
      ghVarBtn.disabled    = true;

      githubSaveVariant(parentId, nome, objectCode).then(function (result) {
        if (result) {
          ghVarBtn.innerHTML = GH_ICON + ' Salvo!';
          setTimeout(function () {
            if (typeof closeNewVariantModal === 'function') closeNewVariantModal();
            if (state.currentForVariant) {
              var updated = SenkoLib.getVariants(state.currentForVariant.id);
              if (typeof renderVariantBlocks === 'function') renderVariantBlocks(updated);
              var countEl = document.getElementById('variantsCount');
              if (countEl) countEl.textContent = updated.length + (updated.length === 1 ? ' variação' : ' variações');
            }
            ghVarBtn.innerHTML = GH_ICON + ' GitHub';
            ghVarBtn.disabled  = false;
          }, 1200);
        } else {
          ghVarBtn.innerHTML = GH_ICON + ' GitHub';
          ghVarBtn.disabled  = false;
        }
      });
    });
  }

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
      });
    });
  }

});
