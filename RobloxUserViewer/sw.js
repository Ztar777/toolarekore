self.addEventListener('install', e => {
  e.waitUntil(
    caches.open('roblox-user-cache').then(cache => {
      return cache.addAll(['/', '/index.html']);
    })
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request))
  );
});