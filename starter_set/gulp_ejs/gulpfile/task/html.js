/**
 * HTMLの更新
 */
const gulp    = require('gulp');
const config  = require('../config');
const paths   = config.paths;
const $       = require('gulp-load-plugins')(config.loadPlugins);

// HTML
gulp.task('html', () => {
  return gulp.src(
      paths.html.src,
      {base: paths.base.src}
    )
    .pipe($.htmlhint('./lint/.htmlhintrc'))
    .pipe($.plumber({
      errorHandler: $.notify.onError("Error: <%= error.message %>") //<-
    }))
    .pipe($.htmlhint.failOnError())
    .pipe($.changed(paths.base.dest))
    .pipe(gulp.dest(paths.base.dest))
    .pipe($.browserSync.reload({stream: true}));
});
