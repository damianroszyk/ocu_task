import angular from 'angular';
import app from 'app';

const DOM_CONSTANT = {
	mediaBreakpoints: {
		xl: 1220,
		md: 767,
		sm: 480,
		xs: 0
	},
	defaultMetatags: [{
		identifier: 'name',
		key: 'description',
		content: `Search for Digster.fm playlists on Spotify, Apple Music and Deezer.`
	}],
	defaultHeaderBackgroundImage: '/shared/images/images/digster_lady_gaga_desktop.jpg',
	defaultHeaderBackgroundImageMobile: '/shared/images/images/digster_lady_gaga_mobile.jpg',
	defaultSearchTileImage: '/shared/images/images/search-tile_image.jpg',
	defaultBrandImage: `${window.location.origin}/shared/images/images/digster_logo_black.png`,
	footerBrandImage: `${window.location.origin}/shared/images/images/digster_logo.png`,
	defaultCategoryTileImage: 'shared/images/default_artist_cover.png'
};

export default angular
	.module(app)
	.constant('domConstant', DOM_CONSTANT)
	.name;
