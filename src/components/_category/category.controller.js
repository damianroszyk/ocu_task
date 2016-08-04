export default class CategoryController {
	/* @ngInject */
	constructor(breadcrumbService, metatagsService) {
		breadcrumbService.buildCategoryBreadcrumb(this.category);
		metatagsService
			.clearMetatags()
			.appendMetatag(`og:title`, this.category.category.name)
			.appendMetatag(`og:type`, `website`);
	}
}
