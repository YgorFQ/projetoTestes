const assert = require('node:assert/strict');

const projectId = process.env.SENKO_FIREBASE_PROJECT_ID || 'senkolibtestes';
const authBase = process.env.FIREBASE_AUTH_EMULATOR_URL || 'http://127.0.0.1:9099';
const functionsBase = process.env.FIREBASE_FUNCTIONS_EMULATOR_URL ||
  `http://127.0.0.1:5001/${projectId}/southamerica-east1`;

async function readJson(response) {
  const text = await response.text();
  return text ? JSON.parse(text) : {};
}

async function createTestUser(suffix) {
  const response = await fetch(
    `${authBase}/identitytoolkit.googleapis.com/v1/accounts:signUp?key=fake-api-key`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: `groups-${suffix}@senkolib.test`,
        password: 'senkolib-test-password',
        displayName: 'Teste de grupos',
        returnSecureToken: true
      })
    }
  );
  const body = await readJson(response);
  if (!response.ok) throw new Error(body.error?.message || 'Falha ao criar usuario local.');
  return body;
}

async function callFunction(name, data, token) {
  const response = await fetch(`${functionsBase}/${name}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ data })
  });
  const body = await readJson(response);
  if (!response.ok || body.error) {
    const error = new Error(body.error?.message || `Function ${name} falhou.`);
    error.code = body.error?.status || String(response.status);
    throw error;
  }
  return body.result;
}

async function expectFunctionError(expectedCode, operation) {
  try {
    await operation();
  } catch (error) {
    assert.equal(error.code, expectedCode);
    return;
  }
  assert.fail(`Era esperado o erro ${expectedCode}.`);
}

async function deleteTestUser(token) {
  await fetch(
    `${authBase}/identitytoolkit.googleapis.com/v1/accounts:delete?key=fake-api-key`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idToken: token })
    }
  );
}

async function main() {
  const suffix = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  const groupId = `grupo-teste-${suffix}`;
  const collectionId = `colecao-teste-${suffix}`;
  const user = await createTestUser(suffix);
  const token = user.idToken;

  try {
    await callFunction('bootstrapEmulatorMember', { workspaceId: 'senkolib' }, token);

    const createdGroup = await callFunction('saveGroup', {
      workspaceId: 'senkolib',
      groupId,
      name: `Grupo teste ${suffix}`,
      color: '#336699',
      expectedVersion: null
    }, token);
    assert.equal(createdGroup.id, groupId);
    assert.equal(createdGroup.version, 1);

    const editedGroup = await callFunction('saveGroup', {
      workspaceId: 'senkolib',
      groupId,
      name: `Grupo editado ${suffix}`,
      color: '#224466',
      expectedVersion: createdGroup.version
    }, token);
    assert.equal(editedGroup.version, 2);

    await expectFunctionError('ALREADY_EXISTS', function () {
      return callFunction('saveGroup', {
        workspaceId: 'senkolib',
        groupId: `grupo-duplicado-${suffix}`,
        name: `Grupo editado ${suffix}`,
        color: '#224466',
        expectedVersion: null
      }, token);
    });

    await expectFunctionError('ABORTED', function () {
      return callFunction('deleteGroup', {
        workspaceId: 'senkolib',
        groupId,
        expectedVersion: createdGroup.version
      }, token);
    });

    await expectFunctionError('NOT_FOUND', function () {
      return callFunction('saveCollection', {
        workspaceId: 'senkolib',
        collectionId: `invalida-${suffix}`,
        name: `Colecao invalida ${suffix}`,
        groupId: `grupo-ausente-${suffix}`,
        tags: [],
        expectedVersion: null
      }, token);
    });

    const collection = await callFunction('saveCollection', {
      workspaceId: 'senkolib',
      collectionId,
      name: `Colecao teste ${suffix}`,
      groupId,
      tags: ['teste'],
      expectedVersion: null
    }, token);

    await expectFunctionError('FAILED_PRECONDITION', function () {
      return callFunction('deleteGroup', {
        workspaceId: 'senkolib',
        groupId,
        expectedVersion: editedGroup.version
      }, token);
    });

    await callFunction('deleteContent', {
      workspaceId: 'senkolib',
      kind: 'collection',
      resourceId: collectionId,
      expectedVersion: collection.version
    }, token);

    const deletedGroup = await callFunction('deleteGroup', {
      workspaceId: 'senkolib',
      groupId,
      expectedVersion: editedGroup.version
    }, token);
    assert.equal(deletedGroup.deleted, true);
    assert.equal(deletedGroup.id, groupId);

    console.log('Teste de grupos concluido: criar, editar, validar uso e excluir.');
  } finally {
    await deleteTestUser(token);
  }
}

main().catch(function (error) {
  console.error(error.stack || error.message || error);
  process.exitCode = 1;
});
