/*
 * SenkoLib - recarregamento sempre fresco.
 *
 * O Service Worker nao armazena arquivos. Toda requisicao GET local passa
 * pela rede com o cache HTTP desativado, reproduzindo um hard reload em
 * HTTP/HTTPS. No modo file://, o index usa URLs com uma chave por abertura.
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

self.addEventListener('fetch', function (event) {
  var url = new URL(event.request.url);

  if (event.request.method !== 'GET' || url.origin !== self.location.origin) {
    return;
  }

  event.respondWith(
    fetch(new Request(event.request, { cache: 'reload' })).catch(function () {
      return fetch(event.request, { cache: 'no-store' });
    })
  );
});
