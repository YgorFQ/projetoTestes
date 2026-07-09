(function () {
  const api = window.SenkoSources;
  // Marcadores usados apenas no modo Base.html para localizar o slot real de PDP.
  const SLOT_MARKER_PARTS = ['begin specialespot_content1_offers'];
  const INNER_BASE_MARKER_PARTS = ['codigo base', 'sempre copiar abaixo'];
  let baseTemplate = '';

  function initPictureTool() {
    // Entrada principal: atualiza o contador visual de imagens enquanto o usuario cola HTML.
    api.$('html-input').addEventListener('input', updateHtmlHint);

    api.$('source-multiplier').addEventListener('change', refreshAllCards);
    api.$('skip-last-multiplier').addEventListener('change', refreshAllCards);
    api.$('source-breakpoints').addEventListener('change', runAnalysis);
    api.$('measurement-mode').addEventListener('change', () => {
      updateMeasurementModeUI();
      updateMeasureButtonState();
    });
    api.$('base-html-input').addEventListener('change', handleBaseImport);

    api.$('btn-clear').addEventListener('click', () => {
      api.$('html-input').value = '';
      updateHtmlHint();
      resetPictureOutput();
    });

    api.$('btn-run').addEventListener('click', runAnalysis);
    api.$('btn-auto-measure').addEventListener('click', autoMeasure);
    api.$('btn-select-all').addEventListener('click', selectAllCards);
    api.$('btn-build-final').addEventListener('click', buildFinalContent);
    api.$('btn-copy-final').addEventListener('click', copyFinalContent);

    // Garante que a interface comece no modo Padrao, escondendo o importador de Base.html.
    updateMeasurementModeUI();
  }

  function updateHtmlHint() {
    const count = (api.$('html-input').value.match(/<img[\s>]/gi) || []).length;
    api.$('hint').textContent = count + ' img' + (count !== 1 ? 's' : '');
  }

  function moveFinalOutputToEnd() {
    api.$('output').appendChild(api.$('final-output'));
  }

  function resetPictureOutput() {
    // Limpa apenas o estado da aba Sources; o compressor e independente.
    api.queryAll('#output .card, #output .error').forEach(el => el.remove());
    api.$('empty').style.display = 'flex';
    api.$('final-output').classList.add('is-hidden');
    api.$('final-code').textContent = '';
    api.$('out-badge').textContent = '-';
    updateMeasureButtonState();
    updateFinalButtons();
    api.setStatus('', 'aguardando');
  }

  function runAnalysis() {
    const html = api.$('html-input').value.trim();
    if (!html) return;

    api.$('btn-run').disabled = true;
    api.setStatus('busy', 'analisando...');
    api.$('empty').style.display = 'none';
    api.queryAll('#output .card, #output .error').forEach(el => el.remove());
    api.$('final-output').classList.add('is-hidden');
    api.$('final-code').textContent = '';

    try {
      const tmp = document.createElement('div');
      tmp.innerHTML = html;

      // A ordem dessas imagens vira o identificador usado para cards e substituicao final.
      const imgs = Array.from(tmp.querySelectorAll('img'));
      if (!imgs.length) {
        showPictureError('Nenhuma <img> encontrada no HTML.');
        return;
      }

      const config = getSourceConfig();
      api.$('out-badge').textContent = imgs.length + ' img' + (imgs.length !== 1 ? 's' : '');
      imgs.forEach((img, index) => api.$('output').appendChild(buildPictureCard(collectMeta(img), index, config)));
      moveFinalOutputToEnd();
      updateMeasureButtonState();
      updateFinalButtons();
      api.setStatus('ok', imgs.length + ' imgs encontradas');
    } catch (error) {
      showPictureError('Erro: ' + error.message);
      console.error(error);
    } finally {
      api.$('btn-run').disabled = false;
    }
  }

  function getSourceConfig() {
    // Breakpoints digitados pelo usuario viram a base dos campos de cada card.
    const breakpoints = parseBreakpoints(api.$('source-breakpoints').value);
    if (!breakpoints.length) {
      throw new Error('Informe ao menos um breakpoint para analisar.');
    }

    return {
      breakpoints,
      multiplier: Number(api.$('source-multiplier').value) || 1.9,
      skipLastMultiplier: api.$('skip-last-multiplier').checked,
    };
  }

  function handleBaseImport(event) {
    const file = event.target.files && event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      // O Base.html fica somente em memoria; nenhum arquivo e gravado pelo app.
      baseTemplate = String(reader.result || '');
      api.$('base-file-name').textContent = file.name;
      updateMeasureButtonState();
      api.setStatus('ok', 'base importada');
    };
    reader.onerror = () => {
      baseTemplate = '';
      api.$('base-file-name').textContent = 'erro ao ler base';
      updateMeasureButtonState();
      api.setStatus('', 'erro na base');
    };
    reader.readAsText(file);
  }

  function updateMeasureButtonState() {
    // No modo Padrao basta ter cards. No modo Base.html tambem precisa da base importada.
    const hasCards = Boolean(api.query('#output .card'));
    const needsBase = getMeasurementMode() === 'base';
    api.$('btn-auto-measure').disabled = !hasCards || (needsBase && !baseTemplate);
  }

  function updateMeasurementModeUI() {
    api.$('base-file-group').classList.toggle('is-hidden', getMeasurementMode() !== 'base');
  }

  function getMeasurementMode() {
    return api.$('measurement-mode').value;
  }

  function parseBreakpoints(value) {
    // Aceita virgula, espaco e ponto e virgula para facilitar colagem de listas.
    const parsed = [...new Set(String(value || '')
      .split(/[,\s;]+/)
      .map(part => parseInt(part.replace(/\D/g, ''), 10))
      .filter(bp => Number.isInteger(bp) && bp > 0))]
      .sort((a, b) => a - b);

    return parsed;
  }

  function collectMeta(img) {
    // Coleta somente o necessario para reconstruir a imagem final sem perder atributos uteis.
    const picture = img.closest('picture');
    const sourceNodes = collectSourceNodesForImage(img);
    const rawSrc = img.getAttribute('src') || '';
    const meta = {
      src: cleanUrl(rawSrc),
      alt: img.getAttribute('alt') || '',
      cls: img.getAttribute('class') || '',
      loading: img.getAttribute('loading') || 'lazy',
      width: img.getAttribute('width') || '',
      height: img.getAttribute('height') || '',
      hasPicture: !!picture || sourceNodes.length > 0,
      sources: [],
      attrs: collectImgAttributes(img),
    };

    if (sourceNodes.length) {
      // Sources originais com max-width sao tratados como pontos de troca de imagem.
      meta.sources = sourceNodes
        .map(sourceMetaFromNode)
        .filter(source => source.bp !== null && source.url)
        .sort((a, b) => a.bp - b.bp);
    }

    return meta;
  }

  function collectSourceNodesForImage(img) {
    const picture = img.closest('picture');
    const wrapper = picture || img;
    const orphanSources = collectAdjacentSourceNodes(wrapper);
    const pictureSources = picture ? Array.from(picture.querySelectorAll('source')) : [];
    return [...orphanSources, ...pictureSources];
  }

  function collectAdjacentSourceNodes(node) {
    const sources = [];
    let current = node.previousSibling;

    while (current) {
      if (isIgnorableWhitespace(current) || current.nodeType === Node.COMMENT_NODE) {
        current = current.previousSibling;
        continue;
      }

      if (!isSourceElement(current)) break;
      sources.unshift(current);
      current = current.previousSibling;
    }

    return sources;
  }

  function sourceMetaFromNode(source) {
    const media = source.getAttribute('media') || '';
    const match = media.match(/max-width\s*:\s*(\d+(?:\.\d+)?)px/i);
    const rawSrcset = source.getAttribute('srcset') || '';
    const url = cleanUrl(firstSrcsetUrl(rawSrcset));
    return {
      bp: match ? Math.round(Number(match[1])) : null,
      url,
      media,
    };
  }

  function firstSrcsetUrl(srcset) {
    const candidate = String(srcset || '')
      .split(',')
      .map(part => part.trim())
      .find(Boolean) || '';
    return candidate.split(/\s+/)[0] || '';
  }

  function isSourceElement(node) {
    return node && node.nodeType === Node.ELEMENT_NODE && node.tagName.toLowerCase() === 'source';
  }

  function collectImgAttributes(img) {
    // Mantem atributos extras como style e fetchpriority sem duplicar os controlados pelo gerador.
    const handled = new Set(['src', 'srcset', 'class', 'alt', 'width', 'height', 'loading', 'decoding']);
    return Array.from(img.attributes)
      .filter(attr => !handled.has(attr.name.toLowerCase()) && !attr.name.toLowerCase().startsWith('data-imgscope-'))
      .map(attr => ({ name: attr.name, value: attr.value }));
  }

  function cleanUrl(url) {
    return String(url || '').split('?')[0];
  }

  function buildPictureCard(meta, index, config) {
    const card = document.createElement('div');
    card.className = 'card';
    card._imgscopeMeta = meta;
    card._imgscopeIndex = index;

    const head = document.createElement('div');
    head.className = 'card__head';
    const hasPicture = meta.hasPicture && meta.sources.length > 0;
    const badge = hasPicture ? '<span class="badge-pic">PICTURE</span>' : '';
    head.innerHTML = `
      <input class="card__check" type="checkbox" aria-label="Selecionar IMG ${index + 1}" data-card-select>
      <div class="card__idx">IMG ${index + 1}${badge}</div>
      <div class="card__meta">
        <div class="card__alt">${api.esc(meta.alt || '(sem alt)')}</div>
        <div class="card__src">${api.esc((meta.src || '').substring(0, 90))}</div>
      </div>
      <svg class="card__chevron" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="4,6 8,10 12,6"/></svg>
    `;

    const body = document.createElement('div');
    body.className = 'card__body';
    const inner = document.createElement('div');
    inner.className = 'card__body-inner';

    // Cada card recebe os breakpoints globais mais os pontos originais de troca de imagem.
    const breakpoints = cardBreakpoints(meta, config.breakpoints);
    inner.appendChild(makeMeasureSection(card, meta, breakpoints));
    inner.appendChild(makeDynamicOutputSection(card));

    body.appendChild(inner);
    card.appendChild(head);
    card.appendChild(body);

    head.addEventListener('click', () => {
      const isOpen = card.classList.contains('open');
      api.queryAll('.card.open').forEach(openCard => openCard.classList.remove('open'));
      if (!isOpen) card.classList.add('open');
    });
    head.querySelector('[data-card-select]').addEventListener('click', event => {
      event.stopPropagation();
      card.classList.toggle('is-selected', event.target.checked);
      updateFinalButtons();
    });

    if (index === 0) card.classList.add('open');
    updateCardOutput(card);
    return card;
  }

  function cardBreakpoints(meta, baseBreakpoints) {
    const sourceBreakpoints = meta.sources.map(source => source.bp);
    return [...new Set([...baseBreakpoints, ...sourceBreakpoints])].sort((a, b) => a - b);
  }

  function makeMeasureSection(card, meta, breakpoints) {
    const section = document.createElement('div');
    section.className = 'measure-section';

    // Breakpoints de source original aparecem marcados como "troca" na interface.
    const sourceBreakpoints = new Set(meta.sources.map(source => source.bp));
    section.innerHTML = `
      <div class="measure-section__head">
        <span>medidas reais da caixa</span>
        <span class="measure-section__note">preencha com a largura vista no F12</span>
      </div>
      <div class="measure-grid">
        ${breakpoints.map(bp => `
          <label class="measure-cell ${sourceBreakpoints.has(bp) ? 'measure-cell--source' : ''}">
            <span class="measure-cell__bp">${bp}px${sourceBreakpoints.has(bp) ? ' troca' : ''}</span>
            <input class="measure-cell__input" data-measure-bp="${bp}" type="number" min="1" step="0.001" placeholder="medida">
            <span class="measure-cell__calc" data-calc-bp="${bp}">?ims=-</span>
          </label>
        `).join('')}
      </div>
    `;

    section.querySelectorAll('[data-measure-bp]').forEach(input => {
      input.addEventListener('input', () => updateCardOutput(card));
    });

    return section;
  }

  function makeDynamicOutputSection(card) {
    const section = document.createElement('div');
    section.className = 'out-section';

    const labelEl = document.createElement('div');
    labelEl.className = 'out-section__label';
    labelEl.innerHTML = '<span>picture gerado</span>';

    const button = document.createElement('button');
    button.className = 'copy-btn';
    button.textContent = 'copiar';
    button.addEventListener('click', () => {
      const content = card.querySelector('[data-generated-code]').textContent;
      navigator.clipboard.writeText(content).then(() => {
        button.textContent = 'copiado';
        button.classList.add('copied');
        setTimeout(() => {
          button.textContent = 'copiar';
          button.classList.remove('copied');
        }, 1800);
      });
    });

    const code = document.createElement('div');
    code.className = 'code';
    code.dataset.generatedCode = 'true';

    labelEl.appendChild(button);
    section.appendChild(labelEl);
    section.appendChild(code);
    return section;
  }

  function refreshAllCards() {
    api.queryAll('#output .card').forEach(updateCardOutput);
  }

  function selectAllCards() {
    api.queryAll('#output .card').forEach(card => {
      const checkbox = card.querySelector('[data-card-select]');
      if (!checkbox) return;

      checkbox.checked = true;
      card.classList.add('is-selected');
    });
    updateFinalButtons();
  }

  async function autoMeasure() {
    const html = api.$('html-input').value.trim();
    if (!html) return;
    const measurementMode = getMeasurementMode();
    if (measurementMode === 'base' && !baseTemplate) {
      showPictureError('Importe o Base.html antes de medir automaticamente.');
      return;
    }

    const cards = Array.from(api.queryAll('#output .card'));
    if (!cards.length) {
      showPictureError('Clique em Analisar antes de medir automaticamente.');
      return;
    }

    let iframe;
    try {
      api.$('btn-auto-measure').disabled = true;
      api.setStatus('busy', 'medindo...');

      const config = getSourceConfig();
      // A anotacao permite mapear a mesma imagem entre HTML original, card e iframe.
      const annotatedHtml = annotateRichHtml(html);
      const measurementDoc = measurementMode === 'base'
        ? injectContentIntoBase(baseTemplate, annotatedHtml)
        : createStandardMeasurementDoc(annotatedHtml);
      iframe = createMeasurementFrame(measurementDoc);
      await waitForFrameLoad(iframe);

      // Mede todos os campos visiveis, incluindo breakpoints adicionados por <source> original.
      const measurementBreakpoints = collectVisibleMeasureBreakpoints(cards);
      const matrix = await measureImagesAtBreakpoints(iframe, measurementBreakpoints);
      applyMeasurementsToCards(cards, matrix);
      api.setStatus('ok', 'medidas preenchidas');
    } catch (error) {
      showPictureError('Erro na medicao automatica: ' + error.message);
      console.error(error);
    } finally {
      if (iframe) iframe.remove();
      updateMeasureButtonState();
    }
  }

  function injectContentIntoBase(baseHtml, richHtml) {
    // Modo Base.html: usa DOMParser para substituir o conteudo do slot sem manter lixo antigo.
    const parser = new DOMParser();
    const doc = parser.parseFromString(baseHtml, 'text/html');
    const markerComment = findSlotComment(doc);
    if (!markerComment) {
      throw new Error('Marcador Begin SPECIALESPOT_CONTENT1_OFFERS nao encontrado no Base.html.');
    }

    const slot = nextElementAfter(markerComment);
    if (!slot || slot.tagName.toLowerCase() !== 'div') {
      throw new Error('Div de colagem nao encontrada apos Begin SPECIALESPOT_CONTENT1_OFFERS.');
    }

    slot.id = '__imgscope-measure-slot';
    clearGeneratedContentFromSlot(slot);
    slot.insertAdjacentHTML('beforeend', `\n${richHtml}\n`);
    return '<!DOCTYPE html>\n' + doc.documentElement.outerHTML;
  }

  function createStandardMeasurementDoc(richHtml) {
    // Modo Padrao: simula area util de 1248px com 16px externos de respiro.
    return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    html,
    body {
      margin: 0;
      padding: 0;
      width: 100%;
      background: #ffffff;
    }

    .imgscope-standard-shell {
      width: 100%;
      max-width: 1280px;
      margin: 0 auto;
      padding-left: 16px;
      padding-right: 16px;
      box-sizing: border-box;
    }

    #__imgscope-measure-slot {
      width: 100%;
    }
  </style>
</head>
<body>
  <div class="imgscope-standard-shell">
    <div id="__imgscope-measure-slot">
${richHtml}
    </div>
  </div>
</body>
</html>`;
  }

  function collectVisibleMeasureBreakpoints(cards) {
    // A medicao segue o que existe na UI, nao apenas o campo global de breakpoints.
    return [...new Set(cards.flatMap(card => {
      return Array.from(card.querySelectorAll('[data-measure-bp]'))
        .map(input => Number(input.dataset.measureBp))
        .filter(bp => Number.isInteger(bp) && bp > 0);
    }))].sort((a, b) => a - b);
  }

  function annotateRichHtml(richHtml) {
    // Os indices sao temporarios e nao entram no output final gerado para o usuario.
    const template = document.createElement('template');
    template.innerHTML = richHtml;
    template.content.querySelectorAll('img').forEach((img, index) => {
      img.setAttribute('data-imgscope-index', String(index));
    });
    return template.innerHTML;
  }

  function findSlotComment(doc) {
    const walker = doc.createTreeWalker(doc, NodeFilter.SHOW_COMMENT);
    let node = walker.nextNode();
    while (node) {
      const text = normalizeText(node.nodeValue);
      if (SLOT_MARKER_PARTS.every(part => text.includes(part))) return node;
      node = walker.nextNode();
    }
    return null;
  }

  function clearGeneratedContentFromSlot(slot) {
    // Preserva comentarios de base e remove apenas o conteudo antigo que seria substituido.
    const children = Array.from(slot.childNodes);
    const lastBaseComment = findLastBaseComment(children);
    const startIndex = lastBaseComment ? children.indexOf(lastBaseComment) + 1 : 0;

    children.slice(startIndex).forEach(node => {
      if (isIgnorableWhitespace(node)) return;
      node.remove();
    });
  }

  function findLastBaseComment(nodes) {
    let found = null;
    nodes.forEach(node => {
      if (node.nodeType !== Node.COMMENT_NODE) return;
      const text = normalizeText(node.nodeValue);
      const isBase = INNER_BASE_MARKER_PARTS.every(part => text.includes(part))
        || SLOT_MARKER_PARTS.every(part => text.includes(part));
      if (isBase) found = node;
    });
    return found;
  }

  function isIgnorableWhitespace(node) {
    return node.nodeType === Node.TEXT_NODE && !String(node.nodeValue || '').trim();
  }

  function normalizeText(value) {
    return String(value || '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();
  }

  function nextElementAfter(node) {
    let current = node;
    while (current) {
      if (current.nextElementSibling) return current.nextElementSibling;
      current = current.parentElement;
    }
    return null;
  }

  function createMeasurementFrame(srcdoc) {
    // O iframe fica fora da tela, mas renderizado; isso torna getBoundingClientRect confiavel.
    const iframe = document.createElement('iframe');
    iframe.setAttribute('aria-hidden', 'true');
    iframe.style.position = 'absolute';
    iframe.style.left = '-10000px';
    iframe.style.top = '0';
    iframe.style.width = '320px';
    iframe.style.height = '9000px';
    iframe.style.border = '0';
    iframe.style.opacity = '0';
    iframe.style.pointerEvents = 'none';
    iframe.srcdoc = srcdoc;
    document.body.appendChild(iframe);
    return iframe;
  }

  function waitForFrameLoad(iframe) {
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => reject(new Error('Tempo esgotado ao carregar a base.')), 8000);
      iframe.addEventListener('load', async () => {
        clearTimeout(timeout);
        await waitForLayout(iframe);
        resolve();
      }, { once: true });
    });
  }

  async function measureImagesAtBreakpoints(iframe, breakpoints) {
    // Para cada largura, espera o layout estabilizar e mede todas as imagens anotadas.
    const matrix = [];

    for (const bp of breakpoints) {
      iframe.style.width = `${bp}px`;
      await waitForLayout(iframe);

      const doc = iframe.contentDocument;
      const slot = doc && doc.getElementById('__imgscope-measure-slot');
      if (!slot) throw new Error('Slot de medicao nao foi encontrado dentro da base.');

      const imgs = Array.from(slot.querySelectorAll('img[data-imgscope-index]'));
      imgs.forEach(img => {
        const index = Number(img.getAttribute('data-imgscope-index'));
        if (!Number.isInteger(index)) return;
        if (!matrix[index]) matrix[index] = {};
        matrix[index][bp] = roundMeasure(measureImageContentWidth(img));
      });
    }

    return matrix;
  }

  function measureImageContentWidth(img) {
    // getBoundingClientRect inclui padding/borda; descontamos para obter a area util da imagem.
    const rectWidth = img.getBoundingClientRect().width;
    const styles = img.ownerDocument.defaultView.getComputedStyle(img);
    const horizontalSpace =
      parseCssPx(styles.paddingLeft) +
      parseCssPx(styles.paddingRight) +
      parseCssPx(styles.borderLeftWidth) +
      parseCssPx(styles.borderRightWidth);

    return Math.max(0, rectWidth - horizontalSpace);
  }

  function parseCssPx(value) {
    const parsed = parseFloat(value);
    return Number.isFinite(parsed) ? parsed : 0;
  }

  async function waitForLayout(iframe) {
    // Dois frames cobrem recalculo de layout; fonts.ready evita diferenca por fonte atrasada.
    await new Promise(resolve => requestAnimationFrame(resolve));
    await new Promise(resolve => requestAnimationFrame(resolve));

    const doc = iframe.contentDocument;
    if (doc && doc.fonts && doc.fonts.ready) {
      await Promise.race([
        doc.fonts.ready.catch(() => {}),
        new Promise(resolve => setTimeout(resolve, 350)),
      ]);
    }
  }

  function roundMeasure(value) {
    if (!Number.isFinite(value)) return '';
    return String(Math.round(value * 1000) / 1000);
  }

  function applyMeasurementsToCards(cards, matrix) {
    // Preenche inputs existentes; se um card nao tem aquele breakpoint, ele e ignorado.
    cards.forEach((card, index) => {
      const measurements = matrix[index] || {};
      Object.entries(measurements).forEach(([bp, value]) => {
        const input = card.querySelector(`[data-measure-bp="${bp}"]`);
        if (input) input.value = value;
      });
      updateCardOutput(card);
    });
  }

  function updateCardOutput(card) {
    // Toda alteracao de medida ou multiplicador recalcula imediatamente o picture do card.
    const meta = card._imgscopeMeta;
    const config = getSourceConfig();
    const measureRows = Array.from(card.querySelectorAll('[data-measure-bp]'))
      .map(input => ({
        bp: Number(input.dataset.measureBp),
        measured: Number(String(input.value || '').replace(',', '.')),
      }))
      .filter(row => Number.isInteger(row.bp) && row.bp > 0)
      .sort((a, b) => a.bp - b.bp);
    const measuredRows = measureRows.filter(row => row.measured > 0);
    const lastMeasureBp = measuredRows.length ? measuredRows[measuredRows.length - 1].bp : null;

    const entries = measureRows
      .map(row => {
        const skipMultiplier = config.skipLastMultiplier && row.bp === lastMeasureBp;
        const ims = row.measured > 0
          ? Math.ceil(skipMultiplier ? row.measured : row.measured * config.multiplier)
          : null;
        const calc = card.querySelector(`[data-calc-bp="${row.bp}"]`);
        if (calc) calc.textContent = ims ? `?ims=${ims}x` : '?ims=-';
        return { bp: row.bp, measured: row.measured, ims };
      })
      .filter(entry => entry.ims)
      .sort((a, b) => a.bp - b.bp);

    const code = card.querySelector('[data-generated-code]');
    if (!entries.length) {
      card._generatedPicture = '';
      code.textContent = 'Preencha ao menos uma medida para gerar o <picture>.';
      updateFinalButtons();
      return;
    }

    card._generatedPicture = generatePicture(meta, entries);
    code.textContent = card._generatedPicture;
    updateFinalButtons();
  }

  function updateFinalButtons() {
    const cards = Array.from(api.queryAll('#output .card'));
    const selectedReady = getSelectedReadyCards();
    api.$('btn-select-all').disabled = !cards.length;
    api.$('btn-build-final').disabled = !selectedReady.length;
    api.$('btn-copy-final').disabled = !api.$('final-code').textContent.trim();
  }

  function getSelectedReadyCards() {
    return Array.from(api.queryAll('#output .card'))
      .filter(card => {
        const checked = card.querySelector('[data-card-select]')?.checked;
        return checked && card._generatedPicture;
      });
  }

  function buildFinalContent() {
    // Consolida o HTML original substituindo somente os cards marcados no checkbox.
    const html = api.$('html-input').value.trim();
    const selectedCards = getSelectedReadyCards();
    if (!html || !selectedCards.length) return;

    try {
      const tmp = document.createElement('div');
      tmp.innerHTML = html;
      const imgs = Array.from(tmp.querySelectorAll('img'));

      selectedCards
        .sort((a, b) => b._imgscopeIndex - a._imgscopeIndex)
        .forEach(card => {
          const target = imgs[card._imgscopeIndex];
          if (!target) return;

          const replacement = document.createElement('template');
          replacement.innerHTML = card._generatedPicture.trim();
          const replaceTarget = target.closest('picture') || target;
          removeAdjacentOrphanSources(replaceTarget);
          replaceTarget.replaceWith(replacement.content.cloneNode(true));
        });

      cleanupNestedPictures(tmp);
      api.$('final-code').textContent = tmp.innerHTML.trim();
      moveFinalOutputToEnd();
      api.$('final-output').classList.remove('is-hidden');
      updateFinalButtons();
      api.setStatus('ok', 'conteudo final gerado');
    } catch (error) {
      showPictureError('Erro ao gerar conteudo final: ' + error.message);
      console.error(error);
    }
  }

  function copyFinalContent() {
    const content = api.$('final-code').textContent;
    if (!content.trim()) return;

    navigator.clipboard.writeText(content).then(() => {
      api.$('btn-copy-final').textContent = 'copiado';
      api.$('btn-copy-final').classList.add('copied');
      setTimeout(() => {
        api.$('btn-copy-final').textContent = 'copiar';
        api.$('btn-copy-final').classList.remove('copied');
      }, 1800);
    });
  }

  function removeAdjacentOrphanSources(node) {
    const removable = [];
    let current = node.previousSibling;

    while (current) {
      if (isIgnorableWhitespace(current) || current.nodeType === Node.COMMENT_NODE) {
        removable.push(current);
        current = current.previousSibling;
        continue;
      }

      if (!isSourceElement(current)) break;
      removable.push(current);
      current = current.previousSibling;
    }

    if (removable.some(isSourceElement)) {
      removable.forEach(item => item.remove());
    }
  }

  function cleanupNestedPictures(root) {
    Array.from(root.querySelectorAll('picture picture')).forEach(innerPicture => {
      const outerPicture = closestParentPicture(innerPicture);
      if (outerPicture) outerPicture.replaceWith(innerPicture.cloneNode(true));
    });
  }

  function closestParentPicture(node) {
    let current = node.parentElement;
    while (current) {
      if (current.tagName.toLowerCase() === 'picture') return current;
      current = current.parentElement;
    }
    return null;
  }

  function generatePicture(meta, entries) {
    // Decide qual URL usar por breakpoint: source original ate seu limite, img depois dele.
    const imgSrc = meta.src;
    const originalSources = meta.hasPicture ? meta.sources : [];
    const originalBreakpoints = new Set(originalSources.map(source => source.bp));

    function getUrl(bp) {
      for (const source of originalSources) {
        if (bp <= source.bp) return source.url;
      }
      return imgSrc;
    }

    let html = '<picture>\n';

    for (const entry of entries) {
      const comment = originalBreakpoints.has(entry.bp) ? ' <!-- troca de imagem -->' : '';
      html += `  <source media="(max-width: ${entry.bp}px)" srcset="${getUrl(entry.bp)}?ims=${entry.ims}x">${comment}\n`;
    }

    html += '  <img\n';
    if (meta.cls) html += `    class="${api.esc(meta.cls)}"\n`;
    html += `    src="${imgSrc}"\n`;
    html += `    alt="${api.esc(meta.alt) || '!!COLOQUE O ALT AQUI!!'}"\n`;
    if (meta.width) html += `    width="${meta.width}"\n`;
    if (meta.height) html += `    height="${meta.height}"\n`;
    meta.attrs.forEach(attr => {
      html += `    ${attr.name}="${api.esc(attr.value)}"\n`;
    });
    html += `    loading="${meta.loading}"\n`;
    html += '    decoding="async"\n';
    html += '  >\n';
    html += '</picture>';
    return html;
  }

  function showPictureError(message) {
    const el = document.createElement('div');
    el.className = 'error';
    el.textContent = message;
    api.$('output').appendChild(el);
    api.setStatus('', 'erro');
    updateFinalButtons();
    api.$('btn-run').disabled = false;
  }

  api.initPictureTool = initPictureTool;
})();
