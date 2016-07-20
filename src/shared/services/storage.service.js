import angular from 'angular';
import app from 'app';

class StorageService {
	/* @ngInject */
	constructor() {
		this.storage = localStorage;
	}
	setStorageProperty(property, value) {
		this.storage.setItem(property, JSON.stringify(value));
	}
	getStorageProperty(property) {
		return JSON.parse(this.storage.getItem(property));
	}
}

export default angular
	.module(app)
	.service('storage', StorageService)
	.name;
