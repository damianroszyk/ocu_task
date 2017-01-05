import angular from 'angular';
import app from 'app';

class NapsterService {
	/* @ngInject */
	constructor($q, thirdPartyConstant, $http, storage) {
		this.$q = $q;
		this.thirdPartyConstant = thirdPartyConstant;
		this.$http = $http;
		this.storage = storage;
	}

	authorize() {
		let deferredAuthorization = this.$q.defer();
		window.addEventListener(
			'message',
			event => this._handleRedirection(event, deferredAuthorization),
			false
		);
		window.open(this._authUrl, 'Napster', this._iframeAttrs);
		return deferredAuthorization.promise;
	}

	get _authUrl() {
		return [
			this.thirdPartyConstant.napsterApiUrl,
			'/oauth/authorize?client_id=', this.thirdPartyConstant.napsterApiKey,
			'&response_type=code', '&redirect_uri=',
			this.thirdPartyConstant.napsterRedirectUrl
		].join('');
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

	_handleRedirection(event, deferred) {
		if (!this._isEventValid(event)) {
			deferred.reject();
		} else {
			let params = JSON.parse(event.data);
			if (params.type === 'temporary_code') {
				this.temporaryCode = params.temporary_code;
				deferred.resolve(params.temporary_code);
				this.getNapsterAccessData(this.temporaryCode);
			} else if (params.type === 'error') {
				console.log('try again');
				// @TODO response when unsuccessful authorization
			}
		}
	}

	_isEventValid(event) {
		return event.origin === window.location.origin;
	}

	getNapsterAccessData(code) {
		let data = {
			client_id: this.thirdPartyConstant.napsterApiKey,
			client_secret: this.thirdPartyConstant.napsterApiSecret,
			response_type: 'code',
			grant_type: 'authorization_code',
			redirect_uri: this.thirdPartyConstant.napsterRedirectUrl,
			code: code
		};
		let url = this.thirdPartyConstant.napsterApiUrl + '/oauth/access_token';
		return this.$http
			.post(url, data).then(response => {
				this.storage.setStorageProperty('napster', response.data);
				return response.data;
			});
	}
}

export default angular
	.module(app)
	.service('napsterService', NapsterService)
	.name;
