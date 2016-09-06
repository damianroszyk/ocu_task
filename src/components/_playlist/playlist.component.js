import angular from 'angular';
import app from 'app';

import template from 'text!./playlist.html';
import controller from './playlist.controller.js';

let bindings = {
	localPlaylist: '<',
	servicePlaylist: '<'
};

export default angular
    .module(app)
    .component('playlist', { template, controller, bindings })
    .name;
