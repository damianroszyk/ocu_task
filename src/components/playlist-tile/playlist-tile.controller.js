export default class PlaylistTileController {
	/* @ngInject */
	constructor($state, $scope, Analytics, domConstant) {
		this.$state = $state;
		this.$scope = $scope;
		this.Analytics = Analytics;
		this.defaultPlaylistTileImage = domConstant.defaultCategoryTileImage;
	}
	onFollowClick() {
		let category = this.$state.is('home') ? 'Home' : 'Category';
		this.Analytics.trackEvent(category, 'Follow', this.playlist.name);
	}
}
