import angular from 'angular';
import app from 'app';

import _ from 'lodash';

const STICKY_CLASS = 'sticky';

/* @ngInject */
let sticky = ($window, domConstant, responsiveService) => {
	return {
		restrict: 'A',
		scope: {
			enabled: '=sticky',
			threshold: '=stickyThreshold',
		},
		link: (scope, element) => {

			let _stick = () => element.addClass(STICKY_CLASS).css({
				'top': `0px`
			});

			let _unstick = (threshold) => element.removeClass(STICKY_CLASS).css({
				'top': `${threshold}px`
			});

			let _getCurrentThreshold = () => _.isObject(scope.threshold) ?
				(scope.threshold)[responsiveService.rwdClass] : scope.threshold;

			let _getCurrentOffset = () => $window.document.body.scrollTop;

			let _handleWindowScroll = () => {
				let threshold = _getCurrentThreshold();
				let offset = _getCurrentOffset();
				return offset > threshold ? _stick() : _unstick(threshold);
			};

			let _bindScrollEvent = () => {
				_handleWindowScroll();
				angular.element($window).bind('scroll', _handleWindowScroll.bind(this));
			};

			let _unbindScrollEvent = () => angular.element($window)
				.unbind('scroll', _handleWindowScroll.bind(this));

			scope.$watch('enabled', listen =>
				listen ? _bindScrollEvent() : _unbindScrollEvent()
			);
		}
	};
};

export default angular
	.module(app)
	.directive('sticky', sticky)
	.name;
