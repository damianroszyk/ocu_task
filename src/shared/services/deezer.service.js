import angular from 'angular';
import app from 'app';

class DeezerService {
	/* @ngInject */
	constructor($q, angularLoad, dispatcherService, thirdPartyConstant) {
		this.$q = $q;
		this.angularLoad = angularLoad;
		this.dispatcherService = dispatcherService;
		this.thirdPartyConstant = thirdPartyConstant;
		this.deferredDeezerSdk = this.$q.defer();
		this.deferredPlayer = this.$q.defer();
	}
	initialize() {
		const DZ_ROOT = angular.element(`<div id="dz-root"></div>`);
		angular.element(document.body).append(DZ_ROOT);
		return this.angularLoad
			.loadScript(this.thirdPartyConstant.deezerSdkUrl)
			.then(() => this._handleDeezerSdkScript());
	}
	authorize() {
		let deferredAuthorization = this.$q.defer();
		let perms = this.thirdPartyConstant.deezerScopes.join(',');
		this.deferredDeezerSdk.promise.then(() => {
			this.dz.login(response => {
				return response.authResponse ?
					deferredAuthorization.resolve() :
					deferredAuthorization.reject();
			}, { perms });
		});
		return deferredAuthorization.promise;
	}
	authorizeIfNeccessary() {
		let deferredAuthorization = this.$q.defer();
		this.deferredDeezerSdk.promise.then(() => {
			this.dz.getLoginStatus(response => {
				if (response.authResponse) {
					deferredAuthorization.resolve();
				} else {
					this.authorize().then(() => deferredAuthorization.resolve());
				}
			});
		});
		return deferredAuthorization.promise;
	}
	_request(resource, method = false, params) {
		let deferredRequest = this.$q.defer();
		this.deferredDeezerSdk.promise.then(() => {
			if (method && params) {
				this.dz.api(resource, method, params, response =>
					deferredRequest.resolve(response)
				);
			} else {
				this.dz.api(resource, response =>
					deferredRequest.resolve(response)
				);
			}
		});
		return deferredRequest.promise;
	}
	getPlaylist(playlistId) {
		return this._request(`/playlist/${playlistId}`);
	}
	getTrack(trackId) {
		return this._request(`/track/${trackId}`);
	}
	followPlaylist(playlistId) {
		let params = { playlist_id: playlistId };
		return this._request(`/user/${this.dz.user_id}/playlists`, 'POST', params);
	}
	_handleDeezerSdkScript() {
		this.dz = window.DZ;
		this.dz.init({
			appId: this.thirdPartyConstant.deezerAppId,
			channelUrl: this.thirdPartyConstant.deezerRedirectUri,
			player: {
				onload: this._handleDeezerPlayerIsLoaded.bind(this)
			}
		});
		this.deferredDeezerSdk.resolve(this.dz);
	}
	_handleDeezerPlayerIsLoaded() {
		this.deferredPlayer.resolve();
	}
}

export default angular
	.module(app)
	.service('deezer', DeezerService)
	.name;
