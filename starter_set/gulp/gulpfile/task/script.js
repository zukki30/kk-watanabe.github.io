/**
 * jsの更新
 */
const gulp          = require('gulp');
const config        = require('../config');
const setting       = config.setting;
const $             = require('gulp-load-plugins')(config.loadPlugins);
const webpack       = require('webpack');
const webpackConfig = require('../webpack.config');

// JavaScript
gulp.task('js', () => {
    return gulp.src(setting.path.js.src + '**/*.js')
        .pipe($.plumber({
          errorHandler: $.notify.onError("Error: <%= error.message %>") //<-
        }))
        .pipe($.webpackStream(webpackConfig, webpack))
        .pipe($.changed(setting.path.js.dest))
        .pipe(gulp.dest('./' + setting.path.js.dest))
        .pipe($.browserSync.reload({stream: true}));
});
