import _ from 'lodash';

export default class MusicService {
	/* @ngInject */
	constructor($scope, thirdPartyConstant, musicService) {
		$scope.$on('$stateChangeSuccess', this.closeDropdown.bind(this));
		this.services = angular.copy(thirdPartyConstant.services);
		this.musicService = musicService;
		this._getPreferredService();
	}
	_getPreferredService() {
		angular.forEach(this.services, service => {
			service.selected = this.musicService.service.name === service.name;
		});
	}
	closeDropdown() {
		this.isShown = false;
		this._getPreferredService();
	}
	selectService(service) {
		if (!service.disabled) {
			angular.forEach(this.services, service => service.selected = false);
			service.selected = true;
		}
	}
	save() {
		let selectedService = _.filter(this.services, service => service.selected)[0];
		this.musicService.service = selectedService;
		this.closeDropdown();
	}
}
