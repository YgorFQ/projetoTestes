/*
 * SenkoLib - ciclo de atualizacao do shell.
 *
 * O Service Worker nao intercepta requisicoes. O navegador pode reutilizar
 * codigo versionado, enquanto index.html aplica uma chave nova somente aos
 * arquivos do backup publico. Uma nova versao deste worker ainda limpa caches
 * antigos criados por implementacoes anteriores.
 */
self.addEventListener('install', function () {
  self.skipWaiting();
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.filter(function (key) {
        return key.indexOf('senkolib-') === 0 || key === 'senkolib';
      }).map(function (key) {
        return caches.delete(key);
      }));
    }).then(function () {
      return self.clients.claim();
    })
  );
});
