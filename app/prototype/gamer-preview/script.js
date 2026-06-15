(function () {
  const api = window.SenkoGamerPreview = window.SenkoGamerPreview || {};
  const currentScript = document.currentScript;
  const FEATURE_BASE_URL = currentScript && currentScript.src
    ? new URL('./', currentScript.src).href
    : new URL('app/prototype/gamer-preview/', document.baseURI).href;
  const RAW_BASE_TEMPLATE_URL = new URL('../gamer-base.html', FEATURE_BASE_URL).href;
  const BASE_TEMPLATE_URL = window.SenkoFreshAssets
    ? window.SenkoFreshAssets.url(RAW_BASE_TEMPLATE_URL)
    : RAW_BASE_TEMPLATE_URL;
  const DEFAULT_CONTENT = '<section style="padding: 48px 16px; text-align: center; font-family: Arial, sans-serif;">\n  <h2>Preview GAMER</h2>\n</section>';
  const CONTAINMENT_STYLE_ID = 'senkolib-gamer-containment';
  const CONTAINMENT_CSS = `
    html,
    body {
      width: 100vw !important;
      min-width: 100vw !important;
      max-width: 100% !important;
      margin: 0 !important;
      overflow-x: hidden !important;
      scrollbar-width: none !important;
      -ms-overflow-style: none !important;
    }

    html::-webkit-scrollbar,
    body::-webkit-scrollbar {
      width: 0 !important;
      height: 0 !important;
      display: none !important;
    }

    .duxKpV {
      width: 100% !important;
      max-width: 100% !important;
      padding-left: 16px !important;
      padding-right: 16px !important;
      box-sizing: border-box !important;
    }

    .duxKpV > .iJZNOA,
    .duxKpV .iJZNOA,
    .duxKpV [data-testid="detalheProduto"] {
      display: block !important;
      width: 100% !important;
      max-width: 100% !important;
      min-width: 0 !important;
      box-sizing: border-box !important;
    }

    .GAMER,
    .gamer {
      position: relative !important;
      display: block !important;
      width: 100% !important;
      max-width: 100% !important;
      overflow-x: hidden !important;
      box-sizing: border-box !important;
    }

    .GAMER *,
    .GAMER *::before,
    .GAMER *::after,
    .gamer *,
    .gamer *::before,
    .gamer *::after {
      box-sizing: border-box !important;
    }

    .GAMER > *,
    .gamer > * {
      width: 100% !important;
      max-width: 100% !important;
      min-width: 0 !important;
    }

    .GAMER > .senkolib-gamer-model,
    .GAMER .lp-container,
    .gamer > .senkolib-gamer-model,
    .gamer .lp-container {
      display: block !important;
      width: 100% !important;
      max-width: 100% !important;
      min-width: 0 !important;
      box-sizing: border-box !important;
    }

    .GAMER picture,
    .gamer picture {
      display: block !important;
      width: 100% !important;
      max-width: 100% !important;
      min-width: 0 !important;
      box-sizing: border-box !important;
    }

    .GAMER img,
    .GAMER picture,
    .GAMER video,
    .GAMER canvas,
    .GAMER svg,
    .GAMER iframe,
    .gamer img,
    .gamer picture,
    .gamer video,
    .gamer canvas,
    .gamer svg,
    .gamer iframe {
      display: block !important;
      max-width: 100% !important;
    }

    .GAMER img,
    .GAMER video,
    .gamer img,
    .gamer video {
      height: auto !important;
    }

    .GAMER table,
    .gamer table {
      max-width: 100% !important;
      table-layout: fixed !important;
    }

    .GAMER pre,
    .GAMER code,
    .gamer pre,
    .gamer code {
      white-space: pre-wrap !important;
      word-break: break-word !important;
    }

    .GAMER *::-webkit-scrollbar:horizontal,
    .gamer *::-webkit-scrollbar:horizontal {
      display: none !important;
    }
  `;

  let baseTemplate = '';
  let lastRenderedHtml = '';
  let viewportWidth = 1024;
  let viewportRenderTimer = 0;

  const els = {};

  api.setRoot = function setRoot(root) {
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

  function bindElements() {
    Object.assign(els, {
      input: api.$('content-input'),
      stage: api.query('.preview-stage'),
      viewport: api.$('preview-viewport'),
      frame: api.$('preview-frame'),
      range: api.$('viewport-range'),
      widthLabel: api.$('width-label'),
      status: api.$('status'),
      render: api.$('btn-render'),
      clear: api.$('btn-clear'),
      copy: api.$('btn-copy'),
      presets: api.queryAll('[data-width]'),
    });
  }

  api.init = function init(root) {
    api.setRoot(root);
    bindElements();
    els.input.value = DEFAULT_CONTENT;
    els.render.addEventListener('click', renderPreview);
    els.clear.addEventListener('click', clearContent);
    els.copy.addEventListener('click', copyFinalHtml);
    els.range.addEventListener('input', () => setViewportWidth(Number(els.range.value)));
    window.addEventListener('resize', fitPreviewToStage);
    els.frame.addEventListener('load', fitPreviewToStage);
    els.input.addEventListener('keydown', event => {
      if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
        event.preventDefault();
        renderPreview();
      }
    });

    els.presets.forEach(button => {
      button.addEventListener('click', () => setViewportWidth(Number(button.dataset.width)));
    });

    setViewportWidth(Number(els.range.value));
    if (window.ResizeObserver) {
      new ResizeObserver(fitPreviewToStage).observe(els.stage);
    }
    loadBaseTemplate();
  };

  async function loadBaseTemplate() {
    setStatus('carregando base', '');

    try {
      const response = await fetch(BASE_TEMPLATE_URL, { cache: 'no-cache' });
      if (!response.ok) throw new Error('HTTP ' + response.status);

      baseTemplate = await response.text();
      assertGamerSlot(baseTemplate);
      setStatus('base pronta', 'is-ok');
      renderPreview();
    } catch (error) {
      console.error(error);
      setStatus('erro na base', 'is-error');
      els.copy.disabled = true;
      els.frame.srcdoc = errorDocument('Nao foi possivel carregar a base GAMER.');
    }
  }

  function renderPreview() {
    if (!baseTemplate) return;

    try {
      lastRenderedHtml = injectContentIntoGamer(baseTemplate, els.input.value);
      els.frame.srcdoc = lastRenderedHtml;
      els.copy.disabled = false;
      setStatus('preview atualizado', 'is-ok');
      requestAnimationFrame(fitPreviewToStage);
    } catch (error) {
      console.error(error);
      els.copy.disabled = true;
      setStatus('erro no preview', 'is-error');
      els.frame.srcdoc = errorDocument(error.message);
    }
  }

  function clearContent() {
    els.input.value = '';
    renderPreview();
  }

  async function copyFinalHtml() {
    if (!lastRenderedHtml.trim()) return;

    try {
      await navigator.clipboard.writeText(lastRenderedHtml);
      els.copy.textContent = 'Copiado';
      setTimeout(() => {
        els.copy.textContent = 'Copiar HTML final';
      }, 1600);
    } catch (error) {
      console.error(error);
      setStatus('erro ao copiar', 'is-error');
    }
  }

  function setViewportWidth(width) {
    const nextWidth = clamp(width, 320, 1440);
    viewportWidth = nextWidth;
    els.range.value = String(nextWidth);
    els.widthLabel.textContent = nextWidth + 'px';
    els.frame.style.width = nextWidth + 'px';
    fitPreviewToStage();

    els.presets.forEach(button => {
      button.classList.toggle('is-active', Number(button.dataset.width) === nextWidth);
    });

    scheduleViewportRender();
  }

  function scheduleViewportRender() {
    if (!baseTemplate) return;

    clearTimeout(viewportRenderTimer);
    viewportRenderTimer = setTimeout(renderPreview, 220);
  }

  function fitPreviewToStage() {
    if (!els.stage || !els.viewport || !els.frame) return;

    const availableWidth = Math.max(320, els.stage.clientWidth - 2);
    const scale = Math.min(1, availableWidth / viewportWidth);
    const frameHeight = els.frame.offsetHeight || window.innerHeight;

    els.frame.style.transform = 'scale(' + scale + ')';
    els.viewport.style.width = Math.ceil(viewportWidth * scale) + 'px';
    els.viewport.style.height = Math.ceil(frameHeight * scale) + 'px';
  }

  function injectContentIntoGamer(templateHtml, contentHtml) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(templateHtml, 'text/html');
    const slot = findGamerSlot(doc);
    if (!slot) throw new Error('Tag GAMER nao encontrada na base.');

    const modelNodes = collectModelNodes(slot);
    const contentFragment = createContentFragment(doc, contentHtml);

    slot.innerHTML = '';
    const model = doc.createElement('div');
    model.className = 'lp-container senkolib-gamer-model';
    modelNodes.forEach(node => model.appendChild(node.cloneNode(true)));
    model.appendChild(contentFragment);
    slot.appendChild(model);
    injectContainmentStyle(doc, slot);
    return '<!DOCTYPE html>\n' + doc.documentElement.outerHTML;
  }

  function collectModelNodes(slot) {
    const modelContainer = Array.from(slot.children).find(child => {
      return child.classList && Array.from(child.classList).some(name => name === 'lp-container');
    });
    const source = modelContainer || slot;

    return Array.from(source.children).filter(child => {
      const tagName = child.tagName && child.tagName.toLowerCase();
      return tagName === 'style' || tagName === 'link';
    });
  }

  function createContentFragment(doc, contentHtml) {
    const parser = new DOMParser();
    const parsed = parser.parseFromString(contentHtml, 'text/html');
    const pastedGamer = findGamerSlot(parsed);
    const source = pastedGamer || parsed.body;
    const fragment = doc.createDocumentFragment();

    Array.from(source.childNodes).forEach(node => {
      fragment.appendChild(doc.importNode(node, true));
    });

    return fragment;
  }

  function injectContainmentStyle(doc, slot) {
    const previous = doc.getElementById(CONTAINMENT_STYLE_ID);
    if (previous) previous.remove();

    const style = doc.createElement('style');
    style.id = CONTAINMENT_STYLE_ID;
    style.textContent = CONTAINMENT_CSS;
    (slot || doc.body || doc.head || doc.documentElement).appendChild(style);
  }

  function assertGamerSlot(templateHtml) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(templateHtml, 'text/html');
    if (!findGamerSlot(doc)) throw new Error('Tag GAMER nao encontrada na base.');
  }

  function findGamerSlot(root) {
    return Array.from(root.querySelectorAll('[class]')).find(element => {
      return Array.from(element.classList).some(name => name.toLowerCase() === 'gamer');
    }) || null;
  }

  function setStatus(text, className) {
    els.status.textContent = text;
    els.status.className = 'status' + (className ? ' ' + className : '');
  }

  function errorDocument(message) {
    return '<!DOCTYPE html><html><body style="margin:0;padding:32px;font-family:Arial,sans-serif;color:#b00020;background:#fff;">' +
      escapeHtml(message) +
      '</body></html>';
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, Number(value) || min));
  }

  document.addEventListener('DOMContentLoaded', function () {
    /*
     * Modo standalone para abrir o prototipo direto. No app principal, o
     * register.js monta a raiz e chama SenkoGamerPreview.init(shadowRoot).
     */
    if (!window.SenkoShell && document.querySelector('.prototype-shell')) {
      api.init(document);
    }
  });
})();
