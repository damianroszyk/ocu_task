import angular from 'angular';
import app from 'app';

import template from 'text!./playlist-tags.html';
import controller from './playlist-tags.controller';

let bindings = {
	tags: '<'
};

export default angular
	.module(app)
	.component('playlistTags', { template, controller, bindings })
	.name;
