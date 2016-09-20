
export default class PlaylistController {
	/* @ngInject */
	constructor($scope, snackbarService) {
		this.maxShownMessages = 5;
		this.messageHidingInterval = 2000; //ms
		this.messageFadingTime = 500; //ms, should be equal to the transition value in the snackbar.css
		this.isShown = true;
		this.messagesQueue = [];
		this.shownMessages = [];
		this.hidingTimeout = 0;
		this.snackbarService = snackbarService;
		this.scope = $scope;
		snackbarService.registerObserver(() => this.checkServiceMessagesQueue());
		this.hideOldest = this.hideOldest.bind(this);
		this.removeMessage = this.removeMessage.bind(this);
		this.fadeInMessage = this.fadeInMessage.bind(this);
	}
	checkServiceMessagesQueue(){
		var message = this.snackbarService.pickQueuedMessage();

		if(message != null){
			this.messagesQueue.push(message);

			if(this.shownMessages.length < this.maxShownMessages){
				this.showNext();
			}
		}
	}
	showNext(){
		if(this.messagesQueue.length > 0){

			this.shownMessages.push(Object.assign({}, this.messagesQueue.shift(), {isShown: false}));
			setTimeout(this.fadeInMessage, 0);

			if(!this.hidingTimeout){
				this.hidingTimeout = setTimeout(this.hideOldest,  this.messageHidingInterval);
			}
		}

	}
	hideOldest(){
		var player = this;

		if(player.shownMessages.length > 0){
			player.shownMessages[0].isShown = false;
			player.scope.$apply();
			setTimeout(player.removeMessage,  player.messageFadingTime);
			if(player.shownMessages.length == 1){
				player.hidingTimeout = 0;
			}
			else{
				player.hidingTimeout = setTimeout(player.hideOldest,  player.messageHidingInterval);
			}
		}

		player.showNext();
	}
	removeMessage(){
		this.shownMessages.shift();
		this.scope.$apply();
	}
	fadeInMessage(){
		this.shownMessages[this.shownMessages.length - 1].isShown = true;
		this.scope.$apply();
	}
}
