var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');
var NgAnnotatePlugin = require('ng-annotate-webpack-plugin');
var StringReplacePlugin = require('string-replace-webpack-plugin');
var argv = require('yargs').argv;

var copy = require('./copy');
var browsersync = require('./browsersync');

var development = argv.env === 'dev';
var hot = !!argv.hot;

var plugins = [
	new StringReplacePlugin(),
	new CopyWebpackPlugin(copy)
];

if (development && !hot) {
	plugins.push(new BrowserSyncPlugin(browsersync));
}

if (!development) {
	plugins.push(new NgAnnotatePlugin());
	plugins.push(new webpack.optimize.UglifyJsPlugin());
}

module.exports = plugins;
