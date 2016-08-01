import angular from 'angular';
import app from 'app';

import template from 'text!./category.html';
import controller from './category.controller.js';

let bindings = {
	category: '<',
	playlists: '<'
};

export default angular
    .module(app)
    .component('category', { template, controller, bindings })
    .name;
