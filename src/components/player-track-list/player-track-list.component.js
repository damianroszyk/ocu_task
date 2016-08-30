import angular from 'angular';
import app from 'app';

import template from 'text!./player-track-list.html';
import controller from './player-track-list.controller';

let bindings = {
	tracks: '<',
	trackTitleClickCallback: '&?'
};

export default angular
	.module(app)
	.component('playerTrackList', { template, controller, bindings })
	.name;
