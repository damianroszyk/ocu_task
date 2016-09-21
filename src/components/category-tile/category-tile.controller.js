const COLLAPSE_ALL_EVENT = 'collapseAllCategoryTiles';

export default class CategoryTileController {
	/* @ngInject */
	constructor($translate, $sce, dispatcherService, domConstant, playlistService) {
		this.dispatcherService = dispatcherService;
		this.playlistService = playlistService;
		this.category.image = this.category.image || domConstant.defaultCategoryTileImage;
		this.listenToCollapseEvent();
		this.$translate = $translate;
		this.$sce = $sce;
		this.defaultPlaylistDescription = $sce.trustAsHtml($translate.instant('PLAYLIST_NO_DESCRIPTION'));
	}
	listenToCollapseEvent() {
		this.dispatcherService.listen(COLLAPSE_ALL_EVENT, ($event, categoryId) => {
			if (categoryId !== this.category.id) {
				this.category.expanded = false;
			}
		});
	}
	toggleCategoryExpand(state, $event) {
		if ($event && $event.stopPropagation) {
			$event.stopPropagation();
		}
		this.dispatcherService.dispatch(COLLAPSE_ALL_EVENT, this.category.id);
		this.category.expanded = !state;
		if (!this.category.playlists) {
			this._getCategoryTopPlaylists();
		}
	}
	_getCategoryTopPlaylists() {
		this.subcategoriesAreLoaded = false;
		this.playlistService
			.getTopCategoryPlaylists(this.category.id)
			.then(playlists => {
				this.category.playlists = playlists;
				this.playlistsAreLoaded = true;
			});
	}
	playlistDescription(playlist_description) {
		return this.$sce.trustAsHtml(playlist_description) ?
		this.$sce.trustAsHtml(playlist_description) : this.defaultPlaylistDescription;
	}
}
