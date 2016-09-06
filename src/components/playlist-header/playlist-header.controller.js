export default class PlaylistHeaderController {
	/* @ngInject */
	constructor(domConstant) {
		this.defaultPlaylistTileImage = domConstant.defaultCategoryTileImage;
	}
	onPlayButtonClick(){
		this.showPlayer();
	}
}
