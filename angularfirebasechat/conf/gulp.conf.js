'use strict';

/**
 *  This file contains the variables used in other gulp files
 *  which defines tasks
 *  By design, we only put there very generic config values
 *  which are used in several places to keep good readability
 *  of the tasks
 */

const path = require('path');
const gutil = require('gulp-util');

exports.ngModule = 'app';

/**
 *  The main paths of your project handle these with care
 */
exports.paths = {
  src: '',
  dist: 'dist',
  tmp: '.tmp',
  e2e: 'e2e',
  tasks: 'gulp_tasks',
  html:'app/**/*.html',
  htmldist:'dist/app',
  select2png: 'bower_components/select2/*.{png,gif}',
  leafletpng:'bower_components/leaflet/dist/images/*.png',
  leafletdrawpng:'bower_components/leaflet-draw/dist/images/*.png',
  leafletdrawsvg:'bower_components/leaflet-draw/dist/images/*.svg',
  cssimages: 'dist/css',
  locale: 'app/locales/**/*.json',
  appimages: 'app/images/**/*.png',
  cssfont: 'app/fonts/**/*.{ttf,woff,woff2,eot,otf,eof,svg}',
  angulari18: 'bower_components/angular-i18n/*.*'
};

/**
* used on gulp dist
*/
exports.htmlmin = {
  ignoreCustomFragments: [/{{.*?}}/]
};

exports.path = {};
for (const pathName in exports.paths) {
  if (Object.prototype.hasOwnProperty.call(exports.paths, pathName)) {
    exports.path[pathName] = function () {
      const pathValue = exports.paths[pathName];
      const funcArgs = Array.prototype.slice.call(arguments);
      const joinArgs = [pathValue].concat(funcArgs);
      return path.join.apply(this, joinArgs);
    };
  }
}

/**
 *  Common implementation for an error handler of a Gulp plugin
 */
exports.errorHandler = function (title) {
  return function (err) {
    gutil.log(gutil.colors.red(`[${title}]`), err.toString());
    this.emit('end');
  };
};
/**
 *  Wiredep is the lib which inject bower dependencies in your project
 *  Mainly used to inject script tags in the index.html but also used
 *  to inject css preprocessor deps and js files in karma
 */
exports.wiredep = {
  exclude: [/\/bootstrap\.js$/],
  directory: 'bower_components'
};
