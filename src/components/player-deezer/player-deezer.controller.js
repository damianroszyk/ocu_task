export default class PlayerDeezerController {
    /*@ngInject*/
    constructor($sce, playerConstant) {
        this.$sce = $sce;
        this.playerConstant = playerConstant;
        this.width = this.width || this.playerConstant.defaultWidth;
        this.height = this.height || this.playerConstant.defaultHeight;
    }
    playerUrl() {
        let playerUrl = [
            this.playerConstant.embeddedDeezerPlayerUrl,
            `?format=classic&autoplay=true&playlist=true&size=medium&type=playlist`,
            `&app_id=${this.playerConstant.deezerAppId}`,
            `&width=${this.width}`,
            `&height=${this.height}`,
            `&id=${this.playlistId}`
        ].join('');
        return this.$sce.trustAsResourceUrl(playerUrl);

    }
}
