/**********************************
 環境変数
**********************************/

const base = {
  src: 'src/assets/',
  dest: 'httpdocs/assets/',
};

module.exports.setting = {
  autoprefixer: {
      browser: ['last 2 versions']
  },
  browserSync: {
    // 使わない方はコメントアウトする
    // proxy: 'test.test',
    server:{
        baseDir: 'httpdocs',
    },
  },
  imagemin: {[
    imagemin.jpegtran({progressive: true}),
    imagemin.optipng({optimizationLevel: 5}),
    imagemin.svgo({
        plugins: [
            {removeViewBox: true},
            {cleanupIDs: false}
        ]
    }},

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
      src: base.src + 'img/**/*.+(jpg|jpeg|png|gif|svg)',
      dest: base.dest + 'img/',
    },
    include: {
      src: [base.src + 'inc/**/*'],
      dest: base.dest + 'inc/',
    },
    html: {
      src: ['src/**/*', '!src/assets/**/*']
    },
  }
};

/**
 * ロードモジュールの設定
 */
module.exports.loadPlugins = {
  pattern: [
    'gulp-*',
    'gulp.*',
    'browser-sync',
    'run-sequence',
    'imagemin-*',
    'del'
  ],
  rename : {
    'browser-sync'      : 'browserSync',
    'run-sequence'      : 'sequence',
    'del'               : 'del',
    'imagemin-svgo'     : 'imageminSvgo',
    'imagemin-jpegtran' : 'imageminJpeg',
    'imagemin-optipng'  : 'imageminPng'
  }
};
