import angular from 'angular';
import app from 'app';

import { flatCategories } from 'category/category.resolvers';

const TAGS_ROUTER = {
	tagsState: {
		url: '^/tags',
		template: `
			<tags
				tags="$resolve.flatCategories">
			</tags>`,
		resolve: { flatCategories }
	}
};

/* @ngInject */
let tagsRouter = $stateProvider => $stateProvider
	.state('tags', TAGS_ROUTER.tagsState);

export default angular
	.module(app)
	.config(tagsRouter)
	.name;
