import angular from 'angular';
import app from 'app';

import template from 'text!./snackbar.html';
import controller from './snackbar.controller.js';

export default angular
    .module(app)
    .component('snackbar', { template, controller })
    .name;
