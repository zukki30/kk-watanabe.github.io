var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var rimraf = require('rimraf');
var runSequence = require('run-sequence');

// 開発ディレクトリ
var dev_dir = 'www/';

gulp.task('scss',function(){
  return gulp.src(dev_dir+'sass/**/*.scss')
    .pipe($.plumber({
      errorHandler: $.notify.onError("Error: <%= error.message %>") //<-
    }))
    .pipe($.sass())
    .pipe(gulp.dest(dev_dir+'css/'))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('html', function(){
  return gulp.src(dev_dir+'*.html')
    .pipe($.plumber({
      errorHandler: $.notify.onError("Error: <%= error.message %>") //<-
    }))
  .pipe($.changed())
  .pipe(gulp.dest(setting.path.base.dest))
  .pipe(browserSync.reload({stream: true}));
});

gulp.task('watch',function(){
  browserSync.init({
    server:{
      baseDir: ['www'],
    }
  });

  gulp.watch([dev_dir+'sass/**/*.scss'], {interval: 500}, ['scss']);
  gulp.watch([dev_dir+'**/*.js'], {interval: 500}, browserSync.reload);
  gulp.watch([dev_dir+'**/*.html'], {interval: 500}, browserSync.reload);
  gulp.watch([dev_dir+'**/*.php'], {interval: 500}, browserSync.reload);
});

gulp.task('default',['watch']);