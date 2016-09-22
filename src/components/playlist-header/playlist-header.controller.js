export default class PlaylistHeaderController {
	/* @ngInject */
	constructor($translate, $sce, domConstant, playerWidgetService, dispatcherService,
		musicProvider, playerConstant, playlistService) {
		this.defaultPlaylistTileImage = domConstant.defaultCategoryTileImage;
		this.$translate = $translate;
		this.playerWidgetService = playerWidgetService;
		this.dispatcherService = dispatcherService;
		this.playerConstant = playerConstant;
		this.defaultPlaylistDescription = $sce.trustAsHtml($translate.instant('PLAYLIST_NO_DESCRIPTION'));
		this.cmsPlaylistDescription = $sce.trustAsHtml(this.playlist.description);
		this.playlistService = playlistService;
		this.musicProvider = musicProvider;
	}
	onPlayButtonClick() {
		this.playerWidgetService.launch(this.playlist);
	}
	playlistDescription() {
		return this.cmsPlaylistDescription ?
			this.cmsPlaylistDescription : this.defaultPlaylistDescription;
	}
}
