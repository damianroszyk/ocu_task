import angular from 'angular';
import app from 'app';

/* @ngInject */
let metatags = metatagsService => {
	return {
		restrict: 'A',
		link: (scope, element) => {

			let produceMetatag = tag => angular.element(`
				<meta
					${tag.identifier}="${tag.key}"
					content="${tag.content}">`);

			let clearMetatags = () => element.next('meta').remove();

			let metatagsAppender = metatags => {
				clearMetatags();
				angular.forEach(metatags, metatag =>
					element.after(produceMetatag(metatag))
				);
			};

			metatagsService.registerObserver(metatagsAppender);
		}
	};
};

export default angular
	.module(app)
	.directive('metatags', metatags)
	.name;
