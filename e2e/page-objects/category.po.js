function CategoryPageObject() {

	var categoryTile = element(by.css('.category-tile'));
	var categoryName = element(by.css('.category__title'));
	var title = element(by.css('title'));

	this.get = function(path) {
		browser.get('/#/category/' + path);
		browser.waitForAngular();
	};

	this.getCategoryTile = function() {
		return categoryTile;
	};

	this.getTitle = function() {
		return title.getInnerHtml();
	};

	this.getCategoryName = function() {
		return categoryName.getText();
	};
}

module.exports = CategoryPageObject;
