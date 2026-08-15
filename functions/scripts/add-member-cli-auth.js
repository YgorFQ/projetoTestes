const auth = require('firebase-tools/lib/auth');
const { requireAuth } = require('firebase-tools/lib/requireAuth');
const { Client } = require('firebase-tools/lib/apiv2');
const { firestoreOrigin } = require('firebase-tools/lib/api');

const DATABASE_ID = '(default)';

function parseArgs(argv) {
  const options = {
    workspaceId: 'senkolib',
    projectId: process.env.SENKO_FIREBASE_PROJECT_ID || 'senkolibtestes',
    databaseUrl: process.env.SENKO_REALTIME_DATABASE_URL ||
      'https://senkolibtestes-default-rtdb.firebaseio.com',
    uid: '',
    email: '',
    displayName: '',
    role: 'editor'
  };

  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (argument === '--workspace') options.workspaceId = argv[++index] || '';
    else if (argument === '--project') options.projectId = argv[++index] || '';
    else if (argument === '--database-url') options.databaseUrl = argv[++index] || '';
    else if (argument === '--uid') options.uid = argv[++index] || '';
    else if (argument === '--email') options.email = argv[++index] || '';
    else if (argument === '--name') options.displayName = argv[++index] || '';
    else if (argument === '--role') options.role = argv[++index] || '';
    else if (argument === '--help' || argument === '-h') options.help = true;
    else throw new Error(`Argumento desconhecido: ${argument}`);
  }

  return options;
}

function printHelp() {
  console.log(`Uso:
  node scripts/add-member-cli-auth.js --uid <uid> --email <email> --name <nome> [--role editor|admin|owner]

Opcoes:
  --workspace <id>      Workspace alvo. Padrao: senkolib
  --project <id>        Projeto Firebase. Padrao: senkolibtestes
  --database-url <url>  URL do Realtime Database
  --role <cargo>        Cargo inicial. Padrao: editor
  --help                Mostra esta ajuda

Este script usa a conta logada no Firebase CLI para criar:
- workspaces/{workspace}/members/{uid}
- presenceAccess/{workspace}/{uid} = true
- memberManagers/{workspace}/{uid} para owner/admin`);
}

function cleanSegment(value, label) {
  const text = String(value || '').trim();
  if (!text || text.includes('/') || text.includes('\\') || text.length > 180) {
    throw new Error(`${label} invalido.`);
  }
  return text;
}

function validateOptions(options) {
  options.workspaceId = cleanSegment(options.workspaceId, 'workspace');
  options.projectId = cleanSegment(options.projectId, 'project');
  options.uid = cleanSegment(options.uid, 'uid');

  options.email = String(options.email || '').trim();
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(options.email)) {
    throw new Error('email invalido.');
  }

  options.displayName = String(options.displayName || '').trim();
  if (!options.displayName || options.displayName.length > 160) {
    throw new Error('nome invalido.');
  }

  options.role = String(options.role || '').trim().toLowerCase();
  if (!['owner', 'admin', 'editor'].includes(options.role)) {
    throw new Error('role invalido. Use owner, admin ou editor.');
  }

  if (!/^https:\/\/.+\.firebaseio\.com$/i.test(options.databaseUrl)) {
    throw new Error('database-url invalida.');
  }
}

function firestoreValue(value) {
  if (value === null) return { nullValue: 'NULL_VALUE' };
  if (typeof value === 'string') return { stringValue: value };
  if (typeof value === 'boolean') return { booleanValue: value };
  throw new Error(`Tipo nao suportado: ${typeof value}`);
}

function firestoreTimestamp(value) {
  return { timestampValue: value };
}

function firestoreFields(data) {
  return Object.fromEntries(
    Object.entries(data).map(([key, value]) => [key, firestoreValue(value)])
  );
}

function documentName(options) {
  return `projects/${options.projectId}/databases/${DATABASE_ID}/documents/` +
    `workspaces/${options.workspaceId}/members/${options.uid}`;
}

async function authenticate(projectId) {
  const account = auth.getGlobalDefaultAccount();
  if (!account) {
    throw new Error('Entre no Firebase CLI com `npx firebase-tools login`.');
  }
  const authOptions = { project: projectId };
  auth.setActiveAccount(authOptions, account);
  await requireAuth(authOptions);
}

async function createMember(options) {
  const client = new Client({
    auth: true,
    apiVersion: 'v1',
    urlPrefix: firestoreOrigin()
  });
  const joinedAt = new Date().toISOString();
  const fields = firestoreFields({
    uid: options.uid,
    email: options.email,
    displayName: options.displayName,
    role: options.role,
    updatedBy: 'firebase-cli'
  });
  fields.joinedAt = firestoreTimestamp(joinedAt);
  fields.updatedAt = firestoreTimestamp(joinedAt);
  await client.post(
    `projects/${options.projectId}/databases/${DATABASE_ID}/documents:commit`,
    {
      writes: [{
        update: {
          name: documentName(options),
          fields
        }
      }]
    }
  );
}

async function grantPresence(options) {
  const client = new Client({
    auth: true,
    urlPrefix: options.databaseUrl.replace(/\/+$/, '')
  });
  await client.put(
    `/presenceAccess/${encodeURIComponent(options.workspaceId)}/` +
    `${encodeURIComponent(options.uid)}.json`,
    true
  );
  const managerPath = `/memberManagers/${encodeURIComponent(options.workspaceId)}/` +
    `${encodeURIComponent(options.uid)}.json`;
  if (options.role === 'owner' || options.role === 'admin') {
    await client.put(managerPath, JSON.stringify(options.role));
  } else {
    await client.delete(managerPath);
  }
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  if (options.help) {
    printHelp();
    return;
  }
  validateOptions(options);
  await authenticate(options.projectId);
  await createMember(options);
  await grantPresence(options);
  console.log(JSON.stringify({
    created: true,
    workspaceId: options.workspaceId,
    uid: options.uid,
    email: options.email,
    displayName: options.displayName,
    role: options.role,
    presenceAccess: true
  }, null, 2));
}

if (require.main === module) {
  main().catch((error) => {
    console.error(error.message || error);
    process.exitCode = 1;
  });
}
