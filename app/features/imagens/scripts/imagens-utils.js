(function () {
  /*
   * Utilitarios locais da feature Imagens.
   *
   * Nada aqui e compartilhado com Sources: se outra feature precisar de algo,
   * ela deve ter seu proprio helper ou usar somente os estilos/tokens oficiais
   * de app/shared/styles/.
   */
  var api = window.SenkoImagens = window.SenkoImagens || {};
  var currentScript = document.currentScript;
  var featureBaseUrl = currentScript && currentScript.src
    ? new URL('../', currentScript.src).href
    : new URL('app/features/imagens/', document.baseURI).href;

  api.setRoot = function setRoot(root) {
    /*
     * A janela de Imagens e renderizada dentro do index principal, mas suas
     * buscas de DOM ficam presas nesta raiz. Assim IDs como "status-text" nao
     * brigam com Sources, Biblioteca ou Colecoes.
     */
    api.root = root || document;
  };

  api.getRoot = function getRoot() {
    return api.root || document;
  };

  api.$ = function getById(id) {
    return api.getRoot().getElementById(id);
  };

  api.query = function query(selector) {
    return api.getRoot().querySelector(selector);
  };

  api.queryAll = function queryAll(selector) {
    return Array.from(api.getRoot().querySelectorAll(selector));
  };

  api.assetUrl = function assetUrl(path) {
    var absoluteUrl = new URL(path, featureBaseUrl).href;
    return window.SenkoFreshAssets
      ? window.SenkoFreshAssets.url(absoluteUrl)
      : absoluteUrl;
  };

  api.esc = function escapeHtml(value) {
    return String(value || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  };

  api.setStatus = function setStatus(state, text) {
    var dot = api.$('dot');
    var status = api.$('status-text');
    if (dot) dot.className = 'dot ' + (state || '');
    if (status) status.textContent = text;
  };

  api.formatBytes = function formatBytes(bytes) {
    if (!bytes) return '0 B';
    var units = ['B', 'KB', 'MB', 'GB'];
    var idx = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
    return (bytes / Math.pow(1024, idx)).toFixed(idx === 0 ? 0 : 1) + ' ' + units[idx];
  };

  api.savingPercent = function savingPercent(original, compressed) {
    if (!original || !compressed || compressed >= original) return 0;
    return Math.round((1 - compressed / original) * 100);
  };

  api.downloadBlob = function downloadBlob(blob, filename) {
    /*
     * Download local da feature Imagens.
     *
     * Como a feature agora vive no index principal, o link temporario nasce no
     * documento real do app. Imagens usam application/octet-stream para reduzir
     * a chance de o navegador abrir uma imagem unica em vez de baixar.
     */
    var payload = blob && blob.type && blob.type.indexOf('image/') === 0
      ? blob.slice(0, blob.size, 'application/octet-stream')
      : blob;
    var url = URL.createObjectURL(payload);
    var link = document.createElement('a');

    link.href = url;
    link.download = filename || 'download';
    link.style.position = 'fixed';
    link.style.left = '-9999px';
    link.style.top = '-9999px';

    document.body.appendChild(link);
    link.dispatchEvent(new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window
    }));

    window.setTimeout(function () {
      link.remove();
      URL.revokeObjectURL(url);
    }, 4000);
  };

  api.fileBaseName = function fileBaseName(filename) {
    return filename.replace(/\.[^.]+$/, '');
  };
})();
