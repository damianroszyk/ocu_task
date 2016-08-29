import angular from 'angular';
import app from 'app';

import template from 'text!./home.html';
import controller from './home.controller';

let bindings = {
	categories: '<',
	featuredCategories: '<',
	featuredPlaylists: '<'
};

export default angular
    .module(app)
    .component('home', { template, controller, bindings })
    .name;
