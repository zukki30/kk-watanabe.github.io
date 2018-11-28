/**
 * PHPインクルードの更新
 */
const gulp    = require('gulp');
const config  = require('../config');
const paths   = config.paths;
const $       = require('gulp-load-plugins')(config.loadPlugins);

// Include
gulp.task('include', () => {
  return gulp.src(paths.include.src)
    .pipe($.plumber({
      errorHandler: $.notify.onError("Error: <%= error.message %>") //<-
    }))
    .pipe($.changed(paths.include.dest))
    .pipe(gulp.dest(paths.include.dest))
    .pipe($.browserSync.reload({stream: true}));
});
