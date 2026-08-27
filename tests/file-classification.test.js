const assert = require('assert');
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const root = path.resolve(__dirname, '..');
const inventoryPath = path.join(root, 'backup/meta/file-classification.json');
const acceptedStatuses = new Set(['official', 'generated', 'prototype']);

execFileSync(process.execPath, ['scripts/maintenance/build-file-classification.js'], {
  cwd: root,
  stdio: 'pipe'
});

const inventory = JSON.parse(fs.readFileSync(inventoryPath, 'utf8'));
const paths = new Set();

for (const entry of inventory.entries) {
  assert(entry.path && typeof entry.path === 'string', 'Entrada sem caminho.');
  assert(acceptedStatuses.has(entry.status), `Estado invalido em ${entry.path}.`);
  assert(!paths.has(entry.path), `Arquivo classificado duas vezes: ${entry.path}.`);
  paths.add(entry.path);
}

const gitFiles = execFileSync(
  'git',
  ['ls-files', '--cached', '--others', '--exclude-standard', '-z'],
  { cwd: root, encoding: 'utf8' }
).split('\0').filter(Boolean).map((filePath) => filePath.replace(/\\/g, '/')).filter((filePath) =>
  fs.existsSync(path.join(root, ...filePath.split('/')))
);

for (const filePath of gitFiles) {
  assert(paths.has(filePath), `Arquivo sem classificacao: ${filePath}.`);
}

const expected = new Map([
  ['app/tools/access/register.js', 'official'],
  ['app/features/biblioteca/controllers/index.js', 'official'],
  ['app/features/colecoes/repositories/firebase-repository.js', 'official'],
  ['app/prototype/gamer-preview/register.js', 'prototype'],
  ['firebase/firestore.rules', 'official'],
  ['.vscode/settings.json', 'official'],
  ['backup/latest/manifest.js', 'generated'],
  ['backup/latest/team-notes/manifest.js', 'generated']
]);

const byPath = new Map(inventory.entries.map((entry) => [entry.path, entry.status]));
for (const [filePath, status] of expected) {
  assert.strictEqual(byPath.get(filePath), status, `${filePath} deveria ser ${status}.`);
}

const expectedRootFiles = [
  '.firebaserc',
  '.gitignore',
  'AGENTS.md',
  'README.md',
  'firebase.json',
  'index.html',
  'package-lock.json',
  'package.json',
  'sw.js'
];
const actualRootFiles = gitFiles.filter((filePath) => !filePath.includes('/')).sort();
assert.deepStrictEqual(actualRootFiles, expectedRootFiles, 'A raiz possui arquivo nao justificado.');

const index = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
assert(index.includes('backup/latest/manifest.js'), 'Index nao carrega o fallback gerado.');
assert(index.includes('app/tools/session/register.js'), 'Index nao carrega a tool de sessao.');
assert(!index.includes('app/infrastructure/firebase/senko-firebase-ui.js'), 'Index usa UI Firebase antiga.');
assert(!index.includes('app/features/access/register.js'), 'Index usa o antigo caminho de Acessos.');

const firebaseConfig = JSON.parse(fs.readFileSync(path.join(root, 'firebase.json'), 'utf8'));
assert(
  !firebaseConfig.hosting.ignore.includes('backup/latest/**'),
  'Firebase Hosting nao pode ignorar o fallback publico.'
);

console.log(`Classificacao validada: ${inventory.entries.length} arquivos.`);
