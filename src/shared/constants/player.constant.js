import angular from 'angular';
import app from 'app';

const PLAYER_CONSTANT = {
	defaultWidth: 600,
	defaultHeight: 700,
	embeddedDeezerPlayerUrl: 'https://www.deezer.com/plugins/player',
	embeddedSpotifyPlayerUrl: 'https://embed.spotify.com',
	playLocalPlaylistEvent: 'playLocalPlaylist',
	popupClosedEvent: 'popupClosed',
	deezerRepeatingDictionary: {
		noRepeat: 0,
		repeatPlaylist: 1,
		repeatTrack: 2
	},
	popupSize: {
		width: 420,
		height: 680
	}
};

export default angular
	.module(app)
	.constant('playerConstant', PLAYER_CONSTANT)
	.name;
