import angular from 'angular';
import app from 'app';

const CUSTOM_PLAYER_ROUTER = {
	playerState: {
		url: '^/player/:localPlaylistId/deezer/:servicePlaylistId/:trackIdx/:trackTime/:shuffle/:repeat',
		template: `
			<player-custom
				popup="true"
				local-playlist-id="$state.params.localPlaylistId"
				service-playlist-id="$state.params.servicePlaylistId"
				track-idx="$state.params.trackIdx"
				track-time="$state.params.trackTime">
			</player-custom>`,
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
