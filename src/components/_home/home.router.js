import angular from 'angular';
import app from 'app';

import { CategoriesResolver } from 'category/category.resolvers';
import { PlaylistsResolver } from 'playlist/playlist.resolvers';

const HOME_ROUTER = {
	homeState: {
		url: '/',
		template: `
			<home
				categories="$resolve.categories"
				playlists="$resolve.playlists">
			</home>`,
		pageTitle: `Home`,
		resolve: {
			categories: CategoriesResolver.constructor,
			playlists: PlaylistsResolver.constructor
		}
	}
};

/* @ngInject */
let homeRouter = $stateProvider => $stateProvider
	.state('home', HOME_ROUTER.homeState);

export default angular
	.module(app)
	.config(homeRouter)
	.name;
