

export default class PlaylistController {
	/* @ngInject */
	constructor($timeout, snackbarService, snackbarConstant) {
		this.maxShownMessages = snackbarConstant.maxShownMessages;
		this.messageHidingInterval = snackbarConstant.messageHidingInterval;
		this.messageFadingTime = snackbarConstant.messageFadingTime;
		this.messagesQueue = [];
		this.shownMessages = [];
		this.hidingTimeout = 0; // the current hiding timeout id will be set to this variable
		this.snackbarService = snackbarService;
		this.$timeout = $timeout;
		snackbarService.registerObserver(this.checkServiceMessagesQueue.bind(this));
	}
	checkServiceMessagesQueue(){

		if(this.messagesQueue.length > 100){ // this won't allow user to flood the app with too much messages
			return;
		}

		var message = this.snackbarService.pickQueuedMessage();

		if(message){
			this.messagesQueue.push(message);

			if(this.shownMessages.length < this.maxShownMessages){
				this.showNext();
			}
		}
	}
	showNext(){
		if(this.messagesQueue.length > 0){

			this.shownMessages.push(Object.assign({}, this.messagesQueue.shift(), {isShown: false})); // "isShown: false" described in the line below
			this.$timeout(this.fadeInMessage, 0); // we need $timeout, because the "shown" class cannot be applied immediately, otherwise the css transition effect will not work

			if(!this.hidingTimeout){
				this.hidingTimeout = this.$timeout(this.hideOldest,  this.messageHidingInterval);
			}
		}

	}
	hideOldest(){
		if(this.shownMessages.length > 0){
			this.shownMessages[0].isShown = false;
			this.$timeout(this.removeMessage,  this.messageFadingTime);
			if(this.shownMessages.length == 1){
				this.hidingTimeout = 0; // there's no need to run "hideOldest" function again, because timeout that will remove the last message has been already set
			}
			else{
				this.hidingTimeout = this.$timeout(this.hideOldest,  this.messageHidingInterval);
			}
		}

		player.showNext();
	}
	removeMessage(){
		this.shownMessages.shift();
	}
	fadeInMessage(){
		this.shownMessages[this.shownMessages.length - 1].isShown = true;
	}
}
