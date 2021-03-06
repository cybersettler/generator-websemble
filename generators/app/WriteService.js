'use strict';
var chalk = require('chalk');
var path = require('path');

/**
 * Write service
 * @constructor
 * @param {object} generator - yo generator
 */
function WriteService(generator) {
  var fs = generator.fs;
  var structure = generator.config.get('structure');

  var mainLessFiles = [
    'base', 'main', 'glyphicons', 'grid',
    'normalize', 'print', 'responsive-utilities',
    'scaffolding', 'type', 'utilities', 'component-animations',
    'buttons', 'close'
  ];

  var mixinsLessFiles = [
    'background-variant', 'border-radius', 'center-block',
    'clearfix', 'gradients', 'grid-framework', 'grid', 'hide-text',
    'image', 'labels', 'nav-vertical-align', 'opacity',
    'reset-filter', 'reset-text',
    'resize', 'responsive-visibility', 'size', 'tab-focus',
    'text-emphasis', 'text-overflow', 'vendor-prefixes', 'buttons'
  ];

  var glyphiconsX = [
    'eot', 'svg', 'ttf', 'woff', 'woff2'
  ];

  this.copyConfigurationFiles = function() {
    generator.log(chalk.blue('Copying frontend configuration files'));

    var config = {
      appname: generator.config.get('appname'),
      description: generator.config.get('description')
    };

    generator.log('app got config');

    var template = generator.templatePath(
      path.join(structure.frontend.root, '_config.js'));
    var destination = generator.destinationPath(path.join(
      structure.frontend.root, 'config.js'));

    generator.log('got template and destination');

    fs.copyTpl(template, destination, config);
    fs.copyTpl(
      generator.templatePath('_package.json'),
      generator.destinationPath('package.json'),
      config
    );

    copyStructureFile('gulpfile', '');

    fs.copyTpl(
      generator.templatePath(path.join(structure.webapp, '_package.json')),
      generator.destinationPath(path.join(structure.webapp, 'package.json')),
      config
    );

    fs.copy(
      generator.templatePath(
        path.join(structure.backend.root, '_config.js')
      ),
      generator.destinationPath(
        path.join(structure.backend.root, 'config.js')
      )
    );
  };

  this.copyEntryPoint = function() {
    generator.log(chalk.blue('Copying entry point files'));
    copyStructureFile('app', structure.webapp);
    copyStructureFile('index', structure.template, 'html');
  };

  this.copyGlyphiconFiles = function() {
    generator.log(chalk.blue('Copying icon files'));
    var iconTemplatePath = generator.templatePath(
      path.join(structure.frontend.assets,
        'fonts/_glyphicons-halflings-regular.'));
    var iconDestinationPath = generator.destinationPath(
      path.join(structure.frontend.assets,
        'fonts/glyphicons-halflings-regular.'));

    glyphiconsX.forEach(copyIconFile);

    /**
     * Copies icon file
     * @private
     * @param {string} ext - File extesion
     */
    function copyIconFile(ext) {
      var template = iconTemplatePath + ext;
      var destination = iconDestinationPath + ext;
      generator.log(chalk.gray('Writing ' + destination));
      fs.copy(template, destination);
    }
  };

  this.copyLocaleFile = function() {
    generator.log(chalk.blue('Copying locale file'));
    var localePath = path.join(structure.frontend.assets, 'locales', 'en', '/');
    copyStructureFile('translation', localePath, 'json');
  };

  this.copyBootstrapConfigFile = function() {
    generator.log(chalk.blue('Copying less variables file'));
    var sourceFilePath = generator.templatePath(
      structure.bootstrapConfig + '_config.json');
    if (generator.options.bootstrapConfigFilePath) {
      sourceFilePath = generator.destinationPath(
        generator.options.bootstrapConfigFilePath);
    }

    var destinationFilePath = generator.destinationPath(
      path.join(structure.bootstrapConfig, 'config.json'));

    generator.log(chalk.gray('Writing file ' + destinationFilePath));

    fs.copy(
      sourceFilePath,
      destinationFilePath
    );
  };

  this.copyLessFiles = function() {
    generator.log(chalk.blue('Copying less files'));

    copyStructureFiles(mainLessFiles, structure.less, 'less');
    copyStructureFiles(mixinsLessFiles, structure.less + 'mixins/', 'less');
  };

  /**
   * Copies files
   * @private
   * @param {Array} collection - A collection of filenames
   * @param {string} path - The path of the files
   * @param {string} ext - The extension of the files
   */
  function copyStructureFiles(collection, path, ext) {
    collection.forEach(copyFile);
    function copyFile(name) { // eslint-disable-line require-jsdoc
      copyStructureFile(name, path, ext);
    }
  }

  /**
   * Copies a file
   * @private
   * @param {string} name - File name
   * @param {string} path - File path
   * @param {string} ext - File extension
   */
  function copyStructureFile(name, path, ext) {
    ext = ext || 'js';
    var filename = name + '.' + ext;
    var templateFile = '_' + filename;
    fs.copy(
      generator.templatePath(path + templateFile),
      generator.destinationPath(path + filename)
    );
  }
}

module.exports = WriteService;
