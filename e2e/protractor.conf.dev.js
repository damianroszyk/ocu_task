exports.config = {

	allScriptsTimeout: 11000,

	specs: ['index.js'],

	capabilities: {
		'browserName': 'chrome'
	},

	directConnect: true,

	baseUrl: 'http://localhost:8079/',

	framework: 'jasmine',

	jasmineNodeOpts: {
		defaultTimeoutInterval: 30000
	}
};
