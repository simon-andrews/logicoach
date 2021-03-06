// https://webpack.js.org/guides/typescript/

const path = require('path');

module.exports = {
  entry: './src/main.ts',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [ '.ts', '.js' ]
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'logicoach',
    libraryTarget: 'var'
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist')
  }
};
