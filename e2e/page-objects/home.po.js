function HomePageObject() {

    var heading = element.all(by.css('h2')).first();
    var header = element.all(by.css('header')).first();
    var footer = element.all(by.css('footer')).first();

    this.get = function() {
        browser.get('/');
    };

    this.getHeading = function() {
        return heading.getText();
    };

    this.getHeader = function() {
        return header.getText();
    };

    this.getFooter = function() {
        return footer.getText();
    };
}

module.exports = HomePageObject;
