if (!self.define) {
  const e = (e) => {
      "require" !== e && (e += ".js");
      let a = Promise.resolve();
      return (
        i[e] ||
          (a = new Promise(async (a) => {
            if ("document" in self) {
              const i = document.createElement("script");
              (i.src = e), document.head.appendChild(i), (i.onload = a);
            } else importScripts(e), a();
          })),
        a.then(() => {
          if (!i[e]) throw new Error(`Module ${e} didn’t register its module`);
          return i[e];
        })
      );
    },
    a = (a, i) => {
      Promise.all(a.map(e)).then((e) => i(1 === e.length ? e[0] : e));
    },
    i = { require: Promise.resolve(a) };
  self.define = (a, c, s) => {
    i[a] ||
      (i[a] = Promise.resolve().then(() => {
        let i = {};
        const d = { uri: location.origin + a.slice(1) };
        return Promise.all(
          c.map((a) => {
            switch (a) {
              case "exports":
                return i;
              case "module":
                return d;
              default:
                return e(a);
            }
          })
        ).then((e) => {
          const a = s(...e);
          return i.default || (i.default = a), i;
        });
      }));
  };
}
define("./sw.js", ["./workbox-f47baefc"], function (e) {
  "use strict";
  self.addEventListener("message", (e) => {
    e.data && "SKIP_WAITING" === e.data.type && self.skipWaiting();
  }),
    e.precacheAndRoute(
      [
        {
          url: "build/assets/404.svg",
          revision: "8f4abdbda12333f2552ecfceb33bdb6b",
        },
        {
          url: "build/assets/app-dark.svg",
          revision: "9203ac8a174f1f694cdc889c1563a8ac",
        },
        {
          url: "build/assets/app-light.svg",
          revision: "fa29c166f00597ab10d5948f34d970de",
        },
        {
          url: "build/assets/ASTRAZENECA.png",
          revision: "57d7b0e479573d69e3b610e955e9a2d9",
        },
        {
          url: "build/assets/bmc.png",
          revision: "b17d911018bce798dec5ca87436f65bc",
        },
        {
          url: "build/assets/CUREVAC.png",
          revision: "bba2ae2a22b3d839d793f50b00671bc8",
        },
        {
          url: "build/assets/GAMALEYA.png",
          revision: "ed20bc2bf5f2c837ee7d0637571288a3",
        },
        {
          url: "build/assets/GLOBAL.png",
          revision: "91a3c762800296f278f7081bf10f4f57",
        },
        {
          url: "build/assets/jaavila.svg",
          revision: "eff61a52545392929bc362ea6cf3aabc",
        },
        {
          url: "build/assets/JANSSEN.png",
          revision: "526ab2454fc8148f5228938f128e5201",
        },
        {
          url: "build/assets/MODERNA.png",
          revision: "d15dfa2900d0100dd0e88cf9d2918ccc",
        },
        {
          url: "build/assets/NOVAVAX.png",
          revision: "47a0f07375ba09af88e0a81c6b01456f",
        },
        {
          url: "build/assets/PFIZER.png",
          revision: "69aeec9256eb6710ba6e6d5c023d2b79",
        },
        {
          url: "build/assets/SANOFI.png",
          revision: "7bdb9c7ba4b8fc2d6a9e49979575074d",
        },
        {
          url: "build/assets/SINOPHARM.png",
          revision: "29e2013c88e15e388ad8ea42ef829e4f",
        },
        {
          url: "build/assets/vacunas1.png",
          revision: "5c7f48c98902910e9e992df55544ed48",
        },
        {
          url: "build/bundle.css",
          revision: "85b47c1bfdae40d65fb0723aac0f845c",
        },
        {
          url: "build/bundle.js",
          revision: "1ab1ddbc993ec079c80aa7f218b2fc52",
        },
        {
          url: "build/data/config.json",
          revision: "c6b712171bb83ccea544605b4da481ec",
        },
        {
          url: "build/data/countFechas.json",
          revision: "8a4578e06d8447b3ee4b8b8bba4e5544",
        },
        {
          url: "build/data/definiciones.json",
          revision: "5ce2ed98f0a0ce4cff169082eb62fc61",
        },
        {
          url: "build/data/departamentos.json",
          revision: "2686cf23b22192d5a3a37af420603da3",
        },
        {
          url: "build/data/depPrimeraFecha.json",
          revision: "6f954f0f45de16c39e08aebb039328a0",
        },
        {
          url: "build/data/estimaciones.json",
          revision: "89d16b6ac7ea383bd25c964c8da4da68",
        },
        {
          url: "build/data/finalDataFab.json",
          revision: "e1413b25fd8c062fa4a5357d86db5970",
        },
        {
          url: "build/data/finalDep.json",
          revision: "7cbf54348a8e93d6a5f50f73a34ab70f",
        },
        {
          url: "build/data/finalEntregados.json",
          revision: "ad3dc49da4d27420f50df1731187bc77",
        },
        {
          url: "build/data/finalFab.json",
          revision: "6bbe24518b1dc1730d2b04fe018b4d7e",
        },
        {
          url: "build/data/finalFechas.json",
          revision: "27fccb24db946fe5ffb6cd7bfe29b2bf",
        },
        {
          url: "build/data/finalNews.json",
          revision: "fe5adc132283b23125669298632073a2",
        },
        {
          url:
            "build/fonts/Circular/black/f1a22f6f15d272c7aa56da8b2c91f5e5.woff",
          revision: "8b85afd403582f65a4b13d05edf1f3fc",
        },
        {
          url:
            "build/fonts/Circular/black/f1a22f6f15d272c7aa56da8b2c91f5e5.woff2",
          revision: "d220a0c454c4b7b1b9d3bde3925c8c01",
        },
        {
          url:
            "build/fonts/Circular/bold/961a181da27e7cbc072ec2fb5bbfe2a9.woff",
          revision: "8b648e5e5358a118a1e013c2fbea1e58",
        },
        {
          url:
            "build/fonts/Circular/bold/961a181da27e7cbc072ec2fb5bbfe2a9.woff2",
          revision: "ebea8c35b6aa8a28ccac289ada8e13b3",
        },
        {
          url:
            "build/fonts/Circular/book/860c3ec7bbc5da3e97233ccecafe512e.woff",
          revision: "6a94f6f299b1a780a11f135472eb5867",
        },
        {
          url:
            "build/fonts/Circular/book/860c3ec7bbc5da3e97233ccecafe512e.woff2",
          revision: "46969fea52b17a90177c0d57933ff13b",
        },
        {
          url:
            "build/fonts/Circular/italic/82e5b6ce5cb6f9942bdd08543ef2c864.woff",
          revision: "815e9eaa8a5a5dff843d1f4e9e52064d",
        },
        {
          url:
            "build/fonts/Circular/italic/82e5b6ce5cb6f9942bdd08543ef2c864.woff2",
          revision: "c1e830155cab171a5d7e3555ff112e05",
        },
        {
          url:
            "build/fonts/Circular/medium/9475d6a0b79c164f9f605673714e75d9.woff",
          revision: "a84176433e111e625809213cfd9c504f",
        },
        {
          url:
            "build/fonts/Circular/medium/9475d6a0b79c164f9f605673714e75d9.woff2",
          revision: "f97762d4199d613b107ebd6e67cf4aa3",
        },
        { url: "favicon.png", revision: "73660158e433631c9ae8e076da6f3144" },
        { url: "global.css", revision: "eace0b32fc4c843195e4a6ac69abb4e7" },
        {
          url: "images/icons/icon-128x128.png",
          revision: "73660158e433631c9ae8e076da6f3144",
        },
        {
          url: "images/icons/icon-144x144.png",
          revision: "3ec704089d45c5a292f2c48358a39124",
        },
        {
          url: "images/icons/icon-152x152.png",
          revision: "760857a59fd89895eba99f1947df3746",
        },
        {
          url: "images/icons/icon-192x192.png",
          revision: "06b730db6962c638d79e6420ce1adf96",
        },
        {
          url: "images/icons/icon-256x256.png",
          revision: "d1a6b44eb1b396d596f5d7cebe421ca1",
        },
        {
          url: "images/icons/icon-32x32.png",
          revision: "db525496c769eda060a42ce224f05729",
        },
        {
          url: "images/icons/icon-512x512.png",
          revision: "d01f769a3c659110b9b7bbde2e7e338c",
        },
        { url: "index.html", revision: "fcc24f5d63c9af2317eb146dc05189dd" },
        { url: "manifest.json", revision: "3d67661da93a985243ca0a95fccd18b6" },
        { url: "offline.html", revision: "efeff0e4d85131193dfbdef404fc2197" },
        { url: "og.jpg", revision: "e3f18e4c0e29f54e9e0f2f4f4bc19659" },
        {
          url: "scripts/install.js",
          revision: "21a2efa8edc607cf37c43da4234e56dc",
        },
        { url: "test.json", revision: "b99c39366856b51feab0d2ef7819536f" },
      ],
      {}
    );
});
//# sourceMappingURL=sw.js.map
