export default class SearchTileController {
	/* @ngInject */
	constructor(domConstant) {
		this.backgroundImage = this.backgroundImage || domConstant.defaultHeaderBackgroundImage;
	}
}
