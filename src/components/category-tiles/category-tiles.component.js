import angular from 'angular';
import app from 'app';

import template from 'text!./category-tiles.html';
import controller from './category-tiles.controller';

let bindings = {
    categories: '<',
    layout: '<?'
};

export default angular
    .module(app)
    .component('categoryTiles', { template, controller, bindings })
    .name;
