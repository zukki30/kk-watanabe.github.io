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
      src: base.src + 'js/**/index.js',
      dest: base.dest + 'js/',
    },
    html: {
      src: ['src/**/*', '!src/assets/**/*']
    },
  }
};

module.exports = {
  base: base,
  setting: setting,

  module: {
    entry: './src/assets.jsx',
    output: {
      filename: './build/bundle.js'
    },
    devtool: 'inline-source-map',
    loaders: [
      {
        test: /\.js?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  }
};
