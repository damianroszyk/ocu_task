/* @ngInject */
let playlist = function($stateParams, playlistService) {
	return playlistService.getPlaylist($stateParams.playlistId);
};

/* @ngInject */
let categoryPlaylists = function($stateParams, playlistService) {
	return playlistService.getCategoryPlaylists($stateParams.categoryId);
};

/* @ngInject */
let search = function($stateParams, playlistService) {
	return playlistService.searchPlaylists($stateParams.query);
};

export { playlist, categoryPlaylists, search };
