(function (root, factory) {
  /*
   * Builder puro do snapshot publico.
   *
   * Funciona no navegador e no Node para que o mesmo algoritmo seja usado no
   * botao de backup, nos testes e no script operacional. Recebe um mapa de
   * arquivos tecnicos e devolve outro mapa; nao acessa rede nem disco. Essa
   * pureza torna contagens, ordenacao e serializacao reproduziveis.
   */
  var api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.SenkoStaticBackupBuilder = api;
})(typeof window !== 'undefined' ? window : null, function () {
  // O snapshot tecnico prioriza restauracao completa. O bundle publico contem
  // apenas o necessario para renderizar Biblioteca, Colecoes e Notas em leitura.
  var DATA_ROOT = 'backup/data/';
  var PUBLIC_ROOT = 'backup/latest/';

  function parseJson(content, path) {
    try {
      return JSON.parse(content);
    } catch (error) {
      throw new Error('JSON invalido no snapshot tecnico: ' + path);
    }
  }

  function compareByName(left, right) {
    return String(left.name || left.id || left.slug || '').localeCompare(
      String(right.name || right.id || right.slug || ''),
      'pt-BR',
      { numeric: true, sensitivity: 'base' }
    );
  }

  function publicLayout(id, data) {
    return {
      id: id,
      name: data.name || '',
      tags: Array.isArray(data.tags) ? data.tags : [],
      html: data.html || '',
      css: data.css || ''
    };
  }

  function publicVariant(layoutId, id, data) {
    var variant = publicLayout(id, data);
    variant.layoutId = layoutId;
    return variant;
  }

  function publicCollection(id, data) {
    return {
      slug: id,
      name: data.name || '',
      group: data.groupId || '',
      tags: Array.isArray(data.tags) ? data.tags : []
    };
  }

  function publicCollectionLayout(collectionId, id, data) {
    var layout = publicLayout(id, data);
    layout.collectionId = collectionId;
    return layout;
  }

  function publicGroup(id, data) {
    return {
      slug: id,
      name: data.name || '',
      cor: data.color || '#aaaaaa'
    };
  }

  function publicCopyBase(data) {
    return {
      id: 'copyBase',
      html: data.html || '',
      version: Number(data.version || 0)
    };
  }

  function publicTeamNoteSection(id, data) {
    return {
      id: id,
      name: data.name || '',
      order: Number(data.order || 0),
      version: Number(data.version || 0),
      createdAt: data.createdAt || null,
      updatedAt: data.updatedAt || null
    };
  }

  function publicTeamNotePage(sectionId, id, data) {
    return {
      id: id,
      sectionId: sectionId,
      name: data.name || '',
      content: data.content || '',
      version: Number(data.version || 0),
      createdAt: data.createdAt || null,
      updatedAt: data.updatedAt || null
    };
  }

  function assignmentScript(property, value) {
    return '(function () {\n' +
      "  'use strict';\n" +
      '  var backup = window.SenkoStaticBackup = window.SenkoStaticBackup || {};\n' +
      '  backup.' + property + ' = ' + JSON.stringify(value, null, 2) + ';\n' +
      '})();\n';
  }

  function featureAssignmentScript(featureId, property, value) {
    return '(function () {\n' +
      "  'use strict';\n" +
      '  var backup = window.SenkoStaticBackup = window.SenkoStaticBackup || {};\n' +
      '  backup.' + property + ' = backup.' + property + ' || {};\n' +
      '  backup.' + property + '[' + JSON.stringify(featureId) + '] = ' +
        JSON.stringify(value, null, 2) + ';\n' +
      '})();\n';
  }

  function featureManifest(id, snapshot) {
    var counts = snapshot.manifest.counts;
    var countKeys = id === 'biblioteca'
      ? ['bibliotecaLayouts', 'bibliotecaVariants', 'copyBaseTemplates']
      : (id === 'colecoes'
        ? ['collections', 'collectionLayouts', 'groups']
        : ['teamNoteSections', 'teamNotePages']);
    var featureCounts = {};
    countKeys.forEach(function (key) { featureCounts[key] = Number(counts[key] || 0); });
    return {
      schemaVersion: 1,
      featureId: id,
      workspaceId: snapshot.manifest.workspaceId,
      exportedAt: snapshot.manifest.exportedAt,
      dataVersion: snapshot.manifest.dataVersion,
      counts: featureCounts
    };
  }

  // A lista de arquivos do manifesto e autoritativa. Caminhos extras recebidos
  // sao ignorados para que um arquivo solto nao apareca no site por acidente.
  function buildPublicSnapshot(files) {
    var technicalManifestPath = DATA_ROOT + 'manifest.json';
    var manifest = parseJson(files[technicalManifestPath] || '{}', technicalManifestPath);
    var workspaceId = String(manifest.workspaceId || 'senkolib');
    var workspaceRoot = DATA_ROOT + 'workspaces/' + workspaceId + '/';
    var bibliotecaLayouts = [];
    var bibliotecaVariants = [];
    var collections = [];
    var collectionLayouts = [];
    var groups = [];
    var copyBase = null;
    var teamNoteSections = [];
    var teamNotePages = [];

    Object.keys(files).sort().forEach(function (path) {
      if (path.indexOf(workspaceRoot) !== 0 || !path.endsWith('.json')) return;
      if (path.indexOf('/revisions/') !== -1) return;

      var relativePath = path.slice(workspaceRoot.length, -5);
      var segments = relativePath.split('/');
      var data = parseJson(files[path], path);
      if (data.deleting) return;

      if (segments[0] === 'groups' && segments.length === 2) {
        groups.push(publicGroup(segments[1], data));
        return;
      }
      if (segments[0] === 'settings' && segments[1] === 'copyBase' && segments.length === 2) {
        copyBase = publicCopyBase(data);
        return;
      }
      if (segments[0] === 'bibliotecaLayouts' && segments.length === 2) {
        bibliotecaLayouts.push(publicLayout(segments[1], data));
        return;
      }
      if (segments[0] === 'bibliotecaLayouts' && segments[2] === 'variants' && segments.length === 4) {
        bibliotecaVariants.push(publicVariant(segments[1], segments[3], data));
        return;
      }
      if (segments[0] === 'collections' && segments.length === 2) {
        collections.push(publicCollection(segments[1], data));
        return;
      }
      if (segments[0] === 'collections' && segments[2] === 'layouts' && segments.length === 4) {
        collectionLayouts.push(publicCollectionLayout(segments[1], segments[3], data));
        return;
      }
      if (segments[0] === 'teamNoteSections' && segments.length === 2) {
        teamNoteSections.push(publicTeamNoteSection(segments[1], data));
        return;
      }
      if (segments[0] === 'teamNoteSections' && segments[2] === 'pages' && segments.length === 4) {
        teamNotePages.push(publicTeamNotePage(segments[1], segments[3], data));
      }
    });

    bibliotecaLayouts.sort(compareByName);
    bibliotecaVariants.sort(compareByName);
    collections.sort(compareByName);
    collectionLayouts.sort(compareByName);
    groups.sort(compareByName);
    teamNoteSections.sort(function (left, right) {
      return Number(left.order || 0) - Number(right.order || 0) || compareByName(left, right);
    });
    var activeTeamNoteSections = {};
    teamNoteSections.forEach(function (section) { activeTeamNoteSections[section.id] = true; });
    teamNotePages = teamNotePages.filter(function (page) {
      return Boolean(activeTeamNoteSections[page.sectionId]);
    });
    teamNotePages.sort(compareByName);

    return {
      manifest: {
        schemaVersion: 1,
        workspaceId: workspaceId,
        exportedAt: manifest.exportedAt || null,
        dataVersion: Number(manifest.dataVersion || 0),
        features: ['biblioteca', 'colecoes', 'team-notes'],
        counts: {
          bibliotecaLayouts: bibliotecaLayouts.length,
          bibliotecaVariants: bibliotecaVariants.length,
          collections: collections.length,
          collectionLayouts: collectionLayouts.length,
          groups: groups.length,
          copyBaseTemplates: copyBase ? 1 : 0,
          teamNoteSections: teamNoteSections.length,
          teamNotePages: teamNotePages.length
        }
      },
      biblioteca: {
        layouts: bibliotecaLayouts,
        variants: bibliotecaVariants,
        copyBase: copyBase
      },
      colecoes: {
        collections: collections,
        layouts: collectionLayouts,
        groups: groups
      },
      teamNotes: {
        sections: teamNoteSections,
        pages: teamNotePages
      }
    };
  }

  // Cada feature recebe manifesto e payload proprios. O manifesto global
  // descreve apenas a exportacao completa e nao contem dados de produto.
  function buildPublicFiles(files) {
    var snapshot = buildPublicSnapshot(files);
    var output = {};
    output[PUBLIC_ROOT + 'manifest.js'] = assignmentScript('manifest', snapshot.manifest);
    output[PUBLIC_ROOT + 'biblioteca/manifest.js'] = featureAssignmentScript(
      'biblioteca', 'featureManifests', featureManifest('biblioteca', snapshot)
    );
    output[PUBLIC_ROOT + 'biblioteca/data.js'] = featureAssignmentScript(
      'biblioteca', 'features', snapshot.biblioteca
    );
    output[PUBLIC_ROOT + 'colecoes/manifest.js'] = featureAssignmentScript(
      'colecoes', 'featureManifests', featureManifest('colecoes', snapshot)
    );
    output[PUBLIC_ROOT + 'colecoes/data.js'] = featureAssignmentScript(
      'colecoes', 'features', snapshot.colecoes
    );
    output[PUBLIC_ROOT + 'team-notes/manifest.js'] = featureAssignmentScript(
      'team-notes', 'featureManifests', featureManifest('team-notes', snapshot)
    );
    output[PUBLIC_ROOT + 'team-notes/data.js'] = featureAssignmentScript(
      'team-notes', 'features', snapshot.teamNotes
    );
    return output;
  }

  return {
    dataRoot: DATA_ROOT,
    publicRoot: PUBLIC_ROOT,
    buildPublicSnapshot: buildPublicSnapshot,
    buildPublicFiles: buildPublicFiles
  };
});
