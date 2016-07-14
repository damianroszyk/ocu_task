import _ from 'lodash';

// console.log("_", _);

export default class CategoriesDropdownController {
    /*@ngInject*/
    constructor(categories) {
        this.categories = categories.getCategories();
    }
    isActive(category, l1Category) {
        return category.name === l1Category ? 'active' : '';
    }
    showCategoryChildren(category, target) {
        this[target] = category.children;
    }
    hideCategoryChildren(target) {
            this[target] = [];
    }
}
