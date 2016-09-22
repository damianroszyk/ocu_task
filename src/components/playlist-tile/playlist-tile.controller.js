export default class PlaylistTileController {
	/* @ngInject */
	constructor($translate, $sce, domConstant, playerWidgetService) {
		this.$sce = $sce;
		this.$translate = $translate;
		this.playerWidgetService = playerWidgetService;
		this.defaultPlaylistTileImage = domConstant.defaultCategoryTileImage;
		this._setPlaylistDescription(this.playlist.description);
	}
	_setPlaylistDescription(description) {
		description = description || this.$translate.instant('PLAYLIST_NO_DESCRIPTION');
		// @TODO: test the below code for the potential XSS issue.
		this.playlistDescriptionHTML = this.$sce.trustAsHtml(description);
	}
	launchPlayer() {
		this.playerWidgetService.launch(this.playlist);
	}
}
