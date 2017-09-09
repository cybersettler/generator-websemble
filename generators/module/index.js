'use strict';
const Generator = require('yeoman-generator');
const WriteService = require('./WriteService.js');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.argument('componentTag', {type: String, required: true});
  }

  writing() {
    this.log('Component writing');
    var writer = new WriteService(this);

    writer.copyControllerFile();
    writer.copyViewFile();
    writer.copyStyleFiles();
  }
};
