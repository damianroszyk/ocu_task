export default class ServiceDropdown {
	/* @ngInject */
	constructor($scope, thirdPartyConstant) {
		$scope.$on('$stateChangeSuccess', this.closeDropdown.bind(this));
		this.services = thirdPartyConstant.services;
	}
	closeDropdown() {
		this.isShown = false;
	}
}
