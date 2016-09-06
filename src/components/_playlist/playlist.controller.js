import _ from 'lodash';

export default class PlaylistController {
	/* @ngInject */
	constructor(breadcrumbService, playerWidgetService, serviceDropdown) {
		breadcrumbService.buildPlaylistBreadcrumb(this.localPlaylist);
		this.playerWidgetService = playerWidgetService;
		this.serviceDropdown = serviceDropdown;
	}
	showPlayer() {
		let service = this.serviceDropdown.service.name;
		let servicePlaylist = _.find(this.localPlaylist.external_playlists, {
			source: service
		});
		if (!servicePlaylist) {
			//@TODO: handle not found 3rd party playlist here
			return;
		}
		this.playerWidgetService.destroy();
		this.playerWidgetService.player = {
			service,
			servicePlaylistId: servicePlaylist.service_playlist_id,
			serviceUserId: servicePlaylist.service_user_id,
			localPlaylistId: this.localPlaylist.id,
			show: true
		};
		this.playerWidgetService.notify();
	}
}
