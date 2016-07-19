export default class PlayerDeezerController {
	/* @ngInject */
	constructor($sce, playerConstant, thirdPartyConstant) {
		this.$sce = $sce;
		this.playerConstant = playerConstant;
		this.thirdPartyConstant = thirdPartyConstant;
		this.width = this.width || this.playerConstant.defaultWidth;
		this.height = this.height || this.playerConstant.defaultHeight;
	}
	playerUrl() {
		return this.$sce.trustAsResourceUrl([
			this.playerConstant.embeddedDeezerPlayerUrl,
			`?format=classic&autoplay=true&playlist=true&size=medium&type=playlist`,
			`&app_id=${this.thirdPartyConstant.deezerAppId}`,
			`&width=${this.width}`,
			`&height=${this.height}`,
			`&id=${this.playlistId}`
		].join(''));
	}
}
