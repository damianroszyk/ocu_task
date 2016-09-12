export default class PlaylistTileController {
	/* @ngInject */
	constructor($translate, $sce, $state, $scope, Analytics, domConstant, storage) {
		this.$state = $state;
		this.$scope = $scope;
		this.Analytics = Analytics;
		this.defaultPlaylistTileImage = domConstant.defaultCategoryTileImage;
		this.storage = storage;

		this.defaultPlaylistDescription = $sce.trustAsHtml($translate.instant('PLAYLIST_NO_DESCRIPTION'));
		this.cmsPlaylistDescription = $sce.trustAsHtml(this.playlist.description);
	}
	onFollowClick() {
		let category = this.$state.is('home') ? 'Home' : 'Category';
		this.Analytics.trackEvent(category, 'Follow', this.playlist.name);

		if (this.storage.getStorageProperty('preferredService').name === 'spotify') {
			console.log('spotify');
		}
	}
	playlistDescription() {
		return this.cmsPlaylistDescription ? this.cmsPlaylistDescription : this.defaultPlaylistDescription;
	}
}
