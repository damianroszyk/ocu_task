import _ from 'lodash';

export default class PlaylistController {
	/* @ngInject */
	constructor(metatagsService, pageTitleService, domConstant) {
		pageTitleService.title = `${this.localPlaylist.name} - Playlist - ${domConstant.defaultBrand}`;
		metatagsService
			.clearMetatags()
			.appendMetatags(domConstant.defaultMetatags)
			.appendMetatag(`og:image`, this.localPlaylist.coverImage || domConstant.defaultBrandImage)
			.appendMetatag(`og:title`, `${this.localPlaylist.name} - Playlist - ${domConstant.defaultBrand}`)
			.appendMetatag(`og:description`, `${this.localPlaylist.description}`);
	}
}
