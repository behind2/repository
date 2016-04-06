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
var config = {
  entry: path.resolve(__dirname, './app/main.js'),
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loader: 'babel'
    }, {
      test: /\.less$/,
      loader: 'style!css!less'
    }, {
      test: /\.scss$/,
      loader: 'style!css!sass'
    }]
  }
};
module.exports = config;
