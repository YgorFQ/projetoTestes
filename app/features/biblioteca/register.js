(function () {
  /*
   * Porta de entrada da Biblioteca.
   *
   * RESPONSABILIDADES:
   * - Registrar a aba no SenkoShell.
   * - Montar a view somente quando a feature for aberta.
   * - Carregar CSS, motor, dados, UI e integracoes na ordem correta.
   *
   * Nenhuma outra feature deve importar este arquivo ou usar suas funcoes.
   */
  if (!window.SenkoShell) return;

  var currentScript = document.currentScript;
  var featureBaseUrl = currentScript && currentScript.src
    ? new URL('./', currentScript.src).href
    : new URL('app/features/biblioteca/', document.baseURI).href;
  var panel;
  var loadPromise;
  var firebaseSyncPromise;
  var firebaseUnsubscribers = [];
  var firebaseVariantUnsubscribe;
  var firebaseVariantLayoutSignature = '';
  var dataModeUnsubscribe;

  function usesFirebaseData() {
    return Boolean(
      window.SenkoFirebase &&
      window.SenkoFirebase.isEnabled &&
      window.SenkoFirebase.isEnabled()
    );
  }

  function loadStaticSnapshot() {
    var repository = window.SenkoBibliotecaStatic;
    if (!repository || !repository.isAvailable() || !window.SenkoLib) return false;
    SenkoLib.replaceLayouts(repository.getLayouts());
    SenkoLib.replaceVariants(repository.getVariants());
    return true;
  }

  function loadStaticCopyBase() {
    var repository = window.SenkoBibliotecaStatic;
    var copyApi = window.SenkoBibliotecaCopyBase;
    if (!repository || !copyApi) return false;

    var template = repository.getCopyBase();
    if (template) return copyApi.setTemplate(template, 'static');
    copyApi.resetToDefault();
    return false;
  }

  function featureUrl(path) {
    var absoluteUrl = new URL(path, featureBaseUrl).href;
    return window.SenkoFreshAssets
      ? window.SenkoFreshAssets.url(absoluteUrl)
      : absoluteUrl;
  }

  function loadStyle(path) {
    var absoluteHref = featureUrl(path);
    var existing = document.querySelector('link[data-senko-biblioteca-style="' + absoluteHref + '"]');
    if (existing) return;

    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = absoluteHref;
    link.dataset.senkoBibliotecaStyle = absoluteHref;
    document.head.appendChild(link);
  }

  function loadScript(path) {
    return new Promise(function (resolve, reject) {
      var absoluteSrc = featureUrl(path);
      var existing = document.querySelector('script[data-senko-biblioteca-src="' + absoluteSrc + '"]');
      if (existing && existing.dataset.loaded === '1') {
        resolve();
        return;
      }

      var script = existing || document.createElement('script');
      script.src = absoluteSrc;
      script.dataset.senkoBibliotecaSrc = absoluteSrc;
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

  async function loadStaticAssets() {
    try {
      await loadScript('../../../backup/latest/biblioteca/manifest.js');
      await loadScript('../../../backup/latest/biblioteca/data.js');
      return true;
    } catch (error) {
      console.warn('[Biblioteca] Snapshot proprio indisponivel:', error.message || error);
      return false;
    }
  }

  function notifyStaleEditor(kind, documents) {
    if (!window.SenkoLayoutEditor || !window.SenkoLayoutEditor.isOpen()) return;
    var current = window.SenkoLayoutEditor.getCurrentData();
    if (!current || current.mode !== kind) return;

    var currentItem = kind === 'variant' ? current.variant : current.layout;
    var resourceId = kind === 'variant'
      ? currentItem && currentItem.id
      : current.id;
    var remote = documents.find(function (item) {
      return item.id === resourceId &&
        (kind !== 'variant' || item.layoutId === current.id);
    });

    if (!remote || !currentItem || !currentItem._firebaseRevisionId) return;
    if (remote._firebaseRevisionId === currentItem._firebaseRevisionId) return;

    if (window.SenkoLayoutEditor.applyRemoteChange) {
      window.SenkoLayoutEditor.applyRemoteChange(remote);
    } else if (window.SenkoLayoutEditor.notifyRemoteChange) {
      window.SenkoLayoutEditor.notifyRemoteChange(
        'Outra pessoa salvou uma versao mais recente. Seu rascunho foi preservado.'
      );
    }
  }

  function startFirebaseSync() {
    if (firebaseSyncPromise || !usesFirebaseData() || !window.SenkoFirebase.isReady()) {
      return firebaseSyncPromise;
    }

    firebaseSyncPromise = Promise.resolve().then(function () {
      var repository = window.SenkoBibliotecaFirebase;
      if (!repository || !window.SenkoLib) {
        throw new Error('Repositorio Firebase da Biblioteca indisponivel.');
      }

      function syncVariantListeners(layouts) {
        var layoutIds = layouts.map(function (layout) {
          return layout.id;
        }).filter(Boolean).sort();
        var signature = layoutIds.join('|');
        if (signature === firebaseVariantLayoutSignature) return;

        firebaseVariantLayoutSignature = signature;
        if (typeof firebaseVariantUnsubscribe === 'function') {
          firebaseVariantUnsubscribe();
        }
        firebaseVariantUnsubscribe = repository.watchVariantsForLayouts(
          layoutIds,
          function (variants) {
            notifyStaleEditor('variant', variants);
            SenkoLib.replaceVariants(variants);
            if (window.SenkoBiblioteca) window.SenkoBiblioteca.render(true);
          },
          function (error) {
            console.error('[Biblioteca] Falha ao sincronizar variantes:', error);
          }
        );
      }

      firebaseUnsubscribers.push(repository.watchLayouts(function (layouts) {
        notifyStaleEditor('layout', layouts);
        SenkoLib.replaceLayouts(layouts);
        syncVariantListeners(layouts);
        if (window.SenkoBiblioteca) window.SenkoBiblioteca.render(true);
      }, function (error) {
        console.error('[Biblioteca] Falha ao sincronizar layouts:', error);
      }));

      firebaseUnsubscribers.push(repository.watchCopyBase(function (template) {
        var copyApi = window.SenkoBibliotecaCopyBase;
        if (!copyApi) return;
        if (template) copyApi.setTemplate(template, 'firebase');
        else copyApi.resetToDefault();
      }, function (error) {
        console.error('[Biblioteca] Falha ao sincronizar HTML basico:', error);
      }));

      return true;
    }).catch(function (error) {
      console.error('[Biblioteca] Firebase indisponivel:', error);
      return false;
    });

    return firebaseSyncPromise;
  }

  function stopFirebaseSync() {
    firebaseUnsubscribers.splice(0).forEach(function (unsubscribe) {
      if (typeof unsubscribe === 'function') unsubscribe();
    });
    if (typeof firebaseVariantUnsubscribe === 'function') firebaseVariantUnsubscribe();
    firebaseVariantUnsubscribe = null;
    firebaseVariantLayoutSignature = '';
    firebaseSyncPromise = null;
  }

  function bindDataMode() {
    if (dataModeUnsubscribe || !window.SenkoDataMode) return;
    dataModeUnsubscribe = window.SenkoDataMode.onChange(function (dataState) {
      if (!window.SenkoLib) return;
      if (dataState.mode === 'firebase') {
        startFirebaseSync();
        return;
      }
      stopFirebaseSync();
      if (loadStaticSnapshot() && window.SenkoBiblioteca) {
        window.SenkoBiblioteca.render(true);
      }
      loadStaticCopyBase();
    });
  }

  async function loadFeature() {
    if (loadPromise) return loadPromise;

    loadPromise = (async function () {
      loadStyle('styles/index.css?v=20260816-structure');
      loadStyle('styles/layout-editor.css?v=20260801-presence');
      loadStyle('styles/copy-base-editor.css?v=20260826-copy-base-firebase');

      await loadStaticAssets();

      await Promise.all([
        loadScript('view.js?v=20260613-fast-load'),
        loadScript('core/index.js?v=20260816-structure'),
        loadScript('repositories/firebase-repository.js?v=20260816-structure'),
        loadScript('repositories/static-repository.js?v=20260816-structure')
      ]);
      var content = window.SenkoBiblioteca.createView();
      panel.replaceChildren(content);

      /*
       * O snapshot e aplicado antes dos controladores para a primeira pintura
       * ja conter dados quando o Firebase estiver indisponivel. Se nao houver
       * snapshot, o core permanece vazio ate os listeners entregarem a fonte
       * principal. Nao existe uma terceira fonte oculta de dados.
       */
      var staticLoaded = loadStaticSnapshot();
      await Promise.all([
        loadScript('controllers/layout-editor.js?v=20260816-structure'),
        loadScript('controllers/index.js?v=20260816-structure'),
        loadScript('controllers/copy-base-template.js?v=20260816-structure').then(function () {
          return loadScript('controllers/copy-base.js?v=20260826-copy-base-firebase').then(function () {
            return loadScript('controllers/copy-base-editor.js?v=20260826-copy-base-firebase');
          });
        })
      ]);

      if (!window.SenkoBiblioteca || typeof window.SenkoBiblioteca.init !== 'function') {
        throw new Error('Inicializador da Biblioteca indisponivel');
      }

      window.SenkoBiblioteca.init();
      if (window.SenkoBibliotecaCopyBase) window.SenkoBibliotecaCopyBase.init();
      if (window.SenkoBibliotecaCopyBaseEditor) window.SenkoBibliotecaCopyBaseEditor.init();
      loadStaticCopyBase();
      bindDataMode();
      if (window.SenkoDataMode && window.SenkoDataMode.isFirebase()) startFirebaseSync();

      /*
       * Ausencia simultanea de Firebase e snapshot e um estado valido, mas
       * visivel: a Biblioteca abre vazia em vez de buscar arquivos antigos.
       */
      if (!usesFirebaseData() && !staticLoaded) {
        console.warn('[Biblioteca] Nenhuma fonte de dados disponivel.');
      }

      return panel;
    })().catch(function (error) {
      console.error(error);
      if (!panel) {
        panel = document.createElement('section');
        panel.id = 'bibliotecaFeature';
        window.SenkoShell.getFeatureRoot().appendChild(panel);
      }
      panel.innerHTML =
        '<div class="senko-feature-error">Nao foi possivel carregar a Biblioteca.</div>';
      return panel;
    });

    return loadPromise;
  }

  function mountBiblioteca() {
    if (panel) return panel;

    panel = document.createElement('section');
    panel.id = 'bibliotecaFeature';
    panel.className = 'senko-dom-feature senko-dom-feature--biblioteca';
    panel.style.display = 'none';
    panel.innerHTML = '<div class="senko-feature-loading">Carregando Biblioteca...</div>';
    window.SenkoShell.getFeatureRoot().appendChild(panel);
    loadFeature();
    return panel;
  }

  function prepareBibliotecaCreation() {
    if (window.SenkoDataMode && window.SenkoDataMode.isReadOnly()) {
      return Promise.reject(new Error(
        'O backup publico e somente leitura. Entre com uma conta autorizada para criar.'
      ));
    }
    /*
     * A criação rápida pode ser aberta a partir de qualquer aba. Antes de
     * entregar a API pública, a Biblioteca se torna ativa e conclui seu
     * carregamento sob demanda. Nenhum polling é necessário porque o próprio
     * register.js é o dono da Promise de inicialização.
     */
    if (!window.SenkoShell.switchFeature('biblioteca')) {
      return Promise.reject(new Error('A Biblioteca não está registrada no Senko.'));
    }

    return loadFeature().then(function () {
      var api = window.SenkoBiblioteca;
      var ready = api &&
        typeof api.isReady === 'function' &&
        api.isReady() &&
        typeof api.openCreateLayout === 'function' &&
        typeof api.listLayoutsForCreation === 'function' &&
        typeof api.openCreateVariantForLayout === 'function';

      if (!ready) {
        throw new Error('A Biblioteca ainda não terminou de carregar.');
      }
      return api;
    });
  }

  function getVariantPickerTargets(api) {
    /*
     * O picker global recebe um formato neutro. A conversão fica aqui para
     * que o shell não precise conhecer id, tags ou contagem de variantes.
     */
    return api.listLayoutsForCreation().map(function (layout) {
      var count = Number(layout.variantCount || 0);
      return {
        id: layout.id,
        title: layout.name || layout.id,
        meta: layout.id + ' · ' + count + (count === 1 ? ' variação' : ' variações'),
        tags: layout.tags || []
      };
    });
  }

  window.SenkoShell.registerFeature({
    id: 'biblioteca',
    label: 'Biblioteca',
    order: 10,
    mount: mountBiblioteca,
    activate: function () {
      loadFeature().then(function (loadedPanel) {
        if (window.SenkoBiblioteca) window.SenkoBiblioteca.render();
      });
    }
  });

  /*
   * Provider oficial da criação rápida.
   *
   * A ferramenta global conhece apenas os dados abaixo. Os callbacks ainda
   * executam dentro da Biblioteca, preservando validação, modal e estado.
   */
  window.SenkoShell.registerCreateProvider('biblioteca', {
    label: 'Biblioteca',
    order: 10,
    icon: 'library',
    prepare: prepareBibliotecaCreation,
    actions: [
      {
        id: 'layout',
        label: 'Layout',
        icon: 'layout',
        loadingTitle: 'Carregando Biblioteca',
        loadingMessage: 'Preparando o editor de layout...',
        run: function (api) {
          return api.openCreateLayout();
        }
      },
      {
        id: 'variant',
        label: 'Variação',
        icon: 'variant',
        picker: {
          kicker: 'Variação',
          title: 'Escolha o layout base',
          searchLabel: 'Buscar layout',
          searchPlaceholder: 'Digite nome, id ou tag',
          confirmLabel: 'Criar variação',
          emptyMessage: 'Nenhum layout encontrado.',
          loadingTitle: 'Carregando layouts',
          loadingMessage: 'Preparando a Biblioteca...',
          list: getVariantPickerTargets,
          run: function (api, layoutId) {
            return api.openCreateVariantForLayout(layoutId);
          }
        }
      }
    ]
  });
})();
