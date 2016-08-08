var _ = require('lodash');
var CategoryPage = require('../page-objects/category.po');
var HomePage = require('../page-objects/category.po');

describe('Category page test suite', function() {
	var categoryPage, homePage, categoryPath;

	beforeEach(function() {
		homePage = new HomePage();
		homePage.get();
		homePage.getCategoryTile().getAttribute('href').then(function(path) {
			categoryPage = new CategoryPage();
			categoryPath = path.split('/');
			categoryPath.splice(0, 2);
			categoryPage.get(categoryPath[0] + '/' + categoryPath[1]);
		});
	});

	it('should have playlist tiles', function() {
		expect(categoryPage.getCategoryTile().isPresent()).toBe(true);
	});

	it('should have title', function() {
		expect(categoryPage.getTitle()).toEqual('Pitched | Category');
	});

	it('should have playlist name', function() {
		expect(categoryPage.getCategoryName()).toEqual(_.startCase(categoryPath.pop()).toUpperCase());
	});
});
