import angular from 'angular';
import app from 'app';
import Observable from 'abstract/observable';

class PlayerWidgetService extends Observable {
	/* @ngInject */
	constructor($window, $translate, dispatcherService, playerConstant, musicProvider, thirdPartyConstant, messagePopupService) {
		super();
		this.$window = $window;
		this.$translate = $translate;
		this.dispatcherService = dispatcherService;
		this.playerConstant = playerConstant;
		this.musicProvider = musicProvider;
		this.thirdPartyConstant = thirdPartyConstant;
		this.messagePopupService = messagePopupService;
		this._player = {};
		this._popup = false;
	}
	set player(player) {
		this._player = player;
	}
	get player() {
		return this._player;
	}
	set popup(provider) {
		this._popup = provider;
	}
	get popup() {
		return this._popup;
	}
	notify() {
		this.notifyObservers(this._player);
	}
	destroy() {
		this._player = {};
		return this;
	}
	launch(playlist) {
		if (!this.musicProvider.isSet()) {
			this.musicProvider.openModal(() => this.launch(playlist));
		}
		if (this.popup) {
			this.dispatcherService.dispatchNative(
				this.playerConstant.playLocalPlaylistEvent, { playlist }
			);
		} else {
			this._createPlayer(playlist);
			this.dispatcherService.listenNative(
				this.playerConstant.popupClosedEvent, () => this.popup = false
			);
		}
	}
	_createPlayer(playlist) {
		let provider = this.musicProvider.provider.name;
		let providerPlaylist = _.find(playlist.external_playlists, { source: provider });
		if (provider === 'apple') {
			this.$window.open(playlist.apple_music_link || this.thirdPartyConstant.digsterAppleMusicAccount);
			return;
		}
		if (!providerPlaylist) {

			let providerName = provider.charAt(0).toUpperCase() + provider.slice(1);

			this.messagePopupService.showMessage(
				this.$translate.instant('NO_PLAYLIST_IN_PROVIDER_SERVICE', { service: providerName })
			);
			return;
		}
		this.destroy();
		this.player = {
			service: provider,
			servicePlaylistId: providerPlaylist.service_playlist_id,
			serviceUserId: providerPlaylist.service_user_id,
			localPlaylistId: playlist.id,
			show: true
		};
		this.notify();
	}
}

export default angular
	.module(app)
	.service('playerWidgetService', PlayerWidgetService)
	.name;
