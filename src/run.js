import angular from 'angular';
import app from 'app';

/* @ngInject */
let run = ($rootScope, $state, Analytics, deezer, domHelper) => {
	$rootScope.$state = $state;
	$rootScope.$on('$stateChangeSuccess', domHelper.scrollTop);
	deezer.initialize();
};

export default angular
	.module(app)
	.run(run)
	.name;
