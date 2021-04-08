module.exports = {
  globDirectory: "public/",
  globPatterns: ["**/*.{css,js,html}"],
  swDest: "public/sw.js",
  clientsClaim: true,
  skipWaiting: true,
  importScripts: [],
  globIgnores: ["public/build/data/*", "og.jpg"],
  runtimeCaching: [
    {
      urlPattern: "/",
      handler: "NetworkFirst",
      options: {
        cacheName: "start-url",
        expiration: {
          maxEntries: 1,
          maxAgeSeconds: 86400,
          purgeOnQuotaError: !0,
        },
      },
    },
    {
      urlPattern: /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      handler: "StaleWhileRevalidate",
      options: {
        cacheName: "static-image-assets",
        expiration: {
          maxEntries: 64,
          maxAgeSeconds: 86400,
          purgeOnQuotaError: !0,
        },
      },
    },
    {
      urlPattern: /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      handler: "CacheFirst",
      options: {
        cacheName: "static-font-assets",
        expiration: {
          maxEntries: 10,
          maxAgeSeconds: 31536000,
          purgeOnQuotaError: !0,
        },
      },
    },
    {
      urlPattern: /\.(?:js)$/i,
      handler: "StaleWhileRevalidate",
      options: {
        cacheName: "static-js-assets",
        expiration: {
          maxEntries: 5,
          maxAgeSeconds: 86400,
          purgeOnQuotaError: !0,
        },
      },
    },
    {
      urlPattern: /\.(?:css|less)$/i,
      handler: "StaleWhileRevalidate",
      options: {
        cacheName: "static-style-assets",
        expiration: {
          maxEntries: 5,
          maxAgeSeconds: 86400,
          purgeOnQuotaError: !0,
        },
      },
    },
    {
      urlPattern: /.*/i,
      handler: "NetworkFirst",
      options: {
        cacheName: "static-others-assets",
        networkTimeoutSeconds: 10,
        expiration: {
          maxEntries: 32,
          maxAgeSeconds: 86400,
          purgeOnQuotaError: !0,
        },
      },
    },
  ],
};
