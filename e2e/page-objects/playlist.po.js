function PlaylistPageObject() {

    var heading = element.all(by.css('h2')).first();

    this.get = function() {
        browser.get('/#/playlist/testPlaylist');
        browser.waitForAngular();
    };

    this.getHeading = function() {
        return heading.getText();
    };
}

module.exports = PlaylistPageObject;
