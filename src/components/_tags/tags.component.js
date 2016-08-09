import angular from 'angular';
import app from 'app';

import template from 'text!./tags.html';
import controller from './tags.controller';

let bindings = {
	tags: '<'
};

export default angular
    .module(app)
    .component('tags', { template, controller, bindings })
    .name;
