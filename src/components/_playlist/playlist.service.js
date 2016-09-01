import angular from 'angular';
import _ from 'lodash';
import app from 'app';

class PlaylistService {
	/* @ngInject */
	constructor($http, $q, deezer, backendConstant, domConstant, modelHelper) {
		this.$http = $http;
		this.$q = $q;
		this.deezer = deezer;
		this.modelHelper = modelHelper;
		this.domConstant = domConstant;
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
	processPlaylists(playlists) {
		playlists = _.values(playlists);
		angular.forEach(playlists, playlist => {
			angular.forEach(playlist.external_playlists, externalPlaylist => {
				playlist[externalPlaylist.source] = externalPlaylist;
			});
		});
		return playlists;
	}
	searchPlaylists(query, order, sort) {
		let params = { order, sort };
		let headers = { published: 1 };
		let url = this.modelHelper.buildUrl(this.searchBackend, query);
		return this.$http.get(url, { params, headers }).then(response =>
			this.processPlaylists(response.data)
		);
	}
	getCategoryPlaylists(categoryId) {
		let headers = { published: 1 };
		let url = this.modelHelper.buildUrl(this.categoryBackend, categoryId, 'playlists');
		return this.$http.get(url, { headers }).then(response =>
			this.processPlaylists(response.data)
		);
	}
	getFeaturedPlaylists() {
		let url = this.modelHelper.buildUrl(this.playlistBackend, 'list');
		let headers = {
			featured: 1,
			published: 1
		};
		return this.$http.get(url, { headers }).then(response =>
			this.processPlaylists(response.data)
		);
	}
	getPlaylist(playlistId) {
		return this.deezer.getPlaylist(playlistId);
	}
	getTopCategoryPlaylists(categoryId) {
		let url = this.modelHelper.buildUrl(this.categoryBackend, categoryId, 'playlists');
		let params = { limit: 5 };
		let headers = { published: 1 };
		return this.$http.get(url, { params, headers }).then(response =>
			this.processPlaylists(response.data)
		);
	}
}

export default angular
	.module(app)
	.service('playlistService', PlaylistService)
	.name;
