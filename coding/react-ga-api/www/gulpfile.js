import * as all from './module.js';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var runSequence = require('run-sequence');
var del = require('del');

var webpackStream = require('webpack-stream');
var webpack = require('webpack');

var webpackConfig = require('./webpack.config');

console.log(all)

// SASS
gulp.task('scss',function(){
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
    .pipe(browserSync.reload({stream: true}));
});

// HTML
gulp.task('html', function(){
  return gulp.src(
      setting.path.html.src,
      {base: setting.path.base.src}
    )
    .pipe($.plumber({
      errorHandler: $.notify.onError("Error: <%= error.message %>") //<-
    }))
    .pipe($.changed(setting.path.base.dest))
    .pipe(gulp.dest(setting.path.base.dest))
    .pipe(browserSync.reload({stream: true}));
});

// JavaScript
gulp.task('js', function(){
  return gulp.src(
      setting.path.js.src
    )
    .pipe($.plumber({
      errorHandler: $.notify.onError("Error: <%= error.message %>") //<-
    }))
    .pipe($.webpack(require('./webpack.config.js')))
    .pipe(gulp.dest(setting.path.js.dest))
    .pipe(browserSync.reload({stream: true}));
});

// Clean
gulp.task('clean', del.bind(null, setting.path.base.dest));

// Build
gulp.task('build', function(){
  return runSequence(
    ['clean'],
    ['html', 'js', 'scss']
    );
});

// Watch
gulp.task('watch', function(){
  browserSync.init(setting.browserSync);

  gulp.watch([setting.path.sass.src], ['scss']);
  gulp.watch([setting.path.js.src], ['js']);
  gulp.watch([setting.path.html.src], ['html']);
});

gulp.task('default',['watch']);
