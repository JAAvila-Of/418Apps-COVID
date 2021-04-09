if (!self.define) {
  const e = (e) => {
      "require" !== e && (e += ".js");
      let s = Promise.resolve();
      return (
        t[e] ||
          (s = new Promise(async (s) => {
            if ("document" in self) {
              const t = document.createElement("script");
              (t.src = e), document.head.appendChild(t), (t.onload = s);
            } else importScripts(e), s();
          })),
        s.then(() => {
          if (!t[e]) throw new Error(`Module ${e} didn’t register its module`);
          return t[e];
        })
      );
    },
    s = (s, t) => {
      Promise.all(s.map(e)).then((e) => t(1 === e.length ? e[0] : e));
    },
    t = { require: Promise.resolve(s) };
  self.define = (s, r, n) => {
    t[s] ||
      (t[s] = Promise.resolve().then(() => {
        let t = {};
        const o = { uri: location.origin + s.slice(1) };
        return Promise.all(
          r.map((s) => {
            switch (s) {
              case "exports":
                return t;
              case "module":
                return o;
              default:
                return e(s);
            }
          })
        ).then((e) => {
          const s = n(...e);
          return t.default || (t.default = s), t;
        });
      }));
  };
}
define("./sw.js", ["./workbox-317e4614"], function (e) {
  "use strict";
  importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.registerRoute(
      "/index.html",
      new e.NetworkFirst({
        cacheName: "start-url",
        plugins: [
          new e.ExpirationPlugin({
            maxEntries: 1,
            maxAgeSeconds: 86400,
            purgeOnQuotaError: !0,
          }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-image-assets",
        plugins: [
          new e.ExpirationPlugin({
            maxEntries: 64,
            maxAgeSeconds: 86400,
            purgeOnQuotaError: !0,
          }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new e.CacheFirst({
        cacheName: "static-font-assets",
        plugins: [
          new e.ExpirationPlugin({
            maxEntries: 10,
            maxAgeSeconds: 31536e3,
            purgeOnQuotaError: !0,
          }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:js)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-js-assets",
        plugins: [
          new e.ExpirationPlugin({
            maxEntries: 5,
            maxAgeSeconds: 86400,
            purgeOnQuotaError: !0,
          }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:css|less)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-style-assets",
        plugins: [
          new e.ExpirationPlugin({
            maxEntries: 5,
            maxAgeSeconds: 86400,
            purgeOnQuotaError: !0,
          }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /^https:\/\/lh3\.googleusercontent\.com\/.*/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-gimages-assets",
        plugins: [
          new e.ExpirationPlugin({
            maxEntries: 64,
            maxAgeSeconds: 604800,
            purgeOnQuotaError: !0,
          }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /.*/i,
      new e.NetworkFirst({
        cacheName: "static-others-assets",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({
            maxEntries: 32,
            maxAgeSeconds: 86400,
            purgeOnQuotaError: !0,
          }),
        ],
      }),
      "GET"
    );
});
//# sourceMappingURL=sw.js.map
