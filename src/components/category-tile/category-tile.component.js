import angular from 'angular';
import app from '../../app';

import template from 'text!./category-tile.html';
import controller from './category-tile.controller';

let bindings = {
    category: '<'
};

export default angular
    .module(app)
    .component('categoryTile', { template, controller, bindings })
    .name;
