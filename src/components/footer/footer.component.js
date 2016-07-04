import angular from 'angular';
import app from '../../app';

import template from 'text!./footer.html';

let controller = () => {

};

export default angular
    .module(app)
    .component('appFooter', {
        template,
        controller
    })
    .name;
