const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const {
  initializeTestEnvironment,
  assertFails
} = require('@firebase/rules-unit-testing');
const firestore = require('firebase/firestore');

const PROJECT_ID = 'senkolib-rules-test';
const WORKSPACE_ID = 'senkolib';
const MEMBER_UID = 'member-1';

async function seed(testEnvironment) {
  await testEnvironment.withSecurityRulesDisabled(async (context) => {
    const db = context.firestore();
    await firestore.setDoc(firestore.doc(db, `workspaces/${WORKSPACE_ID}`), {
      name: 'SenkoLib',
      schemaVersion: 1,
      dataVersion: 0
    });
    await firestore.setDoc(
      firestore.doc(db, `workspaces/${WORKSPACE_ID}/members/${MEMBER_UID}`),
      {
        uid: MEMBER_UID,
        email: 'member@example.com',
        displayName: 'Membro de teste'
      }
    );
  });
}

function loadClientWriter(db) {
  global.window = {
    crypto: crypto.webcrypto,
    SenkoFirebase: {
      whenAuthorized: () => Promise.resolve(),
      getClientContext: () => ({
        db,
        firestore,
        user: {
          uid: MEMBER_UID,
          email: 'member@example.com',
          displayName: 'Membro de teste'
        },
        member: { uid: MEMBER_UID },
        workspaceId: WORKSPACE_ID
      })
    }
  };
  delete require.cache[require.resolve('../app/infrastructure/firebase/senko-firestore-writes.js')];
  require('../app/infrastructure/firebase/senko-firestore-writes.js');
  return global.window.SenkoFirestoreWrites;
}

async function expectClientError(promise, code) {
  await assert.rejects(promise, (error) => {
    assert.equal(error.code, code);
    return true;
  });
}

