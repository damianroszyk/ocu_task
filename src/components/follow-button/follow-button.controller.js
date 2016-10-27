export default class FollowButtonController {
	/* @ngInject */
	constructor($scope, $state, Analytics, musicProvider, spotify, deezer, messagePopupService, $translate) {
		this.$state = $state;
		this.musicProvider = musicProvider;
		this.Analytics = Analytics;
		this.spotify = spotify;
		this.deezer = deezer;
		this.messagePopupService = messagePopupService;
		this.$translate = $translate;
		musicProvider.registerObserver(() => this._unsetFollowedPlaylist());
	}
	onFollowClick() {
		this.Analytics.trackEvent(this.$state.current.name, 'Follow', this.playlist.name);
		this._followPlaylist();
	}
	_followPlaylist() {
		if (!this.musicProvider.isSet()) {
			this.musicProvider.openModal(this._followPlaylist.bind(this));
		}
		else {
			// this.Analytics.trackEvent(this.$state.current.name, 'Follow', this.playlist.name, this.musicProvider.isSet());
			let provider = this.musicProvider.provider.name;
			let providerPlaylist = _.find(this.playlist.external_playlists, { source: provider });
			if (!providerPlaylist) {
				this.messagePopupService.showMessage(
					this.$translate.instant('CANT_FOLLOW_PLAYLIST_WHEN_ITS_NOT_IN_PROVIDER_SERVICE')
				);
				return;
			}

			if (this.musicProvider.isSpotify()) {
				this._followPlaylistOnSpotify();
			} else if (this.musicProvider.isDeezer()) {
				this._followPlaylistOnDeezer();
			}
		}
	}
	_unsetFollowedPlaylist() {
		this.followed = false;
	}
	_followPlaylistOnSpotify() {
		this.spotify
			.authorizeIfNeccessary()
			.then(() => this.spotify
				.followPlaylist(
					this.playlist.spotify.service_user_id,
					this.playlist.spotify.service_playlist_id
				))
				.then(() => this.followed = 'spotify');
	}
	_followPlaylistOnDeezer() {
		this.deezer.authorizeIfNeccessary()
			.then(() => this.deezer
				.followPlaylist(
					this.playlist.deezer.service_playlist_id
				))
				.then(() => this.followed = 'deezer');
	}
}
