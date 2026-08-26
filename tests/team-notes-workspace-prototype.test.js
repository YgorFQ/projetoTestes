const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const read = (relativePath) => fs.readFileSync(path.join(root, relativePath), 'utf8');

const context = { window: {} };
vm.runInNewContext(read('app/prototype/team-notes-workspace/core.js'), context);

const model = context.window.SenkoTeamNotesWorkspace.model;
assert.equal(model.source, 'prototype-memory');
assert.equal(model.listSections().length, 3);
assert.equal(model.listPages('padroes-prompts', '', '').length, 3);
assert.equal(model.listPages('padroes-prompts', 'checklist', '').length, 1);
assert.equal(model.listPages('padroes-prompts', '', 'prompt').length, 2);

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
  type: 'regra',
  tags: ['arquitetura'],
  content: 'Usar Firestore como fonte editável.'
});
assert.equal(saved.version, 1);
assert.equal(saved.isDraft, false);
assert.equal(model.getPage(saved.id).content, 'Usar Firestore como fonte editável.');
assert.equal(model.deletePage(saved.id), true);
assert.equal(model.getPage(saved.id), null);

const register = read('app/prototype/team-notes-workspace/register.js');
const view = read('app/prototype/team-notes-workspace/view.js');
const script = read('app/prototype/team-notes-workspace/script.js');
const styles = read('app/prototype/team-notes-workspace/styles.css');
const index = read('index.html');

assert.match(register, /id: 'team-notes-workspace'/);
assert.match(register, /label: 'Notas beta'/);
assert.match(view, /id="team-notes-section-list"/);
assert.match(view, /id="team-notes-page-list"/);
assert.match(view, /id="team-notes-editor"/);
assert.match(view, /Firebase previsto/);
assert.match(script, /model\.createSection/);
assert.match(script, /model\.createPage/);
assert.match(script, /model\.savePage/);
assert.match(script, /navigator\.clipboard\.writeText/);
assert.match(styles, /grid-template-columns:\s*220px 310px/);
assert.match(index, /app\/prototype\/team-notes-workspace\/register\.js/);

console.log('Team Notes workspace prototype test: OK');
