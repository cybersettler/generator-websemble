const chalk = require('chalk');
const _ = require('lodash');
const path = require('path');

/**
 * Write service
 * @constructor
 * @param {object} generator - Yeoman generator
 */
function WriteService(generator) {
  this.generator = generator;

  if (!generator.options.componentTag.includes('-')) {
    generator.log(chalk.red('Component tag should contain at least one dash.'));
    throw new Error('Component tag should contain at least one dash.');
  }

  generator.log(chalk.blue('Generating component ' + generator.options.componentTag));
  const match = /^(\w+)[-](.*)/.exec(generator.options.componentTag);

  const componentName = _.camelCase(match[2]).replace(/^(.)/, function(m, p) {
    return p.toUpperCase();
  });

  const namespace = match[1];

  const componentPath = path.join('component', namespace, componentName, '/');

  this.config = {
    componentTag: generator.options.componentTag,
    namespace: _.capitalize(namespace),
    componentName: componentName,
    componentPath: componentPath,
    lessPath: path.join('resources', 'less', '/'),
    Facade: 'websemble',
    shadowStyle: 'shadowStyle',
    style: 'mainStyle',
    html: '<!-- Main HTML -->',
    shadowHTML: '<!-- shadow HTML -->'
  };
}

WriteService.prototype.copyViewFile = function() {

  const generator = this.generator;
  const config = this.config;
  var destPath = path.join(config.componentPath, 'View.html');
  var source = generator.templatePath('_view.html');
  var destination = generator.destinationPath(destPath);

  generator.fs.copyTpl(
    source,
    destination,
    config
  );
};

WriteService.prototype.copyControllerFile = function() {

  const generator = this.generator;
  const config = this.config;
  var source = generator.templatePath('_controller.txt');
  var destPath = path.join(config.componentPath, 'Controller.js');
  var destination = generator.destinationPath(destPath);
  generator.log(chalk.blue('Copying controller file'));

  generator.fs.copyTpl(
    source,
    destination,
    config
  );
};

WriteService.prototype.copyStyleFiles = function() {

  const generator = this.generator;
  const config = this.config;
  var source = generator.templatePath('_mixin.less');
  var destPath = path.join(config.lessPath, 'mixin.less');
  var destination = generator.destinationPath(destPath);

  generator.fs.copy(
    source,
    destination
  );
};

module.exports = WriteService;
