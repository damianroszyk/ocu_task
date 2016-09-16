export default class PlayerSpotifyController {
	/* @ngInject */
	constructor($window, $timeout, $stateParams, $sce, playerConstant, playerWidgetService) {
		this.$timeout = $timeout;
		this.playerConstant = playerConstant;
		this.playerWidgetService = playerWidgetService;
		this.window = $window;
		this.playerIsLoaded = false;
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
		this.window.open(url, '_blank', attrs);
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
}
