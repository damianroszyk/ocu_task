import angular from 'angular';
import _ from 'lodash';
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
		this.searchBackend = this.modelHelper.buildUrl(
			backendConstant.apiVersion, 'search', backendConstant.clientBrand
		);
	}

	processPlaylists(response) {
		let playlists = _.values(response);
		let deezer = '';
		for (var i = 0; i < playlists.length; i++) {
			for (var a = 0; a < playlists[i].external_playlists.length; a++) {
				var service = playlists[i].external_playlists[a].source;
				playlists[i][service] = playlists[i].external_playlists[a];
			}
		}
		return response;
	}

	searchPlaylists(query, order = 'newest', sort = 'desc') {
		let url = this.modelHelper.buildUrl(this.searchBackend, query);
		let params = {order, sort};
		return this.$http.get(url, { params }).then(response =>
			this.processPlaylists(response.data)
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
