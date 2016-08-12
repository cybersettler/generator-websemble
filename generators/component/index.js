'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var WriteService = require('./WriteService.js');

module.exports = yeoman.Base.extend({
  constructor: function () {
    yeoman.Base.apply(this, arguments);
    this.argument('componentTag', {type: String, required: true});
    this.option('style', {type: String, required: false});
    this.option('html', {type: String, required: false});
    this.option('shadowStyle', {type: String, required: false});
    this.option('shadowHTML', {type: String, required: false});
    this.option('controller', {type: String, required: false});
  },

  writing: function () {
    this.log("Component writing");
    var stylePath = this.options.style;
    var htmlPath = this.options.html;
    var shadowStylePath = this.options.shadowStyle;
    var shadowHTMLPath = this.options.shadowHTML;
    var writer = new WriteService(this);
    var log = this.log;

    writer.copyControllerFile(this.options.controller);
    writer.compileCSS(stylePath).then(
      function (output) {
        var html = writer.readHTML(htmlPath);
        writer.setMainTemplateConfig(output.css, html);
        return writer.compileCSS(shadowStylePath);
      }).then(
        function (output) {
          var html = writer.readHTML(shadowHTMLPath) || '<content></content>';
          writer.setShadowTemplateConfig(output.css, html);
          writer.copyViewFile();
        }
      ).catch(function (e) {
        log(chalk.red(e.name + ': ' + e.message));
      });
  }
});
