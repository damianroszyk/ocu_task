var stringReplacePlugin = require('string-replace-webpack-plugin');
var argv = require('yargs').argv;

var environment = argv.env || 'qa';
var variables = loadVariables(environment);

var replacer = stringReplacePlugin.replace({
	replacements: [{
		pattern: /'<% (\w*?) %>'/ig,
		replacement: function (match, variable) {
			return variables[variable];
		}
	}]
});

function loadVariables(environment) {
	var variables;
	try {
		variables = require('./../variables/env-' + environment + '.json');
	} catch(e) {
		throw 'Unable to load environment variables for: ' + environment;
	}
	return variables;
}

module.exports = replacer;
