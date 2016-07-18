import angular from 'angular';
import app from 'app';

/*@ngInject*/
let config = ($urlRouterProvider, $translateProvider) => {
    $urlRouterProvider.otherwise('/');
    $translateProvider
        .preferredLanguage('en_US')
        .useSanitizeValueStrategy('escape')
        .useStaticFilesLoader({
            prefix: 'shared/i18n/',
            suffix: '.json'
        });
};

export default angular
    .module(app)
    .config(config)
    .name;
