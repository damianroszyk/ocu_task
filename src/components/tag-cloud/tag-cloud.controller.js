export default class TagCloudController {
	/* @ngInject */
	constructor($timeout) {
		this.tagsAnimated = []
		angular.forEach(this.tags, tag => {
			tag.weight = Math.floor(Math.random() * 100);
		});
		$timeout(() => {
			this.tagsAnimated = this.tags;
		}, 1000)

	}
}
