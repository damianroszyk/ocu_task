import angular from 'angular';
import app from 'app';

import Observable from 'abstract/observable';

class ResponsiveService extends Observable {
	/* @ngInject */
	constructor() {
		super();
		this._rwdClass = null;
	}
	get rwdClass() {
		return this._rwdClass;
	}
	set rwdClass(rwdClass) {
		this._rwdClass = rwdClass;
		super.notifyObservers(this._rwdClass);
	}
}

export default angular
	.module(app)
	.service('responsiveService', ResponsiveService)
	.name;
