(function () {
  const api = window.SenkoImagens;
  const SUPPORTED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

  // Estado em memoria da aba Compressor. Cada item representa um arquivo carregado.
  let items = [];
  let isDownloadingEach = false;
  let outputFormat = 'original';

  function initCompressor() {
    const input = api.$('image-input');
    const quality = api.$('quality-range');
    const pickButton = api.$('btn-pick-images');
    const view = api.$('view-compressor');
    const results = api.query('.compressor-results');

    // Upload via seletor tradicional.
    pickButton.addEventListener('click', () => input.click());
    input.addEventListener('change', event => {
      addFiles(Array.from(event.target.files || []));
      input.value = '';
    });
    quality.addEventListener('input', () => {
      api.$('quality-value').textContent = quality.value + '%';
      api.queryAll('[data-quality]').forEach(btn => btn.classList.toggle('is-active', btn.dataset.quality === quality.value));
    });

    api.queryAll('[data-quality]').forEach(button => {
      button.addEventListener('click', () => {
        quality.value = button.dataset.quality;
        quality.dispatchEvent(new Event('input'));
      });
    });

    api.queryAll('[data-output-format]').forEach(button => {
      button.addEventListener('click', () => {
        setOutputFormat(button.dataset.outputFormat);
      });
    });

    bindImageDrop(api.getRoot(), results, files => addFiles(files), () => view && view.classList.contains('is-active'));
    api.$('btn-compress').addEventListener('click', compressAll);
    api.$('btn-sort-images').addEventListener('click', sortImagesByName);
    api.$('btn-download-each').addEventListener('click', downloadEach);
    api.$('btn-download-all').addEventListener('click', downloadAll);
    api.$('btn-clear-images').addEventListener('click', clearImages);
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
    // Ignora formatos fora do contrato para evitar conversoes inesperadas.
    const accepted = files.filter(file => SUPPORTED_TYPES.includes(file.type));
    if (!accepted.length) return;

    items = items.concat(accepted.map(file => ({
      id: crypto.randomUUID(),
      file,
      outputName: defaultOutputNameFor(file),
      originalUrl: URL.createObjectURL(file),
      resultBlob: null,
      resultUrl: null,
      status: 'pronto',
    })));

    renderList();
    api.setStatus('', `${accepted.length} imagem(ns) adicionadas`);
  }

  function renderList() {
    // A lista e redesenhada de forma simples sempre que o estado muda.
    const list = api.$('image-list');
    list.innerHTML = '';

    if (!items.length) {
      list.innerHTML = `
        <div class="empty">
          <div class="empty__icon">PNG</div>
          <div class="empty__text">Adicione imagens para comprimir localmente</div>
        </div>
      `;
    } else {
      items.forEach(item => list.appendChild(buildImageCard(item)));
    }

    api.$('compressor-badge').textContent = items.length + ' arquivo' + (items.length !== 1 ? 's' : '');
    api.$('btn-compress').disabled = isDownloadingEach || !items.length;
    api.$('btn-sort-images').disabled = isDownloadingEach || items.length < 2;
    api.$('btn-clear-images').disabled = isDownloadingEach || !items.length;
    api.$('btn-download-each').disabled = isDownloadingEach || !readyItems().length;
    api.$('btn-download-all').disabled = isDownloadingEach || !readyItems().length;
  }

  function buildImageCard(item) {
    // O mesmo card serve antes e depois da compressao, alternando preview/estatisticas.
    const card = document.createElement('article');
    card.className = 'image-card';

    const sourceUrl = item.resultUrl || item.originalUrl;
    const resultSize = item.resultBlob ? item.resultBlob.size : 0;
    const saving = api.savingPercent(item.file.size, resultSize);
    const inputFormat = formatLabelForMime(item.file.type);
    const targetFormat = formatLabelForMime(targetMimeFor(item.file));
    const formatLabel = inputFormat === targetFormat ? inputFormat : `${inputFormat} -> ${targetFormat}`;
    const canDownload = !!outputBlobFor(item);

    card.innerHTML = `
      <div class="image-preview"><img src="${sourceUrl}" alt=""></div>
      <div class="image-info">
        <div class="image-name" title="${api.esc(item.file.name)}">${api.esc(item.file.name)}</div>
        <span class="tag">${api.esc(formatLabel)}</span>
        <label class="filename-field">
          <span class="stat__label">Nome final</span>
          <input class="filename-input" type="text" value="${api.esc(item.outputName)}" data-action="rename">
        </label>
        <div class="image-stats">
          <div class="stat">
            <span class="stat__label">Original</span>
            <span class="stat__value">${api.formatBytes(item.file.size)}</span>
          </div>
          <div class="stat">
            <span class="stat__label">Final</span>
            <span class="stat__value">${item.resultBlob ? api.formatBytes(resultSize) : item.status}</span>
          </div>
        </div>
        <div class="stat">
          <span class="stat__label">Ganho</span>
          <span class="stat__value ${saving ? 'saving' : ''}">${item.resultBlob ? `${saving}%` : '-'}</span>
        </div>
        <div class="image-card__actions">
          <button class="btn btn-ghost" type="button" data-action="download" ${canDownload ? '' : 'disabled'}>Baixar</button>
          <button class="btn btn-ghost" type="button" data-action="remove">Remover</button>
        </div>
      </div>
    `;

    card.querySelector('[data-action="download"]').addEventListener('click', () => {
      api.downloadBlob(outputBlobFor(item), normalizedOutputName(item));
    });
    const nameInput = card.querySelector('[data-action="rename"]');
    nameInput.addEventListener('input', event => {
      item.outputName = event.target.value;
      showInputEnd(event.target);
    });
    nameInput.addEventListener('blur', event => {
      item.outputName = normalizedOutputName(item);
      event.target.value = item.outputName;
      showInputEnd(event.target);
    });
    showInputEnd(nameInput);
    card.querySelector('[data-action="remove"]').addEventListener('click', () => removeItem(item.id));

    return card;
  }

  function showInputEnd(input) {
    requestAnimationFrame(() => {
      input.scrollLeft = input.scrollWidth;
    });
  }

  function sortImagesByName() {
    if (items.length < 2) return;

    items.sort((left, right) => {
      return String(left.outputName || left.file.name)
        .localeCompare(String(right.outputName || right.file.name), 'pt-BR', {
          numeric: true,
          sensitivity: 'base',
        });
    });
    renderList();
    api.setStatus('ok', 'ordenado A-Z');
  }

  async function compressAll() {
    if (!items.length) return;
    const quality = Number(api.$('quality-range').value) / 100;
    const pngColors = Number(api.$('png-colors').value);

    api.$('btn-compress').disabled = true;
    api.setStatus('busy', 'comprimindo...');

    // Processa em sequencia para manter a interface previsivel em maquinas mais fracas.
    for (const item of items) {
      item.status = 'processando';
      renderList();

      try {
        const result = await compressImage(item.file, quality, pngColors);
        const targetMime = targetMimeFor(item.file);
        if (item.resultUrl) URL.revokeObjectURL(item.resultUrl);
        // Conversao sempre respeita o formato escolhido; compressao pura evita aumentar o arquivo.
        const isConversion = targetMime !== item.file.type;
        item.resultBlob = isConversion || result.size < item.file.size ? result : item.file;
        item.resultUrl = URL.createObjectURL(item.resultBlob);
        item.status = isConversion ? 'convertida' : (result.size < item.file.size ? 'comprimida' : 'sem ganho');
        item.outputName = normalizedOutputName(item);
      } catch (error) {
        item.status = 'erro';
        console.error(error);
      }
    }

    renderList();
    api.setStatus('ok', 'compressao finalizada');
  }

  async function compressImage(file, quality, pngColors) {
    // Estrategias separadas porque PNG e raster com perda se comportam muito diferente.
    const targetMime = targetMimeFor(file);
    if (targetMime === 'image/png') return compressPng(file, pngColors);
    if (targetMime === 'image/jpeg' || targetMime === 'image/webp') return compressRaster(file, targetMime, quality);
    return file;
  }

  async function compressRaster(file, mime, quality) {
    // JPG/WebP usam a lib local quando disponivel; canvas fica como fallback.
    if (file.type !== mime || !window.imageCompression) return compressViaCanvas(file, mime, quality);

    return imageCompression(file, {
      maxSizeMB: Math.max((file.size / 1024 / 1024) * quality, 0.05),
      maxIteration: 10,
      initialQuality: quality,
      alwaysKeepResolution: true,
      fileType: mime,
      useWebWorker: true,
      libURL: api.assetUrl('vendor/browser-image-compression.js'),
    });
  }

  async function compressViaCanvas(file, mime, quality) {
    // Fallback basico: redesenha a imagem em canvas e exporta no mesmo MIME.
    const bitmap = await createImageBitmap(file);
    const canvas = document.createElement('canvas');
    canvas.width = bitmap.width;
    canvas.height = bitmap.height;
    const ctx = canvas.getContext('2d');
    if (mime === 'image/jpeg') {
      ctx.fillStyle = '#fff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    ctx.drawImage(bitmap, 0, 0);
    bitmap.close();

    return new Promise((resolve, reject) => {
      canvas.toBlob(blob => {
        if (!blob) reject(new Error('Falha ao comprimir imagem.'));
        else resolve(blob);
      }, mime, quality);
    });
  }

  async function compressPng(file, colors) {
    // PNG usa reducao de paleta via UPNG, preservando o formato.
    if (!window.UPNG) return compressViaCanvas(file, 'image/png', 1);

    const bitmap = await createImageBitmap(file);
    const canvas = document.createElement('canvas');
    canvas.width = bitmap.width;
    canvas.height = bitmap.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(bitmap, 0, 0);
    bitmap.close();

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pngBuffer = UPNG.encode([imageData.data.buffer], canvas.width, canvas.height, colors);
    return new Blob([pngBuffer], { type: 'image/png' });
  }

  function setOutputFormat(format) {
    outputFormat = ['original', 'webp', 'jpg', 'png'].includes(format) ? format : 'original';
    api.queryAll('[data-output-format]').forEach(button => {
      button.classList.toggle('is-active', button.dataset.outputFormat === outputFormat);
    });

    items.forEach(item => {
      if (item.resultUrl) URL.revokeObjectURL(item.resultUrl);
      item.resultBlob = null;
      item.resultUrl = null;
      item.status = 'pronto';
      item.outputName = replaceExtension(item.outputName || item.file.name, targetExtensionFor(item.file));
    });

    renderList();
  }

  async function downloadAll() {
    // O ZIP usa nomes ja normalizados e resolve duplicidades antes de gerar o arquivo.
    const ready = readyItems();
    if (!ready.length || !window.JSZip) return;

    const zipNames = uniqueZipNames(ready);
    const blob = await createZipBlob(ready, zipNames);
    api.downloadBlob(blob, zipFilename(ready));
  }

  async function downloadEach() {
    const ready = readyItems();
    if (!ready.length || isDownloadingEach) return;

    isDownloadingEach = true;
    renderList();

    try {
      const names = uniqueZipNames(ready);

      if (canSaveToDirectory()) {
        await saveEachToDirectory(ready, names);
      } else if (window.JSZip) {
        const blob = await createZipBlob(ready, names);
        api.downloadBlob(blob, zipFilename(ready));
        api.setStatus('ok', 'zip unico iniciado');
      } else {
        api.setStatus('', 'download em lote indisponivel');
      }
    } catch (error) {
      if (error && error.name === 'AbortError') {
        api.setStatus('', 'download cancelado');
      } else {
        console.error(error);
        api.setStatus('', 'erro ao baixar');
      }
    } finally {
      isDownloadingEach = false;
      renderList();
    }
  }

  function canSaveToDirectory() {
    return typeof window.showDirectoryPicker === 'function';
  }

  async function saveEachToDirectory(ready, names) {
    const directory = await window.showDirectoryPicker({ mode: 'readwrite' });
    const usedNames = new Set();

    for (let i = 0; i < ready.length; i += 1) {
      const item = ready[i];
      const filename = await availableDirectoryName(directory, names.get(item.id), usedNames);
      api.setStatus('busy', `salvando ${i + 1}/${ready.length}`);

      const handle = await directory.getFileHandle(filename, { create: true });
      const writable = await handle.createWritable();
      await writable.write(outputBlobFor(item));
      await writable.close();
      item.outputName = filename;
    }

    api.setStatus('ok', `${ready.length} arquivo(s) salvos`);
  }

  async function availableDirectoryName(directory, filename, usedNames) {
    const parts = splitFilename(filename);
    let index = 1;
    let candidate = filename;

    while (usedNames.has(candidate.toLowerCase()) || await directoryFileExists(directory, candidate)) {
      index += 1;
      candidate = `${parts.base}-${index}${parts.ext}`;
    }

    usedNames.add(candidate.toLowerCase());
    return candidate;
  }

  async function directoryFileExists(directory, filename) {
    try {
      await directory.getFileHandle(filename);
      return true;
    } catch (error) {
      if (error && error.name === 'NotFoundError') return false;
      throw error;
    }
  }

  async function createZipBlob(ready, names) {
    const zip = new JSZip();
    ready.forEach(item => zip.file(names.get(item.id), outputBlobFor(item)));
    return zip.generateAsync({ type: 'blob' });
  }

  function removeItem(id) {
    // Revoga object URLs para evitar vazamento de memoria em sessoes longas.
    const item = items.find(current => current.id === id);
    if (item) {
      URL.revokeObjectURL(item.originalUrl);
      if (item.resultUrl) URL.revokeObjectURL(item.resultUrl);
    }
    items = items.filter(current => current.id !== id);
    renderList();
  }

  function clearImages() {
    // Limpa todos os previews criados com URL.createObjectURL.
    items.forEach(item => {
      URL.revokeObjectURL(item.originalUrl);
      if (item.resultUrl) URL.revokeObjectURL(item.resultUrl);
    });
    items = [];
    renderList();
    api.setStatus('', 'aguardando');
  }

  function defaultOutputName(filename, mime) {
    // Sugestao inicial de nome, mantendo o nome original sempre que possivel.
    const originalExt = filename.match(/\.[^.]+$/);
    const ext = originalExt ? originalExt[0] : fallbackExtensionForMime(mime);
    const safeName = sanitizeFilename(filename || `imagem${ext}`);
    if (!safeName || safeName === ext) return `imagem${ext}`;
    return originalExt || hasExtension(safeName, ext) ? safeName : `${safeName}${ext}`;
  }

  function defaultOutputNameFor(file) {
    return replaceExtension(defaultOutputName(file.name, file.type), targetExtensionFor(file));
  }

  function outputBlobFor(item) {
    if (outputFormat !== 'original' && !item.resultBlob) return null;
    return item.resultBlob || item.file;
  }

  function readyItems() {
    return items.filter(item => outputBlobFor(item));
  }

  function zipFilename(readyItems) {
    const hasCompressed = readyItems.some(item => item.resultBlob);
    return hasCompressed ? 'imagens-comprimidas.zip' : 'imagens-renomeadas.zip';
  }

  function normalizedOutputName(item) {
    // Garante nome seguro e extensao coerente antes de download/ZIP.
    const fallback = defaultOutputName(item.file.name, item.file.type);
    const ext = targetExtensionFor(item.file);
    const raw = String(item.outputName || '').trim();
    const safeName = sanitizeFilename(raw || fallback);
    if (!safeName || safeName === ext) return replaceExtension(fallback, ext);
    return hasExtension(safeName, ext) ? safeName : safeName.replace(/\.[^.]+$/, '') + ext;
  }

  function sanitizeFilename(filename) {
    // Remove caracteres proibidos em nomes de arquivo no Windows.
    return filename
      .replace(/[<>:"/\\|?*\x00-\x1F]/g, '-')
      .replace(/\s+/g, ' ')
      .replace(/[. ]+$/g, '')
      .trim();
  }

  function extensionFor(file) {
    const originalExt = file.name.match(/\.[^.]+$/);
    if (originalExt) return originalExt[0].toLowerCase();
    if (file.type === 'image/png') return '.png';
    if (file.type === 'image/webp') return '.webp';
    return '.jpg';
  }

  function targetMimeFor(file) {
    if (outputFormat === 'png') return 'image/png';
    if (outputFormat === 'webp') return 'image/webp';
    if (outputFormat === 'jpg') return 'image/jpeg';
    return file.type;
  }

  function targetExtensionFor(file) {
    if (outputFormat === 'original') return extensionFor(file);
    const targetMime = targetMimeFor(file);
    if (targetMime === 'image/png') return '.png';
    if (targetMime === 'image/webp') return '.webp';
    return '.jpg';
  }

  function formatLabelForMime(mime) {
    if (mime === 'image/png') return 'PNG';
    if (mime === 'image/webp') return 'WebP';
    return 'JPG';
  }

  function fallbackExtensionForMime(mime) {
    if (mime === 'image/png') return '.png';
    if (mime === 'image/webp') return '.webp';
    return '.jpg';
  }

  function hasExtension(filename, ext) {
    return filename.toLowerCase().endsWith(ext);
  }

  function replaceExtension(filename, ext) {
    const safeName = sanitizeFilename(filename || '');
    const base = safeName.replace(/\.[^.]+$/, '') || 'imagem';
    return `${base}${ext}`;
  }

  function splitFilename(filename) {
    const extMatch = filename.match(/\.[^.]+$/);
    const ext = extMatch ? extMatch[0] : '';
    const base = ext ? filename.slice(0, -ext.length) : filename;
    return { base, ext };
  }

  function uniqueZipNames(readyItems) {
    // Evita colisao dentro do ZIP, inclusive quando o usuario repete nomes manualmente.
    const used = new Map();
    const names = new Map();

    readyItems.forEach(item => {
      const name = normalizedOutputName(item);
      item.outputName = name;

      const extMatch = name.match(/\.[^.]+$/);
      const ext = extMatch ? extMatch[0] : '';
      const base = ext ? name.slice(0, -ext.length) : name;
      const key = name.toLowerCase();
      const count = used.get(key) || 0;

      if (!count) {
        used.set(key, 1);
        names.set(item.id, name);
        return;
      }

      let index = count + 1;
      let uniqueName = `${base}-${index}${ext}`;
      while (used.has(uniqueName.toLowerCase())) {
        index += 1;
        uniqueName = `${base}-${index}${ext}`;
      }

      used.set(key, index);
      used.set(uniqueName.toLowerCase(), 1);
      names.set(item.id, uniqueName);
    });

    return names;
  }

  api.initCompressor = initCompressor;
})();
