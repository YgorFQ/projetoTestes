const fs = require('node:fs');
const path = require('node:path');
const builder = require('../../app/infrastructure/static-backup/senko-static-backup-builder.js');

/*
 * Adaptador de disco para o builder puro do snapshot publico.
 *
 * Este script nao consulta Firebase. Ele le o snapshot tecnico que ja existe,
 * valida todos os arquivos declarados no manifesto e grava somente a saida
 * reconstruivel em backup/latest. Use o botao do app quando o
 * objetivo for capturar dados atuais do banco e publicar no GitHub.
 */

const projectRoot = path.resolve(__dirname, '../..');
const dataRoot = 'backup/data';
const manifestPath = path.join(projectRoot, dataRoot, 'manifest.json');
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
const files = {
  [`${dataRoot}/manifest.json`]: fs.readFileSync(manifestPath, 'utf8')
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
