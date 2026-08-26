(function () {
  var api = window.SenkoTeamNotesWorkspace = window.SenkoTeamNotesWorkspace || {};

  var seed = {
    sections: [
      { id: 'padroes-prompts', name: 'Padrões e prompts', order: 10 },
      { id: 'processos', name: 'Processos', order: 20 },
      { id: 'referencias', name: 'Referências', order: 30 }
    ],
    pages: [
      {
        id: 'padronizacao-html-2',
        sectionId: 'padroes-prompts',
        title: 'Padronização HTML 2',
        content: 'Use este espaço para concentrar o prompt oficial de padronização HTML da equipe.\n\nA versão final deve manter regras escaneáveis, exemplos curtos e decisões que possam ser encontradas rapidamente.',
        version: 4,
        createdAt: '2026-08-18T13:20:00.000Z',
        updatedAt: '2026-08-26T15:12:00.000Z'
      },
      {
        id: 'prompt-pdp',
        sectionId: 'padroes-prompts',
        title: 'Prompt para PDP',
        content: 'Modelo de prompt para começar uma sessão de conteúdo rico sem perder as regras de marca e de acessibilidade.',
        version: 2,
        createdAt: '2026-08-20T09:00:00.000Z',
        updatedAt: '2026-08-25T18:30:00.000Z'
      },
      {
        id: 'checklist-acessibilidade',
        sectionId: 'padroes-prompts',
        title: 'Checklist de acessibilidade',
        content: '1. Conferir a hierarquia dos títulos.\n2. Validar nomes acessíveis.\n3. Preservar foco visível.\n4. Testar navegação por teclado.',
        version: 1,
        createdAt: '2026-08-22T10:45:00.000Z',
        updatedAt: '2026-08-24T11:05:00.000Z'
      },
      {
        id: 'ordem-execucao',
        sectionId: 'processos',
        title: 'Ordem de execução',
        content: '1. Ler a ficha e o HTML herdado.\n2. Mapear limites protegidos.\n3. Implementar a alteração.\n4. Comparar antes e depois.\n5. Validar no navegador.',
        version: 3,
        createdAt: '2026-08-21T14:10:00.000Z',
        updatedAt: '2026-08-26T12:23:00.000Z'
      },
      {
        id: 'fluxo-revisao',
        sectionId: 'processos',
        title: 'Fluxo de revisão',
        content: 'Checklist rápido para revisar uma entrega antes de publicar no ambiente principal.',
        version: 1,
        createdAt: '2026-08-23T16:00:00.000Z',
        updatedAt: '2026-08-23T16:00:00.000Z'
      },
      {
        id: 'links-ferramentas',
        sectionId: 'referencias',
        title: 'Links e ferramentas',
        content: 'Centralize aqui links internos, ferramentas de apoio e referências que a equipe consulta com frequência.',
        version: 1,
        createdAt: '2026-08-19T08:30:00.000Z',
        updatedAt: '2026-08-19T08:30:00.000Z'
      }
    ]
  };

  var state = clone(seed);

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function normalizeText(value) {
    return String(value || '').trim();
  }

  function normalizeSearch(value) {
    return normalizeText(value)
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }

  function slugify(value) {
    return normalizeSearch(value)
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 72) || 'item';
  }

  function uniqueId(value, collection) {
    var base = slugify(value);
    var id = base;
    var index = 2;
    while (collection.some(function (item) { return item.id === id; })) {
      id = base + '-' + index;
      index += 1;
    }
    return id;
  }

  function getSection(sectionId) {
    return state.sections.find(function (section) { return section.id === sectionId; }) || null;
  }

  function getPage(pageId) {
    var page = state.pages.find(function (item) { return item.id === pageId; });
    return page ? clone(page) : null;
  }

  function listSections() {
    return clone(state.sections.slice().sort(function (left, right) {
      return Number(left.order || 0) - Number(right.order || 0) || left.name.localeCompare(right.name, 'pt-BR');
    }));
  }

  function listPages(sectionId, query) {
    var normalizedQuery = normalizeSearch(query);
    return clone(state.pages.filter(function (page) {
      if (page.sectionId !== sectionId) return false;
      if (!normalizedQuery) return true;
      return normalizeSearch([
        page.title,
        page.content
      ].join(' ')).indexOf(normalizedQuery) !== -1;
    }).sort(function (left, right) {
      return String(right.updatedAt || '').localeCompare(String(left.updatedAt || ''));
    }));
  }

  function createSection(name) {
    var normalizedName = normalizeText(name);
    if (!normalizedName) throw new Error('Informe o nome da seção.');
    if (state.sections.some(function (section) {
      return normalizeSearch(section.name) === normalizeSearch(normalizedName);
    })) throw new Error('Já existe uma seção com esse nome.');

    var section = {
      id: uniqueId(normalizedName, state.sections),
      name: normalizedName,
      order: state.sections.reduce(function (highest, item) {
        return Math.max(highest, Number(item.order || 0));
      }, 0) + 10
    };
    state.sections.push(section);
    return clone(section);
  }

  function createPage(sectionId) {
    if (!getSection(sectionId)) throw new Error('Selecione uma seção válida.');
    var now = new Date().toISOString();
    var page = {
      id: uniqueId('nova-pagina', state.pages),
      sectionId: sectionId,
      title: 'Nova página',
      content: '',
      version: 0,
      createdAt: now,
      updatedAt: now,
      isDraft: true
    };
    state.pages.push(page);
    return clone(page);
  }

  function savePage(input) {
    var safe = input || {};
    var title = normalizeText(safe.title);
    var content = String(safe.content || '');
    var existingIndex = state.pages.findIndex(function (page) { return page.id === safe.id; });
    if (existingIndex < 0) throw new Error('A página não existe mais.');
    if (!title) throw new Error('Informe o título da página.');
    if (!content.trim()) throw new Error('Escreva algum conteúdo antes de salvar.');
    if (state.pages.some(function (page) {
      return page.id !== safe.id && page.sectionId === safe.sectionId &&
        normalizeSearch(page.title) === normalizeSearch(title);
    })) throw new Error('Já existe uma página com esse título nesta seção.');

    var current = state.pages[existingIndex];
    var updated = {
      id: current.id,
      sectionId: current.sectionId,
      title: title,
      content: content,
      version: Number(current.version || 0) + 1,
      createdAt: current.createdAt,
      updatedAt: new Date().toISOString(),
      isDraft: false
    };
    state.pages[existingIndex] = updated;
    return clone(updated);
  }

  function deletePage(pageId) {
    var previousLength = state.pages.length;
    state.pages = state.pages.filter(function (page) { return page.id !== pageId; });
    return state.pages.length !== previousLength;
  }

  function reset() {
    state = clone(seed);
  }

  api.model = {
    source: 'prototype-memory',
    listSections: listSections,
    listPages: listPages,
    getPage: getPage,
    createSection: createSection,
    createPage: createPage,
    savePage: savePage,
    deletePage: deletePage,
    reset: reset
  };
})();
