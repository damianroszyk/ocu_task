import angular from 'angular';
import app from 'app';

const THIRD_PARTY_CONSTANT = {
	deezerSdkUrl: 'https://cdns-files.dzcdn.net/js/min/dz.js',
	deezerAppId: 1,
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
	defaultService: 1
};

export default angular
	.module(app)
	.constant('thirdPartyConstant', THIRD_PARTY_CONSTANT)
	.name;
