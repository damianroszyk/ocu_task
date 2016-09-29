import angular from 'angular';
import _ from 'lodash';
import app from 'app';

/* @ngInject */
let hasAnchors = ($window, $timeout) => {
	return {
		restrict: 'A',
		link: (scope, element) => {
			let handleAnchorClick = (event) => {
				$window.location.href = angular.element(event.target).attr('href');
			};

			let registerAnchorListeners = () => {
				element.find('a').on('click', handleAnchorClick);
			};

			$timeout(registerAnchorListeners);
		}
	};
};

export default angular
	.module(app)
	.directive('hasAnchors', hasAnchors)
	.name;
