self.addEventListener("install", function(e) {
  e.waitUntil(
    caches.open("progessive-elm").then(function(cache) {
      console.log("Cache opened.");

      return cache.addAll(["/", "/index.html", "/elm.js"]);
    })
  );
});

self.addEventListener("fetch", function(event) {
  console.log("Service Worker Intercept: " + event.request.url);
  event.respondWith(
    caches.match(event.request).then(function(response) {
      console.log("Service Worker Serve: " + event.request.url);
      return response || fetch(event.request);
    })
  );
});
