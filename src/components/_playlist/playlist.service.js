import angular from 'angular';
import _ from 'lodash';
import app from 'app';

class PlaylistService {
	/* @ngInject */
	constructor($http, $q, deezer, backendConstant, musicProvider, domConstant, modelHelper, playerWidgetService) {
		this.$http = $http;
		this.$q = $q;
		this.deezer = deezer;
		this.modelHelper = modelHelper;
		this.domConstant = domConstant;
		this.playerWidgetService = playerWidgetService;
		this.musicProvider = musicProvider;
		this.backendConstant = backendConstant;
		this.playlistBackend = this.modelHelper.buildUrl(
			backendConstant.apiVersion, 'playlist'
		);
		this.searchBackend = this.modelHelper.buildUrl(
			backendConstant.apiVersion, 'search', backendConstant.clientBrand
		);
		this.categoryBackend = this.modelHelper.buildUrl(
			backendConstant.apiVersion, 'category'
		);
	}
	searchPlaylists(query, order, sort) {
		let params = { order, sort };
		let headers = { published: 1 };
		let url = this.modelHelper.buildUrl(this.searchBackend, query);
		return this.$http
			.get(url, { params, headers })
			.then(response => this._normalizeLocalPlaylists(response.data));
	}
	getCategoryPlaylists(categoryId) {
		let headers = { published: 1 };
		let url = this.modelHelper.buildUrl(this.categoryBackend, categoryId, 'playlists');
		return this.$http
			.get(url, { headers })
			.then(response => this._normalizeLocalPlaylists(response.data));
	}
	getFeaturedPlaylists() {
		let url = this.modelHelper.buildUrl(this.playlistBackend, 'list');
		let headers = { featured: 1, published: 1};
		return this.$http
			.get(url, { headers })
			.then(response => this._normalizeLocalPlaylists(response.data));
	}
	getPlaylist(playlistId) {
		let url = this.modelHelper.buildUrl(this.playlistBackend, playlistId);
		return this.$http.get(url).then(response => {
			response.data = this._normalizeLocalPlaylists([response.data])[0];
			return response;
		});
	}
	getDeezerPlaylist(playlistId) {
		return this.deezer
			.getPlaylist(playlistId)
			.then(response => this._normalizeServicePlaylist('deezer', response));
	}
	getTopCategoryPlaylists(categoryId) {
		let url = this.modelHelper.buildUrl(this.categoryBackend, categoryId, 'playlists');
		let params = { limit: 5 };
		let headers = { published: 1 };
		return this.$http
			.get(url, { params, headers })
			.then(response => this._normalizeLocalPlaylists(response.data));
	}
	_normalizeLocalPlaylists(playlists) {
		playlists = _.values(playlists);
		angular.forEach(playlists, playlist => {
			angular.forEach(playlist.external_playlists, externalPlaylist => {
				playlist[externalPlaylist.source] = externalPlaylist;
			});
		});
		return playlists;
	}
	_normalizeServicePlaylist(service, response) {
		return response;
	}
	// showPlayer(playlist) {
	// 	let service = this.musicProvider.provider.name;
	// 	let servicePlaylist = _.find(playlist.external_playlists, {
	// 		source: service
	// 	});
	// 	if (service === 'apple') {
	// 		window.open(playlist.apple_music_link || 'https://itunes.apple.com/us/curator/digster/id1018903101');
	// 		return;
	// 	}
	// 	if (!servicePlaylist) {
	// 		//@TODO: handle not found 3rd party playlist here
	// 		console.log(`No playlist in ${service}`);
	// 		return;
	// 	}
	// 	this.playerWidgetService.destroy();
	// 	this.playerWidgetService.player = {
	// 		service,
	// 		servicePlaylistId: servicePlaylist.service_playlist_id,
	// 		serviceUserId: servicePlaylist.service_user_id,
	// 		localPlaylistId: playlist.id,
	// 		show: true
	// 	};
	// 	this.playerWidgetService.notify();
	// }
}

export default angular
	.module(app)
	.service('playlistService', PlaylistService)
	.name;
