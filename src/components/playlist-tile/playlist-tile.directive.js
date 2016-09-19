import angular from 'angular';
import app from 'app';

/* @ngInject */
let playlistTile = responsiveService => {
	return {
		restrict: 'A',
		require: '^playlistTiles',
		link: (scope, element, attrs, controller) => {

			const EXPANDED_CLASS = 'playlist-tile--expanded';
			const TEXT_NORMAL_CLASS = 'playlist-tile--text-normal';

			scope.$watch('$viewContentLoaded', () => {
				let playButton = element.find('play-button');
				let figcaptionInitialHeight = element.find('figcaption')[0].clientHeight;
				let descriptionElement = element.find('p')[0];
				let descriptionContainer = element.find('p').parent();
				let descriptionInitialHeight = descriptionContainer[0].clientHeight;
				let descriptionPadding = 20;

				let handleMouseover = () => {
					element.addClass(EXPANDED_CLASS);
					playButton[0].style.height = `${
						element[0].clientHeight -
						(figcaptionInitialHeight + descriptionElement.clientHeight - descriptionPadding)
					}px`;
					if (descriptionElement.clientHeight > 28) {
						descriptionContainer[0].style.height = `${descriptionElement.clientHeight}px`;
						element.addClass(TEXT_NORMAL_CLASS);
					}
				};

				let handleMouseleave = () => {
					element.removeClass(EXPANDED_CLASS);
					playButton[0].style.height = `0px`;
					descriptionContainer[0].style.height = '';
				};

				let registerListener = () => element
					.on('mouseover', handleMouseover)
					.on('mouseleave', handleMouseleave);

				let unregisterListener = () => element
					.off('mouseover')
					.off('mouseleave');

				let listenerHandler = rwdClass =>
					rwdClass !== 'md' && controller.layout !== 'horizontal' ?
						registerListener() : unregisterListener();

				responsiveService.registerObserver(listenerHandler);
				listenerHandler(responsiveService.rwdClass);
			});
		}
	};
};

export default angular
	.module(app)
	.directive('playlistTile', playlistTile)
	.name;
