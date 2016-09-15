export default class FollowButtonController {
	/* @ngInject */
	constructor($scope, $state, Analytics, musicProvider, spotify, deezer) {
		this.$state = $state;
		this.musicProvider = musicProvider;
		this.Analytics = Analytics;
		this.spotify = spotify;
		this.deezer = deezer;
		musicProvider.registerObserver(() => this._unsetFollowedPlaylist());
	}
	onFollowClick() {
		let category = this.$state.is('home') ? 'Home' : 'Category';
		this.Analytics.trackEvent(category, 'Follow', this.playlist.name);
		if (this.musicProvider.isSpotify()) {
			this._followPlaylistOnSpotify();
		}
		if (this.musicProvider.isDeezer()) {
			this._followPlaylistOnDeezer();
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
