const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const read = (relativePath) => fs.readFileSync(path.join(root, relativePath), 'utf8');

const context = { window: { crypto: { randomUUID: () => '12345678-1234-1234-1234-123456789abc' } } };
vm.runInNewContext(read('app/features/team-notes/core.js'), context);

const model = context.window.SenkoTeamNotesWorkspace.model;
assert.equal(model.source, 'senko-data-mode');
assert.equal(model.listSections().length, 0);
model.replaceData([
  { id: 'padroes-prompts', name: 'Padrões e prompts', order: 10, version: 1 }
], [
  { id: 'checklist', sectionId: 'padroes-prompts', title: 'Checklist', content: 'Validar.', version: 1 }
]);
assert.equal(model.listSections().length, 1);
assert.equal(model.listPages('padroes-prompts', '').length, 1);
assert.equal(model.listPages('padroes-prompts', 'checklist').length, 1);

const section = model.createSection('Decisoes da equipe');
assert.equal(section.name, 'Decisoes da equipe');
assert.throws(() => model.createSection('decisoes da equipe'), /existe uma seção/);

const draft = model.createPage(section.id);
assert.equal(draft.sectionId, section.id);
assert.equal(draft.version, 0);

const saved = model.savePage({
  id: draft.id,
  sectionId: section.id,
  title: 'Primeira decisão',
  content: 'Usar Firestore como fonte editável.'
});
assert.equal(saved.version, 1);
assert.equal(saved.isDraft, false);
assert.equal(saved.type, undefined);
assert.equal(saved.tags, undefined);
assert.equal(model.getPage(saved.id).content, 'Usar Firestore como fonte editável.');
assert.equal(model.deletePage(saved.id), true);
assert.equal(model.getPage(saved.id), null);

const removableSection = model.createSection('Seção temporária');
const removablePage = model.createPage(removableSection.id);
assert.equal(model.deleteSection(removableSection.id), true);
assert.equal(model.listSections().some((item) => item.id === removableSection.id), false);
assert.equal(model.getPage(removablePage.id), null);
assert.equal(model.deleteSection('secao-inexistente'), false);

const register = read('app/features/team-notes/register.js');
const view = read('app/features/team-notes/view.js');
const script = read('app/features/team-notes/script.js');
const styles = read('app/features/team-notes/styles.css');
const firebaseRepository = read('app/features/team-notes/repositories/firebase-repository.js');
const backupService = read('app/infrastructure/github/backup-service.js');
const index = read('index.html');

assert.match(register, /id: 'team-notes'/);
assert.match(register, /label: 'Notas'/);
assert.match(view, /id="team-notes-section-list"/);
assert.match(view, /id="team-notes-page-list"/);
assert.match(view, /id="team-notes-editor"/);
assert.match(view, /id="team-notes-confirm-overlay"/);
assert.match(view, /role="alertdialog"/);
assert.doesNotMatch(view, /team-notes-(?:type|tags|filter)/);
assert.doesNotMatch(view, /team-notes-workspace-(?:hero|notebook|metadata|editor-footer)/);
assert.match(script, /model\.createSection/);
assert.match(script, /model\.deleteSection/);
assert.match(script, /openDeleteConfirm/);
assert.match(script, /ui\.confirmOverlay\.hidden/);
assert.doesNotMatch(script, /window\.confirm\('Excluir/);
assert.match(script, /model\.createPage/);
assert.match(script, /model\.savePage/);
assert.match(script, /SenkoTeamNotesFirebase\.savePage/);
assert.match(firebaseRepository, /saveTeamNotePage/);
assert.match(backupService, /collectTeamNotes/);
assert.match(script, /navigator\.clipboard\.writeText/);
assert.doesNotMatch(script, /page-item__preview/);
assert.match(view, /id="team-notes-copy" type="button">Copiar<\/button>/);
assert.match(view, /id="team-notes-save" type="submit">Salvar<\/button>/);
assert.match(styles, /grid-template-columns:\s*285px 285px/);
assert.match(styles, /\.team-notes-workspace-confirm-overlay/);
assert.match(index, /app\/features\/team-notes\/register\.js/);
assert.doesNotMatch(index, /app\/tools\/team-notes\/register\.js/);
assert.doesNotMatch(index, /backup\/latest\/team-notes\/(?:manifest|data)\.js/);
assert.match(register, /backup\/latest\/team-notes\/manifest\.js/);
assert.match(register, /backup\/latest\/team-notes\/data\.js/);

console.log('Team Notes Firebase feature test: OK');
