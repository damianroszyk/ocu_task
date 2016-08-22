import _ from 'lodash';

export default class SearchResultsController {
	/* @ngInject */
	constructor($state, playlistService) {
		this.$state = $state;
		this.playlistService = playlistService;
		this.order = this.$state.params.order;
		this.sortOptions = [
			{ value: 'updated', name : 'Recently updated'},
			{ value: 'newest', name : 'Newest first'},
			{ value: 'length', name : 'Length of time'}
		];
		this.chosenSortingOption = _.find(this.sortOptions, { value : this.$state.params.order});
	}
	setSortingParam(option) {
		let order = option.value;
		let sort = 'asc';
		this.chosenSortingOption = option;
		this.$state.go('searchResults', { order, sort }, { reload : true });
	}
}
