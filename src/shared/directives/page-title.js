import angular from 'angular';
import app from 'app';

/* @ngInject */
let pageTitle = () => {
	return {
		restrict: 'A',
		link: (scope, element) => {
			let stateChangeHandler = (event, toState, $state) => {
				let title = toState.pageTitle ?
					`Digster | ${toState.pageTitle}` : `Digster`;

				if (toState.name === 'searchResults') {
					title = `${$state.query} - Search - Digster`;
				}

				angular.element(element).text(title);
			};
			scope.$on('$stateChangeSuccess', stateChangeHandler);
		}
	};
};

export default angular
	.module(app)
	.directive('pageTitle', pageTitle)
	.name;
