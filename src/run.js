import angular from 'angular';
import app from 'app';

/* @ngInject */
let run = ($rootScope, $state, deezer, domHelper) => {
	$rootScope.$state = $state;
	deezer.initialize();
	$rootScope.$on('$stateChangeSuccess', domHelper.scrollTop);
};

export default angular
	.module(app)
	.run(run)
	.name;
