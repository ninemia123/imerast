const CACHE_NAME = 'imerast-cache-v1';
const urlsToCache = [
  '/imerast/index.html',
  '/imerast/assets/icon-192.png',
  '/imerast/assets/icon-512.png',
  '/imerast/assets/update.js',   // αν έχεις αυτό
  '/imerast/assets/style.css'    // αν έχεις CSS
];

// Install Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
  self.skipWaiting();
});

// Activate Service Worker
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(key => {
        if (key !== CACHE_NAME) {
          return caches.delete(key);
        }
      }))
    )
  );
  self.clients.claim();
});

// Fetch files
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
