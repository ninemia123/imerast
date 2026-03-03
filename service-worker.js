const CACHE_NAME = "imerast-v6"; // Άλλαξέ το σε v4 τώρα για να το "δει" ο Chrome
const assets = [
  "./",
  "./index.html",
  "./manifest.json",
  "./assets/icon-192.png",
  "./assets/icon-512.png"
];

// Εγκατάσταση και skipWaiting για άμεση ενεργοποίηση
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(assets);
    })
  );
  self.skipWaiting(); 
});

// Ενεργοποίηση και καθαρισμός ΠΑΛΙΩΝ caches (πολύ σημαντικό!)
self.addEventListener("activate", (event) => {
  event.waitUntil(
    Promise.all([
      clients.claim(),
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              console.log("Διαγραφή παλιάς cache:", cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
    ])
  );
});

// Στρατηγική: Network First (Πρώτα δίκτυο, μετά cache)
self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});



