/* @ngInject */
let localPlaylist = ($stateParams, playlistService) =>
	playlistService.getPlaylist($stateParams.localPlaylistId);

/* @ngInject */
let servicePlaylist = ($stateParams, playlistService) =>
	playlistService.getDeezerPlaylist($stateParams.servicePlaylistId);

/* @ngInject */
let categoryPlaylists = ($stateParams, playlistService) =>
	playlistService.getCategoryPlaylists($stateParams.categoryId);

/* @ngInject */
let featuredPlaylists = (playlistService) =>
	playlistService.getFeaturedPlaylists();

/* @ngInject */
let search = ($stateParams, playlistService) =>
	playlistService.searchPlaylists($stateParams.query, $stateParams.order, $stateParams.sort);

export {
	localPlaylist,
	servicePlaylist,
	categoryPlaylists,
	featuredPlaylists,
	search
};
