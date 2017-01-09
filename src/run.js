import angular from 'angular';
import app from 'app';

/* @ngInject */
let run = ($rootScope, $state, Analytics, deezer, domHelper, storage) => {
	$rootScope.$state = $state;
	$rootScope.$on('$stateChangeSuccess', domHelper.scrollTop);
	let chosenProvider = storage.getStorageProperty('chosenProvider');
	if ( chosenProvider && chosenProvider.name === 'deezer') {
		deezer.initialize();
	}
};

export default angular
	.module(app)
	.run(run)
	.name;
