

export default class MessagePopupController {
	/* @ngInject */
	constructor(messagePopupService) {
		this.message = {};
		this.isShown = false;
		this.messagePopupService = messagePopupService;
		messagePopupService.registerObserver(this.showPopup.bind(this));
	}
	showPopup(){
		this.message = this.messagePopupService.message;
		this.isShown = true;
	}
	closePopup(){
		this.isShown = false;
		this.message = {};
	}
}
