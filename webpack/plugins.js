var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var argv = require('yargs').argv;

var production = !!argv.production;

var plugins = [
	new CopyWebpackPlugin([{
		from: 'src/index.html',
		to: 'index.html'
	}, {
		from: 'src/shared/images/',
		to: 'shared/images/'
	}])
];

if (production) {
	// plugins.push(new webpack.optimize.UglifyJsPlugin());
}

module.exports = plugins;
