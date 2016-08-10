import angular from 'angular';
import app from 'app';

import template from 'text!./tag-cloud.html';
import controller from './tag-cloud.controller';

let bindings = {
	tags: '<'
};

export default angular
	.module(app)
	.component('tagCloud', { template, controller, bindings })
	.name;
