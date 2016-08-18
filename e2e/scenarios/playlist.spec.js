var PlaylistPage = require('../page-objects/playlist.po');
var HomePage = require('../page-objects/home.po');

describe('Playlist page test suite', function() {
	var playlistPage, homePage, playlistId;

	beforeEach(function() {
		homePage = new HomePage();
		homePage.get();
		homePage.getPlaylistTile().getAttribute('href').then(function(path) {
			playlistPage = new PlaylistPage();
			playlistId = path.split('/').pop();
			playlistPage.get(playlistId);
		});
	});

	it('should have page title', function() {
		expect(playlistPage.getTitle()).toEqual('Pitched | Playlist');
	});

	it('should have playlist title', function() {
		expect(playlistPage.getPlaylistTitle().isPresent()).toBe(true);
	});
});
