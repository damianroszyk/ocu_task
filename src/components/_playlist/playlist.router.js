import angular from 'angular';
import app from 'app';

import { localPlaylist } from 'playlist/playlist.resolvers';

const PLAYLIST_ROUTER = {
	playlistState: {
		url: '^/playlist/:slug',
		template: `
			<playlist
				local-playlist="$resolve.localPlaylist.data">
			</playlist>`,
		pageTitle: `Playlist`,
		resolve: { localPlaylist }
	}
};

/* @ngInject */
let playlistRouter = $stateProvider => $stateProvider
	.state('playlist', PLAYLIST_ROUTER.playlistState);

export default angular
	.module(app)
	.config(playlistRouter)
	.name;
