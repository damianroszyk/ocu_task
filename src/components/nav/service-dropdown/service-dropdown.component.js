import angular from 'angular';
import app from 'app';

import template from 'text!./service-dropdown.html';
import controller from './service-dropdown.controller';

let bindings = {
	isShown: '='
};

export default angular
    .module(app)
    .component('serviceDropdown', { template, controller, bindings })
    .name;
