var config = require('./config');
var _base = config.base;
var _setting = config.setting;
var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './' + _setting.path.js.src + 'main.js',
  output: {
    path: path.join(__dirname, _setting.path.js.dest),
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  plugins: [
    new webpack.optimize.UglifyJsPlugin({sourceMap: true})
  ],
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /(node_modules)/,
        use:[
          {
            loader: 'babel-loader',
            options: {
              presets: [
                'es2015',
                'react'
              ]
            }
          }
        ]
      }
    ]
  }
};
