/* @ngInject */
let category = function($stateParams, categoryService) {
	return categoryService.getCategory($stateParams.categoryId);
};

/* @ngInject */
let categories = function(categoryService) {
	let notFeatured = true;
	return categoryService.getCategories(notFeatured);
};

/* @ngInject */
let featuredCategories = function(categoryService) {
	return categoryService.getFeaturedCategories();
};

/* @ngInject */
let flatCategories = function(categoryService) {
	return categoryService.getFlatCategories();
};

export { category, categories, featuredCategories, flatCategories };
