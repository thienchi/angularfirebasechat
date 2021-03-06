const gulp = require('gulp');
const HubRegistry = require('gulp-hub');
const browserSync = require('browser-sync');

const conf = require('./conf/gulp.conf');

// Load some files into the registry
const hub = new HubRegistry([conf.path.tasks('*.js')]);

// Tell gulp to use the tasks just loaded
gulp.registry(hub);
gulp.task('dist', function () {
  return gulp.src('.tmp')
    .pipe(gulp.dest('dist'))
});
gulp.task('inject', gulp.series(gulp.parallel('styles', 'scripts','views'), 'inject'));
gulp.task('build', gulp.series('partials', gulp.parallel('inject'), 'build'));
// gulp.task('test', gulp.series('scripts', 'karma:single-run'));
// gulp.task('test:auto', gulp.series('watch', 'karma:auto-run'));
gulp.task('serve', gulp.series('inject', 'watch', 'browsersync'));
gulp.task('serve:dist', gulp.series('default', 'browsersync:dist'));
gulp.task('default', gulp.series('clean', ['build','copyhtml']));
gulp.task('watch', watch);
// gulp.task('dist', gulp.series('dist'));
function reloadBrowserSync(cb) {
  browserSync.reload();
  cb();
}

function watch(done) {
  gulp.watch([
    conf.path.src('index.html'),
    'bower.json'
  ], gulp.parallel('inject'));

  gulp.watch(conf.path.src('app/**/*.html'), gulp.series('partials', reloadBrowserSync));
  gulp.watch([
    conf.path.src('**/*.css')
  ], gulp.series('styles'));
  gulp.watch(conf.path.src('**/*.js'), gulp.series('inject'));
  done();
}
