import angular from 'angular';
import app from 'app';

class SpotifyService {
	/* @ngInject */
	constructor($q, $http, storage, thirdPartyConstant) {
		this.$q = $q;
		this.$http = $http;
		this.storage = storage;
		this.thirdPartyConstant = thirdPartyConstant;
	}
	authorize() {
		let deferredAuthorization = this.$q.defer();
		window.addEventListener(
			'message',
			event => this._handleRedirection(event, deferredAuthorization),
			false
		);
		window.open(this._authUrl, 'Spotify', this._iframeAttrs);
		return deferredAuthorization.promise;
	}
	authorizeIfNeccessary() {
		let deferredCheck = this.$q.defer();
		this.getUser()
			.then(() => deferredCheck.resolve(this.token))
			.catch(() => this
				.authorize()
				.then(() => deferredCheck.resolve(this.token)));
		return deferredCheck.promise;
	}
	_handleRedirection(event, deferred) {
		if (!this._isEventValid(event)) {
			deferred.reject();
		} else {
			let hash = JSON.parse(event.data);
			if (hash.type === 'access_token') {
				this.token = hash.access_token;
				deferred.resolve(hash.access_token);
			}
		}
	}
	get _iframeAttrs() {
		return [
			`menubar=no`, `location=no`, `resizable=no`, `scrollbars=no`, `status=no`,
			`width=${this.thirdPartyConstant.authWindowWidth}`,
			`height=${this.thirdPartyConstant.authWindowHeight}`,
			`top=${(screen.height / 2) - (this.thirdPartyConstant.authWindowHeight / 2)}`,
			`left=${(screen.width / 2) - (this.thirdPartyConstant.authWindowWidth / 2)}`
		].join(',');
	}
	get _authUrl() {
		return [
			this.thirdPartyConstant.spotifyAuthUrl,
			'?client_id=', this.thirdPartyConstant.spotifyClientId,
			'&redirect_uri=', encodeURIComponent(this.thirdPartyConstant.spotifyRedirectUrl),
			'&scope=', encodeURIComponent(this.thirdPartyConstant.spotifyScopes.join(' ')),
			'&response_type=token'
		].join('');
	}
	get token() {
		return this.storage.getStorageProperty('spotifyToken');
	}
	set token(token) {
		this.storage.setStorageProperty('spotifyToken', token);
	}
	_destroyToken() {
		this.storage.removeStorageProperty('spotifyToken');
	}
	_isEventValid(event) {
		return event.origin === window.location.origin;
	}
	_request(resource, method = 'GET', params = {}) {
		let token = this.token,
			deferredRequest = this.$q.defer();
		if (!token) {
			deferredRequest.reject();
		} else {
			this.$http({
				method,
				params,
				url: this.thirdPartyConstant.spotifyApiUrl + resource,
				headers: {
					'Authorization': `Bearer ${token}`
				}
			}).then(function(response) {
				deferredRequest.resolve(response);
			}).catch(function(rejection) {
				deferredRequest.reject(rejection);
				if (rejection.status === 401) {
					this._destroyToken();
				}
			});
		}
		return deferredRequest.promise;
	}
	getUser() {
		return this._request('/me');
	}
	followPlaylist(userid, playlistId) {
		let url = `/users/${userid}/playlists/${playlistId}/followers`;
		return this._request(url, 'PUT');
	}
}

export default angular
	.module(app)
	.service('spotify', SpotifyService)
	.name;
