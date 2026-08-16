const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const { applicationDefault, initializeApp } = require('firebase-admin/app');
const {
  FieldValue,
  getFirestore
} = require('firebase-admin/firestore');

const functionsDirectory = path.resolve(__dirname, '..');
const projectRoot = path.resolve(functionsDirectory, '..');
const snapshotPath = path.join(
  projectRoot,
  'generated',
  'migrations',
  'senkolib-legacy.json'
);
const projectId = process.env.SENKO_FIREBASE_PROJECT_ID;
const usingEmulator = Boolean(process.env.FIRESTORE_EMULATOR_HOST);
const allowWarnings = process.argv.includes('--allow-warnings');
const force = process.argv.includes('--force');

if (!projectId) {
  throw new Error('Defina SENKO_FIREBASE_PROJECT_ID antes de importar.');
}
if (!usingEmulator && !process.env.GOOGLE_APPLICATION_CREDENTIALS) {
  throw new Error('Defina GOOGLE_APPLICATION_CREDENTIALS com o caminho da chave administrativa.');
}
if (!fs.existsSync(snapshotPath)) {
  throw new Error('Crie o snapshot primeiro com: npm run migration:build');
}

initializeApp(usingEmulator
  ? { projectId }
  : {
      credential: applicationDefault(),
      projectId
    });

const db = getFirestore();

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

function versionedData({
  workspaceId,
  kind,
  id,
  parentId,
  name,
  tags,
  html,
  css
}) {
  return {
    id,
    legacyId: id,
    workspaceId,
    kind,
    parentId: parentId || null,
    collectionId: kind === 'collectionLayout' ? parentId : null,
    name,
    nameKey: normalizeName(name),
    tags: Array.isArray(tags) ? tags : [],
    html: html || '',
    css: css || '',
    currentRevisionId: 'legacy-import-v1',
    version: 1,
    createdAt: FieldValue.serverTimestamp(),
    createdBy: 'legacy-import',
    updatedAt: FieldValue.serverTimestamp(),
    updatedBy: 'legacy-import',
    updatedByName: 'Importacao inicial'
  };
}

async function hasExistingContent(workspaceId) {
  const workspace = db.doc(`workspaces/${workspaceId}`);
  const [layouts, collections] = await Promise.all([
    workspace.collection('bibliotecaLayouts').limit(1).get(),
    workspace.collection('collections').limit(1).get()
  ]);
  return !layouts.empty || !collections.empty;
}

function queueReservation(writer, workspaceId, scope, resourceRef, data) {
  const reference = db.doc(
    `workspaces/${workspaceId}/nameReservations/` +
    reservationId(scope, data.nameKey)
  );
  writer.set(reference, {
    scope,
    name: data.name,
    nameKey: data.nameKey,
    resourcePath: resourceRef.path,
    updatedAt: FieldValue.serverTimestamp()
  });
}

function queueVersionedDocument(writer, reference, data) {
  writer.set(reference, data);
  writer.set(reference.collection('revisions').doc('legacy-import-v1'), {
    revisionId: 'legacy-import-v1',
    resourceId: data.id,
    workspaceId: data.workspaceId,
    kind: data.kind,
    name: data.name,
    tags: data.tags,
    html: data.html,
    css: data.css,
    baseRevisionId: null,
    createdAt: FieldValue.serverTimestamp(),
    createdBy: 'legacy-import',
    createdByName: 'Importacao inicial'
  });
}

