import angular from 'angular';
import app from 'app';

import template from 'text!./music-provider-modal.html';
import controller from './music-provider-modal.controller';

let bindings = {
	isShown: '=',
	playlist: '<'
};

export default angular
    .module(app)
    .component('musicProviderModal', { template, controller, bindings })
    .name;
