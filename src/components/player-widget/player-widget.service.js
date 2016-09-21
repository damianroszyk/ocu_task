import angular from 'angular';
import app from 'app';
import Observable from 'abstract/observable';

class PlayerWidgetService extends Observable {
	/* @ngInject */
	constructor() {
		super();
		this._player = {};
		this._popup = false;
	}
	set player(player) {
		this._player = player;
	}
	get player() {
		return this._player;
	}
	set popup(provider) {
		this._popup = provider;
	}
	get popup() {
		return this._popup;
	}
	notify() {
		this.notifyObservers(this._player);
	}
	destroy() {
		this._player = {};
		return this;
	}
}

export default angular
	.module(app)
	.service('playerWidgetService', PlayerWidgetService)
	.name;
