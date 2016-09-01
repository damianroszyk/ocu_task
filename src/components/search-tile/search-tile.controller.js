export default class SearchTileController {
	/* @ngInject */
	constructor(domConstant) {
		this.searchTileImage = this.searchTileImage || domConstant.defaultSearchTileImage;
	}
}
