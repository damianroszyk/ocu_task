export default class NavController {
	/* @ngInject */
	constructor() {

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
