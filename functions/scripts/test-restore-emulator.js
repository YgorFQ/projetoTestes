const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const { initializeApp, deleteApp } = require('firebase-admin/app');
const { Timestamp, getFirestore } = require('firebase-admin/firestore');

const projectId = process.env.SENKO_FIREBASE_PROJECT_ID || 'senkolibtestes';
const firestoreHost = process.env.FIRESTORE_EMULATOR_HOST || '127.0.0.1:8080';
process.env.FIRESTORE_EMULATOR_HOST = firestoreHost;
const workspaceId = `restore-test-${Date.now()}`;
const sourceWorkspaceId = 'senkolib';
const snapshotRoot = 'generated/backups/senkolib-data';
const timestamp = '2026-08-15T12:00:00.000Z';
const scriptPath = path.join(__dirname, 'restore-github-snapshot.js');

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function namedData(id, name, extra = {}) {
  return {
    id,
    workspaceId: sourceWorkspaceId,
    name,
    nameKey: name.toLowerCase(),
    version: 1,
    createdAt: timestamp,
    createdBy: 'restore-fixture',
    updatedAt: timestamp,
    updatedBy: 'restore-fixture',
    updatedByName: 'Fixture',
    ...extra
  };
}

function revisionData(resourceId, revisionId, kind, name) {
  return {
    revisionId,
    resourceId,
    workspaceId: sourceWorkspaceId,
    kind,
    name,
    tags: [],
    html: `<main>${name}</main>`,
    css: 'main { display: block; }',
    baseRevisionId: null,
    createdAt: timestamp,
    createdBy: 'restore-fixture',
    createdByName: 'Fixture'
  };
}

function buildFixture(root) {
  const files = new Map([
    [`${snapshotRoot}/workspaces/${sourceWorkspaceId}/groups/interface.json`,
      namedData('interface', 'Interface', { color: '#336699' })],
    [`${snapshotRoot}/workspaces/${sourceWorkspaceId}/bibliotecaLayouts/layout-a.json`,
      namedData('layout-a', 'Layout A', {
        kind: 'libraryLayout',
        parentId: null,
        tags: ['teste'],
        html: '<main>Layout A</main>',
        css: '',
        currentRevisionId: 'revision-1'
      })],
    [`${snapshotRoot}/workspaces/${sourceWorkspaceId}/bibliotecaLayouts/layout-a/revisions/revision-1.json`,
      revisionData('layout-a', 'revision-1', 'libraryLayout', 'Layout A')],
    [`${snapshotRoot}/workspaces/${sourceWorkspaceId}/bibliotecaLayouts/layout-a/variants/variant-a.json`,
      namedData('variant-a', 'Variant A', {
        kind: 'libraryVariant',
        parentId: 'layout-a',
        tags: [],
        html: '<main>Variant A</main>',
        css: '',
        currentRevisionId: 'revision-1'
      })],
    [`${snapshotRoot}/workspaces/${sourceWorkspaceId}/bibliotecaLayouts/layout-a/variants/variant-a/revisions/revision-1.json`,
      revisionData('variant-a', 'revision-1', 'libraryVariant', 'Variant A')],
    [`${snapshotRoot}/workspaces/${sourceWorkspaceId}/collections/collection-a.json`,
      namedData('collection-a', 'Collection A', {
        legacyId: null,
        groupId: 'interface',
        tags: ['teste']
      })],
    [`${snapshotRoot}/workspaces/${sourceWorkspaceId}/collections/collection-a/layouts/internal-a.json`,
      namedData('internal-a', 'Internal A', {
        kind: 'collectionLayout',
        parentId: 'collection-a',
        collectionId: 'collection-a',
        tags: [],
        html: '<main>Internal A</main>',
        css: '',
        currentRevisionId: 'revision-1'
      })],
    [`${snapshotRoot}/workspaces/${sourceWorkspaceId}/collections/collection-a/layouts/internal-a/revisions/revision-1.json`,
      revisionData('internal-a', 'revision-1', 'collectionLayout', 'Internal A')]
  ]);

  for (const [relativePath, data] of files) {
    const absolutePath = path.join(root, ...relativePath.split('/'));
    fs.mkdirSync(path.dirname(absolutePath), { recursive: true });
    fs.writeFileSync(absolutePath, `${JSON.stringify(data, null, 2)}\n`);
  }

  const manifest = {
    schemaVersion: 1,
    workspaceId: sourceWorkspaceId,
    exportedAt: timestamp,
    dataVersion: 42,
    files: [...files.keys()].sort()
  };
  const manifestPath = path.join(root, ...snapshotRoot.split('/'), 'manifest.json');
  fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
}

