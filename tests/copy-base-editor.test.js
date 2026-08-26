const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const projectRoot = path.resolve(__dirname, '..');

function read(relativePath) {
  return fs.readFileSync(path.join(projectRoot, relativePath), 'utf8');
}

const dispatched = [];
const window = {
  SenkoCopyBaseDefaultHtml: '<section>HTML local</section>',
  dispatchEvent(event) {
    dispatched.push(event);
  }
};
const context = vm.createContext({
  window,
  CustomEvent: class CustomEvent {
    constructor(type, options) {
      this.type = type;
      this.detail = options.detail;
    }
  }
});

vm.runInContext(
  read('app/features/biblioteca/controllers/copy-base.js'),
  context,
  { filename: 'copy-base.js' }
);

const copyBase = window.SenkoBibliotecaCopyBase;
assert.equal(copyBase.getTemplate().html, '<section>HTML local</section>');
assert.equal(copyBase.getTemplate().version, 0);
assert.equal(copyBase.setTemplate({
  html: '<section>HTML compartilhado</section>',
  version: 3
}, 'firebase'), true);
assert.deepEqual(JSON.parse(JSON.stringify(copyBase.getTemplate())), {
  id: 'copyBase',
  html: '<section>HTML compartilhado</section>',
  version: 3,
  source: 'firebase'
});
assert.equal(copyBase.setTemplate({ html: '   ', version: 4 }), false);
assert.equal(dispatched.at(-1).type, 'senko:copy-base-change');
copyBase.resetToDefault();
assert.equal(copyBase.getTemplate().html, '<section>HTML local</section>');
assert.equal(copyBase.getTemplate().source, 'local');

const view = read('app/features/biblioteca/view.js');
const register = read('app/features/biblioteca/register.js');
const editor = read('app/features/biblioteca/controllers/copy-base-editor.js');
const repository = read('app/features/biblioteca/repositories/firebase-repository.js');
const writes = read('app/infrastructure/firebase/senko-firestore-writes.js');
const rules = read('firebase/firestore.rules');
const harness = read('tests/fixtures/copy-base-editor-harness.html');

assert.match(view, /id="copyBaseEditBtn"/);
assert.match(view, /role="dialog"/);
assert.match(view, /id="copyBaseEditorTextarea"/);
assert.match(view, /Salvar no Firebase/);
assert.match(register, /controllers\/copy-base-editor\.js/);
assert.match(register, /repository\.watchCopyBase/);
assert.match(editor, /expectedVersion: originalVersion/);
assert.match(editor, /senko:copy-base-change/);
assert.match(repository, /settings\/copyBase/);
assert.match(writes, /saveCopyBaseTemplate/);
assert.match(rules, /match \/settings\/\{settingId\}/);
assert.match(rules, /validCopyBaseTemplate/);
assert.match(harness, /SenkoBibliotecaCopyBaseEditor\.init\(\)/);

console.log('Editor do HTML basico: OK');
