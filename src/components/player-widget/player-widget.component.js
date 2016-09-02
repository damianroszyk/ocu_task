import angular from 'angular';
import app from 'app';

import template from 'text!./player-widget.html';
import controller from './player-widget.controller';

let bindings = {
};

export default angular
	.module(app)
	.component('playerWidget', { template, controller, bindings })
	.name;
