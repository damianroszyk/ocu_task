import angular from 'angular';
import app from 'app';
import Observable from 'abstract/observable';

class PlayerWidgetService extends Observable {
	/* @ngInject */
	constructor() {
		super();
		this._player = {};
	}
	set service(service) {
		this._player.service = service;
	}
	set show(show) {
		this._player.show = !!show;
	}
	set servicePlaylistId(servicePlaylistId) {
		this._player.servicePlaylistId = servicePlaylistId;
	}
	set localPlaylistId(localPlaylistId) {
		this._player.localPlaylistId = localPlaylistId;
	}
	set tracks(tracks) {
		this._player.tracks = tracks;
	}
	get servicePlaylistId() {
		return this._player.servicePlaylistId;
	}
	get localPlaylistId() {
		return this._player.localPlaylistId;
	}
	get tracks() {
		return this._player.tracks;
	}
	set player(player) {
		this._player = player;
	}
	get player() {
		return this._player;
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
