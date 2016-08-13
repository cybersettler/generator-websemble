'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');

module.exports = yeoman.Base.extend({
  configuration: function () {
    this.log(chalk.gray("Configuring button component."));

    var config = {
      options: {
        controller: this.templatePath("_controller.js"),
        shadowStyle: this.templatePath("_style.less"),
        shadowHTML: this.templatePath("_shadowContent.html")
      },
      args: ['ui-button']
    };

    this.composeWith('websemble:component', config);
  }
});
