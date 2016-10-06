export default class PlaylistHeaderController {
	/* @ngInject */
	constructor($translate, $sce, domConstant, playerWidgetService, dispatcherService,
		musicProvider, playerConstant, playlistService, $location, $window) {
		this.defaultPlaylistTileImage = domConstant.defaultCategoryTileImage;
		this.$translate = $translate;
		this.playerWidgetService = playerWidgetService;
		this.dispatcherService = dispatcherService;
		this.playerConstant = playerConstant;
		this.defaultPlaylistDescription = $sce.trustAsHtml($translate.instant('PLAYLIST_NO_DESCRIPTION'));
		this.cmsPlaylistDescription = $sce.trustAsHtml(this.playlist.description);
		this.playlistService = playlistService;
		this.musicProvider = musicProvider;
		this.$location = $location;
		this.$window = $window;
	}
	onPlayButtonClick() {
		this.playerWidgetService.launch(this.playlist);
	}
	playlistDescription() {
		return this.cmsPlaylistDescription ?
			this.cmsPlaylistDescription : this.defaultPlaylistDescription;
	}
	sharePlaylist(socialMedia) {
		let playlistUrl = 'http://www.digster.fm/playlist/the-drop';
		let escapedPlaylistUrl = escape(playlistUrl);
		let message = escape(`Listen to ${this.playlist.name} playlist on Digster - ${playlistUrl}`);
		let playlistCover = escape(this.playlist.images[0].url);
		if (socialMedia === 'twitter') {
			this.$window.open(`https://twitter.com/home?status=${message}`);
		}
		if (socialMedia === 'facebook') {
			this.$window.open(`https://www.facebook.com/sharer/sharer.php?u=${escapedPlaylistUrl}`);
		}
		if (socialMedia === 'pinterest') {
			this.$window.open(`https://pinterest.com/pin/create/button/?url=${escapedPlaylistUrl}&media=${playlistCover}&description=${message}`);
		}
	}
}
