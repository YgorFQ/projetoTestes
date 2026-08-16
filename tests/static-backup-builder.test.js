const assert = require('node:assert/strict');
const builder = require('../app/infrastructure/static-backup/senko-static-backup-builder.js');

const root = 'backup/data/workspaces/senkolib/';
const files = {
  'backup/data/manifest.json': JSON.stringify({
    workspaceId: 'senkolib',
    exportedAt: '2026-08-15T12:00:00.000Z',
    dataVersion: 9
  }),
  [root + 'bibliotecaLayouts/layout-1.json']: JSON.stringify({
    name: 'Layout atual',
    tags: ['publico'],
    html: '<main>atual</main>',
    css: 'main { color: red; }',
    currentRevisionId: 'revision-current',
    version: 3,
    updatedByName: 'Nome privado'
  }),
  [root + 'bibliotecaLayouts/layout-1/revisions/revision-old.json']: JSON.stringify({
    html: '<main>antigo</main>',
    css: 'main { color: blue; }'
  }),
  [root + 'bibliotecaLayouts/layout-1/variants/variant-1.json']: JSON.stringify({
    name: 'Variante atual',
    html: '<aside>variante</aside>',
    css: ''
  }),
  [root + 'collections/collection-1.json']: JSON.stringify({
    name: 'Colecao atual',
    groupId: 'grupo-1',
    tags: ['colecao'],
    version: 2
  }),
  [root + 'collections/collection-1/layouts/item-1.json']: JSON.stringify({
    name: 'Item atual',
    html: '<section>item</section>',
    css: ''
  }),
  [root + 'groups/grupo-1.json']: JSON.stringify({
    name: 'Grupo atual',
    color: '#123456'
  }),
  [root + 'members/member-1.json']: JSON.stringify({
    email: 'privado@example.com'
  })
};

const snapshot = builder.buildPublicSnapshot(files);
assert.equal(snapshot.manifest.dataVersion, 9);
assert.deepEqual(snapshot.manifest.counts, {
  bibliotecaLayouts: 1,
  bibliotecaVariants: 1,
  collections: 1,
  collectionLayouts: 1,
  groups: 1
});
assert.equal(snapshot.biblioteca.layouts[0].html, '<main>atual</main>');
assert.equal(snapshot.biblioteca.layouts[0].updatedByName, undefined);
assert.equal(snapshot.biblioteca.layouts[0].revisionId, undefined);
assert.equal(snapshot.biblioteca.layouts[0].version, undefined);
assert.equal(snapshot.biblioteca.variants[0].layoutId, 'layout-1');
assert.equal(snapshot.colecoes.layouts[0].collectionId, 'collection-1');

const generated = builder.buildPublicFiles(files);
const generatedText = Object.values(generated).join('\n');
assert.ok(generatedText.includes('<main>atual</main>'));
assert.ok(!generatedText.includes('<main>antigo</main>'));
assert.ok(!generatedText.includes('privado@example.com'));
assert.ok(!generatedText.includes('Nome privado'));
assert.deepEqual(Object.keys(generated).sort(), [
  'backup/latest/biblioteca.js',
  'backup/latest/colecoes.js',
  'backup/latest/manifest.js'
]);

console.log('Static backup builder: OK');