async function main() {
  const snapshot = JSON.parse(fs.readFileSync(snapshotPath, 'utf8'));
  const workspaceId = String(snapshot.workspaceId || 'senkolib');
  const importCounts = {
    ...snapshot.counts,
    bibliotecaVariants: (snapshot.bibliotecaLayouts || [])
      .reduce((total, layout) => total + (layout.variants || []).length, 0),
    skippedOrphanVariants: (snapshot.orphanVariants || []).length
  };

  if (snapshot.warnings.length && !allowWarnings) {
    throw new Error(
      'A importacao encontrou inconsistencias. Revise o snapshot ou execute com ' +
      '--allow-warnings para importar apenas os itens validos.\n- ' +
      snapshot.warnings.join('\n- ')
    );
  }
  if (!force && await hasExistingContent(workspaceId)) {
    throw new Error(
      'O workspace ja possui conteudo. A importacao foi interrompida. ' +
      'Use --force somente se tiver certeza.'
    );
  }

  const writer = db.bulkWriter();
  writer.onWriteError((error) => {
    console.error(`Falha em ${error.documentRef.path}:`, error.message);
    return error.failedAttempts < 3;
  });

  const workspace = db.doc(`workspaces/${workspaceId}`);
  writer.set(workspace, {
    name: 'SenkoLib',
    schemaVersion: 1,
    dataVersion: 1,
    migratedAt: FieldValue.serverTimestamp(),
    migrationCounts: importCounts,
    migrationWarnings: snapshot.warnings || []
  }, { merge: true });

  for (const group of snapshot.groups || []) {
    const groupRef = workspace.collection('groups').doc(group.slug);
    const groupData = {
      id: group.slug,
      workspaceId,
      name: group.name,
      nameKey: normalizeName(group.name),
      color: group.cor || '',
      version: 1,
      createdAt: FieldValue.serverTimestamp(),
      createdBy: 'legacy-import',
      updatedAt: FieldValue.serverTimestamp(),
      updatedBy: 'legacy-import',
      updatedByName: 'Importacao inicial'
    };
    writer.set(groupRef, groupData);
    queueReservation(writer, workspaceId, 'grupos', groupRef, groupData);
  }

  for (const layout of snapshot.bibliotecaLayouts || []) {
    const layoutRef = workspace.collection('bibliotecaLayouts').doc(layout.id);
    const data = versionedData({
      workspaceId,
      kind: 'libraryLayout',
      id: layout.id,
      name: layout.name,
      tags: layout.tags,
      html: layout.html,
      css: layout.css
    });
    queueVersionedDocument(writer, layoutRef, data);
    queueReservation(writer, workspaceId, 'biblioteca-layouts', layoutRef, data);

    for (const variant of layout.variants || []) {
      const variantRef = layoutRef.collection('variants').doc(variant.id);
      const variantData = versionedData({
        workspaceId,
        kind: 'libraryVariant',
        id: variant.id,
        parentId: layout.id,
        name: variant.name,
        html: variant.html,
        css: variant.css
      });
      queueVersionedDocument(writer, variantRef, variantData);
      queueReservation(
        writer,
        workspaceId,
        `biblioteca-variantes:${layout.id}`,
        variantRef,
        variantData
      );
    }
  }

  for (const collection of snapshot.collections || []) {
    const collectionRef = workspace.collection('collections').doc(collection.slug);
    const collectionData = {
      id: collection.slug,
      legacyId: collection.slug,
      workspaceId,
      name: collection.name,
      nameKey: normalizeName(collection.name),
      groupId: collection.group || null,
      tags: Array.isArray(collection.tags) ? collection.tags : [],
      version: 1,
      createdAt: FieldValue.serverTimestamp(),
      createdBy: 'legacy-import',
      updatedAt: FieldValue.serverTimestamp(),
      updatedBy: 'legacy-import',
      updatedByName: 'Importacao inicial'
    };
    writer.set(collectionRef, collectionData);
    queueReservation(
      writer,
      workspaceId,
      'colecoes',
      collectionRef,
      collectionData
    );

    for (const layout of collection.layouts || []) {
      const layoutRef = collectionRef.collection('layouts').doc(layout.id);
      const layoutData = versionedData({
        workspaceId,
        kind: 'collectionLayout',
        id: layout.id,
        parentId: collection.slug,
        name: layout.name,
        html: layout.html,
        css: layout.css
      });
      queueVersionedDocument(writer, layoutRef, layoutData);
      queueReservation(
        writer,
        workspaceId,
        `colecao-layouts:${collection.slug}`,
        layoutRef,
        layoutData
      );
    }
  }

  await writer.close();
  console.log('Importacao concluida:', importCounts);
}

main().catch((error) => {
  console.error(error.message || error);
  process.exitCode = 1;
});
