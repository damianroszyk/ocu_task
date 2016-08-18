import angular from 'angular';
import app from 'app';

class PlaylistService {
	/* @ngInject */
	constructor($http, $q, deezer, backendConstant, modelHelper) {
		this.$http = $http;
		this.$q = $q;
		this.deezer = deezer;
		this.modelHelper = modelHelper;
		this.backendConstant = backendConstant;
		this.playlistBackend = this.modelHelper.buildUrl(
			backendConstant.apiVersion, 'playlist'
		);
	}
	getPlaylists(categoryId = null) {
		return this.$q.when([{
			id: 30595446,
			name: 'playlist 1',
			imageUrl: 'https://spotifyapps.blob.core.windows.net/sinfini-imagefiles/Playlist_BestClassicalNewReleasesSinfiniMusicPicks_Cover',
			summary: 'Your hip hop hits in one playlist.',
			description: 'The very best of new and recently released classical albums that we\'re listening to at Sinfinimusic for our reviews section. Updated every week with fresh repertoire and artists.',
			nbTracks: 124,
			duration: 10205
		}, {
			id: 30595446,
			name: 'playlist 2',
			imageUrl: 'https://spotifyapps.blob.core.windows.net/sinfini-imagefiles/Playlist_BestClassicalNewReleasesSinfiniMusicPicks_Cover',
			summary: 'Your hip hop hits in one playlist.',
			description: 'The very best of new and recently released classical albums that we\'re listening to at Sinfinimusic for our reviews section. Updated every week with fresh repertoire and artists.',
			nbTracks: 124,
			duration: 10205
		}, {
			id: 30595446,
			name: 'playlist 3',
			imageUrl: 'https://spotifyapps.blob.core.windows.net/sinfini-imagefiles/Playlist_BestClassicalNewReleasesSinfiniMusicPicks_Cover',
			summary: 'Your hip hop hits in one playlist.',
			description: 'The very best of new and recently released classical albums that we\'re listening to at Sinfinimusic for our reviews section. Updated every week with fresh repertoire and artists.',
			nbTracks: 124,
			duration: 10205
		}, {
			id: 30595446,
			name: 'playlist 4',
			imageUrl: 'https://spotifyapps.blob.core.windows.net/sinfini-imagefiles/Playlist_BestClassicalNewReleasesSinfiniMusicPicks_Cover',
			summary: 'Your hip hop hits in one playlist.',
			description: 'The very best of new and recently released classical albums that we\'re listening to at Sinfinimusic for our reviews section. Updated every week with fresh repertoire and artists.',
			nbTracks: 124,
			duration: 10205
		}, {
			id: 30595446,
			name: 'playlist 5',
			imageUrl: 'https://spotifyapps.blob.core.windows.net/sinfini-imagefiles/Playlist_BestClassicalNewReleasesSinfiniMusicPicks_Cover',
			summary: 'Your hip hop hits in one playlist.',
			description: 'The very best of new and recently released classical albums that we\'re listening to at Sinfinimusic for our reviews section. Updated every week with fresh repertoire and artists.',
			nbTracks: 124,
			duration: 10205
		}, {
			id: 30595446,
			name: 'playlist 6',
			imageUrl: 'https://spotifyapps.blob.core.windows.net/sinfini-imagefiles/Playlist_BestClassicalNewReleasesSinfiniMusicPicks_Cover',
			summary: 'Your hip hop hits in one playlist.',
			description: 'The very best of new and recently released classical albums that we\'re listening to at Sinfinimusic for our reviews section. Updated every week with fresh repertoire and artists.',
			nbTracks: 124,
			duration: 10205
		}, {
			id: 30595446,
			name: 'playlist 7',
			imageUrl: 'https://spotifyapps.blob.core.windows.net/sinfini-imagefiles/Playlist_BestClassicalNewReleasesSinfiniMusicPicks_Cover',
			summary: 'Your hip hop hits in one playlist.',
			description: 'The very best of new and recently released classical albums that we\'re listening to at Sinfinimusic for our reviews section. Updated every week with fresh repertoire and artists.',
			nbTracks: 124,
			duration: 10205
		}, {
			id: 30595446,
			name: 'playlist 8',
			imageUrl: 'https://spotifyapps.blob.core.windows.net/sinfini-imagefiles/Playlist_BestClassicalNewReleasesSinfiniMusicPicks_Cover',
			summary: 'Your hip hop hits in one playlist.',
			description: 'The very best of new and recently released classical albums that we\'re listening to at Sinfinimusic for our reviews section. Updated every week with fresh repertoire and artists.',
			nbTracks: 124,
			duration: 10205
		}]);
	}
	getPlaylist(playlistId) {
		return this.deezer.getPlaylist(playlistId);
	}
}

export default angular
	.module(app)
	.service('playlistService', PlaylistService)
	.name;