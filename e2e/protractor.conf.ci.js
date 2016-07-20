var phantomjs = require('phantomjs');
var httpServer = require('http-server');
var httpServerInstance;

exports.config = {

	allScriptsTimeout: 11000,

	specs: ['index.js'],

	capabilities: {
		'browserName': 'phantomjs',
		'phantomjs.binary.path': phantomjs.path
	},

	seleniumServerJar: '../node_modules/protractor/selenium/selenium-server-standalone-2.52.0.jar',

	baseUrl: 'http://localhost:8666',

	onPrepare: function() {
		httpServerInstance = httpServer.createServer({
			root: 'dist/'
		});
		httpServerInstance.listen(8666);
	},

	framework: 'jasmine',

	jasmineNodeOpts: {
		defaultTimeoutInterval: 30000
	}
};
