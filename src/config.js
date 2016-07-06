import angular from 'angular';
import app from './app';

/*@ngInject*/
let config = ($urlRouterProvider, $translateProvider) => {
    $urlRouterProvider.otherwise('/');
    $translateProvider.useStaticFilesLoader({
        prefix: 'shared/i18n/',
        suffix: '.json'
    });
    $translateProvider.preferredLanguage('en_US');
};

export default angular
    .module(app)
    .config(config)
    .name;
