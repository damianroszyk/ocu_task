import angular from 'angular';
import app from 'app';

import template from 'text!./search-dropdown.html';
import controller from './search-dropdown.controller';

let bindings = {
	isShown: '='
};

export default angular
	.module(app)
	.component('searchDropdown', { template, controller, bindings})
	.name;
