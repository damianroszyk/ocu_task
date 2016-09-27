import angular from 'angular';
import app from 'app';

import template from 'text!./search-results.html';
import controller from './search-results.controller.js';

let bindings = {
	results: '<',
	featuredPlaylists: '<'
};

export default angular
    .module(app)
    .component('searchResults', { template, controller, bindings })
    .name;
