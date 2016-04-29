var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: {
    executeShowStyle: './src/executeShowStyle',
    showStyle: ['./src/showStyle'], //the [] are needed because executeShowStyle already depends on showStyle
  },
  output: {
    path: path.resolve(__dirname, 'js/'),
    filename: "[name].js",
    libraryTarget: "var",
    library: "ShowStyle"
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
