const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const source = fs.readFileSync(
  path.join(__dirname, '..', 'app', 'infrastructure', 'firebase', 'senko-firebase.js'),
  'utf8'
);

const browserListeners = {};
const context = {
  console,
  Date,
  Error,
  Promise,
  navigator: { onLine: true },
  CustomEvent: function CustomEvent(type, options) {
    this.type = type;
    this.detail = options && options.detail;
  },
  window: {
    SenkoFirebaseConfig: { enabled: false },
    addEventListener(type, listener) {
      browserListeners[type] = listener;
    },
    dispatchEvent() {}
  }
};

vm.runInNewContext(source, context, { filename: 'senko-firebase.js' });

const api = context.window.SenkoFirebase;

assert.equal(api.describeServiceError({ code: 'firestore/resource-exhausted' }).kind, 'quota');
assert.equal(api.describeServiceError({ message: 'Quota exceeded.' }).kind, 'quota');
assert.equal(api.describeServiceError({ code: 'unavailable' }).kind, 'unavailable');

context.navigator.onLine = false;
assert.equal(api.describeServiceError({ code: 'network-request-failed' }).kind, 'offline');
context.navigator.onLine = true;

assert.equal(api.describeServiceError({ code: 'permission-denied' }).kind, 'error');

api.reportServiceError({ code: 'permission-denied' }, 'write');
assert.equal(api.getState().status, 'disabled');
assert.equal(api.getState().serviceIssue, null);

api.reportServiceError({ code: 'resource-exhausted' }, 'test');
assert.equal(api.getState().status, 'error');
assert.equal(api.getState().serviceIssue.kind, 'quota');
assert.equal(api.getState().serviceIssue.source, 'test');
assert.equal(typeof browserListeners.offline, 'function');

console.log('Firebase service health test: OK');
