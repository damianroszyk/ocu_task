export default class HeaderController {
	/* @ngInject */
	constructor(domConstant) {
		this.brandImage = this.brandImage || domConstant.defaultBrandImage;
	}
}
