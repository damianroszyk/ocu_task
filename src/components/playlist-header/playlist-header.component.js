import angular from 'angular';
import app from 'app';

import template from 'text!./playlist-header.html';
import controller from './playlist-header.controller';

let bindings = {
    playlist: '<'
};

export default angular
    .module(app)
    .component('playlistHeader', { template, controller, bindings })
    .name;
