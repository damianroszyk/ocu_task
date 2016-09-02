export default class PlaylistController {
	/* @ngInject */
	constructor(breadcrumbService) {
		breadcrumbService.breadcrumb = [{
			name: 'Home',
			state: 'home'
		}, {
			name: this.deezerPlaylist.title
		}];
		this.musicProvider = 'DEEZER';
		this.playerShown = false;
	}
	showPlayer() {
		this.playerShown = true;
	}
	hidePlayer() {
		this.playerShown = false;
	}
}
