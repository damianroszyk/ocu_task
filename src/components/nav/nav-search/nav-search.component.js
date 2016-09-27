import angular from 'angular';
import app from 'app';

import template from 'text!./nav-search.html';
import controller from './nav-search.controller';

export default angular
	.module(app)
	.component('navSearch', { template, controller})
	.name;
