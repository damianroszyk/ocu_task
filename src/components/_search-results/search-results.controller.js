import _ from 'lodash';

const PLAYLISTS_PROMO_STARTS = 3;
const PLAYLISTS_PROMO_ENDS = 6;

export default class SearchResultsController {
	/* @ngInject */
	constructor($state, playlistService, metatagsService, domConstant) {
		this.$state = $state;
		this.playlistService = playlistService;
		this.order = this.$state.params.order;
		this.sortOptions = [
			{ value: 'updated', name : 'Recently updated'},
			{ value: 'newest', name : 'Newest first'}
		];
		this.chosenSortingOption = _.find(this.sortOptions, {
			value: this.$state.params.order
		});
		metatagsService
			.clearMetatags()
			.appendMetatag(`og:image`, domConstant.defaultBrandImage)
			.appendMetatag(`og:title`, `${$state.params.query} - Search - Digster`)
			.appendMetatag(`og:description`, `Digster search: ${$state.params.query}`)
			.appendMetatag(`description`, `Digster search: ${$state.params.query}`, 'name');
		this._fillPromoSlots();
	}
	setSortingParam(option) {
		let order = option.value;
		let sort = (order === 'newest') ? 'desc' : 'asc';
		this.chosenSortingOption = option;
		this.$state.go('searchResults', { order, sort }, { reload: true });
	}
	_fillPromoSlots() {
		this.promoPlaylists = _.filter(_.sortBy(this.featuredPlaylists, 'featured'),
			p => p.featured >= PLAYLISTS_PROMO_STARTS && p.featured <= PLAYLISTS_PROMO_ENDS
		);
	}
}
