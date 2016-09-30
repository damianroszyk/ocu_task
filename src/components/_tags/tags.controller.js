export default class TagsController {
	/* @ngInject */
	constructor(metatagsService, domConstant) {
		metatagsService
			.clearMetatags()
			.appendMetatags(domConstant.defaultMetatags)
			.appendMetatag(`og:image`, domConstant.defaultBrandImage)
			.appendMetatag(`og:title`, `Digster tags`)
			.appendMetatag(`og:description`, `Digster tags`);
	}
}
