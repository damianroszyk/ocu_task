import angular from 'angular';
import app from 'app';

const CUSTOM_PLAYER_ROUTER = {
	playerState: {
		url: '^/player/deezer/:playlistId/:trackIdx/:trackTime',
		template: '<player-custom popup="true" playlist-id="$state.params.playlistId" track-idx="$state.params.trackIdx" track-time="$state.params.trackTime"></player-custom>',
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
