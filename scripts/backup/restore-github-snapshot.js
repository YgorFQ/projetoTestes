const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const { applicationDefault, initializeApp } = require('firebase-admin/app');
const {
  FieldValue,
  Timestamp,
  getFirestore
} = require('firebase-admin/firestore');

const SNAPSHOT_ROOTS = [
  'backup/data'
];
const MANIFEST_PATHS = SNAPSHOT_ROOTS.map((root) => `${root}/manifest.json`);
const MANAGED_COLLECTIONS = [
  'groups',
  'bibliotecaLayouts',
  'collections',
  'settings',
  'nameReservations'
];
const TIMESTAMP_FIELDS = new Set(['createdAt', 'updatedAt']);

function parseArgs(argv) {
  const options = {
    source: '',
    commit: '',
    workspaceId: '',
    dryRun: false,
    force: false
  };

  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (argument === '--dry-run') options.dryRun = true;
    else if (argument === '--force') options.force = true;
    else if (argument === '--source') options.source = argv[++index] || '';
    else if (argument === '--commit') options.commit = argv[++index] || '';
    else if (argument === '--workspace') options.workspaceId = argv[++index] || '';
    else if (argument === '--help' || argument === '-h') options.help = true;
    else throw new Error(`Argumento desconhecido: ${argument}`);
  }

  if (!options.help && !options.source) {
    throw new Error('Informe --source com a pasta do snapshot ou repositorio Git.');
  }
  if (options.commit && !/^[A-Za-z0-9._\/-]{1,200}$/.test(options.commit)) {
    throw new Error('A referencia informada em --commit e invalida.');
  }
  return options;
}

function printHelp() {
  console.log(`Uso:
  node scripts/backup/restore-github-snapshot.js --source <pasta> [opcoes]

Opcoes:
  --commit <sha-ou-ref>   Le backup/data de um commit Git local
  --workspace <id>        Restaura em outro workspace (padrao: workspace do backup)
  --dry-run               Valida e mostra o plano sem acessar o Firebase
  --force                 Substitui o conteudo gerenciado de um workspace preenchido
  --help                   Mostra esta ajuda`);
}

function cleanId(value, label) {
  const id = String(value || '').trim();
  if (!id || id.includes('/') || id.includes('\\') || id.length > 180) {
    throw new Error(`${label} invalido: ${value}`);
  }
  return id;
}

function normalizeName(value) {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
    .replace(/\s+/g, ' ');
}

function reservationId(scope, nameKey) {
  return crypto
    .createHash('sha256')
    .update(`${scope}:${nameKey}`)
    .digest('hex');
}

