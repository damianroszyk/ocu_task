export default class FooterController {
	/* @ngInject */
	constructor(domConstant) {
		this.brandImage = this.brandImage || domConstant.defaultFooterBrandImage;
	}
}
