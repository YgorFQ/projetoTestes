(function () {
  var listeners = [];
  var mode = 'unavailable';

  function hasStaticSnapshot() {
    var backup = window.SenkoStaticBackup || {};
    return Boolean(
      backup.manifest &&
      backup.biblioteca && Array.isArray(backup.biblioteca.layouts) &&
      backup.colecoes && Array.isArray(backup.colecoes.collections)
    );
  }

  function calculateMode(firebaseState) {
    if (firebaseState && firebaseState.status === 'ready') return 'firebase';
    if (hasStaticSnapshot()) return 'static';
    return 'unavailable';
  }

  function snapshot() {
    return {
      mode: mode,
      readOnly: mode !== 'firebase',
      hasStaticSnapshot: hasStaticSnapshot(),
      manifest: (window.SenkoStaticBackup || {}).manifest || null
    };
  }

  function publish(firebaseState) {
    var nextMode = calculateMode(firebaseState);
    var changed = nextMode !== mode;
    mode = nextMode;
    document.documentElement.classList.toggle('senko-readonly', mode !== 'firebase');
    document.documentElement.dataset.senkoDataMode = mode;

    if (!changed) return;
    var current = snapshot();
    listeners.slice().forEach(function (listener) {
      try { listener(current); } catch (error) {
        console.error('[SenkoDataMode] Falha em listener:', error);
      }
    });
    window.dispatchEvent(new CustomEvent('senko:data-mode', { detail: current }));
  }

  function onChange(listener) {
    if (typeof listener !== 'function') return function () {};
    listeners.push(listener);
    listener(snapshot());
    return function () {
      var index = listeners.indexOf(listener);
      if (index !== -1) listeners.splice(index, 1);
    };
  }

  function assertWritable() {
    if (mode !== 'firebase') {
      throw new Error('O backup publico e somente leitura. Entre com uma conta autorizada para editar.');
    }
  }

  window.SenkoDataMode = {
    getState: snapshot,
    getMode: function () { return mode; },
    getManifest: function () { return snapshot().manifest; },
    hasStaticSnapshot: hasStaticSnapshot,
    isReadOnly: function () { return mode !== 'firebase'; },
    isFirebase: function () { return mode === 'firebase'; },
    assertWritable: assertWritable,
    onChange: onChange,
    refresh: function () {
      var firebaseState = window.SenkoFirebase && window.SenkoFirebase.getState
        ? window.SenkoFirebase.getState()
        : null;
      publish(firebaseState);
    }
  };

  if (window.SenkoFirebase && window.SenkoFirebase.onStateChange) {
    window.SenkoFirebase.onStateChange(publish);
  } else {
    publish(null);
  }
})();
