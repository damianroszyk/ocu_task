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
	defaultHeaderBackgroundImage: '/shared/images/images/taylor_swift_header.jpg',
	defaultBrandImage: 'http://digster.fm/wp-content/themes/digster/images/logo-header.png',
	defaultCategoryTileImage: 'https://spotifyapps.blob.core.windows.net/sinfini-imagefiles/MainMenu_Instrument_MainImage_270x270'
};

export default angular
	.module(app)
	.constant('domConstant', DOM_CONSTANT)
	.name;
