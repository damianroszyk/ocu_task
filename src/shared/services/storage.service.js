import angular from 'angular';
import app from 'app';

import Persistable from 'abstract/persistable';

class StorageService extends Persistable {
	/* @ngInject */
	constructor($log) {
		super($log);
	}
	setStorageProperty(key, value) {
		super.setPersistentProperty(key, value);
	}
	getStorageProperty(key) {
		return super.getPersistentProperty(key);
	}
	removeStorageProperty(key) {
		super.removePersistentProperty(key);
	}
}

export default angular
	.module(app)
	.service('storage', StorageService)
	.name;
