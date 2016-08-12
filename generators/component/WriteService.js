var less = require('less');
var chalk = require('chalk');
var _ = require('lodash');

function WriteService(generator) {
  var fs = generator.fs;
  var structure = generator.config.get('structure');
  var componentName = generator.componentTag;

  if (!generator.componentTag.includes("-")) {
    generator.log(chalk.red("Component tag should contain at least one dash."));
    throw new Error("Component tag should contain at least one dash.");
  }

  generator.log(chalk.blue('Writing component ' + generator.componentTag));
  var match = /^(\w+)[-](.*)/.exec(generator.componentTag);
  componentName = _.camelCase(match[2]).replace(/^(.)/, function (m, p) {
    return p.toUpperCase();
  });

  var namespace = match[1];
  var componentPath = './' + structure.frontend.component + namespace + '/' + componentName + '/';
  var createFunction = 'createUIComponent';

  if (/^view-/.test(generator.componentTag)) {
    createFunction = 'createViewComponent';
  } else if (generator.componentTag === "core-app") {
    createFunction = 'createAppComponent';
  }

  var config = {
    componentTag: generator.componentTag,
    namespace: _.capitalize(namespace),
    componentName: componentName,
    Facade: "websemble",
    createFunction: createFunction
  };

  this.setMainTemplateConfig = function (style, html) {
    config.style = style;
    config.html = html;
  };

  this.setShadowTemplateConfig = function (style, html) {
    config.shadowStyle = style;
    config.shadowHTML = html;
  };

  this.copyViewFile = function () {
    generator.log(chalk.blue("Compiled CSS"));

    fs.copyTpl(
      generator.templatePath('_view.html'),
      generator.destinationPath(componentPath + 'view.html'),
      config
    );
  };

  this.copyControllerFile = function (customFile) {
    var controllerFile = customFile || generator.templatePath("_controller.txt");
    generator.log(chalk.blue("Copying controller file"));

    fs.copyTpl(
      controllerFile,
      generator.destinationPath(componentPath + 'controller.js'),
      {componentName: componentName}
    );
  };

  this.readHTML = function (path) {
    if (!path) {
      return '';
    }
    return fs.read(path);
  };

  this.compileCSS = function (path) {
    if (!path) {
      return Promise.resolve('');
    }

    generator.log(chalk.blue("Reading style file " + path));
    var input = fs.read(path);

    return less.render(
      input, {
        // Specify search paths for @import directives
        paths: [
          generator.destinationPath(structure.src.main.less),
          generator.destinationPath(structure.src.main.less + "mixins")]
      });
  };
}

module.exports = WriteService;
