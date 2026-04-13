/* ═══════════════════════════════════════════════════════════════════════
   sw.js — Service Worker do SenkoLib
   ───────────────────────────────────────────────────────────────────────
   Estratégia: Auto-destruição.
   Limpa todos os caches existentes e se desregistra completamente.
   Após isso, o navegador se comporta como se o SW nunca tivesse existido
   — todo F5 equivale a Ctrl+Shift+R.
═══════════════════════════════════════════════════════════════════════ */

self.addEventListener('install', function (e) {
  /* Ativa imediatamente, sem esperar abas fecharem */
  self.skipWaiting();
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    /* 1. Apaga todos os caches */
    caches.keys()
      .then(function (keys) {
        return Promise.all(keys.map(function (key) { return caches.delete(key); }));
      })
      .then(function () {
        /* 2. Assume controle das abas abertas */
        return self.clients.claim();
      })
      .then(function () {
        /* 3. Se desregistra — some de vez */
        return self.registration.unregister();
      })
      .then(function () {
        /* 4. Avisa todas as abas para recarregar sem cache */
        return self.clients.matchAll({ type: 'window' });
      })
      .then(function (clients) {
        clients.forEach(function (client) {
          client.navigate(client.url);
        });
      })
  );
});
