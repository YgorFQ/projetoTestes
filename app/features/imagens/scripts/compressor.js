(function () {
  const SUPPORTED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

  // Estado em memoria da aba Compressor. Cada item representa um arquivo carregado.
  let items = [];

  function initCompressor() {
    const input = $('image-input');
    const dropzone = $('dropzone');
    const quality = $('quality-range');

    // Upload via seletor tradicional.
    input.addEventListener('change', event => addFiles(Array.from(event.target.files || [])));
    quality.addEventListener('input', () => {
      $('quality-value').textContent = quality.value + '%';
      document.querySelectorAll('[data-quality]').forEach(btn => btn.classList.toggle('is-active', btn.dataset.quality === quality.value));
    });

    document.querySelectorAll('[data-quality]').forEach(button => {
      button.addEventListener('click', () => {
        quality.value = button.dataset.quality;
        quality.dispatchEvent(new Event('input'));
      });
    });

    // Drag-and-drop visual: previne o navegador de abrir a imagem solta.
    ['dragenter', 'dragover'].forEach(type => {
      dropzone.addEventListener(type, event => {
        event.preventDefault();
        dropzone.classList.add('is-dragover');
      });
    });

    ['dragleave', 'drop'].forEach(type => {
      dropzone.addEventListener(type, event => {
        event.preventDefault();
        dropzone.classList.remove('is-dragover');
      });
    });

    dropzone.addEventListener('drop', event => addFiles(Array.from(event.dataTransfer.files || [])));
    $('btn-compress').addEventListener('click', compressAll);
    $('btn-download-all').addEventListener('click', downloadAll);
    $('btn-clear-images').addEventListener('click', clearImages);
  }

  function addFiles(files) {
    // Ignora formatos fora do contrato para evitar conversoes inesperadas.
    const accepted = files.filter(file => SUPPORTED_TYPES.includes(file.type));
    if (!accepted.length) return;

    items = items.concat(accepted.map(file => ({
      id: crypto.randomUUID(),
      file,
      outputName: compressedName(file.name, file.type),
      originalUrl: URL.createObjectURL(file),
      resultBlob: null,
      resultUrl: null,
      status: 'pronto',
    })));

    renderList();
    setStatus('', `${accepted.length} imagem(ns) adicionadas`);
  }

  function renderList() {
    // A lista e redesenhada de forma simples sempre que o estado muda.
    const list = $('image-list');
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

    $('compressor-badge').textContent = items.length + ' arquivo' + (items.length !== 1 ? 's' : '');
    $('btn-compress').disabled = !items.length;
    $('btn-clear-images').disabled = !items.length;
    $('btn-download-all').disabled = !items.some(item => item.resultBlob);
  }

  function buildImageCard(item) {
    // O mesmo card serve antes e depois da compressao, alternando preview/estatisticas.
    const card = document.createElement('article');
    card.className = 'image-card';

    const sourceUrl = item.resultUrl || item.originalUrl;
    const resultSize = item.resultBlob ? item.resultBlob.size : 0;
    const saving = savingPercent(item.file.size, resultSize);

    card.innerHTML = `
      <div class="image-preview"><img src="${sourceUrl}" alt=""></div>
      <div class="image-info">
        <div class="image-name" title="${esc(item.file.name)}">${esc(item.file.name)}</div>
        <span class="tag">${item.file.type.replace('image/', '')}</span>
        <label class="filename-field">
          <span class="stat__label">Nome final</span>
          <input class="filename-input" type="text" value="${esc(item.outputName)}" data-action="rename">
        </label>
        <div class="image-stats">
          <div class="stat">
            <span class="stat__label">Original</span>
            <span class="stat__value">${formatBytes(item.file.size)}</span>
          </div>
          <div class="stat">
            <span class="stat__label">Final</span>
            <span class="stat__value">${item.resultBlob ? formatBytes(resultSize) : item.status}</span>
          </div>
        </div>
        <div class="stat">
          <span class="stat__label">Ganho</span>
          <span class="stat__value ${saving ? 'saving' : ''}">${item.resultBlob ? `${saving}%` : '-'}</span>
        </div>
        <div class="image-card__actions">
          <button class="btn btn-ghost" type="button" data-action="download" ${item.resultBlob ? '' : 'disabled'}>Baixar</button>
          <button class="btn btn-ghost" type="button" data-action="remove">Remover</button>
        </div>
      </div>
    `;

    card.querySelector('[data-action="download"]').addEventListener('click', () => {
      if (item.resultBlob) downloadBlob(item.resultBlob, normalizedOutputName(item));
    });
    card.querySelector('[data-action="rename"]').addEventListener('input', event => {
      item.outputName = event.target.value;
    });
    card.querySelector('[data-action="rename"]').addEventListener('blur', event => {
      item.outputName = normalizedOutputName(item);
      event.target.value = item.outputName;
    });
    card.querySelector('[data-action="remove"]').addEventListener('click', () => removeItem(item.id));

    return card;
  }

  async function compressAll() {
    if (!items.length) return;
    const quality = Number($('quality-range').value) / 100;
    const pngColors = Number($('png-colors').value);

    $('btn-compress').disabled = true;
    setStatus('busy', 'comprimindo...');

    // Processa em sequencia para manter a interface previsivel em maquinas mais fracas.
    for (const item of items) {
      item.status = 'processando';
      renderList();

      try {
        const result = await compressImage(item.file, quality, pngColors);
        if (item.resultUrl) URL.revokeObjectURL(item.resultUrl);
        // Se a compressao piorar o peso, mantem o original e marca como sem ganho.
        item.resultBlob = result.size < item.file.size ? result : item.file;
        item.resultUrl = URL.createObjectURL(item.resultBlob);
        item.status = result.size < item.file.size ? 'comprimida' : 'sem ganho';
      } catch (error) {
        item.status = 'erro';
        console.error(error);
      }
    }

    renderList();
    setStatus('ok', 'compressao finalizada');
  }

  async function compressImage(file, quality, pngColors) {
    // Estrategias separadas porque PNG e raster com perda se comportam muito diferente.
    if (file.type === 'image/png') return compressPng(file, pngColors);
    if (file.type === 'image/jpeg' || file.type === 'image/webp') return compressRaster(file, quality);
    return file;
  }

  async function compressRaster(file, quality) {
    // JPG/WebP usam a lib local quando disponivel; canvas fica como fallback.
    if (!window.imageCompression) return compressViaCanvas(file, file.type, quality);

    return imageCompression(file, {
      maxSizeMB: Math.max((file.size / 1024 / 1024) * quality, 0.05),
      maxIteration: 10,
      initialQuality: quality,
      alwaysKeepResolution: true,
      fileType: file.type,
      useWebWorker: true,
      libURL: new URL('vendor/browser-image-compression.js', window.location.href).href,
    });
  }

  async function compressViaCanvas(file, mime, quality) {
    // Fallback basico: redesenha a imagem em canvas e exporta no mesmo MIME.
    const bitmap = await createImageBitmap(file);
    const canvas = document.createElement('canvas');
    canvas.width = bitmap.width;
    canvas.height = bitmap.height;
    const ctx = canvas.getContext('2d');
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
    if (!window.UPNG) return file;

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

  async function downloadAll() {
    // O ZIP usa nomes ja normalizados e resolve duplicidades antes de gerar o arquivo.
    const ready = items.filter(item => item.resultBlob);
    if (!ready.length || !window.JSZip) return;

    const zip = new JSZip();
    const zipNames = uniqueZipNames(ready);
    ready.forEach(item => zip.file(zipNames.get(item.id), item.resultBlob));
    const blob = await zip.generateAsync({ type: 'blob' });
    downloadBlob(blob, 'imagens-comprimidas.zip');
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
    setStatus('', 'aguardando');
  }

  function compressedName(filename, mime) {
    // Sugestao inicial de nome, mantendo a extensao do arquivo original.
    const originalExt = filename.match(/\.[^.]+$/);
    const ext = originalExt ? originalExt[0] : mime === 'image/jpeg' ? '.jpg' : mime === 'image/png' ? '.png' : '.webp';
    return `${fileBaseName(filename)}-compressed${ext}`;
  }

  function normalizedOutputName(item) {
    // Garante nome seguro e extensao coerente antes de download/ZIP.
    const fallback = compressedName(item.file.name, item.file.type);
    const ext = extensionFor(item.file);
    const raw = String(item.outputName || '').trim();
    const safeName = sanitizeFilename(raw || fallback);
    if (!safeName || safeName === ext) return fallback;
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

  function hasExtension(filename, ext) {
    return filename.toLowerCase().endsWith(ext);
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

  window.initCompressor = initCompressor;
})();
