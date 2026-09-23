(function (global) {
  /*
   * Regras puras do prototipo Teste.
   *
   * Este modulo nao conhece DOM, shell ou persistencia. Ele converte os pares,
   * audita destinos e gera o HTML final com as folhas de estilo oficiais.
   */
  var SITE_CONFIG = {
    efacil: {
      label: 'eFácil',
      canonical: 'https://www.efacil.com.br/produto-exemplo',
      hostPattern: /(^|\.)efacil\.com\.br$/i
    },
    martins: {
      label: 'Martins',
      canonical: 'https://www.martinsatacado.com.br/produto-exemplo',
      hostPattern: /(^|\.)martinsatacado\.com\.br$/i
    },
    generic: {
      label: 'Genérico',
      canonical: 'https://www.exemplo.com.br/produto-exemplo',
      hostPattern: null
    }
  };

  var FAQ_STYLESHEET_URLS = [
    'https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/style-faq-padrao-tecnica.css?v=1',
    'https://imgprd.martinsatacado.com.br/catalogoimg/catalogo/variacao-pdp.css?v=1'
  ];

  var FAQ_CSS = `/* Apoio visual do simulador para a estrutura usada em produção. */
[id="faq-section"],
[id="faq-section"] * {
  box-sizing: border-box;
}

[id="faq-section"] {
  width: 100%;
  margin: 0 auto 24px;
  font-family: Arial, sans-serif;
}

[id="faq-section__header"] {
  margin: 0 0 8px;
}

[id="faq-section__title"] {
  display: flex;
  align-items: center;
  width: 100%;
  min-height: 40px;
  margin: 0;
  padding: 8px 16px;
  border-radius: 4px;
  background-color: rgb(0, 157, 255);
  color: rgb(255, 255, 255);
  font-size: clamp(0.875rem, 1.2vw, 1rem);
  line-height: 1.5;
  font-weight: 400;
  overflow-wrap: anywhere;
}

[id="faq-section__list"] {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 0;
  padding: 0;
  list-style: none;
  align-items: stretch;
}

[id="faq-section__item"] {
  margin: 0;
  overflow: hidden;
  border: 1px solid #e5e5e5;
  border-radius: 12px;
  background-color: #ffffff;
}

[id="faq-section__details"] {
  width: 100%;
}

[id="faq-section__summary"] {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  width: 100%;
  padding: 16px;
  cursor: pointer;
  list-style: none;
  transition: background-color 0.15s ease;
}

[id="faq-section__summary"]::-webkit-details-marker {
  width: 0;
  height: 0;
  overflow: hidden;
  color: transparent;
}

[id="faq-section__summary"]::marker {
  content: "";
}

[id="faq-section__summary"]:hover,
[id="faq-section__details"][open] [id="faq-section__summary"] {
  background-color: #f9f9f9;
}

[id="faq-section__summary"]:focus-visible {
  border-radius: 11px;
  outline: 2px solid #ea5b0c;
  outline-offset: -2px;
}

[id="faq-section__q-text"] {
  flex: 1;
  margin: 0;
  color: #333333;
  font-size: clamp(0.875rem, 1.2vw, 1rem);
  font-weight: 700;
  line-height: 1.5;
  overflow-wrap: anywhere;
}

[id="faq-section__icon"] {
  position: relative;
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}

[id="faq-section__icon"]::before,
[id="faq-section__icon"]::after {
  position: absolute;
  border-radius: 2px;
  background-color: rgb(46, 53, 56);
  content: "";
  transition: transform 0.25s ease, opacity 0.25s ease;
}

[id="faq-section__icon"]::before {
  top: 9px;
  left: 4px;
  width: 12px;
  height: 2px;
}

[id="faq-section__icon"]::after {
  top: 4px;
  left: 9px;
  width: 2px;
  height: 12px;
}

[id="faq-section__details"][open] [id="faq-section__icon"]::after {
  opacity: 0;
  transform: rotate(90deg);
}

[id="faq-section__a-inner"] {
  padding: 16px;
  border-top: 1px solid #e5e5e5;
}

[id="faq-section__a-text"] {
  margin: 0;
  color: rgb(46, 53, 56);
  font-size: clamp(0.75rem, 1vw, 0.875rem);
  line-height: 1.6;
  overflow-wrap: anywhere;
}

/* Cada lista pertence a um destino; a genérica é o fallback. */
.for--efacil,
.for--martins {
  display: none !important;
}

.for--generic {
  display: block !important;
}

html:has(head link[rel="canonical"][href*="efacil.com.br"]) .for--efacil,
html:has(head link[rel="canonical"][href*="martinsatacado.com.br"]) .for--martins {
  display: block !important;
}

html:has(head link[rel="canonical"][href*="efacil.com.br"]) .for--generic,
html:has(head link[rel="canonical"][href*="martinsatacado.com.br"]) .for--generic {
  display: none !important;
}

@media (min-width: 768px) {
  [id="faq-section__summary"] {
    padding: 16px 24px;
  }

  [id="faq-section__a-inner"] {
    padding: 16px 24px 24px;
  }
}

@media (min-width: 1200px) {
  [id="faq-section__title"] {
    padding-inline: 24px;
  }
}`;

  function createEmptyData() {
    return { efacil: [], martins: [], generic: [] };
  }

  function normalizeCanonical(value, fallback) {
    var raw = String(value || '').trim();
    if (!raw) return fallback;
    try {
      var url = new URL(/^https?:\/\//i.test(raw) ? raw : 'https://' + raw);
      if (!/^https?:$/i.test(url.protocol)) return fallback;
      return url.href;
    } catch (error) {
      return fallback;
    }
  }

  function detectSiteFromCanonical(value) {
    var canonical = normalizeCanonical(value, SITE_CONFIG.generic.canonical);
    try {
      var hostname = new URL(canonical).hostname;
      if (SITE_CONFIG.efacil.hostPattern.test(hostname)) return 'efacil';
      if (SITE_CONFIG.martins.hostPattern.test(hostname)) return 'martins';
    } catch (error) {
      return 'generic';
    }
    return 'generic';
  }

  function escapeAttribute(value) {
    return String(value || '')
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  function stripHtml(value) {
    return String(value || '')
      .replace(/<[^>]*>/g, ' ')
      .replace(/&nbsp;/gi, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function parsePairs(markup) {
    var source = String(markup || '');
    var tokenPattern = /<(q|h3|a|p)\b[^>]*>([\s\S]*?)<\/\1\s*>/gi;
    var pairs = [];
    var diagnostics = [];
    var pendingQuestion = null;
    var match;

    while ((match = tokenPattern.exec(source))) {
      var tag = match[1].toLowerCase();
      var html = String(match[2] || '').trim();
      var isQuestion = tag === 'q' || tag === 'h3';

      if (isQuestion) {
        if (pendingQuestion) {
          pairs.push({ question: pendingQuestion.html, answer: '' });
          diagnostics.push({
            type: 'warning',
            message: 'Uma pergunta foi importada sem resposta.'
          });
        }
        pendingQuestion = { html: html, tag: tag };
        if (!stripHtml(html)) {
          diagnostics.push({ type: 'warning', message: 'Foi encontrada uma pergunta vazia.' });
        }
        continue;
      }

      if (!pendingQuestion) {
        diagnostics.push({
          type: 'warning',
          message: 'Uma resposta sem pergunta correspondente foi ignorada.'
        });
        continue;
      }

      pairs.push({ question: pendingQuestion.html, answer: html });
      if (!stripHtml(html)) {
        diagnostics.push({ type: 'warning', message: 'Foi encontrada uma resposta vazia.' });
      }
      pendingQuestion = null;
    }

    if (pendingQuestion) {
      pairs.push({ question: pendingQuestion.html, answer: '' });
      diagnostics.push({ type: 'warning', message: 'A última pergunta está sem resposta.' });
    }

    if (!pairs.length && source.trim()) {
      diagnostics.push({
        type: 'error',
        message: 'Nenhum par foi reconhecido. Use <q>/<a> ou <h3>/<p>.'
      });
    }

    return { pairs: pairs, diagnostics: diagnostics };
  }

  function extractHref(attributes) {
    var match = String(attributes || '').match(
      /\bhref\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/i
    );
    if (!match) return '';
    return match[1] !== undefined ? match[1]
      : match[2] !== undefined ? match[2]
      : match[3] || '';
  }

  function extractLinks(html) {
    var links = [];
    String(html || '').replace(/<a\b([^>]*)>/gi, function (_, attributes) {
      links.push(extractHref(attributes));
      return _;
    });
    return links;
  }

  function auditHref(href, site) {
    var raw = String(href || '').trim();
    var config = SITE_CONFIG[site] || SITE_CONFIG.generic;
    var baseUrl = config.canonical;

    if (!raw || raw === '#') {
      return {
        status: 'warning',
        marker: 'vazio',
        label: 'Destino vazio',
        detail: 'Informe um href real antes de publicar.'
      };
    }

    if (/^(javascript|data|vbscript):/i.test(raw)) {
      return {
        status: 'error',
        marker: 'bloqueado',
        label: 'Protocolo bloqueado',
        detail: 'Esse tipo de destino não é seguro para o FAQ.'
      };
    }

    if (raw.charAt(0) === '#') {
      return {
        status: 'info',
        marker: 'âncora',
        label: 'Âncora interna',
        detail: 'Confirme se o ID existe na página de destino.'
      };
    }

    if (/^(mailto|tel):/i.test(raw)) {
      return {
        status: 'ok',
        marker: 'ação',
        label: 'Ação direta',
        detail: 'O link abre e-mail ou telefone.'
      };
    }

    if (/^[a-z][a-z0-9+.-]*:/i.test(raw) && !/^https?:/i.test(raw)) {
      return {
        status: 'warning',
        marker: 'protocolo',
        label: 'Protocolo incomum',
        detail: 'Revise se esse protocolo funciona nos sites de destino.'
      };
    }

    var resolved;
    try {
      resolved = new URL(raw, baseUrl);
    } catch (error) {
      return {
        status: 'error',
        marker: 'inválido',
        label: 'URL inválida',
        detail: 'O navegador não conseguiu interpretar o destino.'
      };
    }

    if (resolved.protocol === 'http:') {
      return {
        status: 'warning',
        marker: 'http',
        label: 'Link sem HTTPS',
        detail: 'Prefira HTTPS para evitar bloqueios e avisos de segurança.'
      };
    }

    var isRelative = !/^(?:https?:)?\/\//i.test(raw);
    if (isRelative) {
      return {
        status: 'ok',
        marker: 'interno',
        label: 'Link interno',
        detail: 'O destino acompanha o domínio da página.'
      };
    }

    if (config.hostPattern && config.hostPattern.test(resolved.hostname)) {
      return {
        status: 'ok',
        marker: 'interno',
        label: 'Domínio compatível',
        detail: 'O domínio corresponde ao FAQ ' + config.label + '.'
      };
    }

    if (config.hostPattern) {
      return {
        status: 'warning',
        marker: 'externo',
        label: 'Link externo',
        detail: 'O destino sai do site ' + config.label + '.'
      };
    }

    return {
      status: 'info',
      marker: 'externo',
      label: 'Link absoluto',
      detail: 'No FAQ genérico, confirme se este domínio serve para todos os sites.'
    };
  }

  function collectLinkAudits(data, onlySite) {
    var audits = [];
    Object.keys(SITE_CONFIG).forEach(function (site) {
      if (onlySite && site !== onlySite) return;
      (data[site] || []).forEach(function (pair, pairIndex) {
        ['question', 'answer'].forEach(function (field) {
          extractLinks(pair[field]).forEach(function (href, linkIndex) {
            audits.push(Object.assign({
              id: site + '-' + pairIndex + '-' + field + '-' + linkIndex,
              site: site,
              pairIndex: pairIndex,
              field: field,
              href: href
            }, auditHref(href, site)));
          });
        });
      });
    });
    return audits;
  }

  function annotateLinks(html, site) {
    return String(html || '').replace(/<a\b([^>]*)>/gi, function (full, attributes) {
      var audit = auditHref(extractHref(attributes), site);
      return '<a data-faq-link-status="' + audit.status + '"' + attributes + '>';
    });
  }

  function buildItem(pair, site, annotate) {
    var question = annotate ? annotateLinks(pair.question, site) : pair.question;
    var answer = annotate ? annotateLinks(pair.answer, site) : pair.answer;
    return [
      '        <li id="faq-section__item">',
      '            <details id="faq-section__details">',
      '                <summary id="faq-section__summary">',
      '                    <h3 id="faq-section__q-text">' + question + '</h3>',
      '                    <span id="faq-section__icon" aria-hidden="true"></span>',
      '                </summary>',
      '',
      '                <div id="faq-section__a-inner">',
      '                    <p id="faq-section__a-text">' + answer + '</p>',
      '                </div>',
      '            </details>',
      '        </li>'
    ].join('\n');
  }

  function buildList(site, pairs, annotate) {
    var items = (pairs || []).map(function (pair) {
      return buildItem(pair, site, annotate);
    }).join('\n\n');
    var labels = {
      generic: 'GENÉRICAS GENÉRICAS GENÉRICAS',
      efacil: 'EFACIL EFACIL EFACIL',
      martins: 'MARTINS MARTINS MARTINS'
    };
    return [
      '    <!----------------------------------',
      '        ' + labels[site],
      '    ------------------------------------>',
      '    <ul id="faq-section__list" class="for--' + site + '" role="list">',
      items,
      '    </ul>'
    ].filter(function (line) {
      return line !== '' || items !== '';
    }).join('\n');
  }

  function buildStylesheetLinks() {
    return FAQ_STYLESHEET_URLS.map(function (href) {
      return '    <link rel="stylesheet" href="' + href + '">';
    }).join('\n');
  }

  function buildSection(data, annotate, includeStylesheets) {
    var lines = [
      '<section id="faq-section" aria-label="faq-section__title">'
    ];
    if (includeStylesheets !== false) {
      lines.push(buildStylesheetLinks(), '');
    }
    lines.push(
      '    <div id="faq-section__header">',
      '        <h2 id="faq-section__title">Dúvidas Frequentes</h2>',
      '    </div>',
      '',
      buildList('generic', data.generic || [], annotate),
      '',
      buildList('efacil', data.efacil || [], annotate),
      '',
      buildList('martins', data.martins || [], annotate),
      '',
      '</section>'
    );
    return lines.join('\n');
  }

  function buildOutput(data) {
    return buildSection(data, false, true);
  }

  function buildPreviewDocument(data, site, canonicalOverride) {
    var selectedSite = SITE_CONFIG[site] ? site : 'generic';
    var config = SITE_CONFIG[selectedSite];
    var canonicalUrl = normalizeCanonical(canonicalOverride, config.canonical);
    var previewCss = `
body {
  margin: 0;
  padding: 24px;
  background: #f4f5f7;
}

.faq-section__a-text a,
.faq-section__q-text a {
  border-radius: 3px;
  outline: 2px solid transparent;
  outline-offset: 2px;
}

a[data-faq-link-status="ok"] { outline-color: #1a9e52; }
a[data-faq-link-status="info"] { outline-color: #1677c8; }
a[data-faq-link-status="warning"] { outline-color: #c98200; }
a[data-faq-link-status="error"] { outline-color: #e03030; }

@media (min-width: 768px) {
  body { padding: 32px; }
}`;
    /* O simulador usa a mesma estrutura final e o canonical escolhe a lista visivel. */
    var annotatedSection = buildSection(data, true, true);
    return '<!DOCTYPE html>\n<html lang="pt-BR">\n<head>\n' +
      '  <meta charset="UTF-8">\n' +
      '  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n' +
      '  <link rel="canonical" href="' + escapeAttribute(canonicalUrl) + '">\n' +
      '  <style>\n' + FAQ_CSS + '\n' + previewCss + '\n  </style>\n' +
      '</head>\n<body data-preview-site="' + selectedSite + '">\n' + annotatedSection + '\n' +
      '<script>document.addEventListener("click",function(event){if(event.target.closest("a")){event.preventDefault();}});<' + '/script>\n' +
      '</body>\n</html>';
  }

  global.SenkoFaqTestCore = {
    SITE_CONFIG: SITE_CONFIG,
    FAQ_STYLESHEET_URLS: FAQ_STYLESHEET_URLS,
    FAQ_CSS: FAQ_CSS,
    createEmptyData: createEmptyData,
    detectSiteFromCanonical: detectSiteFromCanonical,
    parsePairs: parsePairs,
    auditHref: auditHref,
    collectLinkAudits: collectLinkAudits,
    buildList: buildList,
    buildSection: buildSection,
    buildOutput: buildOutput,
    buildPreviewDocument: buildPreviewDocument
  };
})(typeof window !== 'undefined' ? window : globalThis);
