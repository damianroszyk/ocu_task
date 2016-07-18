function PlaylistPageObject() {

    var heading = element.all(by.css('h2')).first();
    var title = element(by.css('title'));

    this.get = function() {
        browser.get('/#/playlist/testPlaylist');
        browser.waitForAngular();
    };

    this.getHeading = function() {
        return heading.getText();
    };

    this.getTitle = function() {
        return title.getInnerHtml();
    };
}

module.exports = PlaylistPageObject;
