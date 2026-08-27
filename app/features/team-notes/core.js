(function () {
  var api = window.SenkoTeamNotesWorkspace = window.SenkoTeamNotesWorkspace || {};

  var seed = { sections: [], pages: [] };

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
    var suffix = window.crypto && typeof window.crypto.randomUUID === 'function'
      ? window.crypto.randomUUID().replace(/-/g, '').slice(0, 12)
      : Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
    var id = (base + '-' + suffix).slice(0, 180);
    var index = 2;
    while (collection.some(function (item) { return item.id === id; })) {
      id = (base + '-' + suffix + '-' + index).slice(0, 180);
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

  function deleteSection(sectionId) {
    var previousLength = state.sections.length;
    state.sections = state.sections.filter(function (section) { return section.id !== sectionId; });
    if (state.sections.length === previousLength) return false;
    state.pages = state.pages.filter(function (page) { return page.sectionId !== sectionId; });
    return true;
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

  function replaceData(sections, pages) {
    state = {
      sections: clone(Array.isArray(sections) ? sections : []),
      pages: clone(Array.isArray(pages) ? pages : [])
    };
  }

  api.model = {
    source: 'senko-data-mode',
    listSections: listSections,
    listPages: listPages,
    getPage: getPage,
    createSection: createSection,
    deleteSection: deleteSection,
    createPage: createPage,
    savePage: savePage,
    deletePage: deletePage,
    reset: reset,
    replaceData: replaceData
  };
})();
