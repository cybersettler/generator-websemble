var chalk = require('chalk');

function WriteService(generator) {
  var fs = generator.fs;
  var structure = generator.config.get("structure");

  var mainLessFiles = [
    "alerts", "badges", "breadcrumbs", "button-groups", "buttons", "carousel",
    "close", "code", "dropdowns", "forms", "glyphicons", "grid", "input-groups",
    "jumbotron", "labels", "list-group", "media", "modals", "navbar", "navs",
    "normalize", "pager", "pagination", "panels", "popovers", "print",
    "progress-bars", "responsive-embed", "responsive-utilities", "scaffolding",
    "tables", "thumbnails", "tooltip", "type", "utilities", "wells"
  ];

  var mixinsLessFiles = [
    "alerts", "background-variant", "border-radius", "buttons", "center-block",
    "clearfix", "forms", "gradients", "grid-framework", "grid", "hide-text",
    "image", "labels", "list-group", "nav-vertical-align", "opacity",
    "pagination", "panels", "progress-bar", "reset-filter", "reset-text",
    "resize", "responsive-visibility", "size", "tab-focus", "table-row",
    "text-emphasis", "text-overflow", "vendor-prefixes"
  ];

  var glyphiconsX = [
    "eot", "svg", "ttf", "woff", "woff2"
  ];

  this.copyConfigurationFiles = function () {
    generator.log(chalk.blue("Copying frontend configuration files"));

    var config = {
      appname: generator.config.get("appname"),
      description: generator.config.get("description")
    };

    generator.log("app got config");

    var template = generator.templatePath(structure.frontend.config + "_config.js");
    var destination = generator.destinationPath(structure.frontend.config + "config.js");

    generator.log("got template and destination");

    fs.copyTpl(template, destination, config);
    fs.copyTpl(
      generator.templatePath("_package.json"),
      generator.destinationPath("package.json"),
      config
    );
  };

  this.copyEntryPoint = function () {
    generator.log(chalk.blue("Copying entry point files"));

    var cssFilePath = structure.frontend.assets + "css/base.css";

    fs.copy(
      generator.templatePath("_app.js"),
      generator.destinationPath("app.js")
    );

    fs.copyTpl(
      generator.templatePath("_index.html"),
      generator.destinationPath("index.html"), {
        appname: generator.config.get("appname"),
        baseCSS: cssFilePath,
        appComponent: structure.frontend.component + "core/App/view.html"
      }
    );
  };

  this.copyGlyphiconFiles = function () {
    generator.log(chalk.blue("Copying icon files"));
    var iconTemplatePath = generator.templatePath(structure.frontend.assets + "fonts/_glyphicons-halflings-regular.");
    var iconDestinationPath = generator.destinationPath(structure.frontend.assets + "fonts/glyphicons-halflings-regular.");

    glyphiconsX.forEach(copyIconFile);

    function copyIconFile(ext) {
      var template = iconTemplatePath + ext;
      var destination = iconDestinationPath + ext;
      generator.log(chalk.gray("Writing " + destination));
      fs.copy(template, destination);
    }
  };

  this.generateVariablesLessFile = function () {
    generator.log(chalk.blue("Copying less variables file"));

    var filePath = generator.destinationPath(generator.bootstrapConfigFilePath);
    var bootstrapConfig = fs.readJSON(filePath);
    var variablesLessFileContent = generateVariablesLessFileContent(bootstrapConfig);
    var templateFilePath = generator.templatePath(structure.src.main.less + "_variables.less");
    var destinationFilePath = generator.destinationPath(structure.src.main.less + "variables.less");

    generator.log(chalk.gray("Writing file " + destinationFilePath));

    fs.copyTpl(
      templateFilePath,
      destinationFilePath,
      {content: variablesLessFileContent}
    );
  };

  this.copyLessFiles = function () {
    generator.log(chalk.blue("Copying less files"));

    copyStructureFiles(mainLessFiles, structure.src.main.less, "less");
    copyStructureFiles(mixinsLessFiles, structure.src.main.less + "mixins/", "less");
  };

  function copyStructureFiles(collection, path, ext) {
    collection.forEach(copyFile);
    function copyFile(name) {
      copyStructureFile(name, path, ext);
    }
  }

  function copyStructureFile(name, path, ext) {
    ext = ext || "js";
    var filename = name + '.' + ext;
    var templateFile = '_' + filename;
    fs.copy(
      generator.templatePath(path + templateFile),
      generator.destinationPath(path + filename)
    );
  }
}

function generateVariablesLessFileContent(bootstrapConfig) {
  var key;
  var value;
  var line;
  var content = [];
  for (key in bootstrapConfig.vars) {
    if (!bootstrapConfig.vars.hasOwnProperty(key)) {
      continue;
    }
    value = bootstrapConfig.vars[key];
    if (/["]/.test(value)) {
      value = value.replace(/"/g, '\"');
    }
    line = key + ": " + value + ";";
    content.push(line);
  }
  return content.join("\n");
}

module.exports = WriteService;
