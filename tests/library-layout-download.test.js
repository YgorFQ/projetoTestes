const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const editorPath = path.join(
  __dirname,
  '..',
  'app',
  'features',
  'biblioteca',
  'controllers',
  'layout-editor.js'
);
const source = fs.readFileSync(editorPath, 'utf8');
const context = vm.createContext({ window: {} });

vm.runInContext(source, context, { filename: 'layout-editor.js' });

const editor = context.window.SenkoLayoutEditor;
assert.ok(editor, 'O editor oficial da Biblioteca deve expor sua API.');
assert.equal(
  editor.buildDownloadFilename('Seção Hero / Oferta 01'),
  'secao-hero-oferta-01.html'
);
assert.equal(editor.buildDownloadFilename('  ///  '), 'layout.html');

const html = '<section class="hero"><h2>Oferta & destaque</h2></section>';
const css = '.hero { color: #ff9900; }\n/* </style> deve permanecer seguro */';
const downloaded = editor.buildDownloadDocument({
  name: 'Hero <Principal>',
  html,
  css
});

assert.match(downloaded, /^<!DOCTYPE html>\n<html lang="pt-BR">/);
assert.match(downloaded, /<meta charset="UTF-8">/);
assert.match(downloaded, /<title>Hero &lt;Principal&gt;<\/title>/);
assert.ok(downloaded.includes('.hero { color: #ff9900; }'));
assert.ok(downloaded.includes('<\\/style> deve permanecer seguro'));
assert.ok(downloaded.includes('<body>\n' + html + '\n</body>'));
assert.match(source, /id="layoutEditorDownloadBtn"/);
assert.match(source, /addEventListener\('click', downloadCurrent\)/);

console.log('Download HTML do editor da Biblioteca: OK');
