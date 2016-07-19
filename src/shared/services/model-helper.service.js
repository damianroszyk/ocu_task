import angular from 'angular';
import app from 'app';

class ModelHelperService {
	/* @ngInject */
	constructor() {}
	buildUrl(...parts) {
		return parts.join('/');
	}
}

export default angular
	.module(app)
	.service('modelHelper', ModelHelperService)
	.name;
