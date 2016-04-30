var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: {
    main: './src/main',
    cssantique: ['./src/cssantique'], //the [] are needed because main already depends on cssantique
  },
  output: {
    path: path.resolve(__dirname, 'js/'),
    filename: "[name].js",
    libraryTarget: "var",
    library: "CSSAntique"
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
