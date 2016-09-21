

export default class PlaylistController {
	/* @ngInject */
	constructor($scope, snackbarService, snackbarConstant) {
		this.maxShownMessages = snackbarConstant.maxShownMessages;
		this.messageHidingInterval = snackbarConstant.messageHidingInterval;
		this.messageFadingTime = snackbarConstant.messageFadingTime;
		this.isShown = true;
		this.messagesQueue = [];
		this.shownMessages = [];
		this.hidingTimeout = 0; // the current hiding timeout id will be set to this variable
		this.snackbarService = snackbarService;
		this.scope = $scope;
		snackbarService.registerObserver(() => this.checkServiceMessagesQueue());
		this.hideOldest = this.hideOldest.bind(this);
		this.removeMessage = this.removeMessage.bind(this);
		this.fadeInMessage = this.fadeInMessage.bind(this);
	}
	checkServiceMessagesQueue(){

		if(this.messagesQueue.length > 100){ // this won't allow user to flood the app with too much messages
			return;
		}

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

			this.shownMessages.push(Object.assign({}, this.messagesQueue.shift(), {isShown: false})); // "isShown: false" described in the line below
			setTimeout(this.fadeInMessage, 0); // we need setTimeout, because the "shown" class cannot be applied immediately, otherwise the css transition effect will not work

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
				player.hidingTimeout = 0; // there's no need to run "hideOldest" function again, because timeout that will remove the last message has been already set
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
