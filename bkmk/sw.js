const staticCacheName = "static-cache-v4";
const dynamicCacheName = "dynamic-cache-v1";
const assets = [
  "./",
  "./index.html",
  "./manifest.json",
  "./css/style.css",
  "./css/reset.css",
  "./js/app.js",
  "./js/beautify.min.js",
  "./data/tool_icon.png",
];

self.addEventListener("install", (evt) => {
  evt.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      cache.addAll(assets);
    })
  );
});

self.addEventListener("activae", (evt) => {
  evt.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key !== staticCacheName && key != dynamicCacheName)
          .map((key) => caches.delete())
      );
    })
  );
});

self.addEventListener("fetch", (evt) => {
  evt.respondWith(
    caches
      .match(evt.request)
      .then((cacheRes) => {
        return (
          cacheRes ||
          fetch(evt.request).then((fetchRes) => {
            return caches.open(dynamicCacheName).then((cache) => {
              cache.put(evt.request.url, fetchRes.clone());
              limitCacheSize(dynamicCacheName, 5);
              return fetchRes;
            });
          })
        );
      })
      .catch(() => {
        if (evt.request.url.indexOf(".html") > -1) {
          return caches.match("./pages/fallback.html");
        }
      })
  );
});
