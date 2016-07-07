import angular from 'angular';
import app from '../../app';

import template from 'text!./breadcrumb.html';
import controller from './breadcrumb.controller.js';

export default angular
    .module(app)
    .component('breadcrumb', { template, controller })
    .name;