function runRestore(source, args, expectedStatus) {
  const result = spawnSync(
    process.execPath,
    [scriptPath, '--source', source, '--workspace', workspaceId, ...args],
    {
      encoding: 'utf8',
      env: {
        ...process.env,
        SENKO_FIREBASE_PROJECT_ID: projectId,
        FIRESTORE_EMULATOR_HOST: firestoreHost
      }
    }
  );
  assert(
    result.status === expectedStatus,
    `Restore retornou ${result.status}; esperado ${expectedStatus}.\n` +
    `${result.stdout}\n${result.stderr}`
  );
  return `${result.stdout}\n${result.stderr}`;
}

function runGit(root, args) {
  const result = spawnSync('git', ['-C', root, ...args], { encoding: 'utf8' });
  assert(result.status === 0, `Git falhou: ${result.stderr || result.stdout}`);
}

async function main() {
  const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'senkolib-restore-'));
  const app = initializeApp({ projectId }, `restore-test-${Date.now()}`);
  const db = getFirestore(app);
  const workspace = db.doc(`workspaces/${workspaceId}`);

  try {
    buildFixture(tempRoot);
    const dryRun = runRestore(tempRoot, ['--dry-run'], 0);
    assert(dryRun.includes('Dry-run aprovado'), 'O dry-run nao foi confirmado.');

    runGit(tempRoot, ['init', '--quiet']);
    runGit(tempRoot, ['config', 'user.name', 'SenkoLib Test']);
    runGit(tempRoot, ['config', 'user.email', 'senkolib-test@example.invalid']);
    runGit(tempRoot, ['add', 'generated/backups/senkolib-data']);
    runGit(tempRoot, ['commit', '--quiet', '-m', 'Snapshot fixture']);
    const commitDryRun = runRestore(tempRoot, ['--commit', 'HEAD', '--dry-run'], 0);
    assert(commitDryRun.includes('@ HEAD'), 'O snapshot nao foi lido pelo commit Git.');

    await workspace.collection('members').doc('member-1').set({
      uid: 'member-1',
      displayName: 'Membro preservado'
    });

    runRestore(tempRoot, [], 0);
    const [workspaceSnapshot, group, layout, variant, collection, internal, reservations] =
      await Promise.all([
        workspace.get(),
        workspace.collection('groups').doc('interface').get(),
        workspace.collection('bibliotecaLayouts').doc('layout-a').get(),
        workspace.collection('bibliotecaLayouts').doc('layout-a')
          .collection('variants').doc('variant-a').get(),
        workspace.collection('collections').doc('collection-a').get(),
        workspace.collection('collections').doc('collection-a')
          .collection('layouts').doc('internal-a').get(),
        workspace.collection('nameReservations').get()
      ]);

    assert(workspaceSnapshot.data().restoreStatus === 'completed',
      'O workspace nao registrou restauracao concluida.');
    assert(workspaceSnapshot.data().dataVersion === 42, 'dataVersion incorreta.');
    assert(group.exists && layout.exists && variant.exists && collection.exists && internal.exists,
      'Um recurso esperado nao foi restaurado.');
    assert(layout.data().createdAt instanceof Timestamp,
      'createdAt nao voltou a ser Timestamp.');
    assert(reservations.size === 5, 'Quantidade de reservas incorreta.');

    const refused = runRestore(tempRoot, [], 1);
    assert(refused.includes('ja possui conteudo'),
      'A restauracao sem --force nao foi recusada corretamente.');

    runRestore(tempRoot, ['--force'], 0);
    const member = await workspace.collection('members').doc('member-1').get();
    assert(member.exists, 'O --force removeu um membro, o que nao e permitido.');

    console.log(
      'Teste de restauracao concluido: dry-run, importacao, protecao e force aprovados.'
    );
  } finally {
    await db.recursiveDelete(workspace).catch(() => {});
    await deleteApp(app);
    fs.rmSync(tempRoot, { recursive: true, force: true });
  }
}

main().catch((error) => {
  console.error(error.stack || error.message || error);
  process.exitCode = 1;
});
