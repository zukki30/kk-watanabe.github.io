/**
 * build & watch
 */
const gulp    = require('gulp');
const config  = require('../config');
const setting = config.setting;
const $       = require('gulp-load-plugins')(config.loadPlugins);

// Clean
gulp.task('clean', $.del.bind(null, setting.path.base.dest));

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
  $.connect.server(setting.connectSet(setting.path.base.dest), () => {
    $.browserSync.init(setting.browserSyncSet(setting.path.base.dest, setting.php_use));
  });

  gulp.watch([setting.path.sass.src], ['scss']);
  gulp.watch([setting.path.js.src + '**/*.js'], ['js']);
  gulp.watch([setting.path.include.src], ['include']);
  gulp.watch([setting.path.html.src], ['html']);
  gulp.watch([setting.path.json.src], ['json']);
  gulp.watch([setting.path.image.src], ['imagemin']);
});

gulp.task('default',['watch']);
