import _ from 'lodash';

export default class SearchResultsController {
	/* @ngInject */
	constructor($state, playlistService, metatagsService, domConstant) {
		this.$state = $state;
		this.playlistService = playlistService;
		this.order = this.$state.params.order;
		this.sortOptions = [
			{ value: 'updated', name : 'Recently updated'},
			{ value: 'newest', name : 'Newest first'},
			{ value: 'length', name : 'Length of time'}
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
	}
	setSortingParam(option) {
		let order = option.value;
		let sort = (order === 'newest') ? 'desc' : 'asc';
		this.chosenSortingOption = option;
		this.$state.go('searchResults', { order, sort }, { reload: true });
	}
}
