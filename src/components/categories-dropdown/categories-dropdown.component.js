import angular from 'angular';
import app from 'app';

import template from 'text!./categories-dropdown.html';
import controller from './categories-dropdown.controller';

let bindings = {
    isShown: '='
};

export default angular
    .module(app)
    .component('categoriesDropdown', { template, controller, bindings })
    .name;
