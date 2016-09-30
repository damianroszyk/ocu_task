import angular from 'angular';
import app from 'app';

import Observable from 'abstract/observable';

class PageTitleService extends Observable {
	/* @ngInject */
	constructor() {
		super();
		this._title = [];
	}
	set title(title) {
		this._title = title;
		this.notifyObservers(this._title);
	}
	get title() {
		return this._title;
	}
}

export default angular
	.module(app)
	.service('pageTitleService', PageTitleService)
	.name;
