/* @ngInject */
let category = function($stateParams, categoryService) {
	return categoryService.getCategory($stateParams.categoryId);
};

/* @ngInject */
let categories = function($stateParams, categoryService) {
	return categoryService.getCategories();
};

export { category, categories };
