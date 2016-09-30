export default class CategoryController {
	/* @ngInject */
	constructor(metatagsService, domConstant) {
		metatagsService
			.clearMetatags()
			.appendMetatags(domConstant.defaultMetatags)
			.appendMetatag(`og:image`, this.category.category.image || domConstant.defaultBrandImage)
			.appendMetatag(`og:title`, `${this.category.category.name} - Digster`)
			.appendMetatag(`og:description`, `${this.category.category.name}`);
	}
}
