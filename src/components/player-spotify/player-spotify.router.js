import angular from 'angular';
import app from 'app';

const SPOTIFY_PLAYER_ROUTER = {
	playerState: {
		url: '^/player/spotify/:playlistId',
		template: `
			<player-spotify
				popup="true"
				playlist-id="$state.params.playlistId">
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
