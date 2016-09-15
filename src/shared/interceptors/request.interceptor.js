import angular from 'angular';
import app from 'app';

/* @ngInject */
let requestInterceptorFactory = (backendConstant) => {
	let request = config => {
		if (config.url.indexOf('spotify') < 0) {
			config.headers.brand = backendConstant.clientBrand;
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
