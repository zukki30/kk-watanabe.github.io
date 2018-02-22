const config  = require('./config');
const _base   = config.base;

const path    = require('path');
const webpack = require('webpack');
const cwp     = require('copy-webpack-plugin');
const ujp     = require('uglifyjs-webpack-plugin')

module.exports = {
  watch: true,
  entry: './' + _base.src + 'main.js',
  output: {
    path: path.resolve(__dirname, _base.dest),
    publicPath: _base.src,
    filename: 'bundle.js'
  },
  devtool: '#source-map',
  plugins: [
    new ujp({
      sourceMap: true,
    }),
    new cwp([{
      from: path.resolve(__dirname, _base.src, 'index.html'),
    }]),
  ],
  module: {
    rules: [
      {
        loader: 'babel-loader',
        test: /\.js?$/,
        exclude: /(node_modules)/,
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            scss: 'vue-style-loader!css-loader!sass-loader', // <style lang="scss">
            sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax' // <style lang="sass">
          }
        }
      }
    ]
  },
  resolve: {
    modules: [path.join(__dirname, 'src'), 'node_modules'],
    extensions: ['.js', '.vue'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    },
  },

  devServer: {
    contentBase : path.resolve(__dirname, _base.dest),
    publicPath  : _base.src,
    port        : 3000,
    host        : 'localhost',
  },
};
