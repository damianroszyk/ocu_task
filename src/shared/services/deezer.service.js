import angular from 'angular';
import app from 'app';

class DeezerService {
	/* @ngInject */
	constructor($q, angularLoad, thirdPartyConstant) {
		this.$q = $q;
		this.angularLoad = angularLoad;
		this.thirdPartyConstant = thirdPartyConstant;
		this.deferredDeezerSdk = this.$q.defer();
	}
	initialize() {
		const DZ_ROOT = angular.element(`<div id="dz-root"></div>`);
		angular.element(document.body).append(DZ_ROOT);
		return this.angularLoad
			.loadScript(this.thirdPartyConstant.deezerSdkUrl)
			.then(() => this.handleDeezerSdkScript());
	}
	handleDeezerSdkScript() {
		this.dz = window.DZ;
		this.dz.init({
			appId: this.thirdPartyConstant.deezerAppId,
			channelUrl: `${window.location.origin}/channel.html`
		});
		this.deferredDeezerSdk.resolve(this.dz);
	}
	fetch(resource) {
		let deferredRequest = this.$q.defer();
		this.deferredDeezerSdk.promise.then(() =>
			this.dz.api(resource, response => deferredRequest.resolve(response))
		);
		return deferredRequest.promise;
	}
	getPlaylist(playlistId) {
		return this.fetch(`/playlist/${playlistId}`);
	}
	getTrack(trackId) {
		return this.fetch(`/track/${trackId}`);
	}
}

export default angular
	.module(app)
	.service('deezer', DeezerService)
	.name;
