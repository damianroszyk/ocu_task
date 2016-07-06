function CategoryPageObject() {

    var heading = element.all(by.css('h2')).first();

    this.get = function() {
        browser.get('/#/category/testCategory');
        browser.waitForAngular();
    };

    this.getHeading = function() {
        return heading.getText();
    };
}

module.exports = CategoryPageObject;
