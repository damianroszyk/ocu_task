export default class PlaylistController {
	/* @ngInject */
	constructor(breadcrumbService, playerWidgetService) {
		breadcrumbService.buildPlaylistBreadcrumb(this.servicePlaylist);
		this.playerWidgetService = playerWidgetService;
	}
	showPlayer() {
		this.playerWidgetService.destroy();
		this.playerWidgetService.service = 'deezer';
		this.playerWidgetService.tracks = this.servicePlaylist.tracks.data;
		this.playerWidgetService.servicePlaylistId = this.servicePlaylist.id;
		this.playerWidgetService.localPlaylistId = this.localPlaylist.id;
		this.playerWidgetService.show = true;
		this.playerWidgetService.notify();
	}
}
