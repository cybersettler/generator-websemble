var mainFolder = "src/main/";
var testFolder = "src/test/";
var frontendFolder = "frontend/";
var backendFolder = "backend/";

var AppConfig = {
  styleOptions: [ "none", "bootstrap" ],
  structure:{
    backend:{
      model: backendFolder + "model/",
      view: backendFolder + "view/",
      controller: backendFolder + "controller/",
      util: backendFolder + "util/"
    },
    frontend:{
      assets: frontendFolder + "assets/",
      component: frontendFolder + "component/",
      controller: frontendFolder + "controller/",
      factory: frontendFolder + "factory/",
      service: frontendFolder + "service/",
      util: frontendFolder + "util/",
      config: frontendFolder + "config/"
    },
    src:{
      main:{
        less: mainFolder + "less/"
      },
      test:{
        jasmine: testFolder + "jasmine/"
      }
    }
  }
};

module.exports = AppConfig;
