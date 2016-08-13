'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');
var deps = [
  [helpers.createDummyGenerator(), 'websemble:component']
];
var bootstrapConfig = path.join(__dirname,
    'bootstrapConfig.json');

describe('generator-websemble:app', function () {
  before(function () {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withArguments([bootstrapConfig])
      .withPrompts({name: 'testApp'})
      .withGenerators(deps)
      .toPromise();
  });

  it('creates files', function () {
    assert.file([
      'package.json',
      'gulpfile.js'
    ]);
  });
});
