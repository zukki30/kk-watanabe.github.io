// gulpパッケージの読み込み
const requireDir = require('require-dir');

// タスクの読み込み
requireDir('./gulp_set/task/', {recurse: true});

const gulp    = require('gulp');
const config  = require('./gulp_set/config');
const setting = config.setting;
const $       = require('gulp-load-plugins')(config.loadPlugins);

// Clean
gulp.task('clean', $.del.bind(null, setting.path.base.dest));

// Build
gulp.task('build', () => {
  return $.sequence(
    ['clean'],
    ['html', 'js', 'scss', 'include'],
    ['imagemin', 'jsminify']
    );
});

// Watch
gulp.task('watch', () => {
  $.browserSync.init(setting.browserSync);

  gulp.watch([setting.path.sass.src], ['scss']);
  gulp.watch([setting.path.js.src], ['js']);
  gulp.watch([setting.path.include.src], ['include']);
  gulp.watch([setting.path.html.src], ['html']);
  gulp.watch([setting.path.image.src], ['imagemin']);
});

gulp.task('default',['watch']);
