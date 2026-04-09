// @ts-nocheck
/* ═══════════════════════════════════════════════════════════════════════
   senko-firebase.js — Módulo Firebase do SenkoLib

   RESPONSABILIDADE:
     Integra o Firebase Firestore como fonte principal de dados.
     Substitui os arquivos .js como fonte de layouts e variantes.
     Sincroniza em tempo real entre todos os usuários.

   ESTRUTURA DO FIRESTORE:
     layouts/
       {id}/                    → documento do layout
         id: string
         name: string
         tags: string[]
         html: string
         css: string
         updatedAt: timestamp

       {id}/variants/           → subcoleção de variantes
         {name}/
           name: string
           html: string
           css: string
           updatedAt: timestamp

   FLUXO:
     Firebase configurado → ignora .js, carrega do Firestore
     Firebase não configurado / offline → .js carrega normalmente
     Salvar pelo GitHub → atualiza GitHub + chama fbSaveLayout/Variant
     Salvar pelo Firebase → atualiza Firestore, propaga em tempo real

   DEPENDÊNCIAS:
     - senkolib-core.js (SenkoLib.*)
     - core/script.js (renderGrid, state, etc.)
     - senko-github-v2.js (githubSaveNewLayout, githubPutFile, etc.)
       carregado ANTES deste arquivo

   ORDEM DE CARREGAMENTO no index.html:
     <script src="core/senkolib-core.js"></script>
     <script src="layouts/layouts001.js"></script>   ← fallback
     <script src="variants/...js"></script>           ← fallback
     <script src="core/script.js"></script>
     <script src="modules/github/senko-github-v2.js"></script>
     <script src="modules/github/senko-github-variants.js"></script>
     <script src="modules/github/senko-github-delete.js"></script>
     <script src="modules/firebase/senko-firebase.js"></script>  ← por último
═══════════════════════════════════════════════════════════════════════ */


/* ═══════════════════════════════════════════════════════════════════════
   CONFIG — chave de armazenamento no localStorage
═══════════════════════════════════════════════════════════════════════ */
var FB_CONFIG_KEY = 'senkolib_firebase_config';

/* ─── Lê configuração salva ── */
function fbGetConfig() {
  try {
    return JSON.parse(localStorage.getItem(FB_CONFIG_KEY) || 'null');
  } catch (e) {
    return null;
  }
}

/* ─── Salva configuração ── */
function fbSetConfig(cfg) {
  try {
    localStorage.setItem(FB_CONFIG_KEY, JSON.stringify(cfg));
  } catch (e) {}
}

/* ─── Limpa configuração ── */
function fbClearConfig() {
  localStorage.removeItem(FB_CONFIG_KEY);
}


/* ═══════════════════════════════════════════════════════════════════════
   ESTADO INTERNO
═══════════════════════════════════════════════════════════════════════ */
var _fbApp        = null;  /* instância Firebase */
var _fbDb         = null;  /* instância Firestore */
var _fbActive     = false; /* true quando Firebase está operacional */
var _fbUnsubLayouts = null; /* unsubscribe do listener de layouts */
var _variantCache = {};    /* cache de variantes já carregadas { parentId: true } */
var _variantUnsubs = {};   /* unsubscribes dos listeners de variantes */


/* ═══════════════════════════════════════════════════════════════════════
   VALIDAÇÃO DE DADOS
   Garante que nenhum dado corrompido entre no Firestore.
═══════════════════════════════════════════════════════════════════════ */
function fbValidateLayout(data) {
  if (!data || typeof data !== 'object') return 'Dados inválidos.';
  if (!data.id || typeof data.id !== 'string') return 'Campo "id" ausente ou inválido.';
  if (!/^[a-z0-9-]+$/.test(data.id)) return 'ID "' + data.id + '" contém caracteres inválidos. Use apenas letras minúsculas, números e hífen.';
  if (!data.name || typeof data.name !== 'string' || data.name.trim().length < 1) return 'Campo "name" ausente ou vazio.';
  if (typeof data.html !== 'string') return 'Campo "html" ausente.';
  if (typeof data.css !== 'string') return 'Campo "css" ausente.';
  if (!Array.isArray(data.tags)) return 'Campo "tags" deve ser um array.';
  return null; /* null = válido */
}

function fbValidateVariant(data) {
  if (!data || typeof data !== 'object') return 'Dados inválidos.';
  if (!data.name || typeof data.name !== 'string' || data.name.trim().length < 2) return 'Campo "name" ausente ou muito curto.';
  if (typeof data.html !== 'string') return 'Campo "html" ausente.';
  if (typeof data.css !== 'string') return 'Campo "css" ausente.';
  return null;
}


/* ═══════════════════════════════════════════════════════════════════════
   INDICADOR VISUAL — bolinha ao lado do logo
═══════════════════════════════════════════════════════════════════════ */
function fbInjectSourceIndicator() {
  if (document.getElementById('senkoSourceDot')) return;

  var dot = document.createElement('span');
  dot.id = 'senkoSourceDot';
  dot.title = 'Fonte de dados: GitHub (.js)';
  dot.style.cssText = [
    'display: inline-block',
    'width: 8px',
    'height: 8px',
    'border-radius: 50%',
    'background: #3b82f6',
    'margin-left: 6px',
    'vertical-align: middle',
    'transition: background .4s, box-shadow .4s',
    'flex-shrink: 0',
  ].join(';');

  /* Insere após o texto do logo */
  var logoText = document.querySelector('.logo-text');
  if (logoText) logoText.appendChild(dot);

  /* Atualiza quando a fonte muda */
  window.addEventListener('senkolib:sourcechange', function (e) {
    var src = e.detail && e.detail.source;
    if (src === 'firebase') {
      dot.style.background  = '#f97316'; /* laranja */
      dot.style.boxShadow   = '0 0 6px #f97316aa';
      dot.title             = 'Fonte de dados: Firebase (tempo real)';
    } else {
      dot.style.background  = '#3b82f6'; /* azul */
      dot.style.boxShadow   = '0 0 6px #3b82f6aa';
      dot.title             = 'Fonte de dados: GitHub (.js)';
    }
  });
}


