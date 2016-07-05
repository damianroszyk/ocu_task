import angular from 'angular';
import app from './app';

/*@ngInject*/
let run = ($rootScope, $state) => {
    $rootScope.$state = $state;
};

export default angular
    .module(app)
    .run(run)
    .name;
