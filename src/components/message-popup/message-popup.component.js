import angular from 'angular';
import app from 'app';

import template from 'text!./message-popup.html';
import controller from './message-popup.controller.js';

export default angular
    .module(app)
    .component('messagePopup', { template, controller })
    .name;
