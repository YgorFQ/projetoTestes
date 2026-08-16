(function () {
  /*
   * Senko Team Notes - prototipo de notas compartilhaveis.
   *
   * Cada nota salva no GitHub vira um arquivo proprio em:
   * app/tools/team-notes/data/notes/[id].js
   */
  var currentScript = document.currentScript;
  var baseUrl = currentScript && currentScript.src
    ? new URL('./', currentScript.src).href
    : new URL('app/tools/team-notes/', document.baseURI).href;

  var MANIFEST_PATH = 'app/tools/team-notes/data/manifest.js';
  var NOTES_DIR = 'app/tools/team-notes/data/notes';
  var CONFIG_KEY = 'senkolib_github_config';
  var TOKEN_KEY = 'senkolib_github_token';

  var overlay;
  var modalBody;
  var noteList;
  var searchInput;
  var typeFilter;
  var statusEl;
  var selectedId = '';
  var notes = [];
  var loaded = false;
  var loadingPromise = null;
  var saving = false;
  var previousBodyOverflow = '';
  var previousFocus = null;
  var formDirty = false;

  var fallbackNotes = [
    {
      id: 'exemplo-prompt-pdp',
      title: 'Exemplo de prompt para PDP',
      type: 'prompt',
      tags: ['pdp', 'conteudo-rico'],
      content: 'Cole aqui o prompt usado pela equipe. Depois clique em Salvar no GitHub para criar um arquivo proprio para esta nota.',
      createdAt: '2026-07-20T00:00:00.000Z',
      updatedAt: '2026-07-20T00:00:00.000Z',
      _sample: true
    }
  ];

  window.SenkoTeamNotesData = window.SenkoTeamNotesData || {};
  window.SenkoTeamNotesData.registerNote = function registerNote(note) {
    upsertNote(normalizeNote(note));
  };

  function prototypeUrl(path) {
    var absoluteUrl = new URL(path, baseUrl).href;
    return window.SenkoFreshAssets ? window.SenkoFreshAssets.url(absoluteUrl) : absoluteUrl;
  }

  function loadStyle() {
    var href = prototypeUrl('styles.css');
    if (document.querySelector('link[data-senko-team-notes-style="' + href + '"]')) return;

    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    link.dataset.senkoTeamNotesStyle = href;
    document.head.appendChild(link);
  }

  function loadScript(path) {
    return new Promise(function (resolve, reject) {
      var src = prototypeUrl(path);
      if (document.querySelector('script[data-senko-team-notes-script="' + src + '"]')) {
        resolve();
        return;
      }

      var script = document.createElement('script');
      script.src = src;
      script.async = false;
      script.dataset.senkoTeamNotesScript = src;
      script.onload = function () { resolve(); };
      script.onerror = function () { reject(new Error('Nao foi possivel carregar ' + path)); };
      document.head.appendChild(script);
    });
  }

  function createButton() {
    var button = document.getElementById('senkoTeamNotesBtn');

    if (!button) {
      button = document.createElement('button');
      button.type = 'button';
      button.id = 'senkoTeamNotesBtn';
      button.className = 'theme-toggle senko-team-notes-trigger';
      button.title = 'Notas da equipe';
      button.setAttribute('aria-label', 'Abrir notas da equipe');
      button.setAttribute('aria-haspopup', 'dialog');
      button.setAttribute('aria-expanded', 'false');
      button.innerHTML =
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" aria-hidden="true">' +
        '  <path d="M5 4h14v16H5z" />' +
        '  <path d="M8 8h8M8 12h5M8 16h7" />' +
        '</svg>' +
        '<span class="senko-team-notes-trigger-label">Notas</span>';

      var globalCreateButton = document.getElementById('senkoGlobalCreateBtn');
      var actions = document.querySelector('.header-actions');
      if (globalCreateButton && globalCreateButton.parentNode) {
        globalCreateButton.parentNode.insertBefore(button, globalCreateButton.nextSibling);
      } else if (actions) {
        actions.insertBefore(button, actions.firstChild);
      }
    }

    if (!button.dataset.senkoTeamNotesBound) {
      button.dataset.senkoTeamNotesBound = '1';
      button.addEventListener('click', openModal);
    }

    return button;
  }

  function normalizeNote(note) {
    var safe = note || {};
    return {
      id: String(safe.id || '').trim(),
      title: String(safe.title || '').trim(),
      type: String(safe.type || 'geral').trim() || 'geral',
      tags: Array.isArray(safe.tags) ? safe.tags.map(String).filter(Boolean) : [],
      content: String(safe.content || ''),
      createdAt: safe.createdAt || new Date().toISOString(),
      updatedAt: safe.updatedAt || new Date().toISOString(),
      _sample: Boolean(safe._sample)
    };
  }

  function upsertNote(note) {
    if (!note.id) return;
    for (var i = 0; i < notes.length; i++) {
      if (notes[i].id === note.id) {
        notes[i] = note;
        return;
      }
    }
    notes.push(note);
  }

  function sortedNotes() {
    return notes.slice().sort(function (left, right) {
      return String(right.updatedAt || '').localeCompare(String(left.updatedAt || ''));
    });
  }

  function loadData() {
    if (loaded) return Promise.resolve(notes);
    if (loadingPromise) return loadingPromise;

    loadingPromise = loadScript('data/manifest.js').catch(function () {
      window.SenkoTeamNotesManifest = { notes: [] };
    }).then(function () {
      var manifest = window.SenkoTeamNotesManifest || { notes: [] };
      var entries = Array.isArray(manifest.notes) ? manifest.notes : [];
      return Promise.all(entries.map(function (entry) {
        return loadScript('data/' + entry.file).catch(function (error) {
          console.warn('[team-notes] Falha ao carregar nota:', entry.file, error);
        });
      }));
    }).then(function () {
      loaded = true;
      if (!notes.length) {
        fallbackNotes.forEach(function (note) { upsertNote(normalizeNote(note)); });
      }
      return notes;
    });

    return loadingPromise;
  }

  function escapeHtml(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function slugify(value) {
    var slug = String(value || '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 72);
    return slug || 'nota';
  }

  function uniqueIdFromTitle(title, currentId) {
    var base = slugify(title);
    var id = base;
    var index = 2;
    while (notes.some(function (note) { return note.id !== currentId && note.id === id; })) {
      id = base + '-' + index;
      index += 1;
    }
    return id;
  }

  function parseTags(value) {
    return String(value || '').split(',')
      .map(function (tag) { return tag.trim(); })
      .filter(Boolean);
  }

  function createModal() {
    if (overlay) return;

    overlay = document.createElement('div');
    overlay.className = 'senko-team-notes-overlay';
    overlay.setAttribute('aria-hidden', 'true');
    overlay.innerHTML =
      '<section class="senko-team-notes-modal" role="dialog" aria-modal="true" aria-labelledby="senkoTeamNotesTitle">' +
      '  <div class="senko-team-notes-head">' +
      '    <div class="senko-team-notes-head-copy">' +
      '      <span class="senko-team-notes-kicker">Equipe</span>' +
      '      <h2 id="senkoTeamNotesTitle">Notas da equipe</h2>' +
      '      <p>Prompts, regras e padroes compartilhados em um so lugar.</p>' +
      '    </div>' +
      '    <div class="senko-team-notes-head-actions">' +
      '      <button class="senko-team-notes-gh" id="senkoTeamNotesGithubBtn" type="button">' +
      '        <span class="senko-team-notes-gh-dot" aria-hidden="true"></span>' +
      '        <span id="senkoTeamNotesGithubLabel">Configurar GitHub</span>' +
      '      </button>' +
      '      <button class="senko-team-notes-close" id="senkoTeamNotesCloseBtn" type="button" title="Fechar" aria-label="Fechar notas">×</button>' +
      '    </div>' +
      '  </div>' +
      '  <div class="senko-team-notes-status" id="senkoTeamNotesStatus" role="status" aria-live="polite"></div>' +
      '  <div class="senko-team-notes-body" id="senkoTeamNotesBody">' +
      '    <aside class="senko-team-notes-sidebar">' +
      '      <div class="senko-team-notes-sidebar-head">' +
      '        <div>' +
      '          <span>Biblioteca</span>' +
      '          <strong>Encontre ou crie uma nota</strong>' +
      '        </div>' +
      '        <span class="senko-team-notes-count" id="senkoTeamNotesCount">0 notas</span>' +
      '      </div>' +
      '      <button class="senko-team-notes-new" id="senkoTeamNotesNewBtn" type="button">' +
      '        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>' +
      '        <span>Nova nota</span>' +
      '      </button>' +
      '      <div class="senko-team-notes-tools">' +
      '        <label class="senko-team-notes-search">' +
      '          <span class="senko-team-notes-sr-only">Buscar notas</span>' +
      '          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></svg>' +
      '          <input id="senkoTeamNotesSearch" type="search" placeholder="Buscar por titulo, tag ou conteudo" autocomplete="off">' +
      '        </label>' +
      '        <label class="senko-team-notes-filter">' +
      '          <span>Filtrar</span>' +
      '          <select id="senkoTeamNotesTypeFilter" aria-label="Filtrar notas por tipo">' +
      '            <option value="">Todos os tipos</option>' +
      '            <option value="prompt">Prompts</option>' +
      '            <option value="regra">Regras</option>' +
      '            <option value="guia">Guias</option>' +
      '            <option value="padrao">Padroes</option>' +
      '            <option value="geral">Geral</option>' +
      '          </select>' +
      '        </label>' +
      '      </div>' +
      '      <div class="senko-team-notes-list" id="senkoTeamNotesList"></div>' +
      '    </aside>' +
      '    <form class="senko-team-notes-editor" id="senkoTeamNotesForm">' +
      '      <input type="hidden" id="senkoTeamNotesId">' +
      '      <div class="senko-team-notes-editor-head">' +
      '        <div>' +
      '          <span id="senkoTeamNotesEditorKicker">Nota selecionada</span>' +
      '          <h3 id="senkoTeamNotesEditorTitle">Editar nota</h3>' +
      '          <p id="senkoTeamNotesEditorHint">Atualize os campos e salve quando terminar.</p>' +
      '        </div>' +
      '        <span class="senko-team-notes-dirty" id="senkoTeamNotesDirty">Salva</span>' +
      '      </div>' +
      '      <label class="senko-team-notes-field">' +
      '        <span>Titulo</span>' +
      '        <input id="senkoTeamNotesTitleInput" type="text" placeholder="Ex: Prompt para PDP" required>' +
      '      </label>' +
      '      <div class="senko-team-notes-row">' +
      '        <label class="senko-team-notes-field">' +
      '          <span>Tipo</span>' +
      '          <select id="senkoTeamNotesType">' +
      '            <option value="prompt">Prompt</option>' +
      '            <option value="regra">Regra</option>' +
      '            <option value="guia">Guia</option>' +
      '            <option value="padrao">Padrao</option>' +
      '            <option value="geral">Geral</option>' +
      '          </select>' +
      '        </label>' +
      '        <label class="senko-team-notes-field">' +
      '          <span>Tags</span>' +
      '          <input id="senkoTeamNotesTags" type="text" placeholder="pdp, seo, layout">' +
      '        </label>' +
      '      </div>' +
      '      <label class="senko-team-notes-field senko-team-notes-content-field">' +
      '        <span class="senko-team-notes-content-label"><span>Conteudo</span><small id="senkoTeamNotesContentCount">0 caracteres</small></span>' +
      '        <textarea id="senkoTeamNotesContent" placeholder="Cole aqui prompts, regras, guias ou padroes da equipe." required></textarea>' +
      '      </label>' +
      '      <div class="senko-team-notes-editor-footer">' +
      '        <button class="senko-team-notes-delete" id="senkoTeamNotesDeleteBtn" type="button">Excluir</button>' +
      '        <div class="senko-team-notes-editor-actions">' +
      '          <button class="senko-team-notes-copy" id="senkoTeamNotesCopyBtn" type="button">Copiar conteudo</button>' +
      '          <button class="senko-team-notes-save" id="senkoTeamNotesSaveBtn" type="submit">Salvar nota</button>' +
      '        </div>' +
      '      </div>' +
      '    </form>' +
      '  </div>' +
      '</section>';

    document.body.appendChild(overlay);
    modalBody = document.getElementById('senkoTeamNotesBody');
    noteList = document.getElementById('senkoTeamNotesList');
    searchInput = document.getElementById('senkoTeamNotesSearch');
    typeFilter = document.getElementById('senkoTeamNotesTypeFilter');
    statusEl = document.getElementById('senkoTeamNotesStatus');

    document.getElementById('senkoTeamNotesCloseBtn').addEventListener('click', function () {
      closeModal();
    });
    document.getElementById('senkoTeamNotesNewBtn').addEventListener('click', function () {
      if (canDiscardChanges()) newNote();
    });
    document.getElementById('senkoTeamNotesForm').addEventListener('submit', saveCurrentNote);
    document.getElementById('senkoTeamNotesForm').addEventListener('input', function () {
      formDirty = true;
      updateEditorButtons();
    });
    document.getElementById('senkoTeamNotesCopyBtn').addEventListener('click', copyCurrentNote);
    document.getElementById('senkoTeamNotesDeleteBtn').addEventListener('click', deleteCurrentNote);
    document.getElementById('senkoTeamNotesGithubBtn').addEventListener('click', openGithubConfig);
    searchInput.addEventListener('input', renderList);
    typeFilter.addEventListener('change', renderList);
    noteList.addEventListener('click', function (event) {
      var item = event.target.closest('[data-note-id]');
      if (!item) return;
      if (item.dataset.noteId !== selectedId && !canDiscardChanges()) return;
      selectNote(item.dataset.noteId);
    });
    overlay.addEventListener('click', function (event) {
      if (event.target === overlay) closeModal();
    });
  }

  function canDiscardChanges() {
    return !formDirty || window.confirm('Descartar alteracoes nao salvas desta nota?');
  }

  function setStatus(message, type) {
    if (!statusEl) return;
    statusEl.textContent = message || '';
    statusEl.className = 'senko-team-notes-status' + (type ? ' is-' + type : '');
  }

  function getCurrentNoteFromForm() {
    var idInput = document.getElementById('senkoTeamNotesId');
    var titleInput = document.getElementById('senkoTeamNotesTitleInput');
    var typeInput = document.getElementById('senkoTeamNotesType');
    var tagsInput = document.getElementById('senkoTeamNotesTags');
    var contentInput = document.getElementById('senkoTeamNotesContent');
    var existing = selectedId ? findNote(selectedId) : null;
    var title = titleInput.value.trim();
    var id = idInput.value.trim() || uniqueIdFromTitle(title, selectedId);
    var now = new Date().toISOString();

    return normalizeNote({
      id: id,
      title: title,
      type: typeInput.value || 'geral',
      tags: parseTags(tagsInput.value),
      content: contentInput.value,
      createdAt: existing ? existing.createdAt : now,
      updatedAt: now
    });
  }

  function fillForm(note) {
    var safe = note || normalizeNote({ id: '', title: '', type: 'prompt', tags: [], content: '' });
    document.getElementById('senkoTeamNotesId').value = safe.id || '';
    document.getElementById('senkoTeamNotesTitleInput').value = safe.title || '';
    document.getElementById('senkoTeamNotesType').value = safe.type || 'geral';
    document.getElementById('senkoTeamNotesTags').value = (safe.tags || []).join(', ');
    document.getElementById('senkoTeamNotesContent').value = safe.content || '';
    formDirty = false;
    updateEditorContext(safe);
    updateEditorButtons();
  }

  function updateEditorContext(note) {
    var safe = note || {};
    var isNew = !safe.id;
    var kicker = document.getElementById('senkoTeamNotesEditorKicker');
    var title = document.getElementById('senkoTeamNotesEditorTitle');
    var hint = document.getElementById('senkoTeamNotesEditorHint');
    if (!kicker || !title || !hint) return;

    if (isNew) {
      kicker.textContent = 'Nova nota';
      title.textContent = 'Comece pelo titulo';
      hint.textContent = 'Escolha o tipo, adicione tags e registre o conteudo da equipe.';
      return;
    }

    kicker.textContent = safe._sample ? 'Exemplo local' : 'Nota selecionada';
    title.textContent = safe.title || 'Editar nota';
    hint.textContent = safe._sample
      ? 'Use como referencia ou salve para compartilhar com a equipe.'
      : 'Atualize os campos e salve quando terminar.';
  }

  function updateEditorButtons() {
    var id = (document.getElementById('senkoTeamNotesId') || {}).value || '';
    var content = (document.getElementById('senkoTeamNotesContent') || {}).value || '';
    var note = id ? findNote(id) : null;
    var dirty = document.getElementById('senkoTeamNotesDirty');
    var count = document.getElementById('senkoTeamNotesContentCount');
    document.getElementById('senkoTeamNotesDeleteBtn').disabled = !note || note._sample;
    document.getElementById('senkoTeamNotesCopyBtn').disabled = !content.trim();
    if (count) {
      count.textContent = content.length.toLocaleString('pt-BR') + (content.length === 1 ? ' caractere' : ' caracteres');
    }
    if (dirty) {
      dirty.textContent = formDirty ? 'Alteracoes nao salvas' : (id ? 'Salva' : 'Nova');
      dirty.classList.toggle('is-dirty', formDirty);
    }
  }

  function findNote(id) {
    return notes.find(function (note) { return note.id === id; }) || null;
  }

  function selectNote(id) {
    var note = findNote(id);
    if (!note) return;
    selectedId = id;
    fillForm(note);
    renderList();
    setStatus(note._sample ? 'Exemplo local. Salve no GitHub para criar o arquivo real.' : '', note._sample ? 'info' : '');
  }

  function newNote() {
    selectedId = '';
    fillForm({ id: '', title: '', type: 'prompt', tags: [], content: '' });
    renderList();
    setStatus('Nova nota pronta para preencher.', 'info');
    document.getElementById('senkoTeamNotesTitleInput').focus();
  }

  function noteMatches(note) {
    var q = String(searchInput ? searchInput.value : '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();
    var type = typeFilter ? typeFilter.value : '';
    if (type && note.type !== type) return false;
    if (!q) return true;
    var text = [
      note.title,
      note.type,
      (note.tags || []).join(' '),
      note.content
    ].join(' ').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    return text.indexOf(q) !== -1;
  }

  function renderList() {
    if (!noteList) return;
    var filtered = sortedNotes().filter(noteMatches);
    var count = document.getElementById('senkoTeamNotesCount');
    if (count) {
      count.textContent = filtered.length === notes.length
        ? notes.length + (notes.length === 1 ? ' nota' : ' notas')
        : filtered.length + ' de ' + notes.length;
    }
    if (!filtered.length) {
      noteList.innerHTML =
        '<div class="senko-team-notes-empty">' +
        '  <strong>Nenhuma nota encontrada</strong>' +
        '  <span>Tente outro termo ou remova o filtro.</span>' +
        '</div>';
      return;
    }

    noteList.innerHTML = filtered.map(function (note) {
      var tags = (note.tags || []).slice(0, 3).map(function (tag) {
        return '<span>' + escapeHtml(tag) + '</span>';
      }).join('');
      return (
        '<button class="senko-team-notes-item' + (note.id === selectedId ? ' is-selected' : '') + '" type="button" data-note-id="' + escapeHtml(note.id) + '">' +
        '  <strong>' + escapeHtml(note.title || note.id) + '</strong>' +
        '  <small>' + escapeHtml(typeLabel(note.type)) + (note._sample ? ' · exemplo' : '') + '</small>' +
        '  <span class="senko-team-notes-tags">' + tags + '</span>' +
        '</button>'
      );
    }).join('');
  }

  function typeLabel(type) {
    var labels = {
      prompt: 'Prompt',
      regra: 'Regra',
      guia: 'Guia',
      padrao: 'Padrao',
      geral: 'Geral'
    };
    return labels[type] || 'Geral';
  }

  function updateGithubButton() {
    var btn = document.getElementById('senkoTeamNotesGithubBtn');
    var label = document.getElementById('senkoTeamNotesGithubLabel');
    if (!btn) return;
    var configured = hasGithubCredentials();
    btn.classList.toggle('is-configured', configured);
    if (label) label.textContent = configured ? 'GitHub conectado' : 'Configurar GitHub';
  }

  function detectPagesConfig() {
    var host = window.location.hostname || '';
    var parts = window.location.pathname.split('/').filter(Boolean);
    if (/^[^.]+\.github\.io$/i.test(host) && parts.length > 0) {
      return { OWNER: host.split('.')[0], REPO: parts[0], BRANCH: 'main', _auto: true };
    }
    return null;
  }

  function readStoredConfig() {
    try {
      var saved = JSON.parse(localStorage.getItem(CONFIG_KEY) || 'null');
      if (saved && (saved.OWNER || saved.owner) && (saved.REPO || saved.repo)) {
        return {
          OWNER: saved.OWNER || saved.owner,
          REPO: saved.REPO || saved.repo,
          BRANCH: saved.BRANCH || saved.branch || 'main',
          _auto: false
        };
      }
    } catch (error) {}
    return null;
  }

  function getGithubConfig() {
    return detectPagesConfig() || readStoredConfig() || { OWNER: '', REPO: '', BRANCH: 'main', _auto: false };
  }

  function persistGithubConfig(config) {
    try {
      localStorage.setItem(CONFIG_KEY, JSON.stringify({
        OWNER: config.OWNER,
        REPO: config.REPO,
        BRANCH: config.BRANCH || 'main'
      }));
    } catch (error) {}
    if (window.SenkoShell && typeof window.SenkoShell.refreshGithubButton === 'function') {
      window.SenkoShell.refreshGithubButton();
    }
  }

  function getGithubToken() {
    try {
      return localStorage.getItem(TOKEN_KEY) || '';
    } catch (error) {
      return '';
    }
  }

  function setGithubToken(token) {
    try {
      if (token) localStorage.setItem(TOKEN_KEY, token.trim());
      else localStorage.removeItem(TOKEN_KEY);
    } catch (error) {}
    if (window.SenkoShell && typeof window.SenkoShell.refreshGithubButton === 'function') {
      window.SenkoShell.refreshGithubButton();
    }
  }

  function hasGithubCredentials() {
    var config = getGithubConfig();
    return Boolean(config.OWNER && config.REPO && getGithubToken());
  }

  function openGithubConfig() {
    var config = getGithubConfig();
    var owner = window.prompt('Owner do repositorio GitHub:', config.OWNER || '');
    if (owner === null) return false;
    var repo = window.prompt('Nome do repositorio GitHub:', config.REPO || '');
    if (repo === null) return false;
    var token = window.prompt('Token GitHub:', getGithubToken() || '');
    if (token === null) return false;

    config.OWNER = owner.trim();
    config.REPO = repo.trim();
    config.BRANCH = config.BRANCH || 'main';
    persistGithubConfig(config);
    setGithubToken(token.trim());
    updateGithubButton();
    setStatus(hasGithubCredentials() ? 'GitHub configurado para salvar notas.' : 'Configure owner, repo e token para salvar.', hasGithubCredentials() ? 'ok' : 'error');
    return hasGithubCredentials();
  }

  function ensureGithubCredentials() {
    if (hasGithubCredentials()) return true;
    return openGithubConfig();
  }

  function encodeBase64(content) {
    return btoa(unescape(encodeURIComponent(content)));
  }

  function decodeBase64(content) {
    return decodeURIComponent(escape(atob(String(content || '').replace(/\s/g, ''))));
  }

  function githubApiUrl(filePath) {
    var config = getGithubConfig();
    return 'https://api.github.com/repos/' + config.OWNER + '/' + config.REPO + '/contents/' + filePath;
  }

  function githubGetFile(filePath, optional) {
    var config = getGithubConfig();
    return fetch(githubApiUrl(filePath) + '?ref=' + encodeURIComponent(config.BRANCH || 'main'), {
      headers: {
        'Authorization': 'token ' + getGithubToken(),
        'Accept': 'application/vnd.github+json'
      }
    }).then(function (res) {
      return res.json().catch(function () { return {}; }).then(function (data) {
        if (res.status === 404 && optional) return null;
        if (!res.ok) throw new Error('GitHub GET falhou (' + res.status + '): ' + (data.message || filePath));
        return { sha: data.sha, content: decodeBase64(data.content), path: filePath };
      });
    });
  }

  function githubPutFile(filePath, content, sha, message) {
    var config = getGithubConfig();
    var body = {
      message: message,
      content: encodeBase64(content),
      branch: config.BRANCH || 'main'
    };
    if (sha) body.sha = sha;

    return fetch(githubApiUrl(filePath), {
      method: 'PUT',
      headers: {
        'Authorization': 'token ' + getGithubToken(),
        'Accept': 'application/vnd.github+json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }).then(function (res) {
      return res.json().catch(function () { return {}; }).then(function (data) {
        if (!res.ok) throw new Error('GitHub PUT falhou (' + res.status + '): ' + (data.message || filePath));
        return data;
      });
    });
  }

  function githubDeleteFile(filePath, sha, message) {
    var config = getGithubConfig();
    return fetch(githubApiUrl(filePath), {
      method: 'DELETE',
      headers: {
        'Authorization': 'token ' + getGithubToken(),
        'Accept': 'application/vnd.github+json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: message,
        sha: sha,
        branch: config.BRANCH || 'main'
      })
    }).then(function (res) {
      return res.json().catch(function () { return {}; }).then(function (data) {
        if (!res.ok) throw new Error('GitHub DELETE falhou (' + res.status + '): ' + (data.message || filePath));
        return true;
      });
    });
  }

  function noteFilePath(note) {
    return NOTES_DIR + '/' + note.id + '.js';
  }

  function serializeNote(note) {
    var payload = {
      id: note.id,
      title: note.title,
      type: note.type,
      tags: note.tags || [],
      content: note.content || '',
      createdAt: note.createdAt,
      updatedAt: note.updatedAt
    };
    return 'window.SenkoTeamNotesData.registerNote(' + JSON.stringify(payload, null, 2) + ');\n';
  }

  function serializeManifest(list) {
    var manifest = {
      notes: sortedManifestEntries(list)
    };
    return (
      '/* Catalogo de notas da equipe. Atualizado pela integracao GitHub do prototipo Team Notes. */\n' +
      'window.SenkoTeamNotesManifest = ' +
      JSON.stringify(manifest, null, 2) +
      ';\n'
    );
  }

  function sortedManifestEntries(list) {
    return list.filter(function (note) { return note && note.id && !note._sample; }).map(function (note) {
      return {
        id: note.id,
        title: note.title,
        type: note.type,
        tags: note.tags || [],
        file: 'notes/' + note.id + '.js',
        updatedAt: note.updatedAt
      };
    }).sort(function (left, right) {
      return String(right.updatedAt || '').localeCompare(String(left.updatedAt || ''));
    });
  }

  function saveCurrentNote(event) {
    event.preventDefault();
    if (saving) return;
    var note = getCurrentNoteFromForm();
    if (!note.title || !note.content.trim()) {
      setStatus('Informe titulo e conteudo antes de salvar.', 'error');
      return;
    }
    if (!ensureGithubCredentials()) return;

    saving = true;
    setStatus('Salvando nota no GitHub...', 'info');

    var filePath = noteFilePath(note);
    var oldNote = selectedId ? findNote(selectedId) : null;
    var oldFilePath = oldNote && oldNote.id !== note.id && !oldNote._sample ? noteFilePath(oldNote) : '';
    var saveBtn = document.getElementById('senkoTeamNotesSaveBtn');
    saveBtn.disabled = true;

    githubGetFile(filePath, true).then(function (fileInfo) {
      return githubPutFile(filePath, serializeNote(note), fileInfo ? fileInfo.sha : null, '[Team Notes] save note: ' + note.id);
    }).then(function () {
      if (!oldFilePath) return true;
      return githubGetFile(oldFilePath, true).then(function (oldInfo) {
        if (!oldInfo) return true;
        return githubDeleteFile(oldFilePath, oldInfo.sha, '[Team Notes] remove old note file: ' + oldNote.id);
      });
    }).then(function () {
      return githubGetFile(MANIFEST_PATH, true);
    }).then(function (manifestInfo) {
      var nextNotes = notes.filter(function (item) { return item.id !== selectedId && item.id !== note.id && !item._sample; });
      nextNotes.push(note);
      return githubPutFile(
        MANIFEST_PATH,
        serializeManifest(nextNotes),
        manifestInfo ? manifestInfo.sha : null,
        '[Team Notes] update manifest'
      );
    }).then(function () {
      notes = notes.filter(function (item) { return item.id !== selectedId && item.id !== note.id && !item._sample; });
      note._sample = false;
      upsertNote(note);
      selectedId = note.id;
      fillForm(note);
      renderList();
      formDirty = false;
      updateEditorButtons();
      setStatus('Nota salva. Arquivo criado/atualizado em ' + filePath + '.', 'ok');
    }).catch(function (error) {
      setStatus(error.message || 'Nao foi possivel salvar no GitHub.', 'error');
    }).finally(function () {
      saving = false;
      saveBtn.disabled = false;
    });
  }

  function copyCurrentNote() {
    var note = getCurrentNoteFromForm();
    if (!note.content.trim()) {
      setStatus('Nao ha conteudo para copiar.', 'error');
      return;
    }
    navigator.clipboard.writeText(note.content).then(function () {
      setStatus('Conteudo copiado.', 'ok');
    }).catch(function () {
      setStatus('Nao foi possivel copiar automaticamente.', 'error');
    });
  }

  function deleteCurrentNote() {
    var note = selectedId ? findNote(selectedId) : null;
    if (!note || note._sample) return;
    if (!window.confirm('Excluir a nota "' + note.title + '" do GitHub?')) return;
    if (!ensureGithubCredentials()) return;

    setStatus('Excluindo nota no GitHub...', 'info');
    var filePath = noteFilePath(note);
    githubGetFile(filePath, false).then(function (fileInfo) {
      return githubDeleteFile(filePath, fileInfo.sha, '[Team Notes] delete note: ' + note.id);
    }).then(function () {
      return githubGetFile(MANIFEST_PATH, true);
    }).then(function (manifestInfo) {
      var nextNotes = notes.filter(function (item) { return item.id !== note.id && !item._sample; });
      return githubPutFile(MANIFEST_PATH, serializeManifest(nextNotes), manifestInfo ? manifestInfo.sha : null, '[Team Notes] update manifest');
    }).then(function () {
      notes = notes.filter(function (item) { return item.id !== note.id; });
      selectedId = '';
      renderList();
      newNote();
      setStatus('Nota excluida do GitHub.', 'ok');
    }).catch(function (error) {
      setStatus(error.message || 'Nao foi possivel excluir no GitHub.', 'error');
    });
  }

  function openModal() {
    createModal();
    previousFocus = document.activeElement;
    previousBodyOverflow = document.body.style.overflow;
    overlay.classList.add('is-open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    var button = document.getElementById('senkoTeamNotesBtn');
    if (button) {
      button.classList.add('is-active');
      button.setAttribute('aria-expanded', 'true');
    }
    updateGithubButton();
    setStatus('Carregando notas...', 'info');

    loadData().then(function () {
      renderList();
      if (selectedId && findNote(selectedId)) selectNote(selectedId);
      else selectNote(sortedNotes()[0] ? sortedNotes()[0].id : '');
      if (!selectedId) newNote();
      if (notes.length && notes[0]._sample) setStatus('Exemplo local carregado. Para compartilhar, salve no GitHub.', 'info');
      else setStatus('', '');
      window.setTimeout(function () {
        if (searchInput) searchInput.focus();
      }, 0);
    }).catch(function (error) {
      setStatus(error.message || 'Nao foi possivel carregar as notas.', 'error');
    });
  }

  function closeModal() {
    if (!overlay) return;
    if (!canDiscardChanges()) return;
    overlay.classList.remove('is-open');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = previousBodyOverflow || '';
    var button = document.getElementById('senkoTeamNotesBtn');
    if (button) {
      button.classList.remove('is-active');
      button.setAttribute('aria-expanded', 'false');
    }
    if (previousFocus && typeof previousFocus.focus === 'function') previousFocus.focus();
  }

  function keepFocusInsideModal(event) {
    if (event.key !== 'Tab' || !overlay || !overlay.classList.contains('is-open')) return;

    var controls = Array.prototype.slice.call(
      overlay.querySelectorAll('button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])')
    ).filter(function (element) {
      return element.offsetParent !== null;
    });

    if (!controls.length) return;
    var first = controls[0];
    var last = controls[controls.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  function initGithubProvider() {
    if (!window.SenkoShell || typeof window.SenkoShell.registerGithubProvider !== 'function') return;
    window.SenkoShell.registerGithubProvider('team-notes', {
      label: 'Notas',
      openConfig: openGithubConfig,
      hasCredentials: hasGithubCredentials
    });
  }

  function initTeamNotes() {
    loadStyle();
    createButton();
    initGithubProvider();
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && overlay && overlay.classList.contains('is-open')) closeModal();
      keepFocusInsideModal(event);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTeamNotes);
  } else {
    initTeamNotes();
  }
})();
