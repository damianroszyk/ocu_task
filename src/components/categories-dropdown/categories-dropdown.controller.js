export default class CategoriesDropdownController {
	/* @ngInject */
	constructor(categoryService) {
		categoryService
			.getCategories()
			.then(response => this.categories = response);
	}
	closeDropdown() {
		this.isShown = false;
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
	hideSubcategories() {
		this.l2Children = [];
		this.l3Children = [];
		this.l4Children = [];
	}
}
