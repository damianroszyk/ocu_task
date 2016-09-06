export default class PlaylistController {
	/* @ngInject */
	constructor(breadcrumbService, playerWidgetService) {
		breadcrumbService.buildPlaylistBreadcrumb(this.servicePlaylist);
		this.playerWidgetService = playerWidgetService;
	}
	showPlayer() {
		this.playerWidgetService.destroy();
		this.playerWidgetService.player = {
			service: 'deezer',
			tracks: this.servicePlaylist.tracks.data,
			servicePlaylistId: this.servicePlaylist.id,
			localPlaylistId: this.localPlaylist.id,
			show: true
		};
		this.playerWidgetService.notify();
	}
}
