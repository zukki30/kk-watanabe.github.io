/**
 * PHPインクルードの更新
 */
const gulp    = require('gulp');
const config  = require('../config');
const setting = config.setting;
const $       = require('gulp-load-plugins')(config.loadPlugins);

// Include
gulp.task('include', () => {
  return gulp.src(
      setting.path.include.src
    )
    .pipe($.plumber({
      errorHandler: $.notify.onError("Error: <%= error.message %>") //<-
    }))
    .pipe($.changed(setting.path.include.dest))
    .pipe(gulp.dest(setting.path.include.dest))
    .pipe($.browserSync.reload({stream: true}));
});
