import angular from 'angular';
import app from 'app';

const SNACKBAR_CONSTANT = {
	maxShownMessages: 5,
	messageHidingInterval: 2000, //ms, defines the interval between following messages hiding
	messageFadingTime: 500 //ms, should be equal to the transition value in the snackbar.css
};

export default angular
	.module(app)
	.constant('snackbarConstant', SNACKBAR_CONSTANT)
	.name;
