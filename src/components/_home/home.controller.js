import _ from 'lodash';

export default class HomeController {
	/* @ngInject */
	constructor(breadcrumbService, metatagsService) {
		breadcrumbService.breadcrumb = [];
		this.fillPromoSlots(this.featuredCategories);
		metatagsService
			.clearMetatags()
			.appendMetatag(`og:title`, `Homepage`)
			.appendMetatag(`og:type`, `website`);
	}
	fillPromoSlots(featuredCategories) {
		let featuredCategory1 = _.find(featuredCategories, { featured: '1' });
		let featuredCategory2 = _.find(featuredCategories, { featured: '2' });
		if (featuredCategory1) {
			featuredCategory1.type = 'category';
			this.featuredItem1 = featuredCategory1;
		}
		if (featuredCategory2) {
			featuredCategory2.type = 'category';
			this.featuredItem2 = featuredCategory2;
		}
	}
}
