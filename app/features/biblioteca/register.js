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

  function loadSecondaryModules(manifest) {
    if (secondaryLoadPromise) return secondaryLoadPromise;

    /*
     * Variantes e integracoes nao sao necessarias para mostrar o grid. Elas
     * entram depois da primeira renderizacao para nao segurar a abertura da
     * Biblioteca, mas continuam pertencendo e sendo inicializadas aqui.
     */
    secondaryLoadPromise = new Promise(function (resolve) {
      var run = function () {
        var variants = Array.isArray(manifest.variants) ? manifest.variants : [];
        var variantLoads = variants.map(function (path) {
          return loadScript('data/' + path);
        });

        Promise.all(variantLoads).then(function () {
          if (window.SenkoBiblioteca) window.SenkoBiblioteca.render(true);

          return Promise.all([
            loadScript('prototypes/layout-editor-prototype.js?v=20260613-fast-load'),
            loadScript('integrations/github/senko-github-v2.js?v=20260614-token-feedback')
          ]);
        }).then(function () {
          if (window.SenkoBibliotecaGithubV2) {
            window.SenkoBibliotecaGithubV2.init();
          }

          return Promise.all([
            loadScript('integrations/github/senko-github-variants.js?v=20260614-token-feedback'),
            loadScript('integrations/github/senko-github-delete.js?v=20260614-token-feedback')
          ]);
        }).then(function () {
          if (window.SenkoBibliotecaGithubVariants) {
            window.SenkoBibliotecaGithubVariants.init();
          }
          if (window.SenkoBibliotecaGithubDelete) {
            window.SenkoBibliotecaGithubDelete.init();
          }
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
      loadStyle('prototypes/layout-editor-prototype.css?v=20260613-feature-module');

      var initialResources = await Promise.all([
        loadScript('view.js?v=20260613-fast-load'),
        loadScript('scripts/senkolib-core.js?v=20260613-fast-load'),
        loadManifest()
      ]);
      var manifest = initialResources[2];
      var content = window.SenkoBiblioteca.createView();
      panel.replaceChildren(content);

      var layouts = Array.isArray(manifest.layouts) ? manifest.layouts : [];
      await Promise.all([
        Promise.all(layouts.map(function (path) {
          return loadScript('data/' + path);
        })),
        loadScript('scripts/script.js?v=20260613-eager-previews'),
        loadScript('scripts/copy-base.js?v=20260613-fast-load-2')
      ]);

      if (!window.SenkoBiblioteca || typeof window.SenkoBiblioteca.init !== 'function') {
        throw new Error('Inicializador da Biblioteca indisponivel');
      }

      window.SenkoBiblioteca.init();
      if (window.SenkoBibliotecaCopyBase) window.SenkoBibliotecaCopyBase.init();
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
})();
