import angular from 'angular';
import app from 'app';

import template from 'text!./track-list.html';
import controller from './track-list.controller';

let bindings = {
	tracks: '<',
	trackTitleClickCallback: '&?'
};

export default angular
	.module(app)
	.component('trackList', { template, controller, bindings })
	.name;
