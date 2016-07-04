import angular from 'angular';
import app from '../../app';

import template from 'text!./header.html';

let controller = () => {

};

export default angular
    .module(app)
    .component('appHeader', {
        template,
        controller
    })
    .name;
