'use strict';

// var path = require('path');
// var config = {
//   entry: path.resolve(__dirname, './app/main.js'),
//   output: {
//     path: path.resolve(__dirname, 'build'),
//     filename: 'bundle.js'
//   },
//   module: {
//     loaders: [{
//       test: /\.jsx?$/,
//       loader: 'babel'
//     }, {
//       test: /\.css$/,
//       loader: 'style!css'
//     }]
//   }
// };
//
// module.exports = config;

// 加载LESS和SASS
var path = require('path');
var node_modules_dir = path.resolve(__dirname, 'node_modules');
var config = {
  entry: path.resolve(__dirname, './app/main.js'),
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loader: 'babel',
      exclude: [node_modules_dir]
    }, {
      test: /\.less$/,
      loader: 'style!css!less'
    }, {
      test: /\.scss$/,
      loader: 'style!css!sass'
    }, {
      test: /\.(png|jpg)$/,
      loader: 'url?limit=25000'
    }, {
      test: /\.woff$/,
      loader: 'url?limit=100000'
    }]
  }
};
module.exports = config;
