'use strict';

var path = require('path');
var webpack = require('webpack');
var node_modules_dir = path.resolve(__dirname, 'node_modules');

var config = {
  entry: {
    app: path.resolve(__dirname, './app/main.js'),
    mobile: path.resolve(__dirname, './app/mobile.js'),
    // 这里是第三方的库文件
    vendors: ['react']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'// 注意我们使用了变量
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: [node_modules_dir],
      loader: 'babel'
    }]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js')
  ]
};

module.exports = config;
