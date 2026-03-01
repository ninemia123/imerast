const CACHE_NAME = "imerast-cache-v1";

// Χρησιμοποιούμε σχετικές διαδρομές (./) για να παίζει σωστά στο GitHub Pages
const urlsToCache = [
  "./",
  "./index.html",
  "./manifest.json",
  "./assets/icon-192.png",
  "./assets/icon-512.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Προσθέτουμε τα αρχεία στο cache
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Επιστρέφει το αρχείο από το cache αν υπάρχει, αλλιώς πάει στο δίκτυο
      return response || fetch(event.request);
    })
  );
});
