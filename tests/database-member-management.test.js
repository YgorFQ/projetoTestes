const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {
  initializeTestEnvironment,
  assertFails,
  assertSucceeds
} = require('@firebase/rules-unit-testing');
const database = require('firebase/database');

const PROJECT_ID = 'senkolib-database-rules-test';
const WORKSPACE_ID = 'senkolib';

async function main() {
  const testEnvironment = await initializeTestEnvironment({
    projectId: PROJECT_ID,
    database: {
      rules: fs.readFileSync(path.join(__dirname, '..', 'config/firebase/database.rules.json'), 'utf8')
    }
  });

  try {
    await testEnvironment.withSecurityRulesDisabled(async (context) => {
      const db = context.database();
      await database.set(database.ref(db, `memberManagers/${WORKSPACE_ID}`), {
        owner: 'owner',
        admin: 'admin'
      });
      await database.set(database.ref(db, `presenceAccess/${WORKSPACE_ID}`), {
        owner: true,
        admin: true,
        editor: true
      });
    });

    const ownerDb = testEnvironment.authenticatedContext('owner').database();
    const adminDb = testEnvironment.authenticatedContext('admin').database();
    const editorDb = testEnvironment.authenticatedContext('editor').database();

    await assertSucceeds(database.set(
      database.ref(ownerDb, `presenceAccess/${WORKSPACE_ID}/novo-admin`),
      true
    ));
    await assertSucceeds(database.set(
      database.ref(ownerDb, `memberManagers/${WORKSPACE_ID}/novo-admin`),
      'admin'
    ));
    await assertSucceeds(database.set(
      database.ref(adminDb, `presenceAccess/${WORKSPACE_ID}/novo-editor`),
      true
    ));

    await assertFails(database.set(
      database.ref(adminDb, `memberManagers/${WORKSPACE_ID}/novo-owner`),
      'owner'
    ));
    await assertFails(database.set(
      database.ref(adminDb, `presenceAccess/${WORKSPACE_ID}/owner`),
      null
    ));
    await assertFails(database.set(
      database.ref(editorDb, `presenceAccess/${WORKSPACE_ID}/intruso`),
      true
    ));
    await assertFails(database.set(
      database.ref(ownerDb, `memberManagers/${WORKSPACE_ID}/owner`),
      null
    ));

    assert.equal((await database.get(database.ref(
      ownerDb,
      `presenceAccess/${WORKSPACE_ID}/owner`
    ))).val(), true);
    console.log('Realtime Database member management rules: OK');
  } finally {
    await testEnvironment.cleanup();
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
