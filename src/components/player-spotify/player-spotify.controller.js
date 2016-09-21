import PlayerController from 'abstract/player';

export default class PlayerSpotifyController extends PlayerController {
	/* @ngInject */
	constructor($window, $state, $sce, dispatcherService, playerConstant, playerWidgetService) {
		super($window, $state, dispatcherService, playerConstant);
		this.playerConstant = playerConstant;
		this.playerWidgetService = playerWidgetService;
		this.$window = $window;
		this.$sce = $sce;
	}
	playerUrl() {
		return this.$sce.trustAsResourceUrl([
			this.playerConstant.embeddedSpotifyPlayerUrl,
			`?uri=spotify:user:${this.serviceUserId}:playlist:${this.servicePlaylistId}`,
		].join(''));
	}
	showPopup() {
		let url = `/player/spotify/${this.serviceUserId}/${this.servicePlaylistId}`;
		let attrs = [
			`width=${this.playerConstant.popupSize.width}`,
			`height=${this.playerConstant.popupSize.height}`,
			`menubar=no,status=no,titlebar=no,toolbar=no,directories=no`
		].join(',');
		this.playerWidgetService.popup = 'spotify';
		this.$window.open(url, '_blank', attrs);
		this.close();
	}
	setPlayerLoaded() {
		this.playerIsLoaded = true;
	}
	toggle() {
		this.isPlayerMinified = !this.isPlayerMinified;
	}
	maximize() {
		this.isMaximized = !this.isMaximized;
	}
	close() {
		this.isPlayerMinified = false;
		this.isMaximized = false;
		this.playerWidgetService.destroy().notify();
	}
	handlePlayLocalPlaylistEvent(event) {
		if (event.detail && event.detail.playlist) {
			let spotifyPlaylist = event.detail.playlist.spotify;
			this.$state.go('spotifyPlayer', {
				serviceUserId: spotifyPlaylist.service_user_id,
				servicePlaylistId: spotifyPlaylist.service_playlist_id
			}, { reload: true });
		}
	}
}
