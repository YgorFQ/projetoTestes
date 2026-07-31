(function () {
  /*
   * Este arquivo contem somente a configuracao publica do app Web.
   * As chaves privadas do GitHub e credenciais administrativas nunca entram
   * aqui. Consulte FIREBASE_SETUP.md antes de ativar.
   */
  window.SenkoFirebaseConfig = {
    enabled: false,
    sdkVersion: '12.17.0',
    workspaceId: 'senkolib',
    region: 'southamerica-east1',

    /*
     * Ative somente no localhost quando estiver usando
     * `npm run firebase:emulators`.
     */
    useEmulators: false,

    firebase: {
      apiKey: '',
      authDomain: '',
      projectId: '',
      storageBucket: '',
      messagingSenderId: '',
      appId: '',
      databaseURL: ''
    }
  };
})();

