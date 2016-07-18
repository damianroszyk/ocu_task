import app from 'app';

 /*@ngInject*/
let requestInterceptor = ($provide, $httpProvider) => {

	/*@ngInject*/
	let interceptorFactory = backendConstant => {

		let request = config => {
			config.headers.brand = backendConstant.clientBrand;
			return config;
		};

		return { request };
	};

	$provide.factory('requestInterceptor', interceptorFactory);
	$httpProvider.interceptors.push('requestInterceptor');
};

export default angular
    .module(app)
    .config(requestInterceptor)
    .name;
