export default class PlayerCustomController {
	/* @ngInject */
	constructor(deezer, playerConstant, thirdPartyConstant) {

		var player = this;

		this.deezer = deezer;
		this.isPlayingTrack = false;
		this.isShuffling = false;
		this.isRepeating = false;
		this.isMuted = false;
		this.volume = 100; // <0, 100>
		this.percent = 0.0; // <0.0, 100.0>
		deezer.dz.player.playPlaylist(this.playlistId);
		this.track = {
			artist: '',
			title: '',
			minutes: '0',
			seconds: '00'
		};

		deezer.dz.Event.subscribe('current_track', function(newTrack){
			//player.track.artist = newTrack.artist.name;
			player.track.title = newTrack.title;
			player.track.minutes = (newTrack.track.duration - newTrack.track.duration%60) / 60;
			player.track.seconds = (newTrack.track.duration % 60 < 10 ? newTrack.track.duration % 60 + '0' : newTrack.track.duration % 60);
		});
	}

	play(){
		this.deezer.dz.player.play();
		this.isPlayingTrack = true;
	}

	pause(){
		this.deezer.dz.player.pause();
		this.isPlayingTrack = false;
	}

	next(){
		this.deezer.dz.player.next();
	}

	prev(){
		this.deezer.dz.player.prev();
	}

	shuffle(){
		this.deezer.dz.player.setShuffle(!this.isShuffling);
		this.isShuffling = !this.isShuffling;
	}

	repeat(){
		this.deezer.dz.player.setRepeat(this.isRepeating ? 0 : 1);
		this.isRepeating = !this.isRepeating;
	}

	mute(){
		this.deezer.dz.player.setMute(!this.setMute);
		this.isMuted = !this.isMuted;
	}

	setVolume(event){
		console.log(event);
		var percent = (event.offsetX / event.target.clientWidth) * 100;
		this.deezer.dz.player.setVolume(percent);
		this.volume = percent;
	}

	setPercent(event){
		var percent = (event.offsetX / event.target.clientWidth) * 100;
		this.deezer.dz.player.seek(percent);
		this.percent = percent;
	}

}
