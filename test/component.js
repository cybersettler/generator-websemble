'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');
var AppConfig = require(path.join(__dirname, '../generators/app/AppConfig.js'));

var localConfig = {
  appName: 'testApp',
  description: 'this is a test',
  styleFramework: 'Bootstrap',
  structure: AppConfig.structure
};

/* global describe, before, it */

describe('generator-websemble:component', function() {
  var sourcePath = path.join(__dirname,
    '../generators/componentButton/templates/');
  before(function() {
    return helpers.run(path.join(__dirname, '../generators/component'))
      .withArguments(['ui-button'])
      .withOptions({
        controller: path.join(sourcePath, '_controller.js'),
        shadowStyle: path.join(sourcePath, '_style.less'),
        shadowHTML: path.join(sourcePath, '_shadowContent.html')
      })
      .withLocalConfig(localConfig)
      .toPromise();
  });

  it('creates files', function() {
    console.log('current dir', __dirname);
    assert.file([
      'src/main/component/ui/Button/controller.js',
      'src/main/component/ui/Button/view.html',
      'src/main/component/ui/Button/style.less'
    ]);
  });
});
