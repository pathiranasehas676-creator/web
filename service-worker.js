const CACHE_NAME = "readify-v1";
const FILES_TO_CACHE = [
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
  "/assets/js/books.js",
  "/assets/js/tracker.js",
  "/assets/js/recommender.js",
  "/assets/js/flow.js",
  "/assets/js/feedback.js",
  "/manifest.json",
  "/assets/icons/icon-192.svg",
  "/assets/icons/icon-512.svg"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
          return null;
        })
      );
    })
  );
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
      return fetch(event.request);
    })
  );
});
