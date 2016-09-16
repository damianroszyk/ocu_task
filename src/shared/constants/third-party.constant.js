import angular from 'angular';
import app from 'app';

const THIRD_PARTY_CONSTANT = {
	providers: [{
		name : 'apple',
		logo : '/shared/images/icons/apple-icon--black.png'
	}, {
		name : 'deezer',
		logo : '/shared/images/icons/deezer-icon--black.png'
	}, {
		name : 'spotify',
		logo : '/shared/images/icons/spotify-icon--black.png'
	}],
	authWindowWidth: 450,
	authWindowHeight: 730,
	deezerRedirectUri: `${window.location.origin}/channel-deezer.html`,
	deezerSdkUrl: 'https://cdns-files.dzcdn.net/js/min/dz.js',
	deezerAppId: '<% deezerAppId %>',
	deezerScopes: ['basic_access', 'email', 'manage_library'],
	spotifyApiUrl: 'https://api.spotify.com/v1',
	spotifyAuthUrl: 'https://accounts.spotify.com/authorize',
	spotifyScopes: ['user-read-email', 'playlist-modify-public', 'playlist-modify-private'],
	spotifyRedirectUrl: `${window.location.origin}/channel-spotify.html`,
	spotifyClientId: '<% spotifyClientId %>'
};

export default angular
	.module(app)
	.constant('thirdPartyConstant', THIRD_PARTY_CONSTANT)
	.name;
