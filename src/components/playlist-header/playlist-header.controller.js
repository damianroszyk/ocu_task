export default class PlaylistHeaderController {
	/* @ngInject */
	constructor($translate, $sce, domConstant, storage) {
		this.defaultPlaylistTileImage = domConstant.defaultCategoryTileImage;
		this.$translate = $translate;
		this.defaultPlaylistDescription = $sce.trustAsHtml($translate.instant('PLAYLIST_NO_DESCRIPTION'));
		this.cmsPlaylistDescription = $sce.trustAsHtml(this.playlist.description);
		this.storage = storage;
	}
	onPlayButtonClick() {
		if (!this.storage.getStorageProperty('preferredService')) {
			this.showModal = true;
			console.log('no music service');
			return;
		}
		this.showPlayer();
	}
	playlistDescription() {
		return this.cmsPlaylistDescription ? this.cmsPlaylistDescription : this.defaultPlaylistDescription;
	}
	closeModalOverlay() {
		this.showModal = false;
		if (this.storage.getStorageProperty('preferredService')) {
			console.log('service has been choosen');
			this.showPlayer();
		}
	}
}
