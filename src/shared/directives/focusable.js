import angular from 'angular';
import app from 'app';

/* @ngInject */
let focusable = ($timeout) => {
	return {
		restrict: 'A',
		link: (scope, element) => {
			console.log('element', element);
			$timeout(() => element[0].focus());
		}
	};
};

export default angular
	.module(app)
	.directive('focusable', focusable)
	.name;
