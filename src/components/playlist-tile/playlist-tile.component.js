import angular from 'angular';
import app from 'app';

import template from 'text!./playlist-tile.html';
import controller from './playlist-tile.controller';

let bindings = {
    playlist: '<'
};

export default angular
    .module(app)
    .component('playlistTile', { template, controller, bindings })
    .name;
