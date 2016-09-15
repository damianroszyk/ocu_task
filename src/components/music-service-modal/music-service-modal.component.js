import angular from 'angular';
import app from 'app';

import template from 'text!./music-service-modal.html';
import controller from './music-service-modal.controller';

let bindings = {
	isShown: '=',
	playlist: '<'
};

export default angular
    .module(app)
    .component('musicServiceModal', { template, controller, bindings })
    .name;
