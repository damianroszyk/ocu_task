export default class PlayerTrackListController {
	/* @ngInject */
	constructor() {
	}

	onTrackTitleClick(event){
		if(!!this.trackTitleClickCallback){
			this.trackTitleClickCallback({event: event});
		}
	}
}
