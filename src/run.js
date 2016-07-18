import angular from 'angular';
import app from 'app';

/*@ngInject*/
let run = ($rootScope, $state, deezer) => {
    $rootScope.$state = $state;
    deezer.initialize();
};

export default angular
    .module(app)
    .run(run)
    .name;