/* ═══════════════════════════════════════════════════════════════════════
   BOOT — inicializa Firebase e decide a fonte de dados
═══════════════════════════════════════════════════════════════════════ */
function fbBoot() {
  var cfg = fbGetConfig();

  if (!cfg || !cfg.apiKey || !cfg.projectId) {
    /* Sem configuração — permanece no modo GitHub (.js) */
    console.log('[senko-firebase] Sem configuração. Usando .js como fonte.');
    SenkoLib.setSource('github');
    return;
  }

  /* Tenta inicializar o Firebase */
  try {
    /* Evita inicializar duas vezes */
    if (firebase.apps && firebase.apps.length > 0) {
      _fbApp = firebase.apps[0];
    } else {
      _fbApp = firebase.initializeApp(cfg);
    }
    _fbDb = firebase.firestore(_fbApp);

    /* Habilita persistência offline — ignora erros silenciosamente
       (pode falhar se o Firestore já foi iniciado antes ou se o navegador não suporta) */
    try {
      _fbDb.enablePersistence({ synchronizeTabs: true }).catch(function () {
        /* ignora — persistência é opcional, não crítica */
      });
    } catch (e) {
      /* ignora — não deve travar o boot */
    }

    fbStartListening();

  } catch (e) {
    console.error('[senko-firebase] Falha ao inicializar:', e.message);
    SenkoLib.setSource('github');
    fbUpdateStatusBadge('error', 'Firebase falhou — usando GitHub');
  }
}


/* ═══════════════════════════════════════════════════════════════════════
   LISTENER EM TEMPO REAL — layouts
   Carrega todos os layouts do Firestore e mantém em memória.
   Qualquer mudança de outro usuário é refletida automaticamente.
═══════════════════════════════════════════════════════════════════════ */
/* ═══════════════════════════════════════════════════════════════════════
   LISTENER EM TEMPO REAL — layouts
   Carrega todos os layouts do Firestore e mantém em memória.
   Qualquer mudança de outro usuário é refletida automaticamente.
   Após o primeiro carregamento, inicia listeners de variantes para todos.
═══════════════════════════════════════════════════════════════════════ */
function fbStartListening() {
  fbUpdateStatusBadge('connecting', 'Conectando ao Firebase…');

  /* Para listener anterior se existir */
  if (_fbUnsubLayouts) {
    _fbUnsubLayouts();
    _fbUnsubLayouts = null;
  }

  var _firstLoad = true;

  _fbUnsubLayouts = _fbDb.collection('layouts').onSnapshot(function (snapshot) {

    if (!_fbActive) {
      /* Primeira vez — limpa os dados dos .js e seta Firebase como fonte */
      _fbActive = true;
      SenkoLib.clearAll();
      SenkoLib.setSource('firebase');
      fbUpdateStatusBadge('connecting', 'Carregando variantes…');
      console.log('[senko-firebase] Conectado. Carregando layouts…');
    }

    /* Processa mudanças incrementais */
    snapshot.docChanges().forEach(function (change) {
      var data = change.doc.data();

      if (change.type === 'added' || change.type === 'modified') {
        var err = fbValidateLayout(data);
        if (err) {
          console.warn('[senko-firebase] Layout inválido ignorado (' + change.doc.id + '):', err);
          return;
        }
        SenkoLib.set(data.id, {
          id:   data.id,
          name: data.name,
          tags: data.tags || [],
          html: data.html || '',
          css:  data.css  || ''
        });

        /* Se layout novo apareceu após o boot, carrega variantes dele também */
        if (!_firstLoad) fbLoadVariants(data.id);
      }

      if (change.type === 'removed') {
        SenkoLib.remove(change.doc.id);
        delete _variantCache[change.doc.id];
        if (_variantUnsubs[change.doc.id]) {
          _variantUnsubs[change.doc.id]();
          delete _variantUnsubs[change.doc.id];
        }
      }
    });

    /* Primeiro carregamento completo — inicia variantes de todos os layouts */
    if (_firstLoad) {
      _firstLoad = false;
      var allLayouts = SenkoLib.getAll();
      var loaded = 0;

      allLayouts.forEach(function (layout) {
        fbLoadVariants(layout.id);
        loaded++;
      });

      console.log('[senko-firebase] Carregando variantes de ' + loaded + ' layouts…');

      /* Aguarda um ciclo para as variantes chegarem antes de renderizar */
      setTimeout(function () {
        fbUpdateStatusBadge('ok', 'Firebase conectado');
        if (typeof renderGrid === 'function') renderGrid();
      }, 1500);

      return; /* não renderiza ainda — espera o timeout */
    }

    /* Re-renderiza o grid após qualquer mudança */
    if (typeof renderGrid === 'function') renderGrid();

  }, function (err) {
    /* Erro no listener — cai para .js */
    console.error('[senko-firebase] Erro no listener de layouts:', err.message);
    _fbActive = false;
    SenkoLib.setSource('github');
    fbUpdateStatusBadge('error', 'Firebase offline — usando GitHub');
  });
}


/* ═══════════════════════════════════════════════════════════════════════
   LISTENER DE VARIANTES — lazy com cache
   Só carrega quando o modal de variantes é aberto.
   Após carregado, listener fica ativo e atualiza automaticamente.
═══════════════════════════════════════════════════════════════════════ */
function fbLoadVariants(parentId) {
  if (!_fbActive || !_fbDb) return;
  if (_variantCache[parentId]) return; /* já carregado */

  _variantCache[parentId] = true;

  _variantUnsubs[parentId] = _fbDb
    .collection('layouts')
    .doc(parentId)
    .collection('variants')
    .onSnapshot(function (snapshot) {

      snapshot.docChanges().forEach(function (change) {
        var data = change.doc.data();

        if (change.type === 'added' || change.type === 'modified') {
          var err = fbValidateVariant(data);
          if (err) {
            console.warn('[senko-firebase] Variante inválida ignorada (' + change.doc.id + '):', err);
            return;
          }
          SenkoLib.setVariant(parentId, data.name, {
            name: data.name,
            html: data.html || '',
            css:  data.css  || ''
          });
        }

        if (change.type === 'removed') {
          SenkoLib.removeVariant(parentId, change.doc.id);
        }
      });

      /* Re-renderiza variantes se o modal estiver aberto */
      if (typeof state !== 'undefined' &&
          state.currentForVariant &&
          state.currentForVariant.id === parentId &&
          typeof renderVariantBlocks === 'function') {
        renderVariantBlocks(SenkoLib.getVariants(parentId));
        if (typeof updateVariantsCount === 'function') updateVariantsCount(parentId);
      }

    }, function (err) {
      console.error('[senko-firebase] Erro no listener de variantes (' + parentId + '):', err.message);
      delete _variantCache[parentId];
    });
}


/* ═══════════════════════════════════════════════════════════════════════
   SALVAR LAYOUT — Firebase
   Chamado tanto pelo botão Firebase quanto pelo fluxo GitHub→Firebase.
═══════════════════════════════════════════════════════════════════════ */
function fbSaveLayout(layoutData) {
  if (!_fbActive || !_fbDb) {
    console.warn('[senko-firebase] Firebase não está ativo.');
    return Promise.resolve(false);
  }

  var err = fbValidateLayout(layoutData);
  if (err) {
    alert('Erro de validação: ' + err);
    return Promise.resolve(false);
  }

  var doc = {
    id:        layoutData.id,
    name:      layoutData.name,
    tags:      layoutData.tags || [],
    html:      layoutData.html || '',
    css:       layoutData.css  || '',
    updatedAt: firebase.firestore.FieldValue.serverTimestamp()
  };

  return _fbDb.collection('layouts').doc(layoutData.id).set(doc)
    .then(function () {
      console.log('[senko-firebase] Layout salvo:', layoutData.id);
      return true;
    })
    .catch(function (e) {
      console.error('[senko-firebase] Erro ao salvar layout:', e.message);
      return false;
    });
}


