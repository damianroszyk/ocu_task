export default class CategoryTileController {
	/* @ngInject */
	constructor() {}
	toggleCategoryExpand($event) {
		$event.stopPropagation();
		this.category.expanded = !this.category.expanded;
	}
}
