/**
 * SVGの更新
 */
const gulp            = require('gulp');
const config          = require('../config');
const setting         = config.setting;
const $               = require('gulp-load-plugins')(config.loadPlugins);

gulp.task('svg', () => {
  return gulp.src(setting.path.svg.src)
    .pipe($.plumber({
      errorHandler: $.notify.onError("Error: <%= error.message %>") //<-
    }))
    .pipe($.svgmin((file) => {
        const prefix = $.path.basename(file.relative, $.path.extname(file.relative));

        return { plugins: setting.svg.plugin(prefix) }
    }))
    .pipe($.svgstore({ inlineSvg: true }))

    .pipe($.cheerio({
        run: ($) => {
            $('[fill]').removeAttr('fill');
            $('[stroke]').removeAttr('stroke');
            $('style').remove();
            $('title').remove();
            $('svg').attr('style','display:none');
        },
        parserOptions: { xmlMode: true }
    }))
    .pipe(gulp.dest(setting.path.image.dest));
});
