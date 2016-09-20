export default class PlayerTrackListController {
	/* @ngInject */
	constructor() {}
	onTrackTitleClick(event, index) {
		(this.trackTitleClickCallback || angular.noop)(event, index);
	}
}
