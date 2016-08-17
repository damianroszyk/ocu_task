import angular from 'angular';
import app from 'app';

import { category } from 'category/category.resolvers';
import { categoryPlaylists } from 'playlist/playlist.resolvers';

let squash = true;

const CATEGORY_ROUTER = {
	categoryState: {
		url: '^/category/:categoryId/:l1/:l2/:l3/:l4',
		template: `
			<category
				category="$resolve.category"
				categoryPlaylists="$resolve.categoryPlaylists">
			</category>`,
		params: {
			l2: { squash },
			l3: { squash },
			l4: { squash }
		},
		pageTitle: `Category`,
		resolve: { category, categoryPlaylists }
	}
};

/* @ngInject */
let categoryRouter = $stateProvider => $stateProvider
	.state('category', CATEGORY_ROUTER.categoryState);

export default angular
	.module(app)
	.config(categoryRouter)
	.name;
