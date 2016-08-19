export default class SearchResultsController {
	/* @ngInject */
	constructor($state, playlistService) {
		this.$state = $state;
		this.playlistService = playlistService;
		this.order = this.$state.params.order;
	}
	sortSearchResults() {
		let order = this.order;
		let sort = 'asc';
		this.$state.go('searchResults', { order, sort }, { reload : true });
	}
}
