import angular from 'angular';
import app from 'app';

import template from 'text!./music-provider-dropdown.html';
import controller from './music-provider-dropdown.controller';

let bindings = {
	isShown: '='
};

export default angular
    .module(app)
    .component('musicProviderDropdown', { template, controller, bindings })
    .name;
