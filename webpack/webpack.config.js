'use strict';

var path = require('path');
var config = {
  entry: path.resolve(__dirname, 'app/main.js'),
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loader: 'babel'
    }]
  }
};

module.exports = config;

// module.exports = {
//   entry: [
//     'webpack/hot/dev-server',
//     'webpack-dev-server/client?http://localhost:8080',
//     path.resolve(__dirname, 'app/main.js')
//   ],
//   output: {
//     path: path.resolve(__dirname, 'build'),
//     filename: 'bundle.js'
//   }
// };
