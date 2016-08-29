import angular from 'angular';
import 'angular-animate';
import 'angular-translate';
import 'angular-translate-loader-static-files';
import 'angular-loading-bar';
import 'angular-ui-router';
import 'angular-load';
import 'angular-ui-bootstrap/src/dropdown';

const PITCHED_WEBAPP = angular
	.module('pitchedWebapp', [
		'ngAnimate',
		'ui.router',
		'pascalprecht.translate',
		'angular-loading-bar',
		'angularLoad',
		'ui.bootstrap.dropdown'
	]);

export default PITCHED_WEBAPP.name;
