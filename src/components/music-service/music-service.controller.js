export default class MusicService {
	/* @ngInject */
	constructor($scope) {
		$scope.$on('$stateChangeSuccess', this.closeDropdown.bind(this));
		this.services = [{
			name : 'apple',
			logo : '/shared/images/icons/apple-icon--black.png'
		}, {
			name : 'deezer',
			logo : '/shared/images/icons/deezer-icon--black.png'
		}, {
			name : 'spotify',
			logo : '/shared/images/icons/spotify-icon--black.png'
		}];
	}
	closeDropdown() {
		this.isShown = false;
	}
}
