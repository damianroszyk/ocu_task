import angular from 'angular';
import app from 'app';
import Observable from 'abstract/observable';

class SnackbarService extends Observable {
	/* @ngInject */
	constructor() {
		super();
		this.messagesQueue = [];
	}
	showSuccessMessage(msg){
		this.messagesQueue.push({text: msg, type: 'SUCCESS'});
		this.notifyObservers();
	}
	showInfoMessage(msg){
		this.messagesQueue.push({text: msg, type: 'INFO'});
		this.notifyObservers();
	}
	showErrorMessage(msg){
		this.messagesQueue.push({text: msg, type: 'ERROR'});
		this.notifyObservers();
	}
	pickQueuedMessage(){
		if(this.messagesQueue.length == 0){
			return null;
		}
		else{
			return this.messagesQueue.shift();
		}
	}
}

export default angular
	.module(app)
	.service('snackbarService', SnackbarService)
	.name;
