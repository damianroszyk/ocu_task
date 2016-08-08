function PlaylistPageObject() {

	var playlistTitle = element(by.css('.playlist-header__title'));
	var title = element(by.css('title'));

	this.get = function(id) {
		browser.get('/#/playlist/'+ id);
		browser.waitForAngular();
	};

	this.getPlaylistTitle = function() {
		return playlistTitle;
	};

	this.getTitle = function() {
		return title.getInnerHtml();
	};
}

module.exports = PlaylistPageObject;
