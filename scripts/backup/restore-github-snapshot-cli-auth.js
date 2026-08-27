const auth = require('firebase-tools/lib/auth');
const { requireAuth } = require('firebase-tools/lib/requireAuth');
const { Client } = require('firebase-tools/lib/apiv2');
const { firestoreOrigin } = require('firebase-tools/lib/api');
const {
  createSourceReader,
  loadSnapshot,
  parseArgs,
  reservationId,
  restoredData,
  targetDocumentPath
} = require('./restore-github-snapshot');

const DATABASE_ID = '(default)';
const MANAGED_COLLECTIONS = [
  'groups',
  'bibliotecaLayouts',
  'collections',
  'teamNoteSections',
  'nameReservations'
];

function printHelp() {
  console.log(`Uso:
  node scripts/backup/restore-github-snapshot-cli-auth.js --source <pasta> [opcoes]

Opcoes:
  --commit <sha-ou-ref>   Le backup/data de um commit Git local
  --workspace <id>        Restaura em outro workspace (padrao: workspace do backup)
  --dry-run               Valida e mostra o plano sem acessar o Firebase
  --help                  Mostra esta ajuda

Este modo usa a conta logada no Firebase CLI. Ele nao le nem grava chave JSON
administrativa no repositorio.`);
}

function isPlainObject(value) {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function firestoreValue(value) {
  if (value === null) return { nullValue: 'NULL_VALUE' };
  if (value && typeof value.toDate === 'function') {
    return { timestampValue: value.toDate().toISOString() };
  }
  if (Array.isArray(value)) {
    return value.length
      ? { arrayValue: { values: value.map(firestoreValue) } }
      : { arrayValue: {} };
  }
  if (isPlainObject(value)) {
    return { mapValue: { fields: firestoreFields(value) } };
  }
  if (typeof value === 'string') return { stringValue: value };
  if (typeof value === 'boolean') return { booleanValue: value };
  if (typeof value === 'number') {
    if (!Number.isFinite(value)) throw new Error('Numero Firestore invalido.');
    return Number.isInteger(value)
      ? { integerValue: String(value) }
      : { doubleValue: value };
  }
  throw new Error(`Tipo Firestore nao suportado: ${typeof value}`);
}

function firestoreFields(data) {
  return Object.fromEntries(
    Object.entries(data)
      .filter(([, value]) => value !== undefined)
      .map(([key, value]) => [key, firestoreValue(value)])
  );
}

function documentName(projectId, documentPath) {
  return `projects/${projectId}/databases/${DATABASE_ID}/documents/${documentPath}`;
}

function updateWrite(projectId, documentPath, data) {
  return {
    update: {
      name: documentName(projectId, documentPath),
      fields: firestoreFields(data)
    }
  };
}

function buildReport(reader, snapshot) {
  return {
    source: reader.description,
    sourceWorkspaceId: snapshot.sourceWorkspaceId,
    targetWorkspaceId: snapshot.targetWorkspaceId,
    schemaVersion: snapshot.manifest.schemaVersion,
    dataVersion: snapshot.manifest.dataVersion,
    files: snapshot.entries.length,
    reservations: snapshot.entries.filter((entry) => entry.scope).length,
    counts: snapshot.counts
  };
}

async function createClient(projectId) {
  const account = auth.getGlobalDefaultAccount();
  if (!account) {
    throw new Error('Entre no Firebase CLI com `npx firebase-tools login`.');
  }
  const options = { project: projectId };
  auth.setActiveAccount(options, account);
  await requireAuth(options);
  return new Client({
    auth: true,
    apiVersion: 'v1',
    urlPrefix: firestoreOrigin()
  });
}

async function collectionHasDocuments(client, projectId, workspaceId, collectionName) {
  const path = documentName(
    projectId,
    `workspaces/${workspaceId}/${collectionName}`
  );
  try {
    const response = await client.get(path, {
      queryParams: { pageSize: 1 },
      resolveOnHTTPError: true
    });
    if (response.status === 404) return false;
    if (response.status >= 400) {
      throw new Error(
        `Firestore recusou leitura de ${collectionName} (${response.status}).`
      );
    }
    return Array.isArray(response.body.documents) &&
      response.body.documents.length > 0;
  } catch (error) {
    if (String(error.message || error).includes('404')) return false;
    throw error;
  }
}

async function hasManagedContent(client, projectId, workspaceId) {
  for (const collectionName of MANAGED_COLLECTIONS) {
    if (await collectionHasDocuments(client, projectId, workspaceId, collectionName)) {
      return true;
    }
  }
  return false;
}

function reservationWrite(projectId, workspaceId, entry, nowIso) {
  if (!entry.scope) return null;
  const data = restoredData(entry, workspaceId);
  const documentPath = `workspaces/${workspaceId}/nameReservations/` +
    reservationId(entry.scope, data.nameKey);
  return updateWrite(projectId, documentPath, {
    scope: entry.scope,
    name: data.name,
    nameKey: data.nameKey,
    resourcePath: targetDocumentPath(entry, workspaceId),
    updatedAt: nowIso
  });
}

function buildWrites(projectId, snapshot) {
  const nowIso = new Date().toISOString();
  const workspaceId = snapshot.targetWorkspaceId;
  const writes = [
    updateWrite(projectId, `workspaces/${workspaceId}`, {
      name: 'SenkoLib',
      schemaVersion: snapshot.manifest.schemaVersion,
      dataVersion: snapshot.manifest.dataVersion,
      restoreStatus: 'completed',
      restoredAt: nowIso,
      restoredFromWorkspace: snapshot.sourceWorkspaceId,
      restoredFromExportedAt: snapshot.manifest.exportedAt || null,
      restoreCounts: snapshot.counts
    })
  ];

  for (const entry of snapshot.entries) {
    writes.push(updateWrite(
      projectId,
      targetDocumentPath(entry, workspaceId),
      restoredData(entry, workspaceId)
    ));

    const reservation = reservationWrite(projectId, workspaceId, entry, nowIso);
    if (reservation) writes.push(reservation);
  }

  return writes;
}

async function commitWrites(client, projectId, writes) {
  if (writes.length > 450) {
    throw new Error(
      `A restauracao geraria ${writes.length} writes. ` +
      'Este modo limita a 450 para manter o commit atomico.'
    );
  }

  const response = await client.post(
    `projects/${projectId}/databases/${DATABASE_ID}/documents:commit`,
    { writes },
    {
      retries: 3,
      retryCodes: [429, 409, 503],
      retryMaxTimeout: 20000
    }
  );
  return response.body.writeResults ? response.body.writeResults.length : 0;
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  if (options.help) {
    printHelp();
    return;
  }
  if (options.force) {
    throw new Error(
      'O modo CLI auth nao implementa --force. Use a versao com chave ' +
      'administrativa para substituir conteudo existente.'
    );
  }

  const projectId = process.env.SENKO_FIREBASE_PROJECT_ID || options.project ||
    'senkolibtestes';
  const reader = createSourceReader(options.source, options.commit);
  const snapshot = loadSnapshot(reader, options.workspaceId);
  const report = buildReport(reader, snapshot);

  if (options.dryRun) {
    console.log('Dry-run aprovado. Nenhuma escrita foi realizada.');
    console.log(JSON.stringify(report, null, 2));
    return;
  }

  const client = await createClient(projectId);
  if (await hasManagedContent(client, projectId, snapshot.targetWorkspaceId)) {
    throw new Error(
      `O workspace ${snapshot.targetWorkspaceId} ja possui conteudo gerenciado. ` +
      'A restauracao via CLI auth foi interrompida.'
    );
  }

  const writes = buildWrites(projectId, snapshot);
  const writeCount = await commitWrites(client, projectId, writes);
  console.log('Restauracao concluida via Firebase CLI auth.');
  console.log(JSON.stringify({ ...report, writes: writeCount }, null, 2));
}

if (require.main === module) {
  main().catch((error) => {
    console.error(error.message || error);
    process.exitCode = 1;
  });
}
