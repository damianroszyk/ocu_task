export default class TagsController {
	/* @ngInject */
	constructor(metatagsService, domConstant) {
		metatagsService
			.clearMetatags()
			.appendMetatag(`og:image`, domConstant.defaultBrandImage)
			.appendMetatag(`og:title`, `Digster tags`)
			.appendMetatag(`og:description`, `Digster tags`)
			.appendMetatag(`description`, `Digster tags`, 'name');
	}
}
