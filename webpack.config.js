var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: './src/cssantique',
  output: {
    path: path.resolve(__dirname),
    filename: 'cssantique.js',
    libraryTarget: 'var',
    library: 'CSSAntique'
  },
  module: {
    loaders: [
      { test: /.json/, include: [path.resolve(__dirname, 'node_modules/browser-data/')], loader: 'json-loader' },
      { test: /.js/, include: [path.resolve(__dirname, 'src')], loader: 'babel-loader' },
    ]
  },
  node: {
    fs: 'empty'
  }
}
