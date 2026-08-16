(function () {
  /*
   * Porta de entrada de Colecoes.
   *
   * Carrega apenas arquivos desta feature e registra sua aba no shell. Se a
   * pasta for removida, nenhuma outra feature perde dados ou funcoes.
   */
  if (!window.SenkoShell) return;

  var currentScript = document.currentScript;
  var featureBaseUrl = currentScript && currentScript.src
    ? new URL('./', currentScript.src).href
    : new URL('app/features/colecoes/', document.baseURI).href;
  var panel;
  var loadPromise;
  var firebaseSyncPromise;
  var firebaseCollections = [];
  var firebaseLayouts = [];
  var firebaseLayoutsUnsubscribe;
  var firebaseUnsubscribers = [];
  var firebaseCollectionSignature = '';
  var dataModeUnsubscribe;

  function usesFirebaseData() {
    return Boolean(
      window.SenkoFirebase &&
      window.SenkoFirebase.isEnabled &&
      window.SenkoFirebase.isEnabled()
    );
  }

  function loadStaticSnapshot() {
    var repository = window.SenkoColecoesStatic;
    if (!repository || !repository.isAvailable() || typeof ColLib === 'undefined') return false;
    ColLib.replaceAll(repository.getCollections());
    if (typeof ColGroups !== 'undefined') ColGroups.load(repository.getGroups());
    return true;
  }

  function featureUrl(path) {
    var absoluteUrl = new URL(path, featureBaseUrl).href;
    return window.SenkoFreshAssets
      ? window.SenkoFreshAssets.url(absoluteUrl)
      : absoluteUrl;
  }

  function loadStyle(path) {
    var absoluteHref = featureUrl(path);
    if (document.querySelector('link[data-senko-colecoes-style="' + absoluteHref + '"]')) return;

    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = absoluteHref;
    link.dataset.senkoColecoesStyle = absoluteHref;
    document.head.appendChild(link);
  }

  function loadScript(path) {
    return new Promise(function (resolve, reject) {
      var absoluteSrc = featureUrl(path);
      var existing = document.querySelector('script[data-senko-colecoes-src="' + absoluteSrc + '"]');
      if (existing && existing.dataset.loaded === '1') {
        resolve();
        return;
      }

      var script = existing || document.createElement('script');
      script.src = absoluteSrc;
      script.dataset.senkoColecoesSrc = absoluteSrc;
      script.onload = function () {
        script.dataset.loaded = '1';
        resolve();
      };
      script.onerror = function () {
        reject(new Error('Falha ao carregar ' + path));
      };
      if (!existing) document.head.appendChild(script);
    });
  }

  function applyFirebaseSnapshot() {
    if (typeof ColLib === 'undefined' || typeof ColLib.replaceAll !== 'function') return;

    var openCollectionId = window._colCurrentCollection
      ? window._colCurrentCollection.slug
      : '';
    var openLayoutId = window._colCurrentLayout
      ? window._colCurrentLayout.id
      : '';

    var layoutsByCollection = {};
    firebaseLayouts.forEach(function (layout) {
      var collectionId = String(layout.collectionId || '').toLowerCase();
      if (!collectionId) return;
      if (!layoutsByCollection[collectionId]) layoutsByCollection[collectionId] = [];
      layoutsByCollection[collectionId].push(layout);
    });

    var collections = firebaseCollections.map(function (collection) {
      var collectionKey = String(collection.slug || '').toLowerCase();
      var layouts = layoutsByCollection[collectionKey] || [];
      return Object.assign({}, collection, {
        layouts: layouts,
        layoutCount: layouts.length,
        _senkoLazy: false
      });
    });

    ColLib.replaceAll(collections);

    if (openCollectionId && typeof ColLib.getBySlug === 'function') {
      var freshCollection = ColLib.getBySlug(openCollectionId);
      if (freshCollection) {
        window._colCurrentCollection = freshCollection;
        if (openLayoutId) {
          var freshLayout = (freshCollection.layouts || []).find(function (layout) {
            return layout.id === openLayoutId;
          });
          if (freshLayout && window.SenkoColecoesLayoutEditor &&
              window.SenkoColecoesLayoutEditor.isOpen &&
              window.SenkoColecoesLayoutEditor.isOpen() &&
              window.SenkoColecoesLayoutEditor.applyRemoteChange) {
            var previousRevision = window._colCurrentLayout &&
              window._colCurrentLayout._firebaseRevisionId;
            if (previousRevision && previousRevision !== freshLayout._firebaseRevisionId) {
              var remoteApplied = window.SenkoColecoesLayoutEditor.applyRemoteChange(freshLayout);
              if (remoteApplied === false) freshLayout = window._colCurrentLayout;
            }
          }
          window._colCurrentLayout = freshLayout || window._colCurrentLayout;
        }

        var collectionOverlay = document.getElementById('colCollectionOverlay');
        if (collectionOverlay && !collectionOverlay.classList.contains('hidden') &&
            typeof _colRenderLayoutsGrid === 'function') {
          _colRenderLayoutsGrid(freshCollection);
        }
      }
    }

    if (window.SenkoColecoes) window.SenkoColecoes.render();
  }

  function startFirebaseSync() {
    if (firebaseSyncPromise || !usesFirebaseData() || !window.SenkoFirebase.isReady()) {
      return firebaseSyncPromise;
    }

    firebaseSyncPromise = Promise.resolve().then(function () {
      var repository = window.SenkoColecoesFirebase;
      if (!repository) {
        throw new Error('Repositorio Firebase de Colecoes indisponivel.');
      }

      function syncLayoutListeners(collections) {
        var collectionIds = collections.map(function (collection) {
          return collection.slug;
        }).filter(Boolean).sort();
        var signature = collectionIds.join('|');
        if (signature === firebaseCollectionSignature) return;

        firebaseCollectionSignature = signature;
        if (typeof firebaseLayoutsUnsubscribe === 'function') {
          firebaseLayoutsUnsubscribe();
        }
        firebaseLayoutsUnsubscribe = repository.watchLayoutsForCollections(
          collectionIds,
          function (layouts) {
            firebaseLayouts = layouts;
            applyFirebaseSnapshot();
          },
          function (error) {
            console.error('[Colecoes] Falha ao sincronizar layouts:', error);
          }
        );
      }

      firebaseUnsubscribers.push(repository.watchCollections(function (collections) {
        firebaseCollections = collections;
        syncLayoutListeners(collections);
        applyFirebaseSnapshot();
      }, function (error) {
        console.error('[Colecoes] Falha ao sincronizar colecoes:', error);
      }));

      firebaseUnsubscribers.push(repository.watchGroups(function (groups) {
        if (typeof ColGroups !== 'undefined') ColGroups.load(groups);
        if (typeof colRefreshGroupSelects === 'function') colRefreshGroupSelects();
        if (window.SenkoColecoes) window.SenkoColecoes.render();
      }, function (error) {
        console.error('[Colecoes] Falha ao sincronizar grupos:', error);
      }));

      return true;
    }).catch(function (error) {
      console.error('[Colecoes] Firebase indisponivel:', error);
      return false;
    });

    return firebaseSyncPromise;
  }

  function stopFirebaseSync() {
    firebaseUnsubscribers.splice(0).forEach(function (unsubscribe) {
      if (typeof unsubscribe === 'function') unsubscribe();
    });
    if (typeof firebaseLayoutsUnsubscribe === 'function') firebaseLayoutsUnsubscribe();
    firebaseLayoutsUnsubscribe = null;
    firebaseCollectionSignature = '';
    firebaseSyncPromise = null;
  }

  function bindDataMode() {
    if (dataModeUnsubscribe || !window.SenkoDataMode) return;
    dataModeUnsubscribe = window.SenkoDataMode.onChange(function (dataState) {
      if (typeof ColLib === 'undefined') return;
      if (dataState.mode === 'firebase') {
        startFirebaseSync();
        return;
      }
      stopFirebaseSync();
      if (loadStaticSnapshot()) {
        if (typeof colRefreshGroupSelects === 'function') colRefreshGroupSelects();
        if (window.SenkoColecoes) window.SenkoColecoes.render();
      }
    });
  }

  async function loadFeature() {
    if (loadPromise) return loadPromise;

    loadPromise = (async function () {
      loadStyle('styles/index.css?v=20260816-structure');
      loadStyle('styles/layout-editor.css?v=20260816-structure');

      await Promise.all([
        loadScript('view.js?v=20260613-fast-load'),
        loadScript('controllers/groups.js?v=20260816-structure')
      ]);
      panel.replaceChildren(window.SenkoColecoes.createView());

      await Promise.all([
        loadScript('repositories/firebase-repository.js?v=20260816-structure'),
        loadScript('repositories/static-repository.js?v=20260816-structure'),
        loadScript('core/index.js?v=20260816-structure'),
        loadScript('controllers/index.js?v=20260816-structure'),
        loadScript('controllers/modals.js?v=20260816-structure'),
        loadScript('controllers/layout-editor.js?v=20260816-structure'),
        loadScript('controllers/firebase-controls.js?v=20260816-structure')
      ]);

      /*
       * Colecoes possui exatamente duas fontes: listeners do Firebase para o
       * modo editavel e o snapshot gerado para o modo publico de leitura.
       */
      var staticLoaded = loadStaticSnapshot();

      if (!window.SenkoColecoes || typeof window.SenkoColecoes.init !== 'function') {
        throw new Error('Inicializador de Colecoes indisponivel');
      }

      window.SenkoColecoes.init();
      if (window.SenkoColecoesModals) window.SenkoColecoesModals.init();
      if (window.SenkoColecoesFirebaseControls) window.SenkoColecoesFirebaseControls.refresh();
      bindDataMode();
      if (window.SenkoDataMode && window.SenkoDataMode.isFirebase()) startFirebaseSync();
      else if (!staticLoaded) {
        console.warn('[Colecoes] Nenhuma fonte de dados disponivel.');
      }
      return panel;
    })().catch(function (error) {
      console.error(error);
      panel.innerHTML =
        '<div class="senko-feature-error">Nao foi possivel carregar Colecoes.</div>';
      return panel;
    });

    return loadPromise;
  }

  function mountColecoes() {
    if (panel) return panel;

    panel = document.createElement('section');
    panel.id = 'colecoesFeature';
    panel.className = 'senko-dom-feature senko-dom-feature--colecoes';
    panel.style.display = 'none';
    panel.innerHTML = '<div class="senko-feature-loading">Carregando Colecoes...</div>';
    window.SenkoShell.getFeatureRoot().appendChild(panel);
    loadFeature();
    return panel;
  }

  function prepareColecoesCreation() {
    if (window.SenkoDataMode && window.SenkoDataMode.isReadOnly()) {
      return Promise.reject(new Error(
        'O backup publico e somente leitura. Entre com uma conta autorizada para criar.'
      ));
    }
    /*
     * A feature é ativada antes de expor seu contexto público. Assim, seus
     * modais nunca ficam presos em um painel suspenso de outra aba.
     */
    if (!window.SenkoShell.switchFeature('colecoes')) {
      return Promise.reject(new Error('Coleções não está registrada no Senko.'));
    }

    return loadFeature().then(function () {
      var api = window.SenkoColecoes;
      var ready = api &&
        typeof api.isReady === 'function' &&
        api.isReady() &&
        typeof api.openCreateCollection === 'function' &&
        typeof api.listCollectionsForCreation === 'function' &&
        typeof api.openCreateLayoutForCollection === 'function';

      if (!ready) {
        throw new Error('Coleções ainda não terminou de carregar.');
      }
      return api;
    });
  }

  function getCollectionPickerTargets(api) {
    /*
     * Coleções traduz seus próprios campos para o formato neutro do picker.
     * O shell não precisa saber o que são slug, grupo ou layoutCount.
     */
    return api.listCollectionsForCreation().map(function (collection) {
      var count = Number(collection.layoutCount || 0);
      var group = collection.group ? ' · ' + collection.group : '';
      return {
        id: collection.slug,
        title: collection.name || collection.slug,
        meta: collection.slug + group + ' · ' + count + ' layout' + (count === 1 ? '' : 's'),
        tags: collection.tags || []
      };
    });
  }

  window.SenkoShell.registerFeature({
    id: 'colecoes',
    label: 'Coleções',
    order: 20,
    mount: mountColecoes,
    activate: function () {
      loadFeature().then(function () {
        if (window.SenkoColecoes) window.SenkoColecoes.render();
      });
    }
  });

  /*
   * Provider oficial de Coleções. A criação rápida apenas apresenta estas
   * ações; criação, carregamento e persistência continuam dentro da feature.
   */
  window.SenkoShell.registerCreateProvider('colecoes', {
    label: 'Coleções',
    order: 20,
    icon: 'collection',
    prepare: prepareColecoesCreation,
    actions: [
      {
        id: 'collection',
        label: 'Coleção',
        icon: 'collection',
        loadingTitle: 'Carregando Coleções',
        loadingMessage: 'Preparando o editor de coleção...',
        run: function (api) {
          return api.openCreateCollection();
        }
      },
      {
        id: 'collection-layout',
        label: 'Layout',
        icon: 'layout',
        picker: {
          kicker: 'Coleções',
          title: 'Escolha a coleção base',
          searchLabel: 'Buscar coleção',
          searchPlaceholder: 'Digite nome, slug, grupo ou tag',
          confirmLabel: 'Criar layout',
          emptyMessage: 'Nenhuma coleção encontrada.',
          loadingTitle: 'Carregando coleções',
          loadingMessage: 'Preparando a lista de coleções...',
          list: getCollectionPickerTargets,
          run: function (api, collectionSlug) {
            return api.openCreateLayoutForCollection(collectionSlug);
          }
        }
      }
    ]
  });
})();
