var PlaylistPage = require('../page-objects/playlist.po');

describe('Playlist page test suite', function() {
	var playlistPage;

	beforeEach(function() {
		playlistPage = new PlaylistPage();
		playlistPage.get(30595446);
	});

	it('should have playlist name', function() {
		expect(playlistPage.getPlaylistTitle()).toEqual('Best Playlist EVER !!');
	});

	it('should have page title', function() {
		expect(playlistPage.getTitle()).toEqual('Pitched | Playlist');
	});
});
