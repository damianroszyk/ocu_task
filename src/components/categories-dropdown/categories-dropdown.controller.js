export default class CategoriesDropdownController {
	/* @ngInject */
	constructor($scope, categoryService, $stateParams) {
		categoryService
			.getCategories()
			.then(response => this.categories = response);
		$scope.$on('$stateChangeSuccess', this.closeDropdown.bind(this));
	}
	closeDropdown() {
		this.isShown = false;
	}
}
