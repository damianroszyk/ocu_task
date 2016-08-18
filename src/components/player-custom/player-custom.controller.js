export default class PlayerCustomController {
	/* @ngInject */
	constructor(deezer, playerConstant, thirdPartyConstant) {
		this.deezer = deezer;
		deezer.dz.player.playPlaylist(this.playlistId);
	}

	play(){
		this.deezer.dz.player.play();
	}

	pause(){
		this.deezer.dz.player.pause();
	}

	next(){
		this.deezer.dz.player.next();
	}

	prev(){
		this.deezer.dz.player.prev();
	}

}
