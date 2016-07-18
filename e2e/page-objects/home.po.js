function HomePageObject() {

    var heading = element.all(by.css('h2')).first();
    var header = element.all(by.css('header')).first();
    var footer = element.all(by.css('footer')).first();
    var title = element(by.css('title'));
    var categoryToggleButton = element(by.css('.nav-menu-button'));
    var categoryDropdownElement = element(by.css('.categories-dropdown'));


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

    this.getTitle = function() {
        return title.getInnerHtml();
    };

    this.getCategoryToggleButton = function() {
        return categoryToggleButton;
    };

    this.getCategoryDropdownElement = function() {
        return categoryDropdownElement;
    };
}

module.exports = HomePageObject;
