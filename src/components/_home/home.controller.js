export default class HomeController {
	/* @ngInject */
	constructor(breadcrumbService) {
		breadcrumbService.breadcrumb = [{
			name: 'Home'
		}];
		this.playlists = [{
			id: 30595446,
			name: 'playlist 1',
			imageUrl: 'https://spotifyapps.blob.core.windows.net/sinfini-imagefiles/Playlist_BestClassicalNewReleasesSinfiniMusicPicks_Cover',
			description: 'The very best of new and recently released classical albums that we\'re listening to at Sinfinimusic for our reviews section. Updated every week with fresh repertoire and artists.'
		}, {
			id: 30595446,
			name: 'playlist 2',
			imageUrl: 'https://spotifyapps.blob.core.windows.net/sinfini-imagefiles/Playlist_BestClassicalNewReleasesSinfiniMusicPicks_Cover',
			description: 'The very best of new and recently released classical albums that we\'re listening to at Sinfinimusic for our reviews section. Updated every week with fresh repertoire and artists.'
		}, {
			id: 30595446,
			name: 'playlist 3',
			imageUrl: 'https://spotifyapps.blob.core.windows.net/sinfini-imagefiles/Playlist_BestClassicalNewReleasesSinfiniMusicPicks_Cover',
			description: 'The very best of new and recently released classical albums that we\'re listening to at Sinfinimusic for our reviews section. Updated every week with fresh repertoire and artists.'
		}, {
			id: 30595446,
			name: 'playlist 4',
			imageUrl: 'https://spotifyapps.blob.core.windows.net/sinfini-imagefiles/Playlist_BestClassicalNewReleasesSinfiniMusicPicks_Cover',
			description: 'The very best of new and recently released classical albums that we\'re listening to at Sinfinimusic for our reviews section. Updated every week with fresh repertoire and artists.'
		}];
	}
}
