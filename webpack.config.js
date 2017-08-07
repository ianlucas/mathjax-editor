const path = require('path')

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
  }
}