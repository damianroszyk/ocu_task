import angular from 'angular';
import app from 'app';

import { playlist, deezerPlaylist } from 'playlist/playlist.resolvers';

const PLAYLIST_ROUTER = {
	playlistState: {
		url: '^/playlist/:localPlaylistId/:servicePlaylistId',
		template: `
			<playlist
				playlist="$resolve.playlist.data"
				deezer-playlist="$resolve.deezerPlaylist">
			</playlist>`,
		pageTitle: `Playlist`,
		resolve: { playlist, deezerPlaylist }
	}
};

/* @ngInject */
let playlistRouter = $stateProvider => $stateProvider
	.state('playlist', PLAYLIST_ROUTER.playlistState);

export default angular
	.module(app)
	.config(playlistRouter)
	.name;
