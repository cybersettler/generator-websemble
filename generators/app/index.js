'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var AppConfig = require('./AppConfig.js');
var WriteService = require('./WriteService.js');

module.exports = yeoman.Base.extend({

  constructor: function() {
    yeoman.Base.apply(this, arguments);
    this.argument('bootstrapConfigFilePath', {type: String, required: false});
  },

  prompting: function() {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'The ' + chalk.red('Websemble') +
        ' generator will help you set up your project.'
    ));

    var prompts = [{
      type: 'input',
      name: 'name',
      message: 'Your project name',
      default: this.appname // Default to current folder name
    }, {
      type: 'input',
      name: 'description',
      message: 'Your project description'
    }, {
      type: 'list',
      name: 'styleFramework',
      message: 'CSS style framework:',
      choices: ['none', 'Bootstrap'],
      default: 'Bootstrap'
    }];

    this.prompt(prompts, function(props) {
      this.props = props;
      this.config.set('appname', props.name);
      this.config.set('description', props.description);
      this.config.set('styleFramework',
        AppConfig.styleOptions[props.styleFramework]);
      this.config.set('structure', AppConfig.structure);
      done();
    }.bind(this));
  },

  appComponent: function() {
    this.log(chalk.blue('Copying app component'));

    var appConfig = {
      args: ['core-app'],
      options: {
        html:'<content></content>'
      }
    };

    var indexConfig = {
      args: ['view-index'],
      options: {
        html:'<h1>Index</h1>'
      }
    };

    this.composeWith('websemble:component', appConfig);
    this.composeWith('websemble:component', indexConfig);
  },

  writing: function() {
    console.log('App writing');

    var writer = new WriteService(this);

    writer.copyConfigurationFiles();
    writer.copyEntryPoint();

    if (this.props.styleFramework !== 'Bootstrap') {
      this.log(chalk.gray('Bootstrap not enabled'));
      return;
    }

    this.log(chalk.blue('Bootstrap enabled'));

    writer.copyGlyphiconFiles();
    writer.generateVariablesLessFile();
    writer.copyLessFiles();
  },

  install: function() {
    this.installDependencies();
  }
});
