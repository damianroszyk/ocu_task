import angular from 'angular';
import app from 'app';

const DOM_CONSTANT = {
	mediaBreakpoints: {
		xl: 1170,
		md: 767,
		sm: 480,
		xs: 0
	},
	defaultHeaderBackgroundImage: '/shared/images/images/lorde_header.jpg',
	defaultSearchTileImage: '/shared/images/images/search-tile_image.jpg',
	defaultBrandImage: '/shared/images/images/digster_logo.png',
	defaultCategoryTileImage: 'shared/images/default_artist_cover.png'
};

export default angular
	.module(app)
	.constant('domConstant', DOM_CONSTANT)
	.name;
