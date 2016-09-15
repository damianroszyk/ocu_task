import _ from 'lodash';

export default class MusicProviderDropdown {
	/* @ngInject */
	constructor($scope, thirdPartyConstant, musicProvider) {
		$scope.$on('$stateChangeSuccess', this.closeDropdown.bind(this));
		this.providers = angular.copy(thirdPartyConstant.providers);
		this.musicProvider = musicProvider;
		this._getChosenProvider();
	}
	_getChosenProvider() {
		angular.forEach(this.providers, provider => {
			provider.selected = this.musicProvider.provider &&
				this.musicProvider.provider.name === provider.name;
		});
	}
	closeDropdown() {
		this.isShown = false;
		this._getChosenProvider();
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
		this.closeDropdown();
	}
}
