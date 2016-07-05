var HomePage = require('../page-objects/home.po');

describe('Home page test suite', function() {
    var homePage;

    beforeEach(function() {
        homePage = new HomePage();
        homePage.get();
    });

    it('should have header', function() {
        expect(homePage.getHeader()).toEqual('Header');
    });

    it('should have heading', function() {
        expect(homePage.getHeading()).toEqual('Hello world!');
    });

    it('should have footer', function() {
        expect(homePage.getFooter()).toEqual('Footer');
    });
});
