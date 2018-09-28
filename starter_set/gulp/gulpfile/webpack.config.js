/**
 * Webpack関連まとめ
 */
const config         = require('./config');
const setting        = config.setting;
const webpack        = require('webpack');
const paths          = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    mode: setting.webpack.mode,

    // メインのJS
    entry: `./${setting.path.js.src}common.js`,
    // 出力ファイル
    output: {
        path: paths.join(__dirname, setting.path.js.dest),
        filename: 'bundle.js'
    },
    module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: [
              {
                loader: 'babel-loader',
                options: {
                  presets: [
                    ['env', {
                      'target' : {
                        'browsers' : setting.autoprefixer.browser
                      },
                      'modules': false
                    }]
                  ]
                }
              },
              {
                loader: 'eslint-loader',
                options: {
                  configFile  : './lint/.eslintrc.json',
                }
              }
            ]
          }
        ]
    },
    devtool: '#source-map',
    plugins: [
        new webpack.ProvidePlugin(setting.webpack.providePlugin(setting.webpack.jqueryNecessary)),
        new UglifyJsPlugin(setting.webpack.uglifyJsPlugin)
    ],
    optimization : {
        minimizer:
            setting.webpack.mode === 'production'
                ?[
                    new UglifyJsPlugin({
                        uglifyOptions: {
                            compress: {drop_console: true},
                            output  : {comments: /^\**!|@preserve|@license|@cc_on/i}
                        },
                    })
                ]
                : [],
    }
}
