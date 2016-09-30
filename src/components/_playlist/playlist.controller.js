import _ from 'lodash';

export default class PlaylistController {
	/* @ngInject */
	constructor(metatagsService, domConstant) {
		metatagsService
			.clearMetatags()
			.appendMetatags(domConstant.defaultMetatags)
			.appendMetatag(`og:image`, this.localPlaylist.coverImage || domConstant.defaultBrandImage)
			.appendMetatag(`og:title`, `${this.localPlaylist.name} - Playlist - Digster`)
			.appendMetatag(`og:description`, `${this.localPlaylist.description}`);
	}
}
