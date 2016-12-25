const webpack = require('webpack');

const banner =
`
MathJax Editor
https://github.com/ianlucas/mathjax-editor

(c) 2016, Ian Lucas.
Released under the MIT license
`;

module.exports = {
  entry: './src/MathJaxEditor',

  output: {
    path: './dist',
    filename: 'MathJaxEditor.js',
    library: 'MathJaxEditor',
    libraryTarget: 'umd'
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },

  plugins: [
    new webpack.BannerPlugin(banner)
  ]
};