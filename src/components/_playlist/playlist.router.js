import app from '../../app';

const PLAYLIST_ROUTER = {
    playlistState: {
        url: '^/playlist/:playlistName',
        template: `<playlist></playlist>`
    }
};

/*@ngInject*/
let playlistRouter = $stateProvider => $stateProvider
    .state('playlist', PLAYLIST_ROUTER.playlistState);

export default angular
    .module(app)
    .config(playlistRouter)
    .name;
