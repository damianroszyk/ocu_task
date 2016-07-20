import angular from 'angular';
import app from 'app';

const DOM_CONSTANT = {
	mediaBreakpoints: {
		xl: 1200,
		lg: 992,
		md: 762,
		sm: 480,
		xs: 0
	},
	defaultHeaderBackgroundImage: 'http://placehold.it/1920x400/f2f2f2',
	defaultHeaderBrandImage: 'http://placehold.it/300x300'
};

export default angular
	.module(app)
	.constant('domConstant', DOM_CONSTANT)
	.name;
