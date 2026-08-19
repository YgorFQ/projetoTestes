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

assert.ok(core, 'O core do protótipo deve expor uma API testável.');
assert.equal((viewSource.match(/data-workspace-tab=/g) || []).length, 4);
assert.equal((viewSource.match(/data-workspace-panel=/g) || []).length, 4);
assert.doesNotMatch(viewSource, /Marcadores de links|faq-test-panel--audit/);
assert.match(controllerSource, /function switchWorkspace/);
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
assert.match(output, /faq-version--efacil/);
assert.match(output, /faq-version--martins/);
assert.match(output, /faq-version--generic/);
assert.match(output, /href="\/meus-pedidos"/);
assert.doesNotMatch(output, /id="faq-section__item"/);
assert.doesNotMatch(output, /display\s*:\s*none/i);
assert.match(output, /visibility:\s*hidden/);
assert.doesNotMatch(output, /<script/i, 'A entrega final deve continuar em HTML e CSS puro.');

const preview = core.buildPreviewDocument(data, 'martins');
assert.match(preview, /martinsatacado\.com\.br\/produto-exemplo/);
assert.match(preview, /data-preview-site="martins"/);
assert.match(preview, /data-faq-preview-context="martins"/);
assert.match(preview, /FAQ Martins/);
assert.match(preview, /1 pergunta/);
assert.equal((preview.match(/<section class="faq-section/g) || []).length, 1);
assert.doesNotMatch(preview, /Qual é o prazo\?/);
assert.doesNotMatch(preview, /Genérico\?/);

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
assert.equal((largeMartinsPreview.match(/<section class="faq-section/g) || []).length, 1);
assert.equal((largeMartinsPreview.match(/<li class="faq-section__item/g) || []).length, 16);
assert.doesNotMatch(largeMartinsPreview, /eFácil 1\?/);
assert.doesNotMatch(largeMartinsPreview, /Genérico 1\?/);

console.log('FAQ Teste prototype: OK');
