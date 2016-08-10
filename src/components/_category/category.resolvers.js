/* @ngInject */
let category = function($stateParams, categoryService) {
	return categoryService.getCategory($stateParams.categoryId);
};

/* @ngInject */
let categories = function(categoryService) {
	return categoryService.getCategories();
};

/* @ngInject */
let flatCategories = function(categoryService) {
	return categoryService.getFlatCategories();
};

export { category, categories, flatCategories };
