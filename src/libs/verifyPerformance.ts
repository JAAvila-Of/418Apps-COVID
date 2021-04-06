import UA from "ua-parser-js";

const processors = window.navigator.hardwareConcurrency;

export const verify = () => {
  const ua = new UA();

  const device = ua.getDevice().type ?? "desktop";
  const osVer = ua.getOS().version;
  const osName = ua.getOS().name;
  const navigator = ua.getBrowser().name;
  let result;

  if (navigator === "Firefox") {
    if (device === "mobile" || device === "tablet") {
      result = "flat";
    } else {
      result = "semiflat";
    }
  } else {
    if (device === "mobile" || device === "tablet") {
      if (osName === "Android") {
        let v = Number(osVer.split(".")[0]);
        if (v < 8) {
          result = "flat";
        } else if (v < 10) {
          result = "semiflat";
        } else {
          result = "normal";
        }
      } else {
        result = "normal";
      }
    } else if (device === "desktop") {
      if (osName === "Mac OS") {
        result = "normal";
      } else {
        if (processors === 1) {
          result = "flat";
        } else if (processors === 2) {
          result = "semiflat";
        } else if (processors >= 4) {
          result = "normal";
        }
      }
    } else {
      result = "normal";
    }
  }

  return result;
};

export const setClass = () => {
  const classes = ["normal", "flat", "semiflat"];
  let r: string = "";

  if (localStorage.getItem("_performance") === "flat") return;

  if (localStorage.getItem("_performance")) {
    const perf = localStorage.getItem("_performance");
    const html = document.getElementsByTagName("body")[0];

    classes
      .filter((c) => {
        return c == perf ? false : true;
      })
      .forEach((cl) => {
        html.classList.remove(cl);
      });

    html.classList.add(perf);

    r = perf + " es una clase desde localstorage";
  } else {
    const cls = verify();

    if (cls === "flat") return;

    const html = document.getElementsByTagName("body")[0];

    classes
      .filter((c) => {
        return c == cls ? false : true;
      })
      .forEach((cl) => {
        html.classList.remove(cl);
      });

    html.classList.add(cls);

    localStorage.setItem("_performance", cls);

    r = cls + " es una clase desde proceso";
  }
  return r;
};
