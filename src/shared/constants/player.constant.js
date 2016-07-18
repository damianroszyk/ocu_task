import angular from 'angular';
import app from 'app';

const PLAYER_CONSTANT = {
    defaultWidth: 300,
    defaultHeight: 700,
    embeddedDeezerPlayerUrl: 'https://www.deezer.com/plugins/player'
};

export default angular
    .module(app)
    .constant('playerConstant', PLAYER_CONSTANT)
    .name;
