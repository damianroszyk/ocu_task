import angular from 'angular';
import app from './app';

/*@ngInject*/
let config = ($urlRouterProvider) => {
    $urlRouterProvider.otherwise('/');
};

export default angular
    .module(app)
    .config(config)
    .name;
