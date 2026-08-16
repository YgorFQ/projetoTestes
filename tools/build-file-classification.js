const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const root = path.resolve(__dirname, '..');
const outputPath = 'generated/meta/file-classification.json';

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
    filePath.startsWith('generated/') ||
    filePath === 'package-lock.json' ||
    filePath.endsWith('/package-lock.json')
  ) return 'generated';

  if (filePath.startsWith('app/prototype/')) return 'prototype';

  if (
    filePath.startsWith('legacy/') ||
    filePath.startsWith('docs/legacy/') ||
    filePath.startsWith('functions/src/')
  ) return 'legacy';

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
}, { official: 0, generated: 0, prototype: 0, legacy: 0 });

const inventory = {
  schemaVersion: 1,
  source: 'tools/build-file-classification.js',
  statuses: ['official', 'generated', 'prototype', 'legacy'],
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
