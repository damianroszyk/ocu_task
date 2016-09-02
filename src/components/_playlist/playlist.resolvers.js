/* @ngInject */
let playlist = function($stateParams, playlistService) {
	return playlistService.getPlaylist($stateParams.localPlaylistId);
};

/* @ngInject */
let deezerPlaylist = function($stateParams, playlistService) {
	return playlistService.getDeezerPlaylist($stateParams.servicePlaylistId);
};

/* @ngInject */
let categoryPlaylists = function($stateParams, playlistService) {
	return playlistService.getCategoryPlaylists($stateParams.categoryId);
};

/* @ngInject */
let featuredPlaylists = function(playlistService) {
	return playlistService.getFeaturedPlaylists();
};

/* @ngInject */
let search = function($stateParams, playlistService) {
	return playlistService.searchPlaylists($stateParams.query, $stateParams.order, $stateParams.sort);
};

export { playlist, deezerPlaylist, categoryPlaylists, featuredPlaylists, search };
