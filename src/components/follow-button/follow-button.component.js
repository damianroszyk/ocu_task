import angular from 'angular';
import app from 'app';

import template from 'text!./follow-button.html';
import controller from './follow-button.controller';

let bindings = {
	playlist: '<'
};

export default angular
    .module(app)
    .component('followButton', { template, controller, bindings })
    .name;
