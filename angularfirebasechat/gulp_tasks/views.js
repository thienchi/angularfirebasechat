const gulp = require('gulp');
const eslint = require('gulp-eslint');

const conf = require('../conf/gulp.conf');

gulp.task('views', views);

function views() {
  return gulp.src(conf.path.src('**/*.html'))

    .pipe(gulp.dest(conf.path.tmp()));
}
// .pipe(eslint())
//   .pipe(eslint.format())
