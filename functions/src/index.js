const { initializeApp } = require('firebase-admin/app');
const { setGlobalOptions } = require('firebase-functions/v2');
const { onCall } = require('firebase-functions/v2/https');
const { onSchedule } = require('firebase-functions/v2/scheduler');

initializeApp();
setGlobalOptions({
  region: 'southamerica-east1',
  maxInstances: 10
});

const {
  bootstrapEmulatorMember,
  deleteContent,
  ensurePresenceAccess,
  saveCollection,
  saveVersionedContent
} = require('./content');
const {
  GITHUB_PRIVATE_KEY,
  exportGithubSnapshot,
  scheduledGithubExport
} = require('./github-export');

exports.saveVersionedContent = onCall(saveVersionedContent);
exports.saveCollection = onCall(saveCollection);
exports.deleteContent = onCall(deleteContent);
exports.ensurePresenceAccess = onCall(ensurePresenceAccess);
exports.bootstrapEmulatorMember = onCall(bootstrapEmulatorMember);

exports.exportGithubSnapshot = onCall({
  timeoutSeconds: 540,
  memory: '1GiB',
  secrets: [GITHUB_PRIVATE_KEY]
}, exportGithubSnapshot);

exports.scheduledGithubExport = onSchedule({
  schedule: 'every 30 minutes',
  timeZone: 'America/Sao_Paulo',
  timeoutSeconds: 540,
  memory: '1GiB',
  secrets: [GITHUB_PRIVATE_KEY]
}, scheduledGithubExport);
