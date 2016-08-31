import angular from 'angular';
import app from 'app';

const CUSTOM_PLAYER_ROUTER = {
	playerState: {
		url: '^/player/deezer/:playlistId',
		template: '<player-custom popup="true"></player-custom>',
		pageTitle: `Player`
	}
};

/* @ngInject */
let playerRouter = $stateProvider => $stateProvider
	.state('customPlayer', CUSTOM_PLAYER_ROUTER.playerState);

export default angular
	.module(app)
	.config(playerRouter)
	.name;
