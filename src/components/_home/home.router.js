import angular from 'angular';
import app from 'app';

import { categories } from 'category/category.resolvers';
import { featuredCategories } from 'category/category.resolvers';
import { featuredPlaylists } from 'playlist/playlist.resolvers';

const HOME_ROUTER = {
	homeState: {
		url: '/',
		template: `
			<home
				categories="$resolve.categories"
				featured-categories="$resolve.featuredCategories"
				featured-playlists="$resolve.featuredPlaylists.data">
			</home>`,
		pageTitle: `Home`,
		resolve: { categories, featuredCategories, featuredPlaylists }
	}
};

/* @ngInject */
let homeRouter = $stateProvider => $stateProvider
	.state('home', HOME_ROUTER.homeState);

export default angular
	.module(app)
	.config(homeRouter)
	.name;
