import angular from 'angular';
import app from 'app';

import { localPlaylist, servicePlaylist } from 'playlist/playlist.resolvers';

const PLAYLIST_ROUTER = {
	playlistState: {
		url: '^/playlist/:localPlaylistId/:service/:servicePlaylistId',
		template: `
			<playlist
				local-playlist="$resolve.localPlaylist.data"
				service-playlist="$resolve.servicePlaylist">
			</playlist>`,
		pageTitle: `Playlist`,
		resolve: { localPlaylist, servicePlaylist }
	}
};

/* @ngInject */
let playlistRouter = $stateProvider => $stateProvider
	.state('playlist', PLAYLIST_ROUTER.playlistState);

export default angular
	.module(app)
	.config(playlistRouter)
	.name;
