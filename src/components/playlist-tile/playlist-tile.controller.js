export default class PlaylistTileController {
	/* @ngInject */
	constructor($state, $scope, Analytics, domConstant, storage) {
		this.$state = $state;
		this.$scope = $scope;
		this.Analytics = Analytics;
		this.defaultPlaylistTileImage = domConstant.defaultCategoryTileImage;
		this.storage = storage;
	}
	onFollowClick() {
		let category = this.$state.is('home') ? 'Home' : 'Category';
		this.Analytics.trackEvent(category, 'Follow', this.playlist.name);

		if (this.storage.getStorageProperty('preferredService').name === 'spotify') {
			console.log('spotify');
		}
	}
}
