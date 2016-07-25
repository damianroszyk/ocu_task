import angular from 'angular';
import 'angular-animate';
import 'angular-translate';
import 'angular-translate-loader-static-files';
import 'angular-ui-router';
import 'angular-load';

const PITCHED_WEBAPP = angular
	.module('pitchedWebapp', [
		'ngAnimate',
		'ui.router',
		'pascalprecht.translate',
		'angularLoad'
	]);

export default PITCHED_WEBAPP.name;
