import angular from 'angular';
import app from 'app';

const THIRD_PARTY_CONSTANT = {
	services: [{
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
	deezerSdkUrl: 'https://cdns-files.dzcdn.net/js/min/dz.js',
	deezerAppId: 1,
	spotifyApiUrl: 'https://api.spotify.com/v1',
	spotifyAuthUrl: 'https://accounts.spotify.com/authorize',
	spotifyScopes: ['user-read-email', 'playlist-modify-public', 'playlist-modify-private'],
	spotifyRedirectUrl: `${window.location.origin}/channel-spotify.html`,
	spotifyClientId: 'a4cbbe2aece14f1cb7c0159d866156cb', // dev
	// spotifyClientId: '5bad0bd0b3104fe2a52380ae24673078' // remote
};

export default angular
	.module(app)
	.constant('thirdPartyConstant', THIRD_PARTY_CONSTANT)
	.name;
