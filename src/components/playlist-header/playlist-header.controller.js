export default class PlaylistHeaderController {
	/* @ngInject */
	constructor($translate, $sce, domConstant, musicProvider, playlistService) {
		this.defaultPlaylistTileImage = domConstant.defaultCategoryTileImage;
		this.$translate = $translate;
		this.defaultPlaylistDescription = $sce.trustAsHtml($translate.instant('PLAYLIST_NO_DESCRIPTION'));
		this.cmsPlaylistDescription = $sce.trustAsHtml(this.playlist.description);
		this.playlistService = playlistService;
		this.musicProvider = musicProvider;
	}
	onPlayButtonClick() {
		if (!this.musicProvider.isSet()) {
			this.musicProvider.openModal(this.onPlayButtonClick.bind(this));
		}
		this.playlistService.showPlayer(this.playlist);
	}
	playlistDescription() {
		return this.cmsPlaylistDescription ? this.cmsPlaylistDescription : this.defaultPlaylistDescription;
	}
}
