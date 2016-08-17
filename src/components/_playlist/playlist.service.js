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
			backendConstant.apiVersion, 'category/'
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

	searchPlaylists(query, order = 'newest', sort = 'desc') {
		let url = this.modelHelper.buildUrl(this.searchBackend, query);
		let params = {order, sort};
		return this.$http.get(url, { params }).then(response =>
			this.processPlaylists(response.data)
		);
	}

	addDefaultData(playlists) {
		angular.forEach(playlists, playlist => {
			playlist.description = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.';
			playlist.imageUrl = this.domConstant.defaultCategoryTileImage;
		});
		return playlists;
	}

	getPlaylists(categoryId) {
		return this.$http.get(this.categoryBackend + categoryId + '/playlists').then(response =>
			this.addDefaultData(response.data)
		);;
	}

	getPlaylist(playlistId) {
		return this.deezer.getPlaylist(playlistId);
	}
}

export default angular
	.module(app)
	.service('playlistService', PlaylistService)
	.name;
