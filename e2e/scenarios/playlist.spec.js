var PlaylistPage = require('../page-objects/playlist.po');

describe('Playlist page test suite', function() {
    var playlistPage;

    beforeEach(function() {
        playlistPage = new PlaylistPage();
        playlistPage.get();
    });

    it('should have heading', function() {
        expect(playlistPage.getHeading()).toEqual('Playlist');
    });
});
