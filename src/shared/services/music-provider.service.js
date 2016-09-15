import angular from 'angular';
import app from 'app';
import Observable from 'abstract/observable';

const PROVIDER_KEY = 'chosenProvider';

class MusicProviderService extends Observable {
	/* @ngInject */
	constructor(storage, thirdPartyConstant) {
		super();
		this.storage = storage;
		this._provider = storage.getStorageProperty(PROVIDER_KEY);
	}
	set provider(provider) {
		this._provider = provider;
		this.storage.setStorageProperty(PROVIDER_KEY, provider);
		this.notifyObservers(this._provider);
	}
	get provider() {
		return this._provider;
	}
	isSet() {
		return this._provider && this._provider.name;
	}
	isSpotify() {
		return this._provider && this._provider.name === 'spotify';
	}
	isDeezer() {
		return this._provider && this._provider.name === 'deezer';
	}
}

export default angular
	.module(app)
	.service('musicProvider', MusicProviderService)
	.name;
