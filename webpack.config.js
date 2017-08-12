const path = require('path')
const webpack = require('webpack')

const banner =
`
MathJax Editor
http://github.com/ianlucas/mathjax-editor

by Ian Lucas
Released under the MIT license.
`

module.exports = {
  entry: './src/index',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'MathJaxEditor.js',
    library: 'MathJaxEditor',
    libraryTarget: 'umd'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: { presets: ['env'] }
        }
      }
    ]
  },

  devServer: {
    contentBase: path.resolve(__dirname, 'test'),
    compress: false
  },

  plugins: [new webpack.BannerPlugin(banner)]
}