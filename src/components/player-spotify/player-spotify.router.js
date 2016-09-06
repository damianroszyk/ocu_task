import angular from 'angular';
import app from 'app';

const SPOTIFY_PLAYER_ROUTER = {
	playerState: {
		url: '^/player/spotify/:serviceUserId/:servicePlaylistId',
		template: `
			<player-spotify
				popup="true"
				service-user-id="$state.params.serviceUserId"
				service-playlist-id="$state.params.servicePlaylistId">
			</player-spotify>`,
		pageTitle: `Player`
	}
};

/* @ngInject */
let playerRouter = $stateProvider => $stateProvider
	.state('spotifyPlayer', SPOTIFY_PLAYER_ROUTER.playerState);

export default angular
	.module(app)
	.config(playerRouter)
	.name;
