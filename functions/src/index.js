const { initializeApp } = require('firebase-admin/app');
const { setGlobalOptions } = require('firebase-functions/v2');
const { onCall } = require('firebase-functions/v2/https');

/* Mantido para emulacao e ferramentas antigas; o frontend Spark nao depende deste deploy. */
initializeApp();
setGlobalOptions({
  region: 'southamerica-east1',
  maxInstances: 10
});

const {
  bootstrapEmulatorMember,
  deleteContent,
  deleteGroup,
  ensurePresenceAccess,
  saveCollection,
  saveGroup,
  saveVersionedContent
} = require('./content');
exports.saveVersionedContent = onCall(saveVersionedContent);
exports.saveCollection = onCall(saveCollection);
exports.saveGroup = onCall(saveGroup);
exports.deleteContent = onCall(deleteContent);
exports.deleteGroup = onCall(deleteGroup);
exports.ensurePresenceAccess = onCall(ensurePresenceAccess);
exports.bootstrapEmulatorMember = onCall(bootstrapEmulatorMember);
