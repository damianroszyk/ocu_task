import angular from 'angular';
import app from 'app';

/* @ngInject */
let clickOutside = (domHelper) => {
	return {
		restrict: 'A',
		scope: {
			clickOutside: '&'
		},
		link: (scope, element) => {
			domHelper.handleOutsideClick(element[0], () => scope.clickOutside());
		}
	};
};

export default angular
	.module(app)
	.directive('clickOutside', clickOutside)
	.name;
