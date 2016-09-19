var stringReplacePlugin = require('string-replace-webpack-plugin');
var superconf = require('superconf');
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
	var variables = superconf('variables/env-' + environment);
	if (!variables) {
		throw 'Unable to load environment variables for: ' + environment;
	}
	return variables;
}

module.exports = replacer;
