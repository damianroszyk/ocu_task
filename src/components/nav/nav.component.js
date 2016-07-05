import angular from 'angular';
import app from '../../app';

import template from 'text!./nav.html';

let controller = () => {

};

export default angular
    .module(app)
    .component('appNav', {
        template,
        controller
    })
    .name;
