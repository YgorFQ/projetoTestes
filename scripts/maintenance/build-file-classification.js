const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const root = path.resolve(__dirname, '../..');
const outputPath = 'backup/meta/file-classification.json';

/*
 * Inventario reconstruivel do repositorio.
 *
 * A lista parte do Git para incluir arquivos rastreados e novos arquivos ainda
 * nao commitados, mas ignora tudo coberto por .gitignore. As regras abaixo sao
 * deliberadamente baseadas em pasta: classificacao nao pode depender de uma
 * planilha manual que fique desatualizada depois de um move.
 */

function normalize(filePath) {
  return filePath.split(path.sep).join('/').replace(/^\.\//, '');
}

function listGitFiles() {
  const output = execFileSync(
    'git',
    ['ls-files', '--cached', '--others', '--exclude-standard', '-z'],
    { cwd: root, encoding: 'utf8' }
  );
  return output.split('\0').filter(Boolean).map(normalize);
}

function classify(filePath) {
  if (
    filePath.startsWith('backup/') ||
    filePath === 'package-lock.json' ||
    filePath.endsWith('/package-lock.json')
  ) return 'generated';

  if (filePath.startsWith('app/prototype/')) return 'prototype';

  return 'official';
}

const files = new Set([
  ...listGitFiles(),
  outputPath
]);

const entries = [...files]
  .sort((left, right) => left.localeCompare(right, 'en'))
  .map((filePath) => ({ path: filePath, status: classify(filePath) }));

const counts = entries.reduce((result, entry) => {
  result[entry.status] += 1;
  return result;
}, { official: 0, generated: 0, prototype: 0 });

const inventory = {
  schemaVersion: 1,
  source: 'scripts/maintenance/build-file-classification.js',
  statuses: ['official', 'generated', 'prototype'],
  counts,
  entries
};

fs.mkdirSync(path.dirname(path.join(root, outputPath)), { recursive: true });
fs.writeFileSync(
  path.join(root, outputPath),
  `${JSON.stringify(inventory, null, 2)}\n`,
  'utf8'
);

console.log(`Inventario atualizado: ${entries.length} arquivos.`);
console.log(counts);
