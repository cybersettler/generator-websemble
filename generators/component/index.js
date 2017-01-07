'use strict';
const Generator = require('yeoman-generator');
const WriteService = require('./WriteService.js');

module.exports = class extends Generator{
  constructor(args, opts) {
    super(args, opts);
    this.argument('componentTag', {type: String, required: true});
    this.option('style', {type: String, required: false});
    this.option('html', {type: String, required: false});
    this.option('shadowStyle', {type: String, required: false});
    this.option('shadowHTML', {type: String, required: false});
    this.option('controller', {type: String, required: false});
  }

  writing() {
    this.log('Component writing');
    var writer = new WriteService(this);

    writer.copyControllerFile(this.options.controller);
    writer.copyViewFile();
    writer.copyStyleFiles();
  }
};
