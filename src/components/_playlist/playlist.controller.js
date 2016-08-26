export default class PlaylistController {
	/* @ngInject */
	constructor(breadcrumbService) {
		breadcrumbService.breadcrumb = [{
			name: 'Home',
			state: 'home'
		}, {
			name: this.playlist.title
		}];
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
		this.musicProvider = "DEEZER";
		this.playerShown = true;
	}

	showPlayer(){
		this.playerShown = true;
	}

	hidePlayer(){
		this.playerShown = false;
	}
}
