export default class PlayerController {
	constructor($window, $state, dispatcherService, playerConstant) {
		this.$window = $window;
		this.$state = $state;
		this.dispatcherService = dispatcherService;
		this.playerConstant = playerConstant;
		if (this.popup && this.$window.opener) {
			this.registerPopupEvents();
		}
	}
	$onDestroy() {
		this.close();
	}
	registerPopupEvents() {
		this.dispatcherService.listenNative(
			this.playerConstant.musicProviderUpdatedEvent,
			this.handleMusicProviderUpdatedEvent.bind(this),
			this.$window.opener
		);
		this.dispatcherService.listenNative(
			this.playerConstant.playLocalPlaylistEvent,
			this.handlePlayLocalPlaylistEvent.bind(this),
			this.$window.opener
		);
		this.$window.onbeforeunload = (event) => {
			this.dispatcherService.dispatchNative(
				this.playerConstant.popupClosedEvent, event, this.$window.opener
			);
		};
	}
	handleMusicProviderUpdatedEvent() {
		if (this.popup) {
			(this.$window.close || angular.noop)();
		}
	}
}
