function HomePageObject() {

	var headerImage = element(by.css('.header__background-image'));
	var footerCopyright = element(by.css('.footer-footnote__copyright'));
	var title = element(by.css('title'));
	var categoryToggleButton = element(by.css('.nav-menu-button'));
	var categoryDropdownElement = element(by.css('.categories-dropdown'));
	var cookieMessageElement = element(by.css('.cookies-message'));
	var cookieMessageControl = element(by.css('.cookies-message__control'));
	var searchTileInput = element(by.css('.search-tile-form__input'));
	var searchTileControl = element(by.css('.search-tile-form__button'));
	var categoryTiles = element.all(by.css('.category-tile'));
	var playlistTiles = element.all(by.css('.playlist-tile'));

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

	this.getCategoryTile = function() {
		return categoryTiles.first();
	};

	this.getPlaylistTile = function() {
		return playlistTiles.first();
	};

	this.getCookieMessageElement = function() {
		return cookieMessageElement;
	};

	this.hideCookieMessage = function() {
		cookieMessageControl.click();
	};

	this.openCategoryDropdown = function() {
		return categoryToggleButton.click();
	};

	this.getCategoryToggleButton = function() {
		return categoryToggleButton;
	};

	this.getCategoryDropdownElement = function() {
		return categoryDropdownElement;
	};

	this.getSearchTileInput = function() {
		return searchTileInput;
	};

	this.setSearchTileInputText = function(text) {
		searchTileInput.sendKeys(text);
	};

	this.doTileSearch = function() {
		searchTileControl.click();
	};
}

module.exports = HomePageObject;
