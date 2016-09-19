var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var NgAnnotatePlugin = require('ng-annotate-webpack-plugin');
var StringReplacePlugin = require('string-replace-webpack-plugin');
var argv = require('yargs').argv;

var development = argv.env === 'dev';

var plugins = [
	new StringReplacePlugin(),
	new CopyWebpackPlugin([{
		from: 'src/index.html',
		to: 'index.html'
	}, {
		from: 'src/channel-spotify.html',
		to: 'channel-spotify.html'
	}, {
		from: 'src/channel-deezer.html',
		to: 'channel-deezer.html'
	}, {
		from: 'src/shared/images/',
		to: 'shared/images/'
	}, {
		from: 'src/shared/i18n/',
		to: 'shared/i18n/'
	}])
];

if (!development) {
	plugins.push(new NgAnnotatePlugin());
	plugins.push(new webpack.optimize.UglifyJsPlugin());
}

module.exports = plugins;
