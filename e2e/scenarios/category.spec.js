var CategoryPage = require('../page-objects/category.po');

describe('Category page test suite', function() {
	var categoryPage;

	beforeEach(function() {
		categoryPage = new CategoryPage();
		categoryPage.get();
	});

	it('should have playlist tiles', function() {
		expect(categoryPage.getCategoryTile().isPresent()).toBe(true);
	});

	it('should have title', function() {
		expect(categoryPage.getTitle()).toEqual('Pitched | Category');
	});
});
