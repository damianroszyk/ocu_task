import angular from 'angular';
import app from 'app';

const DOM_CONSTANT = {
	mediaBreakpoints: {
		xl: 1220,
		md: 767,
		sm: 480,
		xs: 0
	},
	defaultHeaderBackgroundImage: '/shared/images/images/digster_lady_gaga_desktop.jpg',
	defaultSearchTileImage: '/shared/images/images/search-tile_image.jpg',
	defaultBrandImage: '/shared/images/images/digster_logo_black.png',
	defaultCategoryTileImage: 'shared/images/default_artist_cover.png'
};

export default angular
	.module(app)
	.constant('domConstant', DOM_CONSTANT)
	.name;
