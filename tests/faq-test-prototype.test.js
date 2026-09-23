const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const source = fs.readFileSync(
  path.join(root, 'app/prototype/faq-teste/core.js'),
  'utf8'
);
const context = { window: {}, URL };
vm.runInNewContext(source, context, { filename: 'faq-test-core.js' });
const core = context.window.SenkoFaqTestCore;
const viewSource = fs.readFileSync(
  path.join(root, 'app/prototype/faq-teste/view.js'),
  'utf8'
);
const controllerSource = fs.readFileSync(
  path.join(root, 'app/prototype/faq-teste/script.js'),
  'utf8'
);
const registerSource = fs.readFileSync(
  path.join(root, 'app/prototype/faq-teste/register.js'),
  'utf8'
);

function listMarkup(html, site) {
  const expression = new RegExp(
    '<ul id="faq-section__list" class="for--' + site + '" role="list">([\\s\\S]*?)<\\/ul>'
  );
  const match = html.match(expression);
  assert.ok(match, 'A lista ' + site + ' deve existir no HTML.');
  return match[1];
}

assert.ok(core, 'O core do protótipo deve expor uma API testável.');
assert.equal((viewSource.match(/data-workspace-tab=/g) || []).length, 2);
assert.equal((viewSource.match(/data-workspace-panel=/g) || []).length, 2);
assert.match(viewSource, /class="faq-test-layout"/);
assert.match(viewSource, /class="faq-test-sidebar"/);
assert.match(viewSource, /class="faq-test-preview-panel"/);
assert.match(viewSource, /senko-btn-primary/);
assert.match(viewSource, /senko-btn-ghost/);
assert.match(viewSource, /senko-tab-btn/);
assert.match(registerSource, /shared\/styles\/senko-components\.css/);
assert.doesNotMatch(viewSource, /data-workspace-tab="preview"/);
assert.doesNotMatch(viewSource, /Marcadores de links|faq-test-panel--audit/);
assert.match(controllerSource, /function switchWorkspace/);
assert.match(controllerSource, /doc\.createElement\('details'\)/);
assert.match(controllerSource, /faq-test-pair__delete/);
assert.doesNotMatch(controllerSource, /function renderAudit/);

const parsed = core.parsePairs([
  '<q>Qual é o prazo?</q>',
  '<a>Consulte no carrinho.</a>',
  '<h3>Onde acompanho?</h3>',
  '<p>Acesse <a href="/meus-pedidos">Meus pedidos</a>.</p>'
].join('\n'));

assert.equal(parsed.pairs.length, 2, 'Os dois formatos devem ser reconhecidos juntos.');
assert.equal(parsed.pairs[0].question, 'Qual é o prazo?');
assert.equal(parsed.pairs[1].answer.includes('/meus-pedidos'), true);
assert.equal(parsed.diagnostics.length, 0);

const incomplete = core.parsePairs('<q>Pergunta sem resposta?</q>');
assert.equal(incomplete.pairs.length, 1);
assert.equal(incomplete.pairs[0].answer, '');
assert.equal(incomplete.diagnostics[0].type, 'warning');

assert.equal(core.auditHref('/meus-pedidos', 'efacil').status, 'ok');
assert.equal(core.auditHref('https://www.efacil.com.br/ofertas', 'efacil').status, 'ok');
assert.equal(core.auditHref('https://www.martinsatacado.com.br/ofertas', 'efacil').status, 'warning');
assert.equal(core.auditHref('javascript:alert(1)', 'generic').status, 'error');
assert.equal(core.auditHref('#detalhes', 'generic').marker, 'âncora');
assert.equal(core.detectSiteFromCanonical('https://www.efacil.com.br/produto/1'), 'efacil');
assert.equal(core.detectSiteFromCanonical('www.martinsatacado.com.br/produto/1'), 'martins');
assert.equal(core.detectSiteFromCanonical('https://loja-exemplo.com.br/produto/1'), 'generic');

const data = core.createEmptyData();
data.efacil = parsed.pairs;
data.martins = [{ question: 'Martins?', answer: 'Resposta.' }];
data.generic = [{ question: 'Genérico?', answer: 'Resposta.' }];

