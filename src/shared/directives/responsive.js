import angular from 'angular';
import _ from 'lodash';
import app from 'app';

/* @ngInject */
let responsive = ($window, domConstant, responsiveService) => {
	return {
		restrict: 'A',
		link: (scope, element) => {

			const RESPONSIVE_CLASSES = Object.keys(domConstant.mediaBreakpoints).join(' ');
			const THROTTLER_THRESHOLD = 0;

			let clearResponsiveClass = () => element.removeClass(RESPONSIVE_CLASSES);

			let appendResponsiveClass = () => {
				clearResponsiveClass();
				for (let className in domConstant.mediaBreakpoints) {
					if ($window.innerWidth > domConstant.mediaBreakpoints[className]) {
						element.addClass(className);
						responsiveService.rwdClass = className;
						break;
					}
				}
			};

			let throttler = () => _.throttle(appendResponsiveClass, THROTTLER_THRESHOLD);

			angular.element($window).bind('resize', throttler());
			appendResponsiveClass();
		}
	};
};

export default angular
	.module(app)
	.directive('responsive', responsive)
	.name;
