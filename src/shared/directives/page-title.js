import angular from 'angular';
import app from 'app';

/* @ngInject */
let pageTitle = () => {
	return {
		restrict: 'A',
		link: (scope, element) => {
			let stateChangeHandler = (event, toState) => {
				let title = toState.pageTitle ?
					`Pitched | ${toState.pageTitle}` : `Pitched`;
				angular.element(element).text(title);
			};
			scope.$on('$stateChangeStart', stateChangeHandler);
		}
	};
};

export default angular
	.module(app)
	.directive('pageTitle', pageTitle)
	.name;
