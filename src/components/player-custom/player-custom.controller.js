export default class PlayerCustomController {
	/* @ngInject */
	constructor(deezer, $scope, playerConstant, thirdPartyConstant) {

		var player = this;

		this.deezer = deezer;
		this.isPlayingTrack = false;
		this.isShuffling = false;
		this.isRepeating = false;
		this.isMuted = false;
		this.volume = 100; // <0, 100>
		this.percent = 0.0; // <0.0, 100.0>
		this.track = {
			artist: '',
			album: '',
			albumId: null,
			title: '',
			minutes: '0',
			seconds: '00',
			completedMinutes: '0',
			completedSeconds: '00'
		};

		if(!deezer.dz.player.loaded){
			deezer.dz.Event.subscribe('player_loaded', function(newTrack){
				deezer.dz.player.playPlaylist(player.playlistId, false);
			});
		}
		else{
			deezer.dz.player.playPlaylist(player.playlistId, false);
		}

		deezer.dz.Event.subscribe('current_track', function(newTrack){
			console.log(newTrack);
			$scope.$apply(function(){
				player.track.artist = newTrack.track.artist.name;
				player.track.album = newTrack.track.album.title;
				player.track.albumId = newTrack.track.album.id;
				player.track.title = newTrack.track.title;
				player.track.minutes = (newTrack.track.duration - newTrack.track.duration%60) / 60;
				player.track.seconds = (newTrack.track.duration % 60 < 10 ? '0' + (newTrack.track.duration % 60) : (newTrack.track.duration % 60));
			});
		});

		deezer.dz.Event.subscribe('player_position', function(positionArray){
			var percent = (positionArray[1] == 0 ? 0 : (positionArray[0] / positionArray[1]) * 100);
			var completedTime = Math.floor(positionArray[0]);
			$scope.$apply(function(){
				player.percent = percent;
				player.track.completedMinutes = (completedTime - completedTime%60) / 60;
				player.track.completedSeconds = (completedTime % 60 < 10 ? '0' + (completedTime % 60) : (completedTime % 60));
			});
		});
	}

	play(){
		this.isPlayingTrack = true;
		this.deezer.dz.player.play();
	}

	pause(){
		this.isPlayingTrack = false;
		this.deezer.dz.player.pause();
	}

	next(){
		this.isPlayingTrack = true;
		this.deezer.dz.player.next();
	}

	prev(){
		this.isPlayingTrack = true;
		this.deezer.dz.player.prev();
	}

	shuffle(){
		this.deezer.dz.player.setShuffle(!this.isShuffling);
		this.isShuffling = !this.isShuffling;
	}

	repeat(){
		this.deezer.dz.player.setRepeat(this.isRepeating ? 0 : 2);
		this.isRepeating = !this.isRepeating;
	}

	mute(){
		this.deezer.dz.player.setMute(!this.isMuted);
		this.isMuted = !this.isMuted;
	}

	setVolume(event){
		var percent = (event.offsetX / event.currentTarget.clientWidth) * 100;
		this.deezer.dz.player.setVolume(percent);
		this.volume = percent;
	}

	setPercent(event){
		var percent = (event.offsetX / event.currentTarget.clientWidth) * 100;
		this.deezer.dz.player.seek(percent);
		this.isPlayingTrack = true;
	}

}
