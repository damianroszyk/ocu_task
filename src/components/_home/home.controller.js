import _ from 'lodash';

const LOWER_PLAYLISTS_PROMO_STARTS = 3;
const LOWER_PLAYLISTS_PROMO_ENDS = 6;

export default class HomeController {
	/* @ngInject */
	constructor(metatagsService, domConstant) {
		this.domConstant = domConstant;
		this._fillPromoSlots();
		metatagsService
			.clearMetatags()
			.appendMetatags(domConstant.defaultMetatags)
			.appendMetatag(`og:image`, domConstant.defaultBrandImage)
			.appendMetatag(`og:title`, `Digster`)
			.appendMetatag(`og:description`, `Digster homepage`);
	}
	_fillPromoSlots() {
		this._fillPromoSlot('1');
		this._fillPromoSlot('2');
		this._fillPromoSlot('7');
		this._fillPromoSlot('8');
		this.lowerPromoPlaylists = _.filter(_.sortBy(this.featuredPlaylists, 'featured'),
			p => p.featured >= LOWER_PLAYLISTS_PROMO_STARTS && p.featured <= LOWER_PLAYLISTS_PROMO_ENDS
		);
	}
	_fillPromoSlot(featured) {
		let featuredCategory = _.find(this.featuredCategories, {
			featured
		});
		let featuredPlaylist = _.find(this.featuredPlaylists, {
			featured
		});
		if (featuredCategory) {
			featuredCategory.type = 'category';
			this._setPromoSlotItemImage(featuredCategory, featured);
			this[`featuredItem${featured}`] = featuredCategory;
		} else if (featuredPlaylist) {
			let playlistId = featuredPlaylist.id;
			featuredPlaylist.type = 'playlist';
			featuredPlaylist.stateParams = {
				slug: featuredPlaylist.slug
			};
			featuredPlaylist.image = featuredPlaylist.image || this.domConstant.defaultCategoryTileImage;
			this._setPromoSlotItemImage(featuredPlaylist, featured);
			this[`featuredItem${featured}`] = featuredPlaylist;
		}
	}
	_setPromoSlotItemImage(item, featured) {
		switch (featured) {
		case '1':
			item.image = item.rectangleImage;
			break;
		case '2':
			item.image = item.skyscraperImage;
			break;
		case '7':
			item.image = item.rectangleImage;
			break;
		case '8':
			item.image = item.rectangleImage;
			break;
		default:
			item.image = item.coverImage;
			break;
		}
		// fallback
		item.image = item.image || item.coverImage || this.domConstant.defaultCategoryTileImage;
	}
}
