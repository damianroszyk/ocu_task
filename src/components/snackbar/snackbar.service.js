import angular from 'angular';
import app from 'app';

class SnackbarService {
	/* @ngInject */
	constructor() {

	}
	showSuccessMessage(msg){

	}
	showInfoMessage(msg){

	}
	showErrorMessage(msg){

	}
}

export default angular
	.module(app)
	.service('snackbarService', SnackbarService)
	.name;
