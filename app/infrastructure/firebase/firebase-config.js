(function () {
  var isLocalhost = window.location.hostname === '127.0.0.1'
    || window.location.hostname === 'localhost';

  /*
   * Este arquivo contem somente a configuracao publica do app Web.
   * As chaves privadas do GitHub e credenciais administrativas nunca entram
   * aqui. Consulte FIREBASE_SETUP.md antes de ativar.
   */
  window.SenkoFirebaseConfig = {
    enabled: isLocalhost,
    sdkVersion: '12.17.0',
    workspaceId: 'senkolib',
    region: 'southamerica-east1',

    /*
     * Ative somente no localhost quando estiver usando
     * `npm run firebase:emulators`.
     */
    useEmulators: isLocalhost,

    firebase: {
      apiKey: 'AIzaSyCo3swY46GXK0QoAqspyytD4qVkn06nB1s',
      authDomain: 'senkolibtestes.firebaseapp.com',
      projectId: 'senkolibtestes',
      storageBucket: 'senkolibtestes.firebasestorage.app',
      messagingSenderId: '340361654040',
      appId: '1:340361654040:web:d3a1e37fe4cfd70724786d',
      measurementId: 'G-YWY0VM8S4B',
      databaseURL: 'https://senkolibtestes-default-rtdb.firebaseio.com'
    }
  };
})();
