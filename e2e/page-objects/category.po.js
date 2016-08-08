function CategoryPageObject() {

	var categoryTile = element(by.css('.category-tile'));
	var title = element(by.css('title'));

	this.get = function() {
		browser.get('/#/category/11/metal');
		browser.waitForAngular();
	};

	this.getCategoryTile = function() {
		return categoryTile;
	};

	this.getTitle = function() {
		return title.getInnerHtml();
	};
}

module.exports = CategoryPageObject;
