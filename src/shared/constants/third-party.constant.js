import angular from 'angular';
import app from '../../app';

const THIRD_PARTY_CONSTANT = {
    deezerSdkUrl: 'https://cdns-files.dzcdn.net/js/min/dz.js',
    deezerAppId: 1
};

export default angular
    .module(app)
    .constant('thirdPartyConstant', THIRD_PARTY_CONSTANT)
    .name;
