"use strict";

// Update cache names any time any of the cached files change.
const cacheName = "static-cache-v1";

// Add list of files to cache here.
const cacheFiles = ["/offline.html", "/favicon.png"];

/* self.addEventListener("install", (evt) => {
  console.log("[ServiceWorker] Install");

  evt.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("[ServiceWorker] Pre-caching offline page");
      return cache.addAll(FILES_TO_CACHE);
    })
  );

  self.skipWaiting();
}); */

self.addEventListener("install", function (e) {
  console.log("[ServiceWorker] Installed");

  // e.waitUntil Delays the event until the Promise is resolved
  e.waitUntil(
    // Open the cache
    caches.open(cacheName).then(function (cache) {
      // Add all the default files to the cache
      console.log("[ServiceWorker] Caching cacheFiles");
      return cache.addAll(cacheFiles);
    })
  ); // end e.waitUntil
});

/* self.addEventListener("activate", (evt) => {
  console.log("[ServiceWorker] Activate");
  // Remove previous cached data from disk.
  evt.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            console.log("[ServiceWorker] Removing old cache", key);
            return caches.delete(key);
          }
        })
      );
    })
  );

  self.clients.claim();
}); */

self.addEventListener("activate", function (e) {
  console.log("[ServiceWorker] Activated");

  e.waitUntil(
    // Get all the cache keys (cacheName)
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (thisCacheName) {
          // If a cached item is saved under a previous cacheName
          if (thisCacheName !== cacheName) {
            // Delete that cached file
            console.log(
              "[ServiceWorker] Removing Cached Files from Cache - ",
              thisCacheName
            );
            return caches.delete(thisCacheName);
          }
        })
      );
    })
  ); // end e.waitUntil
});

/* self.addEventListener("fetch", (evt) => {
  console.log("[ServiceWorker] Fetch", evt.request.url);
  // Add fetch event handler here.
  if (evt.request.mode !== "navigate") {
    // Not a page navigation, bail.
    return;
  }
  evt.respondWith(
    
    fetch(evt.request).catch(() => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match("offline.html");
      });
    })
  );
}); */

self.addEventListener("fetch", function (e) {
  console.log("[ServiceWorker] Fetch", e.request.url);

  // e.respondWidth Responds to the fetch event
  e.respondWith(
    // Check in cache for the request being made
    caches
      .match(e.request)

      .then(function (response) {
        // If the request is in the cache
        if (response) {
          console.log(
            "[ServiceWorker] Found in Cache",
            e.request.url,
            response
          );
          // Return the cached version
          return response;
        }

        // If the request is NOT in the cache, fetch and cache

        var requestClone = e.request.clone();
        return fetch(requestClone)
          .then(function (response) {
            if (!response) {
              console.log("[ServiceWorker] No response from fetch ");
              return response;
            } // end caches.open

            /* var responseClone = response.clone();

            //  Open the cache
            caches.open(cacheName).then(function (cache) {
              // Put the fetched response in the cache
              //cache.put(e.request, responseClone);
              //console.log("[ServiceWorker] New Data Cached", e.request.url);

              // Return the response
              return response;
            }); */ return response;
          })
          .catch(function (err) {
            console.log(
              "[ServiceWorker] Error Fetching & Caching New Data",
              err
            );
          });
      }) // end caches.match(e.request)
  ); // end e.respondWith
});
