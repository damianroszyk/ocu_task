import _ from 'lodash';

export default class MusicProviders {
	/* @ngInject */
	constructor(thirdPartyConstant, musicProvider) {
		this.providers = angular.copy(thirdPartyConstant.providers);
		this.musicProvider = musicProvider;
		this.chosenProvider = musicProvider.provider;
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
		this.onSave();
	}
}
