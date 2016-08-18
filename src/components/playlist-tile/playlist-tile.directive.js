import angular from 'angular';
import app from 'app';

/* @ngInject */
let playlistTile = () => {
	return {
		restrict: 'A',
		link: (scope, element) => {

			const EXPANDED_CLASS = 'playlist-tile--expanded';

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
					descriptionContainer[0].style.height = `${descriptionElement.clientHeight}px`;
				};

				let handleMouseleave = () => {
					element.removeClass(EXPANDED_CLASS);
					playButton[0].style.height = `0px`;
					descriptionContainer[0].style.height = `${descriptionInitialHeight}px`;
				};

				element.on('mouseover', handleMouseover);
				element.on('mouseleave', handleMouseleave);
			});
		}
	};
};

export default angular
	.module(app)
	.directive('playlistTile', playlistTile)
	.name;