function isPlainObject(value) {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function parseJson(contents, label) {
  try {
    const value = JSON.parse(contents);
    if (!isPlainObject(value)) throw new Error('o JSON precisa conter um objeto');
    return value;
  } catch (error) {
    throw new Error(`JSON invalido em ${label}: ${error.message}`);
  }
}

function createSourceReader(sourceValue, commit) {
  const source = path.resolve(sourceValue);
  if (!fs.existsSync(source)) throw new Error(`Origem nao encontrada: ${source}`);

  if (commit) {
    if (!fs.statSync(source).isDirectory()) {
      throw new Error('--source precisa ser um repositorio quando --commit for usado.');
    }
    return {
      description: `${source} @ ${commit}`,
      read(relativePath) {
        const result = spawnSync(
          'git',
          ['-C', source, 'show', `${commit}:${relativePath}`],
          { encoding: 'utf8', maxBuffer: 20 * 1024 * 1024 }
        );
        if (result.status !== 0) {
          throw new Error(
            `Nao foi possivel ler ${relativePath} no commit ${commit}: ` +
            String(result.stderr || result.stdout || '').trim()
          );
        }
        return result.stdout;
      }
    };
  }

  function projectRootFromSnapshotDirectory(snapshotDirectory) {
    const parent = path.dirname(snapshotDirectory);
    if (path.basename(snapshotDirectory) === 'data' && path.basename(parent) === 'backup') {
      return path.dirname(parent);
    }
    return parent;
  }

  let root = source;
  if (fs.statSync(source).isFile()) {
    if (path.basename(source) !== 'manifest.json') {
      throw new Error('Quando --source for arquivo, ele precisa ser manifest.json.');
    }
    root = projectRootFromSnapshotDirectory(path.dirname(source));
  } else if (fs.existsSync(path.join(source, 'manifest.json')) &&
             path.basename(source) === 'data') {
    root = projectRootFromSnapshotDirectory(source);
  }

  return {
    description: root,
    read(relativePath) {
      const absolute = path.resolve(root, ...relativePath.split('/'));
      const prefix = `${root}${path.sep}`.toLowerCase();
      if (!absolute.toLowerCase().startsWith(prefix)) {
        throw new Error(`Caminho fora da origem: ${relativePath}`);
      }
      if (!fs.existsSync(absolute) || !fs.statSync(absolute).isFile()) {
        throw new Error(`Arquivo do manifesto nao encontrado: ${absolute}`);
      }
      return fs.readFileSync(absolute, 'utf8');
    }
  };
}

function parseDocumentPath(filePath, sourceWorkspaceId) {
  if (typeof filePath !== 'string' || filePath.includes('\\') ||
      filePath.includes('..') || !filePath.endsWith('.json')) {
    throw new Error(`Caminho invalido no manifesto: ${filePath}`);
  }

  const prefix = SNAPSHOT_ROOTS
    .map((root) => `${root}/workspaces/${sourceWorkspaceId}/`)
    .find((candidate) => filePath.startsWith(candidate));
  if (!prefix) {
    throw new Error(`Arquivo fora do workspace ${sourceWorkspaceId}: ${filePath}`);
  }

  const segments = filePath
    .slice(prefix.length, -'.json'.length)
    .split('/')
    .map((segment) => cleanId(segment, 'Segmento de caminho'));

  let type = '';
  let resourceId = '';
  let parentId = '';
  let revisionId = '';
  let scope = '';

  if (segments.length === 2 && segments[0] === 'groups') {
    [type, resourceId, scope] = ['group', segments[1], 'grupos'];
  } else if (segments.length === 2 && segments[0] === 'settings' &&
             segments[1] === 'copyBase') {
    [type, resourceId] = ['copyBaseTemplate', segments[1]];
  } else if (segments.length === 2 && segments[0] === 'bibliotecaLayouts') {
    [type, resourceId, scope] = ['libraryLayout', segments[1], 'biblioteca-layouts'];
  } else if (segments.length === 4 && segments[0] === 'bibliotecaLayouts' &&
             segments[2] === 'revisions') {
    [type, resourceId, revisionId] = ['libraryLayoutRevision', segments[1], segments[3]];
  } else if (segments.length === 4 && segments[0] === 'bibliotecaLayouts' &&
             segments[2] === 'variants') {
    [type, parentId, resourceId] = ['libraryVariant', segments[1], segments[3]];
    scope = `biblioteca-variantes:${parentId}`;
  } else if (segments.length === 6 && segments[0] === 'bibliotecaLayouts' &&
             segments[2] === 'variants' && segments[4] === 'revisions') {
    [type, parentId, resourceId, revisionId] = [
      'libraryVariantRevision', segments[1], segments[3], segments[5]
    ];
  } else if (segments.length === 2 && segments[0] === 'collections') {
    [type, resourceId, scope] = ['collection', segments[1], 'colecoes'];
  } else if (segments.length === 4 && segments[0] === 'collections' &&
             segments[2] === 'layouts') {
    [type, parentId, resourceId] = ['collectionLayout', segments[1], segments[3]];
    scope = `colecao-layouts:${parentId}`;
  } else if (segments.length === 6 && segments[0] === 'collections' &&
             segments[2] === 'layouts' && segments[4] === 'revisions') {
    [type, parentId, resourceId, revisionId] = [
      'collectionLayoutRevision', segments[1], segments[3], segments[5]
    ];
  } else {
    throw new Error(`Estrutura de arquivo nao suportada: ${filePath}`);
  }

  return { filePath, segments, type, resourceId, parentId, revisionId, scope };
}

function validateNamedDocument(entry, data) {
  if (data.id !== entry.resourceId) {
    throw new Error(`${entry.filePath}: campo id nao corresponde ao caminho.`);
  }
  const name = String(data.name || '').trim();
  if (name.length < 2 || name.length > 160) {
    throw new Error(`${entry.filePath}: nome invalido.`);
  }
  if (data.nameKey !== normalizeName(name)) {
    throw new Error(`${entry.filePath}: nameKey nao corresponde ao nome.`);
  }
  if (!Number.isSafeInteger(data.version) || data.version < 1) {
    throw new Error(`${entry.filePath}: version invalida.`);
  }
}

function validateContent(entry, data) {
  if (!Array.isArray(data.tags) || data.tags.length > 40 ||
      data.tags.some((tag) => typeof tag !== 'string' || tag.length > 80)) {
    throw new Error(`${entry.filePath}: tags invalidas.`);
  }
  if (typeof data.html !== 'string' || data.html.length > 750000) {
    throw new Error(`${entry.filePath}: HTML invalido ou acima do limite.`);
  }
  if (typeof data.css !== 'string' || data.css.length > 250000) {
    throw new Error(`${entry.filePath}: CSS invalido ou acima do limite.`);
  }
}

function validateDocument(entry, data, sourceWorkspaceId) {
  if (data.workspaceId !== sourceWorkspaceId) {
    throw new Error(`${entry.filePath}: workspaceId nao corresponde ao manifesto.`);
  }

  if (!entry.type.endsWith('Revision') && entry.type !== 'copyBaseTemplate') {
    validateNamedDocument(entry, data);
  }

  if (entry.type === 'copyBaseTemplate') {
    if (data.id !== 'copyBase' || data.kind !== 'copyBaseTemplate' ||
        typeof data.html !== 'string' || !data.html.trim() || data.html.length > 750000 ||
        !Number.isSafeInteger(data.version) || data.version < 1) {
      throw new Error(`${entry.filePath}: template do HTML basico invalido.`);
    }
  } else if (entry.type === 'group') {
    if (!/^#[0-9a-fA-F]{6}$/.test(String(data.color || ''))) {
      throw new Error(`${entry.filePath}: cor de grupo invalida.`);
    }
  } else if (entry.type === 'libraryLayout' && data.kind !== 'libraryLayout') {
    throw new Error(`${entry.filePath}: kind precisa ser libraryLayout.`);
  } else if (entry.type === 'libraryVariant') {
    if (data.kind !== 'libraryVariant' || data.parentId !== entry.parentId) {
      throw new Error(`${entry.filePath}: variante possui pai ou kind invalido.`);
    }
  } else if (entry.type === 'collectionLayout') {
    if (data.kind !== 'collectionLayout' || data.parentId !== entry.parentId) {
      throw new Error(`${entry.filePath}: layout interno possui pai ou kind invalido.`);
    }
  } else if (entry.type.endsWith('Revision')) {
    if (data.revisionId !== entry.revisionId || data.resourceId !== entry.resourceId) {
      throw new Error(`${entry.filePath}: revisao nao corresponde ao caminho.`);
    }
  }

  const expectedKinds = {
    libraryLayout: 'libraryLayout',
    libraryLayoutRevision: 'libraryLayout',
    libraryVariant: 'libraryVariant',
    libraryVariantRevision: 'libraryVariant',
    collectionLayout: 'collectionLayout',
    collectionLayoutRevision: 'collectionLayout'
  };
  if (expectedKinds[entry.type]) {
    if (data.kind !== expectedKinds[entry.type]) {
      throw new Error(`${entry.filePath}: kind nao corresponde ao tipo do caminho.`);
    }
    validateContent(entry, data);
  }
}

function resourceKey(entry) {
  return entry.segments.join('/');
}

function parentKey(entry) {
  if (entry.type === 'libraryLayoutRevision') {
    return `bibliotecaLayouts/${entry.resourceId}`;
  }
  if (entry.type === 'libraryVariant') {
    return `bibliotecaLayouts/${entry.parentId}`;
  }
  if (entry.type === 'libraryVariantRevision') {
    return `bibliotecaLayouts/${entry.parentId}/variants/${entry.resourceId}`;
  }
  if (entry.type === 'collectionLayout') {
    return `collections/${entry.parentId}`;
  }
  if (entry.type === 'collectionLayoutRevision') {
    return `collections/${entry.parentId}/layouts/${entry.resourceId}`;
  }
  return '';
}

function validateRelationships(entries) {
  const byKey = new Map(entries.map((entry) => [resourceKey(entry), entry]));
  const reservations = new Map();
  const groups = new Set(entries.filter((entry) => entry.type === 'group')
    .map((entry) => entry.resourceId));

  for (const entry of entries) {
    const expectedParent = parentKey(entry);
    if (expectedParent && !byKey.has(expectedParent)) {
      throw new Error(`${entry.filePath}: documento pai ausente no snapshot.`);
    }

    if (entry.scope) {
      const key = `${entry.scope}:${entry.data.nameKey}`;
      if (reservations.has(key)) {
        throw new Error(
          `Nome duplicado no escopo ${entry.scope}: ${entry.data.name} ` +
          `(${reservations.get(key)} e ${entry.filePath}).`
        );
      }
      reservations.set(key, entry.filePath);
    }

    if (entry.type === 'collection' && entry.data.groupId &&
        !groups.has(entry.data.groupId)) {
      throw new Error(`${entry.filePath}: grupo ${entry.data.groupId} nao existe.`);
    }

    if (['libraryLayout', 'libraryVariant', 'collectionLayout'].includes(entry.type)) {
      const revisionKey = `${resourceKey(entry)}/revisions/${entry.data.currentRevisionId}`;
      if (!entry.data.currentRevisionId || !byKey.has(revisionKey)) {
        throw new Error(`${entry.filePath}: revisao atual ausente no snapshot.`);
      }
    }

    if (entry.type.endsWith('Revision') && entry.data.baseRevisionId) {
      const baseKey = `${resourceKey(entry).split('/revisions/')[0]}/revisions/` +
        entry.data.baseRevisionId;
      if (!byKey.has(baseKey)) {
        throw new Error(`${entry.filePath}: revisao base ausente no snapshot.`);
      }
    }
  }
}

function loadSnapshot(reader, targetWorkspaceValue) {
  let manifestPath = '';
  let manifestContents = '';
  let lastError;
  for (const candidate of MANIFEST_PATHS) {
    try {
      manifestContents = reader.read(candidate);
      manifestPath = candidate;
      break;
    } catch (error) {
      lastError = error;
    }
  }
  if (!manifestPath) throw lastError || new Error('Manifesto do snapshot nao encontrado.');
  const manifest = parseJson(manifestContents, manifestPath);
  if (manifest.schemaVersion !== 1) {
    throw new Error(`schemaVersion nao suportada: ${manifest.schemaVersion}`);
  }
  const sourceWorkspaceId = cleanId(manifest.workspaceId, 'Workspace do manifesto');
  const targetWorkspaceId = cleanId(
    targetWorkspaceValue || sourceWorkspaceId,
    'Workspace de destino'
  );
  if (!Number.isSafeInteger(manifest.dataVersion) || manifest.dataVersion < 0) {
    throw new Error('dataVersion do manifesto e invalida.');
  }
  if (!Array.isArray(manifest.files)) {
    throw new Error('O campo files do manifesto precisa ser uma lista.');
  }
  if (manifest.files.length > 100000) {
    throw new Error('O manifesto ultrapassa o limite de 100.000 arquivos.');
  }
  const uniqueFiles = new Set(manifest.files);
  if (uniqueFiles.size !== manifest.files.length) {
    throw new Error('O manifesto possui caminhos duplicados.');
  }

  const entries = manifest.files.map((filePath) => {
    const entry = parseDocumentPath(filePath, sourceWorkspaceId);
    const data = parseJson(reader.read(filePath), filePath);
    validateDocument(entry, data, sourceWorkspaceId);
    restoreTimestamps(data);
    return { ...entry, data };
  });
  validateRelationships(entries);

  const counts = entries.reduce((output, entry) => {
    output[entry.type] = (output[entry.type] || 0) + 1;
    return output;
  }, {});

  return { manifest, sourceWorkspaceId, targetWorkspaceId, entries, counts };
}

function restoreTimestamps(value, fieldName = '') {
  if (Array.isArray(value)) {
    return value.map((child) => restoreTimestamps(child));
  }
  if (isPlainObject(value)) {
    return Object.fromEntries(
      Object.entries(value).map(([key, child]) => [key, restoreTimestamps(child, key)])
    );
  }
  if (TIMESTAMP_FIELDS.has(fieldName) && typeof value === 'string') {
    const date = new Date(value);
    if (Number.isNaN(date.getTime()) || date.toISOString() !== value) {
      throw new Error(`Timestamp invalido no campo ${fieldName}: ${value}`);
    }
    return Timestamp.fromDate(date);
  }
  return value;
}

function targetDocumentPath(entry, targetWorkspaceId) {
  return `workspaces/${targetWorkspaceId}/${entry.segments.join('/')}`;
}

function restoredData(entry, targetWorkspaceId) {
  const data = restoreTimestamps(entry.data);
  data.workspaceId = targetWorkspaceId;
  return data;
}

async function hasManagedContent(db, workspaceId) {
  const workspace = db.doc(`workspaces/${workspaceId}`);
  const snapshots = await Promise.all(
    MANAGED_COLLECTIONS.map((name) => workspace.collection(name).limit(1).get())
  );
  return snapshots.some((snapshot) => !snapshot.empty);
}

async function clearManagedContent(db, workspaceId) {
  const workspace = db.doc(`workspaces/${workspaceId}`);
  for (const collectionName of MANAGED_COLLECTIONS) {
    await db.recursiveDelete(workspace.collection(collectionName));
  }
}

function queueReservation(writer, db, workspaceId, entry) {
  if (!entry.scope) return;
  const data = entry.data;
  const reference = db.doc(
    `workspaces/${workspaceId}/nameReservations/` +
    reservationId(entry.scope, data.nameKey)
  );
  writer.set(reference, {
    scope: entry.scope,
    name: data.name,
    nameKey: data.nameKey,
    resourcePath: targetDocumentPath(entry, workspaceId),
    updatedAt: FieldValue.serverTimestamp()
  });
}

async function restoreSnapshot(db, snapshot, options, sourceDescription) {
  const workspace = db.doc(`workspaces/${snapshot.targetWorkspaceId}`);
  const existing = await hasManagedContent(db, snapshot.targetWorkspaceId);
  if (existing && !options.force) {
    throw new Error(
      `O workspace ${snapshot.targetWorkspaceId} ja possui conteudo. ` +
      'Use --force somente depois de confirmar um backup.'
    );
  }

  await workspace.set({
    restoreStatus: 'running',
    restoreStartedAt: FieldValue.serverTimestamp(),
    restoreSource: sourceDescription
  }, { merge: true });

  try {
    if (existing) await clearManagedContent(db, snapshot.targetWorkspaceId);

    const writer = db.bulkWriter();
    writer.onWriteError((error) => {
      console.error(`Falha em ${error.documentRef.path}: ${error.message}`);
      return error.failedAttempts < 3;
    });

    for (const entry of snapshot.entries) {
      writer.set(
        db.doc(targetDocumentPath(entry, snapshot.targetWorkspaceId)),
        restoredData(entry, snapshot.targetWorkspaceId)
      );
      queueReservation(writer, db, snapshot.targetWorkspaceId, entry);
    }
    await writer.close();

    await workspace.set({
      name: 'SenkoLib',
      schemaVersion: snapshot.manifest.schemaVersion,
      dataVersion: snapshot.manifest.dataVersion,
      restoreStatus: 'completed',
      restoredAt: FieldValue.serverTimestamp(),
      restoredFromWorkspace: snapshot.sourceWorkspaceId,
      restoredFromExportedAt: snapshot.manifest.exportedAt || null,
      restoreCounts: snapshot.counts,
      lastGithubExportVersion: FieldValue.delete(),
      lastGithubExportAt: FieldValue.delete(),
      lastGithubCommitSha: FieldValue.delete()
    }, { merge: true });
  } catch (error) {
    await workspace.set({
      restoreStatus: 'failed',
      restoreCompletedAt: FieldValue.serverTimestamp(),
      restoreError: String(error.message || error).slice(0, 1000)
    }, { merge: true });
    throw error;
  }
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  if (options.help) {
    printHelp();
    return;
  }

  const reader = createSourceReader(options.source, options.commit);
  const snapshot = loadSnapshot(reader, options.workspaceId);
  const report = {
    source: reader.description,
    sourceWorkspaceId: snapshot.sourceWorkspaceId,
    targetWorkspaceId: snapshot.targetWorkspaceId,
    schemaVersion: snapshot.manifest.schemaVersion,
    dataVersion: snapshot.manifest.dataVersion,
    files: snapshot.entries.length,
    reservations: snapshot.entries.filter((entry) => entry.scope).length,
    counts: snapshot.counts
  };

  if (options.dryRun) {
    console.log('Dry-run aprovado. Nenhuma escrita foi realizada.');
    console.log(JSON.stringify(report, null, 2));
    return;
  }

  const projectId = process.env.SENKO_FIREBASE_PROJECT_ID;
  const usingEmulator = Boolean(process.env.FIRESTORE_EMULATOR_HOST);
  if (!projectId) {
    throw new Error('Defina SENKO_FIREBASE_PROJECT_ID antes de restaurar.');
  }
  if (!usingEmulator && !process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    throw new Error(
      'Defina GOOGLE_APPLICATION_CREDENTIALS com a chave administrativa.'
    );
  }

  initializeApp(usingEmulator
    ? { projectId }
    : { credential: applicationDefault(), projectId });
  await restoreSnapshot(getFirestore(), snapshot, options, reader.description);
  console.log('Restauracao concluida.');
  console.log(JSON.stringify(report, null, 2));
}

if (require.main === module) {
  main().catch((error) => {
    console.error(error.message || error);
    process.exitCode = 1;
  });
}

module.exports = {
  createSourceReader,
  loadSnapshot,
  normalizeName,
  parseArgs,
  reservationId,
  restoredData,
  restoreTimestamps,
  targetDocumentPath
};
