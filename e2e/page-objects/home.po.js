function HomePageObject() {

	var headerImage = element(by.css('.header__background-image'));
	var footerCopyright = element(by.css('.footer-footnote__copyright'));
	var title = element(by.css('title'));
	var categoryToggleButton = element(by.css('.nav-menu-button'));
	var categoryDropdownElement = element(by.css('.categories-dropdown'));


	this.get = function() {
		browser.get('/');
	};

	this.getHeaderImage = function() {
		return headerImage.getSize();
	};

	this.getFooterCopyright = function() {
		return footerCopyright.getText();
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
