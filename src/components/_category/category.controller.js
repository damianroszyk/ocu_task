export default class CategoryController {
	/* @ngInject */
	constructor(breadcrumbService, metatagsService, domConstant) {
		breadcrumbService.buildCategoryBreadcrumb(this.category);
		metatagsService
			.clearMetatags()
			.appendMetatag(`og:image`, this.category.category.image || domConstant.defaultBrandImage)
			.appendMetatag(`og:title`, `${this.category.category.name} - Digster`)
			.appendMetatag(`og:description`, `${this.category.category.name}`)
			.appendMetatag(`description`, `${this.category.category.name}`, 'name');
	}
}
