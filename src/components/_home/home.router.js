import angular from 'angular';
import app from 'app';

const HOME_ROUTER = {
	homeState: {
		url: '/',
		template: `<home categories="$resolve.categories"></home>`,
		pageTitle: `Home`,
		resolve: { categories }
	}
};

/* @ngInject */
function categories(categoryService) {
	return categoryService.getCategories();
};

/* @ngInject */
let homeRouter = $stateProvider => $stateProvider
	.state('home', HOME_ROUTER.homeState);

export default angular
	.module(app)
	.config(homeRouter)
	.name;
