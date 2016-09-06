import angular from 'angular';
import app from 'app';

class DispatcherService {
	/* @ngInject */
	constructor($rootScope) {
		this.$rootScope = $rootScope;
	}
	dispatch(eventName, payload = {}) {
		this.$rootScope.$broadcast(eventName, payload);
	}
	listen(eventName, callback) {
		this.$rootScope.$on(eventName, (event, payload) => {
			(callback || angular.noop)(event, payload);
		});
	}
}
export default angular
	.module(app)
	.service('dispatcherService', DispatcherService)
	.name;
