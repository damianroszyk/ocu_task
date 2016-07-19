import angular from 'angular';
import app from 'app';

import template from 'text!./player-deezer.html';
import controller from './player-deezer.controller';

let bindings = {
	playlistId: '<',
	width: '@?',
	height: '@?'
};

export default angular
	.module(app)
	.component('playerDeezer', { template, controller, bindings })
	.name;
