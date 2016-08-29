import angular from 'angular';
import app from 'app';

import template from 'text!./search-form.html';
import controller from './search-form.controller';

export default angular
	.module(app)
	.component('searchForm', { template, controller})
	.name;
