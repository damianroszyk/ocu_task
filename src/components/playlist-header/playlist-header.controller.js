const TWITTER_SHARE_URL = 'https://twitter.com/intent/tweet?text=';
const FACEBOOK_SHARE_URL = 'https://www.facebook.com/sharer/sharer.php?u=';
const PINTEREST_SHARE_URL = 'https://pinterest.com/pin/create/button/?url=';

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
		let playlistUrl = this.$location.absUrl();
		let escapedPlaylistUrl = escape(playlistUrl);
		let message = `Listen to ${this.playlist.name} playlist on Digster - ${playlistUrl}`;
		let playlistCover = escape(this.playlist.images[0].url);
		if (socialMedia === 'twitter') {
			this.$window.open(`${TWITTER_SHARE_URL}${message}`);
		}
		if (socialMedia === 'facebook') {
			this.$window.open(`${FACEBOOK_SHARE_URL}${escapedPlaylistUrl}`);
		}
		if (socialMedia === 'pinterest') {
			this.$window.open(`${PINTEREST_SHARE_URL}${escapedPlaylistUrl}&media=${playlistCover}&description=${message}`);
		}
	}
}
