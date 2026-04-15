// @ts-nocheck
/* ═══════════════════════════════════════════════════════════════════════
   senko-github-col-groups.js — Salvar grupos no GitHub

   ARQUIVO NO REPOSITÓRIO: colecoes/col-groups.js
   FORMATO:
     ColGroups.register([
       { slug: 'efacil', name: 'eFácil', color: '#7F77DD' },
     ]);

   FLUXO:
     ghcGroupSave(obj) →
       Se o arquivo não existe: cria do zero
       Se existe: lê, verifica duplicata de slug, insere novo grupo
       Registra ColGroups.add() em memória após save

   DEPENDÊNCIAS:
     senko-github-v2.js, col-groups.js
═══════════════════════════════════════════════════════════════════════ */

var GHC_GROUPS_PATH = 'colecoes/col-groups.js';

/* ── Monta conteúdo completo do arquivo ── */
function ghcGroupsBuildFile(groups) {
  var lines = groups.map(function (g) {
    return (
      "  { slug: '" + g.slug  + "'," +
      " name: '"   + (g.name  ||'').replace(/'/g,"\\'") + "'," +
      " color: '"  + (g.color ||'') + "' },"
    );
  });
  return (
    '// @ts-nocheck\n' +
    '/* Grupos das Coleções — gerado pelo SenkoLib */\n' +
    'ColGroups.register([\n' +
    lines.join('\n') + '\n' +
    ']);\n'
  );
}

/* ── Lê o arquivo de grupos do GitHub ── */
function ghcGroupsGetFile() {
  return githubGetFile(GHC_GROUPS_PATH).then(function (data) {
    return { exists: true, sha: data.sha, content: data.content };
  }).catch(function (err) {
    if (err.message && err.message.indexOf('404') !== -1) {
      return { exists: false };
    }
    throw err;
  });
}

/* ── Extrai grupos já salvos via regex simples ── */
function ghcGroupsParseExisting(content) {
  var groups = [];
  var re = /\{\s*slug:\s*'([^']+)'\s*,\s*name:\s*'([^']*)'\s*,\s*color:\s*'([^']*)'\s*\}/g;
  var m;
  while ((m = re.exec(content)) !== null) {
    groups.push({ slug: m[1], name: m[2], color: m[3] });
  }
  return groups;
}

/* ── Registra <script> do col-groups.js no index.html ── */
function ghcGroupsRegisterScript() {
  return githubGetFile('index.html').then(function (data) {
    var tag = '<script src="colecoes/col-groups.js">';
    if (data.content.indexOf(tag) !== -1) return; /* já existe */
    var anchor = '  <!-- Arquivo de grupos (gerado automaticamente) -->\n  <!-- <script src="colecoes/col-groups.js"></script> -->';
    var newTag = '  <script src="colecoes/col-groups.js"></script>\n' + anchor;
    var newIdx = data.content.indexOf(anchor) !== -1
      ? data.content.replace(anchor, newTag)
      : data.content;
    if (newIdx === data.content) return;
    return githubPutFile('index.html', newIdx, data.sha,
      '[SenkoLib] register col-groups.js');
  });
}

/* ═══════════════════════════════════════════════════════════════════════
   CORE — salva um grupo novo
═══════════════════════════════════════════════════════════════════════ */
function ghcGroupSave(groupObj) {
  if (!ghLockSave()) return Promise.resolve(false);
  if (!ghEnsureToken()) { ghUnlockSave(); ghSetStatus('Token não configurado','error'); return Promise.resolve(false); }

  ghSetStatus('Verificando grupos…','saving');

  return ghcGroupsGetFile().then(function (fileInfo) {

    var existing = fileInfo.exists ? ghcGroupsParseExisting(fileInfo.content) : [];

    /* Verifica duplicata */
    var isDup = existing.some(function (g) { return g.slug === groupObj.slug; });
    if (isDup) {
      ghUnlockSave();
      ghSetStatus('Grupo já existe','error');
      ghShowErrorModal('Já existe um grupo com o slug "' + groupObj.slug + '".\nEscolha outro nome.');
      return false;
    }

    /* Adiciona novo grupo */
    existing.push({ slug: groupObj.slug, name: groupObj.name, color: groupObj.color });

    var newContent = ghcGroupsBuildFile(existing);
    ghSetStatus('Salvando grupo…','saving');

    return githubPutFile(
      GHC_GROUPS_PATH,
      newContent,
      fileInfo.sha || null,
      '[SenkoLib] add group: ' + groupObj.slug
    ).then(function () {
      /* Se arquivo era novo, registra no index.html */
      if (!fileInfo.exists) {
        return ghcGroupsRegisterScript();
      }
    }).then(function () {
      ColGroups.add(groupObj);
      ghSetStatus('✓ Grupo criado: ' + groupObj.name,'ok');
      ghUnlockSave();
      ghStartDeployWatch(GHC_GROUPS_PATH);
      return true;
    });

  }).catch(function (e) {
    console.error('[col-groups]', e);
    ghSetStatus('Erro: ' + e.message,'error');
    ghUnlockSave();
    ghShowErrorModal(e.message);
    return false;
  });
}

document.addEventListener('DOMContentLoaded', function () {
  if (!window.location.hostname.match(/^[^.]+\.github\.io$/i)) return;
  /* Módulo pronto — ghcGroupSave fica disponível globalmente */
  console.log('[col-groups] módulo ativo');
});
