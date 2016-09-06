export default class CategoryController {
	/* @ngInject */
	constructor(breadcrumbService, metatagsService, domConstant) {
		breadcrumbService.buildCategoryBreadcrumb(this.category);
		metatagsService
			.clearMetatags()
			.appendMetatag(`og:image`, domConstant.defaultBrandImage)
			.appendMetatag(`og:title`, `Digster category: ${this.category.category.name}`)
			.appendMetatag(`og:description`, `Digster category: ${this.category.category.name}`)
			.appendMetatag(`description`, `Digster category: ${this.category.category.name}`, 'name');
	}
}
