import angular from 'angular';
import app from 'app';

const THIRD_PARTY_CONSTANT = {
	providers: [{
		name : 'spotify',
		logo : '/shared/images/icons/spotify-icon--black.png'
	}, {
		name : 'apple',
		logo : '/shared/images/icons/apple-icon--black.png'
	}, {
		name : 'deezer',
		logo : '/shared/images/icons/deezer-icon--black.png'
	}, {
		name: 'napster',
		logo: '/shared/images/icons/napster-logo.png'
	}],
	digsterAppleMusicAccount: 'https://itunes.apple.com/us/curator/digster/id1018903101',
	digsterTracker1GA: '<% digsterTracker1GA %>',
	digsterTracker2GA: '<% digsterTracker2GA %>',
	authWindowWidth: 450,
	authWindowHeight: 730,
	deezerRedirectUri: `${window.location.origin}/channel-deezer.html`,
	deezerSdkUrl: 'http://cdn-files.deezer.com/js/min/dz.js',
	deezerAppId: '<% deezerAppId %>',
	deezerScopes: ['basic_access', 'email', 'manage_library'],
	spotifyApiUrl: 'https://api.spotify.com/v1',
	spotifyAuthUrl: 'https://accounts.spotify.com/authorize',
	spotifyScopes: ['user-read-email', 'playlist-modify-public', 'playlist-modify-private'],
	spotifyRedirectUrl: `${window.location.origin}/channel-spotify.html`,
	spotifyClientId: '<% spotifyClientId %>',
	napsterApiKey: 'YWQ4NzEyZjItMDhhNC00YWUyLTgxNDctNTMyNDkzNjFkMmM3', //TODO param
	napsterApiSecret: 'OTc5NDlhODctMzk5MC00Y2FmLTk0ZDgtMWY0ODU1ODM3ZDVk', //TODO param
	napsterApiUrl: 'https://api.napster.com',
	napsterRedirectUrl: `${window.location.origin}/channel-napster.html`
};

export default angular
	.module(app)
	.constant('thirdPartyConstant', THIRD_PARTY_CONSTANT)
	.name;
