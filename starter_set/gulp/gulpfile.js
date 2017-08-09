var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var runSequence = require('run-sequence');
var del = require('del');
var uglify = require('gulp-uglify-es').default;

var base = {
  src: 'src/assets/',
  dest: 'httpdocs/assets/',
};

var setting = {
  autoprefixer: {
      browser: ['last 2 versions']]
  },
  browserSync: {
    // 使わない方はコメントアウトする
    // proxy: 'test.test',
    server:{
        baseDir: 'httpdocs',
    },
  },
  imagemin: {
    disabled: false,  // falseでimageminを実行
    level: 7  // 圧縮率
  },
  // css、jsのミニファイの有効化/無効化
  minify: {
    js: true
  },
  path: {
    base: {
      src: 'src',
      dest: 'httpdocs'
    },
    sass: {
      src: base.src + 'sass/**/*.scss',
      dest: base.dest + 'css/',
    },
    js: {
      src: base.src + 'js/**/*.js',
      dest: base.dest + 'js/',
    },
    image: {
      src: base.src + 'img/**/*',
      dest: base.dest + 'img/',
    },
    lib: {
      src: 'src/lib/**/*',
      dest: 'httpdocs/lib/',
    },
    include: {
      src: [base.src + 'inc/**/*'],
      dest: base.dest + 'inc/',
    },
    etc: {
      src: 'src/etc/**/*',
      dest: 'httpdocs/etc/',
    },
    html: {
      src: ['src/**/*', '!src/assets/**/*']
    },
  }
};

// 画像の圧縮
gulp.task('imagemin', function(){
  if(!setting.imagemin.disabled){
    var imageminOptions = {
      optimizationLevel: setting.imagemin.lebel
    };

    return gulp.src(setting.path.image.src)
      .pipe($.plumber({
        errorHandler: $.notify.onError("Error: <%= error.message %>") //<-
      }))
      .pipe($.changed(setting.path.image.dest))
      .pipe($.imagemin(imageminOptions))
      .pipe(gulp.dest(setting.path.image.dest))
      .pipe(browserSync.reload({stream: true}));
  }else{
    return gulp.src(
        setting.path.image.src
      )
      .pipe($.plumber({
        errorHandler: $.notify.onError("Error: <%= error.message %>") //<-
      }))
      .pipe($.changed(setting.path.image.dest))
      .pipe(gulp.dest(setting.path.image.dest))
      .pipe(browserSync.reload({stream: true}));
  }
});

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
    .pipe($.changed(setting.path.js.dest))
    .pipe(gulp.dest(setting.path.js.dest))
    .pipe(browserSync.reload({stream: true}));
});

// Lib
gulp.task('lib', function(){
  return gulp.src(
      setting.path.lib.src
    )
    .pipe($.plumber({
      errorHandler: $.notify.onError("Error: <%= error.message %>") //<-
    }))
    .pipe($.changed(setting.path.lib.dest))
    .pipe(gulp.dest(setting.path.lib.dest))
    .pipe(browserSync.reload({stream: true}));
});

// Include
gulp.task('include', function(){
  return gulp.src(
      setting.path.include.src
    )
    .pipe($.plumber({
      errorHandler: $.notify.onError("Error: <%= error.message %>") //<-
    }))
    .pipe($.changed(setting.path.include.dest))
    .pipe(gulp.dest(setting.path.include.dest))
    .pipe(browserSync.reload({stream: true}));
});

// Etc
gulp.task('etc', function(){
  return gulp.src(
      setting.path.etc.src
    )
    .pipe($.plumber({
      errorHandler: $.notify.onError("Error: <%= error.message %>") //<-
    }))
    .pipe($.changed(setting.path.etc.dest))
    .pipe(gulp.dest(setting.path.etc.dest))
    .pipe(browserSync.reload({stream: true}));
});

// JS Minify
gulp.task('jsminify', function(){
  if(setting.minify.js){
    return gulp.src(setting.path.js.dest+'**/*.js')
      .pipe($.plumber({
        errorHandler: $.notify.onError("Error: <%= error.message %>") //<-
      }))
      .pipe(uglify())
      .pipe(gulp.dest(setting.path.js.dest));
  }
});

// Clean
gulp.task('clean', del.bind(null, setting.path.base.dest));

// Build
gulp.task('build', function(){
  return runSequence(
    ['clean'],
    ['html', 'js', 'scss', 'lib', 'include', 'etc'],
    ['imagemin', 'jsminify']
    );
});

// Watch
gulp.task('watch', function(){
  browserSync.init(setting.browserSync);

  gulp.watch([setting.path.sass.src], ['scss']);
  gulp.watch([setting.path.js.src], ['js']);
  gulp.watch([setting.path.lib.src], ['lib']);
  gulp.watch([setting.path.include.src], ['include']);
  gulp.watch([setting.path.etc.src], ['etc']);
  gulp.watch([setting.path.html.src], ['html']);
  gulp.watch([setting.path.image.src], ['imagemin']);
});

gulp.task('default',['watch']);
