const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const outputDirectory = path.join(root, 'generated', 'migrations');
const outputPath = path.join(outputDirectory, 'senkolib-legacy.json');
const checkOnly = process.argv.includes('--check');

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), 'utf8');
}

function run(relativePath, sandbox) {
  vm.runInNewContext(read(relativePath), sandbox, {
    filename: relativePath,
    timeout: 10000
  });
}

function loadManifest(relativePath, property) {
  const sandbox = { window: {} };
  run(relativePath, sandbox);
  return sandbox.window[property];
}

function loadBiblioteca(manifest, warnings) {
  const layouts = [];
  const variants = [];
  const sandbox = {
    console,
    SenkoLib: {
      registerLayout(layout) {
        layouts.push(layout);
      },
      registerVariantFile(layoutId, variant) {
        variants.push({ layoutId, ...variant });
      }
    }
  };

  for (const entry of manifest.layouts || []) {
    const file = typeof entry === 'string' ? entry : entry.file;
    run(`legacy/biblioteca/data/${file}`, sandbox);
  }
  for (const entry of manifest.variants || []) {
    const file = typeof entry === 'string' ? entry : entry.file;
    run(`legacy/biblioteca/data/${file}`, sandbox);
  }

  const layoutIds = new Set(layouts.map((layout) => layout.id));
  variants.forEach((variant) => {
    if (!layoutIds.has(variant.layoutId)) {
      warnings.push(
        `Variante ${variant.id || variant.name} aponta para layout ausente: ${variant.layoutId}`
      );
    }
  });

  return {
    layouts: layouts.map((layout) => ({
      ...layout,
      legacyId: layout.id,
      variants: variants
        .filter((variant) => variant.layoutId === layout.id)
        .map((variant) => ({
          ...variant,
          legacyId: variant.id || null
        }))
    })),
    orphanVariants: variants.filter((variant) => !layoutIds.has(variant.layoutId))
  };
}

function loadGroups() {
  let groups = [];
  run('legacy/colecoes/data/col-groups-data.js', {
    console,
    ColGroups: {
      load(value) {
        groups = Array.isArray(value) ? value : [];
      }
    }
  });
  return groups;
}

function loadCollections(manifest) {
  const collections = [];
  const layoutsByCollection = new Map();
  const sandbox = {
    console,
    ColLib: {
      registerCollection(collection) {
        collections.push(collection);
      },
      registerCollectionLayout(collectionId, layout) {
        if (!layoutsByCollection.has(collectionId)) {
          layoutsByCollection.set(collectionId, []);
        }
        layoutsByCollection.get(collectionId).push(layout);
      }
    }
  };

  for (const entry of manifest.collections || []) {
    const collectionFile = typeof entry === 'string' ? entry : entry.file;
    run(`legacy/colecoes/data/${collectionFile}`, sandbox);

    if (typeof entry !== 'string') {
      for (const layoutEntry of entry.layouts || []) {
        const layoutFile = typeof layoutEntry === 'string'
          ? layoutEntry
          : layoutEntry.file;
        run(`legacy/colecoes/data/${layoutFile}`, sandbox);
      }
    }
  }

  return collections.map((collection) => ({
    ...collection,
    legacyId: collection.slug,
    layouts: (layoutsByCollection.get(collection.slug) || []).map((layout) => ({
      ...layout,
      legacyId: layout.id
    }))
  }));
}

function countCollectionLayouts(collections) {
  return collections.reduce((total, collection) => {
    return total + (collection.layouts || []).length;
  }, 0);
}

function main() {
  const warnings = [];
  const bibliotecaManifest = loadManifest(
    'legacy/biblioteca/data/manifest.js',
    'SenkoBibliotecaManifest'
  );
  const colecoesManifest = loadManifest(
    'legacy/colecoes/data/manifest.js',
    'SenkoColecoesManifest'
  );

  const biblioteca = loadBiblioteca(bibliotecaManifest, warnings);
  const bibliotecaLayouts = biblioteca.layouts;
  const collections = loadCollections(colecoesManifest);
  const snapshot = {
    schemaVersion: 1,
    generatedAt: new Date().toISOString(),
    workspaceId: 'senkolib',
    groups: loadGroups(),
    bibliotecaLayouts,
    orphanVariants: biblioteca.orphanVariants,
    collections,
    counts: {
      groups: 0,
      bibliotecaLayouts: bibliotecaLayouts.length,
      bibliotecaVariants: bibliotecaLayouts.reduce((total, layout) => {
        return total + layout.variants.length;
      }, 0) + biblioteca.orphanVariants.length,
      collections: collections.length,
      collectionLayouts: countCollectionLayouts(collections)
    },
    warnings
  };
  snapshot.counts.groups = snapshot.groups.length;

  console.log(JSON.stringify({
    counts: snapshot.counts,
    warnings: snapshot.warnings
  }, null, 2));

  if (checkOnly) return;
  fs.mkdirSync(outputDirectory, { recursive: true });
  fs.writeFileSync(outputPath, `${JSON.stringify(snapshot, null, 2)}\n`, 'utf8');
  console.log(`Snapshot criado em ${outputPath}`);
}

main();
