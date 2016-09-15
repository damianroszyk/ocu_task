export default class FollowButtonController {
	/* @ngInject */
	constructor($state, Analytics, serviceDropdown, spotify, deezer) {
		this.$state = $state;
		this.serviceDropdown = serviceDropdown;
		this.Analytics = Analytics;
		this.spotify = spotify;
		this.deezer = deezer;
	}
	onFollowClick() {
		let category = this.$state.is('home') ? 'Home' : 'Category';
		// this.Analytics.trackEvent(category, 'Follow', this.playlist.name);
		if (this.serviceDropdown.isSpotify()) {
			this._followPlaylistOnSpotify();
		}
		if (this.serviceDropdown.isDeezer()) {
			this._followPlaylistOnDeezer();
		}
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
