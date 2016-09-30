import angular from 'angular';
import app from 'app';

import Observable from 'abstract/observable';

class MetatagsService extends Observable {
	/* @ngInject */
	constructor() {
		super();
		this._tags = [];
	}
	appendMetatag(key, content, identifier) {
		let tag = { key, content, identifier: identifier || 'property' };
		this._tags.push(tag);
		super.notifyObservers(this._tags);
		return this;
	}
	appendMetatags(metatags) {
		this._tags = angular.copy(metatags);
		super.notifyObservers(this._tags);
		return this;
	}
	clearMetatags() {
		this._tags = [];
		super.notifyObservers(this._tags);
		return this;
	}
	getTags() {
		return this._tags;
	}
}

export default angular
	.module(app)
	.service('metatagsService', MetatagsService)
	.name;
