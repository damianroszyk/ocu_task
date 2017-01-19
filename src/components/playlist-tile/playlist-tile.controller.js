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
		this.playlist.external_playlists.push({
			brand: 4,
			created_at: '2016-09-22 13:57:35',
			id: 90,
			playlist_id: 24,
			service_playlist_id: 'pp.223691673',
			service_user_id: '594680711',
			source: 'napster',
			updated_at: '2016-09-22 13:57:35'
		});
		// @TODO remove part above when napster playlist is return from the server
		this.playerWidgetService.launch(this.playlist);
	}
}