/* ═══════════════════════════════════════════════════════════════════════
   EXCLUIR LAYOUT — Firebase
═══════════════════════════════════════════════════════════════════════ */
function fbDeleteLayout(layoutId, deleteVariants) {
  if (!_fbActive || !_fbDb) return Promise.resolve(false);

  var ref = _fbDb.collection('layouts').doc(layoutId);

  var chain = Promise.resolve();

  /* Se pediu para deletar variantes, remove a subcoleção primeiro */
  if (deleteVariants) {
    chain = ref.collection('variants').get().then(function (snap) {
      var batch = _fbDb.batch();
      snap.docs.forEach(function (d) { batch.delete(d.ref); });
      return batch.commit();
    });
  }

  return chain.then(function () {
    return ref.delete();
  }).then(function () {
    console.log('[senko-firebase] Layout excluído:', layoutId);
    return true;
  }).catch(function (e) {
    console.error('[senko-firebase] Erro ao excluir layout:', e.message);
    return false;
  });
}


/* ═══════════════════════════════════════════════════════════════════════
   SALVAR VARIANTE — Firebase
═══════════════════════════════════════════════════════════════════════ */
function fbSaveVariant(parentId, variantData) {
  if (!_fbActive || !_fbDb) return Promise.resolve(false);

  var err = fbValidateVariant(variantData);
  if (err) {
    alert('Erro de validação: ' + err);
    return Promise.resolve(false);
  }

  var doc = {
    name:      variantData.name,
    html:      variantData.html || '',
    css:       variantData.css  || '',
    updatedAt: firebase.firestore.FieldValue.serverTimestamp()
  };

  return _fbDb
    .collection('layouts').doc(parentId)
    .collection('variants').doc(variantData.name.toLowerCase())
    .set(doc)
    .then(function () {
      console.log('[senko-firebase] Variante salva:', variantData.name, '(' + parentId + ')');
      return true;
    })
    .catch(function (e) {
      console.error('[senko-firebase] Erro ao salvar variante:', e.message);
      return false;
    });
}


/* ═══════════════════════════════════════════════════════════════════════
   EXCLUIR VARIANTE — Firebase
═══════════════════════════════════════════════════════════════════════ */
function fbDeleteVariant(parentId, variantName) {
  if (!_fbActive || !_fbDb) return Promise.resolve(false);

  return _fbDb
    .collection('layouts').doc(parentId)
    .collection('variants').doc(variantName.toLowerCase())
    .delete()
    .then(function () {
      console.log('[senko-firebase] Variante excluída:', variantName);
      return true;
    })
    .catch(function (e) {
      console.error('[senko-firebase] Erro ao excluir variante:', e.message);
      return false;
    });
}


