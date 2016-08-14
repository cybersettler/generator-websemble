const chalk = require('chalk');
const _ = require('lodash');
const path = require('path');

/**
 * Write service
 * @constructor
 * @param {object} generator - Yeoman generator
 */
function WriteService(generator) {
  var fs = generator.fs;
  var structure = generator.config.get('structure');
  var componentName = generator.componentTag;

  if (!generator.componentTag.includes('-')) {
    generator.log(chalk.red('Component tag should contain at least one dash.'));
    throw new Error('Component tag should contain at least one dash.');
  }

  generator.log(chalk.blue('Writing component ' + generator.componentTag));
  var match = /^(\w+)[-](.*)/.exec(generator.componentTag);
  componentName = _.camelCase(match[2]).replace(/^(.)/, function(m, p) {
    return p.toUpperCase();
  });

  var namespace = match[1];
  var componentPath = path.join(structure.component, namespace, '/',
    componentName, '/');
  var createFunction = 'createUIComponent';

  if (/^view-/.test(generator.componentTag)) {
    createFunction = 'createViewComponent';
  } else if (generator.componentTag === 'core-app') {
    createFunction = 'createAppComponent';
  }

  var html = generator.options.html ? fs.read(generator.options.html) : '';
  var shadowHTML = generator.options.shadowHTML ?
    fs.read(generator.options.shadowHTML) : '';

  var config = {
    componentTag: generator.componentTag,
    namespace: _.capitalize(namespace),
    componentName: componentName,
    Facade: 'websemble',
    createFunction: createFunction,
    html: html,
    shadowHTML: shadowHTML
  };

  this.copyViewFile = function() {
    fs.copyTpl(
      generator.templatePath('_view.html'),
      generator.destinationPath(path.join(componentPath, 'view.html')),
      config
    );
  };

  this.copyControllerFile = function(customFile) {
    var controllerFile = customFile ||
      generator.templatePath('_controller.txt');
    generator.log(chalk.blue('Copying controller file'));

    fs.copyTpl(
      controllerFile,
      generator.destinationPath(path.join(componentPath, 'controller.js')),
      {componentName: componentName}
    );
  };

  this.copyStyleFiles = function() {
    if (generator.options.style) {
      copyStyleFile(generator.options.style);
    }
    if (generator.options.shadowStyle) {
      copyStyleFile(generator.options.shadowStyle);
    }
  };

  /**
   * Copies a file
   * @private
   * @param {string} stylePath - File path
   */
  function copyStyleFile(stylePath) {
    var matches = /_(\w+)[.](css|sass|less)$/.exec(stylePath);
    if (matches.length < 2) {
      return;
    }
    var basename = matches[1] + '.' + matches[2];
    fs.copy(
      stylePath,
      generator.destinationPath(path.join(componentPath, basename))
    );
  }
}

module.exports = WriteService;
