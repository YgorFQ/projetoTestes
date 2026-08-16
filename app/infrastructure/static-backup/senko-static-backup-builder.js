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
  // apenas o necessario para renderizar Biblioteca e Colecoes em leitura.
  var DATA_ROOT = 'generated/backups/senkolib-data/';
  var PUBLIC_ROOT = 'generated/static-backup/';

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

  function assignmentScript(property, value) {
    return '(function () {\n' +
      "  'use strict';\n" +
      '  var backup = window.SenkoStaticBackup = window.SenkoStaticBackup || {};\n' +
      '  backup.' + property + ' = ' + JSON.stringify(value, null, 2) + ';\n' +
      '})();\n';
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
      }
    });

    bibliotecaLayouts.sort(compareByName);
    bibliotecaVariants.sort(compareByName);
    collections.sort(compareByName);
    collectionLayouts.sort(compareByName);
    groups.sort(compareByName);

    return {
      manifest: {
        schemaVersion: 1,
        workspaceId: workspaceId,
        exportedAt: manifest.exportedAt || null,
        dataVersion: Number(manifest.dataVersion || 0),
        counts: {
          bibliotecaLayouts: bibliotecaLayouts.length,
          bibliotecaVariants: bibliotecaVariants.length,
          collections: collections.length,
          collectionLayouts: collectionLayouts.length,
          groups: groups.length
        }
      },
      biblioteca: {
        layouts: bibliotecaLayouts,
        variants: bibliotecaVariants
      },
      colecoes: {
        collections: collections,
        layouts: collectionLayouts,
        groups: groups
      }
    };
  }

  // Serializacao em tres scripts preserva carregamento sem fetch e tambem
  // funciona quando o projeto e servido por um servidor HTTP minimo.
  function buildPublicFiles(files) {
    var snapshot = buildPublicSnapshot(files);
    var output = {};
    output[PUBLIC_ROOT + 'manifest.js'] = assignmentScript('manifest', snapshot.manifest);
    output[PUBLIC_ROOT + 'biblioteca.js'] = assignmentScript('biblioteca', snapshot.biblioteca);
    output[PUBLIC_ROOT + 'colecoes.js'] = assignmentScript('colecoes', snapshot.colecoes);
    return output;
  }

  return {
    dataRoot: DATA_ROOT,
    publicRoot: PUBLIC_ROOT,
    buildPublicSnapshot: buildPublicSnapshot,
    buildPublicFiles: buildPublicFiles
  };
});
