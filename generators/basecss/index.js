'use strict';
var yeoman = require('yeoman-generator');
var WriteService = require('./WriteService.js');

module.exports = yeoman.Base.extend({
  writing: function () {
    var writer = new WriteService(this);
    writer.renderBaseCSS();
  }
});
