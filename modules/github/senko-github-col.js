// @ts-nocheck
/* ═══════════════════════════════════════════════════════════════════════
   senko-github-col.js — Módulo GitHub para o sistema de Coleções

   RESPONSABILIDADE:
     Toda operação de escrita no GitHub relativa a Coleções:
       — Flush de grupos pendentes    (colGhFlushGroups)
       — Criar coleção nova           (colGhCreateCollection)
       — Editar metadados de coleção  (colGhEditCollection)
       — Excluir coleção              (colGhDeleteCollection)
       — Adicionar layout à coleção   (colGhAddLayout)
       — Editar layout de coleção     (colGhEditLayout)
       — Excluir layout de coleção    (colGhDeleteLayout)
     Injeta botões "GitHub" nos modais de coleções (col-modals.js).

   DEPENDÊNCIAS (devem ser carregadas antes):
     - senko-github-v2.js   (ghGetToken, ghEnsureToken, ghLockSave,
                             ghUnlockSave, ghSetStatus, githubGetFile,
                             githubPutFile, ghShowErrorModal, GH_ICON,
                             GITHUB_CONFIG, ghStartDeployWatch)
     - col-core.js          (ColLib)
     - col-groups.js        (ColGroups)
     - col-script.js        (colRenderGrid, colUpdateStatsBar)
     - col-modals.js        (colGetCreateFormData, colGetEditFormData,
                             colGetAddLayoutFormData, colGetEditLayoutFormData,
                             colCloseCreateModal, colCloseEditModal,
                             colCloseAddLayoutModal, colCloseEditLayoutModal,
                             colOpenConfirm, _colCurrentCollection,
                             _colRenderLayoutsGrid)

   ATIVAÇÃO:
     Só executa no GitHub Pages (hostname *.github.io).
     Em localhost/Live Server, nenhum botão é injetado.

   ORDEM DE CARREGAMENTO no index.html:
     <script src="modules/github/senko-github-col.js"></script>
     (após todos os outros scripts)
═══════════════════════════════════════════════════════════════════════ */


/* ═══════════════════════════════════════════════════════════════════════
   UTILITÁRIOS DE ARQUIVO DE COLEÇÃO
═══════════════════════════════════════════════════════════════════════ */

/*
  Caminho do arquivo de uma coleção no repositório.
*/
function colGhFilePath(slug) {
  return 'colecoes/data/' + slug.toLowerCase() + '.js';
}

/*
  Monta o conteúdo completo de um arquivo de coleção a partir de um objeto.
  Usado na criação e também para reescrever após edições de metadados.
*/
function colGhBuildFileContent(col) {
  var tagsStr = (col.tags || [])
    .map(function (t) { return "'" + t + "'"; })
    .join(', ');

  var layoutsCode = (col.layouts || []).map(function (l) {
    var safeHtml = escapeTemplateLiteral(l.html);
    var safeCss  = escapeTemplateLiteral(l.css);
    return (
      '\n    /*@@@@Col - ' + l.id + ' */\n' +
      '    {\n' +
      "      id:   '" + l.id   + "',\n" +
      "      name: '" + l.name + "',\n" +
      '      html: `' + safeHtml + '`,\n' +
      '      css:  `' + safeCss  + '`,\n' +
      '    },'
    );
  }).join('\n');

  return (
    '// @ts-nocheck\n' +
    '/* ═══════════════════════════════════════════════════════════════════════\n' +
    '   colecoes/data/' + col.slug + '.js — Coleção: ' + col.name + '\n' +
    '\n' +
    '   ATENÇÃO: Arquivo gerado pelo módulo GitHub do SenkoLib.\n' +
    '   NÃO edite manualmente em produção.\n' +
    '═══════════════════════════════════════════════════════════════════════ */\n' +
    'ColLib.register({\n' +
    "  slug:  '" + col.slug  + "',\n" +
    "  name:  '" + col.name  + "',\n" +
    "  group: '" + col.group + "',\n" +
    '  tags:  [' + tagsStr   + '],\n' +
    '  layouts: [' + layoutsCode + '\n' +
    '  ]\n' +
    '});\n'
  );
}

