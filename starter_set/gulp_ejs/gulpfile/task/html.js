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

// 「 ../ 」をdataの数で出力する
const getFolderPass = function(data) {
  const pathTxt = '../';

  let addPath = '';

  for (var i = 0; i < data.length; i++) {
    addPath = addPath + pathTxt;
  }

  return addPath;
};

// HTML
gulp.task('html', () => {
    const meta_data = JSON.parse(fs.readFileSync(meta));

  return gulp.src(paths.html.src)
    .pipe($.data(file => {
      //フォルダのパスを取得し整形
      const allPath   = file.path.split('\\').join('/');
      const allPaths  = allPath.split('/ejs/');
      const path_data = allPaths[1].replace('.ejs', '').split('/');
      const path_url  = allPaths[1].replace('.ejs', '.html');

      return {
        'fileurl'    : path_url,
        'filename'   : path_data,
        'folderpath' : getFolderPass(path_data)
      }
    }))
    .pipe($.ejs({meta_data}, {rmWhitespace: true}, {ext: '.html'}))
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
