export default class BreadcrumbController {
	/* @ngInject */
	constructor(breadcrumbService) {
		breadcrumbService.registerObserver(this.renderBreadcrumb.bind(this));
	}
	renderBreadcrumb(breadcrumb) {
		this.breadcrumb = breadcrumb;
	}
}
