const {resolve} = require('path')
const webpack = require('webpack')

const dist = resolve(__dirname, 'dist')

module.exports = {
  context: resolve(__dirname, 'client'),
  entry: './index.js',
  output: {
    filename: 'index.js',
    path: dist,
    publicPath: '/'
  },
  devtool: 'inline-source-map',

  devServer: {
    contentBase: dist,
    proxy: {
      '**': 'http://localhost:3000'
    }
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    loaders: [
      {test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader'}
    ]
  },
  plugins: [
    new webpack.NamedModulesPlugin()
  ]
}
