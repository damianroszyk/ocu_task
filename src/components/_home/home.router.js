import angular from 'angular';
import app from 'app';

import { categories } from 'category/category.resolvers';
import { categoryPlaylists } from 'playlist/playlist.resolvers';

const HOME_ROUTER = {
	homeState: {
		url: '/',
		template: `
			<home
				categories="$resolve.categories"
				categoryPlaylists="$resolve.categoryPlaylists">
			</home>`,
		pageTitle: `Home`,
		resolve: { categories, categoryPlaylists }
	}
};

/* @ngInject */
let homeRouter = $stateProvider => $stateProvider
	.state('home', HOME_ROUTER.homeState);

export default angular
	.module(app)
	.config(homeRouter)
	.name;
