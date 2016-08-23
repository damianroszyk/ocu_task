export default class SearchDropdownController {
	/* @ngInject */
	constructor($scope) {
		let close = () => {
			this.isShown = false;
		};
		$scope.$on('$stateChangeSuccess', close);
	}

	closeDropdown() {
		this.isShown = false;
	}
}