/*
  Monta o conteúdo do arquivo de grupos a partir do estado atual de ColGroups.
  Chamado sempre que grupos confirmados mudam (flush de pendentes).

  REGRA: só serializa grupos que são referenciados por pelo menos uma coleção
  em memória, OU que estão na lista de pendentes da operação atual.
  Isso evita que grupos órfãos (cujas coleções mudaram de grupo) fiquem
  acumulando no arquivo e aparecendo na filter bar como pills fantasma.
*/
function colGhBuildGroupsFileContent() {
  if (typeof ColGroups === 'undefined') return '';

  /* Mapeia os slugs de grupo que alguma coleção ainda referencia */
  var usedSlugs = {};
  if (typeof ColLib !== 'undefined') {
    ColLib.getAll().forEach(function (col) {
      if (col.group) usedSlugs[col.group] = true;
    });
  }

  /* Pendentes também são sempre incluídos (ainda não têm coleção apontada,
     mas acabaram de ser criados e serão usados imediatamente) */
  ColGroups.getPending().forEach(function (g) {
    usedSlugs[g.slug] = true;
  });

  var all = ColGroups.getAll(); /* confirmados + pendentes */
  var used = all.filter(function (g) { return usedSlugs[g.slug]; });

  var lines = used.map(function (g) {
    return (
      "  { slug: '" + g.slug + "', name: '" + g.name.replace(/'/g, "\\'") + "', cor: '" + g.cor + "' },"
    );
  });

  return (
    '// @ts-nocheck\n' +
    '/* ═══════════════════════════════════════════════════════════════════════\n' +
    '   col-groups-data.js — Dados dos grupos de coleções\n' +
    '\n' +
    '   ATENÇÃO: Arquivo gerado pelo módulo GitHub do SenkoLib.\n' +
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
  var safeHtml = escapeTemplateLiteral(layout.html);
  var safeCss  = escapeTemplateLiteral(layout.css);
  return (
    '    /*@@@@Col - ' + layout.id + ' */\n' +
    '    {\n' +
    "      id:   '" + layout.id   + "',\n" +
    "      name: '" + layout.name.replace(/'/g, "\\'") + "',\n" +
    '      html: `' + safeHtml + '`,\n' +
    '      css:  `' + safeCss  + '`,\n' +
    '    },'
  );
}

/*
  Lê o arquivo de uma coleção do GitHub.
  Retorna { exists, sha, content, path } ou { exists: false }.
*/
function colGhGetFile(slug) {
  var path = colGhFilePath(slug);
  return githubGetFile(path).then(function (data) {
    return { exists: true, sha: data.sha, content: data.content, path: path };
  }).catch(function (err) {
    if (err.message && err.message.indexOf('404') !== -1) {
      return { exists: false, path: path };
    }
    throw err;
  });
}

/*
  Insere a tag <script> da coleção no index.html, antes do marcador de col-script.js.
  Só insere se ainda não existir.
*/
function colGhInjectScriptTag(slug) {
  var scriptTag = '  <script src="colecoes/data/' + slug + '.js"></script>';
  var anchor    = '  <script src="colecoes/col-script.js"></script>';

  return githubGetFile('index.html').then(function (data) {
    if (data.content.indexOf('colecoes/data/' + slug + '.js') !== -1) {
      return; /* já existe — seguro */
    }
    var newContent = data.content.replace(anchor, scriptTag + '\n' + anchor);
    return githubPutFile(
      'index.html',
      newContent,
      data.sha,
      '[SenkoLib] register collection script: ' + slug
    );
  });
}

/*
  Remove a tag <script> da coleção do index.html ao excluir.
*/
function colGhRemoveScriptTag(slug) {
  return githubGetFile('index.html').then(function (data) {
    var tag        = '  <script src="colecoes/data/' + slug + '.js"></script>\n';
    var newContent = data.content.replace(tag, '');
    if (newContent === data.content) return; /* tag não encontrada — seguro */
    return githubPutFile(
      'index.html',
      newContent,
      data.sha,
      '[SenkoLib] unregister collection script: ' + slug
    );
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

  ghSetStatus('Salvando grupos…', 'saving');

  var newContent = colGhBuildGroupsFileContent();

  return githubGetFile('colecoes/col-groups-data.js').then(function (data) {
    return githubPutFile(
      'colecoes/col-groups-data.js',
      newContent,
      data.sha,
      '[SenkoLib] update groups (' + pending.map(function (g) { return g.slug; }).join(', ') + ')'
    );
  }).then(function () {
    ColGroups.clearPending();
    ghSetStatus('✓ Grupos salvos', 'ok');
  }).catch(function (e) {
    /* Arquivo de grupos ainda não existe — cria */
    if (e.message && e.message.indexOf('404') !== -1) {
      return githubPutFile(
        'colecoes/col-groups-data.js',
        newContent,
        null,
        '[SenkoLib] create groups file'
      ).then(function () {
        ColGroups.clearPending();
        ghSetStatus('✓ Grupos salvos', 'ok');
      });
    }
    throw e;
  });
}


/* ═══════════════════════════════════════════════════════════════════════
   CRIAR COLEÇÃO
═══════════════════════════════════════════════════════════════════════ */

function colGhCreateCollection(colData) {
  if (!ghLockSave()) return Promise.resolve(false);
  if (!ghEnsureToken()) {
    ghUnlockSave();
    ghSetStatus('Token não configurado', 'error');
    return Promise.resolve(false);
  }

  ghSetStatus('Verificando duplicata…', 'saving');

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
      ghSetStatus('Slug já existe', 'error');
      ghUnlockSave();
      ghShowErrorModal('Já existe uma coleção com o slug "' + slug + '" no repositório.\nEscolha outro nome/slug.');
      return false;
    }

    ghSetStatus('Criando arquivo…', 'saving');

    var newObj = {
      slug:    slug,
      name:    colData.name,
      group:   colData.group,
      tags:    colData.tags || [],
      layouts: [],
    };

    var content = colGhBuildFileContent(newObj);

    /* 3. Cria o arquivo da coleção */
    return githubPutFile(
      path,
      content,
      null,
      '[SenkoLib] create collection: ' + slug
    );
  })

  /* 4. Injeta <script> no index.html */
  .then(function (result) {
    if (result === false) return false;
    ghSetStatus('Registrando no index.html…', 'saving');
    return colGhInjectScriptTag(slug).then(function () { return true; });
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
    ghSetStatus('✓ Coleção criada: ' + slug, 'ok');
    ghUnlockSave();
    if (typeof ghStartDeployWatch === 'function') ghStartDeployWatch(colGhFilePath(slug));
    if (typeof colRenderGrid === 'function') colRenderGrid();
    return true;
  })

  .catch(function (e) {
    console.error('[senko-github-col] Erro ao criar coleção:', e);
    ghSetStatus('Erro: ' + e.message, 'error');
    ghUnlockSave();
    ghShowErrorModal(e.message);
    return false;
  });
}


/* ═══════════════════════════════════════════════════════════════════════
   EDITAR METADADOS DE COLEÇÃO (name, group, tags)
   Não toca nos layouts — reescreve o arquivo preservando-os.
═══════════════════════════════════════════════════════════════════════ */

function colGhEditCollection(colData) {
  if (!ghLockSave()) return Promise.resolve(false);
  if (!ghEnsureToken()) {
    ghUnlockSave();
    ghSetStatus('Token não configurado', 'error');
    return Promise.resolve(false);
  }

  var slug = colData.slug;
  ghSetStatus('Lendo coleção…', 'saving');

  /* Lê arquivo atual (flush de grupos é feito APÓS salvar a coleção,
     quando a memória já reflete o novo grupo — veja comentário abaixo) */
  return colGhGetFile(slug)
  .then(function (fileInfo) {
    if (!fileInfo.exists) {
      ghSetStatus('Arquivo não encontrado', 'error');
      ghUnlockSave();
      ghShowErrorModal('Arquivo da coleção "' + slug + '" não encontrado no repositório.');
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
    ghSetStatus('Salvando no GitHub…', 'saving');

    return githubPutFile(
      fileInfo.path,
      newContent,
      fileInfo.sha,
      '[SenkoLib] edit collection: ' + slug
    ).then(function () {
      /* Atualiza a memória ANTES do flush de grupos.
         Assim colGhBuildGroupsFileContent já enxerga o grupo novo como
         "usado" e o grupo antigo como órfão (se nenhuma outra coleção
         apontar para ele), removendo-o do arquivo. */
      ColLib.updateCollection(slug, {
        name:  colData.name,
        group: colData.group,
        tags:  colData.tags,
      });

      /* Flush pós-edição: sempre reescreve col-groups-data.js para limpar
         grupos que ficaram sem nenhuma coleção apontando para eles. */
      ghSetStatus('Atualizando grupos…', 'saving');
      var groupsContent = colGhBuildGroupsFileContent();

      return githubGetFile('colecoes/col-groups-data.js').then(function (gData) {
        return githubPutFile(
          'colecoes/col-groups-data.js',
          groupsContent,
          gData.sha,
          '[SenkoLib] sync groups after edit: ' + slug
        );
      }).catch(function (err) {
        if (err.message && err.message.indexOf('404') !== -1) {
          return githubPutFile(
            'colecoes/col-groups-data.js',
            groupsContent,
            null,
            '[SenkoLib] create groups file'
          );
        }
        throw err;
      }).then(function () {
        if (typeof ColGroups !== 'undefined') ColGroups.clearPending();
        ghSetStatus('✓ Metadados salvos', 'ok');
        ghUnlockSave();
        if (typeof ghStartDeployWatch === 'function') ghStartDeployWatch(fileInfo.path);
        if (typeof colRenderGrid === 'function') colRenderGrid();
        return true;
      });
    });
  })

  .catch(function (e) {
    console.error('[senko-github-col] Erro ao editar coleção:', e);
    ghSetStatus('Erro: ' + e.message, 'error');
    ghUnlockSave();
    ghShowErrorModal(e.message);
    return false;
  });
}


/* ═══════════════════════════════════════════════════════════════════════
   EXCLUIR COLEÇÃO
   Remove o arquivo da coleção e a tag <script> do index.html.
═══════════════════════════════════════════════════════════════════════ */

function colGhDeleteCollection(slug) {
  if (!ghLockSave()) return Promise.resolve(false);
  if (!ghEnsureToken()) {
    ghUnlockSave();
    ghSetStatus('Token não configurado', 'error');
    return Promise.resolve(false);
  }

  ghSetStatus('Excluindo coleção…', 'saving');

  /* 1. Lê o arquivo para obter o SHA */
  return colGhGetFile(slug)
  .then(function (fileInfo) {
    if (!fileInfo.exists) {
      /* Arquivo já não existe — limpa memória e index.html mesmo assim */
      return null;
    }
    return githubGetFile(fileInfo.path).then(function (data) {
      /* Exclui o arquivo via API (conteúdo vazio + sha) */
      var token = typeof ghGetToken === 'function' ? ghGetToken() : '';
      var url   = 'https://api.github.com/repos/'
        + GITHUB_CONFIG.OWNER + '/'
        + GITHUB_CONFIG.REPO  + '/contents/'
        + fileInfo.path;
      return fetch(url, {
        method:  'DELETE',
        headers: {
          'Authorization': 'token ' + token,
          'Accept':        'application/vnd.github+json',
          'Content-Type':  'application/json',
        },
        body: JSON.stringify({
          message: '[SenkoLib] delete collection: ' + slug,
          sha:     data.sha,
          branch:  GITHUB_CONFIG.BRANCH,
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

  /* 2. Remove <script> do index.html */
  .then(function () {
    ghSetStatus('Atualizando index.html…', 'saving');
    return colGhRemoveScriptTag(slug);
  })

  /* 3. Atualiza memória e UI */
  .then(function () {
    ColLib.removeCollection(slug);
    ghSetStatus('✓ Coleção excluída', 'ok');
    ghUnlockSave();
    if (typeof colRenderGrid === 'function') colRenderGrid();
    return true;
  })

  .catch(function (e) {
    console.error('[senko-github-col] Erro ao excluir coleção:', e);
    ghSetStatus('Erro: ' + e.message, 'error');
    ghUnlockSave();
    ghShowErrorModal(e.message);
    return false;
  });
}


/* ═══════════════════════════════════════════════════════════════════════
   ADICIONAR LAYOUT À COLEÇÃO
   Insere o bloco do layout antes do fechamento `]` do array layouts.
═══════════════════════════════════════════════════════════════════════ */

function colGhAddLayout(slug, layoutData) {
  if (!ghLockSave()) return Promise.resolve(false);
  if (!ghEnsureToken()) {
    ghUnlockSave();
    ghSetStatus('Token não configurado', 'error');
    return Promise.resolve(false);
  }

  ghSetStatus('Lendo coleção…', 'saving');

  return colGhGetFile(slug)
  .then(function (fileInfo) {
    if (!fileInfo.exists) {
      ghSetStatus('Coleção não encontrada', 'error');
      ghUnlockSave();
      ghShowErrorModal('Arquivo da coleção "' + slug + '" não encontrado no repositório.');
      return false;
    }

    var content = fileInfo.content;
    var sha     = fileInfo.sha;

    /* Verifica ID duplicado */
    var idMarker = '/*@@@@Col - ' + layoutData.id + ' */';
    if (content.indexOf(idMarker) !== -1) {
      ghSetStatus('ID de layout duplicado', 'error');
      ghUnlockSave();
      ghShowErrorModal('Já existe um layout com o ID "' + layoutData.id + '" nesta coleção.\nEscolha outro ID.');
      return false;
    }

    /* Localiza o fechamento do array de layouts: `  ]` antes do `});` */
    var closePos = content.lastIndexOf('\n  ]');
    if (closePos === -1) {
      ghSetStatus('Estrutura do arquivo inválida', 'error');
      ghUnlockSave();
      ghShowErrorModal('Não foi possível localizar o fechamento do array de layouts em "' + fileInfo.path + '".');
      return false;
    }

    var block      = colGhBuildLayoutBlock(layoutData);
    var newContent =
      content.slice(0, closePos) +
      '\n' + block + '\n' +
      content.slice(closePos);

    ghSetStatus('Salvando no GitHub…', 'saving');

    return githubPutFile(
      fileInfo.path,
      newContent,
      sha,
      '[SenkoLib] add layout "' + layoutData.id + '" to collection: ' + slug
    ).then(function () {
      ColLib.addLayout(slug, layoutData);
      ghSetStatus('✓ Layout adicionado', 'ok');
      ghUnlockSave();
      if (typeof ghStartDeployWatch === 'function') ghStartDeployWatch(fileInfo.path);
      /* Re-renderiza o grid de layouts dentro do modal de coleção */
      var col = typeof ColLib !== 'undefined' ? ColLib.getBySlug(slug) : null;
      if (col && typeof _colRenderLayoutsGrid === 'function') _colRenderLayoutsGrid(col);
      return true;
    });
  })

  .catch(function (e) {
    console.error('[senko-github-col] Erro ao adicionar layout:', e);
    ghSetStatus('Erro: ' + e.message, 'error');
    ghUnlockSave();
    ghShowErrorModal(e.message);
    return false;
  });
}


/* ═══════════════════════════════════════════════════════════════════════
   EDITAR LAYOUT DE COLEÇÃO
   Substitui o bloco existente usando o parser de marcadores.
═══════════════════════════════════════════════════════════════════════ */

function colGhEditLayout(slug, layoutId, layoutData) {
  if (!ghLockSave()) return Promise.resolve(false);
  if (!ghEnsureToken()) {
    ghUnlockSave();
    ghSetStatus('Token não configurado', 'error');
    return Promise.resolve(false);
  }

  ghSetStatus('Lendo coleção…', 'saving');

  return colGhGetFile(slug)
  .then(function (fileInfo) {
    if (!fileInfo.exists) {
      ghSetStatus('Coleção não encontrada', 'error');
      ghUnlockSave();
      ghShowErrorModal('Arquivo da coleção "' + slug + '" não encontrado.');
      return false;
    }

    var content = fileInfo.content;
    var sha     = fileInfo.sha;
    var bounds  = colGhFindLayoutBounds(content, layoutId);

    if (!bounds) {
      ghSetStatus('Layout não encontrado', 'error');
      ghUnlockSave();
      ghShowErrorModal('Marcador do layout "' + layoutId + '" não encontrado em "' + fileInfo.path + '".');
      return false;
    }

    var block      = colGhBuildLayoutBlock(layoutData);
    var newContent =
      content.slice(0, bounds.start) +
      block + '\n' +
      content.slice(bounds.end);

    ghSetStatus('Salvando no GitHub…', 'saving');

    return githubPutFile(
      fileInfo.path,
      newContent,
      sha,
      '[SenkoLib] edit layout "' + layoutId + '" in collection: ' + slug
    ).then(function () {
      ColLib.updateLayout(slug, layoutId, layoutData);
      ghSetStatus('✓ Layout salvo', 'ok');
      ghUnlockSave();
      if (typeof ghStartDeployWatch === 'function') ghStartDeployWatch(fileInfo.path);
      var col = typeof ColLib !== 'undefined' ? ColLib.getBySlug(slug) : null;
      if (col && typeof _colRenderLayoutsGrid === 'function') _colRenderLayoutsGrid(col);
      return true;
    });
  })

  .catch(function (e) {
    console.error('[senko-github-col] Erro ao editar layout:', e);
    ghSetStatus('Erro: ' + e.message, 'error');
    ghUnlockSave();
    ghShowErrorModal(e.message);
    return false;
  });
}


/* ═══════════════════════════════════════════════════════════════════════
   EXCLUIR LAYOUT DE COLEÇÃO
   Remove o bloco do layout usando o parser de marcadores.
═══════════════════════════════════════════════════════════════════════ */

function colGhDeleteLayout(slug, layoutId) {
  if (!ghLockSave()) return Promise.resolve(false);
  if (!ghEnsureToken()) {
    ghUnlockSave();
    ghSetStatus('Token não configurado', 'error');
    return Promise.resolve(false);
  }

  ghSetStatus('Lendo coleção…', 'saving');

  return colGhGetFile(slug)
  .then(function (fileInfo) {
    if (!fileInfo.exists) {
      ghSetStatus('Coleção não encontrada', 'error');
      ghUnlockSave();
      ghShowErrorModal('Arquivo da coleção "' + slug + '" não encontrado.');
      return false;
    }

    var content = fileInfo.content;
    var sha     = fileInfo.sha;
    var bounds  = colGhFindLayoutBounds(content, layoutId);

    if (!bounds) {
      ghSetStatus('Layout não encontrado', 'error');
      ghUnlockSave();
      ghShowErrorModal('Marcador do layout "' + layoutId + '" não encontrado. Verifique o arquivo manualmente.');
      return false;
    }

    var newContent =
      content.slice(0, bounds.start) +
      content.slice(bounds.end);

    ghSetStatus('Salvando no GitHub…', 'saving');

    return githubPutFile(
      fileInfo.path,
      newContent,
      sha,
      '[SenkoLib] delete layout "' + layoutId + '" from collection: ' + slug
    ).then(function () {
      ColLib.removeLayout(slug, layoutId);
      ghSetStatus('✓ Layout excluído', 'ok');
      ghUnlockSave();
      if (typeof ghStartDeployWatch === 'function') ghStartDeployWatch(fileInfo.path);
      var col = typeof ColLib !== 'undefined' ? ColLib.getBySlug(slug) : null;
      if (col && typeof _colRenderLayoutsGrid === 'function') _colRenderLayoutsGrid(col);
      return true;
    });
  })

  .catch(function (e) {
    console.error('[senko-github-col] Erro ao excluir layout:', e);
    ghSetStatus('Erro: ' + e.message, 'error');
    ghUnlockSave();
    ghShowErrorModal(e.message);
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
  btn.innerHTML = GH_ICON + ' GitHub';
  btn.title     = 'Criar coleção direto no repositório GitHub';
  anchor.parentNode.replaceChild(btn, anchor);

  btn.addEventListener('click', function () {
    if (!ghEnsureToken()) return;

    var data = typeof colGetCreateFormData === 'function' ? colGetCreateFormData() : null;
    if (!data) return;

    btn.textContent = 'Criando…';
    btn.disabled    = true;

    colGhCreateCollection(data).then(function (ok) {
      if (ok) {
        btn.innerHTML = GH_ICON + ' Criado!';
        setTimeout(function () {
          if (typeof colCloseCreateModal === 'function') colCloseCreateModal();
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

/* ── 2. Botão "GitHub" no modal de EDITAR COLEÇÃO ── */
function colGhInjectEditButton() {
  if (document.getElementById('colGhEditBtn')) return;
  var anchor = document.getElementById('colEditGhAnchor');
  if (!anchor) return;

  var btn       = document.createElement('button');
  btn.id        = 'colGhEditBtn';
  btn.className = 'btn-github';
  btn.innerHTML = GH_ICON + ' GitHub';
  btn.title     = 'Salvar metadados no repositório GitHub';
  anchor.parentNode.replaceChild(btn, anchor);

  btn.addEventListener('click', function () {
    if (!ghEnsureToken()) return;

    var data = typeof colGetEditFormData === 'function' ? colGetEditFormData() : null;
    if (!data) return;

    btn.textContent = 'Salvando…';
    btn.disabled    = true;

    colGhEditCollection(data).then(function (ok) {
      if (ok) {
        btn.innerHTML = GH_ICON + ' Salvo!';
        setTimeout(function () {
          if (typeof colCloseEditModal === 'function') colCloseEditModal();
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
    if (!ghEnsureToken()) return;

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
  btn.innerHTML = GH_ICON + ' GitHub';
  btn.title     = 'Adicionar layout ao arquivo da coleção no GitHub';
  anchor.parentNode.replaceChild(btn, anchor);

  btn.addEventListener('click', function () {
    if (!ghEnsureToken()) return;

    var data = typeof colGetAddLayoutFormData === 'function' ? colGetAddLayoutFormData() : null;
    if (!data) return;

    /* Precisa saber em qual coleção está — lê do _colCurrentCollection */
    var col = (typeof _colCurrentCollection !== 'undefined') ? _colCurrentCollection : null;
    if (!col) {
      ghShowErrorModal('Nenhuma coleção selecionada.');
      return;
    }

    btn.textContent = 'Salvando…';
    btn.disabled    = true;

    colGhAddLayout(col.slug, data).then(function (ok) {
      if (ok) {
        btn.innerHTML = GH_ICON + ' Salvo!';
        setTimeout(function () {
          if (typeof colCloseAddLayoutModal === 'function') colCloseAddLayoutModal();
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

/* ── 5. Botão "GitHub" no modal de EDITAR LAYOUT ── */
function colGhInjectEditLayoutButton() {
  if (document.getElementById('colGhEditLayoutBtn')) return;
  var anchor = document.getElementById('colEditLayoutGhAnchor');
  if (!anchor) return;

  var btn       = document.createElement('button');
  btn.id        = 'colGhEditLayoutBtn';
  btn.className = 'btn-github';
  btn.innerHTML = GH_ICON + ' GitHub';
  btn.title     = 'Salvar layout editado no repositório GitHub';
  anchor.parentNode.replaceChild(btn, anchor);

  btn.addEventListener('click', function () {
    if (!ghEnsureToken()) return;

    var data = typeof colGetEditLayoutFormData === 'function' ? colGetEditLayoutFormData() : null;
    if (!data) return;

    var col = (typeof _colCurrentCollection !== 'undefined') ? _colCurrentCollection : null;
    if (!col) { ghShowErrorModal('Nenhuma coleção selecionada.'); return; }

    /* ID do layout vem do campo hidden colEditLayoutId */
    var layoutId = (document.getElementById('colEditLayoutId') || {}).value || data.id;

    btn.textContent = 'Salvando…';
    btn.disabled    = true;

    colGhEditLayout(col.slug, layoutId, data).then(function (ok) {
      if (ok) {
        btn.innerHTML = GH_ICON + ' Salvo!';
        setTimeout(function () {
          if (typeof colCloseEditLayoutModal === 'function') colCloseEditLayoutModal();
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
    if (!ghEnsureToken()) return;

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

document.addEventListener('DOMContentLoaded', function () {
  if (!window.location.hostname.match(/^[^.]+\.github\.io$/i)) return;

  colGhObserveModals();

  /* Injeções iniciais para overlays já existentes no DOM
     (caso os modais tenham sido criados antes deste script) */
  colGhInjectCreateButton();
  colGhInjectEditButton();
  colGhInjectAddLayoutButton();
  colGhInjectEditLayoutButton();
  colGhInjectDeleteButtons();
  colGhInjectDeleteLayoutButtons();
});
