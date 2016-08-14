'use strict';
var gulp = require('gulp');
var del = require('del');
var path = require('path');
var install = require('gulp-install');
var vinylPaths = require('vinyl-paths');
var less = require('less');
var map = require('map-stream');
var ejs = require('ejs');
var tap = require('gulp-tap');

gulp.task('clean', function() {
  return gulp.src('build/*')
    .pipe(vinylPaths(del));
});

gulp.task('copyMainBuildFiles', ['clean'], function() {
  return gulp.src('src/main/webapp/**')
    .pipe(gulp.dest('build/'));
});

gulp.task('installDependencies', ['clean', 'copyMainBuildFiles',
  'compileBaseStyle'], function() {
    return gulp.src(['./build/bower.json', './build/package.json'])
      .pipe(install());
  });

/**
 * Compiles styles
 * @private
 * @param {object} file - Style file
 * @param {function} cb - callback
 */
function compileStyles(file, cb) {
  console.log('Compilig styles', file.path);
  var styles = {};
  var allCompillations = [];
  var basename = path.basename(file.path);
  var glob = file.path.replace(basename, '*.less');
  console.log('compiling', glob);
  gulp.src(glob).pipe(tap(
    function(styleFile) {
      var process = less.render(
        styleFile.contents.toString(), {
          paths: ['src/main/less']
        }).then(function(style) {
          console.log('Compiled style', styleFile.path);
          var key = path.basename(styleFile.path, '.less');
          styles[key] = style.css;
        });
      allCompillations.push(process);
    }))
    .on('end', function() {
      Promise.all(allCompillations).then(function() {
        console.log('compile styles stream ended', file.path);
        if (Object.keys(styles).length > 0) {
          console.log('writing style to view file', file.path);
          var html = ejs.render(file.contents.toString(), styles);
          file.contents = new Buffer(html);
        }
        cb(null, file);
      }, function(err) {
        throw new Error(err);
      });
    });
}

gulp.task('copyComponentViewFiles', ['clean', 'copyMainBuildFiles',
  'compileBaseStyle'], function() {
    return gulp.src(['src/main/component/**/view.html'])
      .pipe(map(compileStyles))
      .pipe(gulp.dest('build/frontend/component'));
  });

gulp.task('copyControllerFiles', ['clean', 'copyMainBuildFiles',
  'compileBaseStyle'], function() {
    return gulp.src(['src/main/component/**/*.js'])
      .pipe(gulp.dest('build/frontend/component'));
  });

gulp.task('compileBaseStyle', ['copyMainBuildFiles'], function() {
  return gulp.src(['src/main/less/base.less'])
    .pipe(map(function(file, cb) {
      less.render(
        file.contents.toString(), {
          paths: ['src/main/less']
        }).then(function(style) {
          console.log('Compiled style', file.path);
          file.contents = new Buffer(style.css);
          file.path = file.path.replace('.less', '.css');
          cb(null, file);
        }, function(err) {
          throw new Error(err);
        }).catch(function(err) {
          throw new Error('catch', err);
        });
    }))
    .pipe(gulp.dest('build/frontend/assets/css'));
});

gulp.task('generateIndexFile', ['compileComponents'], function() {
  var viewFiles = [];
  var styleFiles = [];
  return gulp.src([
    'build/frontend/component/**/*.html',
    'build/frontend/assets/css/*.css',
    'src/main/template/index.html'
  ])
    .pipe(vinylPaths(function(p) {
      var cssRegex = /[.]css$/;
      var htmlRegex = /[.]html$/;
      var frontendFileRegex = /^.*\/(frontend\/.*)/;
      var frontendPathRegex = /^.*\/frontend\/.*/;

      if (cssRegex.test(p)) {
        var stylePath = frontendFileRegex.exec(p)[1];
        styleFiles.push(stylePath);
      } else if (htmlRegex.test(p) && frontendPathRegex.test(p)) {
        console.log('storing path:', p);
        var viewPath = frontendFileRegex.exec(p)[1];
        viewFiles.push(viewPath);
      }
      return Promise.resolve();
    }))
    .pipe(map(function(file, cb) {
      if (/index[.]html$/.test(file.path)) {
        var contents = ejs.render(
          file.contents.toString(), {
            components: viewFiles,
            styles: styleFiles
          });
        console.log('rendering content with template', contents);
        file.contents = new Buffer(contents);
        cb(null, file);
      }
      cb();
    }))
    .pipe(gulp.dest('build'));
});

gulp.task('compileComponents', ['copyComponentViewFiles',
  'copyControllerFiles']);
gulp.task('build', [
  'clean', 'copyMainBuildFiles', 'compileBaseStyle',
  'installDependencies', 'compileComponents', 'generateIndexFile'
]);
gulp.task('default', ['build']);
