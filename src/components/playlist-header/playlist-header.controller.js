export default class PlaylistHeaderController {
	/* @ngInject */
	constructor($translate, $sce, domConstant, storage, playlistService) {
		this.defaultPlaylistTileImage = domConstant.defaultCategoryTileImage;
		this.$translate = $translate;
		this.defaultPlaylistDescription = $sce.trustAsHtml($translate.instant('PLAYLIST_NO_DESCRIPTION'));
		this.cmsPlaylistDescription = $sce.trustAsHtml(this.playlist.description);
		this.storage = storage;
		this.playlistService = playlistService;
	}
	onPlayButtonClick(playlist) {
		if (!this.storage.getStorageProperty('preferredService')) {
			this.showModal = true;
			return;
		}
		this.playlistService.showPlayer(playlist);
	}
	playlistDescription() {
		return this.cmsPlaylistDescription ? this.cmsPlaylistDescription : this.defaultPlaylistDescription;
	}
}
