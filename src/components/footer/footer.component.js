import angular from 'angular';
import app from 'app';

import template from 'text!./footer.html';
import controller from './footer.controller';

let bindings = {
	brandImage: '@?'
};

export default angular
    .module(app)
    .component('appFooter', { template, controller, bindings })
    .name;
