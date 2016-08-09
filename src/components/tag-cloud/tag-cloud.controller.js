export default class TagCloudController {
	/* @ngInject */
	constructor() {
		angular.forEach(this.tags, tag => {
			tag.weight = Math.floor(Math.random() * 100);
		});
	}
}
