import angular from 'angular';
import app from 'app';

let squash = true;

const CATEGORY_ROUTER = {
	categoryState: {
		url: '^/:categoryId/:l1/:l2/:l3/:l4',
		template: `<category category="$resolve.category"></category>`,
		params: {
			l2: { squash },
			l3: { squash },
			l4: { squash }
		},
		pageTitle: `Category`,
		resolve: { category }
	}
};

/* @ngInject */
function category($stateParams, categoryService, modelHelper) {
	return categoryService.getCategory($stateParams.categoryId);
};

/* @ngInject */
let categoryRouter = $stateProvider => $stateProvider
	.state('category', CATEGORY_ROUTER.categoryState);

export default angular
	.module(app)
	.config(categoryRouter)
	.name;
