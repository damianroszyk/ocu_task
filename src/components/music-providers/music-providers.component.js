import angular from 'angular';
import app from 'app';

import template from 'text!./music-providers.html';
import controller from './music-providers.controller';

let bindings = {
	onSave: '&'
};

export default angular
    .module(app)
    .component('musicProviders', { bindings, template, controller })
    .name;
