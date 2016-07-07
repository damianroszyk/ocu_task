var plugins = require('./webpack/plugins');
var loaders = require('./webpack/loaders');
var devServer = require('./webpack/server');
var postcss = require('./webpack/postcss');

module.exports = {
	entry: './src/index.js',
	output: {
		path: './dist',
		filename: 'bundle.js',
		publicPath: '/'
	},
	module: {
		loaders: loaders
	},
	postcss: postcss,
	devServer: devServer,
	plugins: plugins,
	devtool: 'source-map'
};
