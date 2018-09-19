const gulp    = require('gulp');
const config  = require('../config');
const setting = config.setting;
const $       = require('gulp-load-plugins')(config.loadPlugins);

// SASS
gulp.task('scss',() => {
  return gulp.src(setting.path.sass.src)
    .pipe($.plumber({
      errorHandler: $.notify.onError("Error: <%= error.message %>") //<-
    }))
    .pipe($.sass({outputStyle: 'compressed'}))
    .pipe($.postcss([
      require('autoprefixer')({browsers: setting.autoprefixer.browser}),
      require('css-mqpacker')
    ]))
    .pipe($.csso())
    .pipe(gulp.dest(setting.path.sass.dest))
    .pipe($.browserSync.reload({stream: true}));
});
