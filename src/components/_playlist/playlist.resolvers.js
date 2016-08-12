/* @ngInject */
let playlist = function($stateParams, playlistService) {
	return playlistService.getPlaylist($stateParams.playlistId);
};

/* @ngInject */
let playlists = function($stateParams, playlistService) {
	return playlistService.getPlaylists($stateParams.categoryId);
};

/* @ngInject */
let search = function($stateParams, playlistService) {
	return playlistService.searchPlaylists($stateParams.query);
};

export { playlist, playlists, search };
