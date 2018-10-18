/**
 * HTMLの更新
 */
const gulp    = require('gulp');
const config  = require('../config');
const paths   = config.paths;
const setting = config.setting;
const meta    = setting.meta_data;
const fs      = require( 'fs' );
const $       = require('gulp-load-plugins')(config.loadPlugins);

// HTML
gulp.task('html', () => {
    const meta_data = JSON.parse(fs.readFileSync(meta));

  return gulp.src(paths.html.src)
    .pipe($.ejs({meta_data}, {}, {ext: '.html'}))
    .pipe($.plumber({
      errorHandler: $.notify.onError("Error: <%= error.message %>") //<-
    }))
    .pipe($.changed(paths.html.dest))
    .pipe(gulp.dest(paths.html.dest))
    .pipe($.browserSync.reload({stream: true}));
});

// HTML
gulp.task('htmlhint', () => {
  return gulp.src(paths.html.dest + '/**/*.html')
    .pipe($.htmlhint('./lint/.htmlhintrc'))
    .pipe($.plumber({
      errorHandler: $.notify.onError("Error: <%= error.message %>") //<-
    }))
    .pipe($.htmlhint.failOnError())
    .pipe($.changed(paths.html.dest))
});
