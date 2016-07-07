import angular from 'angular';
import app from '../../app';

class DeezerService {
    /*@ngInject*/
    constructor($q, angularLoad, thirdPartyConstant) {
        this.$q = $q;
        this.angularLoad = angularLoad;
        this.thirdPartyConstant = thirdPartyConstant;
    }
    initialize() {
        const DZ_ROOT = angular.element(`<div id="dz-root"></div>`);
        angular.element(document.body).append(DZ_ROOT);
        return this.angularLoad
            .loadScript(this.thirdPartyConstant.deezerSdkUrl)
            .then(() => this.handleDeezerSdkLoad());
    }
    handleDeezerSdkLoad() {
        this.dz = window.DZ;
        this.dz.init({
            appId: this.thirdPartyConstant.deezerAppId,
            channelUrl: `${window.location.origin}/channel.html`
        });
    }
    getPlaylist(playlistId) {
        let deferred = this.$q.defer();
        this.dz.api(
            `/playlist/${playlistId}`,
            response => deferred.resolve(response)
        );
        return deferred.promise;
    }
    getTrack(trackId) {
        let deferred = this.$q.defer();
        this.dz.api(
            `/track/${trackId}`,
            response => deferred.resolve(response)
        );
        return deferred.promise;
    }
}

export default angular
    .module(app)
    .service('deezer', DeezerService)
    .name;
