export default class CategoryController {
	/* @ngInject */
	constructor(breadcrumbService) {
		breadcrumbService.buildCategoryBreadcrumb(this.category);
	}
}
