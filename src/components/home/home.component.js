import angular from 'angular';
import app from '../../app';

import template from 'text!./home.html';

let controller = () => {

};

export default angular
    .module(app)
    .component('home', {
        template,
        controller
    })
    .name;
