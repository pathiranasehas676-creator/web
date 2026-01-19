const CACHE_NAME = "readify-static-v1";
const ASSETS_TO_CACHE = [
  "/",
  "/index.html",
  "/book-explorer.html",
  "/progress-tracker.html",
  "/random-recommender.html",
  "/reading-flow.html",
  "/feedback.html",
  "/assets/css/style.css",
  "/assets/js/app.js",
  "/assets/js/home.js",
  "/assets/js/book-explorer.js",
  "/assets/js/progress-tracker.js",
  "/assets/js/random-recommender.js",
  "/assets/js/reading-flow.js",
  "/assets/js/feedback.js",
  "/manifest.json",
  "/assets/icons/icon-192.svg",
  "/assets/icons/icon-512.svg"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(ASSETS_TO_CACHE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
          return null;
        })
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(event.request).then((response) => {
        if (!response || response.status !== 200 || response.type !== "basic") {
          return response;
        }

        const responseClone = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseClone);
        });
        return response;
      });
    })
  );
});
