export default class TagsController {
	/* @ngInject */
	constructor(metatagsService, pageTitleService, domConstant) {
		pageTitleService.title = `${domConstant.defaultBrand} - Tags`;
		metatagsService
			.clearMetatags()
			.appendMetatags(domConstant.defaultMetatags)
			.appendMetatag(`og:image`, domConstant.defaultBrandImage)
			.appendMetatag(`og:title`, `${domConstant.defaultBrand} - Tags`)
			.appendMetatag(`og:description`, `${domConstant.defaultBrand} - Tags`);
	}
}
