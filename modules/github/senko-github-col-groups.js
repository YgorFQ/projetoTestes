// @ts-nocheck
/* ═══════════════════════════════════════════════════════════════════════
   senko-github-col-groups.js — Grupos das Coleções (GitHub)

   ARQUIVO NO REPOSITÓRIO: colecoes/col-groups.js
   Contém motor + dados no mesmo arquivo.

   FORMATO DO ARQUIVO GERADO:
     var ColGroups = (function(){ ... })();
     ColGroups.register([ { slug, name, color }, ... ]);

   FLUXO:
     Usuário cria grupo → pendente em memória
     No próximo commit → ghcGroupsFlushPending() grava tudo
═══════════════════════════════════════════════════════════════════════ */

var GHC_GROUPS_PATH = 'colecoes/col-groups.js';
var _ghcPendingGroups = [];

/* ─── Guard ──────────────────────────────────────────────────────── */
function _ghcColGroupsOk() {
  return typeof ColGroups !== 'undefined' && typeof ColGroups.add === 'function';
}

/* ─── Registro pendente ─────────────────────────────────────────── */
function ghcGroupAddPending(groupObj) {
  var slug = (groupObj.slug || '').toLowerCase();
  var dup  = _ghcPendingGroups.some(function(g) { return g.slug === slug; });
  if (dup) return;
  _ghcPendingGroups.push({ slug: slug, name: groupObj.name, color: groupObj.color });
  if (_ghcColGroupsOk()) ColGroups.add(groupObj);
}

/* ─── Flush ─────────────────────────────────────────────────────── */
function ghcGroupsFlushPending() {
  if (_ghcPendingGroups.length === 0) return Promise.resolve(true);

  return ghcGroupsGetFile().then(function(fileInfo) {
    /* Extrai grupos já salvos (se o arquivo existir) */
    var existing = fileInfo.exists ? ghcGroupsParseGroups(fileInfo.content) : [];

    /* Merge: adiciona só os pendentes que não existem */
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
      _ghcPendingGroups = [];
      return true;
    });
  }).catch(function(e) {
    console.warn('[col-groups] flush falhou — continuando:', e.message);
    return true; /* nunca bloqueia o commit principal */
  });
}

/* ─── Monta o arquivo col-groups.js completo ────────────────────
   Motor + dados no mesmo arquivo.
   O motor define ColGroups, depois os dados são registrados.
─────────────────────────────────────────────────────────────────── */
function ghcGroupsBuildFile(groups) {
  var motor = [
    '// @ts-nocheck',
    '/* col-groups.js — Motor + dados dos grupos (gerado pelo SenkoLib) */',
    'var ColGroups = (function () {',
    '  var _g = [];',
    '  function _k(s) { return (s||"").toLowerCase().trim(); }',
    '  return {',
    '    register: function(arr) {',
    '      arr.forEach(function(g) {',
    '        if (!g||!g.slug) return;',
    '        var k=_k(g.slug);',
    '        if (!_g.some(function(x){return _k(x.slug)===k;})) {',
    '          _g.push({slug:k,name:g.name||g.slug,color:g.color||"#888"});',
    '        }',
    '      });',
    '    },',
    '    getAll:    function() { return _g.slice(); },',
    '    getBySlug: function(s) { var k=_k(s); for(var i=0;i<_g.length;i++) if(_k(_g[i].slug)===k) return _g[i]; return null; },',
    '    add:       function(o) { if(!o||!o.slug) return; var k=_k(o.slug); _g=_g.filter(function(g){return _k(g.slug)!==k;}); _g.push({slug:k,name:o.name||o.slug,color:o.color||"#888"}); },',
    '    remove:    function(s) { var k=_k(s); _g=_g.filter(function(g){return _k(g.slug)!==k;}); },',
    '  };',
    '})();',
    '',
  ].join('\n');

  if (groups.length === 0) {
    return motor + 'ColGroups.register([]);\n';
  }

  var lines = groups.map(function(g) {
    return (
      "  { slug: '" + g.slug + "'," +
      " name: '" + (g.name || '').replace(/'/g, "\\'") + "'," +
      " color: '" + (g.color || '') + "' },"
    );
  });

  return motor + 'ColGroups.register([\n' + lines.join('\n') + '\n]);\n';
}

/* ─── Lê arquivo atual do repositório ───────────────────────────── */
function ghcGroupsGetFile() {
  return githubGetFile(GHC_GROUPS_PATH).then(function(data) {
    return { exists: true, sha: data.sha, content: data.content };
  }).catch(function(err) {
    if (err.message && err.message.indexOf('404') !== -1) return { exists: false };
    throw err;
  });
}

/* ─── Extrai grupos do arquivo existente ────────────────────────── */
function ghcGroupsParseGroups(content) {
  var groups = [];
  var re = /\{\s*slug:\s*'([^']+)'\s*,\s*name:\s*'([^']*)'\s*,\s*color:\s*'([^']*)'\s*\}/g;
  var m;
  while ((m = re.exec(content)) !== null) {
    groups.push({ slug: m[1], name: m[2], color: m[3] });
  }
  return groups;
}

/* ─── ghcGroupSave — chamado pelo modal de novo grupo ───────────
   Não commita. Só adiciona pendente.
   Retorna Promise<true|false> imediatamente.
─────────────────────────────────────────────────────────────────── */
function ghcGroupSave(groupObj) {
  var slug = (groupObj.slug || '').toLowerCase();

  var inMemory  = _ghcColGroupsOk() && !!ColGroups.getBySlug(slug);
  var inPending = _ghcPendingGroups.some(function(g) { return g.slug === slug; });

  if (inMemory || inPending) {
    if (typeof ghShowErrorModal === 'function') {
      ghShowErrorModal('Já existe um grupo com este nome.\nEscolha outro nome.');
    }
    return Promise.resolve(false);
  }

  ghcGroupAddPending(groupObj);
  return Promise.resolve(true);
}

/* ─── Auto-reparo: se col-groups.js não tiver o motor, regrava ──
   Detectado pela ausência de ColGroups após o carregamento da página.
─────────────────────────────────────────────────────────────────── */
function ghcGroupsAutoRepair() {
  /* Se ColGroups existe e está funcional, não precisa reparar */
  if (_ghcColGroupsOk()) return;

  /* Sem token não faz nada */
  if (typeof ghGetToken !== 'function' || !ghGetToken()) return;

  console.warn('[col-groups] ColGroups não definido — reescrevendo col-groups.js...');

  ghcGroupsGetFile().then(function(fileInfo) {
    /* Extrai grupos que porventura existam no arquivo corrompido */
    var existing = fileInfo.exists ? ghcGroupsParseGroups(fileInfo.content || '') : [];

    return githubPutFile(
      GHC_GROUPS_PATH,
      ghcGroupsBuildFile(existing),
      fileInfo.sha || null,
      '[SenkoLib] repair col-groups.js (motor ausente)'
    ).then(function() {
      console.log('[col-groups] col-groups.js reparado. Recarregue a página.');
      /* Recarrega para o novo arquivo ter efeito */
      setTimeout(function() { window.location.reload(); }, 1500);
    });
  }).catch(function(e) {
    console.warn('[col-groups] auto-repair falhou:', e.message);
  });
}

document.addEventListener('DOMContentLoaded', function() {
  if (!window.location.hostname.match(/^[^.]+\.github\.io$/i)) return;

  /* Aguarda os outros scripts carregarem e verifica se ColGroups está ok */
  setTimeout(ghcGroupsAutoRepair, 500);
});
