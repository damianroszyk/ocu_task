import angular from 'angular';
import app from 'app';

import template from 'text!./music-service.html';
import controller from './music-service.controller';

let bindings = {
	isShown: '='
};

export default angular
    .module(app)
    .component('musicService', { template, controller, bindings })
    .name;
