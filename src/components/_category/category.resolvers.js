export class CategoryResolver {
	/* @ngInject */
	static constructor($stateParams, categoryService) {
		return categoryService.getCategory($stateParams.categoryId);
	}
}

export class CategoriesResolver {
	/* @ngInject */
	static constructor($stateParams, categoryService) {
		return categoryService.getCategories();
	}
}
