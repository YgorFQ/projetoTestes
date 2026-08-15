const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const indexSource = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
const releaseMatch = indexSource.match(/<meta name="senko-release" content="([^"]+)"/);
assert.ok(releaseMatch, 'index.html deve declarar meta[name="senko-release"]');
const releaseToken = releaseMatch[1];
const functionOffset = indexSource.indexOf('(function initializeFreshAssets()');
const scriptStart = indexSource.lastIndexOf('<script>', functionOffset) + '<script>'.length;
const scriptEnd = indexSource.indexOf('</script>', functionOffset);
const initializer = indexSource.slice(scriptStart, scriptEnd);

function createFreshAssets(hostname, protocol) {
  const origin = protocol === 'file:' ? 'null' : protocol + '//' + hostname;
  const context = {
    URL,
    Math,
    Date,
    console,
    navigator: {},
    document: {
      baseURI: protocol === 'file:' ? 'file:///senkolib/index.html' : origin + '/projetoTestes/',
      querySelector(selector) {
        return selector === 'meta[name="senko-release"]'
          ? { content: releaseToken }
          : null;
      },
      write() {}
    },
    window: {
      location: { hostname, protocol, origin }
    }
  };
  vm.runInNewContext(initializer, context, { filename: 'index-assets.js' });
  return context.window.SenkoFreshAssets;
}

const production = createFreshAssets('ygorfq.github.io', 'https:');
const codeUrl = new URL(production.url('app/shell/scripts/senko-shell.js'));
const manifestUrl = new URL(production.url('app/infrastructure/static-backup/manifest.js'));

assert.equal(codeUrl.searchParams.get('_senko_reload'), releaseToken);
assert.equal(manifestUrl.searchParams.get('_senko_reload'), production.openingToken);
assert.notEqual(manifestUrl.searchParams.get('_senko_reload'), production.token);

const localhost = createFreshAssets('127.0.0.1', 'http:');
const localCodeUrl = new URL(localhost.url('app/shell/scripts/senko-shell.js'));
assert.equal(localCodeUrl.searchParams.get('_senko_reload'), localhost.openingToken);

const workerSource = fs.readFileSync(path.join(__dirname, '..', 'sw.js'), 'utf8');
assert.equal(workerSource.includes("addEventListener('fetch'"), false);

console.log('Asset versioning test: OK');
