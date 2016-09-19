
export default class PlaylistController {
	/* @ngInject */
	constructor() {
		this.currentMessage = {
			text: '',
			type: null
		};
		this.isShown = true;
		this.messagesQueue = [];
	}
}
