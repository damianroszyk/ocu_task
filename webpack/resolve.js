var path = require('path');

module.exports = {
	alias: {
		app: path.resolve(__dirname, '../src/app'),
		abstract: path.resolve(__dirname, '../src/shared/abstract')
	}
};
