export default class PlayerWidgetController {
	/* @ngInject */
	constructor(playerWidgetService) {
		playerWidgetService.registerObserver(this._renderPlayer.bind(this));
	}
	_renderPlayer(player) {
		this.player = player;
	}
}
