/**********************************
 環境変数
**********************************/
const base = {
  src  : 'src/assets/',
  dest : 'httpdocs/assets/',
};

const setting = {
  php_use     : true,
  autoprefixer: {
      browser: ['last 2 versions']
  },
  connectSet : (path) => {
    let set = {
      port : 8000,
      base : path
    };

    return set;
  },
  browserSyncSet : (path, use) => {
    let set;

    if(use) {
      set = {
        baseDir : path,
        proxy   : 'localhost:8000'
      };
    } else {
      set = {
        server : {
          baseDir : path
        }
      };
    }

    return set;
  },
  svg : {
    necessary: true,
    plugin   : (pre) => {
      let option = [{
        cleanupIDs: {
            prefix: pre + '-',
            minify: true
        }
      }];

      return option;
    }
  },
  imagemin: {
      jpg : {
          progressive: true
      },
      png : {
          optimizationLevel: 5
      },
      svg : {
         plugins: [
             {removeViewBox: true},
             {cleanupIDs: false}
         ]
      },
  },
  webpack : {
    // モード値を production に設定すると最適化された状態で、
    // development に設定するとソースマップ有効でJSファイルが出力される
    mode            : 'development',
    jqueryNecessary : true, //jQueryを使用しない場合はfalse

    uglifyJsPlugin : {
        sourceMap     : true,
        uglifyOptions : {
            mangle   : false,
            output   : {comments: false},
            compress : {warnings: false}
        }
    },
    providePlugin  : (judge) => {
      let plugin = {};

      if(judge) {
        plugin['jQuery'] = 'jquery';
        plugin['$']      = 'jquery';
      }

      return plugin;
    }
  },
  path: {
    base: {
      src: 'src',
      dest: 'httpdocs'
    },
    sass: {
      src: base.src + 'sass/**/*.s+(a|c)ss',
      dest: base.dest + 'css/',
    },
    js: {
      src: base.src + 'js/',
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
    json: {
      src: base.edit + 'json/*.json'
    },
    svg: {
      src: base.edit + 'svg/*.svg'
    },
    html: {
      src: ['src/**/*.+(html|php)', '!src/assets/**/*']
    },
  }
};

/**
 * ロードモジュールの設定
 */
const loadPlugins = {
  pattern: [
    'gulp-*',
    'gulp.*',
    'browser-sync',
    'run-sequence',
    'imagemin-*',
    'webpack-*',
    'del'
  ],
  rename : {
    'browser-sync'      : 'browserSync',
    'run-sequence'      : 'sequence',
    'del'               : 'del',
    'imagemin-svgo'     : 'imageminSvgo',
    'imagemin-jpegtran' : 'imageminJpeg',
    'imagemin-optipng'  : 'imageminPng',
    'webpack-stream'    : 'webpackStream',
    'gulp-connect-php'  : 'connect'
  }
};

module.exports = {
  base: base,
  setting: setting,
  loadPlugins: loadPlugins,
}
