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
    // Download local sem servidor; revoga a URL depois do clique.
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  window.fileBaseName = function fileBaseName(filename) {
    // Remove somente a ultima extensao do nome.
    return filename.replace(/\.[^.]+$/, '');
  };
})();
