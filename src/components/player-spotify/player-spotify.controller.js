export default class PlayerSpotifyController {
	/* @ngInject */
	constructor($window, $stateParams) {

		this.playlistId = $stateParams.playlistId - 0;
		this.window = $window;
		this.isPlayerMinified = false;
		this.isMaximized = false;

		if(this.popup){
			var header = document.getElementsByClassName('header')[0];
			var nav = document.getElementsByClassName('nav')[0];
			var footer = document.getElementsByClassName('footer')[0];
			header.parentNode.removeChild(header);
			nav.parentNode.removeChild(nav);
			footer.parentNode.removeChild(footer);
		}
	}

	showPopup(){
		this.window.open('#/player/spotify/' + this.playlistId, "_blank", "width=480,height=640,menubar=no,status=no,titlebar=no,toolbar=no,directories=no");
		this.close();
	}

	toggle(){
		this.isPlayerMinified = !this.isPlayerMinified;
	}

	maximize(){
		this.isMaximized = !this.isMaximized;
	}

	close(){
		this.isPlayerMinified = false;
		this.isMaximized = false;
		this.hidePlayer();
	}
}
