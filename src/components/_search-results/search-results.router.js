import angular from 'angular';
import app from 'app';

import { search } from 'playlist/playlist.resolvers';

const SEARCH_RESULTS_ROUTER = {
	searchResultsState: {
		url: '^/search-results/:query',
		template: `
			<search-results
				results="$resolve.search">
			</search-results>`,
		pageTitle: `Search Results`,
		resolve: { search }
	}
};

/* @ngInject */
let searchResultsRouter = $stateProvider => $stateProvider
	.state('searchResults', SEARCH_RESULTS_ROUTER.searchResultsState);

export default angular
	.module(app)
	.config(searchResultsRouter)
	.name;
