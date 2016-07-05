var CategoryPage = require('../page-objects/category.po');

describe('Category page test suite', function() {
    var categoryPage;

    beforeEach(function() {
        categoryPage = new CategoryPage();
        categoryPage.get();
    });

    it('should have heading', function() {
        expect(categoryPage.getHeading()).toEqual('Category');
    });
});
