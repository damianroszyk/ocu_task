var HomePage = require('../page-objects/home.po');

describe('Home page test suite', function() {
	var homePage;

	beforeEach(function() {
		homePage = new HomePage();
		homePage.get();
	});

	it('should have heading', function() {
		expect(homePage.getHeading()).toEqual('Home');
	});

	it('should have footer', function() {
		expect(homePage.getFooter()).toEqual('Footer');
	});

	it('should have title', function() {
		expect(homePage.getTitle()).toEqual('Pitched | Home');
	});

	it('should have category toggle button', function() {
		expect(homePage.getCategoryToggleButton()).not.toBe(null);
	});

	it('should open category dropdown', function() {
		homePage.getCategoryToggleButton().click();
		expect(homePage.getCategoryDropdownElement().isPresent()).toBe(true);
	});
});
