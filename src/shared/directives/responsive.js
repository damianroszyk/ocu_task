import angular from 'angular';
import app from 'app';

/* @ngInject */
let responsive = ($window, domConstant) => {
	return {
		restrict: 'A',
		link: (scope, element) => {

			const RESPONSIVE_CLASSES = Object.keys(domConstant.mediaBreakpoints).join(' ');

			let clearResponsiveClass = () => element.removeClass(RESPONSIVE_CLASSES);

			let appendResponsiveClass = () => {
				clearResponsiveClass();
				for (let className in domConstant.mediaBreakpoints) {
					if ($window.innerWidth > domConstant.mediaBreakpoints[className]) {
						element.addClass(className);
						break;
					}
				}
			};

			angular.element($window).bind('resize', appendResponsiveClass);
			appendResponsiveClass();
		}
	};
};

export default angular
	.module(app)
	.directive('responsive', responsive)
	.name;
