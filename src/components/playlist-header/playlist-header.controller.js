export default class PlaylistHeaderController {
	/* @ngInject */
	constructor($translate, $sce, domConstant, playerWidgetService, dispatcherService, musicProvider, playerConstant, playlistService) {
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
		if (!this.musicProvider.isSet()) {
			this.musicProvider.openModal(this.onPlayButtonClick.bind(this));
		}
		if (this.playerWidgetService.popup) {
			this.dispatcherService.dispatchNative(this.playerConstant.playLocalPlaylistEvent, {
				playlist: this.playlist
			});
		} else {
			this.playlistService.showPlayer(this.playlist);
			this.dispatcherService.listenNative(this.playerConstant.popupClosedEvent, () => {
				this.playerWidgetService.popup = false;
			});
		}
	}
	playlistDescription() {
		return this.cmsPlaylistDescription ? this.cmsPlaylistDescription : this.defaultPlaylistDescription;
	}
}
