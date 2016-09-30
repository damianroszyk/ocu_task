import angular from 'angular';
import app from 'app';

/* @ngInject */
let pageTitle = (pageTitleService) => {
	return {
		restrict: 'A',
		link: (scope, element) => {
			let pageTitleHandler = (pageTitle) => {
				angular.element(element).text(pageTitle);
			};
			pageTitleService.registerObserver(pageTitleHandler);
		}
	};
};

export default angular
	.module(app)
	.directive('pageTitle', pageTitle)
	.name;
