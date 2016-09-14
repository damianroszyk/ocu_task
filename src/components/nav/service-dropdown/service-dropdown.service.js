import angular from 'angular';
import app from 'app';
import Observable from 'abstract/observable';

class ServiceDropdownService extends Observable {
	/* @ngInject */
	constructor(storage, thirdPartyConstant) {
		super();
		this.storage = storage;
		this._service = storage.getStorageProperty('preferredService') ||
			thirdPartyConstant.defaultService[0];
	}
	set service(service) {
		this._service = service;
		this.storage.setStorageProperty('preferredService', service);
		this.notifyObservers(this._service);
	}
	get service() {
		return this._service;
	}
}

export default angular
	.module(app)
	.service('serviceDropdown', ServiceDropdownService)
	.name;
