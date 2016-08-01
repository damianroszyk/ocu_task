export default class PlaylistController {
	/* @ngInject */
	constructor(deezer) {
		// @TODO: resolve in router
		let testPlaylist = 30595446;
		deezer.getPlaylist(testPlaylist).then(playlist => {
			this.playlist = playlist;
		});
		this.tags = [{
			id: 1,
			name: 'Hard Rock'
		}, {
			id: 2,
			name: 'Metal'
		}, {
			id: 3,
			name: 'Alternative'
		}, {
			id: 4,
			name: 'Party'
		}, {
			id: 5,
			name: 'RHCP'
		}, {
			id: 6,
			name: '80s'
		}, {
			id: 7,
			name: 'Guitar'
		}];
	}
}
