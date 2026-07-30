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
  var secondaryLoadPromise;

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

  function loadManifest() {
    /*
     * O manifesto pertence a Biblioteca e e a unica lista de pacotes de
     * dados carregados por ela. Ele e um script local para funcionar tambem
     * via file://, onde o navegador bloqueia fetch de arquivos JSON.
     */
    return loadScript('data/manifest.js?v=20260614-local-file').then(function () {
      var manifest = window.SenkoBibliotecaManifest;
      if (!manifest || !Array.isArray(manifest.layouts)) {
        throw new Error('Manifesto da Biblioteca indisponivel');
      }
      return manifest;
    });
  }

  function getManifestFile(entry) {
    if (typeof entry === 'string') return entry;
    if (entry && typeof entry.file === 'string') return entry.file;
    return '';
  }

  function getManifestFiles(entries) {
    return (Array.isArray(entries) ? entries : [])
      .map(getManifestFile)
      .filter(Boolean);
  }

  function loadSecondaryModules(manifest) {
    if (secondaryLoadPromise) return secondaryLoadPromise;

    /*
     * Variantes e integracoes nao sao necessarias para mostrar o grid. Elas
     * entram depois da primeira renderizacao para nao segurar a abertura da
     * Biblioteca, mas continuam pertencendo e sendo inicializadas aqui.
     */
    secondaryLoadPromise = new Promise(function (resolve) {
      var run = function () {
        var variants = getManifestFiles(manifest.variants);
        var variantLoads = variants.map(function (path) {
          /*
           * Um arquivo de dado ausente nao pode impedir que editores e
           * integracoes sejam carregados. A falha fica identificada no
           * console e as demais variantes continuam disponiveis.
           */
          return loadScript('data/' + path).catch(function (error) {
            console.error('[Biblioteca] Variante ignorada (' + path + '):', error);
            return null;
          });
        });

        var variantsReady = Promise.all(variantLoads).then(function () {
          if (window.SenkoBiblioteca) window.SenkoBiblioteca.render(true);
        });

        /*
         * GitHub carrega em paralelo aos dados opcionais. Assim, criar,
         * editar, salvar e excluir continuam acessiveis mesmo quando uma
         * variante catalogada estiver temporariamente indisponivel.
         */
        var githubReady = loadScript('integrations/github/senko-github-v2.js?v=20260730-local-controls').then(function () {
          if (window.SenkoBibliotecaGithubV2) {
            window.SenkoBibliotecaGithubV2.init();
          }

          return Promise.all([
            loadScript('integrations/github/senko-github-variants.js?v=20260730-local-controls'),
            loadScript('integrations/github/senko-github-delete.js?v=20260730-local-controls')
          ]);
        }).then(function () {
          if (window.SenkoBibliotecaGithubVariants) {
            window.SenkoBibliotecaGithubVariants.init();
          }
          if (window.SenkoBibliotecaGithubDelete) {
            window.SenkoBibliotecaGithubDelete.init();
          }
        });

        Promise.all([variantsReady, githubReady]).then(function () {
          resolve();
        }).catch(function (error) {
          /*
           * Uma falha em ferramenta secundaria nao derruba layouts, busca ou
           * copia. O erro permanece visivel no console para diagnostico.
           */
          console.error('[Biblioteca] Falha ao carregar ferramentas secundarias:', error);
          resolve();
        });
      };

      window.setTimeout(run, 0);
    });

    return secondaryLoadPromise;
  }

  async function loadFeature() {
    if (loadPromise) return loadPromise;

    loadPromise = (async function () {
      loadStyle('styles/biblioteca.css?v=20260613-library-scroll');
      loadStyle('styles/layout-editor.css?v=20260613-official-editor');
      loadStyle('styles/copy-base-editor.css?v=20260723-official-editor');

      var initialResources = await Promise.all([
        loadScript('view.js?v=20260613-fast-load'),
        loadScript('scripts/senkolib-core.js?v=20260613-fast-load'),
        loadManifest()
      ]);
      var manifest = initialResources[2];
      var content = window.SenkoBiblioteca.createView();
      panel.replaceChildren(content);

      var layouts = getManifestFiles(manifest.layouts);
      await Promise.all([
        Promise.all(layouts.map(function (path) {
          return loadScript('data/' + path).catch(function (error) {
            console.error('[Biblioteca] Layout nao carregado:', path, error);
            return false;
          });
        })),
        loadScript('scripts/layout-editor.js?v=20260613-official-editor'),
        loadScript('scripts/copy-base-editor.js?v=20260723-official-editor'),
        loadScript('scripts/script.js?v=20260613-eager-previews'),
        loadScript('scripts/copy-base-template.js?v=20260723-copy-base-editor').then(function () {
          return loadScript('scripts/copy-base.js?v=20260723-copy-base-editor');
        })
      ]);

      if (!window.SenkoBiblioteca || typeof window.SenkoBiblioteca.init !== 'function') {
        throw new Error('Inicializador da Biblioteca indisponivel');
      }

      window.SenkoBiblioteca.init();
      if (window.SenkoBibliotecaCopyBase) window.SenkoBibliotecaCopyBase.init();
      if (window.SenkoBibliotecaCopyBaseEditor) {
        window.SenkoBibliotecaCopyBaseEditor.init();
      }
      loadSecondaryModules(manifest);

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
