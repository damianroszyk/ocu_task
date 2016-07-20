function HomePageObject() {

	var heading = element(by.css('h2'));
	var footer = element(by.css('footer'));
	var title = element(by.css('title'));
	var categoryToggleButton = element(by.css('.nav-menu-button'));
	var categoryDropdownElement = element(by.css('.categories-dropdown'));


	this.get = function() {
		browser.get('/');
	};

	this.getHeading = function() {
		return heading.getText();
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