/* ═══════════════════════════════════════════════════════════════════════
   SYNC Firebase → GitHub
   Lê todos os layouts e variantes do Firestore e faz um único commit
   no GitHub com o estado atual completo.
═══════════════════════════════════════════════════════════════════════ */
function fbSyncToGithub() {
  if (!_fbActive || !_fbDb) {
    alert('Firebase não está ativo. Não é possível fazer o sync.');
    return;
  }

  if (!SenkoLib.lock('firebase-sync')) {
    alert('Já existe uma operação em andamento. Aguarde terminar.');
    return;
  }

  fbUpdateStatusBadge('saving', 'Sincronizando Firebase → GitHub…');

  /* 1. Busca todos os layouts do Firestore */
  _fbDb.collection('layouts').get().then(function (layoutSnap) {

    var layouts = [];
    layoutSnap.docs.forEach(function (doc) {
      var d = doc.data();
      if (!fbValidateLayout(d)) layouts.push(d);
    });

    /* 2. Para cada layout, busca suas variantes */
    var variantPromises = layouts.map(function (layout) {
      return _fbDb
        .collection('layouts').doc(layout.id)
        .collection('variants').get()
        .then(function (vSnap) {
          return {
            layout:   layout,
            variants: vSnap.docs.map(function (d) { return d.data(); })
          };
        });
    });

    return Promise.all(variantPromises);

  }).then(function (results) {

    /* 3. Reconstrói o arquivo layouts001.js */
    var layoutObjects = results.map(function (r) {
      var l        = r.layout;
      var safeHtml = (l.html || '').replace(/`/g, '\\`');
      var safeCss  = (l.css  || '').replace(/`/g, '\\`');
      var tagsStr  = (l.tags || []).map(function (t) { return "'" + t + "'"; }).join(', ');
      return (
        '/*@@@@Senko - ' + l.id + ' */\n' +
        '  /* variantes: variants/' + l.id + '.js */\n' +
        '  {\n' +
        "    id: '"   + l.id   + "',\n" +
        "    name: '" + l.name + "',\n" +
        '    tags: [' + tagsStr + '],\n' +
        '    html: `' + safeHtml + '`,\n' +
        '    css: `'  + safeCss  + '`\n' +
        '  },'
      );
    });

    var layoutFileContent =
      '// @ts-nocheck\n' +
      '// Gerado automaticamente pelo sync Firebase → GitHub\n' +
      '// Não edite manualmente — use a interface do SenkoLib\n' +
      'SenkoLib.register([\n\n' +
      layoutObjects.join('\n\n') + '\n\n' +
      ']);\n';

    /* 4. Reconstrói arquivos de variantes */
    var variantFiles = {}; /* { parentId: conteúdo do arquivo } */
    results.forEach(function (r) {
      if (r.variants.length === 0) return;
      var varObjects = r.variants.map(function (v) {
        var safeHtml = (v.html || '').replace(/`/g, '\\`');
        var safeCss  = (v.css  || '').replace(/`/g, '\\`');
        return (
          '/*@@@@Senko - ' + v.name + ' */\n' +
          '  {\n' +
          "    name: '" + v.name + "',\n" +
          '    html: `' + safeHtml + '`,\n' +
          '    css: `'  + safeCss  + '`,\n' +
          '  },'
        );
      });
      variantFiles[r.layout.id] =
        '// @ts-nocheck\n' +
        '// Gerado automaticamente pelo sync Firebase → GitHub\n' +
        "SenkoLib.registerVariant('" + r.layout.id + "', [\n\n" +
        varObjects.join('\n\n') + '\n\n' +
        ']);\n';
    });

    /* 5. Envia para o GitHub — primeiro o layouts001.js */
    return githubGetFile('layouts/layouts001.js').then(function (data) {
      return githubPutFile(
        'layouts/layouts001.js',
        layoutFileContent,
        data.sha,
        '[SenkoLib] sync Firebase → GitHub: ' + results.length + ' layouts'
      );
    }).then(function () {

      /* 6. Atualiza cada arquivo de variantes */
      var variantIds = Object.keys(variantFiles);
      var chain = Promise.resolve();

      variantIds.forEach(function (parentId) {
        chain = chain.then(function () {
          var filePath = 'variants/' + parentId + '.js';
          return githubGetFile(filePath).then(function (data) {
            return githubPutFile(filePath, variantFiles[parentId], data.sha,
              '[SenkoLib] sync variants: ' + parentId);
          }).catch(function () {
            /* Arquivo não existe — cria */
            return githubPutFile(filePath, variantFiles[parentId], null,
              '[SenkoLib] create variants: ' + parentId);
          });
        });
      });

      return chain;
    });

  }).then(function () {
    SenkoLib.unlock();
    fbUpdateStatusBadge('ok', 'Sync concluído');
    console.log('[senko-firebase] Sync Firebase → GitHub concluído.');
    alert('✓ Sync concluído! GitHub atualizado com o estado atual do Firebase.');

  }).catch(function (e) {
    SenkoLib.unlock();
    fbUpdateStatusBadge('error', 'Erro no sync');
    console.error('[senko-firebase] Erro no sync:', e.message);
    alert('Erro durante o sync:\n' + e.message + '\n\nO GitHub não foi alterado.');
  });
}


/* ═══════════════════════════════════════════════════════════════════════
   MIGRAÇÃO / SYNC GitHub → Firebase
   Busca os layouts diretamente dos arquivos .js do GitHub via API,
   parseia o conteúdo e salva no Firestore.
   Funciona mesmo quando o Firebase já limpou a memória no boot.
   Exposta globalmente como fbSyncFromGithub() para uso manual e automático.
═══════════════════════════════════════════════════════════════════════ */
function fbSyncFromGithub() {
  if (!_fbActive || !_fbDb) {
    console.warn('[senko-firebase] Firebase não está ativo.');
    return;
  }

  if (!SenkoLib.lock('firebase-sync-from-github')) {
    console.warn('[senko-firebase] Operação em andamento, aguarde.');
    return;
  }

  console.log('[senko-firebase] Iniciando sync GitHub → Firebase…');
  fbUpdateStatusBadge('connecting', 'Importando do GitHub…');

  /* 1. Lista todos os arquivos de layouts no GitHub */
  githubListDir('layouts').then(function (entries) {
    var jsFiles = entries.filter(function (e) {
      return e.type === 'file' && e.name.endsWith('.js');
    });

    /* 2. Lê cada arquivo */
    return Promise.all(jsFiles.map(function (entry) {
      return githubGetFile(entry.path).then(function (data) {
        return data.content;
      });
    }));

  }).then(function (fileContents) {

    /* 3. Parseia os objetos de layout de cada arquivo
          usando os marcadores @@@@Senko */
    var layouts = [];

    fileContents.forEach(function (content) {
      var re = /\/\*@@@@Senko - ([a-z0-9-]+) \*\//g;
      var match;

      while ((match = re.exec(content)) !== null) {
        var id      = match[1];
        var objOpen = content.indexOf('{', match.index + match[0].length);
        if (objOpen === -1) continue;

        /* Conta chaves para achar o fechamento do objeto */
        var i = objOpen, depth = 0, inTemplate = false, len = content.length;
        while (i < len) {
          var ch = content[i];
          if (ch === '`') { inTemplate = !inTemplate; i++; continue; }
          if (inTemplate) { i++; continue; }
          if (ch === '{') { depth++; i++; continue; }
          if (ch === '}') {
            depth--;
            if (depth === 0) break;
            i++; continue;
          }
          i++;
        }

        var objStr = content.slice(objOpen, i + 1);

        /* Extrai campos via regex — evita eval */
        var nameMatch = objStr.match(/name:\s*'([^']+)'/);
        var tagsMatch = objStr.match(/tags:\s*\[([^\]]*)\]/);
        var htmlMatch = objStr.match(/html:\s*`([\s\S]*?)`(?:,|\s*\n\s*css)/);
        var cssMatch  = objStr.match(/css:\s*`([\s\S]*?)`(?:,|\s*\n?\s*\})/);

        if (!nameMatch) continue;

        var tags = [];
        if (tagsMatch && tagsMatch[1].trim()) {
          tags = tagsMatch[1].split(',')
            .map(function (t) { return t.trim().replace(/^'|'$/g, ''); })
            .filter(Boolean);
        }

        layouts.push({
          id:   id,
          name: nameMatch[1],
          tags: tags,
          html: htmlMatch ? htmlMatch[1].replace(/\\`/g, '`') : '',
          css:  cssMatch  ? cssMatch[1].replace(/\\`/g, '`')  : ''
        });
      }
    });

    if (layouts.length === 0) {
      SenkoLib.unlock();
      fbUpdateStatusBadge('error', 'Nenhum layout encontrado no GitHub');
      console.warn('[senko-firebase] Nenhum layout encontrado nos arquivos do GitHub.');
      return;
    }

    console.log('[senko-firebase] ' + layouts.length + ' layouts encontrados no GitHub. Salvando no Firestore…');

    /* 4. Salva layouts em lotes no Firestore (limite de 500 por batch) */
    var BATCH_SIZE = 400;
    var chain = Promise.resolve();
    var total  = 0;

    for (var b = 0; b < layouts.length; b += BATCH_SIZE) {
      (function (slice) {
        chain = chain.then(function () {
          var batch = _fbDb.batch();
          slice.forEach(function (l) {
            var err = fbValidateLayout(l);
            if (err) { console.warn('[senko-firebase] Layout inválido ignorado (' + l.id + '):', err); return; }
            batch.set(
              _fbDb.collection('layouts').doc(l.id),
              {
                id:        l.id,
                name:      l.name,
                tags:      l.tags,
                html:      l.html,
                css:       l.css,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
              },
              { merge: true }
            );
            total++;
          });
          return batch.commit();
        });
      })(layouts.slice(b, b + BATCH_SIZE));
    }

    return chain.then(function () {
      console.log('[senko-firebase] ' + total + ' layouts salvos. Buscando variantes do GitHub…');
      fbUpdateStatusBadge('saving', 'Importando variantes…');

      /* 5. Lista arquivos de variantes no GitHub */
      return githubListDir('variants').catch(function () {
        return []; /* pasta variants pode não existir */
      });

    }).then(function (entries) {
      var variantFiles = (entries || []).filter(function (e) {
        return e.type === 'file' && e.name.endsWith('.js');
      });

      if (variantFiles.length === 0) {
        SenkoLib.unlock();
        fbUpdateStatusBadge('ok', 'Firebase sincronizado');
        console.log('[senko-firebase] Sync GitHub → Firebase concluído: ' + total + ' layouts, 0 arquivos de variantes.');
        return;
      }

      /* 6. Lê cada arquivo de variantes e parseia */
      var variantChain = Promise.resolve();
      var totalVariants = 0;

      variantFiles.forEach(function (entry) {
        variantChain = variantChain.then(function () {
          return githubGetFile(entry.path).then(function (data) {
            var content  = data.content;
            var parentId = entry.name.replace('.js', '');

            /* Extrai o parentId do registerVariant */
            var parentMatch = content.match(/registerVariant\s*\(\s*'([^']+)'/);
            if (parentMatch) parentId = parentMatch[1];

            /* Parseia cada variante pelo marcador */
            var varRe = /\/\*@@@@Senko - ([a-z0-9._-]+) \*\//g;
            var match;
            var varBatch = _fbDb.batch();
            var count = 0;

            while ((match = varRe.exec(content)) !== null) {
              var varName = match[1];
              var objOpen = content.indexOf('{', match.index + match[0].length);
              if (objOpen === -1) continue;

              var i = objOpen, depth = 0, inTemplate = false, len = content.length;
              while (i < len) {
                var ch = content[i];
                if (ch === '`') { inTemplate = !inTemplate; i++; continue; }
                if (inTemplate) { i++; continue; }
                if (ch === '{') { depth++; i++; continue; }
                if (ch === '}') { depth--; if (depth === 0) break; i++; continue; }
                i++;
              }

              var objStr   = content.slice(objOpen, i + 1);
              var htmlMatch = objStr.match(/html:\s*`([\s\S]*?)`(?:,|\s*\n\s*css)/);
              var cssMatch  = objStr.match(/css:\s*`([\s\S]*?)`(?:,|\s*\n?\s*\})/);

              varBatch.set(
                _fbDb.collection('layouts').doc(parentId).collection('variants').doc(varName),
                {
                  name:      varName,
                  html:      htmlMatch ? htmlMatch[1].replace(/\\`/g, '`') : '',
                  css:       cssMatch  ? cssMatch[1].replace(/\\`/g, '`')  : '',
                  updatedAt: firebase.firestore.FieldValue.serverTimestamp()
                },
                { merge: true }
              );
              count++;
            }

            if (count > 0) {
              totalVariants += count;
              return varBatch.commit();
            }
          });
        });
      });

      return variantChain.then(function () {
        SenkoLib.unlock();
        fbUpdateStatusBadge('ok', 'Firebase sincronizado');
        console.log('[senko-firebase] Sync GitHub → Firebase concluído: ' + total + ' layouts, ' + totalVariants + ' variantes salvas.');
      });

    });

  }).catch(function (e) {
    SenkoLib.unlock();
    fbUpdateStatusBadge('error', 'Erro no sync');
    console.error('[senko-firebase] Erro no sync GitHub → Firebase:', e.message);
  });
}


/* ═══════════════════════════════════════════════════════════════════════
   BADGE DE STATUS — texto de status no header (discreto)
═══════════════════════════════════════════════════════════════════════ */
function fbUpdateStatusBadge(type, msg) {
  var el = document.getElementById('fbStatusBadge');
  if (!el) return;
  el.textContent = msg;
  el.className   = 'fb-status-badge fb-status-' + type;
}


/* ═══════════════════════════════════════════════════════════════════════
   MODAL DE CONFIGURAÇÃO DO FIREBASE
═══════════════════════════════════════════════════════════════════════ */
function fbOpenConfigModal() {
  var overlay = document.getElementById('fbConfigOverlay');
  if (!overlay) return;

  var cfg = fbGetConfig() || {};
  var fields = ['apiKey','authDomain','projectId','storageBucket','messagingSenderId','appId'];
  fields.forEach(function (f) {
    var el = document.getElementById('fbCfg_' + f);
    if (el) el.value = cfg[f] || '';
  });

  overlay.classList.remove('fb-config-hidden');
  document.body.style.overflow = 'hidden';
  var first = document.getElementById('fbCfg_apiKey');
  if (first) first.focus();
}

function fbCloseConfigModal() {
  var overlay = document.getElementById('fbConfigOverlay');
  if (overlay) overlay.classList.add('fb-config-hidden');
  document.body.style.overflow = '';
}


/* ═══════════════════════════════════════════════════════════════════════
   INICIALIZAÇÃO — injeta UI e inicia o Firebase
═══════════════════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', function () {

  /* ── Bolinha de status ── */
  fbInjectSourceIndicator();

  /* ── Badge de status textual ── */
  var badge = document.createElement('span');
  badge.id        = 'fbStatusBadge';
  badge.className = 'fb-status-badge';
  badge.textContent = '';
  var logoEl = document.querySelector('.logo');
  if (logoEl) logoEl.appendChild(badge);

  /* ── Estilos ── */
  var style = document.createElement('style');
  style.textContent = [
    '.fb-status-badge {',
    '  font-size: .7rem; font-weight: 700;',
    '  padding: .15rem .45rem;',
    '  border-radius: 99px;',
    '  margin-left: 8px;',
    '  vertical-align: middle;',
    '  transition: background .3s, color .3s;',
    '  display: none;',
    '}',
    '.fb-status-badge:not(:empty) { display: inline-block; }',
    '.fb-status-connecting { background: #fef3c7; color: #92400e; }',
    '.fb-status-ok         { background: #dcfce7; color: #166534; }',
    '.fb-status-saving     { background: #e0f2fe; color: #0369a1; }',
    '.fb-status-error      { background: #fee2e2; color: #991b1b; }',

    /* Modal de configuração */
    '#fbConfigOverlay {',
    '  position: fixed; inset: 0;',
    '  background: rgba(0,0,0,.55);',
    '  backdrop-filter: blur(3px);',
    '  display: flex; align-items: center; justify-content: center;',
    '  z-index: 9999; padding: 1rem;',
    '}',
    '#fbConfigOverlay.fb-config-hidden { display: none; }',
    '#fbConfigModal {',
    '  background: var(--bg, #fff);',
    '  border: 1.5px solid var(--border, #e2e8f0);',
    '  border-radius: calc(var(--radius, 8px) * 1.5);',
    '  padding: 2rem; width: 100%; max-width: 500px;',
    '  display: flex; flex-direction: column; gap: 1rem;',
    '  box-shadow: 0 20px 60px rgba(0,0,0,.18);',
    '  max-height: 90vh; overflow-y: auto;',
    '}',
    '#fbConfigTitle { font-size: 1.1rem; font-weight: 800; color: var(--text1, #0f172a); margin: 0 0 .1rem; }',
    '#fbConfigSubtitle { font-size: .82rem; color: var(--text2, #64748b); margin: 0; }',
    '#fbConfigHeader { display: flex; justify-content: space-between; align-items: flex-start; }',
    '#fbConfigCloseBtn { background: none; border: none; font-size: 1rem; color: var(--text3, #94a3b8); cursor: pointer; }',
    '.fb-config-field { display: flex; flex-direction: column; gap: .3rem; }',
    '.fb-config-field label { font-size: .82rem; font-weight: 700; color: var(--text1, #0f172a); }',
    '.fb-config-field input {',
    '  padding: .45rem .75rem;',
    '  border: 1.5px solid var(--border, #e2e8f0);',
    '  border-radius: var(--radius, 8px);',
    '  font-size: .85rem;',
    '  background: var(--bg, #fff);',
    '  color: var(--text1, #0f172a);',
    '  font-family: var(--font-mono, monospace);',
    '}',
    '.fb-config-field input:focus { outline: none; border-color: #f97316; }',
    '.fb-config-field .fb-field-desc { font-size: .75rem; color: var(--text3, #94a3b8); }',
    '#fbConfigActions { display: flex; gap: .5rem; justify-content: flex-end; margin-top: .5rem; }',
    '#fbConfigSaveBtn {',
    '  padding: .5rem 1.2rem;',
    '  background: #f97316; color: #fff;',
    '  border: none; border-radius: var(--radius, 8px);',
    '  font-size: .85rem; font-weight: 700; cursor: pointer;',
    '}',
    '#fbConfigSaveBtn:hover { background: #ea6c0a; }',
    '#fbConfigResetBtn {',
    '  padding: .5rem 1rem;',
    '  background: transparent; color: var(--text2, #64748b);',
    '  border: 1.5px solid var(--border, #e2e8f0);',
    '  border-radius: var(--radius, 8px);',
    '  font-size: .85rem; font-weight: 700; cursor: pointer;',
    '}',
    '#fbConfigError { font-size: .82rem; color: #ef4444; font-weight: 700; display: none; }',
    '#fbConfigError:not(:empty) { display: block; }',

    /* Botão Firebase nos modais */
    '.btn-firebase {',
    '  display: inline-flex; align-items: center; gap: .4rem;',
    '  padding: .45rem .85rem;',
    '  background: #fff7ed; color: #c2410c;',
    '  border: 1px solid #fed7aa;',
    '  border-radius: var(--radius, 6px);',
    '  font-size: .8rem; font-weight: 700;',
    '  font-family: var(--font-body, sans-serif);',
    '  cursor: pointer; height: 34px;',
    '  transition: background .15s, border-color .15s;',
    '}',
    '.btn-firebase:hover { background: #ffedd5; border-color: #f97316; }',
    '.btn-firebase:disabled { opacity: .5; cursor: not-allowed; }',

    /* Botão de sync no header */
    '.btn-fb-sync {',
    '  display: inline-flex; align-items: center; gap: .35rem;',
    '  padding: .4rem .8rem;',
    '  background: transparent;',
    '  color: var(--text2, #64748b);',
    '  border: 1.5px solid var(--border, #e2e8f0);',
    '  border-radius: var(--radius, 6px);',
    '  font-size: .78rem; font-weight: 700;',
    '  cursor: pointer; height: 32px;',
    '  transition: border-color .15s, color .15s;',
    '}',
    '.btn-fb-sync:hover { border-color: #f97316; color: #f97316; }',
  ].join('\n');
  document.head.appendChild(style);

  /* ── Modal de configuração ── */
  var fbFields = [
    { id: 'apiKey',            label: 'API Key',             desc: 'Chave pública do seu projeto Firebase' },
    { id: 'authDomain',        label: 'Auth Domain',         desc: 'ex: meu-projeto.firebaseapp.com' },
    { id: 'projectId',         label: 'Project ID',          desc: 'ID do projeto no Firebase Console' },
    { id: 'storageBucket',     label: 'Storage Bucket',      desc: 'ex: meu-projeto.appspot.com' },
    { id: 'messagingSenderId', label: 'Messaging Sender ID', desc: 'Número do sender' },
    { id: 'appId',             label: 'App ID',              desc: 'ID do app registrado' },
  ];

  var fieldsHtml = fbFields.map(function (f) {
    return [
      '<div class="fb-config-field">',
      '  <label for="fbCfg_' + f.id + '">' + f.label + '</label>',
      '  <input type="text" id="fbCfg_' + f.id + '" autocomplete="off" spellcheck="false" />',
      '  <span class="fb-field-desc">' + f.desc + '</span>',
      '</div>'
    ].join('\n');
  }).join('\n');

  var fbOverlay = document.createElement('div');
  fbOverlay.id        = 'fbConfigOverlay';
  fbOverlay.className = 'fb-config-hidden';
  fbOverlay.innerHTML = [
    '<div id="fbConfigModal">',
    '  <div id="fbConfigHeader">',
    '    <div>',
    '      <h3 id="fbConfigTitle">Configuração do Firebase</h3>',
    '      <p id="fbConfigSubtitle">Cole os dados do seu projeto Firebase. Encontre em: Console → Configurações do projeto → Seus apps.</p>',
    '    </div>',
    '    <button id="fbConfigCloseBtn" title="Fechar">✕</button>',
    '  </div>',
    '  <div id="fbConfigError"></div>',
    fieldsHtml,
    '  <div id="fbConfigActions">',
    '    <button id="fbConfigResetBtn">Desconectar Firebase</button>',
    '    <button id="fbConfigSaveBtn">Conectar</button>',
    '  </div>',
    '</div>',
  ].join('\n');
  document.body.appendChild(fbOverlay);

  /* Fechar clicando no overlay */
  fbOverlay.addEventListener('click', function (e) {
    if (e.target === fbOverlay) fbCloseConfigModal();
  });
  document.getElementById('fbConfigCloseBtn').addEventListener('click', fbCloseConfigModal);

  /* Salvar configuração */
  document.getElementById('fbConfigSaveBtn').addEventListener('click', function () {
    var fields = ['apiKey','authDomain','projectId','storageBucket','messagingSenderId','appId'];
    var cfg = {};
    var missing = [];

    fields.forEach(function (f) {
      var val = (document.getElementById('fbCfg_' + f).value || '').trim();
      cfg[f] = val;
      if (!val) missing.push(f);
    });

    var errEl = document.getElementById('fbConfigError');

    if (missing.length > 0) {
      errEl.textContent = 'Preencha todos os campos: ' + missing.join(', ');
      return;
    }

    errEl.textContent = '';
    fbSetConfig(cfg);
    fbCloseConfigModal();

    /* Reinicia o Firebase com a nova config */
    if (_fbUnsubLayouts) { _fbUnsubLayouts(); _fbUnsubLayouts = null; }
    Object.keys(_variantUnsubs).forEach(function (k) { _variantUnsubs[k](); });
    _variantUnsubs = {};
    _variantCache  = {};
    _fbActive      = false;
    _fbApp         = null;
    _fbDb          = null;

    fbBoot();
  });

  /* Desconectar Firebase */
  document.getElementById('fbConfigResetBtn').addEventListener('click', function () {
    if (!confirm('Desconectar o Firebase? O site voltará a usar os arquivos .js do GitHub.')) return;
    if (_fbUnsubLayouts) { _fbUnsubLayouts(); _fbUnsubLayouts = null; }
    Object.keys(_variantUnsubs).forEach(function (k) { _variantUnsubs[k](); });
    _variantUnsubs = {};
    _variantCache  = {};
    _fbActive      = false;
    _fbApp         = null;
    _fbDb          = null;
    fbClearConfig();
    SenkoLib.setSource('github');
    fbCloseConfigModal();
    fbUpdateStatusBadge('', '');
    alert('Firebase desconectado. Recarregue a página para usar os arquivos .js.');
  });

  /* ── Botão Firebase (ícone chama) no header ao lado da engrenagem ── */
  var FIREBASE_ICON = '<svg viewBox="0 0 32 32" width="14" height="14" fill="currentColor"><path d="M4.674 24.01L10.24 3.66a.52.52 0 01.99-.05l3.07 6.39 1.56-2.97a.52.52 0 01.93 0L27.326 24.01H4.674z"/><path opacity=".6" d="M16 24.01L10.24 3.66a.52.52 0 01.99-.05L27.326 24.01H16z"/></svg>';

  var searchWrap = document.querySelector('.search-wrap');
  if (searchWrap) {
    /* Botão de configuração Firebase */
    var fbConfigBtn = document.createElement('button');
    fbConfigBtn.id        = 'fbConfigBtn';
    fbConfigBtn.className = 'gh-config-gear-btn'; /* mesmo estilo da engrenagem GitHub */
    fbConfigBtn.innerHTML = FIREBASE_ICON;
    fbConfigBtn.title     = 'Configurar Firebase';
    fbConfigBtn.style.color = '#f97316';
    searchWrap.parentNode.insertBefore(fbConfigBtn, searchWrap);
    fbConfigBtn.addEventListener('click', fbOpenConfigModal);

    /* Botão de sync Firebase → GitHub */
    var syncBtn = document.createElement('button');
    syncBtn.id        = 'fbSyncBtn';
    syncBtn.className = 'btn-fb-sync';
    syncBtn.innerHTML = FIREBASE_ICON + ' Sync → GitHub';
    syncBtn.title     = 'Exportar tudo do Firebase para o GitHub (backup)';
    searchWrap.parentNode.insertBefore(syncBtn, searchWrap);
    syncBtn.addEventListener('click', fbSyncToGithub);
  }

  /* ── Botão Firebase nos modais de editar e adicionar layout ── */
  /* Modal editar */
  var saveToFileBtn = document.getElementById('saveToFileBtn');
  if (saveToFileBtn && !document.getElementById('fbSaveLayoutBtn')) {
    var fbEditBtn       = document.createElement('button');
    fbEditBtn.id        = 'fbSaveLayoutBtn';
    fbEditBtn.className = 'btn-firebase';
    fbEditBtn.innerHTML = FIREBASE_ICON + ' Firebase';
    fbEditBtn.title     = 'Salvar layout no Firebase';
    saveToFileBtn.parentNode.insertBefore(fbEditBtn, saveToFileBtn);

    fbEditBtn.addEventListener('click', function () {
      if (!_fbActive) { alert('Firebase não está configurado ou não está ativo.'); return; }
      var id      = document.getElementById('editId').value.trim().toLowerCase();
      var name    = document.getElementById('editName').value.trim();
      var tagsRaw = document.getElementById('editTags').value;
      var html    = document.getElementById('editHtml').value;
      var css     = document.getElementById('editCss').value;
      var tags    = tagsRaw.split(',').map(function(t){ return t.trim(); }).filter(Boolean);

      if (!SenkoLib.lock('firebase-edit')) {
        alert('Aguarde a operação atual terminar.');
        return;
      }

      fbEditBtn.textContent = 'Salvando…';
      fbEditBtn.disabled    = true;

      fbSaveLayout({ id: id, name: name, tags: tags, html: html, css: css })
        .then(function (ok) {
          SenkoLib.unlock();
          if (ok) {
            fbEditBtn.innerHTML = FIREBASE_ICON + ' Salvo!';
            setTimeout(function () {
              if (typeof closeEditModal === 'function') closeEditModal();
              fbEditBtn.innerHTML  = FIREBASE_ICON + ' Firebase';
              fbEditBtn.disabled   = false;
            }, 1200);
          } else {
            fbEditBtn.innerHTML = FIREBASE_ICON + ' Firebase';
            fbEditBtn.disabled  = false;
          }
        });
    });
  }

  /* Modal adicionar */
  var ghNewGroup = document.getElementById('ghNewLayoutGroup');
  if (ghNewGroup && !document.getElementById('fbSaveNewLayoutBtn')) {
    var fbNewBtn       = document.createElement('button');
    fbNewBtn.id        = 'fbSaveNewLayoutBtn';
    fbNewBtn.className = 'btn-firebase';
    fbNewBtn.innerHTML = FIREBASE_ICON + ' Firebase';
    fbNewBtn.title     = 'Salvar novo layout no Firebase';
    ghNewGroup.parentNode.insertBefore(fbNewBtn, ghNewGroup);

    fbNewBtn.addEventListener('click', function () {
      if (!_fbActive) { alert('Firebase não está configurado ou não está ativo.'); return; }
      var id      = document.getElementById('addId').value.trim().toLowerCase();
      var name    = document.getElementById('addName').value.trim();
      var tagsRaw = document.getElementById('addTags').value;
      var html    = document.getElementById('addHtml').value;
      var css     = document.getElementById('addCss').value;
      var tags    = tagsRaw.split(',').map(function(t){ return t.trim(); }).filter(Boolean);

      var idValid = /^[a-z0-9-]+$/.test(id);
      if (!id || !idValid || name.length < 3 || html.length < 3) {
        alert('Preencha todos os campos obrigatórios (ID, Nome e HTML) corretamente.');
        return;
      }

      /* Verifica duplicata */
      if (SenkoLib.getById(id)) {
        alert('Já existe um layout com o ID "' + id + '".\nUse o botão de editar no card existente.');
        return;
      }

      if (!SenkoLib.lock('firebase-add')) {
        alert('Aguarde a operação atual terminar.');
        return;
      }

      fbNewBtn.textContent = 'Salvando…';
      fbNewBtn.disabled    = true;

      fbSaveLayout({ id: id, name: name, tags: tags, html: html, css: css })
        .then(function (ok) {
          SenkoLib.unlock();
          if (ok) {
            fbNewBtn.innerHTML = FIREBASE_ICON + ' Salvo!';
            setTimeout(function () {
              if (typeof closeAddModal === 'function') closeAddModal();
              fbNewBtn.innerHTML = FIREBASE_ICON + ' Firebase';
              fbNewBtn.disabled  = false;
            }, 1200);
          } else {
            fbNewBtn.innerHTML = FIREBASE_ICON + ' Firebase';
            fbNewBtn.disabled  = false;
          }
        });
    });
  }

  /* ── Botão Firebase no modal de nova variante ── */
  var newVarAnchor = document.getElementById('ghvNewVarBtnAnchor');
  if (newVarAnchor && !document.getElementById('fbSaveNewVarBtn')) {
    var fbNewVarBtn       = document.createElement('button');
    fbNewVarBtn.id        = 'fbSaveNewVarBtn';
    fbNewVarBtn.className = 'btn-firebase';
    fbNewVarBtn.innerHTML = FIREBASE_ICON + ' Firebase';
    fbNewVarBtn.title     = 'Criar variante no Firebase';
    newVarAnchor.style.display = '';
    newVarAnchor.appendChild(fbNewVarBtn);

    fbNewVarBtn.addEventListener('click', function () {
      if (!_fbActive) { alert('Firebase não está configurado ou não está ativo.'); return; }
      if (!state.currentForVariant) { alert('Nenhum layout pai selecionado.'); return; }

      var name = document.getElementById('newVarName').value.trim().toLowerCase();
      var html = document.getElementById('newVarHtml').value;
      var css  = document.getElementById('newVarCss').value;

      if (name.length < 2) { alert('Preencha o nome da variante.'); return; }

      if (!SenkoLib.lock('firebase-new-variant')) {
        alert('Aguarde a operação atual terminar.');
        return;
      }

      fbNewVarBtn.textContent = 'Salvando…';
      fbNewVarBtn.disabled    = true;

      var parentId = state.currentForVariant.id;

      fbSaveVariant(parentId, { name: name, html: html, css: css })
        .then(function (ok) {
          SenkoLib.unlock();
          if (ok) {
            fbNewVarBtn.innerHTML = FIREBASE_ICON + ' Salvo!';
            setTimeout(function () {
              if (typeof closeNewVariantModal === 'function') closeNewVariantModal();
              fbNewVarBtn.innerHTML = FIREBASE_ICON + ' Firebase';
              fbNewVarBtn.disabled  = false;
            }, 1200);
          } else {
            fbNewVarBtn.innerHTML = FIREBASE_ICON + ' Firebase';
            fbNewVarBtn.disabled  = false;
          }
        });
    });
  }

  /* ── Botão Firebase no modal de editar variante ── */
  var saveVarAnchor = document.getElementById('saveVarToFileBtn');
  if (saveVarAnchor && !document.getElementById('fbSaveEditVarBtn')) {
    var fbEditVarBtn       = document.createElement('button');
    fbEditVarBtn.id        = 'fbSaveEditVarBtn';
    fbEditVarBtn.className = 'btn-firebase';
    fbEditVarBtn.innerHTML = FIREBASE_ICON + ' Firebase';
    fbEditVarBtn.title     = 'Salvar variante no Firebase';
    saveVarAnchor.parentNode.insertBefore(fbEditVarBtn, saveVarAnchor);

    fbEditVarBtn.addEventListener('click', function () {
      if (!_fbActive) { alert('Firebase não está configurado ou não está ativo.'); return; }
      if (!state.currentForVariant)  { alert('Nenhum layout pai selecionado.'); return; }
      if (!state.currentEditVariant) { alert('Nenhuma variante selecionada.'); return; }

      var originalName = state.currentEditVariant.name || '';
      var newName      = document.getElementById('editVarName').value.trim().toLowerCase();
      var html         = document.getElementById('editVarHtml').value;
      var css          = document.getElementById('editVarCss').value;
      var parentId     = state.currentForVariant.id;

      if (newName.length < 2) { alert('Preencha o nome da variante.'); return; }

      if (!SenkoLib.lock('firebase-edit-variant')) {
        alert('Aguarde a operação atual terminar.');
        return;
      }

      fbEditVarBtn.textContent = 'Salvando…';
      fbEditVarBtn.disabled    = true;

      /* Se o nome mudou, remove a antiga e cria a nova */
      var chain = Promise.resolve();
      if (originalName.toLowerCase() !== newName) {
        chain = fbDeleteVariant(parentId, originalName);
      }

      chain.then(function () {
        return fbSaveVariant(parentId, { name: newName, html: html, css: css });
      }).then(function (ok) {
        SenkoLib.unlock();
        if (ok) {
          fbEditVarBtn.innerHTML = FIREBASE_ICON + ' Salvo!';
          setTimeout(function () {
            if (typeof closeEditVariantModal === 'function') closeEditVariantModal();
            fbEditVarBtn.innerHTML = FIREBASE_ICON + ' Firebase';
            fbEditVarBtn.disabled  = false;
          }, 1200);
        } else {
          fbEditVarBtn.innerHTML = FIREBASE_ICON + ' Firebase';
          fbEditVarBtn.disabled  = false;
        }
      });
    });
  }

  /* ── Hook: carregar variantes do Firebase quando modal abre ── */
  /* Intercepta openVariantsModal para disparar fbLoadVariants */
  var _origOpenVariantsModal = window.openVariantsModal;
  if (typeof _origOpenVariantsModal === 'function') {
    window.openVariantsModal = function (layout) {
      _origOpenVariantsModal(layout);
      if (_fbActive) fbLoadVariants(layout.id);
    };
  }

  /* ── Hook: GitHub → Firebase (após salvar no GitHub, salva no Firebase também) ── */
  /* Sobrescreve githubSaveLayout para chamar fbSaveLayout na sequência */
  var _origGithubSaveLayout = window.githubSaveLayout;
  if (typeof _origGithubSaveLayout === 'function') {
    window.githubSaveLayout = function (layoutId, objectCode) {
      return _origGithubSaveLayout(layoutId, objectCode).then(function (result) {
        if (result && _fbActive) {
          var layout = SenkoLib.getById(layoutId);
          if (layout) fbSaveLayout(layout);
        }
        return result;
      });
    };
  }

  /* Sobrescreve githubSaveNewLayout */
  var _origGithubSaveNewLayout = window.githubSaveNewLayout;
  if (typeof _origGithubSaveNewLayout === 'function') {
    window.githubSaveNewLayout = function (fileName, objectCode, layoutId) {
      return _origGithubSaveNewLayout(fileName, objectCode, layoutId).then(function (result) {
        if (result && _fbActive) {
          var layout = SenkoLib.getById(layoutId);
          if (layout) fbSaveLayout(layout);
        }
        return result;
      });
    };
  }

  /* ── Inicia o Firebase ── */
  fbBoot();

});
