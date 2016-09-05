/* @ngInject */
let category = ($stateParams, categoryService) =>
	categoryService.getCategory($stateParams.categoryId);

/* @ngInject */
let categories = (categoryService) =>
	categoryService.getCategories(true);

/* @ngInject */
let featuredCategories = (categoryService) =>
	categoryService.getFeaturedCategories();

/* @ngInject */
let flatCategories = (categoryService) =>
	categoryService.getFlatCategories();

export {
	category,
	categories,
	featuredCategories,
	flatCategories
};
