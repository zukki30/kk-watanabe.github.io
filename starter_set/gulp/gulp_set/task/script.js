const gulp    = require('gulp');
const config  = require('../config');
const setting = config.setting;
const $       = require('gulp-load-plugins')(config.loadPlugins);

const uglify  = require('gulp-uglify-es').default;

// JavaScript
gulp.task('js', () => {
  return gulp.src(
      setting.path.js.src
    )
    .pipe($.plumber({
      errorHandler: $.notify.onError("Error: <%= error.message %>") //<-
    }))
    .pipe($.changed(setting.path.js.dest))
    .pipe(gulp.dest(setting.path.js.dest))
    .pipe($.browserSync.reload({stream: true}));
});

// JS Minify
gulp.task('jsminify', () => {
  if(setting.minify.js){
    return gulp.src(setting.path.js.dest+'**/*.js')
      .pipe($.plumber({
        errorHandler: $.notify.onError("Error: <%= error.message %>") //<-
      }))
      .pipe(uglify())
      .pipe(gulp.dest(setting.path.js.dest));
  }
});
