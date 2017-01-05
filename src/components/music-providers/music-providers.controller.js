import _ from 'lodash';

export default class MusicProviders {
	/* @ngInject */
	constructor(thirdPartyConstant, playerConstant, musicProvider, dispatcherService, playerWidgetService, deezer, napsterService) {
		this.providers = angular.copy(thirdPartyConstant.providers);
		this.playerConstant = playerConstant;
		this.musicProvider = musicProvider;
		this.dispatcherService = dispatcherService;
		this.chosenProvider = musicProvider.provider;
		this.playerWidgetService = playerWidgetService;
		this.deezer = deezer;
		this.napsterService = napsterService;
		this._getChosenProvider();
	}
	_getChosenProvider() {
		angular.forEach(this.providers, provider => {
			provider.selected = this.musicProvider.provider &&
				this.musicProvider.provider.name === provider.name;
		});
	}
	selectProvider(provider) {
		if (!provider.disabled) {
			angular.forEach(this.providers, provider => provider.selected = false);
			provider.selected = true;
		}
	}
	save() {
		let selectedProvider = _.filter(this.providers, provider => provider.selected)[0];
		this.musicProvider.provider = selectedProvider;
		this.playerWidgetService.destroy().notify();
		this.dispatcherService.dispatchNative(this.playerConstant.musicProviderUpdatedEvent);
		this.onSave();
		selectedProvider.name === 'deezer' ? this.deezer.initialize() : '';
		selectedProvider.name === 'napster' ? this.napsterService.authorize() : '';
	}
}
