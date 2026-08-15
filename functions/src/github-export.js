const crypto = require('node:crypto');
const { getFirestore, Timestamp, GeoPoint } = require('firebase-admin/firestore');
const { HttpsError } = require('firebase-functions/v2/https');
const { requireMember } = require('./content');

/* Implementacao de servidor preservada como historico; nao e exportada por src/index.js. */
const db = getFirestore();
const GITHUB_PRIVATE_KEY = 'GITHUB_PRIVATE_KEY';

function base64Url(value) {
  return Buffer.from(value)
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

function createGithubAppJwt(appId, privateKey) {
  const now = Math.floor(Date.now() / 1000);
  const header = base64Url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const payload = base64Url(JSON.stringify({
    iat: now - 60,
    exp: now + 540,
    iss: appId
  }));
  const unsigned = `${header}.${payload}`;
  const signature = crypto.sign(
    'RSA-SHA256',
    Buffer.from(unsigned),
    privateKey.replace(/\\n/g, '\n')
  );
  return `${unsigned}.${base64Url(signature)}`;
}

async function githubRequest(path, options = {}) {
  const response = await fetch(`https://api.github.com${path}`, {
    ...options,
    headers: {
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      'User-Agent': 'SenkoLib-Firebase-Backup',
      ...(options.headers || {})
    }
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`GitHub ${response.status}: ${body.slice(0, 500)}`);
  }

  if (response.status === 204) return null;
  return response.json();
}

async function getInstallationToken(settings) {
  const jwt = createGithubAppJwt(settings.appId, settings.privateKey);
  const result = await githubRequest(
    `/app/installations/${encodeURIComponent(settings.installationId)}/access_tokens`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    }
  );
  return result.token;
}

function serializeValue(value) {
  if (value === null || value === undefined) return value ?? null;
  if (value instanceof Timestamp) return value.toDate().toISOString();
  if (value instanceof GeoPoint) {
    return { latitude: value.latitude, longitude: value.longitude };
  }
  if (Buffer.isBuffer(value)) return value.toString('base64');
  if (Array.isArray(value)) return value.map(serializeValue);
  if (value && typeof value.path === 'string' &&
      value.constructor && value.constructor.name === 'DocumentReference') {
    return { documentPath: value.path };
  }
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([key, child]) => [key, serializeValue(child)])
    );
  }
  return value;
}

async function collectCollection(collectionRef, output, relativePath) {
  const snapshot = await collectionRef.get();

  for (const documentSnapshot of snapshot.docs) {
    const documentPath = `${relativePath}/${documentSnapshot.id}`;
    output[`${documentPath}.json`] =
      `${JSON.stringify(serializeValue(documentSnapshot.data()), null, 2)}\n`;

    const subcollections = await documentSnapshot.ref.listCollections();
    for (const subcollection of subcollections) {
      await collectCollection(
        subcollection,
        output,
        `${documentPath}/${subcollection.id}`
      );
    }
  }
}

async function buildWorkspaceFiles(workspaceId, metadata) {
  const output = {};
  const workspace = db.doc(`workspaces/${workspaceId}`);
  const collections = [
    'groups',
    'bibliotecaLayouts',
    'collections'
  ];

  for (const collectionName of collections) {
    await collectCollection(
      workspace.collection(collectionName),
      output,
      `senkolib-data/workspaces/${workspaceId}/${collectionName}`
    );
  }

  output['senkolib-data/manifest.json'] = `${JSON.stringify({
    schemaVersion: 1,
    workspaceId,
    exportedAt: new Date().toISOString(),
    dataVersion: Number(metadata.dataVersion || 0),
    files: Object.keys(output).sort()
  }, null, 2)}\n`;

  return output;
}

async function buildConsistentWorkspaceFiles(workspaceId, firstWorkspaceData) {
  const workspaceRef = db.doc(`workspaces/${workspaceId}`);
  let workspaceData = firstWorkspaceData;

  for (let attempt = 1; attempt <= 3; attempt += 1) {
    if (!workspaceData) {
      const before = await workspaceRef.get();
      if (!before.exists) throw new Error(`Workspace ${workspaceId} nao encontrado.`);
      workspaceData = before.data();
    }

    const expectedVersion = Number(workspaceData.dataVersion || 0);
    const files = await buildWorkspaceFiles(workspaceId, workspaceData);
    const after = await workspaceRef.get();
    if (!after.exists) throw new Error(`Workspace ${workspaceId} foi excluido.`);

    const currentVersion = Number(after.data().dataVersion || 0);
    if (currentVersion === expectedVersion) {
      return { files, dataVersion: expectedVersion };
    }

    workspaceData = after.data();
  }

  throw new Error(
    'O workspace mudou durante tres tentativas de backup. Tente novamente quando as escritas diminuirem.'
  );
}

async function mapWithConcurrency(items, concurrency, worker) {
  const results = new Array(items.length);
  let nextIndex = 0;

  async function run() {
    while (nextIndex < items.length) {
      const index = nextIndex++;
      results[index] = await worker(items[index], index);
    }
  }

  await Promise.all(
    Array.from({ length: Math.min(concurrency, items.length) }, run)
  );
  return results;
}

