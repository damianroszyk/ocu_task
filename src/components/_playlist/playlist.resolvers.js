/* @ngInject */
let playlist = function($stateParams, playlistService) {
	return playlistService.getPlaylist($stateParams.playlistId);
};

/* @ngInject */
let playlists = function($stateParams, playlistService) {
	return playlistService.getPlaylists($stateParams.categoryId);
};

export { playlist, playlists };
