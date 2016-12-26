const webpack = require('webpack');
const config = require('./webpack.config');
const compiler = webpack(config);
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

module.exports = (app) =>{

	app.use(webpackDevMiddleware(compiler, {
	  publicPath: config.output.publicPath,
	  stats: {
	    colors: true
	  },
	  noInfo: true
	}));

	app.use(webpackHotMiddleware(compiler, {
	    log: console.log
	}));

};
