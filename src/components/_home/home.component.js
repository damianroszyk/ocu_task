import angular from 'angular';
import app from '../../app';

import template from 'text!./home.html';
import controller from './home.controller';

export default angular
    .module(app)
    .component('home', { template, controller })
    .name;
