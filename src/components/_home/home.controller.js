import _ from 'lodash';

const LOWER_PROMO_STARTS = 3;
const LOWER_PROMO_ENDS = 6;

export default class HomeController {
	/* @ngInject */
	constructor(breadcrumbService, metatagsService, domConstant) {
		breadcrumbService.breadcrumb = [];
		this.domConstant = domConstant;
		this._fillPromoSlots();
		metatagsService
			.clearMetatags()
			.appendMetatag(`og:image`, domConstant.defaultBrandImage)
			.appendMetatag(`og:title`, `Digster homepage`)
			.appendMetatag(`og:description`, `Digster homepage`)
			.appendMetatag(`description`, `Digster homepage`, 'name');
	}
	_fillPromoSlots() {
		this._fillPromoSlot('1');
		this._fillPromoSlot('2');
		this._fillPromoSlot('7');
		this.lowerPromoPlaylists = _.filter(_.sortBy(this.featuredPlaylists, 'featured'),
			p => p.featured >= LOWER_PROMO_STARTS && p.featured <= LOWER_PROMO_ENDS
		);
	}
	_fillPromoSlot(featured) {
		let featuredCategory = _.find(this.featuredCategories, { featured });
		let featuredPlaylist = _.find(this.featuredPlaylists, { featured });
		if (featuredCategory) {
			featuredCategory.type = 'category';
			this[`featuredItem${featured}`] = featuredCategory;
		} else if (featuredPlaylist) {
			let playlistId = featuredPlaylist.deezer ?
				featuredPlaylist.deezer.service_playlist_id : null;
			featuredPlaylist.type = 'playlist';
			featuredPlaylist.stateParams = { playlistId };
			featuredPlaylist.image = featuredPlaylist.image || this.domConstant.defaultCategoryTileImage;
			this[`featuredItem${featured}`] = featuredPlaylist;
		}
	}
}
