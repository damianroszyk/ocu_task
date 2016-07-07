export default class PlaylistController {
    /*@ngInject*/
    constructor() {
        this.playlist = { name: 'Test playlist' };
        this.tracks = [
            { name: 'Track 1' },
            { name: 'Track 2' }
        ];
    }
}
