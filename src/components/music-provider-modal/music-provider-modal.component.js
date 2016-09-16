import angular from 'angular';
import app from 'app';

import template from 'text!./music-provider-modal.html';
import controller from './music-provider-modal.controller';

export default angular
    .module(app)
    .component('musicProviderModal', { template, controller })
    .name;
