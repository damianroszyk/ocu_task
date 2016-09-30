export default class CategoryController {
	/* @ngInject */
	constructor(metatagsService, pageTitleService, domConstant) {
		pageTitleService.title = `${this.category.category.name} - ${domConstant.defaultBrand}`;
		metatagsService
			.clearMetatags()
			.appendMetatags(domConstant.defaultMetatags)
			.appendMetatag(`og:image`, this.category.category.image || domConstant.defaultBrandImage)
			.appendMetatag(`og:title`, `${this.category.category.name} - ${domConstant.defaultBrand}`)
			.appendMetatag(`og:description`, `${this.category.category.name}`);
	}
}
