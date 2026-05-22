(function () {
  var features = [];
  var isReady = false;
  var activeFeatureId = 'biblioteca';
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

  function getMountPoint() {
    return document.getElementById('dashboard') || document.body;
  }

  function insertAfterMountPoint(node) {
    var mountPoint = getMountPoint();
    var parent = mountPoint.parentNode || document.body;
    parent.insertBefore(node, mountPoint.nextSibling);
  }

  function ensurePanel(feature) {
    if (feature.panel && feature.panel.isConnected) return feature.panel;

    if (feature.mount) {
      feature.panel = feature.mount();
    } else if (feature.panelId) {
      feature.panel = document.getElementById(feature.panelId);
    }

    if (feature.panel) {
      feature.panel.dataset.senkoFeaturePanel = feature.id;
    }

    return feature.panel;
  }

  function setPanelVisibility(feature, isVisible) {
    var panel = ensurePanel(feature);
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

  function ensureTabBar() {
    var tabBar = document.getElementById('senkoTabBar');
    if (tabBar) return tabBar;

    tabBar = document.createElement('nav');
    tabBar.id = 'senkoTabBar';
    tabBar.className = 'senko-tab-bar';
    tabBar.setAttribute('aria-label', 'Ferramentas do SenkoLib');

    var header = document.querySelector('.site-header');
    if (header && header.parentNode) {
      header.parentNode.insertBefore(tabBar, header.nextSibling);
    } else {
      document.body.insertBefore(tabBar, document.body.firstChild);
    }

    return tabBar;
  }

  function renderTabs() {
    if (!isReady) return;

    var tabBar = ensureTabBar();
    tabBar.innerHTML = '';

    features
      .slice()
      .sort(function (left, right) { return left.order - right.order; })
      .forEach(function (feature) {
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

  function switchFeature(id) {
    var feature = findFeature(id);
    if (!feature) return false;

    activeFeatureId = id;
    saveFeature(id);

    features.forEach(function (item) {
      setPanelVisibility(item, item.id === id);
    });

    if (document.body) {
      document.body.dataset.senkoFeature = id;
    }

    updateTabs();
    return true;
  }

  function registerFeature(feature) {
    if (!feature || !feature.id || !feature.label || findFeature(feature.id)) return;

    feature.order = Number.isFinite(feature.order) ? feature.order : 100;
    features.push(feature);

    if (!isReady) return;

    ensurePanel(feature);
    renderTabs();

    var savedFeature = readSavedFeature();
    if (savedFeature === feature.id) {
      switchFeature(feature.id);
    } else {
      setPanelVisibility(feature, feature.id === activeFeatureId);
    }
  }

  function createFramePanel(options) {
    var panel = document.createElement('section');
    panel.id = options.panelId;
    panel.className = 'senko-frame-feature';
    panel.style.display = 'none';

    var iframe = document.createElement('iframe');
    iframe.className = 'senko-feature-frame';
    iframe.src = options.src;
    iframe.title = options.title;
    iframe.loading = 'lazy';

    panel.appendChild(iframe);
    insertAfterMountPoint(panel);
    return panel;
  }

  function registerFrameFeature(options) {
    registerFeature({
      id: options.id,
      label: options.label,
      order: options.order,
      mount: function () {
        return createFramePanel({
          panelId: options.panelId || options.id + 'Dashboard',
          src: options.src,
          title: options.title || options.label
        });
      }
    });
  }

  function initShell() {
    isReady = true;

    features.forEach(function (feature) {
      ensurePanel(feature);
    });

    renderTabs();

    var savedFeature = readSavedFeature();
    if (!switchFeature(savedFeature || 'biblioteca')) {
      switchFeature('biblioteca');
    }
  }

  window.SenkoShell = {
    registerFeature: registerFeature,
    registerFrameFeature: registerFrameFeature,
    switchFeature: switchFeature
  };

  registerFeature({
    id: 'biblioteca',
    label: 'Biblioteca',
    order: 10,
    panelId: 'dashboard'
  });

  document.addEventListener('DOMContentLoaded', initShell);
})();