const output = core.buildOutput(data);
assert.equal((output.match(/<section id="faq-section"/g) || []).length, 1);
assert.equal((output.match(/<div id="faq-section__header">/g) || []).length, 1);
assert.match(output, /style-faq-padrao-tecnica\.css\?v=1/);
assert.match(output, /variacao-pdp\.css\?v=1/);
assert.match(output, /class="for--efacil"/);
assert.match(output, /class="for--martins"/);
assert.match(output, /class="for--generic"/);
assert.ok(output.indexOf('for--generic') < output.indexOf('for--efacil'));
assert.ok(output.indexOf('for--efacil') < output.indexOf('for--martins'));
assert.equal((output.match(/<li id="faq-section__item">/g) || []).length, 4);
assert.match(listMarkup(output, 'generic'), /Genérico\?/);
assert.doesNotMatch(listMarkup(output, 'generic'), /Qual é o prazo\?/);
assert.match(listMarkup(output, 'efacil'), /Qual é o prazo\?/);
assert.match(listMarkup(output, 'efacil'), /Onde acompanho\?/);
assert.match(listMarkup(output, 'martins'), /Martins\?/);
assert.match(output, /href="\/meus-pedidos"/);
assert.doesNotMatch(output, /faq-version--/);
assert.doesNotMatch(output, /display\s*:\s*none/i);
assert.doesNotMatch(output, /<style/i, 'A entrega deve referenciar as folhas de estilo oficiais.');
assert.doesNotMatch(output, /<script/i, 'A entrega final deve continuar em HTML e CSS puro.');

const preview = core.buildPreviewDocument(data, 'martins');
assert.match(preview, /martinsatacado\.com\.br\/produto-exemplo/);
assert.match(preview, /data-preview-site="martins"/);
assert.match(preview, /data-faq-preview-context="martins"/);
assert.match(preview, /FAQ Martins/);
assert.match(preview, /1 pergunta/);
assert.equal((preview.match(/<section id="faq-section"/g) || []).length, 1);
assert.match(listMarkup(preview, 'efacil'), /Qual é o prazo\?/);
assert.match(listMarkup(preview, 'generic'), /Genérico\?/);
assert.match(listMarkup(preview, 'martins'), /Martins\?/);

const linkPreview = core.buildPreviewDocument(data, 'efacil');
assert.match(linkPreview, /data-faq-link-status="ok"/);

const genericPreview = core.buildPreviewDocument(data, 'generic');
assert.match(genericPreview, /data-preview-site="generic"/);
assert.match(genericPreview, /FAQ Genérico/);

const canonicalPreview = core.buildPreviewDocument(
  data,
  'martins',
  'https://www.martinsatacado.com.br/produto/123'
);
assert.match(canonicalPreview, /rel="canonical" href="https:\/\/www\.martinsatacado\.com\.br\/produto\/123"/);

const largeData = core.createEmptyData();
largeData.efacil = Array.from({ length: 16 }, (_, index) => ({
  question: `eFácil ${index + 1}?`,
  answer: 'Resposta.'
}));
largeData.martins = Array.from({ length: 16 }, (_, index) => ({
  question: `Martins ${index + 1}?`,
  answer: 'Resposta.'
}));
largeData.generic = Array.from({ length: 8 }, (_, index) => ({
  question: `Genérico ${index + 1}?`,
  answer: 'Resposta.'
}));
const largeMartinsPreview = core.buildPreviewDocument(largeData, 'martins');
assert.equal((largeMartinsPreview.match(/<section id="faq-section"/g) || []).length, 1);
assert.equal((largeMartinsPreview.match(/<li id="faq-section__item">/g) || []).length, 40);
assert.equal((listMarkup(largeMartinsPreview, 'martins').match(/<li id="faq-section__item">/g) || []).length, 16);
assert.equal((listMarkup(largeMartinsPreview, 'efacil').match(/<li id="faq-section__item">/g) || []).length, 16);
assert.equal((listMarkup(largeMartinsPreview, 'generic').match(/<li id="faq-section__item">/g) || []).length, 8);

console.log('FAQ Teste prototype: OK');
