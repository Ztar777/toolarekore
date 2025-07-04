// キャッシュしてオフライン対応
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open('roblox-cache').then(cache => {
      return cache.addAll(['/', '/index.html']);
    })
  );
});
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(response => response || fetch(e.request))
  );
});