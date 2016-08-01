var path = require('path');

module.exports = {
	alias: {
		app: path.resolve(__dirname, '../src/app'),
		abstract: path.resolve(__dirname, '../src/shared/abstract'),
		category: path.resolve(__dirname, '../src/components/_category'),
		playlist: path.resolve(__dirname, '../src/components/_playlist')
	}
};
