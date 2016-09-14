import _ from 'lodash';

export default class PlaylistController {
	/* @ngInject */
	constructor(breadcrumbService, playerWidgetService, serviceDropdown, metatagsService, domConstant) {
		breadcrumbService.buildPlaylistBreadcrumb(this.localPlaylist);
		this.playerWidgetService = playerWidgetService;
		this.serviceDropdown = serviceDropdown;
		metatagsService
			.clearMetatags()
			.appendMetatag(`og:image`, this.localPlaylist.image || domConstant.defaultBrandImage)
			.appendMetatag(`og:title`, `${this.localPlaylist.name} - Playlist - Digster`)
			.appendMetatag(`og:description`, `${this.localPlaylist.description}`)
			.appendMetatag(`description`, `${this.localPlaylist.description}`, 'name');
	}
	showPlayer() {
		let service = this.serviceDropdown.service.name;
		let servicePlaylist = _.find(this.localPlaylist.external_playlists, {
			source: service
		});
		if (service === 'apple') {
			window.open(this.localPlaylist.apple_music_link || 'https://itunes.apple.com/us/curator/digster/id1018903101');
			return;
		}
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
