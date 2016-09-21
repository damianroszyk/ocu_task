export default class PlayerTrackListController {
	/* @ngInject */
	constructor() {}
	onTrackTitleClick(params) {
		(this.trackTitleClickCallback || angular.noop)(params);
	}
}
