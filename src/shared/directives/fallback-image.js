import angular from 'angular';
import app from 'app';

/* @ngInject */
let fallbackImage = () => {
	return {
		restrict: 'A',
		scope: {
			fallbackImage: '<?'
		},
		link: (scope, element, attrs) => {

			let _handleImageError = () => {
				if (scope.fallbackImage) {
					element.attr('src', scope.fallbackImage);
				} else {
					element.remove();
				}
				scope.$apply();
			};

			element[0].addEventListener('error', _handleImageError);
		}
	};
};

export default angular
	.module(app)
	.directive('fallbackImage', fallbackImage)
	.name;
