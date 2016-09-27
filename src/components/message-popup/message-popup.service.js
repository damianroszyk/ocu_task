import angular from 'angular';
import app from 'app';
import Observable from 'abstract/observable';

class MessagePopupService extends Observable {
	/* @ngInject */
	constructor() {
		super();
		this.message = {
			text: ''
		}
	}
	showMessage(text){
		this.message = { text };
		this.notifyObservers();
	}
}

export default angular
	.module(app)
	.service('messagePopupService', MessagePopupService)
	.name;
