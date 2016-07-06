var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var NgAnnotatePlugin = require('ng-annotate-webpack-plugin');
var argv = require('yargs').argv;

var production = !!argv.production;

var plugins = [
    new CopyWebpackPlugin([{
        from: 'src/index.html',
        to: 'index.html'
    }, {
        from: 'src/shared/images/',
        to: 'shared/images/'
    }, {
        from: 'src/shared/i18n/',
        to: 'shared/i18n/'
    }])
];

if (production) {
    plugins.push(new NgAnnotatePlugin());
    plugins.push(new webpack.optimize.UglifyJsPlugin());
}

module.exports = plugins;
