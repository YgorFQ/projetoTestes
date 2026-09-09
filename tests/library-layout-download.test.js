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
const styles = fs.readFileSync(path.join(
  __dirname,
  '..',
  'app',
  'features',
  'biblioteca',
  'styles',
  'layout-editor.css'
), 'utf8');
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
const css = '.hero { color: #ff9900; }';
const downloaded = editor.buildDownloadDocument({
  name: 'Hero <Principal>',
  html,
  css
});

assert.equal(downloaded, '<style>\n' + css + '\n</style>\n' + html);
assert.equal(downloaded.includes('<!DOCTYPE html>'), false);
assert.equal(downloaded.includes('<html'), false);
assert.equal(downloaded.includes('<head>'), false);
assert.equal(downloaded.includes('<body>'), false);
assert.equal(downloaded.includes('<\\/style>'), false);
assert.match(source, /id="layoutEditorDownloadBtn"/);
assert.doesNotMatch(source, /library-editor-download-btn/);
assert.match(source, /addEventListener\('click', downloadCurrent\)/);
assert.match(styles, /\.library-editor-icon-btn\s*\{[^}]*width:\s*34px;/s);
assert.match(styles, /\.library-editor-icon-btn svg\s*\{[^}]*width:\s*16px;/s);

console.log('Download HTML do editor da Biblioteca: OK');
