var path = require('path');

module.exports = {
  entry: './frontend/index.jsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public/javascripts')
  },
  module: {
    loaders: [
      {
        test: [/\.jsx?$/], // Specifies file types to transpile
        exclude: /(node_modules)/, // Leaves dependencies alone
        loader: 'babel-loader', // Sets Babel as the transpiler
        query: {
          presets: ['es2015', 'react'] // Tells Babel what syntaxes to translate
        }
      }
    ]
  }
};
