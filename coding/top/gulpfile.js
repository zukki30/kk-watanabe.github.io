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

gulp.task('watch',function(){
  browserSync.init({
    // proxy: 'r-saiyo2016.res'
    server:{
      baseDir: ['www'],
    }
  });

  gulp.watch([dev_dir+'sass/**/*.scss'], ['scss']);
  gulp.watch([dev_dir+'**/*.js'], browserSync.reload);
  gulp.watch([dev_dir+'**/*.html'], browserSync.reload);
  gulp.watch([dev_dir+'**/*.php'], browserSync.reload);
});

gulp.task('default',['watch']);