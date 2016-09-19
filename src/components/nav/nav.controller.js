export default class NavController {
	/* @ngInject */
	constructor(musicProvider, $translate) {
		this.selectedProviderName = '';

		$translate('MUSIC_SERVICE' + (!!musicProvider.provider ? '_' + musicProvider.provider.name.toUpperCase() : '' )).then(
			name => this.selectedProviderName = name,
			id => this.selectedProviderName = id
		);

		musicProvider.registerObserver(() => {
			$translate('MUSIC_SERVICE' + (!!musicProvider.provider.name ? '_' + musicProvider.provider.name.toUpperCase() : '' )).then(
				name => this.selectedProviderName = name,
				id => this.selectedProviderName = id
			);
		});
	}

	showSearch($event, root) {
		if (root.is('home')) {
			var searchInputs = document.getElementsByClassName('search-form__input');
			searchInputs[0].focus();
			document.body.scrollTop = 300;
			return;
		}
		this.showSearchDropdown = !this.showSearchDropdown;
		$event.stopPropagation();
	}
}
