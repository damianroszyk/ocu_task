import angular from 'angular';
import app from 'app';

import template from 'text!./nav.html';
import controller from './nav.controller';

export default angular
    .module(app)
    .component('appNav', { template, controller })
    .name;
