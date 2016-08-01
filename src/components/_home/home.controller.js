export default class HomeController {
	/* @ngInject */
	constructor(breadcrumbService, metatagsService) {
		breadcrumbService.breadcrumb = [];
		metatagsService
			.clearMetatags()
			.appendMetatag(`og:title`, `Homepage`)
			.appendMetatag(`og:type`, `website`);
	}
}
