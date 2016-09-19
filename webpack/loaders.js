var replace = require('./replace');

module.exports = [{
	test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
	loader: 'file-loader'
}, {
	test: /\.(png|jpg)$/,
	loader: 'file'
}, {
	test: /\.css$/,
	loaders: ['style', 'css', 'postcss-loader']
}, {
	test: /\.scss$/,
	loaders: ['style', 'css', 'sass', 'postcss-loader']
}, {
	test: /\.js$/,
	exclude: /(node_modules)/,
	loader: 'babel',
	query: {
		presets: ['es2015']
	}
}, {
	test: /.constant.js$/,
	exclude: /(node_modules)/,
	loader: replace
}];
