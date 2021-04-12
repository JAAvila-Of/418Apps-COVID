const fs = require("fs-extra");

const flag = process.argv[2];

if (flag == "dev") {
  fs.copyFile("./public/index.dev.html", "./public/index.html").then((value) =>
    console.log("index copiado en DEV")
  );
  fs.copyFile("./tailwind.dev.js", "./tailwind.config.js").then((value) =>
    console.log("tailwind copiado en DEV")
  );
} else if (flag == "prod") {
  fs.copyFile("./public/index.prod.html", "./public/index.html").then((value) =>
    console.log("index copiado en PROD")
  );
  fs.copyFile("./tailwind.prod.js", "./tailwind.config.js").then((value) =>
    console.log("tailwind copiado en PROD")
  );
}
