export default class PlaylistController {
	/* @ngInject */
	constructor(breadcrumbService, playerService) {
		breadcrumbService.breadcrumb = [{
			name: 'Home',
			state: 'home'
		}, {
			name: this.deezerPlaylist.title
		}];
		this.playerService = playerService;
	}
	showPlayer() {
		console.log(this.playlist);
		var playlistId = -1;

		for(let i = 0; i < this.playlist.external_playlists.length; i++){
			if(this.playlist.external_playlists[i].source === this.playerService.musicProvider){
				playlistId = this.playlist.external_playlists[i].service_playlist_id;
				break;
			}
		}

		this.playerService.setPlaylist(playlistId);
		this.playerService.setTracks(this.playlist.tracks);
		document.dispatchEvent(new Event('RUN_PLAYER'));
		this.playerService.show();
	}
}
