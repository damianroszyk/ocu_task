

export default class MessagePopupController {
	/* @ngInject */
	constructor(messagePopupService) {
		this.message = {};
		this.messagePopupService = messagePopupService;
		messagePopupService.registerObserver(this.showPopup.bind(this));
	}
	showPopup(){
		this.message = this.messagePopupService.message;
	}
	closePopup(){
		this.message = {};
	}
}
