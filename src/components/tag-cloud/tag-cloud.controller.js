export default class TagCloudController {
	/* @ngInject */
	constructor() {
		angular.forEach(this.tags, tag => {
			// @TODO: use weight returned from backend when implemented
			tag.weight = Math.floor(Math.random() * 100);
		});
	}
}