async function commitFilesToGithub(files, message, settings) {
  const token = await getInstallationToken(settings);
  const authHeaders = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json'
  };
  const repoPath =
    `/repos/${encodeURIComponent(settings.owner)}/${encodeURIComponent(settings.repo)}`;
  const branchPath = settings.branch
    .split('/')
    .map(encodeURIComponent)
    .join('/');

  const reference = await githubRequest(
    `${repoPath}/git/ref/heads/${branchPath}`,
    { headers: authHeaders }
  );
  const headSha = reference.object.sha;
  const headCommit = await githubRequest(
    `${repoPath}/git/commits/${encodeURIComponent(headSha)}`,
    { headers: authHeaders }
  );
  const currentTree = await githubRequest(
    `${repoPath}/git/trees/${encodeURIComponent(headCommit.tree.sha)}?recursive=1`,
    { headers: authHeaders }
  );

  if (currentTree.truncated) {
    throw new Error('A arvore do repositorio e grande demais para exportacao segura.');
  }

  const fileEntries = Object.entries(files);
  const blobs = await mapWithConcurrency(fileEntries, 8, async ([path, content]) => {
    const blob = await githubRequest(`${repoPath}/git/blobs`, {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify({
        content,
        encoding: 'utf-8'
      })
    });
    return {
      path,
      mode: '100644',
      type: 'blob',
      sha: blob.sha
    };
  });

  const nextPaths = new Set(fileEntries.map(([path]) => path));
  const removals = (currentTree.tree || [])
    .filter((entry) => entry.type === 'blob')
    .filter((entry) => entry.path.startsWith('senkolib-data/'))
    .filter((entry) => !nextPaths.has(entry.path))
    .map((entry) => ({
      path: entry.path,
      mode: '100644',
      type: 'blob',
      sha: null
    }));

  const tree = await githubRequest(`${repoPath}/git/trees`, {
    method: 'POST',
    headers: authHeaders,
    body: JSON.stringify({
      base_tree: headCommit.tree.sha,
      tree: blobs.concat(removals)
    })
  });
  const commit = await githubRequest(`${repoPath}/git/commits`, {
    method: 'POST',
    headers: authHeaders,
    body: JSON.stringify({
      message,
      tree: tree.sha,
      parents: [headSha]
    })
  });
  await githubRequest(`${repoPath}/git/refs/heads/${branchPath}`, {
    method: 'PATCH',
    headers: authHeaders,
    body: JSON.stringify({
      sha: commit.sha,
      force: false
    })
  });

  return {
    commitSha: commit.sha,
    url: `https://github.com/${settings.owner}/${settings.repo}/commit/${commit.sha}`
  };
}

function readSettings() {
  const settings = {
    owner: process.env.GITHUB_OWNER,
    repo: process.env.GITHUB_REPO,
    branch: process.env.GITHUB_BRANCH || 'main',
    appId: process.env.GITHUB_APP_ID,
    installationId: process.env.GITHUB_INSTALLATION_ID,
    privateKey: process.env.GITHUB_PRIVATE_KEY
  };

  const missing = Object.entries(settings)
    .filter(([, value]) => !String(value || '').trim())
    .map(([key]) => key);
  if (missing.length) {
    throw new Error(`Configuracao GitHub incompleta: ${missing.join(', ')}`);
  }
  return settings;
}

async function performGithubExport({
  workspaceId,
  triggeredBy,
  force
}) {
  const workspaceRef = db.doc(`workspaces/${workspaceId}`);
  const workspaceSnapshot = await workspaceRef.get();
  if (!workspaceSnapshot.exists) {
    throw new Error(`Workspace ${workspaceId} nao encontrado.`);
  }

  const workspaceData = workspaceSnapshot.data();
  const initialDataVersion = Number(workspaceData.dataVersion || 0);
  const lastExportVersion = Number(workspaceData.lastGithubExportVersion || -1);
  if (!force && initialDataVersion === lastExportVersion) {
    return {
      skipped: true,
      dataVersion: initialDataVersion
    };
  }

  const jobRef = workspaceRef.collection('exports').doc();
  await jobRef.set({
    status: 'running',
    dataVersion: initialDataVersion,
    triggeredBy,
    startedAt: Timestamp.now()
  });

  try {
    const snapshot = await buildConsistentWorkspaceFiles(workspaceId, workspaceData);
    const { files, dataVersion } = snapshot;
    await jobRef.set({ dataVersion }, { merge: true });
    const exported = await commitFilesToGithub(
      files,
      `SenkoLib backup v${dataVersion} (${triggeredBy})`,
      readSettings()
    );
    const completedAt = Timestamp.now();

    await Promise.all([
      jobRef.set({
        status: 'completed',
        completedAt,
        commitSha: exported.commitSha,
        commitUrl: exported.url,
        fileCount: Object.keys(files).length
      }, { merge: true }),
      workspaceRef.set({
        lastGithubExportVersion: dataVersion,
        lastGithubExportAt: completedAt,
        lastGithubCommitSha: exported.commitSha
      }, { merge: true })
    ]);

    return {
      skipped: false,
      dataVersion,
      fileCount: Object.keys(files).length,
      ...exported
    };
  } catch (error) {
    await jobRef.set({
      status: 'failed',
      completedAt: Timestamp.now(),
      error: String(error.message || error).slice(0, 1000)
    }, { merge: true });
    throw error;
  }
}

async function exportGithubSnapshot(request) {
  const data = request.data || {};
  const workspaceId = String(data.workspaceId || process.env.SENKO_WORKSPACE_ID || 'senkolib');
  await requireMember(request.auth, workspaceId);

  try {
    return await performGithubExport({
      workspaceId,
      triggeredBy: request.auth.uid,
      force: Boolean(data.force)
    });
  } catch (error) {
    throw new HttpsError('internal', error.message || 'Falha no backup do GitHub.');
  }
}

module.exports = {
  GITHUB_PRIVATE_KEY,
  exportGithubSnapshot
};
