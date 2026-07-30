(function () {
  /*
   * SenkoShell e o nucleo neutro do aplicativo.
   *
   * REGRA DE MANUTENCAO DO GUIA:
   * - Toda alteracao relevante no projeto deve atualizar o guia interno em
   *   app/shell/scripts/senko-guide.js.
   * - Se uma IA ou outra pessoa mexer no shell, em features, GitHub, estilos,
   *   dados ou erros conhecidos, ela tambem precisa revisar o guia.
   * - O guia e prioridade maxima: codigo atualizado com guia desatualizado
   *   ainda e trabalho incompleto.
   *
   * REGRAS DE ARQUITETURA:
   * - O shell nao conhece Biblioteca, Colecoes, Imagens ou qualquer feature.
   * - Cada feature se registra chamando SenkoShell.registerFeature().
   * - Se uma feature for removida, a unica consequencia aceitavel e a aba
   *   dela desaparecer. O shell escolhe a primeira feature disponivel.
   * - O topo pode ter controles realmente globais, como tema, GitHub e
   *   criacao rapida, desde que usem contratos registrados pelas features.
   * - Busca, formulários e regras de criação ficam dentro da própria feature.
   */
  var features = [];
  var githubProviders = {};
  var createProviders = {};
  var isReady = false;
  var activeFeatureId = null;
  var storageKey = 'senkolib_active_tab';

  function readSavedFeature() {
    try {
      return localStorage.getItem(storageKey);
    } catch (error) {
      return null;
    }
  }

  function saveFeature(id) {
    try {
      localStorage.setItem(storageKey, id);
    } catch (error) {}
  }

  function findFeature(id) {
    return features.find(function (feature) { return feature.id === id; });
  }

  function orderedFeatures() {
    return features.slice().sort(function (left, right) { return left.order - right.order; });
  }

  function getFeatureRoot() {
    return document.getElementById('senkoFeatureRoot') || document.body;
  }

  function getExistingPanel(feature) {
    if (feature.panel && feature.panel.isConnected) return feature.panel;

    if (feature.panelId) {
      feature.panel = document.getElementById(feature.panelId);
    }

    if (feature.panel) {
      feature.panel.dataset.senkoFeaturePanel = feature.id;
    }

    return feature.panel;
  }

  function ensurePanel(feature) {
    var existingPanel = getExistingPanel(feature);
    if (existingPanel) return existingPanel;

    if (feature.mount) {
      feature.panel = feature.mount();
    }

    if (feature.panel) {
      feature.panel.dataset.senkoFeaturePanel = feature.id;
    }

    return feature.panel;
  }

  function setPanelVisibility(feature, isVisible) {
    /*
     * Features montadas por callback podem criar telas pesadas. Para manter o
     * app rapido, painel escondido nao nasce aqui: ele so e criado quando a
     * feature fica ativa. Painel ja existente ainda e ocultado.
     */
    var panel = isVisible ? ensurePanel(feature) : getExistingPanel(feature);
    if (!panel) return;

    if (isVisible && typeof feature.show === 'function') {
      feature.show(panel);
    } else if (!isVisible && typeof feature.hide === 'function') {
      feature.hide(panel);
    } else {
      panel.style.display = isVisible ? '' : 'none';
    }

    if (isVisible && typeof feature.activate === 'function') {
      feature.activate(panel);
    }
  }

  function ensureEmptyState() {
    var root = getFeatureRoot();
    var empty = document.getElementById('senkoEmptyState');
    if (empty) return empty;

    empty = document.createElement('section');
    empty.id = 'senkoEmptyState';
    empty.className = 'senko-empty-state';
    empty.innerHTML =
      '<img src="app/shared/assets/senko.png" alt="" />' +
      '<h1>Nenhuma feature carregada</h1>' +
      '<p>Adicione ou restaure pelo menos um register.js de feature para iniciar o SenkoLib.</p>';
    root.appendChild(empty);
    return empty;
  }

  function setEmptyState(isVisible) {
    var empty = ensureEmptyState();
    empty.style.display = isVisible ? '' : 'none';
  }

  function ensureTabBar() {
    var tabBar = document.getElementById('senkoTabBar');
    if (tabBar) return tabBar;

    tabBar = document.createElement('nav');
    tabBar.id = 'senkoTabBar';
    tabBar.className = 'senko-tab-bar';
    tabBar.setAttribute('aria-label', 'Ferramentas do SenkoLib');

    var headerInner = document.querySelector('.header-inner');
    var headerActions = document.querySelector('.header-actions');
    if (headerInner) {
      headerInner.insertBefore(tabBar, headerActions || null);
    } else {
      document.body.insertBefore(tabBar, document.body.firstChild);
    }

    return tabBar;
  }

  function renderTabs() {
    if (!isReady) return;

    var tabBar = ensureTabBar();
    tabBar.innerHTML = '';

    orderedFeatures().forEach(function (feature) {
      var button = document.createElement('button');
      button.type = 'button';
      button.className = 'senko-tab-btn' + (feature.id === activeFeatureId ? ' active' : '');
      button.dataset.senkoFeatureTab = feature.id;
      button.textContent = feature.label;
      button.addEventListener('click', function () {
        switchFeature(feature.id);
      });
      tabBar.appendChild(button);
    });
  }

  function updateTabs() {
    document.querySelectorAll('[data-senko-feature-tab]').forEach(function (button) {
      button.classList.toggle('active', button.dataset.senkoFeatureTab === activeFeatureId);
    });
  }

  function listGithubProviderIds() {
    return Object.keys(githubProviders).filter(function (id) {
      return githubProviders[id] && typeof githubProviders[id].openConfig === 'function';
    });
  }

  function getGithubProviderForActiveFeature() {
    /*
     * O shell nao conhece detalhes de nenhuma feature. Ele so guarda um
     * callback registrado pela propria feature e tenta usar primeiro o
     * provedor da aba ativa; se a aba ativa nao tiver GitHub, usa o primeiro
     * provedor disponivel para manter o botao global consistente.
     */
    if (activeFeatureId && githubProviders[activeFeatureId]) {
      return githubProviders[activeFeatureId];
    }

    var ids = listGithubProviderIds();
    return ids.length ? githubProviders[ids[0]] : null;
  }

  function providerHasCredentials(provider) {
    if (!provider || typeof provider.hasCredentials !== 'function') return false;
    try {
      return Boolean(provider.hasCredentials());
    } catch (error) {
      return false;
    }
  }

  function refreshGithubButton() {
    var button = document.getElementById('senkoGithubConfigBtn');
    if (!button) return;

    var provider = getGithubProviderForActiveFeature();
    if (!provider) {
      button.hidden = true;
      button.classList.remove('gh-config-active');
      button.disabled = true;
      return;
    }

    var configured = providerHasCredentials(provider);
    var label = provider.label || 'GitHub';
    button.hidden = false;
    button.disabled = false;
    button.classList.toggle('gh-config-active', configured);
    button.title = configured
      ? 'GitHub configurado para ' + label
      : 'Configurar GitHub para ' + label;
  }

  function bindGithubButton() {
    var button = document.getElementById('senkoGithubConfigBtn');
    if (!button || button.dataset.senkoShellBound) return;

    button.dataset.senkoShellBound = '1';
    button.addEventListener('click', function () {
      var provider = getGithubProviderForActiveFeature();
      if (!provider || typeof provider.openConfig !== 'function') return;
      provider.openConfig();
    });

    refreshGithubButton();
  }

  function registerGithubProvider(featureId, provider) {
    /*
     * Cada feature entrega somente callbacks pequenos. O shell nao importa
     * arquivos de GitHub e nao chama funcoes internas de Biblioteca/Colecoes.
     */
    if (!featureId || !provider || typeof provider.openConfig !== 'function') return;
    githubProviders[featureId] = provider;
    bindGithubButton();
    refreshGithubButton();
  }

  function isValidCreateAction(action) {
    /*
     * Uma ação pode abrir algo diretamente por `run` ou solicitar uma
     * seleção por `picker`. O shell valida apenas esse contrato estrutural;
     * nomes de campos, dados e modais continuam pertencendo à feature.
     */
    if (!action || !action.id || !action.label) return false;
    if (typeof action.run === 'function') return true;
    return Boolean(
      action.picker &&
      typeof action.picker.list === 'function' &&
      typeof action.picker.run === 'function'
    );
  }

  function registerCreateProvider(featureId, provider) {
    /*
     * Provedores de criação seguem a mesma fronteira dos provedores GitHub:
     * o shell guarda callbacks públicos, mas nunca importa scripts internos
     * nem conhece as regras de Biblioteca, Coleções ou futuras features.
     *
     * Contrato esperado:
     * - label, order e icon descrevem o cartão principal;
     * - prepare() carrega/ativa a feature e devolve seu contexto público;
     * - actions[] contém ações diretas ou ações com picker.
     */
    if (!featureId || !provider || !provider.label ||
        typeof provider.prepare !== 'function' ||
        !Array.isArray(provider.actions)) {
      return false;
    }

    var validActions = provider.actions.filter(isValidCreateAction);
    if (!validActions.length) return false;

    createProviders[featureId] = {
      id: featureId,
      label: provider.label,
      order: Number.isFinite(provider.order) ? provider.order : 100,
      icon: provider.icon || 'layout',
      prepare: provider.prepare,
      actions: validActions
    };
    return true;
  }

  function listCreateProviders() {
    /*
     * A cópia ordenada evita que a ferramenta global dependa da ordem em
     * que os register.js foram baixados pelo navegador.
     */
    return Object.keys(createProviders).map(function (id) {
      return createProviders[id];
    }).sort(function (left, right) {
      return left.order - right.order;
    });
  }

  function getCreateProvider(featureId) {
    return createProviders[featureId] || null;
  }

  function switchFeature(id) {
    var feature = findFeature(id);
    if (!feature) return false;

    activeFeatureId = id;
    saveFeature(id);
    setEmptyState(false);

    features.forEach(function (item) {
      setPanelVisibility(item, item.id === id);
    });

    if (document.body) {
      document.body.dataset.senkoFeature = id;
    }

    updateTabs();
    refreshGithubButton();
    return true;
  }

  function pickInitialFeature() {
    /*
     * O parametro ?feature=id facilita links diretos e testes isolados.
     * Um id inexistente e ignorado sem afetar as demais features.
     */
    try {
      var requestedFeature = new URLSearchParams(window.location.search).get('feature');
      if (requestedFeature && findFeature(requestedFeature)) return requestedFeature;
    } catch (error) {}

    var savedFeature = readSavedFeature();
    if (savedFeature && findFeature(savedFeature)) return savedFeature;
    var first = orderedFeatures()[0];
    return first ? first.id : null;
  }

  function registerFeature(feature) {
    if (!feature || !feature.id || !feature.label || findFeature(feature.id)) return;

    feature.order = Number.isFinite(feature.order) ? feature.order : 100;
    features.push(feature);

    if (!isReady) return;

    renderTabs();

    if (!activeFeatureId) {
      switchFeature(pickInitialFeature());
    } else {
      setPanelVisibility(feature, feature.id === activeFeatureId);
    }
  }

  function bindLogoHome() {
    var logo = document.getElementById('logoHome');
    if (!logo || logo.dataset.senkoShellBound) return;
    logo.dataset.senkoShellBound = '1';
    logo.addEventListener('click', function () {
      var first = orderedFeatures()[0];
      if (first) switchFeature(first.id);
    });
  }

  function initShell() {
    isReady = true;

    renderTabs();
    bindLogoHome();
    bindGithubButton();

    var initialFeature = pickInitialFeature();
    if (!initialFeature || !switchFeature(initialFeature)) {
      activeFeatureId = null;
      setEmptyState(true);
    }
  }

  window.SenkoShell = {
    registerFeature: registerFeature,
    registerGithubProvider: registerGithubProvider,
    registerCreateProvider: registerCreateProvider,
    listCreateProviders: listCreateProviders,
    getCreateProvider: getCreateProvider,
    refreshGithubButton: refreshGithubButton,
    switchFeature: switchFeature,
    getFeatureRoot: getFeatureRoot,
    getActiveFeatureId: function () { return activeFeatureId; }
  };

  document.addEventListener('DOMContentLoaded', initShell);
})();
