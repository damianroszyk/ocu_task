import _ from 'lodash';

export default class MusicProviderDropdown {
	/* @ngInject */
	constructor($scope) {
		$scope.$on('$stateChangeSuccess', this.closeDropdown.bind(this));
	}
	closeDropdown() {
		this.isShown = false;
	}
}
