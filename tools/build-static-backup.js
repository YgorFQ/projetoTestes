const fs = require('node:fs');
const path = require('node:path');
const builder = require('../app/infrastructure/static-backup/senko-static-backup-builder.js');

const projectRoot = path.resolve(__dirname, '..');
const manifestPath = path.join(projectRoot, 'senkolib-data', 'manifest.json');
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
const files = {
  'senkolib-data/manifest.json': fs.readFileSync(manifestPath, 'utf8')
};

manifest.files.forEach((relativePath) => {
  files[relativePath] = fs.readFileSync(path.join(projectRoot, relativePath), 'utf8');
});

const generated = builder.buildPublicFiles(files);
Object.entries(generated).forEach(([relativePath, content]) => {
  const target = path.join(projectRoot, relativePath);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, content, 'utf8');
});

const snapshot = builder.buildPublicSnapshot(files);
console.log('Snapshot publico gerado:', JSON.stringify(snapshot.manifest.counts));
