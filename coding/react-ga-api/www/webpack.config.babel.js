import * as all from './module.js';

module.exports = {
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

console.log(all)
