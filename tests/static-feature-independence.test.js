const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const read = (relativePath) => fs.readFileSync(path.join(root, relativePath), 'utf8');

function createContext(featureId, data) {
  const context = {
    console,
    CustomEvent: function CustomEvent(type, options) {
      this.type = type;
      this.detail = options.detail;
    },
    document: {
      documentElement: {
        classList: { toggle() {} },
        dataset: {}
      }
    },
    window: {
      SenkoStaticBackup: {
        manifest: { schemaVersion: 1, dataVersion: 1 },
        featureManifests: {
          [featureId]: { schemaVersion: 1, featureId, dataVersion: 1 }
        },
        features: { [featureId]: data }
      },
      dispatchEvent() {}
    }
  };
  vm.createContext(context);
  vm.runInContext(read('app/infrastructure/static-backup/senko-data-mode.js'), context);
  return context;
}

const notes = createContext('team-notes', { sections: [], pages: [] });
vm.runInContext(read('app/features/team-notes/repositories/static-repository.js'), notes);
vm.runInContext(read('app/features/biblioteca/repositories/static-repository.js'), notes);
assert.equal(notes.window.SenkoDataMode.getMode(), 'static');
assert.equal(notes.window.SenkoDataMode.hasFeatureSnapshot('team-notes'), true);
assert.equal(notes.window.SenkoDataMode.hasFeatureSnapshot('biblioteca'), false);
assert.equal(notes.window.SenkoTeamNotesStatic.isAvailable(), true);
assert.equal(notes.window.SenkoBibliotecaStatic.isAvailable(), false);

const biblioteca = createContext('biblioteca', { layouts: [], variants: [], copyBase: null });
vm.runInContext(read('app/features/biblioteca/repositories/static-repository.js'), biblioteca);
assert.equal(biblioteca.window.SenkoDataMode.getMode(), 'static');
assert.equal(biblioteca.window.SenkoBibliotecaStatic.isAvailable(), true);

const index = read('index.html');
assert.doesNotMatch(index, /backup\/latest\/(?:biblioteca|colecoes|team-notes)\//);

const registers = {
  biblioteca: read('app/features/biblioteca/register.js'),
  colecoes: read('app/features/colecoes/register.js'),
  'team-notes': read('app/features/team-notes/register.js')
};
Object.entries(registers).forEach(([featureId, source]) => {
  assert.match(source, new RegExp(`backup/latest/${featureId}/manifest\\.js`));
  assert.match(source, new RegExp(`backup/latest/${featureId}/data\\.js`));
  Object.keys(registers).filter((other) => other !== featureId).forEach((other) => {
    assert.doesNotMatch(source, new RegExp(`backup/latest/${other}/`));
  });
});

console.log('Static feature independence: OK');
