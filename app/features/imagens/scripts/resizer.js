(function () {
  const api = window.SenkoImagens;
  const SUPPORTED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
  const DEFAULT_BREAKPOINTS = [
    { width: 393, label: 'm' },
    { width: 702, label: 't' },
    { width: 1200, label: 'd' },
  ];

  let items = [];
  let breakpoints = cloneBreakpoints(DEFAULT_BREAKPOINTS);
  let outputFormat = 'webp';

  function initResizer() {
    const input = api.$('resize-image-input');
    const quality = api.$('resize-quality-range');
    const pickButton = api.$('btn-pick-resize-images');
    const view = api.$('view-resizer');
    const results = api.query('.resizer-results');

    pickButton.addEventListener('click', () => input.click());
    input.addEventListener('change', event => {
      addFiles(Array.from(event.target.files || []));
      input.value = '';
    });

    bindImageDrop(api.getRoot(), results, files => addFiles(files), () => view && view.classList.contains('is-active'));
    quality.addEventListener('input', () => {
      api.$('resize-quality-value').textContent = quality.value + '%';
    });

    api.queryAll('[data-resize-format]').forEach(button => {
      button.addEventListener('click', () => {
        api.queryAll('[data-resize-format]').forEach(item => {
          item.classList.toggle('is-active', item === button);
        });
        outputFormat = button.dataset.resizeFormat;
        renderNamePreview();
      });
    });

    api.$('btn-add-resize-breakpoint').addEventListener('click', () => {
      breakpoints.push({ width: nextBreakpointWidth(), label: '' });
      renderBreakpoints();
    });
    api.$('btn-generate-resize-zip').addEventListener('click', generateZip);
    api.$('btn-clear-resize-images').addEventListener('click', clearFiles);

    renderBreakpoints();
    renderFiles();
  }

  function bindImageDrop(target, highlight, onFiles, isActive) {
    if (!target || !highlight) return;
    let dragDepth = 0;

    ['dragenter', 'dragover'].forEach(type => {
      target.addEventListener(type, event => {
        if (isActive && !isActive()) return;
        if (!hasDraggedFiles(event)) return;
        event.preventDefault();
        if (type === 'dragenter') dragDepth += 1;
        if (event.dataTransfer) event.dataTransfer.dropEffect = 'copy';
        highlight.classList.add('is-dragover');
      });
    });

    target.addEventListener('dragleave', event => {
      if (isActive && !isActive()) return;
      if (!hasDraggedFiles(event)) return;
      event.preventDefault();
      dragDepth = Math.max(0, dragDepth - 1);
      if (!dragDepth) highlight.classList.remove('is-dragover');
    });

    target.addEventListener('drop', event => {
      if (isActive && !isActive()) return;
      if (!hasDraggedFiles(event)) return;
      event.preventDefault();
      dragDepth = 0;
      highlight.classList.remove('is-dragover');
      onFiles(Array.from(event.dataTransfer.files || []));
    });
  }

  function hasDraggedFiles(event) {
    const types = event.dataTransfer && event.dataTransfer.types;
    return !!types && Array.prototype.indexOf.call(types, 'Files') !== -1;
  }

  function addFiles(files) {
    const accepted = files.filter(file => SUPPORTED_TYPES.includes(file.type));
    if (!accepted.length) return;

    const nextItems = accepted
      .filter(file => !items.some(item => item.file.name === file.name && item.file.size === file.size))
      .map(file => ({
        id: crypto.randomUUID(),
        file,
        originalUrl: URL.createObjectURL(file),
      }));

    if (!nextItems.length) return;
    items = items.concat(nextItems);
    hideRunLog();
    renderFiles();
    api.setStatus('', `${nextItems.length} imagem(ns) no redimensionador`);
  }

  function renderFiles() {
    const list = api.$('resize-file-list');
    list.innerHTML = '';

    if (!items.length) {
      list.innerHTML = `
        <div class="empty">
          <div class="empty__icon">ZIP</div>
          <div class="empty__text">Adicione imagens para gerar variantes responsivas</div>
        </div>
      `;
    } else {
      items.forEach(item => list.appendChild(buildFileCard(item)));
    }

    api.$('resize-badge').textContent = items.length + ' arquivo' + (items.length !== 1 ? 's' : '');
    api.$('btn-generate-resize-zip').disabled = !items.length;
    api.$('btn-clear-resize-images').disabled = !items.length;
  }

  function buildFileCard(item) {
    const card = document.createElement('article');
    card.className = 'resize-file-card';
    card.innerHTML = `
      <div class="resize-file-card__preview">
        <img src="${item.originalUrl}" alt="">
      </div>
      <div class="resize-file-card__body">
        <div class="resize-file-card__name" title="${api.esc(item.file.name)}">${api.esc(item.file.name)}</div>
        <div class="resize-file-card__meta">
          <span class="tag">${item.file.type.replace('image/', '')}</span>
          <span>${api.formatBytes(item.file.size)}</span>
        </div>
        <button class="btn btn-ghost" type="button" data-remove-resize>Remover</button>
      </div>
    `;
    card.querySelector('[data-remove-resize]').addEventListener('click', () => removeFile(item.id));
    return card;
  }

  function removeFile(id) {
    const item = items.find(current => current.id === id);
    if (item) URL.revokeObjectURL(item.originalUrl);
    items = items.filter(current => current.id !== id);
    renderFiles();
  }

  function clearFiles() {
    items.forEach(item => URL.revokeObjectURL(item.originalUrl));
    items = [];
    breakpoints = cloneBreakpoints(DEFAULT_BREAKPOINTS);
    outputFormat = 'webp';
    api.queryAll('[data-resize-format]').forEach(button => {
      button.classList.toggle('is-active', button.dataset.resizeFormat === outputFormat);
    });
    api.$('resize-quality-range').value = '80';
    api.$('resize-quality-value').textContent = '80%';
    hideRunLog();
    renderBreakpoints();
    renderFiles();
    api.setStatus('', 'aguardando');
  }

  function renderBreakpoints() {
    const list = api.$('resize-breakpoints');
    list.innerHTML = '';

    breakpoints.forEach((breakpoint, index) => {
      const row = document.createElement('div');
      row.className = 'resize-breakpoint';
      row.innerHTML = `
        <label class="resize-breakpoint__field">
          <span class="stat__label">Largura</span>
          <input class="text-input" type="number" min="1" max="8000" value="${breakpoint.width}" data-resize-width>
        </label>
        <label class="resize-breakpoint__field">
          <span class="stat__label">Sufixo</span>
          <input class="text-input" type="text" maxlength="12" value="${api.esc(breakpoint.label)}" placeholder="${breakpoint.width}" data-resize-label>
        </label>
      `;

      if (breakpoints.length > 1) {
        const remove = document.createElement('button');
        remove.className = 'copy-btn resize-breakpoint__remove';
        remove.type = 'button';
        remove.textContent = 'remover';
        remove.addEventListener('click', () => {
          breakpoints.splice(index, 1);
          renderBreakpoints();
        });
        row.appendChild(remove);
      }

      row.querySelector('[data-resize-width]').addEventListener('input', event => {
        breakpoint.width = normalizeWidth(event.target.value, breakpoint.width);
        renderNamePreview();
      });
      row.querySelector('[data-resize-label]').addEventListener('input', event => {
        breakpoint.label = sanitizeSuffix(event.target.value);
        if (event.target.value !== breakpoint.label) event.target.value = breakpoint.label;
        renderNamePreview();
      });

      list.appendChild(row);
    });

    renderNamePreview();
  }

  function renderNamePreview() {
    const preview = api.$('resize-name-preview');
    const formats = targetFormats();
    const examples = validBreakpoints()
      .slice(0, 4)
      .flatMap(breakpoint => formats.map(format => {
        return `nome-${variantSuffix(breakpoint)}.${format}`;
      }));

    preview.textContent = examples.length ? examples.join('  ') : 'Informe ao menos uma largura valida.';
  }

  async function generateZip() {
    const readyBreakpoints = validBreakpoints();
    if (!items.length || !readyBreakpoints.length || !window.JSZip) return;

    const formats = targetFormats();
    const total = items.length * readyBreakpoints.length * formats.length;
    const zip = new JSZip();
    const usedNames = new Set();
    let done = 0;

    api.$('btn-generate-resize-zip').disabled = true;
    api.$('resize-progress').classList.remove('is-hidden');
    api.$('resize-log').classList.remove('is-hidden');
    api.$('resize-log').innerHTML = '';
    updateProgress(0, 'preparando variantes');
    api.setStatus('busy', 'gerando variantes...');

    for (const item of items) {
      for (const breakpoint of readyBreakpoints) {
        for (const format of formats) {
          const filename = uniqueName(variantName(item.file.name, breakpoint, format), usedNames);
          try {
            const blob = await resizeToBlob(item.file, breakpoint.width, format);
            zip.file(filename, blob);
            addLog('ok', `${filename} ${api.formatBytes(blob.size)}`);
          } catch (error) {
            addLog('error', `${filename} ${error.message}`);
          } finally {
            done += 1;
            updateProgress(Math.round((done / total) * 100), filename);
          }
        }
      }
    }

    try {
      updateProgress(100, 'compactando zip');
      const blob = await zip.generateAsync({ type: 'blob' });
      api.downloadBlob(blob, 'variantes.zip');
      addLog('ok', 'variantes.zip pronto');
      updateProgress(100, 'download iniciado');
      api.setStatus('ok', 'zip de variantes gerado');
    } catch (error) {
      addLog('error', 'falha ao gerar zip');
      api.setStatus('', 'erro no zip');
      console.error(error);
    } finally {
      api.$('btn-generate-resize-zip').disabled = !items.length;
    }
  }

  async function resizeToBlob(file, width, format) {
    const bitmap = await createImageBitmap(file);
    const targetWidth = Math.min(width, bitmap.width);
    const targetHeight = Math.max(1, Math.round(targetWidth * (bitmap.height / bitmap.width)));
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = targetWidth;
    canvas.height = targetHeight;

    if (format === 'jpg') {
      ctx.fillStyle = '#fff';
      ctx.fillRect(0, 0, targetWidth, targetHeight);
    }

    ctx.drawImage(bitmap, 0, 0, targetWidth, targetHeight);
    bitmap.close();

    return new Promise((resolve, reject) => {
      canvas.toBlob(blob => {
        if (blob) resolve(blob);
        else reject(new Error('falha ao redimensionar'));
      }, format === 'jpg' ? 'image/jpeg' : 'image/webp', Number(api.$('resize-quality-range').value) / 100);
    });
  }

  function validBreakpoints() {
    return breakpoints
      .map(breakpoint => ({
        width: normalizeWidth(breakpoint.width, 0),
        label: sanitizeSuffix(breakpoint.label),
      }))
      .filter(breakpoint => breakpoint.width > 0);
  }

  function variantName(filename, breakpoint, format) {
    return `${api.fileBaseName(filename)}-${variantSuffix(breakpoint)}.${format}`;
  }

  function variantSuffix(breakpoint) {
    return breakpoint.label || String(breakpoint.width);
  }

  function targetFormats() {
    return outputFormat === 'both' ? ['webp', 'jpg'] : [outputFormat];
  }

  function uniqueName(filename, usedNames) {
    const key = filename.toLowerCase();
    if (!usedNames.has(key)) {
      usedNames.add(key);
      return filename;
    }

    const ext = filename.match(/\.[^.]+$/)?.[0] || '';
    const base = ext ? filename.slice(0, -ext.length) : filename;
    let index = 2;
    let candidate = `${base}-${index}${ext}`;
    while (usedNames.has(candidate.toLowerCase())) {
      index += 1;
      candidate = `${base}-${index}${ext}`;
    }
    usedNames.add(candidate.toLowerCase());
    return candidate;
  }

  function normalizeWidth(value, fallback) {
    const parsed = parseInt(value, 10);
    return Number.isInteger(parsed) && parsed > 0 ? Math.min(parsed, 8000) : fallback;
  }

  function sanitizeSuffix(value) {
    return String(value || '')
      .trim()
      .replace(/[^a-zA-Z0-9_-]+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  }

  function nextBreakpointWidth() {
    return validBreakpoints().reduce((max, breakpoint) => Math.max(max, breakpoint.width), 0) + 320;
  }

  function cloneBreakpoints(source) {
    return source.map(breakpoint => ({ ...breakpoint }));
  }

  function updateProgress(percent, label) {
    api.$('resize-progress-fill').style.width = percent + '%';
    api.$('resize-progress-label').textContent = `${percent}% ${label}`;
  }

  function addLog(type, text) {
    const row = document.createElement('div');
    row.className = 'resize-log__row ' + (type === 'error' ? 'is-error' : 'is-ok');
    row.textContent = text;
    api.$('resize-log').appendChild(row);
    api.$('resize-log').scrollTop = api.$('resize-log').scrollHeight;
  }

  function hideRunLog() {
    api.$('resize-progress').classList.add('is-hidden');
    api.$('resize-log').classList.add('is-hidden');
    api.$('resize-log').innerHTML = '';
  }

  api.initResizer = initResizer;
})();
