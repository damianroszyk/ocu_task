export class PlaylistsResolver {
	/* @ngInject */
	static constructor($stateParams, playlistService) {
		return playlistService.getPlaylists($stateParams.categoryId);
	}
}

export class PlaylistResolver {
	/* @ngInject */
	static constructor($stateParams, playlistService) {
		return playlistService.getPlaylist($stateParams.playlistId);
	}
}
