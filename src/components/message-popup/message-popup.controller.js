

export default class MessagePopupController {
	/* @ngInject */
	constructor($scope, messagePopupService) {
		this.message = {};
		this.$scope = $scope;
		this.messagePopupService = messagePopupService;
		messagePopupService.registerObserver(this.showPopup.bind(this));
	}
	showPopup(){
		this.message = this.messagePopupService.message;
		this.$scope.apply();
	}
	closePopup(){
		this.message = {};
		this.$scope.apply();
	}
}
