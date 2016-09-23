import angular from 'angular';
import app from 'app';

/* @ngInject */
let isLoaded = $parse => {
	return {
		restrict: 'A',
		link: (scope, element, attrs) => {
			let callback = $parse(attrs['isLoaded']);
			element.on('load', $event => scope.$apply(() =>
				(callback || angular.noop)(scope, { $event })
			));
		}
	};
};

export default angular
	.module(app)
	.directive('isLoaded', isLoaded)
	.name;
