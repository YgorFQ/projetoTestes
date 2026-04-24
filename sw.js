/* ═══════════════════════════════════════════════════════════════════════
   sw.js — Service Worker do SenkoLib
   ───────────────────────────────────────────────────────────────────────
   Estratégia: Network First para todos os recursos locais.
   O browser sempre busca a versão mais recente na rede.
   O cache nunca é usado como resposta final — só como fallback de rede.
   Equivalente a Ctrl+Shift+R em todo reload.
═══════════════════════════════════════════════════════════════════════ */

var CACHE_NAME = 'senkolib-v1';

/* ── Install: ativa imediatamente sem esperar abas fecharem ── */
self.addEventListener('install', function (e) {
  self.skipWaiting();
});

/* ── Activate: assume controle de todas as abas abertas ── */
self.addEventListener('activate', function (e) {
  e.waitUntil(
    /* Remove caches de versões antigas */
    caches.keys().then(function (keys) {
      return Promise.all(
        keys.filter(function (key) { return key !== CACHE_NAME; })
            .map(function (key) { return caches.delete(key); })
      );
    }).then(function () {
      return self.clients.claim();
    })
  );
});

/* ── Fetch: Network First para recursos locais ── */
self.addEventListener('fetch', function (e) {
  var url = new URL(e.request.url);

  /* Deixa passar sem interceptar:
     - Requisições externas (Google Fonts, GitHub API, etc.)
     - Requisições que não sejam GET */
  if (url.origin !== self.location.origin || e.request.method !== 'GET') {
    return;
  }

  e.respondWith(
    fetch(e.request, { cache: 'no-store' })
      .then(function (response) {
        /* Atualiza o cache com a resposta fresca */
        if (response.ok) {
          var clone = response.clone();
          caches.open(CACHE_NAME).then(function (cache) {
            cache.put(e.request, clone);
          });
        }
        return response;
      })
      .catch(function () {
        /* Rede falhou — usa cache como fallback (modo offline) */
        return caches.match(e.request);
      })
  );
});
