const COLLAPSE_ALL_EVENT = 'collapseAllCategoryTiles';

export default class CategoryTileController {
	/* @ngInject */
	constructor($rootScope, domConstant, playlistService) {
		this.$rootScope = $rootScope;
		this.category.image = this.category.image || domConstant.defaultCategoryTileImage;
		this.listenToCollapseEvent();
	}
	listenToCollapseEvent() {
		this.$rootScope.$on(COLLAPSE_ALL_EVENT, ($event, categoryId) => {
			if (categoryId !== this.category.id) {
				this.category.expanded = false;
			}
		});
	}
	toggleCategoryExpand(state, $event) {
		this.$rootScope.$broadcast(COLLAPSE_ALL_EVENT, this.category.id);
		if ($event && $event.stopPropagation) {
			$event.stopPropagation();
		}
		this.category.expanded = !state;
	}
}
