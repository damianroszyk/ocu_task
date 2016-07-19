export default class CategoriesDropdownController {
    /*@ngInject*/
    constructor(categoryService, domHelper) {
        categoryService.getCategories().then((response) => {
            this.categories = response.data;
        });
        domHelper.handleOutsideClick(
            document.querySelectorAll('categories-dropdown')[0],
            this.closeDropdown.bind(this)
        );
    }
    closeDropdown() {
        this.isShown = false;
    }
    isActive(category, l1Category) {
        return category.name === l1Category ? 'active' : '';
    }
    showCategoryChildren(category, target) {
        this[target] = category.subcategories;
    }
    hideCategoryChildren(target) {
        this[target] = [];
    }
    hideSubcategories() {
        this.l2Children = [];
        this.l3Children = [];
        this.l4Children = [];
    }
}
