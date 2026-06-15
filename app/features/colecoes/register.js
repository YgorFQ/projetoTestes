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
  var githubLoadPromise;
  var collectionFilesBySlug = {};
  var collectionLoadPromises = {};

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

  function loadManifest() {
    /*
     * Colecoes possui seu proprio catalogo de arquivos. Criar ou excluir uma
     * colecao pelo GitHub modifica somente este manifesto da feature. Como o
     * catalogo e um script, ele tambem pode ser carregado via file://.
     */
    return loadScript('data/manifest.js?v=20260614-local-file').then(function () {
      var manifest = window.SenkoColecoesManifest;
      if (!manifest || !Array.isArray(manifest.collections)) {
        throw new Error('Manifesto de Colecoes indisponivel');
      }
      return manifest;
    });
  }

  function registerCollectionCatalog(manifest) {
    var entries = Array.isArray(manifest.collections) ? manifest.collections : [];
    var legacyFiles = [];

    entries.forEach(function (entry) {
      /*
       * Manifestos antigos continham apenas nomes de arquivo. Eles continuam
       * funcionando e sao carregados em paralelo; entradas novas trazem os
       * metadados necessarios para desenhar o card sem baixar HTML/CSS.
       */
      if (typeof entry === 'string') {
        legacyFiles.push(entry);
        return;
      }
      if (!entry || !entry.file || !entry.slug) return;

      var slug = entry.slug.toLowerCase();
      collectionFilesBySlug[slug] = entry.file;
      ColLib.register({
        slug: slug,
        name: entry.name || slug,
        group: entry.group || '',
        tags: Array.isArray(entry.tags) ? entry.tags : [],
        layouts: [],
        layoutCount: Number(entry.layoutCount) || 0,
        _senkoLazy: true
      });
    });

    return legacyFiles;
  }

  function ensureCollectionLoaded(slug) {
    var normalizedSlug = String(slug || '').toLowerCase();
    var current = typeof ColLib !== 'undefined'
      ? ColLib.getBySlug(normalizedSlug)
      : null;

    if (!current) {
      return Promise.reject(new Error('Colecao nao encontrada: ' + normalizedSlug));
    }
    if (!current._senkoLazy) return Promise.resolve(current);
    if (collectionLoadPromises[normalizedSlug]) {
      return collectionLoadPromises[normalizedSlug];
    }

    var file = collectionFilesBySlug[normalizedSlug];
    if (!file) {
      return Promise.reject(new Error('Arquivo da colecao nao catalogado: ' + normalizedSlug));
    }

    collectionLoadPromises[normalizedSlug] = loadScript('data/' + file).then(function () {
      var loaded = ColLib.getBySlug(normalizedSlug);
      if (!loaded) throw new Error('Colecao nao foi registrada: ' + normalizedSlug);
      loaded.layoutCount = (loaded.layouts || []).length;
      loaded._senkoLazy = false;
      return loaded;
    }).catch(function (error) {
      delete collectionLoadPromises[normalizedSlug];
      throw error;
    });

    return collectionLoadPromises[normalizedSlug];
  }

  function prefetchCollectionData() {
    /*
     * Depois que os cards aparecem, o navegador pode baixar os arquivos em
     * baixa prioridade. Eles continuam sem executar ate o usuario abrir uma
     * colecao, mas o clique normalmente encontra o recurso no cache.
     */
    if (window.location.protocol === 'file:') return;

    var run = function () {
      Object.keys(collectionFilesBySlug).forEach(function (slug) {
        var href = featureUrl('data/' + collectionFilesBySlug[slug]);
        if (document.querySelector('link[data-senko-collection-prefetch="' + href + '"]')) {
          return;
        }

        var link = document.createElement('link');
        link.rel = 'prefetch';
        link.as = 'script';
        link.href = href;
        link.dataset.senkoCollectionPrefetch = href;
        document.head.appendChild(link);
      });
    };

    window.setTimeout(function () {
      if ('requestIdleCallback' in window) {
        window.requestIdleCallback(run, { timeout: 1500 });
      } else {
        run();
      }
    }, 400);
  }

  window.SenkoColecoesData = {
    ensureLoaded: ensureCollectionLoaded
  };

  function loadGithubIntegration() {
    if (githubLoadPromise) return githubLoadPromise;

    githubLoadPromise = new Promise(function (resolve) {
      var run = function () {
        loadScript('integrations/github/colecoes-github.js?v=20260613-fast-load')
          .then(function () {
            if (window.SenkoColecoesGithub) window.SenkoColecoesGithub.init();
            resolve();
          })
          .catch(function (error) {
            console.error('[Colecoes] Falha ao carregar integracao GitHub:', error);
            resolve();
          });
      };

      if ('requestIdleCallback' in window) {
        window.requestIdleCallback(run, { timeout: 500 });
      } else {
        window.setTimeout(run, 0);
      }
    });

    return githubLoadPromise;
  }

  async function loadFeature() {
    if (loadPromise) return loadPromise;

    loadPromise = (async function () {
      loadStyle('styles/col-styles.css?v=20260613-lazy-data');

      var firstResources = await Promise.all([
        loadScript('view.js?v=20260613-fast-load'),
        loadScript('scripts/col-groups.js?v=20260613-fast-load'),
        loadManifest()
      ]);
      var manifest = firstResources[2];
      panel.replaceChildren(window.SenkoColecoes.createView());

      await Promise.all([
        loadScript('data/col-groups-data.js?v=20260613-fast-load'),
        loadScript('scripts/col-core.js?v=20260613-fast-load'),
        loadScript('scripts/col-script.js?v=20260613-fast-load-2'),
        loadScript('scripts/col-modals.js?v=20260613-fast-load-2')
      ]);

      var legacyFiles = registerCollectionCatalog(manifest);
      await Promise.all(legacyFiles.map(function (file) {
        return loadScript('data/' + file);
      }));

      if (!window.SenkoColecoes || typeof window.SenkoColecoes.init !== 'function') {
        throw new Error('Inicializador de Colecoes indisponivel');
      }

      window.SenkoColecoes.init();
      if (window.SenkoColecoesModals) window.SenkoColecoesModals.init();
      loadGithubIntegration();
      prefetchCollectionData();
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
})();
