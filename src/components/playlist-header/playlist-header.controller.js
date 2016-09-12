export default class PlaylistHeaderController {
	/* @ngInject */
	constructor($translate, $sce, domConstant) {
		this.defaultPlaylistTileImage = domConstant.defaultCategoryTileImage;
		this.$translate = $translate;
		this.defaultPlaylistDescription = $sce.trustAsHtml($translate.instant('PLAYLIST_NO_DESCRIPTION'));
		this.cmsPlaylistDescription = $sce.trustAsHtml(this.playlist.description);
	}
	onPlayButtonClick() {
		this.showPlayer();
	}
	playlistDescription() {
		return this.cmsPlaylistDescription ? this.cmsPlaylistDescription : this.defaultPlaylistDescription;
	}
}