async function testGithubBackup(memberDb, writes) {
  await writes.saveGroup({
    groupId: 'grupo-backup',
    name: 'Grupo do backup',
    color: '#224466',
    expectedVersion: null
  });

  const requests = [];
  const originalFetch = global.fetch;
  global.localStorage = {
    values: new Map(),
    getItem(key) { return this.values.get(key) || null; },
    setItem(key, value) { this.values.set(key, String(value)); },
    removeItem(key) { this.values.delete(key); }
  };
  global.window.SenkoFirebaseConfig = {
    githubBackup: { owner: 'example', repo: 'repo', branch: 'main' }
  };

  global.fetch = async (url, options = {}) => {
    const method = options.method || 'GET';
    requests.push({ url, method, body: options.body || '' });
    let body;

    if (url.endsWith('/git/ref/heads/main') && method === 'GET') {
      body = { object: { sha: 'head-sha' } };
    } else if (url.endsWith('/git/commits/head-sha') && method === 'GET') {
      body = { tree: { sha: 'base-tree' } };
    } else if (url.includes('/git/trees/base-tree?recursive=1')) {
      body = {
        truncated: false,
        tree: [{ path: 'senkolib-data/arquivo-antigo.json', type: 'blob', sha: 'old' }]
      };
    } else if (url.endsWith('/git/trees') && method === 'POST') {
      body = { sha: 'next-tree' };
    } else if (url.endsWith('/git/commits') && method === 'POST') {
      body = { sha: 'commit-sha' };
    } else if (url.endsWith('/git/refs/heads/main') && method === 'PATCH') {
      body = { object: { sha: 'commit-sha' } };
    } else {
      return new Response(JSON.stringify({ message: `Rota inesperada: ${method} ${url}` }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify(body), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  };

  try {
    delete require.cache[require.resolve('../app/infrastructure/firebase/senko-github-backup.js')];
    require('../app/infrastructure/firebase/senko-github-backup.js');
    const result = await global.window.SenkoGithubBackup.run({
      credentials: {
        owner: 'example',
        repo: 'repo',
        branch: 'main',
        token: 'token-de-teste'
      }
    });

    assert.equal(result.commitSha, 'commit-sha');
    assert.equal(result.dataVersion, 10);
    assert.equal(result.fileCount, 2);

    const treeRequest = requests.find((request) =>
      request.method === 'POST' && request.url.endsWith('/git/trees')
    );
    const treeBody = JSON.parse(treeRequest.body);
    assert.equal(requests.filter((request) => request.url.endsWith('/git/blobs')).length, 0);
    assert.ok(treeBody.tree.some((entry) =>
      entry.path === 'senkolib-data/workspaces/senkolib/groups/grupo-backup.json' &&
      typeof entry.content === 'string'
    ));
    assert.ok(treeBody.tree.some((entry) =>
      entry.path === 'senkolib-data/manifest.json' && typeof entry.content === 'string'
    ));
    assert.ok(treeBody.tree.some((entry) =>
      entry.path === 'senkolib-data/arquivo-antigo.json' && entry.sha === null
    ));

    const workspace = await firestore.getDoc(firestore.doc(
      memberDb,
      `workspaces/${WORKSPACE_ID}`
    ));
    assert.equal(workspace.data().lastGithubExportVersion, 10);
    assert.equal(workspace.data().lastGithubCommitSha, 'commit-sha');

    global.fetch = async () => new Response(JSON.stringify({
      message: 'You have exceeded a secondary rate limit. Please wait.'
    }), {
      status: 403,
      headers: { 'Content-Type': 'application/json', 'Retry-After': '120' }
    });
    await assert.rejects(
      () => global.window.SenkoGithubBackup.run({
        credentials: {
          owner: 'example', repo: 'repo', branch: 'main', token: 'token-de-teste'
        }
      }),
      (error) => error.code === 'github-backup/rate-limited' &&
        error.message === 'O GitHub limitou temporariamente os backups. Aguarde cerca de 2 minuto(s).'
    );

    global.fetch = async () => {
      throw new TypeError('NetworkError when attempting to fetch resource.');
    };
    await assert.rejects(
      () => global.window.SenkoGithubBackup.run({
        credentials: {
          owner: 'example', repo: 'repo', branch: 'main', token: 'token-de-teste'
        }
      }),
      (error) => error.code === 'github-backup/network' &&
        error.message === 'Nao foi possivel conectar a API do GitHub. Confira a internet e tente novamente.'
    );
  } finally {
    global.fetch = originalFetch;
  }
}

async function main() {
  const testEnvironment = await initializeTestEnvironment({
    projectId: PROJECT_ID,
    firestore: {
      rules: fs.readFileSync(path.join(__dirname, '..', 'firestore.rules'), 'utf8')
    }
  });

  try {
    await testEnvironment.clearFirestore();
    await seed(testEnvironment);
    const memberDb = testEnvironment.authenticatedContext(MEMBER_UID, {
      email: 'member@example.com'
    }).firestore();
    const outsiderDb = testEnvironment.authenticatedContext('outsider').firestore();
    const writes = loadClientWriter(memberDb);

    const group = await writes.saveGroup({
      groupId: 'grupo-teste',
      name: 'Grupo teste',
      color: '#336699',
      expectedVersion: null
    });
    assert.equal(group.version, 1);

    const collection = await writes.saveCollection({
      collectionId: 'colecao-teste',
      legacyId: 'colecao-teste',
      name: 'Colecao teste',
      groupId: 'grupo-teste',
      tags: ['firebase'],
      expectedVersion: null
    });
    assert.equal(collection.version, 1);

    const libraryLayout = await writes.saveVersionedContent({
      kind: 'libraryLayout',
      resourceId: null,
      parentId: null,
      legacyId: null,
      name: 'Layout de teste',
      tags: ['layout'],
      html: '<section>Teste</section>',
      css: '.teste { color: red; }',
      baseRevisionId: null
    });
    assert.equal(libraryLayout.version, 1);

    const libraryUpdate = await writes.saveVersionedContent({
      kind: 'libraryLayout',
      resourceId: libraryLayout.id,
      parentId: null,
      name: 'Layout de teste',
      tags: ['layout', 'editado'],
      html: '<section>Editado</section>',
      css: '.teste { color: blue; }',
      baseRevisionId: libraryLayout.revisionId
    });
    assert.equal(libraryUpdate.version, 2);

    await expectClientError(writes.saveVersionedContent({
      kind: 'libraryLayout',
      resourceId: libraryLayout.id,
      parentId: null,
      name: 'Layout de teste',
      tags: [],
      html: '<section>Conflito</section>',
      css: '',
      baseRevisionId: libraryLayout.revisionId
    }), 'functions/aborted');

    const variant = await writes.saveVersionedContent({
      kind: 'libraryVariant',
      resourceId: null,
      parentId: libraryLayout.id,
      name: 'Variacao de teste',
      tags: [],
      html: '<section>Variacao</section>',
      css: '',
      baseRevisionId: null
    });
    assert.equal(variant.version, 1);

    const collectionLayout = await writes.saveVersionedContent({
      kind: 'collectionLayout',
      resourceId: null,
      parentId: collection.id,
      name: 'Layout interno',
      tags: [],
      html: '<section>Interno</section>',
      css: '',
      baseRevisionId: null
    });
    assert.equal(collectionLayout.version, 1);

    await writes.deleteContent({
      kind: 'libraryLayout',
      resourceId: libraryLayout.id,
      expectedRevisionId: libraryUpdate.revisionId
    });
    assert.equal((await firestore.getDoc(firestore.doc(
      memberDb,
      `workspaces/${WORKSPACE_ID}/bibliotecaLayouts/${libraryLayout.id}`
    ))).exists(), false);
    assert.equal((await firestore.getDoc(firestore.doc(
      memberDb,
      `workspaces/${WORKSPACE_ID}/bibliotecaLayouts/${libraryLayout.id}/variants/${variant.id}`
    ))).exists(), false);

    await writes.deleteContent({
      kind: 'collection',
      resourceId: collection.id,
      expectedVersion: collection.version
    });
    await writes.deleteGroup({
      groupId: group.id,
      expectedVersion: group.version
    });

    const workspaceRef = firestore.doc(memberDb, `workspaces/${WORKSPACE_ID}`);
    const exportRef = firestore.doc(firestore.collection(workspaceRef, 'exports'));
    await firestore.setDoc(exportRef, {
      status: 'running',
      triggeredBy: MEMBER_UID,
      triggeredByName: 'Membro de teste',
      startedAt: firestore.serverTimestamp()
    });
    await firestore.setDoc(exportRef, {
      status: 'completed',
      dataVersion: 9,
      completedAt: firestore.serverTimestamp(),
      commitSha: '1234567890abcdef',
      commitUrl: 'https://github.com/example/repo/commit/1234567890abcdef',
      fileCount: 10
    }, { merge: true });
    await firestore.setDoc(workspaceRef, {
      lastGithubExportVersion: 9,
      lastGithubExportAt: firestore.serverTimestamp(),
      lastGithubCommitSha: '1234567890abcdef'
    }, { merge: true });

    await assertFails(firestore.getDoc(firestore.doc(
      outsiderDb,
      `workspaces/${WORKSPACE_ID}/groups/privado`
    )));
    await assertFails(firestore.setDoc(firestore.doc(
      memberDb,
      `workspaces/${WORKSPACE_ID}/members/outro`
    ), { uid: 'outro' }));
    await assertFails(firestore.setDoc(firestore.doc(
      outsiderDb,
      `workspaces/${WORKSPACE_ID}/groups/invasor`
    ), { id: 'invasor' }));
    await assertFails(firestore.setDoc(firestore.doc(
      memberDb,
      `workspaces/${WORKSPACE_ID}/groups/invalido`
    ), { id: 'invalido' }));

    const workspace = await firestore.getDoc(workspaceRef);
    assert.equal(workspace.data().dataVersion, 9);
    assert.equal(workspace.data().lastGithubExportVersion, 9);
    await testGithubBackup(memberDb, writes);
    console.log('Firestore client/rules test: OK');
  } finally {
    await testEnvironment.cleanup();
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
