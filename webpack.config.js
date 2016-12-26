const webpack = require('webpack');
const path = require('path');
const BUILD_DIR = path.resolve(__dirname, 'client/public');
const APP_DIR = path.resolve(__dirname, 'client/app');

const config = {
  devtool: 'source-map',
  entry: [
    'webpack/hot/dev-server',
    'webpack-hot-middleware/client',
    APP_DIR + '/index.jsx'
  ],
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  module : {
    loaders : [
      {
        test : /\.jsx?/,
        include : APP_DIR,
        loader : 'babel',
        query: {
          presets: ['react-hmre']
        }
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
};
module.exports = config;
