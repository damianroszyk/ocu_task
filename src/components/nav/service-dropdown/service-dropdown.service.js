import angular from 'angular';
import app from 'app';
import Observable from 'abstract/observable';

class ServiceDropdownService extends Observable {
	/* @ngInject */
	constructor(storage, thirdPartyConstant) {
		super();
		this.storage = storage;
		this._service = storage.getStorageProperty('preferredService') ||
			thirdPartyConstant.services[thirdPartyConstant.defaultService];
	}
	set service(service) {
		this._service = service;
		this.storage.setStorageProperty('preferredService', service);
		this.notifyObservers(this._service);
	}
	get service() {
		return this._service;
	}
	isSet() {
		return this._service && this._service.name;
	}
	isSpotify() {
		return this._service && this._service.name === 'spotify';
	}
	isDeezer() {
		return this._service && this._service.name === 'deezer';
	}
}

export default angular
	.module(app)
	.service('serviceDropdown', ServiceDropdownService)
	.name;
