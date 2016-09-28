import _ from 'lodash';

export default class MusicProviderDropdown {
	/* @ngInject */
	constructor($scope, musicProvider) {
		$scope.$on('$stateChangeSuccess', this.closeDropdown.bind(this));
		this.musicProvider = musicProvider;
		this._checkMusicProvider();
		musicProvider.registerObserver(() => this._checkMusicProvider());
	}
	_checkMusicProvider() {
		if (this.musicProvider.isSet()) {
			this.poviderIsSet = true;
		}
	}
	closeDropdown() {
		this.isShown = false;
	}
}
