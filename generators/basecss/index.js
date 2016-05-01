'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var WriteService = require('./WriteService.js');

module.exports = yeoman.generators.Base.extend({

  writing: function () {

    var writer = new WriteService( this );
    writer.renderBaseCSS();
    
  },

  install: function () {
    this.installDependencies();
  }
});
