export default class PlaylistController {
	/* @ngInject */
	constructor(deezer) {
		// @TODO: resolve in router
		let testPlaylist = 30595446;
		deezer.getPlaylist(testPlaylist).then(playlist => {
			this.playlist = playlist;
		});
	}
}
