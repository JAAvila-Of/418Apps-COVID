const defaultTheme = require("tailwindcss/defaultTheme");
const plugin = require("tailwindcss/plugin");

module.exports = {
  //mode: "jit",
  purge: {
    content: [
      "./src/**/*.svelte",
      "./src/**/*.ts",
      "./public/*.html",
      "./node_modules/@fouita/data-table/src/*.svelte",
    ],
    enabled: false, // disable purge in dev
  },
  future: {
    // for tailwind 2.0 compat
    purgeLayersByDefault: true,
    removeDeprecatedGapUtilities: true,
  },
  darkMode: "class",
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        "app-dark": "url('./assets/app-dark.svg')",
        "app-light": "url('./assets/app-light.svg')",
      }),
      fontFamily: {
        circular: ["circular"],
        circularbold: ["circularbold"],
        circularblack: ["circularblack"],
        circularmedium: ["circularmedium"],
        circularitalic: ["circularitalic"],
      },
      spacing: {
        news: "520px",
        limit: "950px",
      },
    },
    screens: {
      xs: "321px",
      ...defaultTheme.screens,
    },
  },
  variants: {
    extend: {
      backgroundImage: ["dark"],
      backgroundOpacity: ["flat", "semiflat", "normal"],
      backgroundColor: ["flat", "semiflat", "normal"],
      boxShadow: ["flat", "semiflat", "normal"],
    },
    filters: ["flat", "semiflat", "normal"],
    bgFilters: ["flat", "semiflat", "normal"],
  },
  plugins: [
    require("tailwind-filter-utilities"),
    plugin(function ({ addVariant, e }) {
      addVariant("flat", ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.flat .${e(`flat${separator}${className}`)}`;
        });
      });
    }),
    plugin(function ({ addVariant, e }) {
      addVariant("semiflat", ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.semiflat .${e(`semiflat${separator}${className}`)}`;
        });
      });
    }),
    plugin(function ({ addVariant, e }) {
      addVariant("normal", ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.normal .${e(`normal${separator}${className}`)}`;
        });
      });
    }),
    plugin(function ({ addUtilities }) {
      const newUtilities = {
        ".text-shadow-md": {
          "text-shadow":
            "0 4px 8px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.08)",
        },
      };

      addUtilities(newUtilities, ["flat", "semiflat", "normal"]);
    }),
  ],
};
