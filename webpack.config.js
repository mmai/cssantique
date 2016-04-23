var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './src/showStyle.js',
  output: {
    path: path.resolve(__dirname, 'js/'),
    filename: 'showStyle.js'
  },
  module: {
    loaders: [
      { test: /.json/, include: [path.resolve(__dirname, "node_modules/browser-data/")], loader: 'json-loader' },
      { test: /.js/, include: [path.resolve(__dirname, "src")], loader: 'babel-loader' },
    ]
  },
  node: {
    fs: "empty"
  }
};
