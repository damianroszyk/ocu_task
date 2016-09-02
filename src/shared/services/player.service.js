import angular from 'angular';
import app from 'app';

class PlayerService {
	/* @ngInject */
	constructor() {
		this.playerShown = false;
		this.playlistId = -1;
		this.musicProvider = "deezer";
		this.tracks = [];
	}
	show(){
		this.playerShown = true;
	}
	hide(){
		this.playerShown = false;
	}
	setPlaylist(id){
		this.playlistId = id;
	}
	setTracks(tracks){
		this.tracks = tracks;
	}
	changeProvider(provider){
		this.musicProvider = provider;
	}
}

export default angular
	.module(app)
	.service('playerService', PlayerService)
	.name;
