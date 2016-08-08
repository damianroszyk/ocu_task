var HomePage = require('../page-objects/home.po');

describe('Home page test suite', function() {
	var homePage;

	beforeEach(function() {
		homePage = new HomePage();
		homePage.get();
	});

	it('should have search tile input', function() {
		expect(homePage.getSearchTileInput()).toBeDefined();
	});

	it('should allow to use search tile', function() {
		homePage.setSearchTileInputText('foo');
		homePage.doTileSearch();
		//@TODO (Pawel): To be implemented
		// expect(browser.currentUrl()).toContain('/foo/bar');
	});

	it('should have header image', function() {
		expect(homePage.getHeaderImage()).toEqual(jasmine.objectContaining({
			height: 400
		}));
	});

	it('should have footer', function() {
		expect(homePage.getFooterCopyright()).toContain('Copyright');
	});

	it('should have title', function() {
		expect(homePage.getTitle()).toEqual('Pitched | Home');
	});

	it('should have category toggle button', function() {
		expect(homePage.getCategoryToggleButton()).not.toBe(null);
	});

	it('should open category dropdown', function() {
		homePage.openCategoryDropdown();
		expect(homePage.getCategoryDropdownElement().isPresent()).toBe(true);
	});

	it('should have cookie message', function() {
		expect(homePage.getCookieMessageElement().getAttribute('class')).not.toMatch('ng-hide');
	});

	it('should control cookie message', function() {
		homePage.hideCookieMessage();
		expect(homePage.getCookieMessageElement().getAttribute('class')).toMatch('ng-hide');
	});

	it('should persist cookie message state', function() {
		expect(homePage.getCookieMessageElement().getAttribute('class')).toMatch('ng-hide');
	});
});
