function CategoryPageObject() {

    var heading = element(by.css('h2'));
    var title = element(by.css('title'));

    this.get = function() {
        browser.get('/#/category/testCategory');
        browser.waitForAngular();
    };

    this.getHeading = function() {
        return heading.getText();
    };

    this.getTitle = function() {
        return title.getInnerHtml();
    };
}

module.exports = CategoryPageObject;
