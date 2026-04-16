// @ts-nocheck
/* ═══════════════════════════════════════════════════════════════════════
   senko-github-col-groups.js — Grupos das Coleções (GitHub)

   ARQUIVO DE DADOS: colecoes/col-groups-data.js
   MOTOR: colecoes/col-groups.js (deve estar no repositório)

   FLUXO:
     Usuário cria grupo → só em memória (pendente)
     No próximo commit → ghcGroupsFlushPending() persiste tudo
═══════════════════════════════════════════════════════════════════════ */

var GHC_GROUPS_PATH = 'colecoes/col-groups-data.js';
var _ghcPendingGroups = [];

/* ─── Helpers seguros ──────────────────────────────────────────────── */
function _ghcColGroupsExists() {
  return typeof ColGroups !== 'undefined' && typeof ColGroups.add === 'function';
}

/* ─── Registro pendente ─────────────────────────────────────────────
   Adiciona em memória e na fila pendente. NÃO commita.
─────────────────────────────────────────────────────────────────── */
function ghcGroupAddPending(groupObj) {
  var slug = (groupObj.slug || '').toLowerCase();
  var dup  = _ghcPendingGroups.some(function(g) { return g.slug === slug; });
  if (dup) return;
  _ghcPendingGroups.push({ slug: slug, name: groupObj.name, color: groupObj.color });
  if (_ghcColGroupsExists()) ColGroups.add(groupObj);
}

/* ─── Flush ─────────────────────────────────────────────────────────
   Persiste pendentes antes de qualquer commit.
   Retorna Promise<true> sempre — nunca bloqueia o commit principal.
─────────────────────────────────────────────────────────────────── */
function ghcGroupsFlushPending() {
  if (_ghcPendingGroups.length === 0) return Promise.resolve(true);

  return ghcGroupsGetFile().then(function(fileInfo) {
    var existing = fileInfo.exists ? ghcGroupsParseExisting(fileInfo.content) : [];
    _ghcPendingGroups.forEach(function(pg) {
      var isDup = existing.some(function(g) { return g.slug === pg.slug; });
      if (!isDup) existing.push(pg);
    });

    var slugs = _ghcPendingGroups.map(function(g) { return g.slug; }).join(', ');
    return githubPutFile(
      GHC_GROUPS_PATH,
      ghcGroupsBuildFile(existing),
      fileInfo.sha || null,
      '[SenkoLib] sync groups (' + slugs + ')'
    ).then(function() {
      if (!fileInfo.exists) return ghcGroupsRegisterScript();
    }).then(function() {
      _ghcPendingGroups = [];
      return true;
    });
  }).catch(function(e) {
    console.warn('[col-groups] flush falhou — continuando:', e.message);
    return true;
  });
}

/* ─── Utilitários ──────────────────────────────────────────────────── */
function ghcGroupsBuildFile(groups) {
  var lines = groups.map(function(g) {
    return (
      "  { slug: '" + g.slug + "'," +
      " name: '" + (g.name || '').replace(/'/g, "\\'") + "'," +
      " color: '" + (g.color || '') + "' },"
    );
  });
  return (
    '// @ts-nocheck\n' +
    'ColGroups.register([\n' +
    lines.join('\n') + '\n' +
    ']);\n'
  );
}

function ghcGroupsGetFile() {
  return githubGetFile(GHC_GROUPS_PATH).then(function(data) {
    return { exists: true, sha: data.sha, content: data.content };
  }).catch(function(err) {
    if (err.message && err.message.indexOf('404') !== -1) return { exists: false };
    throw err;
  });
}

function ghcGroupsParseExisting(content) {
  var groups = [];
  var re = /\{\s*slug:\s*'([^']+)'\s*,\s*name:\s*'([^']*)'\s*,\s*color:\s*'([^']*)'\s*\}/g;
  var m;
  while ((m = re.exec(content)) !== null) {
    groups.push({ slug: m[1], name: m[2], color: m[3] });
  }
  return groups;
}

function ghcGroupsRegisterScript() {
  return githubGetFile('index.html').then(function(data) {
    if (data.content.indexOf('col-groups-data.js') !== -1) return;
    var anchor = '  <!-- <script src="colecoes/col-groups-data.js"></script> -->';
    var newTag = '  <script src="colecoes/col-groups-data.js"></script>\n' + anchor;
    var newIdx = data.content.indexOf(anchor) !== -1
      ? data.content.replace(anchor, newTag)
      : data.content;
    if (newIdx === data.content) return;
    return githubPutFile('index.html', newIdx, data.sha,
      '[SenkoLib] register col-groups-data.js');
  }).catch(function() {}); /* não crítico */
}

/* ─── ghcGroupSave — chamado pelo botão "Criar grupo" ──────────────
   Verifica duplicata, adiciona pendente, fecha modal, libera botão.
   Retorna Promise<true|false>.
─────────────────────────────────────────────────────────────────── */
function ghcGroupSave(groupObj) {
  var slug = (groupObj.slug || '').toLowerCase();

  /* Verifica duplicata em memória e pendentes */
  var inMemory  = _ghcColGroupsExists() && !!ColGroups.getBySlug(slug);
  var inPending = _ghcPendingGroups.some(function(g) { return g.slug === slug; });

  if (inMemory || inPending) {
    if (typeof ghShowErrorModal === 'function') {
      ghShowErrorModal('Já existe um grupo com este nome.\nEscolha outro nome.');
    }
    return Promise.resolve(false);
  }

  /* Adiciona pendente — commit acontece no próximo save de coleção/layout */
  ghcGroupAddPending(groupObj);
  return Promise.resolve(true);
}

document.addEventListener('DOMContentLoaded', function() {
  if (!window.location.hostname.match(/^[^.]+\.github\.io$/i)) return;
});
