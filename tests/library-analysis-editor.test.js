const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

function element() {
  const listeners = {};
  return {
    hidden: false,
    textContent: '',
    value: '',
    children: [],
    classList: { toggle() {} },
    addEventListener(type, callback) { listeners[type] = callback; },
    dispatch(type, event = {}) { listeners[type]?.(event); },
    append(...children) { this.children.push(...children); },
    appendChild(child) { this.children.push(child); },
    replaceChildren() { this.children = []; },
    focus() {},
    setAttribute() {},
    get childElementCount() { return this.children.length; }
  };
}

const ids = Object.fromEntries([
  'libraryAnalysisDialog', 'libraryAnalysisForm', 'libraryAnalysisRead',
  'libraryAnalysisStatus', 'libraryAnalysisEdit', 'libraryAnalysisFooter', 'libraryAnalysisClose',
  'libraryAnalysisCancel', 'libraryAnalysisSave', 'libraryAnalysisTitle',
  'libraryAnalysisPreview'
].map((id) => [id, element()]));
ids.libraryAnalysisDialog.open = false;
ids.libraryAnalysisDialog.showModal = function () { this.open = true; };
ids.libraryAnalysisDialog.close = function () { this.open = false; };
const inputs = Object.fromEntries([
  'descriptiveName', 'mainStructure', 'whatIsIt', 'purpose', 'rationale',
  'whenToUse', 'limitations', 'tags'
].map((name) => [name, element()]));
ids.libraryAnalysisForm.elements = { namedItem: (name) => inputs[name] };

let receiveRemote;
const context = {
  console,
  Set,
  document: {
    getElementById: (id) => ids[id],
    createElement: element
  },
  buildSrcDoc: () => '<html></html>',
  window: {
    SenkoFirebase: { getState: () => ({ member: { role: 'admin' } }) },
    SenkoDataMode: { isFirebase: () => true, onChange() {} },
    SenkoBibliotecaStatic: { getAnalysis: () => null },
    SenkoBibliotecaFirebase: {
      watchAnalysis(_id, callback) { receiveRemote = callback; return () => {}; }
    },
    confirm: () => true
  }
};
vm.runInNewContext(fs.readFileSync(path.join(__dirname,
  '../app/features/biblioteca/controllers/analysis.js'), 'utf8'), context);

context.window.SenkoBibliotecaAnalysis.init();
context.window.SenkoBibliotecaAnalysis.open({ id: 'layout-1', name: 'Cards', html: '', css: '' }, element());
receiveRemote({ version: 1, descriptiveName: 'Nome inicial', tags: ['Grid'] });
assert.equal(ids.libraryAnalysisEdit.hidden, false);
ids.libraryAnalysisEdit.dispatch('click');
inputs.descriptiveName.value = 'Meu rascunho';
ids.libraryAnalysisForm.dispatch('input');
receiveRemote({ version: 2, descriptiveName: 'Alteração remota', tags: ['Cards'] });
assert.equal(inputs.descriptiveName.value, 'Meu rascunho');
assert.equal(ids.libraryAnalysisForm.hidden, false);
assert.match(ids.libraryAnalysisStatus.textContent, /rascunho foi preservado/);
console.log('Library analysis editor draft conflict: OK');
