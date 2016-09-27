export default class NavController {
	/* @ngInject */
	constructor(musicProvider, $translate) {

		this.$translate = $translate;
		this.musicProvider = musicProvider;
		this.selectedProviderName = '';
		this._translateChosenMusicServiceLabel();
		musicProvider.registerObserver(() => this._translateChosenMusicServiceLabel());
	}

	_translateChosenMusicServiceLabel(){
		this.$translate('CHOSEN_MUSIC_SERVICE' + (!!this.musicProvider.provider ? '_' + this.musicProvider.provider.name.toUpperCase() : '' )).then(
			name => this.selectedProviderName = name
		);
	}

	showSearch($event) {
		this.showSearchDropdown = !this.showSearchDropdown;
		$event.stopPropagation();
	}
}
