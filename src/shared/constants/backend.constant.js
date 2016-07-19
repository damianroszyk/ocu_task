import angular from 'angular';
import app from 'app';

const BACKEND_CONSTANT = {
	apiVersion: 'v1',
	clientBrand: 1
};

export default angular
	.module(app)
	.constant('backendConstant', BACKEND_CONSTANT)
	.name;
