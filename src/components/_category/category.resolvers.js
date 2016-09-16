/* @ngInject */
let category = ($stateParams, modelHelper, categoryService) =>
	categoryService.getCategory(modelHelper.getCategoryIdentifier($stateParams));

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
