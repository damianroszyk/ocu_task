import angular from 'angular';
import app from 'app';
import Observable from 'abstract/observable';

class PlayerWidgetService extends Observable {
	/* @ngInject */
	constructor($timeout, $window, $translate, dispatcherService, playerConstant,
		musicProvider, mobileHelper, thirdPartyConstant, messagePopupService, deezer, Analytics) {
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
		this.deezer = deezer;
		this.mobileHelper = mobileHelper;
		this.$timeout = $timeout;
		this.Analytics = Analytics;
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
		} else {
			this.Analytics.trackEvent('Playlist', 'Play', playlist.name, this.musicProvider.isSet());
			if (this.musicProvider.isDeezer() && !this.deezer.isAuthorized) {
				this.deezer.isAuthorized = false;
				return this.deezer.authorizeIfNeccessary().then(() => {
					this.$timeout(() => {
						this.launch(playlist);
						this.deezer.checkLoginStatus();
					}, 1500);
				});
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
	}
	_createPlayer(playlist) {
		let provider = this.musicProvider.provider.name;
		let providerPlaylist = _.find(playlist.external_playlists, { source: provider });
		if (this.mobileHelper.detectMobile()) {
			if (provider === 'spotify') {
				this.$window.open(`spotify:user:${providerPlaylist.service_user_id}:playlist:${providerPlaylist.service_playlist_id}`);
			} else if (provider === 'deezer') {
				this.$window.open(`http://www.deezer.com/playlist/${providerPlaylist.service_playlist_id}`);
			} else if (provider === 'apple') {
				this.$window.open(playlist.apple_music_link || this.thirdPartyConstant.digsterAppleMusicAccount);
				return;
			}
		} else {
			if (provider === 'apple') {
				this.$window.open(playlist.apple_music_link || this.thirdPartyConstant.digsterAppleMusicAccount);
				return;
			}
			if (!providerPlaylist) {
				this.messagePopupService.showMessage(
					this.$translate.instant('NO_PLAYLIST_IN_PROVIDER_SERVICE', { service: _.capitalize(provider) })
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
}

export default angular
	.module(app)
	.service('playerWidgetService', PlayerWidgetService)
	.name;
