import angular from 'angular';
import app from 'app';

class DispatcherService {
	/* @ngInject */
	constructor($window, $rootScope) {
		this.$window = $window;
		this.$rootScope = $rootScope;
	}
	dispatch(eventName, payload = {}) {
		this.$rootScope.$broadcast(eventName, payload);
	}
	dispatchNative(eventName, payload = {}, context = null) {
		let dispatchable = Object.keys(payload).length ?
			new CustomEvent(eventName, { detail: payload }) :
			new Event(eventName);
		(context || this.$window).dispatchEvent(dispatchable);
	}
	listen(eventName, callback) {
		this.$rootScope.$on(eventName, (event, payload) =>
			(callback || angular.noop)(event, payload)
		);
	}
	listenNative(eventName, callback, context = null) {
		(context || this.$window).addEventListener(eventName, event =>
			(callback || angular.noop)(event)
		);
	}
}
export default angular
	.module(app)
	.service('dispatcherService', DispatcherService)
	.name;
