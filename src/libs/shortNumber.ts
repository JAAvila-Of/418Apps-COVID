export const generate = (n: number, force: boolean = false): string => {
  let t: number;
  if (n <= 0) {
    return "0";
  } else if (n >= 1000000) {
    t = n / 1000000;

    if (force) return Number(t.toFixed(1)) + "M";

    if (isFloat(t)) {
      return Number(t.toFixed(1)) + "M";
    }
    return long(n);
  } else if (n >= 1000) {
    t = n / 1000;

    if (force) return Number(t.toFixed(1)) + "K";

    if (isFloat(t)) {
      return Number(t.toFixed(1)) + "K";
    }
    return long(n);
  }

  return String(n);
};

const isFloat = (n: number) => {
  return Number(n) === n && n % 1 === 0;
};

export const long = (s: string | number): string => {
  let h = String(s);

  var num = h.replace(/\./g, "");

  if (!isNaN(Number(num))) {
    num = num
      .toString()
      .split("")
      .reverse()
      .join("")
      .replace(/(?=\d*\.?)(\d{3})/g, "$1 ");
    num = num.split("").reverse().join("").trim(); //replace(/^[\.]/, "");
    h = num;
  } else {
    console.log("Solo se permiten numeros");
    h = num.replace(/[^\d\.]*/g, "");
  }

  return h;
};
