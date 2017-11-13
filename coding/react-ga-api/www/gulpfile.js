var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var runSequence = require('run-sequence');
var del = require('del');

var webpackStream = require('webpack-stream');
var webpack = require('webpack');
var webpackConfig = require("./webpack.config");

var config = require('./config');
var _base = config.base;
var _setting = config.setting;

var gulpJsPath = _setting.path.js.src + '**/*.js';

// SASS
gulp.task('scss',function(){
  return gulp.src(_setting.path.sass.src)
    .pipe($.plumber({
      errorHandler: $.notify.onError("Error: <%= error.message %>") //<-
    }))
    .pipe($.sass({outputStyle: 'compressed'}))
    .pipe($.postcss([
      require('autoprefixer')({browsers: _setting.autoprefixer.browser}),
      require('css-mqpacker')
    ]))
    .pipe($.csso())
    .pipe(gulp.dest(_setting.path.sass.dest))
    .pipe(browserSync.reload({stream: true}));
});

// HTML
gulp.task('html', function(){
  return gulp.src(
      _setting.path.html.src,
      {base: _setting.path.base.src}
    )
    .pipe($.plumber({
      errorHandler: $.notify.onError("Error: <%= error.message %>") //<-
    }))
    .pipe($.changed(_setting.path.base.dest))
    .pipe(gulp.dest(_setting.path.base.dest))
    .pipe(browserSync.reload({stream: true}));
});

// JavaScript
gulp.task('js', function(){
  return gulp.src(gulpJsPath)
    .pipe(webpackStream(webpackConfig, webpack))
    .pipe(gulp.dest(_setting.path.js.dest))
    .pipe(browserSync.reload({stream: true}));
});

// Clean
gulp.task('clean', del.bind(null, _setting.path.base.dest));

// Build
gulp.task('build', function(){
  return runSequence(
    ['clean'],
    ['html', 'js', 'scss']
    );
});

// Watch
gulp.task('watch', function(){
  console.log(_setting.browserSync)
  browserSync.init(_setting.browserSync);

  gulp.watch([_setting.path.sass.src], ['scss']);
  gulp.watch([gulpJsPath], ['js']);
  gulp.watch([_setting.path.html.src], ['html']);
});

gulp.task('default',['watch']);
