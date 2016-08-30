export default class PlayerTrackListController {
	/* @ngInject */
	constructor() {
	}

	onTrackTitleClick(event){
		(this.trackTitleClickCallback || angular.noop)({ event });
	}
}
