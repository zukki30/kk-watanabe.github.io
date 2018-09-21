/**
 * jsonの更新
 */
const gulp            = require('gulp');
const config          = require('../config');
const setting         = config.setting;
const $               = require('gulp-load-plugins')(config.loadPlugins);

gulp.task('json', function(){
  return gulp.src(setting.path.json.src)
    .pipe($.plumber({
      errorHandler: $.notify.onError("Error: <%= error.message %>") //<-
    }))
    .pipe($.changed(setting.path.js.dest))
    .pipe(gulp.dest(setting.path.js.dest))
    .pipe($.browserSync.reload({stream: true}));
});
