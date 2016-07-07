import angular from 'angular';
import app from '../../app';

import template from 'text!./playlist.html';

let controller = () => {

};

export default angular
    .module(app)
    .component('playlist', { template, controller })
    .name;
