export default class SearchDropdownController {
	/* @ngInject */
	constructor($scope) {
		$scope.$on('$stateChangeSuccess', this.closeDropdown.bind(this));
	}

	closeDropdown() {
		this.isShown = false;
	}
}
