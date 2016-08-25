import angular from 'angular';
import app from 'app';

import template from 'text!./player-custom.html';
import controller from './player-custom.controller';

let bindings = {
	popup: '<'
};

export default angular
	.module(app)
	.component('playerCustom', { template, controller, bindings })
	.name;
