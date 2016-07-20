import angular from 'angular';
import app from 'app';

import template from 'text!./cookies-message.html';
import controller from './cookies-message.controller';

export default angular
	.module(app)
	.component('cookiesMessage', { template, controller })
	.name;
