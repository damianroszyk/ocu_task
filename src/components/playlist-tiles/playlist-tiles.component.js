import angular from 'angular';
import app from 'app';

import template from 'text!./playlist-tiles.html';
import controller from './playlist-tiles.controller';

let bindings = {
    playlists: '<',
    layout: '<?'
};

export default angular
    .module(app)
    .component('playlistTiles', { template, controller, bindings })
    .name;
