import angular from 'angular';
import app from 'app';

import template from 'text!./header.html';
import controller from './header.controller';

let bindings = {
	backgroundImage: '@?',
	brandImage: '@?'
};

export default angular
    .module(app)
    .component('appHeader', { template, controller, bindings })
    .name;
