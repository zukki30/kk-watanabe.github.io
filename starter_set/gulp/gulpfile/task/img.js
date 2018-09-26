/**
 * 画像の更新
 */
const gulp            = require('gulp');
const config          = require('../config');
const setting         = config.setting;
const $               = require('gulp-load-plugins')(config.loadPlugins);
const
 imageminOptions = [
   $.imagemin.jpegtran(setting.imagemin.jpg),
   $.imagemin.optipng(setting.imagemin.png),
   $.imagemin.svgo(setting.imagemin.svg)
 ];

// 画像の圧縮
gulp.task('imagemin', () => {
  return gulp.src(setting.path.image.src)
    .pipe($.plumber({
      errorHandler: $.notify.onError("Error: <%= error.message %>") //<-
    }))
    .pipe($.changed(setting.path.image.dest))
    .pipe($.imagemin(imageminOptions))
    .pipe(gulp.dest(setting.path.image.dest))
    .pipe($.browserSync.reload({stream: true}));
});
