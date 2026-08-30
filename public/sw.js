/* ============================================================
   Pedro dApps — Blog · Service Worker (Web Push nativo)
   Recebe push "vazio" e mostra a notificação com o último post
   (buscado em /novidades.json, gerado no build).
   ============================================================ */

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('push', (event) => {
  event.waitUntil(showLatestNotification());
});

async function showLatestNotification() {
  const fallback = () =>
    self.registration.showNotification('Novo post no Pedro dApps', {
      body: 'Novo conteúdo publicado no blog.',
      icon: '/images/pedrodapps_logo.png',
      badge: '/images/favicon-32x32.png',
      tag: 'pedro-dapps-blog',
      renotify: true,
    });

  try {
    const res = await fetch('/novidades.json');
    const data = await res.json();
    const title = data.title || 'Novo post no Pedro dApps';
    const body = data.description || 'Novo conteúdo publicado no blog.';
    const url = data.url || '/';
    await self.registration.showNotification(title, {
      body,
      icon: '/images/pedrodapps_logo.png',
      badge: '/images/favicon-32x32.png',
      data: { url },
      tag: 'pedro-dapps-blog',
      renotify: true,
    });
  } catch (err) {
    await fallback();
  }
}

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const target = (event.notification.data && event.notification.data.url) || '/';
  event.waitUntil(
    self.clients
      .matchAll({ type: 'window', includeUncontrolled: true })
      .then((clientList) => {
        for (const client of clientList) {
          if ('focus' in client) {
            client.navigate(target);
            return client.focus();
          }
        }
        return self.clients.openWindow(new URL(target, self.registration.scope).href);
      }),
  );
});
