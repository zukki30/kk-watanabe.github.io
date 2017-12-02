var base = {
  src: 'src/assets/',
  dest: 'httpdocs/assets/',
};

var setting = {
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
      src: base.src + 'js/',
      dest: base.dest + 'js/',
    },
    html: {
      src: ['src/**/*', '!src/assets/**/*']
    },
  }
};

module.exports = {
  base: base,
  setting: setting
}
