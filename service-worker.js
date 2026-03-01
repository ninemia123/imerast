const CACHE_NAME = "imerast-v1";
const assets = [
  "./",
  "./index.html",
  "./manifest.json",
  "./assets/icon-192.png",
  "./assets/icon-512.png"
];

// Εγκατάσταση και άμεση ενεργοποίηση
self.addEventListener("install", (event) => {
  self.skipWaiting(); // Αναγκάζει τον νέο SW να ενεργοποιηθεί αμέσως
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(assets);
    })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(clients.claim()); // Παίρνει τον έλεγχο της σελίδας αμέσως
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
