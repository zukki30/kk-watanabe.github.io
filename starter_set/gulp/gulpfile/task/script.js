/**
 * jsの更新
 */
const gulp    = require('gulp');
const config  = require('../config');
const setting = config.setting;
const $       = require('gulp-load-plugins')(config.loadPlugins);
const webpack       = require('webpack');
const webpackConfig = require('../webpack.config');

// JavaScript
gulp.task('js', () => {
    return $.webpackStream(webpackConfig, webpack)
        .pipe(gulp.dest('./' + setting.path.js.dest))
        .pipe($.browserSync.reload({stream: true}));
});
