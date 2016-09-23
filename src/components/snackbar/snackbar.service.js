import angular from 'angular';
import app from 'app';
import Observable from 'abstract/observable';

class SnackbarService extends Observable {
	/* @ngInject */
	constructor() {
		super();
		this.messagesQueue = [];
	}
	showSuccessMessage(text){
		this._showMessage(text, 'SUCCESS');
	}
	showInfoMessage(text){
		this._showMessage(text, 'INFO');
	}
	showErrorMessage(text){
		this._showMessage(text, 'ERROR');
	}
	_showMessage(text, type) {
		this.messagesQueue.push({ text, type });
		this.notifyObservers();
	}
	pickQueuedMessage(){
		return this.messagesQueue.length ? this.messagesQueue.shift() : null;
	}
}

export default angular
	.module(app)
	.service('snackbarService', SnackbarService)
	.name;
