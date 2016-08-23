export default class TrackListController {
	/* @ngInject */
	constructor() {
	}

	onTrackTitleClick(event){
		if(!!this.trackTitleClickCallback){
			this.trackTitleClickCallback({event: event});
		}
	}
}
