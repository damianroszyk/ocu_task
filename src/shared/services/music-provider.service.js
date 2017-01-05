import angular from 'angular';
import app from 'app';
import Observable from 'abstract/observable';

const PROVIDER_KEY = 'chosenProvider';

class MusicProviderService extends Observable {
	/* @ngInject */
	constructor(storage, thirdPartyConstant, dispatcherService) {
		super();
		this.storage = storage;
		this.dispatcherService = dispatcherService;
		this._provider = storage.getStorageProperty(PROVIDER_KEY);
	}
	set provider(provider) {
		this.dispatcherService.dispatch('musicProviderChange', provider);
		this._provider = provider;
		this.storage.setStorageProperty(PROVIDER_KEY, provider);
		this.notifyObservers(this._provider);
	}
	get provider() {
		return this.storage.getStorageProperty(PROVIDER_KEY);
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
	registerModalHandler(modalHandler) {
		this.modalHandler = modalHandler;
	}
	openModal(callback) {
		(this.modalHandler || angular.noop)(callback);
	}
}

export default angular
	.module(app)
	.service('musicProvider', MusicProviderService)
	.name;
