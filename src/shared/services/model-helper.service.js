import angular from 'angular';
import _ from 'lodash';
import app from 'app';

class ModelHelperService {
	/* @ngInject */
	constructor() {}
	buildUrl(...parts) {
		return parts.join('/');
	}
	getCategoryIdentifier(stateParams) {
		let params = _.values(stateParams);
		for (let index = params.length - 1; index >= 0; index--) {
			if (params[index]) {
				return params[index];
			}
		}
	}
}

export default angular
	.module(app)
	.service('modelHelper', ModelHelperService)
	.name;
