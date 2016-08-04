import angular from 'angular';
import app from 'app';

import { playlist } from 'playlist/playlist.resolvers';

const PLAYLIST_ROUTER = {
	playlistState: {
		url: '^/playlist/:playlistId',
		template: `
			<playlist
				playlist="$resolve.playlist">
			</playlist>`,
		pageTitle: `Playlist`,
		resolve: { playlist }
	}
};

/* @ngInject */
let playlistRouter = $stateProvider => $stateProvider
	.state('playlist', PLAYLIST_ROUTER.playlistState);

export default angular
	.module(app)
	.config(playlistRouter)
	.name;
