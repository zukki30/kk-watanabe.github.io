/**
 * build & watch
 */
const gulp    = require('gulp');
const config  = require('../config');
const paths   = config.paths;
const setting = config.setting;
const $       = require('gulp-load-plugins')(config.loadPlugins);

// Build
gulp.task('build', () => {
  return $.sequence(
    ['js', 'scss', 'include', 'json'],
    ['svg', 'imagemin']
    );
});

// Watch
gulp.task('watch', () => {
  $.connect.server(setting.connectSet(paths.base.dest), () => {
    $.browserSync.init(setting.browserSyncSet(paths.base.dest, setting.php_use));
  });

  gulp.watch([paths.sass.src], ['scss']);
  gulp.watch([paths.js.src + '**/*.js'], ['js']);
  gulp.watch([paths.include.src], ['include']);
  gulp.watch([paths.json.src], ['json']);
  gulp.watch([paths.image.src], ['imagemin']);

  gulp.watch([paths.html.dest], {interval : 500}, $.browserSync.reload);
});

gulp.task('default',['watch']);
