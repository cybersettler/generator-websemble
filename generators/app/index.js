'use strict';
var Generator = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var AppConfig = require('./AppConfig.js');
var WriteService = require('./WriteService.js');

module.exports = class extends Generator {

  constructor(args, opts) {
    super(args, opts);
    this.argument('bootstrapConfigFilePath', {type: String, required: false});
  }

  prompting() {
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

    return this.prompt(prompts).then(answers => {
      this.props = answers;
      this.config.set('appname', answers.name);
      this.config.set('description', answers.description);
      this.config.set('styleFramework',
        AppConfig.styleOptions[answers.styleFramework]);
      this.config.set('structure', AppConfig.structure);
      done();
    });
  }

  initializing() {
    var appConfig = {
      arguments: ['core-app'],
      html: '<view-index></view-index>'
    };

    var indexConfig = {
      arguments: ['view-index'],
      html: '<h1>Index</h1>'
    };

    this.composeWith(require.resolve('../component'), appConfig);
    this.composeWith(require.resolve('../component'), indexConfig);
  }

  writing() {
    console.log('App writing');

    var writer = new WriteService(this);

    writer.copyConfigurationFiles();
    writer.copyEntryPoint();

    if (this.props.styleFramework !== 'Bootstrap') {
      this.log(chalk.gray('Bootstrap not enabled'));
      return;
    }

    this.log(chalk.blue('Bootstrap enabled'));

    writer.copyBootstrapConfigFile();
    writer.copyGlyphiconFiles();
    writer.copyLessFiles();
  }

  install() {
    this.installDependencies();
  }
};
