// Publica a projeção sem autoria das análises antigas, usando a conta do Firebase CLI.
const auth = require('firebase-tools/lib/auth');
const { requireAuth } = require('firebase-tools/lib/requireAuth');
const { Client } = require('firebase-tools/lib/apiv2');
const { firestoreOrigin } = require('firebase-tools/lib/api');

const FIELDS = [
  'descriptiveName', 'mainStructure', 'whatIsIt', 'purpose', 'rationale',
  'whenToUse', 'limitations', 'tags', 'version'
];

function option(name, fallback) {
  const index = process.argv.indexOf(name);
  return index === -1 ? fallback : process.argv[index + 1];
}

async function main() {
  const project = option('--project', 'senkolibtestes');
  const workspace = option('--workspace', 'senkolib');
  const dryRun = process.argv.includes('--dry-run');
  if (!/^[A-Za-z0-9_-]+$/.test(project) || !/^[A-Za-z0-9_-]+$/.test(workspace)) {
    throw new Error('Projeto ou workspace invalido.');
  }
  const account = auth.getGlobalDefaultAccount();
  if (!account) throw new Error('Entre no Firebase CLI antes de executar a migracao.');
  const options = { project };
  auth.setActiveAccount(options, account);
  await requireAuth(options);
  const client = new Client({ auth: true, apiVersion: 'v1', urlPrefix: firestoreOrigin() });
  const root = `projects/${project}/databases/(default)/documents`;
  const collection = `${root}/workspaces/${workspace}/bibliotecaLayouts`;
  const report = { layouts: 0, analyses: 0, alreadyCurrent: 0, published: 0 };
  let pageToken;
  do {
    const response = await client.get(collection, {
      queryParams: { pageSize: 100, ...(pageToken ? { pageToken } : {}) }
    });
    for (const layout of response.body.documents || []) {
      report.layouts++;
      const privatePath = `${layout.name}/analysis/current`;
      const publicPath = `${layout.name}/publicAnalysis/current`;
      const privateResponse = await client.get(privatePath, { resolveOnHTTPError: true });
      if (privateResponse.status === 404) continue;
      if (privateResponse.status >= 400) throw new Error(`Falha ao ler ${privatePath}: ${privateResponse.status}`);
      report.analyses++;
      const source = privateResponse.body.fields;
      const publicResponse = await client.get(publicPath, { resolveOnHTTPError: true });
      if (publicResponse.status !== 404 && publicResponse.status >= 400) {
        throw new Error(`Falha ao ler ${publicPath}: ${publicResponse.status}`);
      }
      const previous = publicResponse.status === 404 ? null : publicResponse.body;
      if (previous && Number(previous.fields.version.integerValue) >= Number(source.version.integerValue)) {
        report.alreadyCurrent++;
        continue;
      }
      const fields = Object.fromEntries(FIELDS.map((name) => {
        if (!source[name]) throw new Error(`Campo ${name} ausente em ${privatePath}`);
        return [name, source[name]];
      }));
      fields.id = { stringValue: 'current' };
      fields.kind = { stringValue: 'publicLibraryAnalysis' };
      fields.workspaceId = { stringValue: workspace };
      fields.layoutId = source.layoutId;
      if (!dryRun) {
        await client.post(`${root}:commit`, { writes: [{
          update: { name: publicPath, fields },
          currentDocument: previous
            ? { updateTime: previous.updateTime }
            : { exists: false }
        }] });
      }
      report.published++;
    }
    pageToken = response.body.nextPageToken;
  } while (pageToken);
  console.log(JSON.stringify({ project, workspace, dryRun, ...report }, null, 2));
}

main().catch((error) => {
  console.error(error.message || error);
  process.exitCode = 1;
});
