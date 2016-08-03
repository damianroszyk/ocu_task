export default class PlaylistTileController {
	/* @ngInject */
	constructor(domConstant) {
		this.backgroundImage = this.backgroundImage || domConstant.defaultHeaderBackgroundImage;
		this.brandImage = this.brandImage || domConstant.defaultBrandImage;
	}
}
