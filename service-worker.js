const CACHE_NAME = "imerast-v1";
// ΜΟΝΟ τα αρχεία που υπάρχουν όντως στο GitHub σου
const assets = [
  "./",
  "./index.html",
  "./manifest.json",
  "./assets/icon-192.png",
  "./assets/icon-512.png"
];

self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Το cache.addAll θα αποτύχει αν έστω και ΕΝΑ αρχείο λείπει
      return cache.addAll(assets);
    })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(clients.claim());
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
