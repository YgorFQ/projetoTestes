(function () {
  // Atalho pequeno para buscar elementos por id sem repetir document.getElementById.
  window.$ = id => document.getElementById(id);

  // Escape de HTML usado quando valores do usuario entram em templates.
  window.esc = value => String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

  window.setStatus = function setStatus(state, text) {
    // Estado visual global no header: vazio, busy ou ok.
    $('dot').className = 'dot ' + (state || '');
    $('status-text').textContent = text;
  };

  window.formatBytes = function formatBytes(bytes) {
    // Formata bytes para leitura rapida nos cards do compressor.
    if (!bytes) return '0 B';
    const units = ['B', 'KB', 'MB', 'GB'];
    const idx = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
    return `${(bytes / Math.pow(1024, idx)).toFixed(idx === 0 ? 0 : 1)} ${units[idx]}`;
  };

  window.savingPercent = function savingPercent(original, compressed) {
    // Retorna zero quando nao houve ganho real.
    if (!original || !compressed || compressed >= original) return 0;
    return Math.round((1 - compressed / original) * 100);
  };

  window.downloadBlob = function downloadBlob(blob, filename) {
    // Dispara o download no documento principal para evitar que o Firefox
    // trate blob de iframe como navegacao em uma nova janela.
    const shouldForceAttachment = blob && blob.type && blob.type.startsWith('image/');
    const payload = shouldForceAttachment ? new Blob([blob], { type: 'application/octet-stream' }) : blob;
    const targetWindow = downloadTargetWindow();
    const targetDocument = targetWindow.document;
    const url = targetWindow.URL.createObjectURL(payload);
    const link = targetDocument.createElement('a');
    link.href = url;
    link.download = filename || 'download';
    link.rel = 'noopener';
    if (payload && payload.type) link.type = payload.type;
    link.style.display = 'none';
    targetDocument.body.appendChild(link);
    link.click();
    link.remove();
    targetWindow.setTimeout(() => targetWindow.URL.revokeObjectURL(url), 1000);
  };

  function downloadTargetWindow() {
    try {
      if (window.top && window.top.document && window.top.document.body) return window.top;
    } catch (error) {
      // Fallback abaixo quando o navegador bloquear acesso ao frame pai.
    }

    try {
      if (window.parent && window.parent.document && window.parent.document.body) return window.parent;
    } catch (error) {
      // Fallback abaixo quando o navegador bloquear acesso ao frame pai.
    }

    return window;
  }

  window.fileBaseName = function fileBaseName(filename) {
    // Remove somente a ultima extensao do nome.
    return filename.replace(/\.[^.]+$/, '');
  };
})();
