import _ from 'lodash';

export default class PlaylistController {
	/* @ngInject */
	constructor(metatagsService, domConstant) {
		metatagsService
			.clearMetatags()
			.appendMetatag(`og:image`, this.localPlaylist.image || domConstant.defaultBrandImage)
			.appendMetatag(`og:title`, `${this.localPlaylist.name} - Playlist - Digster`)
			.appendMetatag(`og:description`, `${this.localPlaylist.description}`)
			.appendMetatag(`description`, `${this.localPlaylist.description}`, 'name');
	}
}
