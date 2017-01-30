import angular from 'angular';
import app from 'app';

/* @ngInject */
let requestInterceptorFactory = (backendConstant) => {
	let request = config => {
		if (config.url.indexOf('api.spotify') < 0 && config.url.indexOf('api.napster') < 0) {
			config.headers.playsite = backendConstant.playsite;
		}
		return config;
	};
	return { request };
};

 /* @ngInject */
let requestInterceptor = ($provide, $httpProvider) => {
	$provide.factory('requestInterceptor', requestInterceptorFactory);
	$httpProvider.interceptors.push('requestInterceptor');
};

export default angular
    .module(app)
    .config(requestInterceptor)
    .name;
