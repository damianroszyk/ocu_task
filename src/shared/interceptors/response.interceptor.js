import angular from 'angular';
import app from 'app';

/* @ngInject */
let responseInterceptorFactory = ($q, $injector) => {
	let errorHandlers = {
		404: () => $injector.get('$state').go('home')
	};
	let responseError = rejection => {
		if (rejection.data && rejection.data.httpCode) {
			(errorHandlers[rejection.data.httpCode] || angular.noop)(rejection);
		}
		return $q.reject(rejection);
	};
	return { responseError };
};

 /* @ngInject */
let responseInterceptor = ($provide, $httpProvider) => {
	$provide.factory('responseInterceptor', responseInterceptorFactory);
	$httpProvider.interceptors.push('responseInterceptor');
};

export default angular
    .module(app)
    .config(responseInterceptor)
    .name;
