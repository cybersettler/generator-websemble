const mainFolder = "src/main/";
const testFolder = "src/test/";
const path = require('path');
const frontendFolder = path.join(mainFolder, "webapp/frontend", "/");
const backendFolder = path.join(mainFolder, "backend", "/");

var AppConfig = {
  styleOptions: ["none", "bootstrap"],
  structure: {
    webapp: path.join(mainFolder, "webapp", "/"),
    backend: {
      model: path.join(backendFolder, "model", "/"),
      view: path.join(backendFolder, "view", "/"),
      controller: backendFolder + "controller/",
      util: backendFolder + "util/"
    },
    frontend: {
      assets: frontendFolder + "assets/",
      controller: frontendFolder + "controller/",
      factory: frontendFolder + "factory/",
      service: frontendFolder + "service/",
      util: frontendFolder + "util/",
      config: frontendFolder + "config/"
    },
    less: path.join(mainFolder, "less", "/"),
    template: path.join(mainFolder, "template", "/"),
    jasmine: path.join(testFolder, "jasmine", "/"),
    component: path.join(mainFolder, "component", "/")
  }
};

module.exports = AppConfig;
