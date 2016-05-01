var less = require('less');
var chalk = require('chalk');

function WriteService( generator ) {

  var fs = generator.fs;
  var structure = generator.config.get( 'structure' );

  this.renderBaseCSS = function(){

    var input = fs.read( generator.templatePath( "_bootstrap.less" ) );

    less.render(
      input,{
        paths: [ generator.destinationPath( structure.src.main.less ), generator.destinationPath( structure.src.main.less + "mixins" ) ]  // Specify search paths for @import directives
      },
      function (e, output) {

        if( e ){
          generator.log( chalk.red( e.name + ': ' + e.message ) );
          return;
        }

        var destinationPath = generator.destinationPath( structure.frontend.assets + "css/base.css" );
        generator.log( chalk.gray( "Writting CSS to file " + destinationPath ) );
        fs.write( destinationPath, output.css  );

      });

    }

}

module.exports = WriteService;
