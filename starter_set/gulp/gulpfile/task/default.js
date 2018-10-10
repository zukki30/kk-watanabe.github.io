/**
 * build & watch
 */
const gulp    = require('gulp');
const config  = require('../config');
const paths   = config.paths;
const setting = config.setting;
const $       = require('gulp-load-plugins')(config.loadPlugins);

// Clean
gulp.task('clean', $.del.bind(null, paths.base.dest));

// Build
gulp.task('build', () => {
  return $.sequence(
    ['clean'],
    ['html', 'js', 'scss', 'include', 'json'],
    ['svg', 'imagemin']
    );
});

// Watch
gulp.task('watch', () => {
  if(setting.php_use) {
    $.connect.server(setting.connectSet(paths.base.dest), () => {
      $.browserSync.init(setting.browserSyncSet(paths.base.dest, setting.php_use));
    });
  } else {
    $.browserSync.init(setting.browserSyncSet(paths.base.dest, setting.php_use));
  }

  gulp.watch([paths.sass.src], ['scss']);
  gulp.watch([paths.js.src + '**/*.js'], ['js']);
  gulp.watch([paths.include.src], ['include']);
  gulp.watch([paths.html.src], ['html']);
  gulp.watch([paths.json.src], ['json']);
  gulp.watch([paths.image.src], ['imagemin']);
});

gulp.task('default',['watch']);
