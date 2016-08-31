import angular from 'angular';
import app from 'app';

const DOM_CONSTANT = {
	mediaBreakpoints: {
		xl: 1170,
		lg: 992,
		md: 762,
		sm: 480,
		xs: 0
	},
	defaultHeaderBackgroundImage: 'http://digster.fm/files/2015/09/1920x450-lores.jpg',
	defaultBrandImage: 'http://digster.fm/wp-content/themes/digster/images/logo-header.png',
	defaultCategoryTileImage: 'shared/images/default_artist_cover.png'
};

export default angular
	.module(app)
	.constant('domConstant', DOM_CONSTANT)
	.name;
