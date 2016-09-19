export default class PlayerSpotifyController {
	/* @ngInject */
	constructor($window, $timeout, $stateParams, $sce, dispatcherService, playerConstant, playerWidgetService) {
		this.$timeout = $timeout;
		this.playerConstant = playerConstant;
		this.playerWidgetService = playerWidgetService;
		this.$window = $window;
		this.dispatcherService = dispatcherService;
		this.playerIsLoaded = false;
		this.$sce = $sce;
		if (this.popup && window.opener) {
			this.registerOpenerEvents();
		}
	}
	playerUrl() {
		return this.$sce.trustAsResourceUrl([
			this.playerConstant.embeddedSpotifyPlayerUrl,
			`?uri=spotify:user:${this.serviceUserId}:playlist:${this.servicePlaylistId}`,
		].join(''));
	}
	$onDestroy() {
		this.close();
	}
	showPopup() {
		let url = `#/player/spotify/${this.serviceUserId}/${this.servicePlaylistId}`;
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
	registerOpenerEvents() {
		this.$window.opener.addEventListener(
			this.playerConstant.playLocalPlaylistEvent,
			this._handlePlayLocalPlaylistEvent.bind(this)
		);
		this.$window.onbeforeunload = (event) => {
			this.dispatcherService.dispatchNative(
				this.playerConstant.popupClosedEvent, event, this.$window.opener
			);
		};
	}
	_handlePlayLocalPlaylistEvent(event) {
		if (event.detail && event.detail.playlist) {
			this.$state.go('spotifyPlayer', {
				serviceUserId: event.detail.spotify.service_user_id,
				servicePlaylistId: event.detail.playlist.spotify.service_playlist_id
			}, { reload: true });
		}
	}
}
