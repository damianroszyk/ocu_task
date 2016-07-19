import angular from 'angular';
import app from 'app';

const DOM_CONSTANT = {
	mediaBreakpoints: {
		xl: 1200,
		lg: 992,
		md: 762,
		sm: 480,
		xs: 0
	}
};

export default angular
	.module(app)
	.constant('domConstant', DOM_CONSTANT)
	.name;
