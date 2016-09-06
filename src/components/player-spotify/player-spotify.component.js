import angular from 'angular';
import app from 'app';

import template from 'text!./player-spotify.html';
import controller from './player-spotify.controller';

let bindings = {
	popup: '<',
	hidePlayer: '&?',
	playerShown: '<',
	serviceUserId: '<',
	servicePlaylistId: '<'
};

export default angular
	.module(app)
	.component('playerSpotify', { template, controller, bindings })
	.name;
