/**********************************
 環境変数
**********************************/
const path_data = require('path');

//baseディレクトリの指定
const base = {
  src  : 'src',
  dest : 'httpdocs',
};

//assetsディレクトリの指定
const assets = {
  src  : base.src + '/assets/',
  dest : base.dest + '/assets/',
};

//pashの指定
const path_setting = {
  base : {
    src  : base.src,
    dest : base.dest
  },
  sass : {
    src  : assets.src + 'sass/**/*.s+(a|c)ss',
    dest : assets.dest + 'css/',
  },
  js : {
    src  : assets.src + 'js/',
    dest : assets.dest + 'js/',
  },
  image : {
    src  : assets.src + 'img/**/*.+(jpg|jpeg|png|gif|svg)',
    dest : assets.dest + 'img/',
  },
  include : {
    src  : [assets.src + 'inc/**/*'],
    dest : assets.dest + 'inc/',
  },
  json : {
    src : assets.src + 'json/*.json'
  },
  svg : {
    src : assets.src + 'svg/*.svg'
  },
  html : {
    src : ['src/**/*.+(html|php)', '!src/assets/**/*']
  },
};

//PHPを使用する場合使用。
//PORT：8000が使用されている場合任意の番号に変更
const port_num = 8000;

//各モジュールの設定
const setting = {
  //PHPを使用する場合は「turu」
  php_use     : false,

  //ブラウザバージョン管理
  autoprefixer: {
      browser: ['last 2 versions']
  },

  //PHPを使用する場合使用。
  connectSet : (path) => {
    let set = {
      port : port_num,
      base : path
    };

    return set;
  },

  //「browser-sync」の設定。
  //PHPを使用するかによって分岐
  browserSyncSet : (path, use) => {
    let set;

    if(use) {
      set = {
        baseDir : path,
        proxy   : 'localhost:' + port_num
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

  //SVGの設定
  svg : {
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

  //画像の圧縮関連設定
  //必要であれば変更
  imagemin: {
      jpg : {
          progressive: true
      },
      png : {
          optimizationLevel: 5
      },
      svg : {
         plugins: [
             {removeViewBox : true},
             {cleanupIDs    : false}
         ]
      },
  },

  //Webpackの設定
  webpack : {
    // モード値を production に設定すると最適化された状態で、
    // development に設定するとソースマップ有効でJSファイルが出力される
    mode            : 'development',

    //編集ファイル
    entry_file      : `./${path_setting.js.src}common.js`,

    //出力ファイル
    output_file     : {
      path     : path_data.join(__dirname, path_setting.js.dest),
      filename : 'bundle.js'
    },

    //jQueryを使用しない場合はfalse
    jqueryNecessary : true,

    //uglifyの設定
    uglifyJsPlugin : {
        sourceMap     : true,
        uglifyOptions : {
            mangle   : false,
            output   : {comments: false},
            compress : {warnings: false}
        }
    },

    //jQueryを使用する場合に実行
    //
    providePlugin  : (judge) => {
      let plugin = {};

      if(judge) {
        plugin['jQuery'] = 'jquery';
        plugin['$']      = 'jquery';
      }

      return plugin;
    }
  }
};

/**
 * ロードモジュールの設定
 */
const load_plugins = {
  pattern : [
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
  base        : assets,
  paths       : path_setting,
  setting     : setting,
  loadPlugins : load_plugins,
}
