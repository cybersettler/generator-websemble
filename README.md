# generator-websemble [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]
> Websemble app generator.

## Installation

First, install [Yeoman](http://yeoman.io) and generator-websemble using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-websemble
```

## Getting started

First, create your project folder and cd into it.

```bash
mkdir MyProject
cd MyProject
```

Websemble is meant to work with [Bootstrap](http://getbootstrap.com/), in the future other frameworks. [Create your Bootstrap configuration](http://getbootstrap.com/customize/) and give the generated configuration file
as argument to Websemble. Inside you project directory do the following:

```bash
yo websemble ../path/to/bootstrap/config.json
```

You will be prompted to give your new application details. Choose Bootstrap as
your framework. One the generator is done, execute the following:

```bash
gulp
```

This will compile your application creating a build directory. One this is
done, execute the following:

```bash
cd build
npm start
```

You should see your application running with Electron. To learn more about
Websemble you can visit the [Github repository wiki](https://github.com/cybersettler/websemble/wiki).

## Getting To Know Yeoman

 * Yeoman has a heart of gold.
 * Yeoman is a person with feelings and opinions, but is very easy to work with.
 * Yeoman can be too opinionated at times but is easily convinced not to be.
 * Feel free to [learn more about Yeoman](http://yeoman.io/).

## License

Apache-2.0 © [Javier Escobar](http://www.babylonone.com/cybersettler)


[npm-image]: https://badge.fury.io/js/generator-websemble.svg
[npm-url]: https://npmjs.org/package/generator-websemble
[travis-image]: https://travis-ci.org/cybersettler/generator-websemble.svg?branch=master
[travis-url]: https://travis-ci.org/cybersettler/generator-websemble
[daviddm-image]: https://david-dm.org/cybersettler/generator-websemble.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/cybersettler/generator-websemble
[coveralls-image]: https://coveralls.io/repos/cybersettler/generator-websemble/badge.svg
[coveralls-url]: https://coveralls.io/r/cybersettler/generator-websemble
