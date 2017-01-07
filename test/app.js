'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');
var bootstrapConfig = path.join(__dirname,
    'bootstrapConfig.json');

/* global describe, before, it */

describe('generator-websemble:app', function() {
  before(function() {
    var deps = [
      [helpers.createDummyGenerator(), 'websemble:component']
    ];

    helpers.run(path.join(__dirname, '../generators/app'))
      .withArguments([bootstrapConfig])
      .withPrompts({name: 'testApp'})
      .withGenerators(deps);
  });

  it('creates files', function() {
    assert.file([
      'package.json',
      'gulpfile.js'
    ]);
  });
});
